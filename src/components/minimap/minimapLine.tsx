import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Line, useScroll } from '@react-three/drei'
import { ReactThreeFiber, extend } from '@react-three/fiber'

export default function MinimapLine() {
  const stateThree = useThree()

  const linesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  const ref = useRef<any>()

  const posXAspect = (stateThree.viewport.width / 300)

  useFrame((state, delta) => {
    console.log(stateThree.viewport.width / 6 * 1)
    // ref.current.children.forEach((child: any, index: any) => {
    //   // Give me a value between 0 and 1
    //   //   starting at the position of my item
    //   //   ranging across 4 / total length
    //   //   make it a sine, so the value goes from 0 to 1 to 0.
    // //   const y = scroll.curve(index / mapArray.length - 1.5 / mapArray.length, 4 / mapArray.length)
    //   child.scale.x = THREE.MathUtils.damp(child.scale.x, 0.1 + index / 3, 8, delta)
    // })
  })

  return (
    <group ref={ref}>
      {linesArray.map((value: any, index: number) => (
        // <line_ key={i} geometry={geometry} material={material} position={[-width / 2 + 7.8, -i * 0.008 - mapArray.length * 0, 9]} />
        <Line
          key={index}
          points={[[-0.003, 0, 0], [0.003, 0, 0]]}
          color="#2b2b2b"
          transparent
          opacity={0.3}
          linewidth={1.5}
          // scale={3}
          position={[posXAspect, -index * 0.0052 - 0.06 * 1 * (stateThree.viewport.height / 6), -1]}
        />
      ))}
    </group>
  )
}