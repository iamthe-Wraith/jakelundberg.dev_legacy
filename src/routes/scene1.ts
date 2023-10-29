import type { AssetNames } from '$lib/stores/assets';
import { WraithScene } from '$lib/utils/scene';
import * as THREE from 'three';

export class WraithScene1 extends WraithScene {
	public name = 's1-anchor';
	public position = {
		active: new THREE.Vector3(0, 0, 15),
		inactive: new THREE.Vector3(0, -10, 15)
	};

	constructor(assets: Record<AssetNames, THREE.Mesh | THREE.Group | null>) {
		super();

		this.anchor = new THREE.Object3D();
		this.anchor.position.set(
			this.position.active.x,
			this.position.active.y,
			this.position.active.z
		);
		this.anchor.name = this.name;

		if (assets['stepstone-1']) {
			const stepStone1_1 = assets['stepstone-1'].clone() as THREE.Mesh;
			stepStone1_1.name = 's1-stepstone1-1';
			stepStone1_1.position.set(0.3, -1, -0.6);
			this.anchor.add(stepStone1_1);

			const stepStone1_2 = assets['stepstone-1'].clone() as THREE.Mesh;
			stepStone1_2.name = 's1-stepstone1-2';
			stepStone1_2.position.set(0.3, -1, -3);
			stepStone1_2.scale.set(0.15, 0.15, 0.15);
			stepStone1_2.rotateY(THREE.MathUtils.degToRad(72));
			this.anchor.add(stepStone1_2);

			const stepStone1_3 = assets['stepstone-1'].clone() as THREE.Mesh;
			stepStone1_3.name = 's1-stepstone1-3';
			stepStone1_3.position.set(0, -1, 3.9);
			stepStone1_3.scale.set(0.25, 0.25, 0.25);
			stepStone1_3.rotateY(THREE.MathUtils.degToRad(168));
			this.anchor.add(stepStone1_3);
		}

		if (assets['stepstone-2']) {
			const stepStone2_1 = assets['stepstone-2'].clone() as THREE.Mesh;
			stepStone2_1.name = 's1-stepstone2-1';
			stepStone2_1.position.set(-0.2, -1, -0.3);
			this.anchor.add(stepStone2_1);

			const stepStone2_2 = assets['stepstone-2'].clone() as THREE.Mesh;
			stepStone2_2.name = 's1-stepstone2-2';
			stepStone2_2.position.set(-0.3, -1, -2.8);
			stepStone2_2.rotateY(THREE.MathUtils.degToRad(133));
			this.anchor.add(stepStone2_2);
		}

		if (assets['stepstone-3']) {
			const stepStone3_1 = assets['stepstone-3'].clone() as THREE.Mesh;
			stepStone3_1.name = 's1-stepstone3-1';
			stepStone3_1.position.set(-0.05, -1, -0.8);
			stepStone3_1.rotateY(THREE.MathUtils.degToRad(180));
			this.anchor.add(stepStone3_1);

			const stepStone3_2 = assets['stepstone-3'].clone() as THREE.Mesh;
			stepStone3_2.name = 's1-stepstone3-2';
			stepStone3_2.position.set(-0.05, -1, 4.3);
			stepStone3_2.rotateY(THREE.MathUtils.degToRad(100));
			this.anchor.add(stepStone3_2);
		}

		if (assets['stepstone-4']) {
			const stepStone4_1 = assets['stepstone-4'].clone() as THREE.Mesh;
			stepStone4_1.name = 's1-stepstone4-1';
			stepStone4_1.position.set(0.24, -1, -2);
			stepStone4_1.rotateY(THREE.MathUtils.degToRad(30));
			this.anchor.add(stepStone4_1);

			const stepStone4_2 = assets['stepstone-4'].clone() as THREE.Mesh;
			stepStone4_2.name = 's1-stepstone4-2';
			stepStone4_2.position.set(-0.1, -1, 1.5);
			stepStone4_2.rotateY(THREE.MathUtils.degToRad(54));
			this.anchor.add(stepStone4_2);

			const stepStone4_3 = assets['stepstone-4'].clone() as THREE.Mesh;
			stepStone4_3.name = 's1-stepstone4-3';
			stepStone4_3.position.set(-0.4, -1, 4.1);
			stepStone4_3.scale.set(0.3, 0.15, 0.3);
			stepStone4_3.rotateY(THREE.MathUtils.degToRad(70));
			this.anchor.add(stepStone4_3);
		}

		if (assets['stepstone-5']) {
			const stepStone5_1 = assets['stepstone-5'].clone() as THREE.Mesh;
			stepStone5_1.name = 's1-stepstone5-1';
			stepStone5_1.position.set(0.4, -1, 3);
			stepStone5_1.rotateY(THREE.MathUtils.degToRad(270));
			this.anchor.add(stepStone5_1);

			const stepStone5_2 = assets['stepstone-5'].clone() as THREE.Mesh;
			stepStone5_2.name = 's1-stepstone5-1';
			stepStone5_2.position.set(-0.54, -1, 5.7);
			stepStone5_2.rotateY(THREE.MathUtils.degToRad(34));
			this.anchor.add(stepStone5_2);
		}

		if (assets['tree-1']) {
			const tree1_1 = assets['tree-1'].clone() as THREE.Group;
			tree1_1.name = 's1-tree1_1';
			tree1_1.position.set(-4, -1, 2);
			tree1_1.scale.set(0.6, 1, 1.3);
			tree1_1.rotateY(THREE.MathUtils.degToRad(173));
			this.anchor.add(tree1_1);

			const tree1_2 = assets['tree-1'].clone() as THREE.Group;
			tree1_2.name = 's1-tree1_2';
			tree1_2.position.set(4, -1, 1);
			tree1_2.scale.set(0.6, 1, 1.3);
			tree1_2.rotateY(THREE.MathUtils.degToRad(42));
			this.anchor.add(tree1_2);

			const tree1_3 = assets['tree-1'].clone() as THREE.Group;
			tree1_3.name = 's1-tree1_3';
			tree1_3.position.set(1.8, -1, -1.2);
			tree1_3.scale.set(0.6, 1, 1.3);
			tree1_3.rotateY(THREE.MathUtils.degToRad(42));
			this.anchor.add(tree1_3);

			const tree1_4 = assets['tree-1'].clone() as THREE.Group;
			tree1_4.name = 's1-tree1_4';
			tree1_4.position.set(5.8, -1, 7.2);
			tree1_4.scale.set(0.6, 1, 1.3);
			tree1_4.rotateY(THREE.MathUtils.degToRad(201));
			this.anchor.add(tree1_4);
		}

		if (assets['tree-2']) {
			const tree2_1 = assets['tree-2'].clone() as THREE.Group;
			tree2_1.name = 's1-tree2_1';
			tree2_1.position.set(-2.6, -1, 4.5);
			tree2_1.rotateY(THREE.MathUtils.degToRad(-92));
			this.anchor.add(tree2_1);

			const tree2_2 = assets['tree-2'].clone() as THREE.Group;
			tree2_2.name = 's1-tree2_2';
			tree2_2.position.set(1.5, -1, 2.5);
			tree2_2.rotateY(THREE.MathUtils.degToRad(30));
			this.anchor.add(tree2_2);

			const tree2_3 = assets['tree-2'].clone() as THREE.Group;
			tree2_3.name = 's1-tree2_3';
			tree2_3.position.set(-1.2, -1, 0.6);
			tree2_3.rotateY(THREE.MathUtils.degToRad(83));
			this.anchor.add(tree2_3);

			const tree2_4 = assets['tree-2'].clone() as THREE.Group;
			tree2_4.name = 's1-tree2_4';
			tree2_4.position.set(4.3, -1, 8.6);
			tree2_4.rotateY(THREE.MathUtils.degToRad(213));
			this.anchor.add(tree2_4);
		}

		if (assets['tree-3']) {
			const tree3_1 = assets['tree-3'].clone() as THREE.Group;
			tree3_1.name = 's1-tree3_1';
			tree3_1.position.set(-5, -1, 8.5);
			tree3_1.rotateY(THREE.MathUtils.degToRad(-92));
			this.anchor.add(tree3_1);

			const tree3_2 = assets['tree-3'].clone() as THREE.Group;
			tree3_2.name = 's1-tree3_2';
			tree3_2.position.set(3.8, -1, 3.5);
			tree3_2.rotateY(THREE.MathUtils.degToRad(0));
			this.anchor.add(tree3_2);

			const tree3_3 = assets['tree-3'].clone() as THREE.Group;
			tree3_3.name = 's1-tree3_3';
			tree3_3.position.set(-1.5, -1, -1.5);
			tree3_3.rotateY(THREE.MathUtils.degToRad(-120));
			this.anchor.add(tree3_3);

			const tree3_4 = assets['tree-3'].clone() as THREE.Group;
			tree3_4.name = 's1-tree3_4';
			tree3_4.position.set(-3.9, -1, 0.2);
			tree3_4.rotateY(THREE.MathUtils.degToRad(-120));
			this.anchor.add(tree3_4);
		}

		if (assets['tree-4']) {
			const tree4_1 = assets['tree-4'].clone() as THREE.Group;
			tree4_1.name = 's1-tree4_1';
			tree4_1.position.set(-1.8, -1, 6.5);
			tree4_1.rotateY(THREE.MathUtils.degToRad(-92));
			this.anchor.add(tree4_1);

			const tree4_2 = assets['tree-4'].clone() as THREE.Group;
			tree4_2.name = 's1-tree4_2';
			tree4_2.position.set(1.5, -1, 6);
			tree4_2.rotateY(THREE.MathUtils.degToRad(60));
			this.anchor.add(tree4_2);

			const tree4_3 = assets['tree-4'].clone() as THREE.Group;
			tree4_3.name = 's1-tree4_3';
			tree4_3.position.set(-6.8, -1, 5);
			tree4_3.rotateY(THREE.MathUtils.degToRad(60));
			this.anchor.add(tree4_3);

			const tree4_4 = assets['tree-4'].clone() as THREE.Group;
			tree4_4.name = 's1-tree4_4';
			tree4_4.position.set(5.3, -1, 0.9);
			tree4_4.rotateY(THREE.MathUtils.degToRad(163));
			this.anchor.add(tree4_4);
		}
	}

	public animate = (scene: THREE.Scene, camera: THREE.PerspectiveCamera) => {
		if (!this.isLoaded()) return;

		// const distanceTo = this.position.active.z - camera.position.z;
		// const absDistanceTo = Math.abs(distanceTo);

		// if (absDistanceTo > 4.5 && absDistanceTo <= 10) {
		this.animateIntoView(scene);
		// }

		// if (absDistanceTo > 10) {
		// 	this.animateOutOfView(scene);
		// }
	};

	protected isLoaded = () => {
		this.loaded = this.loaded || !!this.anchor.getObjectByName('s1-tree4_2');
		return this.loaded;
	};
}
