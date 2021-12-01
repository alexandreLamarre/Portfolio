import React, { Suspense } from 'react';
import {Canvas} from  '@react-three/fiber';
// import { Canvas, extend, useFrame, useLoader } from '@react-three/fiber'
import { Loader, OrbitControls } from '@react-three/drei';
// import { TextureLoader } from 'three/src/loaders/TextureLoader'
// import * as THREE from 'three'
// import LavaShader from './lavaJsShader'
// import { AmbientLight, PlaneBufferGeometry, MeshPhongMaterial } from 'three'

// function Lava(props){
//     const mesh = useRef();
//     const geoRef = useRef();
//     const matRef = useRef();

//     useEffect(() => {
//         // Loading Setup
//     });

//     useFrame(({clock}) => {
//         //Animation
//     })

//     // Component
//     return (
//         <mesh {...props} ref={mesh}>
//             <planeBufferGeometry
//             ref ={geoRef}
//             args = {[10000, 10000]}/>
//             <LavaShader ref= {matRef}/>
//         </mesh>
//     )
// };

function Plane (props) {
  // const meshRef = useRef()

  return (
    <mesh {...props}>
      <planeBufferGeometry args={[10000, 10000]} />
      <meshPhongMaterial color='#ff0000' />
    </mesh>
  )
}

function LavaScene (props) {
  return (
    <div className='fixed top-0 bottom-0 h-100vh w-screen'>
      <Canvas onCreated={state => state.gl.setClearColor('#313639')}>
        <Suspense fallback={null}>
          <OrbitControls />
          <Plane position={[0, 0, -10]} />
        </Suspense>
        <ambientLight />
      </Canvas>
      <Loader />
    </div>
  )
}

export default LavaScene
