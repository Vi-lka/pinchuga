import './overlayHome.css'
import DHLab_logo from '../../assets/images/DHLab_logo.svg'
import DHLab_logo_white from '../../assets/images/DHLab_logo_white.png'
import arch_lab from '../../assets/images/arch_lab.svg'
import arch_lab_white from '../../assets/images/arch_lab_white.png'
import { createRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import state from '../../utils/state'

function OverlayHome({zoom, setZoom} : {zoom: boolean, setZoom: any}) {

  const [logosColor, setLogosColor] = useState(false)

  const closeZoomRef = createRef<any>()

  useFrame(() => {
    closeZoomRef.current && (closeZoomRef.current.style.display = zoom ? 'block' : 'none')

    state.top > height / 1.0069 ? setLogosColor(true) : setLogosColor(false)
  })

  const height = state.pages * window.innerHeight

  return (
    <>
        <Html  
          as='div'
          wrapperClass='wrapperClass_logo'
          prepend
        >
          <a className='dhLab' href='https://dh-lab.ru/' target="__blank">
            <img src={logosColor ? DHLab_logo_white : DHLab_logo} alt="Digital Humanities Lab"/>
          </a>

          <button 
            ref={closeZoomRef} 
            className='tooltip' 
            onClick={() => setZoom(false)}
            style={{display: 'none'}}
          >
            X
            <span className="tooltiptext">Закрыть</span>
          </button>

          <a className='archLab' href='https://structure.sfu-kras.ru/node/359' target="__blank">
            <img src={logosColor ? arch_lab_white : arch_lab} alt="Лаборатория археологии Енисейской Сибири"/>
          </a>
        </Html>
    </>
  )
}

export default OverlayHome
