import './home.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, Line, Loader, Preload, meshBounds } from '@react-three/drei'
import { Suspense, createRef, useEffect, useRef, useState } from 'react'
import SceneHome from '../SceneHome/SceneHome'
import state from '../../utils/state'

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
    switch(index) {
      case 0:
        state.top = 0
        scrollArea.current?.scroll(0, 0)
        break
      case 1:
        state.top = height/20
        scrollArea.current?.scroll(0, height/20)
        break
      case 2:
        state.top = height/13
        scrollArea.current?.scroll(0, height/13)
        break
      case 3:
        state.top = height/9.4
        scrollArea.current?.scroll(0, height/9.4)
        break
      case 4:
        state.top = height/7.2
        scrollArea.current?.scroll(0, height/7.2)
        break
      case 5:
        state.top = height/5.8
        scrollArea.current?.scroll(0, height/5.8)
        break
      case 6:
        state.top = height/4.8
        scrollArea.current?.scroll(0, height/4.8)
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
          state.top = state.top + (e.deltaY / 2.3)
          scrollArea.current?.scrollBy(0, e.deltaY / 2.3)
        } else {
          state.top = state.top + (e.deltaY)
          scrollArea.current?.scrollBy(0, e.deltaY)
        }

        // DOWN
      } else if ((e.deltaY < 0) && (state.top > 0)) {
        // Models area or not
        if (state.top / window.innerHeight < 6.2) {
          state.top = state.top + (e.deltaY / 1.5)
          scrollArea.current?.scrollBy(0, e.deltaY / 1.5)
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
    touchStart = e.touches[0].clientY
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

  return (
    <>
      <Canvas
        className="canvas"
        dpr={[1, 2]}
        gl={{ preserveDrawingBuffer: true }}
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

        </Suspense>
      </Canvas>
      <div
        id='scrollArea'
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScrollHTML}
      >
        <div style={{
          height: `${pages * 100}vh`,
          width: '1px',
          background: '#f6f6f6'
        }} />
      </div>
    </>
  )
}
