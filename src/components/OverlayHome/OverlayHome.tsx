import './overlayHome.css'
import DHLab_logo from '../../assets/images/DHLab_logo.svg'
import arch_lab from '../../assets/images/arch_lab.svg'
import { createRef, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'

function OverlayHome({zoom, setZoom} : {zoom: boolean, setZoom: any}) {

  const closeZoomRef = createRef<any>()

  const [showMenu, setShowMenu] = useState(false);
  const nodeRef = useRef(null);

  useFrame(() => {
    closeZoomRef.current && (closeZoomRef.current.style.display = zoom ? 'block' : 'none')
  })

  return (
    <>
        <Html  
          as='div' // Wrapping element (default: 'div')
          wrapperClass='wrapperClass_logo' // The className of the wrapping element (default: undefined)
          prepend
        >
          <a className='dhLab' href='https://dh-lab.ru/' target="__blank">
            <img src={DHLab_logo} alt="DHLab"/>
          </a>

          <button ref={closeZoomRef} className='tooltip' onClick={() => setZoom(false)}>
            X
            <span className="tooltiptext">Закрыть</span>
          </button>

          <a className='archLab' href='https://structure.sfu-kras.ru/node/359' target="__blank">
            <img src={arch_lab} alt="Лаборатория археологии Енисейской Сибири"/>
          </a>

          {/* <button ref={closeZoomRef} className='tooltip' onClick={() => setShowMenu(true)}>
            X
            <span className="tooltiptext">Закрыть</span>
          </button>
          <CSSTransition
            in={showMenu}
            nodeRef={nodeRef}
            timeout={300}
            classNames="alert"
            unmountOnExit
            onEnter={() => setShowMenu(false)}
            onExited={() => setShowMenu(true)}
          >
            
          </CSSTransition> */}
        </Html>
    </>
  )
}

export default OverlayHome
