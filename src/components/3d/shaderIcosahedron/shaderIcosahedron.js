import React, {Suspense, useRef} from 'react';
import {Canvas, useFrame, useLoader} from '@react-three/fiber'
import { OrbitControls} from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
// import {shaderMaterial} from "@react-three/drei"
// import glsl from "babel-plugins-gl/macro";

// const IcosahedronShaderMaterial = shaderMaterial(

// );

function Icosahedron(props){
    const mesh = useRef();
    // const [colorMap] = useLoader(TextureLoader, ['astronaut.jpg']);

    const [
        colorMap,
        displacementMap,
        normalMap,
        roughnessMap,
        aoMap
      ] = useLoader(TextureLoader, [
        "satelite.jpg",
        "satelite.jpg",
        "satelite.jpg",
        "satelite.jpg",
        "satelite.jpg",
      ]);
    
    useFrame(({ clock }) => {
        // const a = clock.getElapsedTime();
        // mesh.current.rotation.x = a;
        // mesh.current.rotation.y = a;
        // mesh.current.rotation.z = a;
    });

    return(
            <mesh
            {...props} 
            ref = {mesh}>
                    <icosahedronGeometry 
                        args = {[1,1]} 
                    />
                    <meshStandardMaterial
                        displacementScale={0.0}
                        map={colorMap}
                        displacementMap={displacementMap}
                        normalMap={normalMap}
                        roughnessMap={roughnessMap}
                        aoMap={aoMap}
                    />
            </mesh>
    );
}

function ShaderIcosahedron(props){

    return (
        <div id="canvas-container" style = {{height: "100vh", width : "100vw"}}>
            <Canvas>
                <Suspense fallback = {null}>
                    <OrbitControls autoRotate />
                    <Icosahedron/>
                </Suspense>
                <ambientLight intensity = {0.2}/>
                <directionalLight/>
            </Canvas>
        </div>
    )
}

export default ShaderIcosahedron;