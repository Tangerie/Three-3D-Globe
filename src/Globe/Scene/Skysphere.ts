import * as THREE from "three";
import { SphereGeometry } from "three";

const SKY_RADIUS = 500;

export default class Skybox extends THREE.Mesh {
    constructor(url : string) {
        super();

        this.geometry = new THREE.SphereGeometry(SKY_RADIUS);

        this.LoadImage(url);
    }

    LoadImage(url : string) {
        this.visible = false;
        
        new THREE.TextureLoader().load(url, texture => {
            this.material = new THREE.MeshBasicMaterial({
                map: texture,
                side: THREE.BackSide
            });

            this.visible = true;
        })
    }
}