import { animated, useSpring } from '@react-spring/web'
import React, { createRef, useCallback, useEffect } from 'react'
import '../css/popup.css'

export default function PopupModel(
    { 
        showModal,
        setShowModal,
        currentModel, 
        setCurrentModel
         
    } : { 
        showModal: boolean,
        setShowModal:   React.Dispatch<React.SetStateAction<boolean>> ,
        currentModel: number,    
        setCurrentModel: React.Dispatch<React.SetStateAction<number>>
    }
) {
    const modalRef = createRef<HTMLDivElement>()

    const animation = useSpring({
        config: {
          duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `scale(1) translateY(0%)` : `scale(0) translateY(-100%)`
    })

    const closeModal = (e: any) => {
        if (modalRef.current === e.target) {
          setShowModal(false)
          setCurrentModel(-1)
        }
    }

    const keyPress = useCallback(
        (e: any) => {
          if (e.key === 'Escape' && showModal) {
            setShowModal(false)
            setCurrentModel(-1)
          }
        },
        [setCurrentModel, setShowModal, showModal]
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
                  <h1>{currentModel}</h1>
                </div>
                <button className='closeModal' onClick={() => {
                    setShowModal(false)
                    setCurrentModel(-1)
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
