import React, {Suspense, useRef} from 'react';
import {Canvas, extend, useFrame, useLoader} from '@react-three/fiber'
import { OrbitControls} from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {shaderMaterial} from "@react-three/drei"
import glsl from "babel-plugin-glsl/macro";
import * as THREE from "three";

/**
 * For basic introduction to shaders and using it in react-three-fiber, I recommend 
 * https://www.youtube.com/watch?v=kxXaIHi1j4w&ab_channel=WrongAkram
 */
const IcosahedronShaderMaterial = shaderMaterial(
    //uniforms
    {
        uTime :0, 
        uColor : new THREE.Color(1.0, 0.0, 0.0),
        uTexture : new THREE.Texture(),
    },
    //Vertex shader
    glsl`
    varying vec2 vUv;
    varying vec3 vNormal;
    float PI = 3.141592653589793238;
    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix*normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    //Fragment shader
    glsl`
    precision highp float;
    varying vec2 vUv;
    varying vec3 vNormal;
    float PI = 3.141592653589793238;

    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;

    void main(){
        vec3 X = dFdx(vNormal);
        vec3 Y = dFdy(vNormal);
        vec3 normal = normalize(cross(X,Y));

        float diffuse = dot(normal, vec3(1.0, 1.0, 1.0))*0.5;

        vec4 texture = texture2D(uTexture, vUv);
        gl_FragColor = vec4(diffuse * texture);
    }
    `,
);
extend({IcosahedronShaderMaterial});

/**
 * Defines the Icosahedron mesh with its custom shaders & texture loaders
 * @param {HTML props} props 
 * @returns {JSX} the Icosahedron mesh in JSX format
 */
function Icosahedron(props){
    const mesh = useRef();
    const matRef = useRef();
    // const [colorMap] = useLoader(TextureLoader, ['astronaut.jpg']);

    const [
        colorMap,
      ] = useLoader(TextureLoader, [
        "satelite.jpg",
      ]);
    
    useFrame(({ clock }) => {
        matRef.current.uTime = clock.getElapsedTime();
    });

    return(
            <mesh
            {...props} 
            ref = {mesh}>
                    <icosahedronGeometry 
                        args = {[1,1]} 
                    />
                    <icosahedronShaderMaterial 
                        ref = {matRef}
                        uTexture = {colorMap}
                        uColor = {"hotpink"}
                    />
                    {/* <meshStandardMaterial
                        displacementScale={0.0}
                        map={colorMap}
                        displacementMap={displacementMap}
                        normalMap={normalMap}
                        roughnessMap={roughnessMap}
                        aoMap={aoMap}
                    /> */}
            </mesh>
    );
}

function ShaderIcosahedron(props){

    return (
        <div id="canvas-container" style = {{height: "100vh", width : "100vw"}}>
            <Canvas>
                <Suspense fallback = {null}>
                    <OrbitControls />
                    <Icosahedron/>
                </Suspense>
                <ambientLight/>
                {/* <directionalLight/> */}
            </Canvas>
        </div>
    )
}

export default ShaderIcosahedron;