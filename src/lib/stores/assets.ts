import { writable } from 'svelte/store';
import type * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { assets as assetsPath } from '$app/paths';

type AssetNames = 'fence-1' |
  'fence-2' |
  'fence-3' |
  'gate-1-1' |
  'gate-1-2' |
  'mausoleum-1' |
  'pillar-lantern' |
  'stepstone-1' |
  'stepstone-2' |
  'stepstone-3' |
  'stepstone-4' |
  'stepstone-5' |
  'tombstone-1' |
  'tombstone-2' |
  'tombstone-3' |
  'tombstone-4' |
  'tree-1' |
  'tree-2' |
  'tree-3' |
  'tree-4';

interface IAssets {
  meshes: Record<AssetNames, (THREE.Mesh | THREE.Group | null)>;
  loaded: number;
  total: number;
  error: string;
}

const initAssets: IAssets = {
  meshes: {
    'fence-1': null,
    'fence-2': null,
    'fence-3': null,
    'gate-1-1': null,
    'gate-1-2': null,
    'mausoleum-1': null,
    'pillar-lantern': null,
    'stepstone-1': null,
    'stepstone-2': null,
    'stepstone-3': null,
    'stepstone-4': null,
    'stepstone-5': null,
    'tombstone-1': null,
    'tombstone-2': null,
    'tombstone-3': null,
    'tombstone-4': null,
    'tree-1': null,
    'tree-2': null,
    'tree-3': null,
    'tree-4': null,
  },
  loaded: 0,
  total: 0,
  error: '',
};

function initMesh(mesh: THREE.Mesh) {
  mesh.geometry.computeVertexNormals();
  mesh.castShadow = true;
  mesh.receiveShadow = true;
} 

function createAssetsStore() {
	const { subscribe, update } = writable<IAssets>(initAssets);

	return {
		subscribe,
		load: async () => {
      const assets = { ...initAssets };

      const loader = new GLTFLoader();
      loader.load(
        `${assetsPath}/jakelundberg-dev-assets.glb`,
        function (gltf) {
          gltf.scene.children.forEach((child) => {
            const g = child as THREE.Group;
            if (g.isGroup) {
              g.children.forEach((groupChild) => {
                initMesh(groupChild as THREE.Mesh);
              });

              assets.meshes[g.name as AssetNames] = g;
            }

            const m = child as THREE.Mesh;
            if (m.isMesh) {
              initMesh(m);
              assets.meshes[m.name as AssetNames] = m;
            }
          });

          update((state) => ({ ...state, meshes: assets.meshes } as IAssets));
        },
        (xhr) => {
          update((state) => ({ ...state, loaded: xhr.loaded, total: xhr.total } as IAssets));
        },
        (error) => {
          update((state) => ({ ...state, error: error.message } as IAssets));
        }
      );
    },
	};
}

export const assets = createAssetsStore();
