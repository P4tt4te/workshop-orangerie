import * as THREE from 'three'
import Experience from '../Experience.js'

export default class SideWall {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
    }

    setGeometry() {
        this.geometry = new THREE.BoxGeometry(2, 8, 22, 10, 8, 1)
    }

    setMaterial() {
        this.material = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            emissive: 0x292828,
            roughness: 0.1,
            metalness: 0,
        })
    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.receiveShadow = true
        this.mesh.position.y = 4
        this.mesh.position.x = 14
        this.mesh.position.z = 3
        this.scene.add(this.mesh)
    }
}
