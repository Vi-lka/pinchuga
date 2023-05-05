import { Bounds, ContactShadows, Center as DreiCenter, Html, Loader, OrbitControls, Preload, useProgress } from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import React, { Suspense, useEffect, useState } from 'react'
import { Bird1Simpled } from '../../Models/Bird1/Bird1Simpled'
import { Bird2Simpled } from '../../Models/Bird2/Bird2Simpled'
import state from '../../../utils/state'
import { DeerSimpled } from '../../Models/Deer/DeerSimpled'
import { Buckle1Simpled } from '../../Models/Buckle1/Buckle1Simpled'
import { Buckle2Simpled } from '../../Models/Buckle2/Buckle2Simpled'
import { DiskSimpled } from '../../Models/DIsk/DiskSimpled'
import { Cup2Simpled } from '../../Models/Cup2/Cup2Simpled'
import { Cup1Simpled } from '../../Models/Cup1/Cup1Simpled'

export default function MobileCanvas() {

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
            const currentPerformance = useThree(state => state.performance.current)
            useEffect(() => {
              stateThree.gl.setPixelRatio((window.devicePixelRatio * currentPerformance))
            }, [currentPerformance])
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
                <DreiCenter>
                  {
                    (state.currentModel === 0) ? 
                    (
                      <Suspense>
                        <Bird1Simpled
                          position={[0, 0, 0]}
                          rotation={[0, 0, 0]}
                          scale={0.48}
                        />

                        <directionalLight position={[-10, 15, 10]} />
                        <directionalLight position={[10, 15, -10]} />

                        <ContactShadows
                          frames={1}
                          position={[0, -2.2, 0]}
                          blur={1.5}
                          far={10}
                          opacity={0.5}
                        />
                      </Suspense>
                    ) 
                    : 
                    (state.currentModel === 1) ? 
                    (
                      <Suspense>
                        <Bird2Simpled
                          position={[0, 0, 0]}
                          rotation={[0, 3.1, 0]}
                          scale={3}
                        />

                        <directionalLight position={[0, -10, 10]} intensity={0.6} />

                        <ContactShadows
                          frames={1}
                          position={[0, -1.85, 0]}
                          blur={1.5}
                          far={10}
                          opacity={0.5}
                        />
                      </Suspense>
                    )
                    : 
                    (state.currentModel === 2) ? 
                    (
                      <Suspense>
                        <DeerSimpled
                          position={[0, 0, 0]}
                          rotation={[0, 0, -1]}
                          scale={3.6}
                        />

                        <directionalLight position={[0, -10, -10]} intensity={0.5} />

                        <ContactShadows
                          frames={1}
                          position={[0, -0.95, 0]}
                          blur={1.8}
                          far={10}
                          opacity={0.5}
                        />
                      </Suspense>
                    )
                    : 
                    (state.currentModel === 3) ? 
                    (
                      <Suspense>
                        <Buckle1Simpled
                          position={[0, 0, 0]}
                          rotation={[0, -0.6, 0]}
                          scale={1.6}
                        />

                        <ContactShadows
                          frames={1}
                          position={[0, -1.12, 0]}
                          blur={1.4}
                          far={10}
                          opacity={0.5}
                        />
                      </Suspense>
                    )
                    : 
                    (state.currentModel === 4) ? 
                    (
                      <Suspense>
                        <Buckle2Simpled
                          position={[0, 0, 0]}
                          rotation={[0, 0, -1.6]}
                          scale={0.8}
                        />

                        <ContactShadows
                          frames={1}
                          position={[0, -1.14, 0]}
                          blur={1.5}
                          far={10}
                          opacity={0.5}
                        />
                      </Suspense>
                    )
                    : 
                    (state.currentModel === 5) ? 
                    (
                      <Suspense>
                        <DiskSimpled
                          position={[0, 0, 0]}
                          rotation={[1.55, 0, -1.5]}
                          scale={4.8}
                        />

                        <ContactShadows
                          frames={1}
                          position={[0, -1.95, 0]}
                          blur={1.3}
                          far={10}
                          opacity={0.5}
                        />
                      </Suspense>
                    )
                    : 
                    (state.currentModel === 6) ? 
                    (
                      <Suspense>
                        <Cup2Simpled
                          position={[0, 0, 0]}
                          rotation={[0, 1.25, 0.1]}
                          scale={1}
                        />

                        <ContactShadows
                          frames={1}
                          position={[0, -1.94, 0]}
                          blur={1.6}
                          far={10}
                          opacity={0.5}
                        />
                      </Suspense>
                    )
                    : 
                    (state.currentModel === 7) ? 
                    (
                      <Suspense>
                        <Cup1Simpled
                          position={[0, 0, 0]}
                          rotation={[-1.8, 0.05, 3]}
                          scale={1.2}
                        />

                        <ContactShadows
                          frames={1}
                          position={[0, -1.8, 0]}
                          blur={1.8}
                          far={10}
                          opacity={0.5}
                        />
                      </Suspense>
                    )
                    :
                    null
                  }
                </DreiCenter>
              </Bounds>

              <AdaptivePixelRatio />

              <OrbitControls makeDefault />
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
      
        <directionalLight position={[0, 2, 10]} />
        <directionalLight position={[0, 2, -10]} />

        <directionalLight position={[0, 5, 10]} />
        <directionalLight position={[0, 5, -10]} />
        <directionalLight position={[0, 10, 10]} />
        <directionalLight position={[0, 10, -10]} />

        <directionalLight position={[-10, 15, 10]} intensity={0.5} />
        <directionalLight position={[10, 15, -10]} intensity={0.5} />

        <Preload all />
      </Suspense>
    </Canvas>
  )
}
