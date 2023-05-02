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
import { useSpringCarousel } from 'react-spring-carousel'
import mockedItems from '../../../utils/modelsItems'
import parse from 'html-react-parser';

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

  // const cards = [
  //   falcon_webp,
  //   pot_with_mesh_webp,
  //   pot_with_face_webp,
  //   rectangular_buckle_webp,
  //   disk_webp,
  //   deer_webp,
  //   buckle_webp,
  //   eagle_webp, 
  // ]

  function theta(i: number, count: number) {
    return 2 * Math.PI * (i / count)
  }

  let currentImg = 0

  const to = (i: number) => ({
    x: Math.round(window.innerWidth > 1000 ? 
      (
        window.innerWidth > 1400 ?  
          window.innerWidth / 6 * (Math.sin(theta(i - currentImg , 8))) 
          : 
          window.innerWidth / 5 * (Math.sin(theta(i - currentImg , 8)))
      ) 
      : 
      window.innerWidth / 3 * (Math.sin(theta(i - currentImg , 8)))),

    y: Math.round(window.innerWidth > 1000 ? 
      (
        window.innerWidth > 1400 ? 
        window.innerWidth / 12 * (Math.cos(theta(i - currentImg , 8)))
        :
        window.innerWidth / 10 * (Math.cos(theta(i - currentImg , 8)))
      ) 
      : 
      window.innerWidth / 6 * (Math.cos(theta(i - currentImg , 8)))),
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
    slideToItem(i)
  }

  const { carouselFragment, slideToItem } = useSpringCarousel({
    disableGestures: true,
    withLoop: true,
    items: mockedItems.map((i) => ({
      id: i.id,
      renderItem: (
          <div className='models-text-slider-item'>
              <b className='title-models'>{i.title}</b>
              <p>
                {parse(i.text)}
              </p>
              <button className='open-model-mobile' onClick={
                  (e: any) => {
                  }
                }>3D модель</button>
          </div>
      ),
    })),
  });

  return (
    <div className='models-array'>
      <div className={'models-text-slider'}>
        {carouselFragment}
      </div>

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
    </div>
  )
}
