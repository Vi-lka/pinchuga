import { Line, meshBounds } from '@react-three/drei'
import React from 'react'

export default function MiniMap() {
    const mapArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    
  return (
    <group position={[-0.5, 0, 0]}>
        {
            mapArray.map((value, index) => (
                <group key={index} scale={0.01} position={[value/10, 0, 9]}>
                    <Line points={[-0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0, -0.5, 0.5, 0]} color="red" linewidth={5} position={[0, 0, 0]} />
                    <mesh  raycast={meshBounds}>
                      <planeGeometry />
                      <meshBasicMaterial />
                    </mesh>
                </group>
            ))
        }
    </group>
  )
}
