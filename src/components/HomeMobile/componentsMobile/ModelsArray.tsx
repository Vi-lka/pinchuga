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
  const cards = [
    falcon_webp,
    eagle_webp,
    deer_webp,
    disk_webp,
    rectangular_buckle_webp,
    buckle_webp,
    pot_with_face_webp,
    pot_with_mesh_webp
  ]

  // These two are just helpers, they curate spring data, values that are later being interpolated into css

  // let theta = 2 * Math.PI * (i / count)

  function theta(i: number, count: number) {
    return 2 * Math.PI * (i / count)
  }

  function getEndpoint(i: number, count: number): number {
    const midpoint = count / 2; // Calculate the midpoint between 0 and count
    const distanceFromMidpoint = Math.abs(i - midpoint); // Calculate the distance from the midpoint

    if (i <= midpoint) {
      // If i is less than or equal to the midpoint, return a value between 1 and 1.5 based on the distance from the midpoint
      return 1 + (distanceFromMidpoint / midpoint) * 0.5;
    } else {
      // If i is greater than the midpoint, return a value between 1.5 and 2 based on the distance from the midpoint
      return 1.5 + (distanceFromMidpoint / midpoint) * 0.5;
    }
  }
  const to = (i: number) => ({
    x: Math.round(window.innerWidth / 3 * (Math.cos(theta(i + 2, 8)))),
    y: Math.round(window.innerWidth / 5 * (Math.sin(theta(i + 2, 8)))),
    rot: 0,
    scale: getEndpoint(i, 8) / 2.5,
    delay: i * 100,
  })
  const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
  // This is being used down there in the view, it interpolates rotation and scale into a css transform
  const trans = (r: number, s: number) => `perspective(1500px) scale(${s})`

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
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
      const rot = mx / 100 + (isGone ? dir * 10 * velocity[0] : 0) // How much the card tilts, flicking it harder makes it rotate faster
      const scale = down ? 1.1 : 1 // Active cards lift up a bit
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })
    if (!down && gone.size === cards.length)
      setTimeout(() => {
        gone.clear()
        api.start(i => to(i))
      }, 600)
  })

  return (

    <div className={grab ? 'container-models grab' : 'container-models'}>
      {props.map(({ x, y, rot, scale }, i) => (
        <animated.div className='deck' key={i} style={{ x, y }}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            {...bind(i)}
            style={{
              transform: springTo([rot, scale], trans),
              backgroundImage: `url(${cards[i]})`,
            }}
          />
        </animated.div>
      ))}
    </div>
  )
}
