import {useLoader} from "@react-three/fiber";
import React, {useEffect, useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from "three/src/loaders/TextureLoader";

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
};

export default Plane;