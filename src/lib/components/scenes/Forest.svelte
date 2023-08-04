<script lang="ts" type="module">
  import { onMount } from 'svelte';
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import Stats from 'three/examples/jsm/libs/stats.module';
  import { PUBLIC_APP_ENV } from '$env/static/public';
  import { assets } from '$app/paths';
	import type { ILoad } from './types';

  interface IFlame {
    mesh: THREE.Mesh;
    speed: number;
    duration: number;
    lifespan: number;
  }

  export let onLoad: (data: Record<string, ILoad>) => void = ({}) => {};
  export let onError: (error: Error) => void = () => {};

  const isDevelopment = PUBLIC_APP_ENV === 'development';
  const canvasId = 'forest';
  const viewabilityThreshold = 3;

  let stats: Stats;

  let load: Record<string, ILoad> = {};

  $: onLoad(load);

  let main: HTMLElement;
  let rect: DOMRect;

  let scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x030303, 10, 35);

  let renderer: THREE.WebGLRenderer;
  let camera: THREE.PerspectiveCamera;

  let mouse = new THREE.Vector2();

  let torch: THREE.Mesh;
  let torchLight: THREE.PointLight;
  let flames: IFlame[] = [];
  const flameCount = 30;
  const flameColors = [
    0xefc909,
    0xdd6802,
    0xdd5202
  ];

  onMount(() => {
    main = document.querySelector('main') as HTMLElement;
    rect = main.getBoundingClientRect();

    camera = new THREE.PerspectiveCamera(
      75,
      rect.width / rect.height,
      0.1,
      1000
    );

    camera.position.set(1, 0.6, 18.3)
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById(canvasId) as HTMLCanvasElement,
      antialias: true
    });
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor(scene.fog!.color);
    renderer.setSize(rect.width, rect.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    Promise.all([
      loadForest(),
      loadTorch(),
    ])
      .catch(onError);

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      main = document.querySelector('main') as HTMLElement;
      rect = main.getBoundingClientRect();

      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();

      positionTorch();

      renderer.setSize(rect.width, rect.height);

      render();
    }

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    function onDocumentMouseMove(event: MouseEvent) {
      event.preventDefault();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(event.clientY / rect.height) * 2 + 1;
    }
    
    if (isDevelopment) {
     stats = new Stats();
     document.body.appendChild(stats.dom);
    }

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
    }
  })

  function animate() {
    requestAnimationFrame(animate);

    stats?.update();

    camera.lookAt(mouse.x * viewabilityThreshold, mouse.y * viewabilityThreshold, 0);

    animateTorch();

    render();
  }

  function animateTorch() {
    if (!torchLight || !flames.length) return;

    if (Math.random() > 0.85 || torchLight.intensity > 0.45) {
      const intensity = 0.4 + (Math.random() * 0.25);
      torchLight.intensity = intensity;

      torchLight.position.set(
        Math.random() / 2,
        Math.random() / 2 + 1,
        Math.random() / 2
      );
    }

    for (let i = 0; i < flames.length; i++) {
      let flame = flames[i];

      if (flame.duration > flame.lifespan) {
        torch.remove(flame.mesh);
        const f = initFlame();
        flames[i] = f;
      }

      flame.duration += 1;
      (flame.mesh.material as THREE.Material).opacity = 1 - (flame.duration / flame.lifespan);

      const scaleDegradation = 0.97;
      flame.mesh.geometry.scale(
        scaleDegradation,
        scaleDegradation,
        scaleDegradation
      );

      flame.mesh.position.set(
        flame.mesh.position.x + ((flame.duration / flame.lifespan) * 0.05),
        flame.mesh.position.y + flame.speed,
        flame.mesh.position.z + ((flame.duration / flame.lifespan) * 0.05),
      );
    }
  }

  function initFlame() {
    const color = flameColors[Math.round(Math.random() * (flameColors.length - 1))];

    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1.4, 1, 1.15),
      new THREE.MeshStandardMaterial({
        color, 
        emissive: color, 
        emissiveIntensity: 5, 
        transparent: true, 
        opacity: Math.random() 
      })
    );

    torch.add(mesh);

    mesh.position.set(
      Math.random() * 0.55 * (Math.random() > 0.5 ? 1 : -1),
      1.1,
      Math.random() * 0.55 * (Math.random() > 0.5 ? 1 : -1),
    );

    mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 7.5);

    const scale = Math.random() * 0.55;
    mesh.geometry.scale(scale, scale, scale);

    return {
      mesh,
      speed: 0.04 + (Math.random() * 0.01),
      duration: 0,
      lifespan: Math.random() * 25,
    }
  };

  function loadForest() {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        `${assets}/haunted-forest-low-poly.glb`,
        function (gltf) {
          gltf.scene.traverse(function (child) {
            const m = child as THREE.Mesh;

            if (m.isMesh) {
              m.receiveShadow = true;
              if (m.name !== 'ground') m.castShadow = true;
            }

            if (m.name === 'fallen-log-1001') {
              const g = child as THREE.Group;
              
              for (let i = 0; i < g.children.length; i++) {
                const c = g.children[i] as THREE.Mesh;
                c.castShadow = true;
                c.receiveShadow = true;
              }
            }
            
            const l = child as THREE.Light;

            if (l.isLight || (l.parent as THREE.Light)?.isLight) {
              if (l.name === 'moon') {
                const moon = child as THREE.DirectionalLight;

                moon.intensity = 0.55;
                moon.castShadow = true;
                moon.shadow!.bias = -.001;
                moon.shadow!.mapSize.width = 2048;
                moon.shadow!.mapSize.height = 2048;
              }
              
              if (l.name === 'torch') l.visible = false;
            }
          });

          scene.add(gltf.scene);
          resolve(true);
        },
        (xhr) => {
          load = {
            ...load,
            forest: { loaded: xhr.loaded, total: xhr.total }
          }
        },  
        (error) => {
          reject(error);
        }
      )
    })
  }

  function loadTorch() {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        `${assets}/torch.glb`,
        function (gltf) {
          gltf.scene.traverse(function (child) {
            const m = child as THREE.Mesh;

            if (m.name === 'torch') {
              torch = m;
              camera.add(gltf.scene);

              torch.castShadow = true;
              torch.receiveShadow = true;
              torch.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / -7.5);

              positionTorch();

              for (let i = 0; i < flameCount; i++) {                
                flames.push(initFlame());
              }

              torchLight = new THREE.PointLight(0xffd08f, 0.4, 25, 2);
              torchLight.castShadow = true;
              torchLight.shadow!.bias = -.001;
              torchLight.shadow!.mapSize.width = 2048;
              torchLight.shadow!.mapSize.height = 2048;
              torchLight.shadow.camera.near = 0.5;
              torchLight.shadow.camera.far = 5000;

              torch.add(torchLight);

              torchLight.position.set(0, 1, 0);
            }
          });

          resolve(true);
        },
        (xhr) => {
          load = {
            ...load,
            torch: { loaded: xhr.loaded, total: xhr.total }
          }
        },  
        (error) => {
          reject(error);
        }
      )
    })
  }

  function positionTorch() {
    let x = ((rect.width / 2) / rect.height) * 0.2;
    let y = -0.13;
    let z = -0.18;

    torch.position.set(x, y, z);
  }

  function render() {
    renderer.render(scene, camera)
  }
</script>

<canvas id={canvasId} />

<style lang="scss">
  canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
</style>
