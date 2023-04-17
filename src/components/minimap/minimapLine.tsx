import * as THREE from 'three'
import { startTransition, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Line, useScroll } from '@react-three/drei'
import { ReactThreeFiber, extend } from '@react-three/fiber'
import state from '../../utils/state'

export default function MinimapLine(
  {
    tempLines,
    positionX, 
    positionY, 
    scrollSpeed, 
    scrollDelay, 
    color
  } : {
    tempLines: THREE.Object3D,
    positionX: number, 
    positionY: number, 
    scrollSpeed: number, 
    scrollDelay: number, 
    color: any
  }
  ) {
  const stateThree = useThree()

  const linesArray = [1, 2, 3, 4, 5, 6, 7]

  const material = new THREE.MeshBasicMaterial({ 
    color: color,
    transparent: true,
    opacity: 0.3
  })
  const geometry = new THREE.PlaneGeometry(0.005, 0.002)

  const ref = useRef<any>()

  const pageLerp = useRef(state.top / stateThree.size.height)

  let height = ((state.pages * window.innerHeight) / stateThree.size.height) / scrollSpeed

  function ratioFromMiddle(value1: number, value2: number) {
    const middle = value2 / 2;
    if (value1 === middle) {
      return 1;
    } else if (value1 < middle) {
      return value1 / middle
    } else {
      return ((value2 - value1) / middle)
    }
  }

  useFrame((s, delta) => {
    let counter = 0
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, delta*6))
    for (let index = 0; index < linesArray.length; index++) {
      let scrollPos = ratioFromMiddle((page - scrollDelay) / (index + 1), height / linesArray.length)

      if (scrollPos < 0) {
        scrollPos = 0
      }

      const id = counter++
      tempLines.position.set(positionX, -index * 0.0048 - positionY, -1)
      tempLines.scale.set(THREE.MathUtils.damp(tempLines.scale.x, 1 + scrollPos*8, 80, 1), THREE.MathUtils.damp(tempLines.scale.x, 0.6 + scrollPos*0.6, 80, 1), 1)
      material.opacity = THREE.MathUtils.damp(tempLines.scale.x, 0.3 + scrollPos*0.45, 80, 1)
      tempLines.updateMatrix()
      ref.current.setMatrixAt(id, tempLines.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true

    // const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, delta*6))
    // ref.current.children.forEach((child: any, index: any) => {
    //   let scrollPos = ratioFromMiddle((page - scrollDelay) / (index + 1), height / linesArray.length)

    //   if (scrollPos < 0) {
    //     scrollPos = 0
    //   }


    //   child.scale.x = THREE.MathUtils.damp(child.scale.x, 1 + scrollPos*8, 80, delta)
    // })
  })

  return (
    <instancedMesh ref={ref} args={[geometry, material, linesArray.length]} />
    // <group ref={ref}>
    //   {linesArray.map((value: any, index: number) => (
    //     <Line
    //       key={index}
    //       points={[[-0.002, 0, 0], [0.002, 0, 0]]}
    //       color={color}
    //       transparent
    //       opacity={0.3}
    //       linewidth={1.5}
    //       position={[positionX, -index * 0.0048 - positionY, -1]}
    //     />
    //   ))}
    // </group>
  )
}