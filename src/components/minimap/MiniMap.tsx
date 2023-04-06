import * as THREE from 'three'
import { Html, Line, meshBounds } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { createRef, startTransition, useEffect, useRef, useState } from 'react'
import MinimapLine from './minimapLine'
import state from '../../utils/state'
import './minimap.css'
import 'cooltipz-css'

export default function MiniMap({handleScrollTo}: {handleScrollTo(index: number): void}) {
  const stateThree = useThree()

  const mapArray = [
    'Начало', 
    'Великое переселение народов', 
    'Миграция', 
    'Ангара и Енисей', 
    'Пинчуга-6', 
    'Предметы', 
    'Сокол', 
    'Орёл', 
    'Олень', 
    'Пряжка', 
    'Прямоугольная Пряжка', 
    'Диск с циркулярным орнаментом', 
    'Горшок с личиной', 
    'Горшок с оттисками «сетки-плетенки»', 
    'О проекте'
  ]

  const [currentArea, setCurrentArea] = useState(0)

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

  const pageLerp = useRef(state.top / stateThree.size.height)

  useFrame((s, delta) => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, 0.15))

    if (page > 1) {
      mapRef.current.position.x = THREE.MathUtils.lerp(mapRef.current.position.x,  0.044 * stateThree.viewport.width, 0.15)
    } else {
      mapRef.current.position.x = THREE.MathUtils.lerp(mapRef.current.position.x,  0.1 * stateThree.viewport.width, 0.15)
    }

    if (state.zoomGlobal) {
      mapRef.current.position.x = THREE.MathUtils.lerp(mapRef.current.position.x,  0.1 * stateThree.viewport.width, 0.15)
    } else {
      mapRef.current.position.x = THREE.MathUtils.lerp(mapRef.current.position.x,  0.044 * stateThree.viewport.width, 0.15)
    }
  })

  function Dot({ value, index }: any) {

    const [hovered, setHovered] = useState(false)

    useEffect(() => {
      hovered ? stateThree.gl.domElement.style.cursor = 'pointer' : stateThree.gl.domElement.style.cursor = 'default'
    }, [hovered])

    useFrame(() => {
      const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, 0.15))

      if (page > 0 && page < 1) startTransition(() => setCurrentArea(0))
      if (page > 1 && page < 2) startTransition(() => setCurrentArea(1))
      if (page > 2 && page < 3) startTransition(() => setCurrentArea(2))
      if (page > 3 && page < 4) startTransition(() => setCurrentArea(3))
      if (page > 4 && page < 5) startTransition(() => setCurrentArea(4))
      if (page > 5 && page < 6.2) startTransition(() => setCurrentArea(5))
      if (page >= 6.2 && page < 10) startTransition(() => setCurrentArea(6))
      if (page > 10 && page < 13) startTransition(() => setCurrentArea(7))
      if (page > 13 && page < 16.2) startTransition(() => setCurrentArea(8))
      if (page > 16.2 && page < 19.2) startTransition(() => setCurrentArea(9))
      if (page > 19.2 && page < 22) startTransition(() => setCurrentArea(10))
      if (page > 22 && page < 24.8) startTransition(() => setCurrentArea(11))
      if (page > 24.8 && page < 27.7) startTransition(() => setCurrentArea(12))
      if (page > 27.7 && page < 29.6) startTransition(() => setCurrentArea(13))
      if (page > 29.6) startTransition(() => setCurrentArea(14))
    })

    const posYAspect = -0.04 * (index + 1) * (stateThree.viewport.height / 6)

    function handlePointerOverDot(event: MouseEvent) {
      event.stopPropagation()
      startTransition(() => setHovered(true))
      stateThree.gl.domElement.style.cursor = 'pointer'
    }

    function handlePointerOutDot(event: MouseEvent) {
      event.stopPropagation()
      startTransition(() => setHovered(false))
      stateThree.gl.domElement.style.cursor = 'default'
    }

    return (
      <group scale={0.016} position={[posXAspect, posYAspect, -1]}>
        <Line
          points={[-0.5, 0.5, 0, 0.5, 0.5, 0, 0.5, -0.5, 0, -0.5, -0.5, 0, -0.5, 0.5, 0]}
          color={pageLerp.current > 1 ? (pageLerp.current > 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
          transparent
          opacity={0.75}
          linewidth={(hovered || currentArea === index) ? 2 : 0}
          position={[0, 0, 0]}
        />

        <mesh
          scale={1.5}
          onPointerOver={(e: any) => { startTransition(() => handlePointerOverDot(e)) }}
          onPointerOut={(e: any) => { startTransition(() => handlePointerOutDot(e)) }}
          onClick={(e: any) => { startTransition(() => handleScrollTo(index)) }}
          raycast={meshBounds}
        >
          <circleGeometry />
          <meshPhongMaterial 
            transparent 
            color={pageLerp.current > 1 ? (pageLerp.current > 2 ? "#ffffff" : "#2b2b2b") : "#ffffff"} 
            emissive={pageLerp.current > 1 ? (pageLerp.current > 2 ? "#ffffff" : "#2b2b2b") : "#ffffff"} 
            opacity={(hovered || currentArea === index) ? 0 : 0.01} 
          />
        </mesh>

        <mesh
          scale={(hovered || currentArea === index) ? 1.2 : 0.25}
          onPointerOver={(e: any) => { startTransition(() => handlePointerOverDot(e)) }}
          onPointerOut={(e: any) => { startTransition(() => handlePointerOutDot(e)) }}
          onClick={(e: any) => { startTransition(() => handleScrollTo(index)) }}
          raycast={meshBounds}
        >
          <circleGeometry />
          <meshPhongMaterial 
            transparent 
            color={pageLerp.current > 1 ? (pageLerp.current > 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"} 
            emissive={pageLerp.current > 1 ? (pageLerp.current > 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"} 
            opacity={(hovered || currentArea === index) ? 0.05 : 0.75} 
          />
        </mesh>

        <Html  
          as='div'
          wrapperClass='wrapperClass_miniMap'
          prepend
          center
        >
          <div className={hovered ? 'cooltipz--custom cooltipz--left cooltipz--visible' : 'cooltipz--custom cooltipz--left'} aria-label={value}>
          </div>
        </Html>
      </group>
    )
  }

  return (
    <group
      ref={mapRef} 
      position={[0.05 * stateThree.viewport.width, 0.32 * (stateThree.viewport.height / 6), 0]}
    >
      {
        mapArray.map((value, index) => (
          <Dot
            key={index}
            value={value}
            index={index}
          />
        ))
      }

      {/* *********************** 1 *********************** */}
      <MinimapLine
        positionY={ 0.05 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 29 }
        scrollDelay={ 0 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 1 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, 0.015 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 2 *********************** */}
      <MinimapLine
        positionY={ 0.089 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 24 }
        scrollDelay={ 0.85 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 2 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.025 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 3 *********************** */}
      <MinimapLine
        positionY={ 0.129 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 29 }
        scrollDelay={ 1.95 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 3 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.065 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 4 *********************** */}
      <MinimapLine
        positionY={ 0.169 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 28.5 }
        scrollDelay={ 2.98 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 4 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.105 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 5 *********************** */}
      <MinimapLine
        positionY={ 0.209 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 27.5 }
        scrollDelay={ 3.98 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 5 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.145 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 6 *********************** */}
      <MinimapLine
        positionY={ 0.249 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 24 }
        scrollDelay={ 4.98 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 6 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.185 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 7 *********************** */}
      <MinimapLine
        positionY={ 0.289 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 7.5 }
        scrollDelay={ 6.15 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 7 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.225 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 8 *********************** */}
      <MinimapLine
        positionY={ 0.329 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 9.8 }
        scrollDelay={ 10 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 8 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.265 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 9 *********************** */}
      <MinimapLine
        positionY={ 0.369 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 9.5 }
        scrollDelay={ 13 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 9 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.305 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 10 *********************** */}
      <MinimapLine
        positionY={ 0.41 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 9.5 }
        scrollDelay={ 16.2 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 10 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.345 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 11 *********************** */}
      <MinimapLine
        positionY={ 0.45 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 9.8 }
        scrollDelay={ 19.1 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 11 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.385 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 12 *********************** */}
      <MinimapLine
        positionY={ 0.49 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 9.8 }
        scrollDelay={ 21.9 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 12 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.425 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 13 *********************** */}
      <MinimapLine
        positionY={ 0.53 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 9.6 }
        scrollDelay={ 24.7 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 13 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.465 * (stateThree.viewport.height / 6), -1]}
      />

      {/* *********************** 14 *********************** */}
      <MinimapLine
        positionY={ 0.57 * (stateThree.viewport.height / 6) }
        positionX={ posXAspect }
        scrollSpeed={ 14 }
        scrollDelay={ 27.6 }
        color={ currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b" }
      />
      <Line
        points={[[0, -0.06 * (stateThree.viewport.height / 6), 0], [0, -0.09 * (stateThree.viewport.height / 6), 0]]}
        color={currentArea >= 1 ? (currentArea >= 2 ? "#2b2b2b" : "#ffffff") : "#2b2b2b"}
        transparent
        opacity={currentArea >= 14 ? 0.8 : 0}
        linewidth={2}
        position={[posXAspect + 0.015, -0.505 * (stateThree.viewport.height / 6), -1]}
      />

    </group >
  )
}
