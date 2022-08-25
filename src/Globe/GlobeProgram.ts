import EmptyThreeJSProgram from "../ThreeJSContainer/EmptyProgram";
import * as THREE from "three";
import Earth from "./Scene/Earth";
import Skysphere from "./Scene/Skysphere";

import NightSkyImage from "./assets/night-sky.png";
import EarthDayImage from "./assets/earth-day.jpg";
import EarthBumpImage from "./assets/earth-topology.png";
import Atmosphere from "./Scene/Atmosphere";
import { Pin } from "./types";
import PinLayer from "./Layers/PinLayer";

const pins : Pin[] = [
    {
        location: {
            lat: 0,
            lng: 0
        },
        label: "Site A"
    },
    {
        location: {
            lat: 10,
            lng: 0
        },
        label: "Site B"
    },
    {
        location: {
            lat: 32,
            lng: -16
        },
        label: "Site C"
    },
    {
        location: {
            lat: 32.1,
            lng: -16
        },
        label: "Site D"
    }
]

export default class GlobeProgram extends EmptyThreeJSProgram {

    Init() {
        super.Init();

        this.controls.minDistance = 250;
        this.controls.maxDistance = 500;
        this.controls.rotateSpeed = 2;
        this.controls.zoomSpeed = 0.8;

        this.scene.add(new Skysphere(NightSkyImage));

        this.scene.add(new THREE.AmbientLight(0xbbbbbb));
        this.scene.add(new THREE.DirectionalLight(0xffffff, 0.6));

        const earth = new Earth(EarthDayImage, EarthBumpImage);

        this.scene.add(earth);

        const atmosphere = new Atmosphere(earth);
        this.scene.add(atmosphere);

        const pinLayer = new PinLayer(pins);
        this.scene.add(pinLayer);

        this.camera.position.z = 500;

        console.log("Program Initialized");
    }

    
}