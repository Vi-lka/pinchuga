import { useFrame } from '@react-three/fiber';
import React, { createRef } from 'react'
import * as THREE from 'three';

export default function Boxes({ tempBoxes, i, j }:{ tempBoxes: THREE.Object3D, i: number, j: number }) {
    const material = new THREE.MeshLambertMaterial({ color: "red" });
    const boxesGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const ref = createRef<any>();
  
    useFrame(() => {
      let counter = 0;
      for (let x = 0; x < i; x++) {
        for (let z = 0; z < j; z++) {
          const id = counter++;
          tempBoxes.position.set(i / 2 - x, 0, j / 2 - z);
          tempBoxes.updateMatrix();
          ref.current.setMatrixAt(id, tempBoxes.matrix);
        }
      }
      // ref.current.instanceMatrix.needsUpdate = true;
    });
  
    return <instancedMesh ref={ref} args={[boxesGeometry, material, i * j]} />;
}
