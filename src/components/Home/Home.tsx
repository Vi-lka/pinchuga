import './home.css'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import SceneHome from '../SceneHome/SceneHome'
import state from '../../utils/state'
import { Perf, PerfHeadless, usePerf } from 'r3f-perf'
import LoadingScreen from '../HomeMobile/componentsMobile/LoadingScreen'

export default function Home() {

  state.lowMode = false

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
        state.top = height / 53.5
        scrollArea.current?.scroll(0, height / 53.5)
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

        if (state.top / window.innerHeight < 0.9) {

          state.top = state.top + (e.deltaY / 4)
          scrollArea.current?.scrollBy(0, e.deltaY / 4)

        } else if (state.top / window.innerHeight < 6.2) {

        // Models area or not
          state.top = state.top + (e.deltaY / 1.8)
          scrollArea.current?.scrollBy(0, e.deltaY / 1.8)

        } else {

          state.top = state.top + (e.deltaY * 1.5)
          scrollArea.current?.scrollBy(0, e.deltaY * 1.5)

        }

        // DOWN
      } else if ((e.deltaY < 0) && (state.top > 0)) {

        if (state.top / window.innerHeight < 0.9) {

          state.top = state.top + (e.deltaY / 4)
          scrollArea.current?.scrollBy(0, e.deltaY / 4)

        } else if (state.top / window.innerHeight < 6.2) {

        // Models area or not
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

       // DOWN
      if ((touchMove < touchStart) && (state.top < height)) {

        if (state.top / window.innerHeight < 0.9) {
          state.top = state.top + ((touchStart - touchMove) / 25)
          scrollArea.current?.scrollBy(0, ((touchStart - touchMove) / 25))
        } else {
          state.top = state.top + ((touchStart - touchMove) / 10)
          scrollArea.current?.scrollBy(0, ((touchStart - touchMove) / 10))
        }
        
      // UP
      } else if ((touchMove > touchStart) && (state.top > 0)) {

        if (state.top / window.innerHeight < 0.9) {
          state.top = state.top - ((touchMove - touchStart) / 25)
          scrollArea.current?.scrollBy(0, ((touchStart - touchMove) / 25))
        } else {
          state.top = state.top - ((touchStart - touchMove) / 10)
          scrollArea.current?.scrollBy(0, ((touchStart - touchMove) / 10))
        }        
      
      }

      if (state.top < 0) state.top = 0
      if (state.top > height) state.top = height
    }
  }

  function PerfHook() {

    const [gl, log, getReport]: any = usePerf((s) => [s.gl, s.log, s.getReport])

    const report = getReport()

    if (log) {
      // console.log(log.fps)
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
        onWheel={onScroll}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
      >

        <Suspense
          fallback={
            <Html center>
              <LoadingScreen/>
            </Html>
          }
        >

          <SceneHome
            onReflow={setPages}
            handleScrollTo={handleScrollTo}
          />
          <PerfHook />

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
