import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Environment {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder({ title: 'environment' })
        }

        this.setSunLight()
        this.setFog()
        this.setEnvironmentMap()
        this.scene.background = new THREE.Color('white')
    }

    setSunLight() {
        /*
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 50
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(0, 30, 0)
        this.sunLghtHelper = new THREE.DirectionalLightHelper(
            this.sunLight,
            5,
            0xff0000
        )
        this.scene.add(this.sunLight)
        this.scene.add(this.sunLghtHelper)

        // Debug
        if (this.debug.active) {
            this.debugFolder.addInput(this.sunLight, 'intensity', {
                min: 0,
                max: 10,
                step: 0.001,
                label: 'sunLightIntensity',
            })

            this.debugFolder.addInput(this.sunLight.position, 'x', {
                min: -5,
                max: 5,
                step: 1,
                label: 'sunLightX',
            })

            this.debugFolder.addInput(this.sunLight.position, 'y', {
                min: -5,
                max: 1000,
                step: 1,
                label: 'sunLightY',
            })

            this.debugFolder.addInput(this.sunLight.position, 'z', {
                min: -5,
                max: 1000,
                step: 1,
                label: 'sunLightZ',
            })
        }
        */

        this.sunLight = new THREE.PointLight(0xffffff, 1000)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 50
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.y = 10
        this.scene.add(this.sunLight)
    }

    setFog() {
        this.fog = new THREE.Fog('white', 40, 50)
        this.scene.fog = this.fog
    }

    setEnvironmentMap() {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () => {
            this.scene.traverse((child) => {
                if (
                    child instanceof THREE.Mesh &&
                    child.material instanceof THREE.MeshStandardMaterial
                ) {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity =
                        this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        if (this.debug.active) {
            this.debugFolder
                .addInput(this.environmentMap, 'intensity', {
                    min: 0,
                    max: 4,
                    step: 0.001,
                    label: 'envMapIntensity',
                })
                .on('change', this.environmentMap.updateMaterials)
        }
    }
}
