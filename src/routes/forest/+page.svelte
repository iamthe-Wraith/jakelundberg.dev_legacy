<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';
	import { assets } from '$lib/stores/assets';
	import { page } from '$app/stores';

	interface IAnchor {
		obj: THREE.Object3D;
		position: {
			activeY: number;
			inactiveY: number;
		};
	}

	interface IScene {
		anchor: IAnchor;
		objects: (THREE.Mesh | THREE.Group | THREE.Light)[];
		animate: () => void;
	}

	// const pink = 0x9e0dbf;
	// const yellow = 0xe8b306;
	const blue = 0x0621a5;
	const green = 0x0dbf95;

	const clock = new THREE.Clock();
	const scenes: IScene[] = [];

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;

	let mounted = false;

	let zScroll = 0;
	let zPos = 0;

	$: {
		if (mounted && scene && $assets.loaded === $assets.total) {
			// SCENE 0
			const s0Anchor = new THREE.Object3D();
			s0Anchor.position.set(0, -10, 6);
			s0Anchor.name = 's0-anchor';

			scenes.push({
				anchor: {
					obj: s0Anchor,
					position: {
						activeY: 0,
						inactiveY: -10
					}
				},
				objects: [],
				animate: animateScene0
			});

			if (
				$assets.meshes['pillar-lantern'] &&
				$assets.meshes['gate-1-1'] &&
				$assets.meshes['gate-1-2'] &&
				$assets.meshes['fence-1'] &&
				$assets.meshes['fence-2']
			) {
				const pillar1 = $assets.meshes['pillar-lantern'].clone() as THREE.Mesh;
				pillar1.name = 's0-pillar1';
				pillar1.position.set(1.5, -1, 0);
				pillar1.rotateY(Math.PI);
				scenes[0].anchor.obj.add(pillar1);
				scenes[0].objects.push(pillar1);

				const pillar2 = $assets.meshes['pillar-lantern'].clone() as THREE.Mesh;
				pillar2.name = 's0-pillar2';
				pillar2.position.set(-1.5, -1, 0);
				scenes[0].anchor.obj.add(pillar2);
				scenes[0].objects.push(pillar2);

				const gate1 = $assets.meshes['gate-1-1'].clone() as THREE.Mesh;
				gate1.name = 's0-gate1';
				gate1.position.set(1.03, 0.05, 0);
				gate1.rotateY(THREE.MathUtils.degToRad(180));
				scenes[0].anchor.obj.add(gate1);
				scenes[0].objects.push(gate1);

				const gate2 = $assets.meshes['gate-1-2'].clone() as THREE.Mesh;
				gate2.name = 's0-gate2';
				gate2.position.set(-1.03, 0.15, 0);
				gate2.rotateY(THREE.MathUtils.degToRad(180));
				scenes[0].anchor.obj.add(gate2);
				scenes[0].objects.push(gate2);

				const fence1 = $assets.meshes['fence-1'].clone() as THREE.Mesh;
				fence1.name = 's0-fence1';
				fence1.position.set(4.2, -1, 0);
				scenes[0].anchor.obj.add(fence1);
				scenes[0].objects.push(fence1);

				const fence2 = $assets.meshes['fence-2'].clone() as THREE.Mesh;
				fence2.name = 's0-fence2';
				fence2.position.set(-4.2, -1, 0);
				scenes[0].anchor.obj.add(fence2);
				scenes[0].objects.push(fence2);
			}

			if ($assets.meshes['stepstone-1']) {
				const stepStone1_1 = $assets.meshes['stepstone-1'].clone() as THREE.Mesh;
				stepStone1_1.name = 's0-stepstone1-1';
				stepStone1_1.position.set(0.3, -1, -0.6);
				scenes[0].anchor.obj.add(stepStone1_1);
				scenes[0].objects.push(stepStone1_1);

				const stepStone1_2 = $assets.meshes['stepstone-1'].clone() as THREE.Mesh;
				stepStone1_2.name = 's0-stepstone1-2';
				stepStone1_2.position.set(0.3, -1, -3);
				stepStone1_2.scale.set(0.15, 0.15, 0.15);
				stepStone1_2.rotateY(THREE.MathUtils.degToRad(72));
				scenes[0].anchor.obj.add(stepStone1_2);
				scenes[0].objects.push(stepStone1_2);

				const stepStone1_3 = $assets.meshes['stepstone-1'].clone() as THREE.Mesh;
				stepStone1_3.name = 's0-stepstone1-3';
				stepStone1_3.position.set(0, -1, 3.9);
				stepStone1_3.scale.set(0.25, 0.25, 0.25);
				stepStone1_3.rotateY(THREE.MathUtils.degToRad(168));
				scenes[0].anchor.obj.add(stepStone1_3);
				scenes[0].objects.push(stepStone1_3);
			}

			if ($assets.meshes['stepstone-2']) {
				const stepStone2_1 = $assets.meshes['stepstone-2'].clone() as THREE.Mesh;
				stepStone2_1.name = 's0-stepstone2-1';
				stepStone2_1.position.set(-0.2, -1, -0.3);
				scenes[0].anchor.obj.add(stepStone2_1);
				scenes[0].objects.push(stepStone2_1);

				const stepStone2_2 = $assets.meshes['stepstone-2'].clone() as THREE.Mesh;
				stepStone2_2.name = 's0-stepstone2-2';
				stepStone2_2.position.set(-0.3, -1, -2.8);
				stepStone2_2.rotateY(THREE.MathUtils.degToRad(133));
				scenes[0].anchor.obj.add(stepStone2_2);
				scenes[0].objects.push(stepStone2_2);
			}

			if ($assets.meshes['stepstone-3']) {
				const stepStone3_1 = $assets.meshes['stepstone-3'].clone() as THREE.Mesh;
				stepStone3_1.name = 's0-stepstone3-1';
				stepStone3_1.position.set(-0.05, -1, -0.8);
				stepStone3_1.rotateY(THREE.MathUtils.degToRad(180));
				scenes[0].anchor.obj.add(stepStone3_1);
				scenes[0].objects.push(stepStone3_1);

				const stepStone3_2 = $assets.meshes['stepstone-3'].clone() as THREE.Mesh;
				stepStone3_2.name = 's0-stepstone3-2';
				stepStone3_2.position.set(-0.05, -1, 4.3);
				stepStone3_2.rotateY(THREE.MathUtils.degToRad(100));
				scenes[0].anchor.obj.add(stepStone3_2);
				scenes[0].objects.push(stepStone3_2);
			}

			if ($assets.meshes['stepstone-4']) {
				const stepStone4_1 = $assets.meshes['stepstone-4'].clone() as THREE.Mesh;
				stepStone4_1.name = 's0-stepstone4-1';
				stepStone4_1.position.set(0.24, -1, -2);
				stepStone4_1.rotateY(THREE.MathUtils.degToRad(30));
				scenes[0].anchor.obj.add(stepStone4_1);
				scenes[0].objects.push(stepStone4_1);

				const stepStone4_2 = $assets.meshes['stepstone-4'].clone() as THREE.Mesh;
				stepStone4_2.name = 's0-stepstone4-2';
				stepStone4_2.position.set(-0.1, -1, 1.5);
				stepStone4_2.rotateY(THREE.MathUtils.degToRad(54));
				scenes[0].anchor.obj.add(stepStone4_2);
				scenes[0].objects.push(stepStone4_2);

				const stepStone4_3 = $assets.meshes['stepstone-4'].clone() as THREE.Mesh;
				stepStone4_3.name = 's0-stepstone4-3';
				stepStone4_3.position.set(-0.4, -1, 4.1);
				stepStone4_3.scale.set(0.3, 0.15, 0.3);
				stepStone4_3.rotateY(THREE.MathUtils.degToRad(70));
				scenes[0].anchor.obj.add(stepStone4_3);
				scenes[0].objects.push(stepStone4_3);
			}

			if ($assets.meshes['stepstone-5']) {
				const stepStone5_1 = $assets.meshes['stepstone-5'].clone() as THREE.Mesh;
				stepStone5_1.name = 's0-stepstone5-1';
				stepStone5_1.position.set(0.4, -1, 3);
				stepStone5_1.rotateY(THREE.MathUtils.degToRad(270));
				scenes[0].anchor.obj.add(stepStone5_1);
				scenes[0].objects.push(stepStone5_1);

				const stepStone5_2 = $assets.meshes['stepstone-5'].clone() as THREE.Mesh;
				stepStone5_2.name = 's0-stepstone5-1';
				stepStone5_2.position.set(-0.54, -1, 5.7);
				stepStone5_2.rotateY(THREE.MathUtils.degToRad(34));
				scenes[0].anchor.obj.add(stepStone5_2);
				scenes[0].objects.push(stepStone5_2);
			}

			if ($assets.meshes['tree-1']) {
				const tree1_1 = $assets.meshes['tree-1'].clone() as THREE.Group;
				tree1_1.name = 's0-tree1_1';
				tree1_1.position.set(-4, -1, 2);
				tree1_1.scale.set(0.6, 1, 1.3);
				tree1_1.rotateY(THREE.MathUtils.degToRad(173));
				scenes[0].anchor.obj.add(tree1_1);
				scenes[0].objects.push(tree1_1);

				const tree1_2 = $assets.meshes['tree-1'].clone() as THREE.Group;
				tree1_2.name = 's0-tree1_2';
				tree1_2.position.set(4, -1, 1);
				tree1_2.scale.set(0.6, 1, 1.3);
				tree1_2.rotateY(THREE.MathUtils.degToRad(42));
				scenes[0].anchor.obj.add(tree1_2);
				scenes[0].objects.push(tree1_2);

				const tree1_3 = $assets.meshes['tree-1'].clone() as THREE.Group;
				tree1_3.name = 's0-tree1_3';
				tree1_3.position.set(1.8, -1, -2.5);
				tree1_3.scale.set(0.6, 1, 1.3);
				tree1_3.rotateY(THREE.MathUtils.degToRad(42));
				scenes[0].anchor.obj.add(tree1_3);
				scenes[0].objects.push(tree1_3);
			}

			if ($assets.meshes['tree-2']) {
				const tree2_1 = $assets.meshes['tree-2'].clone() as THREE.Group;
				tree2_1.name = 's0-tree2_1';
				tree2_1.position.set(-2, -1, 4.5);
				tree2_1.rotateY(THREE.MathUtils.degToRad(-92));
				scenes[0].anchor.obj.add(tree2_1);
				scenes[0].objects.push(tree2_1);

				const tree2_2 = $assets.meshes['tree-2'].clone() as THREE.Group;
				tree2_2.name = 's0-tree2_2';
				tree2_2.position.set(1.5, -1, 2.5);
				tree2_2.rotateY(THREE.MathUtils.degToRad(30));
				scenes[0].anchor.obj.add(tree2_2);
				scenes[0].objects.push(tree2_2);
			}

			if ($assets.meshes['tree-3']) {
				const tree3_1 = $assets.meshes['tree-3'].clone() as THREE.Group;
				tree3_1.name = 's0-tree3_1';
				tree3_1.position.set(-4.5, -1, 4.5);
				tree3_1.rotateY(THREE.MathUtils.degToRad(-92));
				scenes[0].anchor.obj.add(tree3_1);
				scenes[0].objects.push(tree3_1);

				const tree3_2 = $assets.meshes['tree-3'].clone() as THREE.Group;
				tree3_2.name = 's0-tree3_2';
				tree3_2.position.set(4.5, -1, 3.5);
				tree3_2.rotateY(THREE.MathUtils.degToRad(0));
				scenes[0].anchor.obj.add(tree3_2);
				scenes[0].objects.push(tree3_2);

				const tree3_3 = $assets.meshes['tree-3'].clone() as THREE.Group;
				tree3_3.name = 's0-tree3_3';
				tree3_3.position.set(-1.5, -1, -1.5);
				tree3_3.rotateY(THREE.MathUtils.degToRad(-120));
				scenes[0].anchor.obj.add(tree3_3);
				scenes[0].objects.push(tree3_3);
			}

			if ($assets.meshes['tree-4']) {
				const tree4_1 = $assets.meshes['tree-4'].clone() as THREE.Group;
				tree4_1.name = 's0-tree4_1';
				tree4_1.position.set(-1.8, -1, 6.5);
				tree4_1.rotateY(THREE.MathUtils.degToRad(-92));
				scenes[0].anchor.obj.add(tree4_1);
				scenes[0].objects.push(tree4_1);

				const tree4_2 = $assets.meshes['tree-4'].clone() as THREE.Group;
				tree4_2.name = 's0-tree4_2';
				tree4_2.position.set(1.5, -1, 6);
				tree4_2.rotateY(THREE.MathUtils.degToRad(60));
				scenes[0].anchor.obj.add(tree4_2);
				scenes[0].objects.push(tree4_2);
			}

			const light2 = new THREE.RectAreaLight(blue, 0.2, 30, 30);
			light2.position.set(0, 6, 7);
			light2.lookAt(0, 0, 6);
			scene.add(light2);
		}
	}

	function animateScene0() {
		if (!scenes.length) return;

		const delta = clock.getDelta();
		const s = scenes[0];

		const distanceTo = s.anchor.obj.position.z - camera.position.z;
		const absDistanceTo = Math.abs(distanceTo);

		if (absDistanceTo > 2.5 && absDistanceTo <= 7) {
			const o = scene.getObjectByName(s.anchor.obj.name);
			if (!o) scene.add(s.anchor.obj);

			const destination = new THREE.Vector3(
				s.anchor.obj.position.x,
				s.anchor.position.activeY,
				s.anchor.obj.position.z
			);
			s.anchor.obj.position.lerp(destination, 0.05);
		}

		if (camera.position.z > 2.5) {
			for (let j = 0; j < s.objects.length; j++) {
				const obj = s.objects[j];

				if (obj.name !== 's0-gate1' && obj.name !== 's0-gate2') continue;

				const o = scene.getObjectByName(obj.name);
				if (!o) continue;

				if (obj.name === 's0-gate1' && THREE.MathUtils.radToDeg(obj.rotation.y) > -90) {
					obj.rotation.y -= 3 * delta;
				}

				if (obj.name === 's0-gate2' && THREE.MathUtils.radToDeg(obj.rotation.y) < 90) {
					obj.rotation.y += 3 * delta;
				}
			}
		}

		if (absDistanceTo > 7) {
			const o = scene.getObjectByName(s.anchor.obj.name);

			if (!o) return;

			if (s.anchor.obj.position.y - 0.5 <= s.anchor.position.inactiveY) {
				scene.remove(o);
			}

			const destination = new THREE.Vector3(
				s.anchor.obj.position.x,
				s.anchor.position.inactiveY,
				s.anchor.obj.position.z
			);
			s.anchor.obj.position.lerp(destination, 0.02);
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

		const light = new THREE.PointLight(green, 1, 15);
		light.position.set(camera.position.x, camera.position.y, camera.position.z + 2.5);
		light.castShadow = true;
		light.shadow!.bias = -0.003;
		light.shadow.mapSize.width = 2048;
		light.shadow.mapSize.height = 2048;
		light.shadow.camera.near = 0.1;
		light.shadow.camera.far = 10000;
		light.power = 120;
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
		function onWheelMove(e: WheelEvent) {
			zScroll = e.deltaY * 0.001;
		}

		let touchStart: number | null = null;

		window.addEventListener('touchstart', onTouchStart);
		function onTouchStart(e: TouchEvent) {
			touchStart = e.touches[0].clientY;
		}

		window.addEventListener('touchmove', onTouchMove);
		function onTouchMove(e: TouchEvent) {
			if (touchStart === null) return;
			zScroll = (touchStart - e.touches[0].clientY) * 0.001;
		}

		window.addEventListener('touchend', onTouchEnd);
		function onTouchEnd() {
			touchStart = null;
		}

		function animate() {
			requestAnimationFrame(animate);

			moveCam();
			scenes.forEach((s) => s.animate());

			render();
		}

		function moveCam() {
			if ((zPos <= 0 && zScroll <= 0) || (zPos >= 80 && zScroll <= 0)) return;

			zPos += zScroll;
			zScroll *= 0.9;

			camera.position.z = zPos;
			light.position.set(camera.position.x, camera.position.y, camera.position.z + 2.5);
		}

		function render() {
			renderer.render(scene, camera);
		}

		animate();

		mounted = true;
	});
</script>

<canvas id="c1" class={$page.data.device.isMobile && 'mobile'} />

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
</style>
