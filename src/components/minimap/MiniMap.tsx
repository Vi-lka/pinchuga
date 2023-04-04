import * as THREE from 'three'
import { Line, meshBounds } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { createRef, useEffect, useRef, useState } from 'react'
import MinimapLine from './minimapLine'
import state from '../../utils/state'

export default function MiniMap({handleScrollTo}: {handleScrollTo(index: number): void}) {
  const stateThree = useThree()

  const mapArray = [1, 2, 3, 4, 5, 6, 7]

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

  function Dot({ value, index }: any) {

    const [hovered, setHovered] = useState(false)

    const [currentArea, setCurrentArea] = useState(0)

    const pageLerp = useRef(state.top / stateThree.size.height)
  
    useFrame(() => {
      const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, 0.15))
      if (page > 0 && page < 1) setCurrentArea(0)
      if (page > 1 && page < 2) setCurrentArea(1)
      if (page > 2 && page < 3) setCurrentArea(2)
      if (page > 3 && page < 4) setCurrentArea(3)
      if (page > 4 && page < 5) setCurrentArea(4)
      if (page > 5 && page < 6.2) setCurrentArea(5)
    })

    const posYAspect = -0.05 * value * (stateThree.viewport.height / 6)

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

    return (
      <group scale={0.016} position={[posXAspect, posYAspect, -1]}>
        <Line
          points={[-0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0, -0.5, 0.5, 0]}
          color="#2b2b2b"
          transparent
          opacity={0.75}
          linewidth={(hovered || currentArea === index) ? 2 : 0}
          position={[0, 0, 0]}
        />
        <mesh
          scale={(hovered || currentArea === index) ? 1.4 : 0.45}
          onPointerOver={(e: any) => { handlePointerOverDot(e) }}
          onPointerOut={(e: any) => handlePointerOutDot(e)}
          onClick={(e: any) => handleScrollTo(index)}
          raycast={meshBounds}
        >
          <circleGeometry />
          <meshPhongMaterial 
            transparent 
            color={'#2b2b2b'} 
            emissive={'#2b2b2b'} 
            opacity={(hovered || currentArea === index) ? 0.04 : 0.75} 
          />
        </mesh>
      </group>
    )
  }

  return (
    <group ref={mapRef} position={[0.044 * stateThree.viewport.width, 0.07 * (stateThree.viewport.height / 6), 0]}>
      {
        mapArray.map((value, index) => (
          <Dot
            key={index}
            value={value}
            index={index}
          />
        ))
      }

      <MinimapLine
        positionY={ 0.06 * 1 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 29 }
        scrollDelay={ 0 }
      />
      <MinimapLine
        positionY={ 0.11 * 1 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 24 }
        scrollDelay={ 0.85 }
      />
      <MinimapLine
        positionY={ 0.11 * 1.45 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 29 }
        scrollDelay={ 1.95 }
      />
      <MinimapLine
        positionY={ 0.11 * 1.91 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 28.5 }
        scrollDelay={ 2.98 }
      />
      <MinimapLine
        positionY={ 0.11 * 2.365 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 27.5 }
        scrollDelay={ 3.98 }
      />
      <MinimapLine
        positionY={ 0.11 * 2.82 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 24 }
        scrollDelay={ 4.98 }
      />

      {/* <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, 0, -1]}
      /> */}
      {/* <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, -0.05 * 1 * (stateThree.viewport.height / 6), -1]}
      /> */}
      {/* <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, -0.05 * 2 * (stateThree.viewport.height / 6), -1]}
      /> */}
      {/* <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, -0.05 * 3 * (stateThree.viewport.height / 6), -1]}
      /> */}
      {/* <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color="#2b2b2b"
        transparent
        opacity={0.3}
        linewidth={2}
        position={[posXAspect, -0.05 * 4 * (stateThree.viewport.height / 6), -1]}
      /> */}
    </group >
  )
}
