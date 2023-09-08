import * as THREE from 'three';

interface IWraithScenePosition {
  active: THREE.Vector3,
  inactive: THREE.Vector3,
}

export abstract class WraithScene {
  public anchor: THREE.Object3D;

  public abstract name: string;
  public abstract position: IWraithScenePosition;

  protected loaded = false;

  constructor() {
    this.anchor = new THREE.Object3D();
  }

  public abstract animate: (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    clock: THREE.Clock
  ) => void;

  protected abstract isLoaded: () => boolean;

  protected animateIntoView = (scene: THREE.Scene) => {
    // animate into view
    const o = scene.getObjectByName(this.name);
    if (!o) {
      console.log('adding to scene');
      scene.add(this.anchor);
    }

    const destination = new THREE.Vector3(
      this.position.active.x,
      this.position.active.y,
      this.position.active.z,
    );
    this.anchor.position.lerp(destination, 0.1);
  };

  protected animateOutOfView = (scene: THREE.Scene) => {
    const o = scene.getObjectByName(this.name);

    if (!o) return;

    if (this.anchor.position.y - 0.5 <= this.position.inactive.y) {
      scene.remove(o);
    }

    const destination = new THREE.Vector3(
      this.position.inactive.x,
      this.position.inactive.y,
      this.position.inactive.z,
    );
    this.anchor.position.lerp(destination, 0.02);
  };
}