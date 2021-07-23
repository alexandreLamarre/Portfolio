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
    varying vec3 eyeVector;
    float PI = 3.141592653589793238;

    void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix*normal);

        vec3 newPosition = position;
        vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
        eyeVector = normalize(worldPosition.xyz - cameraPosition);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    //Fragment shader
    glsl`
    precision highp float;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 eyeVector;
    float PI = 3.141592653589793238;

    uniform vec3 uColor;
    uniform float uTime;
    uniform sampler2D uTexture;

    //hash function
    vec2 hash22(vec2 p){
        p = fract(p * vec2(5.3983, 5.4427));
        p += dot(p.yx, p.xy + vec2(21.5351, 14.3137));
        return fract(vec2(p.x * p.y * 95.4337, p.x * p.y * 97.597));
    }

    void main(){
        
        vec3 X = dFdx(vNormal);
        vec3 Y = dFdy(vNormal);
        vec3 normal = normalize(cross(X,Y));
        float diffuse = dot(normal, vec3(1.0, 1.0, 1.0));

        vec2 rand = hash22(vec2(floor(diffuse*20.0)));

        vec3 refracted = refract(eyeVector, normal, 1.0/3.0);
        vec2 uvv = vec2(
            sign(rand.x - 0.5)*1.0 + (rand.x -0.5) * 0.06,
            sign(rand.y - 0.5)*1.0 + (rand.y-0.5) * 0.06
        );

        vec2 uv = rand * gl_FragCoord.xy/vec2(1000); //TODO:change 1000 to aspect ratio
        uv += 1.*refracted.xy;

        

        vec4 texture = texture2D(uTexture, uv);
        gl_FragColor = vec4(texture);//diffuse * texture);
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

    const [
        colorMap,
      ] = useLoader(TextureLoader, [
        "satelite.jpg",
      ]);
    
    useFrame(({ clock }) => {
        mesh.current.rotation.x = clock.getElapsedTime()*0.03;
        mesh.current.rotation.y = clock.getElapsedTime()*0.03;
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
            <Canvas onCreated={state => state.gl.setClearColor("#313639")}>
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