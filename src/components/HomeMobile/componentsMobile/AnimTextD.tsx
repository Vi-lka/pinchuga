import * as React from 'react'
import { useInView, animated } from '@react-spring/web'
import { buildInteractionObserverThreshold } from '../../../utils/threshold'


export const AnimTextD = ({ children }: { children: React.ReactNode }) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 80,
      },
      to: {
        opacity: 1,
        y: 0,
      },
      config: {
        mass: 2,
        friction: 60,
        tension: 180,
      },
      delay: 100
    }),
    {
      rootMargin: '-20% 0px 30% 0px',
      amount: buildInteractionObserverThreshold(),
    }
  )

  return (
    <animated.p ref={ref} style={springs}>
      {children}
    </animated.p>
  )
}
