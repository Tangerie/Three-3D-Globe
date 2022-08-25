import ThreeJSProgram from "./ThreeJSProgram";

import * as THREE from "three";
import { TrackballControls } from "./util/TrackballControls";

export default class EmptyThreeJSProgram extends ThreeJSProgram {
    scene : THREE.Scene;
    camera : THREE.PerspectiveCamera;
    controls : TrackballControls;


    Init() {
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera();
        this.camera.aspect = this.renderer.domElement.width / this.renderer.domElement.height;
        this.camera.updateProjectionMatrix();
        

        this.controls = new TrackballControls(this.camera, this.renderer.domElement);
        
    }

    Update(delta: number) {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
    }

    Cleanup() {
        
    }

    Resize() {
        this.camera.aspect = this.renderer.domElement.width / this.renderer.domElement.height;
        this.camera.updateProjectionMatrix();
    }
}