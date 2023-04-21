import React from 'react'
import SuspenseImage from '../../../utils/SuspenseImage'
import { animated, useInView } from '@react-spring/web'
import { buildInteractionObserverThreshold } from '../../../utils/threshold'

export default function ScrollArrow({ src, className, onClick }: { src: string, className: string, onClick: any }) {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: -40,
      },
      to: {
        opacity: 1,
        y: 0,
      },
      config: {
        mass: 2,
        friction: 30,
        tension: 300,
      },
      delay: 300
    }),
    {
      rootMargin: '-25% 0% 0% 0%',
      amount: buildInteractionObserverThreshold(),
    }
  )

  return (
    <animated.div ref={ref} style={springs} className={className} onClick={onClick}>
      <p>
        ПРОДОЛЖИТЬ
      </p>
      <SuspenseImage src={src} alt='scroll' />
    </animated.div>
  )
}
