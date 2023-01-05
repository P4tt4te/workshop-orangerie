import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { PerspectiveCamera } from 'three'
import gsap from 'gsap'

export default class Camera {
    constructor() {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

    this.setInstance();
    this.moveCamera();
    //this.setControls();
  }

  setInstance() {
    this.instance = new PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(0, 1, 5);
    this.scene.add(this.instance);
  }

  setControls() {
    //this.controls = new OrbitControls(this.instance, this.canvas);
    //this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  moveCamera() {
    const self = this;
    this.experience.goLeft.addEventListener(
      "click",
      function () {
        gsap
          .timeline()
          .to(self.instance.position, { x: self.instance.position.x - 3 });
      },
      false
    );

    this.experience.goRight.addEventListener(
      "click",
      function () {
        gsap
          .timeline()
          .to(self.instance.position, { x: self.instance.position.x + 3 });
      },
      false
    );
  }

  navigation(position) {
    if (position === 3) {
      this.experience.goRight.style.display = "none";
    } else if (position === -3) {
      this.experience.goLeft.style.display = "none";
    } else {
      this.experience.goRight.style.display = "block";
      this.experience.goLeft.style.display = "block";
    }

    if (position === 0 || position === 3 || position === -3) {
      this.experience.goRight.disabled = false;
      this.experience.goLeft.disabled = false;
    } else {
      this.experience.goRight.disabled = true;
      this.experience.goLeft.disabled = true;
    }
  }

  update() {
    console.log(this.instance.position.x);
    this.navigation(this.instance.position.x);
    //this.controls.update();
  }
}
