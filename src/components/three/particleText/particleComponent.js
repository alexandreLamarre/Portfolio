import {Canvas, extend, useLoader} from "@react-three/fiber";
import React, {Suspense, useEffect, useRef, useState} from 'react';
import {useFrame} from '@react-three/fiber';
import { Loader, shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import * as THREE from 'three';
import { TextureLoader } from "three/src/loaders/TextureLoader";


/**
 * For basic introduction to shaders and using it in react-three-fiber, I recommend 
 * https://www.youtube.com/watch?v=kxXaIHi1j4w&ab_channel=WrongAkram
 */
const LavaMaterial = shaderMaterial(
    //uniforms
    {
        time: 1.0,
        fogDensity : 0.45,
        fogColor : new THREE.Vector3(0,0,0),
        texture1 : new THREE.Texture(),
        texture2 : new THREE.Texture(),
        uvScale : new THREE.Vector2(1,1),
    },
    //Vertex shader
    glsl`
    uniform vec2 uvScale;
    varying vec2 vUv;

    void main()
    {

        vUv = uvScale * uv;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_Position = projectionMatrix * mvPosition;

    }`,
    //fragment shader
    glsl`
    uniform float time;

    uniform float fogDensity;
    uniform vec3 fogColor;

    uniform sampler2D texture1;
    uniform sampler2D texture2;

    varying vec2 vUv;

    void main( void ) {

        vec2 position = - 1.0 + 2.0 * vUv;

        vec4 noise = texture2D( texture1, vUv );
        vec2 T1 = vUv + vec2( 1.5, - 1.5 ) * time * 0.02;
        vec2 T2 = vUv + vec2( - 0.5, 2.0 ) * time * 0.01;

        T1.x += noise.x * 2.0;
        T1.y += noise.y * 2.0;
        T2.x -= noise.y * 0.2;
        T2.y += noise.z * 0.2;

        float p = texture2D( texture1, T1 * 2.0 ).a;

        vec4 color = texture2D( texture2, T2 * 2.0 );
        vec4 temp = color * ( vec4( p, p, p, p ) * 2.0 ) + ( color * color - 0.1 );

        if( temp.r > 1.0 ) { temp.bg += clamp( temp.r - 2.0, 0.0, 100.0 ); }
        if( temp.g > 1.0 ) { temp.rb += temp.g - 1.0; }
        if( temp.b > 1.0 ) { temp.rg += temp.b - 1.0; }

        gl_FragColor = temp;

        float depth = gl_FragCoord.z / gl_FragCoord.w;
        const float LOG2 = 1.442695;
        float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );
        fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );

        gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );

    }
`,
);

extend({LavaMaterial});

function ParticleText(props){
    return(
        <div className="w-screen h-screen">
            <Canvas >
                <ambientLight/>
                <pointLight position = {[10, 10, 10]}/>
                <Suspense fallback={null}>
                    <Plane/>
                    <Box position = {[-1.2, 0, 0]}/>
                    <Box position = {[1.2, 0, 0]}/>
                </Suspense>
            </Canvas>
            <Loader/>
        </div>
        
    );
}

// textures/lava/cloud.png
// textures/lava/lavatile.jpg

function Plane(props){
    const meshRef = useRef();
    const matRef = useRef();

    const [colorMap,] = useLoader(TextureLoader, ['cloud.png']);
    const [colorMap2,] = useLoader(TextureLoader, ['lavatile.jpg'])
    console.log("COLOR MAP", colorMap);
    useEffect(() => {


        //Set loaded texture wrapping
        colorMap.wrapS = THREE.RepeatWrapping;
        colorMap.wrapT = THREE.RepeatWrapping;
        colorMap2.wrapS = THREE.RepeatWrapping;
        colorMap2.wrapT = THREE.RepeatWrapping;
        colorMap.repeat = new THREE.Vector2(0.5,0.5);
        colorMap2.repeat = new THREE.Vector2(0.5,0.5);

    });
    useFrame(({clock}) => { 
        matRef.current.time = clock.getElapsedTime() 
    });
    return (
        <mesh 
        ref={meshRef}
        rotation={[-1.5, 0.0, 0.0]}
        {...props} 
        >
            <planeGeometry args={[10000, 10000]}/>
            <lavaMaterial ref = {matRef} texture1={colorMap} texture2={colorMap2}/>
        </mesh>
    )
}


function Box(props){
    const mesh = useRef();

    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);

    useFrame((state, delta) => (mesh.current.rotation.x += 0.01));

    return (
        <mesh
            {...props}
            ref = {mesh}
            scale = {active? 1.5 : 1}
            onClick = {(event) => setActive(!active)}
            onPointerOver = {(event) => setHover(true)}
            onPointerOut = {(event) => setHover(false)}
        >
            <boxGeometry args ={[1,1,1]} />
            <meshStandardMaterial color = {hovered? 'hotpink' : 'orange'}/>
        </mesh>
    )
}


export default ParticleText;