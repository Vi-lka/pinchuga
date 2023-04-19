import * as React from 'react'
import { useInView, animated } from '@react-spring/web'
import { buildInteractionObserverThreshold } from '../../../utils/threshold'


export const AnimHrL = () => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        x: -40,
      },
      to: {
        opacity: 1,
        x: 0,
      },
      config: {
        mass: 1,
        friction: 30,
        tension: 300,
      },
      delay: 0
    }),
    {
      rootMargin: '0% 0px -15% 0px',
      amount: buildInteractionObserverThreshold(),
    }
  )

  return (
      <animated.hr ref={ref} style={springs} className='hr-line'/>
  )
}
