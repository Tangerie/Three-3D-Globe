export default abstract class ThreeJSProgram {
    renderer : THREE.WebGLRenderer;

    abstract Init() : void;
    abstract Update(delta : number) : void;
    abstract Cleanup() : void;
    abstract Resize() : void;
}