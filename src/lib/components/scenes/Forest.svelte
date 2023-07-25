<script lang="ts" type="module">
  import { onMount } from 'svelte';
  import * as THREE from 'three'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import Stats from 'three/examples/jsm/libs/stats.module';
  import { PUBLIC_APP_ENV } from '$env/static/public';
  import { assets } from '$app/paths';

  export let onLoad: (loaded: number, total: number) => void = () => {};
  export let onError: (error: Error) => void = () => {};

  const isDevelopment = PUBLIC_APP_ENV === 'development';
  const canvasId = 'forest';
  const viewabilityThreshold = 3;

  let stats: Stats;

  let main: HTMLElement;
  let rect: DOMRect;

  let scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x030303, 10, 35);

  let renderer: THREE.WebGLRenderer;
  let camera: THREE.PerspectiveCamera;

  let mouse = new THREE.Vector2();

  let torch: THREE.PointLight;

  onMount(async () => {
    main = document.querySelector('main') as HTMLElement;
    rect = main.getBoundingClientRect();

    camera = new THREE.PerspectiveCamera(
      75,
      rect.width / rect.height,
      0.1,
      1000
    );

    camera.position.set(1, 0.6, 18.3)

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(canvasId) as HTMLCanvasElement });
    renderer.setClearColor(scene.fog!.color);
    renderer.setSize(rect.width, rect.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    loadForest().catch(onError);

    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
      main = document.querySelector('main') as HTMLElement;
      rect = main.getBoundingClientRect();

      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
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
  })

  function animate() {
    requestAnimationFrame(animate);

    stats?.update();

    camera.lookAt(mouse.x * viewabilityThreshold, mouse.y * viewabilityThreshold, 0);

    animateTorchLight();

    render();
  }

  function animateTorchLight() {
    if (!torch) return;
    if (Math.random() > 0.8 || torch.intensity > 0.6) {
      torch.intensity = 0.2 + (Math.random() * 0.3);
    }
  }

  function loadForest() {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        `${assets}/haunted-forest-low-poly.glb`,
        function (gltf) {
          gltf.scene.traverse(function (child) {
            const m = child as THREE.Mesh;

            if (m.name === 'rain') {
              console.log('m: ', m);
            }

            if (m.isMesh || m.name === 'fallen-log-1001') {
              const m = child as THREE.Mesh; 
              switch (m.name) {
                case 'ground':
                  m.receiveShadow = true;
                  break
                default:
                  m.castShadow = true;
                  m.receiveShadow = true;
              }
            }
            
            const l = child as THREE.Light;

            if (l.isLight || (l.parent as THREE.Light)?.isLight) {
              if ((child as THREE.Light).name === 'moon') {
                const moon = child as THREE.DirectionalLight;

                moon.intensity = 0.3;
                moon.castShadow = true;
                moon.shadow!.bias = -.001;
                moon.shadow!.mapSize.width = 2048;
                moon.shadow!.mapSize.height = 2048;
              }
              
              if ((child as THREE.Light).name === 'torch') {
                torch = child as THREE.PointLight;

                torch.distance = 28;
                torch.intensity = 0.4;
                torch.castShadow = true;
                torch.shadow.radius = 6;
                torch.shadow!.bias = -.001;
                torch.shadow!.mapSize.width = 2048;
                torch.shadow!.mapSize.height = 2048;
              }
            }
          });

          scene.add(gltf.scene);
          resolve(true);
        },
        (xhr) => {
          onLoad?.(xhr.loaded, xhr.total);
        },  
        (error) => {
          reject(error);
        }
      )
    })
  }

  function render() {
    renderer.render(scene, camera)
  }
</script>

<canvas id={canvasId}></canvas>
