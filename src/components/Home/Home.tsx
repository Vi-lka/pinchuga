import './home.css'
import { Canvas } from '@react-three/fiber'
import { Html, Loader, Preload } from '@react-three/drei'
import { Suspense, useEffect, useRef, useState } from 'react'
import SceneHome from '../SceneHome/SceneHome'
import state from '../../utils/state'

export default function Home() {

  const [pages, setPages] = useState(0)
  const scrollArea = useRef<HTMLDivElement>(null)
  
  const onScroll = (e: any) => {
    if (window.innerWidth > 1200) state.top = e.target.scrollTop
  }

  useEffect(() => void onScroll({ target: scrollArea.current }), [])

  const scrollTop = (e: any) => {
    console.log("scrollTop")
    state.top = 0
    scrollArea.current && scrollArea.current.scroll({top: 0})
  }

  return (
    <>
      <Canvas 
        className="canvas" 
        dpr={[1, 2]} 
        gl={{ preserveDrawingBuffer: true }}
        onCreated={({ gl }) => gl.setClearColor('#fbfbfb')}
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
            scrollTop={scrollTop}
          />

          <Preload all />
        </Suspense>
      </Canvas>
      <div
        id='scrollArea'
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        onPointerMove={(e) => (state.mouse = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1])}
      >
          <div style={{ height: `${pages * 100}vh`, width: '100vw '}} />
      </div>
    </>
  )
}
