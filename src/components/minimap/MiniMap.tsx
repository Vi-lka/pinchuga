import { Line, meshBounds } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { createRef, useEffect, useState } from 'react'
import { MinimapLine } from './minimapLine'

export default function MiniMap() {
  const stateThree = useThree()

  const mapArray = [1, 2, 3, 4, 5, 6]

  const mapRef = createRef<any>()

  useEffect(() => {
    // Add mesh to camera
    const meshRef = mapRef.current
    stateThree.camera.add(meshRef)

    // Cleanup on unmount
    return () => {
      stateThree.camera.remove(meshRef)
    };
  }, [stateThree.camera, mapRef])

  const posXAspect = (stateThree.viewport.width / 300)

  const lineOpas = 0.5

  function Dot({ value }: any) {

    const [hovered, setHovered] = useState(false)
    // useEffect(() => void (document.body.style.cursor = hovered ? "pointer" : "auto"), [hovered])

    function handlePointerOverDot(event: MouseEvent) {
      event.stopPropagation()
      setHovered(true)
      stateThree.gl.domElement.style.cursor = 'pointer'
    }

    function handlePointerOutDot(event: MouseEvent) {
      event.stopPropagation()
      setHovered(false)
      stateThree.gl.domElement.style.cursor = 'auto'
    }

    const posYAspect = -0.05 * value * (stateThree.viewport.height / 6)

    // useFrame(() => {
    //   console.log(posYAspect)
    // })

    return (
      <group scale={0.016} position={[posXAspect, posYAspect, -1]}>
        <Line
          points={[-0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0, -0.5, 0.5, 0]}
          color="#2b2b2b"
          linewidth={hovered ? 6 : 3}
          position={[0, 0, 0]}
        />
        <Line
          points={[-0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0, -0.5, 0.5, 0]}
          color="#ffffff"
          linewidth={hovered ? 4 : 2}
          position={[0, 0, 0]}
        />
        <mesh
          // scale={hovered ? 1.3 : 1}
          onPointerOver={(e: any) => { handlePointerOverDot(e) }}
          onPointerOut={(e: any) => handlePointerOutDot(e)}
          raycast={meshBounds}
        >
          <planeGeometry />
          <meshPhongMaterial transparent color={'#2b2b2b'} emissive={'#2b2b2b'} opacity={hovered ? 1 : 0} />
        </mesh>
      </group>
    )
  }

  return (
    <group ref={mapRef} position={[0.044 * stateThree.viewport.width, 0.165 * (stateThree.viewport.height / 6), 0]}>
      {
        mapArray.map((value, index) => (
          <Dot
            // ref={dotRef}
            key={index}
            value={value}
          />
        ))
      }
      {/* <Line
        points={[[0, -0.06*(stateThree.viewport.height / 6), 0], [0, -0.09*(stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, 0, -1]}
      /> */}

      <Line
        points={[[0, -0.06*(stateThree.viewport.height / 6), 0], [0, -0.09*(stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, 0, -1]}
      />
      <Line
        points={[[0, -0.06*(stateThree.viewport.height / 6), 0], [0, -0.09*(stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, -0.05*1*(stateThree.viewport.height / 6), -1]}
      />
      <Line
        points={[[0, -0.06*(stateThree.viewport.height / 6), 0], [0, -0.09*(stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, -0.05*2*(stateThree.viewport.height / 6), -1]}
      />
      <Line
        points={[[0, -0.06*(stateThree.viewport.height / 6), 0], [0, -0.09*(stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, -0.05*3*(stateThree.viewport.height / 6), -1]}
      />
      <Line
        points={[[0, -0.06*(stateThree.viewport.height / 6), 0], [0, -0.09*(stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, -0.05*4*(stateThree.viewport.height / 6), -1]}
      />
    </group >
  )
}
