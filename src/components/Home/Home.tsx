import './home.css'
import { Canvas } from '@react-three/fiber'
import { Html, Loader, Preload } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import SceneHome from '../SceneHome/SceneHome'
import state from '../../utils/state'

export default function Home() {

  const [pages, setPages] = useState(0)
  const scrollArea = useRef<HTMLDivElement>(null)

  const height = pages * window.innerHeight
  
  const onScrollHTML = (e: any) => {
    state.top = e.target.scrollTop
  }

  useEffect(() => void onScrollHTML({ target: scrollArea.current }), [])

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
          state.top = state.top + (e.deltaY / 2.3)
          scrollArea.current?.scrollBy(0, e.deltaY / 2.3)
        } else {
          state.top = state.top + (e.deltaY)
          scrollArea.current?.scrollBy(0, e.deltaY)
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
        state.top = state.top + ((touchStart - touchMove)/4)
      } else if ((touchMove > touchStart) && (state.top > 0)) {
        state.top = state.top - ((touchMove - touchStart)/4)
      }

      if (state.top < 0) state.top = 0
      if (state.top > height) state.top = height
    }
  }

  // const onTouchEnd = (e: any) => {
  //   let touchEnd = e.changedTouches[0].clientY

  //   if ((touchStart > touchEnd+5) && (state.top < height)) {
  //     state.top = state.top + 50
  //   } else if ((touchStart < touchEnd+5) && (state.top > 0)) {
  //     state.top = state.top - 50
  //   }
  // }

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
