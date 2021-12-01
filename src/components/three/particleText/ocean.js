import { extend, useLoader, useThree, useFrame } from '@react-three/fiber'
import React, { useRef, useMemo } from 'react'

import * as THREE from 'three'
import { Water } from 'three/examples/jsm/objects/Water'

extend({ Water })

function Ocean () {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, 'waternormals.jpeg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
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
    [waterNormals, gl.encoding]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return (
    <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
  )
};

export default Ocean
