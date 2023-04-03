import * as THREE from 'three'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { ReactThreeFiber, extend } from '@react-three/fiber'

extend({ Line_: THREE.Line })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<THREE.Line, typeof THREE.Line>
    }
  }
}

const material = new THREE.LineBasicMaterial({ color: '#2b2b2b' })
const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.03, 0.004, 0), new THREE.Vector3(0.03, 0.004, 0)])

export function MinimapLine() {
  const ref = useRef<any>()
  const mapArray = [1, 2, 3, 4, 5, 6]
  const scroll = useScroll()
  const { width } = useThree((state) => state.viewport)
  useFrame((state, delta) => {
    ref.current.children.forEach((child: any, index: any) => {
      // Give me a value between 0 and 1
      //   starting at the position of my item
      //   ranging across 4 / total length
      //   make it a sine, so the value goes from 0 to 1 to 0.
    //   const y = scroll.curve(index / mapArray.length - 1.5 / mapArray.length, 4 / mapArray.length)
      child.scale.x = THREE.MathUtils.damp(child.scale.x, 0.1 + index / 3, 8, delta)
    })
  })
  return (
    <group ref={ref}>
      {mapArray.map((_: any, i: number) => (
        <line_ key={i} geometry={geometry} material={material} position={[-width / 2 + 7.8, -i * 0.008 - mapArray.length * 0, 9]} />
      ))}
    </group>
  )
}