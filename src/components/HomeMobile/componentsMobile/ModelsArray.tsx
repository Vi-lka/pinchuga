import React, { useState } from 'react'

import falcon_webp from '../../../assets/images/models/falcon.webp'
import eagle_webp from '../../../assets/images/models/eagle.webp'
import deer_webp from '../../../assets/images/models/deer.webp'
import disk_webp from '../../../assets/images/models/disk.webp'
import rectangular_buckle_webp from '../../../assets/images/models/rectangular_buckle.webp'
import buckle_webp from '../../../assets/images/models/buckle.webp'
import pot_with_face_webp from '../../../assets/images/models/pot_with_face.webp'
import pot_with_mesh_webp from '../../../assets/images/models/pot_with_mesh.webp'

import '../css/models.css';

import SuspenseImage from '../../../utils/SuspenseImage'
import { animated, to as springTo, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'

export default function ModelsArray() {
    const cards = [falcon_webp, eagle_webp, deer_webp]

    // These two are just helpers, they curate spring data, values that are later being interpolated into css
    const to = (i: number) => ({
        x: 0,
        y: i * -4,
        scale: 1,
        delay: i * 100,
    })
    const from = (_i: number) => ({ x: 0, scale: 1.5, y: -1000 })
    // This is being used down there in the view, it interpolates rotation and scale into a css transform
    const trans = (r: number, s: number) => `perspective(1500px) rotateZ(${r}deg) scale(${s})`

    const [gone] = useState(() => new Set()) // The set flags all the cards that are flicked out

  const [grab, setGrab] = useState(false)

    const [props, api] = useSprings(cards.length, i => ({
        ...to(i),
        from: from(i),
      })) // Create a bunch of springs using the helpers above

        // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
        console.log(mx)

        if (down) {
            setGrab(true)
        } else {
            setGrab(false)
        }

      const trigger = (mx > 20) || (mx < -20) // If you flick hard enough it should trigger the card to fly out
      const dir = xDir < 0 ? -1 : 1 // Direction should either point left or right
      if (!down && trigger) gone.add(index) // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start(i => {
        if (index !== i) return // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index)
        const x = isGone ? ((200 + window.innerWidth) * dir) : (down ? mx : 0) // When a card is gone it flys out left or right, otherwise goes back to zero
        const scale = down ? 1.1 : 1 // Active cards lift up a bit
        return {
          x,
          scale,
          delay: undefined,
          config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
        }
      })
      if (!down && gone.size === cards.length)
        setTimeout(() => {
          gone.clear()
          api.start(i => to(i))
        }, 300)
    })

    return (
        // <div className="models-img-container">
        //     <div>
        //       <SuspenseImage src={falcon_webp} alt='Сокол' className='models-img' />
        //     </div>
        //     <div>
        //       <SuspenseImage src={eagle_webp} alt='Орёл' className='models-img' />
        //     </div>
        //     <div>
        //       <SuspenseImage src={deer_webp} alt='Олень' className='models-img' />
        //     </div>
        //     <div>
        //       <SuspenseImage src={disk_webp} alt='Диск с циркульным орнаментом' className='models-img' />
        //     </div>
        //     <div>
        //       <SuspenseImage src={rectangular_buckle_webp} alt='Прямоугольная Пряжка' className='models-img' />
        //     </div>
        //     <div>
        //       <SuspenseImage src={buckle_webp} alt='Пряжка' className='models-img' />
        //     </div>
        //     <div>
        //       <SuspenseImage src={pot_with_face_webp} alt='Горшок с личиной' className='models-img' />
        //     </div>
        //     <div>
        //       <SuspenseImage src={pot_with_mesh_webp} alt='Горшок с оттисками «сетки-плетенки»' className='models-img' />
        //     </div>
        // </div>

        <div className={grab ? 'container grab' : 'container'}>
        {props.map(({ x, y, scale }, i) => (
          <animated.div className='deck' key={i} style={{ x, y }}>
            {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
            <animated.div
              {...bind(i)}
              style={{
                transform: springTo([scale], trans),
                backgroundImage: `url(${cards[i]})`,
              }}
            />
          </animated.div>
        ))}
      </div>
    )
}
