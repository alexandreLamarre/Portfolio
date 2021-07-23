import React, {Suspense, useEffect, useRef} from 'react';
import {Canvas, extend, useFrame, useLoader} from '@react-three/fiber'
import { OrbitControls} from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {shaderMaterial} from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import * as THREE from "three";
import { getCentroid, getRandomAxis } from './helpers';

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
    //vertex uniforms
    uniform float uTime;

    //vertex attributes
    attribute vec3 centroidBuffer;
    attribute vec3 axis;
    attribute float offset;
    
    //vertex varying
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 eyeVector;
    float PI = 3.141592653589793238;

    mat4 rotationMatrix(vec3 axis, float angle) {
        axis = normalize(axis);
        float s = sin(angle);
        float c = cos(angle);
        float oc = 1.0 - c;
        
        return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                    oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                    oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                    0.0,                                0.0,                                0.0,                                1.0);
    }
    
    vec3 rotate(vec3 v, vec3 axis, float angle) {
        mat4 m = rotationMatrix(axis, angle);
        return (m * vec4(v, 1.0)).xyz;
    }

    void main() {
        float vTemp =  1. - ((centroidBuffer.x + centroidBuffer.y)*0.5 + 1.)/2.;
        float tProgress = max(0.0, (uTime - vTemp*0.4)/0.6);

        vec3 newnormal = rotate(normal,axis,tProgress*(3. + offset*10.));

        vUv = uv;
        vNormal = normal;
        vec3 newPosition = position;
        vec4 worldPosition = modelMatrix * vec4(newPosition, 1.0);
        //eye vector calculation
        eyeVector = normalize(worldPosition.xyz - cameraPosition);
        newPosition += newPosition + centroidBuffer*(tProgress)*(3. + offset * 7.);
        //output position
        gl_Position = projectionMatrix * modelViewMatrix * vec4(1.*newPosition, 1.0);
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

        vec3 refracted = refract(eyeVector, normal, 1.0/5.0);
        vec2 uvv = vec2(
            sign(rand.x - 0.5)*1.0 + (rand.x -0.5) * 0.06,
            sign(rand.y - 0.5)*1.0 + (rand.y-0.5) * 0.06
        );

        vec2 uv = gl_FragCoord.xy/vec2(1000); //TODO:change 1000 to aspect ratio
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
    const geoMesh = useRef();
    const matRef = useRef();

    const [
        colorMap,
      ] = useLoader(TextureLoader, [
        "water.jpg",
      ]);

    useEffect(() => {
        let len = geoMesh.current.attributes.position.array.length;
        let centroidVector = getCentroid(geoMesh.current);
        let centroid = new Array(len * 3).fill(0);
        
        for (let i = 0; i < len * 3; i = i + 3) {
            centroid[i] = centroidVector.x;
            centroid[i + 1] = centroidVector.y;
            centroid[i + 2] = centroidVector.z;
        }
        //Set centroid
        geoMesh.current.setAttribute(
            "centroidBuffer",
            new THREE.BufferAttribute(new Float32Array(centroid), 3)
        );
        let axis = getRandomAxis();
        let axes = new Array(len * 3).fill(0);
        for (let i = 0; i < len * 3; i = i + 3) {
            axes[i] = axis.x;
            axes[i + 1] = axis.y;
            axes[i + 2] = axis.z;
        }
        //Set axis
        geoMesh.current.setAttribute(
            "axis",
            new THREE.BufferAttribute(new Float32Array(axes), 3)
        );

        let offset = new Array(len);
        for(let i = 0; i < len; i++){
            offset[i] = (Math.random() - 0.5)*20;
        }
        //Set offsets
        geoMesh.current.setAttribute(
            "offset",
            new THREE.BufferAttribute(new Float32Array(offset), 1)
        );
        //Set texture wrapping
        colorMap.wrapS = THREE.RepeatWrapping;
        colorMap.wrapT = THREE.RepeatWrapping;
        console.log(geoMesh.current.attributes);
    });
    
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
                        ref = {geoMesh}
                        args = {[1,1]}
                    />
                    <icosahedronShaderMaterial 
                        ref = {matRef}
                        uTexture = {colorMap}
                        uColor = {"hotpink"}
                    />
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