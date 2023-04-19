import * as React from 'react'
import { useInView, animated } from '@react-spring/web'
import { buildInteractionObserverThreshold } from '../../../utils/threshold'


export const AnimTextR = ({ children }: { children: React.ReactNode }) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        x: 40,
      },
      to: {
        opacity: 1,
        x: 0,
      },
      config: {
        mass: 3,
        friction: 35,
        tension: 180,
      },
      delay: 150
    }),
    {
      rootMargin: '0% 0px -20% 0px',
      amount: buildInteractionObserverThreshold(),
    }
  )

  return (
    <animated.p ref={ref} style={springs}>
      {children}
    </animated.p>
  )
}
