import * as THREE from "three";

export const GLOBE_RADIUS = 100;

export default class Earth extends THREE.Mesh  {
    _material : THREE.MeshPhongMaterial;

    constructor(image : string, bumpImage? : string) {
        super();
        this.material = this._material = new THREE.MeshPhongMaterial({
            bumpScale: 2
        });
        this.geometry = new THREE.SphereBufferGeometry(GLOBE_RADIUS, 75, 75);

        this.rotation.y = -Math.PI / 2;

        this.SetImage(image, bumpImage);
    }

    SetImage(image : string, bump? : string) {
        const loader = new THREE.TextureLoader();
        loader.load(image, texture => {
            this._material.map = texture;
            this._material.color = null;
            this._material.needsUpdate = true;
        });

        if(bump) {
            loader.load(bump, texture => {
                this._material.bumpMap = texture;
                this._material.needsUpdate = true;
            });
        } else {
            this._material.bumpMap = null;
            this._material.needsUpdate = true;
        }
    }
}