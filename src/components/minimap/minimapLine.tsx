import * as THREE from 'three'
import { startTransition, useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Line, useScroll } from '@react-three/drei'
import { ReactThreeFiber, extend } from '@react-three/fiber'
import state from '../../utils/state'

export default function MinimapLine(
  {
    positionX, 
    positionY, 
    scrollSpeed, 
    scrollDelay, 
    color,
    temp = new THREE.Object3D()
  } : {
    positionX: number, 
    positionY: number, 
    scrollSpeed: number, 
    scrollDelay: number, 
    color: any,
    temp: THREE.Object3D
  }
  ) {
  const stateThree = useThree()

  const linesArray = [1, 2, 3, 4, 5, 6, 7]

  const material = new THREE.LineBasicMaterial({
    color: "red"
  })
  const points = []
  points.push( new THREE.Vector3( - 10, 0, 0 ) );
  points.push( new THREE.Vector3( 0, 10, 0 ) );
  points.push( new THREE.Vector3( 10, 0, 0 ) );
  
  const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 )

  const ref = useRef<any>()

  useEffect(() => {
    // Set positions
    for (let i = 0; i < linesArray.length; i++) {
      temp.position.set(positionX, -i * 0.0048 - positionY, -1)
      temp.updateMatrix()
      ref.current.setMatrixAt(i, temp.matrix)
    }
    // Update the instance
    ref.current.instanceMatrix.needsUpdate = true
  }, [])


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
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, delta*6))
    ref.current.children.forEach((child: any, index: any) => {
      let scrollPos = ratioFromMiddle((page - scrollDelay) / (index + 1), height / linesArray.length)

      if (scrollPos < 0) {
        scrollPos = 0
      }


      child.scale.x = THREE.MathUtils.damp(child.scale.x, 1 + scrollPos*8, 80, delta)
    })
  })

  return (
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
    <instancedMesh ref={ref} args={[geometry, material, linesArray.length]}/>
  )
}