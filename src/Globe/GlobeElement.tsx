import ThreeJSContainer from "../ThreeJSContainer";

import { useRef } from "preact/hooks";
import GlobeProgram from "./GlobeProgram";

export default function GlobeElement() {
    const program = useRef(new GlobeProgram());

    return <ThreeJSContainer program={program.current}/>;
}