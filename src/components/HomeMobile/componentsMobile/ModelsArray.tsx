import React, { useRef, useState } from 'react'

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
    x: Math.round(window.innerWidth / 3 * (Math.cos(theta(i + currentImg + 2, 8)))),
    y: Math.round(window.innerWidth / 5 * (Math.sin(theta(i + currentImg + 2, 8)))),
    rot: 0,
    // scale: getEndpoint(i, 8) / 2.5,
    scale: 1,
    delay: i * 100,
  })
  const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })
  // This is being used down there in the view, it interpolates rotation and scale into a css transform
  // const trans = (x: number, y: number, r: number, s: number) => `perspective(1500px) translate3d(${x}, ${y}, 0px) scale(${s})`
  const trans = (r: number, s: number) => `perspective(1500px) scale(${s})`

  const [currentImg, setCurrentImg] = useState(0) // The set flags all the cards that are flicked out

  const [grab, setGrab] = useState(false)

  const [props, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) // Create a bunch of springs using the helpers above

  function compare(v1: number, v2:number): boolean {
    let value = v1
    if (value >= 900) {
      value = v1 - 900
    }
    if (value <= -900) {
      value = v1 + 900
    }
    return value >= v2
  }

  const spinRef = useRef(0)

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    // console.log(mx)

    if (down) {
      setGrab(true)
    } else {
      setGrab(false)
    }

    spinRef.current = spinRef.current - mx/100
    if (spinRef.current >= 900) {
      spinRef.current = spinRef.current - Math.abs(spinRef.current)
    }
    if (spinRef.current <= -900) {
      spinRef.current = spinRef.current + Math.abs(spinRef.current)
    }

    // console.log(spinRef.current)


    compare(spinRef.current, 800) ? 
    setCurrentImg(0) :
    compare(spinRef.current, 700) ?
    setCurrentImg(7) :
    compare(spinRef.current, 600) ?
    setCurrentImg(6) :
    compare(spinRef.current, 500) ?
    setCurrentImg(5) :
    compare(spinRef.current, 400) ?
    setCurrentImg(4) :
    compare(spinRef.current, 300) ?
    setCurrentImg(3) :
    compare(spinRef.current, 200) ?
    setCurrentImg(2) :
    compare(spinRef.current, 100) ?
    setCurrentImg(1) :
    compare(spinRef.current, 0) ?
    setCurrentImg(0) :
    compare(spinRef.current, -100) ?
    setCurrentImg(7) :
    compare(spinRef.current, -200) ?
    setCurrentImg(6) :
    compare(spinRef.current, -300) ?
    setCurrentImg(5) :
    compare(spinRef.current, -400) ?
    setCurrentImg(4) :
    compare(spinRef.current, -500) ?
    setCurrentImg(3) :
    compare(spinRef.current, -600) ?
    setCurrentImg(2) :
    compare(spinRef.current, -700) ?
    setCurrentImg(1) :
    setCurrentImg(0)

    console.log(currentImg)

    api.start(i => {
      const x = down ? Math.round(window.innerWidth / 3 * (Math.cos(theta(i + spinRef.current/100 + 2, 8)))) : Math.round(window.innerWidth / 3 * (Math.cos(theta(i + currentImg + 2, 8))))
      const y = down ? Math.round(window.innerWidth / 5 * (Math.sin(theta(i + spinRef.current/100 + 2, 8)))) : Math.round(window.innerWidth / 5 * (Math.sin(theta(i + currentImg + 2, 8))))
      const scale = 1
      return {
        x,
        y,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : 500},
      }
    })

    if (!down)
      setTimeout(() => {
        api.start(i => to(i))
      }, 100)
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
