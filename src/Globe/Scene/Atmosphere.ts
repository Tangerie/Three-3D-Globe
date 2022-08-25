import * as THREE from "three";
import { GLOBE_RADIUS } from "./Earth";

const fragmentShader = `
uniform vec3 color;
uniform float coefficient;
uniform float power;
varying vec3 vVertexNormal;
varying vec3 vVertexWorldPosition;
void main() {
    vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
    vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
    viewCameraToVertex = normalize(viewCameraToVertex);
    float intensity	= pow(
        coefficient + dot(vVertexNormal, viewCameraToVertex),
        power
    );
    gl_FragColor = vec4(color, intensity);
}`;

const vertexShader = `
varying vec3 vVertexWorldPosition;
varying vec3 vVertexNormal;
void main() {
    vVertexNormal	= normalize(normalMatrix * normal);
    vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export default class Atmosphere extends THREE.Mesh {
    constructor(targetMesh: THREE.Mesh) {
        super();
        this.geometry = targetMesh.geometry.clone();

        const position = new Float32Array(this.geometry.attributes.position.count * 3);
        for (let idx = 0, len=position.length; idx<len; idx++) {
            const normal = this.geometry.attributes.normal.array[idx];
            const curPos = this.geometry.attributes.position.array[idx];
            position[idx] = curPos + normal * GLOBE_RADIUS * 0.15;
        }
        this.geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));

        this.material = new THREE.ShaderMaterial({
            depthWrite: false,
            fragmentShader,
            transparent: true,
            uniforms: {
                coefficient: {
                    value: 0.2
                },
                color: {
                    value: new THREE.Color("lightskyblue")
                },
                power: {
                    value: 3.5
                }
            },
            vertexShader
        });

        this.material.side = THREE.BackSide;
    }
}