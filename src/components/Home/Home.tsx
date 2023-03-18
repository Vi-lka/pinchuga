import './home.css'
import { Canvas } from '@react-three/fiber'
import { Html, Loader, Preload } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import SceneHome from '../SceneHome/SceneHome'
import state from '../../utils/state'

export default function Home() {

  const [pages, setPages] = useState(0)
  // const scrollArea = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log(state.zoomGlobal)
  }, [state.zoomGlobal])

  const height = pages * window.innerHeight
  
  // const onScroll = (e: any) => {
  //   if (window.innerWidth > 1200) state.top = e.target.scrollTop
  // }

  // useEffect(() => void onScroll({ target: scrollArea.current }), [])


  const onScroll = (e: any) => {
    if (!state.zoomGlobal) {
      if ((e.deltaY > 0) && (state.top < height)) {
        state.top = state.top + (e.deltaY)
      } else if ((e.deltaY < 0) && (state.top > 0)) {
        state.top = state.top + (e.deltaY)
      }

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
        onCreated={({ gl }) => gl.setClearColor('#fbfbfb')}
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

          <Preload all />
        </Suspense>
      </Canvas>
      {/* <div
        id='scrollArea'
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        onPointerMove={(e) => (state.mouse = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1])}
      >
          <div style={{ height: `${pages * 100}vh`, width: '100vw '}} />
      </div> */}
    </>
  )
}
