import './home.css'
import { Canvas } from '@react-three/fiber'
import { Html, Loader, PerformanceMonitor } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import SceneHome from '../SceneHome/SceneHome'
import state from '../../utils/state'
import { Perf, PerfHeadless, usePerf } from 'r3f-perf'

export default function Home() {

  const [pages, setPages] = useState(0)

  const scrollArea = useRef<HTMLDivElement>(null)

  let height = pages * window.innerHeight

  const onScrollHTML = (e: any) => {
    state.top = e.target.scrollTop
  }

  useEffect(() => void onScrollHTML({ target: scrollArea.current }), [])

  function handleScrollTo(index: number) {
    const height = (state.pages * window.innerHeight)
    switch (index) {
      case 0:
        state.top = 0
        scrollArea.current?.scroll(0, 0)
        break
      case 1:
        state.top = height / 20
        scrollArea.current?.scroll(0, height / 20)
        break
      case 2:
        state.top = height / 13
        scrollArea.current?.scroll(0, height / 13)
        break
      case 3:
        state.top = height / 9.4
        scrollArea.current?.scroll(0, height / 9.4)
        break
      case 4:
        state.top = height / 7.2
        scrollArea.current?.scroll(0, height / 7.2)
        break
      case 5:
        state.top = height / 5.8
        scrollArea.current?.scroll(0, height / 5.8)
        break
      case 6:
        state.top = height / 4.2
        scrollArea.current?.scroll(0, height / 4.2)
        break
      case 7:
        state.top = height / 2.7
        scrollArea.current?.scroll(0, height / 2.7)
        break
      case 8:
        state.top = height / 2.3
        scrollArea.current?.scroll(0, height / 2.3)
        break
      case 9:
        state.top = height / 1.75
        scrollArea.current?.scroll(0, height / 1.75)
        break
      case 10:
        state.top = height / 1.58
        scrollArea.current?.scroll(0, height / 1.58)
        break
      case 11:
        state.top = height / 1.3
        scrollArea.current?.scroll(0, height / 1.3)
        break
      case 12:
        state.top = height / 1.18
        scrollArea.current?.scroll(0, height / 1.18)
        break
      case 13:
        state.top = height / 1.075
        scrollArea.current?.scroll(0, height / 1.075)
        break
      case 14:
        state.top = height
        scrollArea.current?.scroll(0, height)
        break
      default:
        return null
    }
  }

  const onScroll = (e: any) => {
    if (!state.zoomGlobal) {

      // UP
      if ((e.deltaY > 0) && (state.top < height)) {
        // Models area or not
        if (state.top / window.innerHeight < 6.2) {
          state.top = state.top + (e.deltaY / 1.8)
          scrollArea.current?.scrollBy(0, e.deltaY / 1.8)
        } else {
          state.top = state.top + (e.deltaY * 1.5)
          scrollArea.current?.scrollBy(0, e.deltaY * 1.5)
        }

        // DOWN
      } else if ((e.deltaY < 0) && (state.top > 0)) {
        // Models area or not
        if (state.top / window.innerHeight < 6.2) {
          state.top = state.top + (e.deltaY / 1.8)
          scrollArea.current?.scrollBy(0, e.deltaY / 1.8)
        } else {
          state.top = state.top + (e.deltaY * 1.5)
          scrollArea.current?.scrollBy(0, e.deltaY * 1.5)
        }
      }

      // Prevent over scroll
      if (state.top < 0) state.top = 0
      if (state.top > height) state.top = height
    }
  }

  let touchStart: number

  const onTouchStart = (e: any) => {
    if (!state.zoomGlobal) {
      touchStart = e.touches[0].clientY
    }
  }

  const onTouchMove = (e: any) => {
    if (!state.zoomGlobal) {
      let touchMove = e.targetTouches[0].clientY

      if ((touchMove < touchStart) && (state.top < height)) {
        state.top = state.top + ((touchStart - touchMove) / 3)
      } else if ((touchMove > touchStart) && (state.top > 0)) {
        state.top = state.top - ((touchMove - touchStart) / 3)
      }

      if (state.top < 0) state.top = 0
      if (state.top > height) state.top = height
    }
  }

  function PerfHook() {

    const [gl, log, getReport]: any = usePerf((s) => [s.gl, s.log, s.getReport])
    console.log(gl, log, getReport())

    if (log && (log.fps < 40)) {
      console.log("Warning! Low FPS: " + Math.round(log.fps))
    }
    return <PerfHeadless />
  }

  return (
    <>
      <Canvas
        className="canvas"
        shadows={true}
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        dpr={[0.8, 2]}
        performance={{ min: 0.8 }}
        onCreated={({ gl }) => gl.setClearColor('#f6f6f6')}
        onWheel={onScroll}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      // onTouchEnd={onTouchEnd}
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

          <SceneHome
            onReflow={setPages}
            handleScrollTo={handleScrollTo}
          />
          {/* <PerfHook /> */}

          {/* <Perf
            // deepAnalyze
          /> */}
        </Suspense>
      </Canvas>
      <div
        id='scrollArea'
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScrollHTML}
      >
        <div style={{
          height: `${pages * 105}vh`,
          width: '1px',
          background: '#f6f6f6'
        }} />
      </div>
    </>
  )
}
