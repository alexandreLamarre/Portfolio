import {Canvas, extend, useLoader, useThree} from "@react-three/fiber";
import React, {Suspense, useEffect, useRef, useState, useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import { Loader, shaderMaterial, OrbitControls, Sky } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import * as THREE from 'three';
import { TextureLoader } from "three/src/loaders/TextureLoader";
import {Water} from "three/examples/jsm/objects/Water";

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

const LavaMaterial2 = shaderMaterial(
    {
        time : 1,
    },
    //Vertex shader
    glsl`
    void main()
    {
        gl_Position = gl_ProjectionMatrix * gl_ModelViewMatrix * gl_Vertex;
    }`,
    //Fragment shader
    glsl`
    uniform float time;
    varying vec2 vUv;

    // vec4 permute( vec4 x ) {

    //     return mod( ( ( x * 34.0 ) + 1.0 ) * x, 289.0 );

    // }

    // vec4 taylorInvSqrt( vec4 r ) {

    //     return 1.79284291400159 - 0.85373472095314 * r;

    // }

    // float snoise( vec3 v ) {

    //     const vec2 C = vec2( 1.0 / 6.0, 1.0 / 3.0 );
    //     const vec4 D = vec4( 0.0, 0.5, 1.0, 2.0 );

    //     // First corner

    //     vec3 i  = floor( v + dot( v, C.yyy ) );
    //     vec3 x0 = v - i + dot( i, C.xxx );

    //     // Other corners

    //     vec3 g = step( x0.yzx, x0.xyz );
    //     vec3 l = 1.0 - g;
    //     vec3 i1 = min( g.xyz, l.zxy );
    //     vec3 i2 = max( g.xyz, l.zxy );

    //     vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    //     vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    //     vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    //     // Permutations

    //     i = mod( i, 289.0 );
    //     vec4 p = permute( permute( permute(
    //                 i.z + vec4( 0.0, i1.z, i2.z, 1.0 ) )
    //             + i.y + vec4( 0.0, i1.y, i2.y, 1.0 ) )
    //             + i.x + vec4( 0.0, i1.x, i2.x, 1.0 ) );

    //     // Gradients
    //     // ( N*N points uniformly over a square, mapped onto an octahedron.)

    //     float n_ = 1.0 / 7.0; // N=7

    //     vec3 ns = n_ * D.wyz - D.xzx;

    //     vec4 j = p - 49.0 * floor( p * ns.z *ns.z );  //  mod(p,N*N)

    //     vec4 x_ = floor( j * ns.z );
    //     vec4 y_ = floor( j - 7.0 * x_ );    // mod(j,N)

    //     vec4 x = x_ *ns.x + ns.yyyy;
    //     vec4 y = y_ *ns.x + ns.yyyy;
    //     vec4 h = 1.0 - abs( x ) - abs( y );

    //     vec4 b0 = vec4( x.xy, y.xy );
    //     vec4 b1 = vec4( x.zw, y.zw );


    //     vec4 s0 = floor( b0 ) * 2.0 + 1.0;
    //     vec4 s1 = floor( b1 ) * 2.0 + 1.0;
    //     vec4 sh = -step( h, vec4( 0.0 ) );

    //     vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    //     vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    //     vec3 p0 = vec3( a0.xy, h.x );
    //     vec3 p1 = vec3( a0.zw, h.y );
    //     vec3 p2 = vec3( a1.xy, h.z );
    //     vec3 p3 = vec3( a1.zw, h.w );

    //     // Normalise gradients

    //     vec4 norm = taylorInvSqrt( vec4( dot( p0, p0 ), dot( p1, p1 ), dot( p2, p2 ), dot( p3, p3 ) ) );
    //     p0 *= norm.x;
    //     p1 *= norm.y;
    //     p2 *= norm.z;
    //     p3 *= norm.w;

    //     // Mix final noise value

    //     vec4 m = max( 0.6 - vec4( dot( x0, x0 ), dot( x1, x1 ), dot( x2, x2 ), dot( x3, x3 ) ), 0.0 );
    //     m = m * m;
    //     return 42.0 * dot( m*m, vec4( dot( p0, x0 ), dot( p1, x1 ),
    //                                     dot( p2, x2 ), dot( p3, x3 ) ) );

    // }

    // float surface( vec3 coord ) {

    //     float n = 0.0;

    //     n += 1.0 * abs( snoise( coord ) );
    //     n += 0.5 * abs( snoise( coord * 2.0 ) );
    //     n += 0.25 * abs( snoise( coord * 4.0 ) );
    //     n += 0.125 * abs( snoise( coord * 8.0 ) );

    //     float rn = 1.0 - n;

    //     return rn * rn;

    // }

    void main( void ) {

        vec3 coord = vec3( vUv, -time );

        float n = surface( coord );

        // gl_FragColor = vec4( vec3( n, n, n ), 1.0 );
        gl_FragColor = vec4(0.0, 0.0, 200.0, 1.0);
    }
    `,
)

extend({LavaMaterial, LavaMaterial2, Water});

function ParticleText(props){
    return(
        <div className="w-screen h-screen">
            <Canvas >
                <ambientLight/>
                <pointLight position = {[10, 10, 10]}/>
                <Suspense fallback={null}>
                    <OrbitControls maxDistance={20} maxPolarAngle={Math.PI/2 - 0.1} minPolarAngle={-Math.PI/2}/>
                    {/* <Plane/> */}
                    <Ocean/>
                    <Box position = {[-1.2, 0, 0]}/>
                    <Box position = {[1.2, 0, 0]}/>
                </Suspense>
                <Sky scale={1000} turbidity={0.1}/>
            </Canvas>
            <Loader/>
        </div>
        
    );
};

function Ocean() {
    const ref = useRef();
    const gl = useThree((state) => state.gl);
    const waterNormals = useLoader(THREE.TextureLoader, 'waternormals.jpeg');
    waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;
    const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), []);
    const config = useMemo(
        () => ({
            textureWidth: 512,
            textureHeight: 512,
            waterNormals,
            sunDirection: new THREE.Vector3(),
            sunColor: 0xffffff,
            waterColor: 0x001e0f,
            distortionScale: 3.7,
            fog: false,
            format: gl.encoding
          }),
          [waterNormals]
    );
    useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta));
    return(
        <water ref = {ref} args={[geom, config]} rotation-x={-Math.PI /2}/>
    )
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
        matRef.current.iGlobalTime = clock.getElapsedTime() 
    });
    return (
        <mesh 
        ref={meshRef}
        rotation={[-1.5, 0.0, 0.0]}
        {...props} 
        >
            <planeGeometry args={[10000, 10000]}/>
            <lavaMaterial2 ref = {matRef} texture1={colorMap} texture2={colorMap2}/>
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