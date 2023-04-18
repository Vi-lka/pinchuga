import './overlayHome.css'
import DHLab_logo from '../../assets/images/DHLab_logo.svg'
import arch_lab from '../../assets/images/arch_lab.svg'
import { createRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

function OverlayHome({zoom, setZoom} : {zoom: boolean, setZoom: any}) {

  const closeZoomRef = createRef<any>()

  useFrame(() => {
    closeZoomRef.current && (closeZoomRef.current.style.display = zoom ? 'block' : 'none')
  })

  return (
    <>
        <Html  
          as='div'
          wrapperClass='wrapperClass_logo'
          prepend
        >
          <a className='dhLab' href='https://dh-lab.ru/' target="__blank">
            <img src={DHLab_logo} alt="Digital Humanities Lab"/>
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
            <img src={arch_lab} alt="Лаборатория археологии Енисейской Сибири"/>
          </a>
        </Html>
    </>
  )
}

export default OverlayHome
