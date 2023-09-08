<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
	import { assets } from '$lib/stores/assets';
	import { page } from '$app/stores';
	import { WraithScene0 } from './scene0';
	import type { WraithScene } from '$lib/utils/scene';
	import FloatingContainer from '$components/FloatingContainer.svelte';

	const blue = 0x0621a5;
	const green = 0x0dbf95;

	const clock = new THREE.Clock();
	const scenes: WraithScene[] = [];

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;
	let light: THREE.PointLight;
	let light2: THREE.RectAreaLight;

	let mounted = false;
	let touchStart: number | null = null;

	let zScroll = 0;
	let zPos = 0;

	$: {
		if (mounted && scene && $assets.loaded === $assets.total) {
			scenes.push(new WraithScene0($assets.meshes));
		}
	}

	onMount(async () => {
		const main = document.querySelector('main') as HTMLCanvasElement;
		const rect = main.getBoundingClientRect();
		scene = new THREE.Scene();

		const fov = 55;

		camera = new THREE.PerspectiveCamera(fov, rect.width / rect.height, 0.1, 1000);
		camera.position.set(0, 0.5, 0);
		camera.lookAt(0, 0, 7);

		renderer = new THREE.WebGLRenderer({
			alpha: true,
			antialias: true,
			precision: 'mediump',
			canvas: document.querySelector('#c1') as HTMLCanvasElement
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(rect.width, rect.height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		RectAreaLightUniformsLib.init();

		const lightIntensity = $page.data.device.isMobile ? 4 : 1;
		const lightPower = $page.data.device.isMobile ? 400 : 120;
		light = new THREE.PointLight(green, lightIntensity, 15);
		light.position.set(camera.position.x, camera.position.y, camera.position.z + 2.5);
		light.castShadow = true;
		light.shadow!.bias = -0.003;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 2048;
		light.shadow.camera.near = 0.1;
		light.shadow.camera.far = 10000;
		light.power = lightPower;
		scene.add(light);

		const light2Instensity = $page.data.device.isMobile ? 0.4 : 0.2;
		light2 = new THREE.RectAreaLight(blue, light2Instensity, 30, 30);
		light2.position.set(camera.position.x, camera.position.y + 5.5, camera.position.z + 7);
		light2.lookAt(0, 0, 6);
		scene.add(light2);

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

		function animate() {
			requestAnimationFrame(animate);

			moveCam();
			scenes.forEach((s) => s.animate(scene, camera, clock));

			render();
		}

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

	function moveCam() {
		if ((zPos <= 0 && zScroll <= 0) || (zPos >= 80 && zScroll <= 0)) return;

		zPos += zScroll;
		zScroll *= 0.9;

		camera.position.z = zPos;
		light.position.set(camera.position.x, camera.position.y, camera.position.z + 2.5);
		light2.position.set(camera.position.x, camera.position.y + 5.5, camera.position.z + 7);
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
		const c1 = document.getElementById('c1') as HTMLElement;
		if (!c1) return;
		const parent = c1.parentElement as HTMLElement;
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

<canvas id="c1" class={$page.data.device.isMobile && 'mobile'} />

{#if camera && camera.position.z < 1}
	<FloatingContainer>
		<h1>Welcome</h1>
	</FloatingContainer>
{/if}

{#if camera && camera.position.z > 4 && camera.position.z < 9}
	<FloatingContainer>
		<p>This is just some additional content...</p>
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
		background-image: linear-gradient(#010405 35vh, #548277);
	}

	canvas.mobile {
		background-image: linear-gradient(#010405 25vh, #548277);
	}

	.container {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
	}
</style>
