import { Component, createRef } from "preact";
import * as THREE from "three";
import ThreeJSProgram from "./ThreeJSProgram";


interface Props {
    program : ThreeJSProgram;
}

export default class ThreeJSContainer extends Component<Props, {}> {
    canvasRef = createRef<HTMLCanvasElement>();
    renderer = createRef<THREE.WebGLRenderer>();
    isMounted = createRef<boolean>();
    clock = createRef<THREE.Clock>();

    private eventHandles : [string, any][] = [];

    private resize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.renderer.current.domElement.height = height;
        this.renderer.current.domElement.width = width;

        this.renderer.current.setSize(width, height);
        this.props.program.Resize();
    }

    private init() {
        this.isMounted.current = true;
        const evHandle = this.resize.bind(this);
        this.eventHandles.push(["resize", evHandle]);
        window.addEventListener("resize", evHandle);

        this.renderer.current= new THREE.WebGLRenderer({
            canvas: this.canvasRef.current,
            antialias: true
        });


        this.props.program.renderer = this.renderer.current;
        this.props.program.Init();

        this.clock.current = new THREE.Clock();

        this.resize();
        this.update();

    }

    private update() {
        if(!this.isMounted.current) return;
        requestAnimationFrame(this.update.bind(this));
        this.props.program.Update(this.clock.current.getDelta() * 1000);
    }

    private cleanup() {
        for(const [name, handle] of this.eventHandles) {
            window.removeEventListener(name, handle);
        }

        this.props.program.Cleanup();
    }

    componentDidMount(): void {
        this.init();
    }

    componentWillUnmount(): void {
        this.cleanup();
    }

    render() {
        return <canvas ref={this.canvasRef}></canvas>;
    }
}