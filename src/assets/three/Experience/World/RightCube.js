import * as THREE from "three";
import Experience from "../Experience.js";

export default class RightCube {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;

    this.setGeometry();
    this.setMaterial();
    this.setMesh();
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1);
  }

  setMaterial() {
    this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = 0.5;
    this.mesh.position.x = 3;
    this.mesh.receiveShadow = true;
    this.scene.add(this.mesh);
  }
}
