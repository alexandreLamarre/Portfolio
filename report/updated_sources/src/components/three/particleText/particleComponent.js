import { Canvas, extend, useFrame } from '@react-three/fiber'
import React, { Suspense, useRef, useState } from 'react'

import { Loader, shaderMaterial, OrbitControls, Sky } from '@react-three/drei'
import Ocean from './ocean'
// import LavaMaterial from "../shaders/lava";
// import LavaMaterial2 from "../shaders/lava2";

function ParticleText (props) {
  return (
    <div className='w-screen h-screen'>
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={null}>
          <OrbitControls maxDistance={20} maxPolarAngle={Math.PI / 2 - 0.1} minPolarAngle={-Math.PI / 2} />
          {/* <Plane/> */}
          <Ocean />
          <Box position={[-1.2, 0, 0]} />
          <Box position={[1.2, 0, 0]} />
        </Suspense>
        <Sky scale={1000} sunPosition={[500, 150, -1000]} turbidity={0.1} />
      </Canvas>
      <Loader />
    </div>

  )
};

// textures/lava/cloud.png
// textures/lava/lavatile.jpg

function Box (props) {
  const mesh = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
};

export default ParticleText
