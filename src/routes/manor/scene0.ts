import {
	quaternary400HexColor,
	quaternary600HexColor,
	quaternary700HexColor,
	quaternary800HexColor,
	tertiary100HexColor
} from '$lib/constants/colors';
import type { AssetNames } from '$lib/stores/assets';
import { getRandomNum } from '$lib/utils/number';
import { WraithScene } from '$lib/utils/scene';
import * as THREE from 'three';

interface ISpark {
	parent: THREE.Mesh;
	mesh: THREE.Mesh;
	speed: number;
	duration: number;
	lifespan: number;
}

export class ManorScene0 extends WraithScene {
	public name = 'manor-s0-anchor';
	public position = {
		active: new THREE.Vector3(0, 0, 5),
		inactive: new THREE.Vector3(0, -10, 5)
	};

	private gate1: THREE.Mesh | null = null;
	private gate2: THREE.Mesh | null = null;

	// #region sparks
	private readonly sparksCount = 16;
	private readonly sparkColors = [
		quaternary400HexColor,
		quaternary600HexColor,
		quaternary800HexColor
	];
	private sparks: ISpark[] = [];
	// #endregion

	constructor(assets: Record<AssetNames, THREE.Mesh | THREE.Group | null>) {
		super();

		this.anchor = new THREE.Object3D();
		this.anchor.position.set(
			this.position.inactive.x,
			this.position.inactive.y,
			this.position.inactive.z
		);
		this.anchor.name = this.name;

		if (assets['stepstone-1']) {
			const stepStone1_1 = assets['stepstone-1'].clone() as THREE.Mesh;
			stepStone1_1.name = 'manor-s0-stepstone1-1';
			stepStone1_1.position.set(0, -1, -1.6);
			this.anchor.add(stepStone1_1);

			const stepStone1_2 = assets['stepstone-1'].clone() as THREE.Mesh;
			stepStone1_2.name = 'manor-s0-stepstone1-2';
			stepStone1_2.position.set(0.3, -1, -2);
			stepStone1_2.scale.set(0.15, 0.15, 0.15);
			stepStone1_2.rotateY(THREE.MathUtils.degToRad(72));
			this.anchor.add(stepStone1_2);

			const stepStone1_3 = assets['stepstone-1'].clone() as THREE.Mesh;
			stepStone1_3.name = 'manor-s0-stepstone1-3';
			stepStone1_3.position.set(0, -1, 4.9);
			stepStone1_3.scale.set(0.25, 0.25, 0.25);
			stepStone1_3.rotateY(THREE.MathUtils.degToRad(168));
			this.anchor.add(stepStone1_3);
		}

		if (assets['stepstone-2']) {
			const stepStone2_1 = assets['stepstone-2'].clone() as THREE.Mesh;
			stepStone2_1.name = 'manor-s0-stepstone2-1';
			stepStone2_1.position.set(-0.2, -1, 0.7);
			this.anchor.add(stepStone2_1);

			const stepStone2_2 = assets['stepstone-2'].clone() as THREE.Mesh;
			stepStone2_2.name = 'manor-s0-stepstone2-2';
			stepStone2_2.position.set(-0.3, -1, -2.2);
			stepStone2_2.rotateY(THREE.MathUtils.degToRad(133));
			this.anchor.add(stepStone2_2);
		}

		if (assets['stepstone-3']) {
			const stepStone3_1 = assets['stepstone-3'].clone() as THREE.Mesh;
			stepStone3_1.name = 'manor-s0-stepstone3-1';
			stepStone3_1.position.set(-0.05, -1, 0.2);
			stepStone3_1.rotateY(THREE.MathUtils.degToRad(180));
			this.anchor.add(stepStone3_1);

			const stepStone3_2 = assets['stepstone-3'].clone() as THREE.Mesh;
			stepStone3_2.name = 'manor-s0-stepstone3-2';
			stepStone3_2.position.set(-0.05, -1, 5.3);
			stepStone3_2.rotateY(THREE.MathUtils.degToRad(100));
			this.anchor.add(stepStone3_2);
		}

		if (assets['stepstone-4']) {
			const stepStone4_1 = assets['stepstone-4'].clone() as THREE.Mesh;
			stepStone4_1.name = 'manor-s0-stepstone4-1';
			stepStone4_1.position.set(0.24, -1, -1.2);
			stepStone4_1.rotateY(THREE.MathUtils.degToRad(30));
			this.anchor.add(stepStone4_1);

			const stepStone4_2 = assets['stepstone-4'].clone() as THREE.Mesh;
			stepStone4_2.name = 'manor-s0-stepstone4-2';
			stepStone4_2.position.set(-0.1, -1, 2.5);
			stepStone4_2.rotateY(THREE.MathUtils.degToRad(54));
			this.anchor.add(stepStone4_2);

			const stepStone4_3 = assets['stepstone-4'].clone() as THREE.Mesh;
			stepStone4_3.name = 'manor-s0-stepstone4-3';
			stepStone4_3.position.set(-0.4, -1, 5.1);
			stepStone4_3.scale.set(0.3, 0.15, 0.3);
			stepStone4_3.rotateY(THREE.MathUtils.degToRad(70));
			this.anchor.add(stepStone4_3);
		}

		if (assets['stepstone-5']) {
			const stepStone5_1 = assets['stepstone-5'].clone() as THREE.Mesh;
			stepStone5_1.name = 'manor-s0-stepstone5-1';
			stepStone5_1.position.set(0.4, -1, 4);
			stepStone5_1.rotateY(THREE.MathUtils.degToRad(270));
			this.anchor.add(stepStone5_1);

			const stepStone5_2 = assets['stepstone-5'].clone() as THREE.Mesh;
			stepStone5_2.name = 'manor-s0-stepstone5-1';
			stepStone5_2.position.set(-0.54, -1, 6.7);
			stepStone5_2.rotateY(THREE.MathUtils.degToRad(34));
			this.anchor.add(stepStone5_2);
		}

		if (assets['tree-1']) {
			const tree1_1 = assets['tree-1'].clone() as THREE.Group;
			tree1_1.name = 'manor-s0-tree1_1';
			tree1_1.position.set(-4, -1, 1);
			tree1_1.scale.set(0.6, 1, 1.3);
			tree1_1.rotateY(THREE.MathUtils.degToRad(173));
			this.anchor.add(tree1_1);

			const tree1_2 = assets['tree-1'].clone() as THREE.Group;
			tree1_2.name = 'manor-s0-tree1_2';
			tree1_2.position.set(2.05, -1, -1.6);
			tree1_2.scale.set(0.6, 1, 1.3);
			tree1_2.rotateY(THREE.MathUtils.degToRad(89));
			this.anchor.add(tree1_2);
		}

		if (assets['tree-2']) {
			const tree2_1 = assets['tree-2'].clone() as THREE.Group;
			tree2_1.name = 'manor-s0-tree2_1';
			tree2_1.position.set(1.85, -1, 0);
			tree2_1.rotateY(THREE.MathUtils.degToRad(30));
			this.anchor.add(tree2_1);

			const tree2_2 = assets['tree-2'].clone() as THREE.Group;
			tree2_2.name = 'manor-s0-tree2_2';
			tree2_2.position.set(-2.75, -1, 2);
			tree2_2.rotateY(THREE.MathUtils.degToRad(82));
			this.anchor.add(tree2_2);
		}

		if (assets['tree-3']) {
			const tree3_2 = assets['tree-3'].clone() as THREE.Group;
			tree3_2.name = 'manor-s0-tree3_2';
			tree3_2.position.set(4, -1, 0.5);
			tree3_2.rotateY(THREE.MathUtils.degToRad(0));
			this.anchor.add(tree3_2);

			const tree3_3 = assets['tree-3'].clone() as THREE.Group;
			tree3_3.name = 'manor-s0-tree3_3';
			tree3_3.position.set(-1.7, -1, -0.7);
			tree3_3.rotateY(THREE.MathUtils.degToRad(-120));
			this.anchor.add(tree3_3);
		}

		if (assets['tree-4']) {
			const tree4_1 = assets['tree-4'].clone() as THREE.Group;
			tree4_1.name = 'manor-s0-tree4_1';
			tree4_1.position.set(-2.35, -1, -1.7);
			tree4_1.rotateY(THREE.MathUtils.degToRad(-92));
			this.anchor.add(tree4_1);

			const tree4_2 = assets['tree-4'].clone() as THREE.Group;
			tree4_2.name = 'manor-s0-tree4_2';
			tree4_2.position.set(3.9, -1, 2.5);
			this.anchor.add(tree4_2);
		}

		if (assets['fence-1'] && assets['fence-2']) {
			const fence1 = assets['fence-1'].clone() as THREE.Mesh;
			fence1.name = 's0-fence1';
			fence1.position.set(4.2, -1, 4);
			this.anchor.add(fence1);

			const fence2 = assets['fence-2'].clone() as THREE.Mesh;
			fence2.name = 's0-fence2';
			fence2.position.set(-4.2, -1, 4);
			this.anchor.add(fence2);
		}

		if (assets['gate-large-1-1'] && assets['gate-large-1-2'] && assets['pillar-skull']) {
			const gateLarge1_1 = assets['gate-large-1-1'].clone() as THREE.Mesh;
			gateLarge1_1.name = 'manor-s0-gateLarge1-1';
			gateLarge1_1.position.set(1.62, 1.5, 4);
			gateLarge1_1.rotateY(THREE.MathUtils.degToRad(180));
			this.anchor.add(gateLarge1_1);

			const gateLarge1_2 = assets['gate-large-1-2'].clone() as THREE.Mesh;
			gateLarge1_2.name = 'manor-s0-gateLarge1-2';
			gateLarge1_2.position.set(-1.62, 1.42, 4);
			gateLarge1_2.rotateY(THREE.MathUtils.degToRad(180));
			this.anchor.add(gateLarge1_2);

			const pillarSkull1 = assets['pillar-skull'].clone() as THREE.Mesh;
			pillarSkull1.name = 'manor-s0-pillarSkull1';
			pillarSkull1.position.set(-2, -1, 4);
			this.anchor.add(pillarSkull1);

			const pillarSkull2 = assets['pillar-skull'].clone() as THREE.Mesh;
			pillarSkull2.name = 'manor-s0-pillarSkull2';
			pillarSkull2.position.set(2, -1, 4);
			pillarSkull2.rotateY(THREE.MathUtils.degToRad(180));
			this.anchor.add(pillarSkull2);

			const cemetaryLight0 = new THREE.PointLight(tertiary100HexColor, 30, 100);
			cemetaryLight0.name = 'manor-0-cemetaryLight0';
			cemetaryLight0.position.set(0.5, 3, 2.25);
			this.anchor.add(cemetaryLight0);
		}

		if (assets['brazier-1']) {
			const brazier1_1 = assets['brazier-1'].clone() as THREE.Mesh;
			brazier1_1.name = 'manor-s0-brazier1_1';
			brazier1_1.position.set(-1.85, -1, 2.8);
			brazier1_1.rotateY(THREE.MathUtils.degToRad(19));
			this.anchor.add(brazier1_1);

			this.initSparks(brazier1_1);

			const brazier1_2 = assets['brazier-1'].clone() as THREE.Mesh;
			brazier1_2.name = 'manor-s0-brazier1_2';
			brazier1_2.position.set(1.85, -1, 2.8);
			brazier1_2.rotateY(THREE.MathUtils.degToRad(124));
			this.anchor.add(brazier1_2);

			this.initSparks(brazier1_2);

			const brazierLight1 = new THREE.PointLight(quaternary700HexColor, 5, 40);
			brazierLight1.name = 'manor-0-brazierLight1';
			brazierLight1.position.set(1.5, 0.5, 2.25);
			brazierLight1.castShadow = true;
			brazierLight1.shadow!.bias = -0.003;
			brazierLight1.shadow.mapSize.width = 2048;
			brazierLight1.shadow.mapSize.height = 2048;
			brazierLight1.shadow.camera.near = 0.1;
			brazierLight1.shadow.camera.far = 10000;
			this.anchor.add(brazierLight1);

			const brazierLight2 = new THREE.PointLight(quaternary700HexColor, 5, 40);
			brazierLight2.name = 'manor-s0-brazierLight2';
			brazierLight2.position.set(-1.5, 0.5, 2.25);
			brazierLight2.castShadow = true;
			brazierLight2.shadow!.bias = -0.003;
			brazierLight2.shadow.mapSize.width = 2048;
			brazierLight2.shadow.mapSize.height = 2048;
			brazierLight2.shadow.camera.near = 0.1;
			brazierLight2.shadow.camera.far = 10000;
			this.anchor.add(brazierLight2);
		}
	}

