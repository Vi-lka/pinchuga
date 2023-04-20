import { ParallaxLayer } from '@react-spring/parallax'
import { animated, useInView } from '@react-spring/web'
import React from 'react'
import { buildInteractionObserverThreshold } from '../../../utils/threshold'
import SuspenseImage from '../../../utils/SuspenseImage'
import great_migration from '../../../assets/images/great_migration.svg'

export default function GreatMigrationDiv({offset, speed, factor} : {offset: number, speed: number, factor: number}) {
    const [ref, springs] = useInView(
        () => ({
            from: {
                opacity: 0,
            },
            to: {
                opacity: 1,
            },
            config: {
              mass: 1,
              friction: 40,
              tension: 300,
            },
        }),
        {
          rootMargin: '5% 10%',
          amount: buildInteractionObserverThreshold()
        }
      )
    
      return (
        <>
            {/* <ParallaxLayer offset={offset} speed={speed} factor={factor}>
                <animated.div style={springs} className={'bgColor'}>
                </animated.div>
                <animated.div ref={ref} style={springs} className={'bgColor'}>
                </animated.div>
                <animated.div style={springs} className={'bgColor'}>
                </animated.div>
            </ParallaxLayer> */}


        </>
      )
}
