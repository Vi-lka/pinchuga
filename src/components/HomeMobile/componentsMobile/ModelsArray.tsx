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
import parse from 'html-react-parser'
import SuspenseImage from '../../../utils/SuspenseImage'
import Arrow_scroll from '../../../assets/images/Arrow_scroll.webp'
import state from '../../../utils/state'

export default function ModelsArray(
  {
    showModal,
    setShowModal

  }: {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  }
) {
  const cards = [
    falcon_webp,
    eagle_webp,
    deer_webp,
    buckle_webp,
    rectangular_buckle_webp,
    disk_webp,
    pot_with_face_webp,
    pot_with_mesh_webp
  ]

  function theta(i: number, count: number) {
    return 2 * Math.PI * (i / count)
  }

  let currentImg = 0

  const to = (i: number) => ({
    x: Math.round(window.innerWidth > 1000 ?
      window.innerWidth / 7 * (Math.sin(theta(i - currentImg, 8)))
      :
      window.innerWidth / 3 * (Math.sin(theta(i - currentImg, 8)))),

    y: Math.round(window.innerWidth > 1000 ?
      window.innerWidth / 16 * (Math.cos(theta(i - currentImg, 8)))
      :
      window.innerWidth / 6 * (Math.cos(theta(i - currentImg, 8)))),
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

  const {
    carouselFragment,
    useListenToCustomEvent,
    slideToItem,
    slideToPrevItem,
    slideToNextItem
  } = useSpringCarousel({
    disableGestures: false,
    withLoop: true,
    items: mockedItems.map((i) => ({
      id: i.id,
      renderItem: (
        <div className='models-text-slider-item'>
          <b className='title-models'>{i.title}</b>
          <br />
          <p>
            {parse(i.text)}
          </p>
        </div>
      ),
    })),
  });

  function calcutaleCurrentImg(current: number) {
    if (current < 0) {
      currentImg = cards.length - 1
    } else if (current > (cards.length - 1)) {
      currentImg = 0
    } else {
      currentImg = current
    }
  }

  function changeImg(i: number) {
    currentImg = i
    api.start(i => to(i))
    slideToItem(i)
    state.currentModel = currentImg
  }

  function nextImg(next: boolean) {
    if (next) {
      calcutaleCurrentImg(currentImg - 1)
      api.start(currentImg => to(currentImg))
      slideToPrevItem()
      state.currentModel = currentImg
    } else {
      calcutaleCurrentImg(currentImg + 1)
      api.start(currentImg => to(currentImg))
      slideToNextItem()
      state.currentModel = currentImg
    }
  }

  useListenToCustomEvent((event) => {
    if (event.eventName === "onSlideStartChange") {
      const nextId = Number(event.nextItem.id) - 1

      currentImg = nextId
      api.start(nextId => to(nextId))
      state.currentModel = currentImg
    }
  });

  return (
    <>
      <div className='models-array'>
        <div className={'models-text-slider'}>
          {carouselFragment}
          <button className='open-model-mobile' onClick={
            (e: any) => {
              setShowModal(true)
            }
          }>3D модель</button>
        </div>

        <div className='models-arrows'>
          <SuspenseImage src={Arrow_scroll} alt='scroll' onClick={() => nextImg(true)} />
          <SuspenseImage src={Arrow_scroll} alt='scroll' onClick={() => nextImg(false)} />
        </div>

        <div className={'container-models'}>
          {props.map(({ x, y, zIndex, scale }, i) => (
            <animated.div className='deck' key={i} style={{ x, y, zIndex, scale }} onClick={() => changeImg(i)}>
              <animated.div
                style={{
                  backgroundImage: `url(${cards[i]})`,
                }}
              />
            </animated.div>
          ))}
        </div>
      </div>
    </>
  )
}
