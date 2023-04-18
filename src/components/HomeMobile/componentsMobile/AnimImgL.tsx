import * as React from 'react'
import { useInView, animated } from '@react-spring/web'
import { buildInteractionObserverThreshold } from '../../../utils/threshold'


export const AnimImgL = ({ src, alt, className }: { src: any, alt: string, className?: string }) => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        x: -80,
      },
      to: {
        opacity: 1,
        x: 0,
      },
      config: {
        mass: 2,
        friction: 60,
        tension: 180,
      },
      delay: 100
    }),
    {
      rootMargin: '-15% 0px -25% 0px',
      amount: buildInteractionObserverThreshold(),
    }
  )

  return (
    <animated.img ref={ref} style={springs} src={src} alt={alt} className={className}/>
  )
}
