import { Bounds, ContactShadows, Center as DreiCenter, Html, Loader, OrbitControls, Preload, Sphere, useProgress } from '@react-three/drei'
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

  console.log(state.currentModel)

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
                      </Suspense>
                    )
                    :
                    null
                  }
                </DreiCenter>
              </Bounds>

              {/* <ContactShadows
                frames={1}
                // position={[0, -(sceneSize.y / 2), 0]}
                blur={2}
                far={10}
                opacity={0.8}
              /> */}

              <AdaptivePixelRatio />

              <OrbitControls
                // enabled={!textHovered}
                makeDefault
              />
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
        
        <directionalLight position={[-3, -15, -15]} />
        <directionalLight position={[-3, 15, 15]} />
        
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