	public animate = (
		scene: THREE.Scene,
		camera: THREE.PerspectiveCamera,
		clock: THREE.Clock,
		inView?: boolean
	) => {
		if (!this.isLoaded()) return;

		if (inView) {
			this.animateIntoView(scene);
			this.animateSparks(clock);
		} else {
			this.animateOutOfView(scene);
		}

		// if (camera.position.z > 2.25) {
		//   if (this.gate1 && THREE.MathUtils.radToDeg(this.gate1.rotation.y) > -90) {
		//     this.gate1.rotation.y -= 3 * delta;
		//   }

		//   if (this.gate2 && THREE.MathUtils.radToDeg(this.gate2.rotation.y) < 90) {
		//     this.gate2.rotation.y += 3 * delta;
		//   }
		// }
	};

	protected isLoaded = () => {
		this.loaded = this.loaded || !!this.anchor.getObjectByName('manor-s0-tree4_1');
		return this.loaded;
	};

	private animateSparks = (clock: THREE.Clock) => {
		const delta = clock.getDelta();

		for (let i = 0; i < this.sparks.length; i++) {
			let spark = this.sparks[i];

			if (spark.duration > spark.lifespan) {
				spark.parent.remove(spark.mesh);
				this.sparks.splice(i, 1);
				spark = this.initSpark(spark.parent);
				this.sparks.push(spark);
			}

			spark.duration += delta;
			(spark.mesh.material as THREE.Material).opacity = 1 - spark.duration / spark.lifespan;

			const scaleDegradation = 1 - delta;
			spark.mesh.geometry.scale(scaleDegradation, scaleDegradation, scaleDegradation);

			spark.mesh.position.set(
				spark.mesh.position.x + (spark.duration / spark.lifespan) * delta,
				spark.mesh.position.y + spark.speed * delta,
				spark.mesh.position.z + (spark.duration / spark.lifespan) * delta
			);
		}
	};

