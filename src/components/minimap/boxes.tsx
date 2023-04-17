import { useFrame } from '@react-three/fiber';
import React, { createRef } from 'react'
import * as THREE from 'three';

export default function Boxes({ tempLines, positionX, positionY }:{ tempLines: THREE.Object3D, positionX: number, positionY: number }) {
  const material = new THREE.LineBasicMaterial({ color: "red" })
  const geometry = new THREE.PlaneGeometry(0.01, 0.002)
  const ref = createRef<any>()

  const linesArray = [1, 2, 3, 4, 5, 6, 7]
  
  useFrame(() => {
    let counter = 0
    for (let i = 0; i < linesArray.length; i++) {
      const id = counter++
      tempLines.position.set(positionX, -i * 0.0048 - positionY, -1)
      tempLines.updateMatrix()
      ref.current.setMatrixAt(id, tempLines.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={ref} args={[geometry, material, linesArray.length]} />;
}
