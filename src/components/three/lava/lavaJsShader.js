import {shaderMaterial} from "@react-three/drei";
import glsl from 'babel-plugin-glsl/macro'
import fragmentShader from "./fragmentShader";
import vertexShader from "./vertexShader";
import { extend } from "@react-three/fiber";

const LavaShader = shaderMaterial(
    //uniforms
    {
    },
    //Vertex shader
    glsl`${vertexShader}`
    ,
    //Fragment shader
    glsl`${fragmentShader}`
);
extend(LavaShader);

export default LavaShader;