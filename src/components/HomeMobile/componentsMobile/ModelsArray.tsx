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

  function theta(i: number, count: number) {
    return 2 * Math.PI * (i / count)
  }

  let currentImg = 0

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
    x: Math.round(window.innerWidth / 3 * (Math.cos(theta(i - currentImg + 2, 8)))),
    y: Math.round(window.innerWidth / 6 * (Math.sin(theta(i - currentImg + 2, 8)))),
    zIndex: i === currentImg ? 10 : 1,
    rot: 0,
    scale: i === currentImg ? 1 : 0.4,
    // scale: 2,
    delay: i * 10,
  })
  const from = (_i: number) => ({ x: 0, y: -1000, zIndex: 1, scale: 1 })

  const [props, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  })) 

  function nextImg(i: number) {
    currentImg = i
    api.start(i => to(i))
  }

  return (
    <div className={'container-models'}>
      {props.map(({ x, y, zIndex, scale }, i) => (
        <animated.div className='deck' key={i} style={{ x, y, zIndex, scale }} onClick={(e) => nextImg(i)}>
          {/* This is the card itself, we're binding our gesture to it (and inject its index so we know which is which) */}
          <animated.div
            // {...bind(i)}
            style={{
              backgroundImage: `url(${cards[i]})`,
            }}
          />
        </animated.div>
      ))}
    </div>
  )
}
