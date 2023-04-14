/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 buckle1_low_re.glb -t -d -TRS
*/

import * as THREE from 'three'
import React, { createRef, useRef } from 'react'
import { meshBounds, useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'
import { useFrame, useThree } from '@react-three/fiber'
import state from '../../../utils/state'

type GLTFResult = GLTF & {
  nodes: {
    Model001: THREE.Mesh
  }
  materials: {
    ['material0.002']: THREE.MeshStandardMaterial
  }
}

export function Buckle1Simpled(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./models/low_re/transformed/buckle1_low_re-transformed.glb') as GLTFResult

  const modelRef = createRef<any>()

  const stateThree = useThree()

  const pageLerp = useRef(state.top / stateThree.size.height)

  useFrame((s, delta) => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, delta * 6))

    modelRef.current.visible = page > 16.2 ? (page > 19.7 ? false : true) : false
  })

  return (
    <group {...props} dispose={null}>
      <mesh ref={modelRef} geometry={nodes.Model001.geometry} material={materials['material0.002']} material-metalness={0.95} material-roughness={0.88} rotation={[0.8, -1.1, 2.8]} raycast={meshBounds} />
    </group>
  )
}

useGLTF.preload('./models/low_re/transformed/buckle1_low_re-transformed.glb')
