import { Bounds, Center as DreiCenter, Html, Loader, Preload, Sphere, useProgress } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import { Bird1Simpled } from '../../Models/Bird1/Bird1Simpled'
import { Bird2Simpled } from '../../Models/Bird2/Bird2Simpled'

export default function MobileCanvas({ currentModel } : { currentModel: number }) {

    const { active } = useProgress()
    const [loadingState, setloadingState] = useState<boolean>(true)
    useEffect(() => {
      setloadingState(active)
    }, [active])

    function Scene() {
        const stateThree = useThree()

        const regress = useThree(state => state.performance.regress)
        useEffect(() => {
            stateThree.controls?.addEventListener('change', regress)
        })

        function AdaptivePixelRatio() {
            const current = useThree(state => state.performance.current)
            useEffect(() => {
              stateThree.gl.setPixelRatio(0.95 * (window.devicePixelRatio * current))
            })
            return null
        }

        return (
            <>
            <Bounds
              fit={loadingState}
              clip={loadingState}
              observe
              damping={0}
              margin={1.2}
            >
              <DreiCenter
                // rotation={[0, 1.5, 0]}
              >
                {/* {
                    (currentModel === 0) ? 
                    (
                        <Suspense fallback={
                            <Sphere scale={1.2} position={[0, 0, 0]}>
                              <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                            </Sphere>
                          }>
                            <Bird1Simpled
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                              scale={0.52}
                            />
                        </Suspense>
                    ) 
                    : 
                    (currentModel === 1) ? 
                    (
                        <Suspense fallback={
                            <Sphere scale={1.2} position={[0, 0, 0]}>
                              <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                            </Sphere>
                          }>
                            <Bird2Simpled
                              position={[0, 0, 0]}
                              rotation={[0, 0, 0]}
                              scale={0.52}
                            />
                        </Suspense>
                    )
                    :
                    null

                } */}

                    <Suspense fallback={
                        <Sphere scale={1.2} position={[0, 0, 0]}>
                          <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                        </Sphere>
                      }>
                        <Bird1Simpled
                          position={[0, 0, 0]}
                          rotation={[0, 0, 0]}
                          scale={0.52}
                        />
                    </Suspense>
                </DreiCenter>
              </Bounds>
            </>
        )
    }

  return (
    <Canvas
        className="canvasMobile"
        shadows={true}
        camera={{
            fov: 45,
            near: 0.1,
            far: 1000,
            position: [0, 0, 10],
        }}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        dpr={[0.8, 2]}
        performance={{ min: 0.7 }}
        frameloop='demand'
        // onCreated={({ gl }) => gl.setClearColor('#f6f6f6')}
    >

    <Suspense
      fallback={
        <Html>
          <Loader
            dataStyles={{ color: "#000000" }} // Text styles
            dataInterpolation={(p) => `Loading ${p.toFixed(1)}%`} // Text
            initialState={(active) => active} // Initial black out state
          />
        </Html>
      }
    >

        <Scene />

        <directionalLight position={[-3, -15, -15]} />
        <directionalLight position={[-3, 15, 15]} />

      {/* <PerfHook /> */}
      {/* <Perf
        // deepAnalyze
      /> */}

        <Preload all />
    </Suspense>
  </Canvas>
  )
}
