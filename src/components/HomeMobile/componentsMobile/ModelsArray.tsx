import falcon_webp from '../../../assets/images/models/falcon.webp'
import eagle_webp from '../../../assets/images/models/eagle.webp'
import deer_webp from '../../../assets/images/models/deer.webp'
import disk_webp from '../../../assets/images/models/disk.webp'
import rectangular_buckle_webp from '../../../assets/images/models/rectangular_buckle.webp'
import buckle_webp from '../../../assets/images/models/buckle.webp'
import pot_with_face_webp from '../../../assets/images/models/pot_with_face.webp'
import pot_with_mesh_webp from '../../../assets/images/models/pot_with_mesh.webp'

import '../css/models.css';

import { animated, useSprings } from '@react-spring/web'

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

  const to = (i: number) => ({
    x: Math.round(window.innerWidth > 1024 ? 
      (
        window.innerWidth > 1400 ?  
          window.innerWidth / 6 * (Math.cos(theta(i - currentImg + 2, 8))) 
          : 
          window.innerWidth / 4 * (Math.cos(theta(i - currentImg + 2, 8)))
      ) 
      : 
      window.innerWidth / 3 * (Math.cos(theta(i - currentImg + 2, 8)))),

    y: Math.round(window.innerWidth > 1024 ? 
      (
        window.innerWidth > 1400 ? 
        window.innerWidth / 12 * (Math.sin(theta(i - currentImg + 2, 8)))
        :
        window.innerWidth / 8 * (Math.sin(theta(i - currentImg + 2, 8)))
      ) 
      : 
      window.innerWidth / 6 * (Math.sin(theta(i - currentImg + 2, 8)))),
    zIndex: i === currentImg ? 10 : 1,
    rot: 0,
    scale: i === currentImg ? 1 : 0.35,
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
          <animated.div
            style={{
              backgroundImage: `url(${cards[i]})`,
            }}
          />
        </animated.div>
      ))}
    </div>
  )
}
