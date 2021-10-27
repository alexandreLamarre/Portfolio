import {Canvas, extend, useLoader, useThree} from "@react-three/fiber";
import React, {Suspense, useEffect, useRef, useState, useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import { shaderMaterial } from "@react-three/drei";
import glsl from "babel-plugin-glsl/macro";
import * as THREE from 'three';



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

export default LavaMaterial;