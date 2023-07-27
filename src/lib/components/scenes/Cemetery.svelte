<script lang="ts" type="module">
  import { onMount } from 'svelte';
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import Stats from 'three/examples/jsm/libs/stats.module';
  import { PUBLIC_APP_ENV } from '$env/static/public';
  import { assets } from '$app/paths';
	import type { ILoad } from './types';
	import { arraySlice } from 'three/src/animation/AnimationUtils';

  export let onLoad: (data: Record<string, ILoad>) => void = ({}) => {};
  export let onError: (error: Error) => void = () => {};

  const isDevelopment = PUBLIC_APP_ENV === 'development';
  const canvasId = 'forest';
  const viewabilityThreshold = 3;

  let stats: Stats;

  let load: Record<string, ILoad> = {};

  $: onLoad(load);

  let controls: OrbitControls;
  let main: HTMLElement;
  let rect: DOMRect;

  let scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x111111, 10, 38);

  let renderer: THREE.WebGLRenderer;
  let camera: THREE.PerspectiveCamera;

  let mouse = new THREE.Vector2();

  onMount(async () => {
    main = document.querySelector('main') as HTMLElement;
    rect = main.getBoundingClientRect();

    camera = new THREE.PerspectiveCamera(
      75,
      rect.width / rect.height,
      0.1,
      1000
    );

    camera.position.set(0, 3.5, 38.3)
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById(canvasId) as HTMLCanvasElement });
    renderer.setClearColor(scene.fog!.color);
    renderer.setSize(rect.width, rect.height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    Promise.all([
      loadCemetery(),
    ])
      .catch(onError);

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

    // camera.lookAt(mouse.x * viewabilityThreshold, mouse.y * viewabilityThreshold, 0);

    controls?.update();

    render();
  }

  function loadCemetery() {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        `${assets}/haunted-cemetery-low-poly.glb`,
        function (gltf) {
          let count = 0;
          gltf.scene.traverse(function (child) {
            const m = child as THREE.Mesh;

            if (m.isMesh) {
              const m = child as THREE.Mesh;

              if (Array.isArray(m.material)) {
                m.material[0].transparent = false;
                m.material[0].depthWrite = true;

                m.material[0].side = THREE.FrontSide;
              } else {
                m.material.transparent = false;
                m.material.depthWrite = true;

                m.material.side = THREE.FrontSide;
              }

              switch (m.name) {
                case 'ground':
                  console.log('m: ', m);
                  m.receiveShadow = true;
                  break
                default:
                  m.castShadow = true;
                  m.receiveShadow = true;
              }
            }
          });

          scene.add(gltf.scene);

          const ambientLight = new THREE.AmbientLight(0xffffff, 0.005);
          scene.add(ambientLight);

          // const pointLight = new THREE.PointLight( 0xffffff, 1 );
          // pointLight.position.set( 0, 5, 28 );
          // pointLight.castShadow = true;
          // pointLight.intensity = 0.3
          // pointLight.shadow!.bias = -.001;
          // pointLight.shadow!.mapSize.width = 2048;
          // pointLight.shadow!.mapSize.height = 2048;

          // scene.add( pointLight );

          // const lightHelper = new THREE.PointLightHelper(pointLight, 1);
          // scene.add(lightHelper);

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

  function render() {
    renderer.render(scene, camera)
  }
</script>

<canvas id={canvasId}></canvas>
