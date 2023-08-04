<script lang="ts" type="module">
  import { onMount } from 'svelte';
  import * as THREE from 'three'
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
  import Stats from 'three/examples/jsm/libs/stats.module';
  import { PUBLIC_APP_ENV } from '$env/static/public';
  import { assets } from '$app/paths';
  import type { ILoad } from '../types';

  interface IWisp {
    mesh: THREE.Mesh;
    moveTo: THREE.Vector3;
    speed: number;
  }

  export let onLoad: (data: Record<string, ILoad>) => void = ({}) => {};
  export let onError: (error: Error) => void = () => {};

  const isDevelopment = PUBLIC_APP_ENV === 'development';
  const canvasId = 'cemetery';
  const viewabilityThreshold = 7;
  const userPos = {
    x: 0, 
    y: 3.2,
    z: 39.3
  }

  let stats: Stats;

  let load: Record<string, ILoad> = {};

  $: onLoad(load);

  let controls: OrbitControls;
  let main: HTMLElement;
  let rect: DOMRect;

  let scene = new THREE.Scene();

  let renderer: THREE.WebGLRenderer;
  let camera: THREE.PerspectiveCamera;
  let spotLight: THREE.SpotLight;
  let spotLightHelper: THREE.SpotLightHelper;

  let mouse = new THREE.Vector2();

  const wispsCount = 3;
  const wisps: IWisp[] = [];

  onMount(() => {
    scene.fog = new THREE.Fog(0x131316, 10, window.innerWidth < 768 ? 45 : 39);

    main = document.querySelector('main') as HTMLElement;
    rect = main.getBoundingClientRect();

    camera = new THREE.PerspectiveCamera(
      75,
      rect.width / rect.height,
      0.1,
      1000
    );

    camera.position.set(userPos.x, userPos.y, userPos.z)
    look();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById(canvasId) as HTMLCanvasElement,
      antialias: true,
    });
    renderer.setPixelRatio( window.devicePixelRatio );
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
        initLights();
        initWisps();
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
    function onDocumentMouseMove(e: MouseEvent) {
      e.preventDefault();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(e.clientY / rect.height) * 2 + 1;
    }

    document.addEventListener("contextmenu", onContextMenuClick, false);
    function onContextMenuClick(e: MouseEvent) {
      if (e.ctrlKey) {
        e.preventDefault();
        spotLight.visible = !spotLight.visible;
      }
    }
    
    if (isDevelopment) {
     stats = new Stats();
     document.body.appendChild(stats.dom);
    }

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('contextmenu', onContextMenuClick);
    }
  })

  function animate() {
    requestAnimationFrame(animate);

    stats?.update();
    spotLightHelper?.update();

    if (isDevelopment) controls.update();

    animateWisps();
    look();

    render();
  }

  function animateWisps() {
    wisps.forEach(wisp => {
      if (wisp.mesh.position.distanceTo(wisp.moveTo) < 0.1) {
        wisp.moveTo = new THREE.Vector3(
          userPos.x + (Math.random() * (Math.random() > 0.5 ? 8 : -8)),
          (userPos.y - 1) + (Math.random() * (Math.random() > 0.5 ? 1 : -1)),
          userPos.z + (Math.random() * -16 ) - 7
        );
        wisp.speed = Math.random() * 0.01;
      }
      
      wisp.mesh.position.lerp(wisp.moveTo, wisp.speed);
    });
  }

  function initLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.005);
    scene.add(ambientLight);

    spotLight = new THREE.SpotLight(0xffffff, 0.7, 20, Math.PI * 2.14, Math.PI * 0.02);
    
    spotLight.castShadow = true;
    spotLight.intensity = 0.5
    spotLight.shadow!.bias = -.001;
    spotLight.shadow!.mapSize.width = 2048;
    spotLight.shadow!.mapSize.height = 2048;
    spotLight.shadow.camera.near = 0.5;
    spotLight.shadow.camera.far = 5000;
    spotLight.shadow.focus = 1;
    spotLight.visible = false;

    scene.add(spotLight);
    scene.add(spotLight.target);

    spotLight.position.set(userPos.x, userPos.y - 1, userPos.z + 0.3);

    spotLight.target.position.z = 37;

    look();
  }

  function initWisps() {
    const wispColor = 0x04cee0;
    const size = 3 + Math.random() * 7;
    const wispGeo = new THREE.SphereGeometry(0.1, size, size);
    const wispMaterial = new THREE.MeshStandardMaterial({
      color: wispColor,
      transparent: true,
      opacity: 0.3,
      emissive: wispColor,
      emissiveIntensity: 1,
    });

    for (let i = 0; i < wispsCount; i++) {
      const wisp = new THREE.Mesh(wispGeo, wispMaterial)
      wisp.castShadow = false;
      wisp.receiveShadow = false;
      const light = new THREE.PointLight(wispColor, 0.5, 3, 2);
      light.castShadow = true;
      light.intensity = 0.5
      light.shadow!.bias = -.001;
      light.shadow!.mapSize.width = 2048;
      light.shadow!.mapSize.height = 2048;
      light.shadow.camera.near = 0.5;
      light.shadow.camera.far = 5000;

      const moveTo = new THREE.Vector3(
        userPos.x + (Math.random() * (Math.random() > 0.5 ? 8 : -8)),
        (userPos.y - 1) + (Math.random() * (Math.random() > 0.5 ? 1 : -1)),
        userPos.z + (Math.random() * -16 ) - 7
      );
      wisp.add(light);
      scene.add(wisp);

      wisps.push({
        mesh: wisp,
        moveTo,
        speed: Math.random() * 0.1,
      });

      wisp.position.set(
        userPos.x + (Math.random() * (Math.random() > 0.5 ? 8 : -8)),
        (userPos.y - 1) + (Math.random() * (Math.random() > 0.5 ? 1 : -1)),
        userPos.z + (Math.random() * -16 ) - 7
      )
    }
  }

  function loadCemetery() {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      loader.load(
        `${assets}/haunted-cemetery-low-poly.glb`,
        function (gltf) {
          gltf.scene.traverse(function (child) {
            const m = child as THREE.Mesh;

            m.traverse(function(node) {
              if ((node as THREE.Mesh).isMesh) {
                m.castShadow = true;
              }
            })

            if (m.isMesh) {
              const m = child as THREE.Mesh;

              // if (m.name.includes('mobile-candle') || m.name.includes('desktop-candle')) {
              if (m.name.includes('candle')) {
                if (m.name === 'candle-flame' && (m.parent?.name?.includes?.('mobile-candle') || m.parent?.name?.includes?.('desktop-candle'))) {
                  const candle = m.parent as THREE.Mesh;

                  if (window.innerWidth < 768) {
                    if (candle.name.includes('mobile-candle')) {
                      candle.visible = true;
                      candle.castShadow = true;
                      candle.receiveShadow = true;
                    } else {
                      candle.visible = false;
                      candle.castShadow = false;
                      candle.receiveShadow = false;
                    }
                  } else {
                    if (candle.name.includes('desktop-candle')) {
                      candle.visible = true;
                      candle.castShadow = true;
                      candle.receiveShadow = true;
                    } else {
                      candle.visible = false;
                      candle.castShadow = false;
                      candle.receiveShadow = false;
                    }
                  }
                }
              } else if (m.name === 'ground') {
                m.geometry.computeVertexNormals();
                m.receiveShadow = true;
              } else {
                m.geometry.computeVertexNormals();
                m.castShadow = true;
                m.receiveShadow = true;
              }
            }

            const l = child as THREE.Light;

            if (l.isLight || (l.parent as THREE.Light)?.isLight) {
              if (l.name === 'moon') {
                const moon = child as THREE.DirectionalLight;

                moon.intensity = window.innerWidth < 768 ? 0.075 : 0.05;
                moon.castShadow = true;
                moon.shadow!.bias = -.001;
                moon.shadow!.mapSize.width = 2048;
                moon.shadow!.mapSize.height = 2048;
              }
              
              if (l.name.includes('candle')) {
                const candlelight = l as THREE.PointLight;

                if (candlelight.name === 'candlelight') {
                  candlelight.visible = false;
                } else {
                  if (window.innerWidth < 768) {
                    if (candlelight.parent?.name.includes('mobile-candle')) {
                      candlelight.intensity = 0.5;
                      candlelight.distance = 3;
                      candlelight.castShadow = true;
                      candlelight.shadow!.bias = -.001;
                      candlelight.shadow!.mapSize.width = 2048;
                      candlelight.shadow!.mapSize.height = 2048;
                      candlelight.shadow.camera.near = 0.5;
                      candlelight.shadow.camera.far = 1000;
                    } else {
                      candlelight.visible = false;
                    }
                  } else {
                    if (candlelight.parent?.name.includes('desktop-candle')) {
                      candlelight.intensity = 0.5;
                      candlelight.distance = 3;
                      candlelight.castShadow = true;
                      candlelight.shadow!.bias = -.001;
                      candlelight.shadow!.mapSize.width = 2048;
                      candlelight.shadow!.mapSize.height = 2048;
                      candlelight.shadow.camera.near = 0.5;
                      candlelight.shadow.camera.far = 1000;
                    } else {
                      candlelight.visible = false;
                    }
                  }
                }
              }
            }
          });

          // setCandles();

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

  function look() {
    spotLight?.position?.set(userPos.x + (mouse.x * 0.8), (userPos.y - 1) + mouse.y * 0.8, userPos.z + 0.3);
    spotLight?.target?.position?.set(spotLight.position.x + (mouse.x * 0.8), spotLight.position.y + (mouse.y * 0.8), spotLight.position.z - 1)
    camera.lookAt(mouse.x * viewabilityThreshold, mouse.y * viewabilityThreshold, 0);
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
