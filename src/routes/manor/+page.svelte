<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
	import { assets } from '$lib/stores/assets';
	import { page } from '$app/stores';
	import { PUBLIC_APP_ENV } from '$env/static/public';
	import type { WraithScene } from '$lib/utils/scene';
	import FloatingContainer from '$components/FloatingContainer.svelte';
	import { ManorScene0 } from './scene0';
	import { primary500HexColor } from '$lib/constants/colors';
	import { mainMenu } from '$lib/stores/main-menu';

	/**
	 * https://codepen.io/forerunrun/pen/gOwgGzq
	 */

	const isDevelopment = PUBLIC_APP_ENV === 'development';
	const canvasId = 'manor-canvas';

	const clock = new THREE.Clock();
	const scenes: WraithScene[] = [];

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let light: THREE.PointLight;

	let mounted = false;
	let touchStart: number | null = null;

	let zScroll = 0;
	let zPos = 0;

	$: {
		if (mounted && scene && $assets.loaded === $assets.total) {
			scenes.push(new ManorScene0($assets.meshes));
		}
	}

	onMount(async () => {
		const main = document.querySelector('main') as HTMLCanvasElement;
		const rect = main.getBoundingClientRect();
		scene = new THREE.Scene();
		scene.fog = new THREE.Fog(0x030303, 10, 90);

		const fov = 55;

		camera = new THREE.PerspectiveCamera(fov, rect.width / rect.height, 0.1, 1000);
		camera.position.set(0, 0.5, 0);
		camera.lookAt(0, 0, 15);

		renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			precision: 'mediump',
			canvas: document.getElementById(canvasId) as HTMLCanvasElement
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(rect.width, rect.height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		RectAreaLightUniformsLib.init();

		const lightIntensity = $page.data.device.isMobile ? 4 : 1.5; // 2.5;
		const lightPower = $page.data.device.isMobile ? 400 : 150; // 250;
		light = new THREE.PointLight(primary500HexColor, lightIntensity, 15);
		light.position.set(camera.position.x, camera.position.y, camera.position.z + 1.75);
		light.castShadow = true;
		light.shadow!.bias = -0.003;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 2048;
		light.shadow.camera.near = 0.1;
		light.shadow.camera.far = 10000;
		light.power = lightPower;
		scene.add(light);

		const planeGeo = new THREE.PlaneGeometry(100, 100);
		const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
		const plane = new THREE.Mesh(planeGeo, planeMaterial);
		plane.rotation.x = -Math.PI / 2;
		plane.receiveShadow = true;
		plane.position.set(0, -1, 50);
		scene.add(plane);

		const ambientLight = new THREE.AmbientLight(0x548277, 0.2);
		scene.add(ambientLight);

		window.addEventListener('wheel', onWheelMove);
		window.addEventListener('touchstart', onTouchStart);
		window.addEventListener('touchmove', onTouchMove);
		window.addEventListener('touchend', onTouchEnd);
		window.addEventListener('resize', onWindowResize, false);

		animate();

		mounted = true;

		return () => {
			window.removeEventListener('wheel', onWheelMove);
			window.removeEventListener('touchstart', onTouchStart);
			window.removeEventListener('touchmove', onTouchMove);
			window.removeEventListener('touchend', onTouchEnd);
			window.removeEventListener('resize', onWindowResize, false);
		};
	});

	function animate() {
		requestAnimationFrame(animate);

		moveCam();
		scenes.forEach((s) => s.animate(scene, camera, clock));

		render();
	}

	function moveCam() {
		if ($mainMenu.isOpen || (zPos <= 0 && zScroll <= 0) || (zPos >= 20 && zScroll >= 0)) {
			return;
		}

		zPos += zScroll;
		zScroll *= 0.9;

		camera.position.z = zPos;
		light.position.set(camera.position.x, camera.position.y, camera.position.z + 1.75);
	}

	function onTouchEnd() {
		touchStart = null;
	}

	function onTouchMove(e: TouchEvent) {
		if (touchStart === null) return;
		zScroll = (touchStart - e.touches[0].clientY) * 0.001;
	}

	function onTouchStart(e: TouchEvent) {
		touchStart = e.touches[0].clientY;
	}

	function onWheelMove(e: WheelEvent) {
		zScroll = e.deltaY * 0.001;
	}

	function onWindowResize() {
		const canvas = document.getElementById(canvasId) as HTMLElement;
		if (!canvas) return;
		const parent = canvas.parentElement as HTMLElement;
		const rect = parent.getBoundingClientRect();

		camera.aspect = rect.width / rect.height;
		camera.updateProjectionMatrix();

		moveCam();
		scenes.forEach((s) => s.animate(scene, camera, clock));

		renderer.setSize(rect.width, rect.height);

		render();
	}

	function render() {
		renderer.render(scene, camera);
	}
</script>

<canvas id="manor-canvas" class={$page.data.device.isMobile && 'mobile'} />

{#if isDevelopment}
	<FloatingContainer top="auto" left="5%" bottom="2%">
		{(camera?.position?.z || 0).toFixed(2)}
	</FloatingContainer>
{/if}

<style>
	canvas {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1;
	}
</style>
