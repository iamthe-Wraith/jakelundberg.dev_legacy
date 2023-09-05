<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { assets } from '$lib/stores/assets';

	interface ISceneObject {
		mesh: THREE.Mesh | THREE.Group | THREE.Light;
		position: {
			activeY: number;
			inactiveY: number;
		};
	}

	interface IScene {
		trigger: THREE.Vector3;
		objects: ISceneObject[];
	}

	let scene: THREE.Scene;
	let camera: THREE.PerspectiveCamera;
	let renderer: THREE.WebGLRenderer;

	const scenes: IScene[] = [];

	let mounted = false;

	let zScroll = 0;
	let zPos = 0;

	$: {
		if (mounted && scene && $assets.loaded === $assets.total) {
			scenes.push({
				trigger: new THREE.Vector3(0, 0, 6),
				objects: []
			});

			if (
				$assets.meshes['pillar-lantern'] &&
				$assets.meshes['gate-1-1'] &&
				$assets.meshes['gate-1-2'] &&
				$assets.meshes['fence-1'] &&
				$assets.meshes['fence-2']
			) {
				const pillar1 = $assets.meshes['pillar-lantern'].clone() as THREE.Mesh;
				pillar1.position.set(1.5, -10, 5);
				pillar1.rotateY(Math.PI);
				scene.add(pillar1);
				scenes[0].objects.push({
					mesh: pillar1,
					position: {
						activeY: -1,
						inactiveY: -10
					}
				});

				const pillar2 = $assets.meshes['pillar-lantern'].clone() as THREE.Mesh;
				pillar2.position.set(-1.5, -10, 5);
				scene.add(pillar2);
				scenes[0].objects.push({
					mesh: pillar2,
					position: {
						activeY: -1,
						inactiveY: -10
					}
				});

				const gate1 = $assets.meshes['gate-1-1'].clone() as THREE.Mesh;
				gate1.position.set(1.03, -10, 5);
				gate1.rotateY(THREE.MathUtils.degToRad(180));
				scene.add(gate1);
				scenes[0].objects.push({
					mesh: gate1,
					position: {
						activeY: 0,
						inactiveY: -10
					}
				});

				const gate2 = $assets.meshes['gate-1-2'].clone() as THREE.Mesh;
				gate2.position.set(-1.03, -10, 5);
				gate2.rotateY(THREE.MathUtils.degToRad(180));
				scene.add(gate2);
				scenes[0].objects.push({
					mesh: gate2,
					position: {
						activeY: 0.1,
						inactiveY: -10
					}
				});

				const fence1 = $assets.meshes['fence-1'].clone() as THREE.Mesh;
				fence1.position.set(4.2, -10, 5);
				scene.add(fence1);
				scenes[0].objects.push({
					mesh: fence1,
					position: {
						activeY: 0.075,
						inactiveY: -10
					}
				});

				const fence2 = $assets.meshes['fence-2'].clone() as THREE.Mesh;
				fence2.position.set(-4.2, -10, 5);
				scene.add(fence2);
				scenes[0].objects.push({
					mesh: fence2,
					position: {
						activeY: -0.95,
						inactiveY: -10
					}
				});
			}

			if ($assets.meshes['tree-1']) {
				const tree1 = $assets.meshes['tree-1'].clone() as THREE.Group;
				tree1.position.set(-4, -10, 7);
				tree1.scale.set(0.6, 1, 1.3);
				tree1.rotateY(Math.PI * 1.19);
				scene.add(tree1);
				scenes[0].objects.push({
					mesh: tree1,
					position: {
						activeY: -1.005,
						inactiveY: -10
					}
				});
			}

			const light = new THREE.PointLight(0x0dbf95, 3, 1000);
			light.position.set(-5, -10, 2);
			light.castShadow = true;
			light.shadow!.bias = -0.003;
			light.shadow.mapSize.width = 2048;
			light.shadow.mapSize.height = 2048;
			light.shadow.camera.near = 0.1;
			light.shadow.camera.far = 10000;
			light.distance = 15;
			light.intensity = 14;
			light.power = 750;
			scene.add(light);
			scenes[0].objects.push({
				mesh: light,
				position: {
					activeY: 4,
					inactiveY: -10
				}
			});

			const light2 = new THREE.PointLight(0x0621a5, 3, 1000);
			light2.position.set(5, 4, 2);
			light2.castShadow = true;
			light2.shadow!.bias = -0.003;
			light2.shadow.mapSize.width = 2048;
			light2.shadow.mapSize.height = 2048;
			light2.shadow.camera.near = 0.1;
			light2.shadow.camera.far = 10000;
			light2.distance = 10;
			light2.intensity = 10;
			light2.power = 750;
			scene.add(light2);
			scenes[0].objects.push({
				mesh: light2,
				position: {
					activeY: 4,
					inactiveY: -10
				}
			});

			const light3 = new THREE.PointLight(0x9e0dbf, 10, 200);
			light3.position.set(0, 8, 12);
			light3.castShadow = true;
			light3.shadow!.bias = -0.003;
			light3.shadow.mapSize.width = 2048;
			light3.shadow.mapSize.height = 2048;
			light3.shadow.camera.near = 0.1;
			light3.shadow.camera.far = 10000;
			light3.power = 750;
			scene.add(light3);
			scenes[0].objects.push({
				mesh: light3,
				position: {
					activeY: 8,
					inactiveY: -10
				}
			});
		}
	}

	onMount(async () => {
		const main = document.querySelector('main') as HTMLCanvasElement;
		const rect = main.getBoundingClientRect();
		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(75, rect.width / rect.height, 0.1, 1000);
		camera.position.set(0, 0.5, 0);
		camera.lookAt(0, 0, 7);

		renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: document.querySelector('#c1') as HTMLCanvasElement
		});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(rect.width, rect.height);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		const planeGeo = new THREE.PlaneGeometry(100, 100);
		const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
		const plane = new THREE.Mesh(planeGeo, planeMaterial);
		plane.rotation.x = -Math.PI / 2;
		plane.receiveShadow = true;
		plane.position.set(0, -1, 50);
		scene.add(plane);

		window.addEventListener('wheel', onWheelMove);
		function onWheelMove(e: WheelEvent) {
			zScroll = e.deltaY * 0.001;
		}

		function animate() {
			requestAnimationFrame(animate);

			moveCam();
			animateSceneObjects();

			render();
		}

		function animateSceneObjects() {
			for (let i = 0; i < scenes.length; i++) {
				const s = scenes[i];
				const distanceTo = s.trigger.z - camera.position.z;

				if (distanceTo > 2.5 && distanceTo < 8) {
					for (let j = 0; j < s.objects.length; j++) {
						const obj = s.objects[j];

						const destination = new THREE.Vector3(
							obj.mesh.position.x,
							obj.position.activeY,
							obj.mesh.position.z
						);
						obj.mesh.position.lerp(destination, 0.1);
					}
				} else {
					for (let j = 0; j < s.objects.length; j++) {
						const obj = s.objects[j];

						const destination = new THREE.Vector3(
							obj.mesh.position.x,
							obj.position.inactiveY,
							obj.mesh.position.z
						);
						obj.mesh.position.lerp(destination, 0.02);
					}
				}
			}
		}

		function moveCam() {
			if ((zPos <= 0 && zScroll <= 0) || (zPos >= 80 && zScroll <= 0)) return;

			zPos += zScroll;
			zScroll *= 0.9;

			camera.position.z = zPos;
		}

		function render() {
			renderer.render(scene, camera);
		}

		animate();

		mounted = true;
	});
</script>

<canvas id="c1" />
