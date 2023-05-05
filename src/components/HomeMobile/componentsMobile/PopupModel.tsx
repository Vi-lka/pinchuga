import { animated, useSpring } from '@react-spring/web'
import React, { createRef, useCallback, useEffect } from 'react'
import '../css/popup.css'
import MobileCanvas from './MobileCanvas'
import state from '../../../utils/state'

export default function PopupModel(
    { 
        showModal,
        setShowModal
         
    } : { 
        showModal: boolean,
        setShowModal:   React.Dispatch<React.SetStateAction<boolean>>
    }
) {
    const modalRef = createRef<HTMLDivElement>()

    const animation = useSpring({
        config: {
            mass: 1,
            friction: 80,
            tension: 260,
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `scale(1)` : `scale(0.95)`,
        background: showModal ? '#f6f6f6' : 'transparent',
        borderRadius: '10px',
    })

    const closeModal = (e: any) => {
        if (modalRef.current === e.target) {
          setShowModal(false)
        }
    }

    const keyPress = useCallback(
        (e: any) => {
          if (e.key === 'Escape' && showModal) {
            setShowModal(false)
          }
        },
        [setShowModal, showModal]
    )

    useEffect(
        () => {
          document.addEventListener('keydown', keyPress)
          return () => document.removeEventListener('keydown', keyPress)
        },
        [keyPress]
    )


    return (
        <>
        {showModal ? (
          <div className='modalBackground' onClick={closeModal} ref={modalRef}>
            <animated.div style={animation}>
              <div className='modalWrapper' style={{display: showModal ? 'flex' : 'none'}}>
                <div className='modalContent'>
                    <MobileCanvas />
                </div>
                <button className='closeModal' onClick={() => {
                    setShowModal(false)
                }}>
                    X
                </button>
              </div>
            </animated.div>
          </div>
        ) : null}
      </>
    )
}
