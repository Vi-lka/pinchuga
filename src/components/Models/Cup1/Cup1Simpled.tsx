/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.1.4 cup1_low_re.glb -t -d -TRS
*/

import * as THREE from 'three'
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Model: THREE.Mesh
  }
  materials: {
    ['material0.004']: THREE.MeshStandardMaterial
  }
}

export function Cup1Simpled(props: JSX.IntrinsicElements['group']) {
  const { nodes, materials } = useGLTF('./models/low_re/transformed/cup1_low_re-transformed.glb') as GLTFResult
  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Model.geometry} material={materials['material0.004']} material-metalness={0.14} material-roughness={1} rotation={[-0.48, 0.32, -0.52]} />
    </group>
  )
}

useGLTF.preload('./models/low_re/transformed/cup1_low_re-transformed.glb')