	private initSpark = (
		base: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.Material | THREE.Material[]
		>
	): ISpark => {
		const color = this.sparkColors[Math.round(getRandomNum() * (this.sparkColors.length - 1))];

		const mesh = new THREE.Mesh(
			new THREE.BoxGeometry(0.5, 0.5, 0.5),
			new THREE.MeshStandardMaterial({
				color,
				emissive: color,
				emissiveIntensity: 5,
				transparent: true,
				opacity: getRandomNum()
			})
		);

		base.add(mesh);

		mesh.position.set(
			getRandomNum() * 0.55 * (getRandomNum() > 0.5 ? 1 : -1),
			1.1,
			getRandomNum() * 0.55 * (getRandomNum() > 0.5 ? 1 : -1)
		);

		mesh.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 7.5);

		const scale = getRandomNum() * 0.5;
		mesh.geometry.scale(scale, scale, scale);

		return {
			parent: base,
			mesh,
			speed: 3 * getRandomNum() + 0.8,
			duration: 0,
			lifespan: getRandomNum() * 0.7
		};
	};

	private initSparks = (
		base: THREE.Mesh<
			THREE.BufferGeometry<THREE.NormalBufferAttributes>,
			THREE.Material | THREE.Material[]
		>
	) => {
		for (let i = 0; i < this.sparksCount; i++) {
			this.sparks.push(this.initSpark(base));
		}
	};
}
