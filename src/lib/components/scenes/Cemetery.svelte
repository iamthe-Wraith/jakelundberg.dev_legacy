<script lang="ts" type="module">
  import { onMount } from 'svelte';
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import Stats from 'three/examples/jsm/libs/stats.module';
  import { PUBLIC_APP_ENV } from '$env/static/public';
  import { assets } from '$app/paths';
	import type { ILoad } from './types';

  export let onLoad: (data: Record<string, ILoad>) => void = ({}) => {};
  export let onError: (error: Error) => void = () => {};

  const isDevelopment = PUBLIC_APP_ENV === 'development';
  const canvasId = 'forest';
  const viewabilityThreshold = 4;

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
  let spotLight: THREE.SpotLight;
  let spotLightHelper: THREE.SpotLightHelper;

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
      .then(() => {
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.005);
        scene.add(ambientLight);

        spotLight = new THREE.SpotLight(0xffffff, 1, 18, Math.PI * 2.15, Math.PI * 0.04);
        
        spotLight.castShadow = true;
        spotLight.intensity = 1
        spotLight.shadow!.bias = -.001;
        spotLight.shadow!.mapSize.width = 2048;
        spotLight.shadow!.mapSize.height = 2048;
        spotLight.shadow.camera.near = 0.5;
        spotLight.shadow.camera.far = 5000;
        spotLight.shadow.focus = 1;

        scene.add(spotLight);
        scene.add(spotLight.target);

        spotLight.position.set(0, 2.5, 38);

        spotLight.target.position.z = 37;
      })
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
    spotLightHelper?.update();

    if (isDevelopment) controls.update();

    spotLight?.position?.set(0 + (mouse.x * 0.8), 2.5 + mouse.y * 0.8, 38);
    spotLight?.target?.position?.set(spotLight.position.x + (mouse.x * 0.8), spotLight.position.y + (mouse.y * 0.8), spotLight.position.z - 1)
    camera.lookAt(mouse.x * viewabilityThreshold, mouse.y * viewabilityThreshold, 0);

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

            m.traverse(function(node) {
              if ((node as THREE.Mesh).isMesh) {
                m.castShadow = true;
              }
            })

            if (m.isMesh) {
              const m = child as THREE.Mesh;

              switch (m.name) {
                case 'ground':
                  m.geometry.computeVertexNormals();
                  m.receiveShadow = true;
                  break
                default:
                  m.geometry.computeVertexNormals();
                  m.castShadow = true;
                  m.receiveShadow = true;
                }
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

  function render() {
    renderer.render(scene, camera)
  }
</script>

<canvas id={canvasId}></canvas>
