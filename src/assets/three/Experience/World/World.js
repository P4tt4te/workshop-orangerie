import Experience from '../Experience'
import Environment from './Environment'
import Floor from './../World/Floor'
import Cube from './../World/Cube'
import LeftCube from './LeftCube'
import RightCube from './RightCube'
import FrontWall from './FrontWall'
import BackWall from './BackWall'
export default class World {
    constructor() {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () => {
            // Setup
            this.floor = new Floor()
            //this.fox = new Fox();
            this.environment = new Environment()
            this.cube = new Cube()
            this.leftCube = new LeftCube()
            this.rightCube = new RightCube()
            this.frontwall = new FrontWall()
            this.backwall = new BackWall()
        })
    }

    update() {
        if (this.fox) this.fox.update()
    }
}
