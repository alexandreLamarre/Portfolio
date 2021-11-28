import {useFrame} from "@react-three/fiber";
import {useMemo, useRef} from "react";
import * as THREE from 'three';
import { initIndexBuffers, initPosColorNormals } from "./initHelpers";
import React from 'react';

/**
 * 
 * @param position 3D vector
 * @param rotation 3D vector
 * @param grid {width: int, height: int, sep: float}
 * @param zOfXYT : function that assigns z value based on x-y position and time
 * @param colorOfXYZT : function that assigns colors based on 3D position
 * @param anim {init: start time value, update : function that updates time}
 * @returns Grid Component
 */
export default function Grid({
    position,
    rotation,
    grid: {
        width,
        height,
        sep
    },
    colorOfXYZT,
    zOfXYT,
    anim: {
        init, update
    }
}) {

    let t = init //time

    let {positions, normals} = useMemo(() => {
        return initPosColorNormals(width, height, sep, zOfXYT, colorOfXYZT, t);
    }, [width, height, sep, zOfXYT, colorOfXYZT, t]);

    // index buffer
    let indices = useMemo(() => {
        return initIndexBuffers(width, height);
    }, [width, height])

    let posRef = useRef() 

    useFrame(() => {
        t = update(t)
        const positions = posRef.current.array 
        let i = 0;
        for (let yi = 0; yi < height; yi++) {
            for (let xi = 0; xi < width; xi++) {
                positions[i + 2] = zOfXYT(positions[i], positions[i + 1], t);
                i += 3
            }
        }
        posRef.current.needsUpdate = true;
    });

    return (
        <mesh
            position = {position}
            rotation = {rotation}
        >
            <bufferGeometry>
                <bufferAttribute
                    ref={posRef}
                    attachObject={['attributes', 'position']}
                    array={positions}
                    count = {positions.length / 3}
                    itemSize={3}
                />
                <bufferAttribute
                    attachObject={['attributes', 'normal']}
                    array={normals}
                    count={normals.length/3}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="index"
                    array={indices}
                    count={indices.length}
                />
            </bufferGeometry>
            <meshStandardMaterial
                color={new THREE.Color(1,1,1)}
                side={THREE.DoubleSide}
                wireframe={true}
            />
        </mesh>
    );

};