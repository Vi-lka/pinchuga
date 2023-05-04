import React, { Suspense, createRef, useEffect, useRef, useState } from 'react'
import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax';
import { animated as anim, useInView, useScroll, useSpring } from '@react-spring/web';

import './homeMobile.css';
import './css/title.css';
import './css/migration.css';
import './css/big-map.css';
import './css/angara-map.css';
import './css/funeral-pure.css';
import './css/items.css';

import Arrow_scroll from '../../assets/images/Arrow_scroll.webp'
import Arrow_scroll_white from '../../assets/images/Arrow_scroll_white.webp'

import img_draw_bird_1 from '../../assets/images/img_draw_bird_1.svg'
import img_draw_bird_2 from '../../assets/images/img_draw_bird_2.svg'
import img_draw_disk from '../../assets/images/img_draw_disk.svg'
import img_draw_horse from '../../assets/images/img_draw_horse.svg'
import img_draw_cup_1 from '../../assets/images/img_draw_cup_1.svg'
import img_draw_cup_2 from '../../assets/images/img_draw_cup_2.svg'
import img_draw_item_1 from '../../assets/images/img_draw_item_1.svg'
import img_draw_item_2 from '../../assets/images/img_draw_item_2.svg'
import great_migration from '../../assets/images/great_migration.svg'
import big_map from '../../assets/images/big_map.svg'
import angara_map from '../../assets/images/angara_map.svg'
import funeral_pure from '../../assets/images/funeral_pure.svg'

import { AnimTextR } from './componentsMobile/AnimTextR';
import SuspenseImage from '../../utils/SuspenseImage';
import { AnimTextL } from './componentsMobile/AnimTextL';
import { AnimHrR } from './componentsMobile/AnimHrR';
import { AnimHrL } from './componentsMobile/AnimHrL';
import ScrollArrow from './componentsMobile/ScrollArrow';
import ModelsArray from './componentsMobile/ModelsArray';
import PopupModel from './componentsMobile/PopupModel';

export default function HomeMobile() {

  const mainContainer = useRef<HTMLDivElement>(null!)


  const parallaxRef = useRef<IParallax>(null!)

  const propsH1 = useSpring({
    from: { opacity: 0, y: 15 },
    to: { opacity: 1, y: 0 },
    config: {
      mass: 1,
      friction: 120,
      tension: 200,
    },
    delay: 0
  })

  const propsImgs = useSpring({
    from: { opacity: 0, y: 15 },
    to: { opacity: 1, y: 0 },
    config: {
      mass: 1,
      friction: 120,
      tension: 200,
    },
    delay: 200
  })

  const propsH6 = useSpring({
    from: { opacity: 0, y: 15 },
    to: { opacity: 1, y: 0 },
    config: {
      mass: 1,
      friction: 120,
      tension: 200,
    },
    delay: 400
  })

  const propsScroll = useSpring({
    from: { opacity: 0, y: 15, },
    to: { opacity: 1, y: 0, },
    config: {
      mass: 1,
      friction: 120,
      tension: 200,
    },
    delay: 800
  })

  const config = {
    mass: 2,
    friction: 35,
    tension: 200,
  }

  const [showModal, setShowModal] = useState(false)
  const [currentModel, setCurrentModel] = useState(-1)

  return (
    <Suspense fallback={<h1 style={{ color: 'black' }}>Loading...</h1>}>
      <anim.div ref={mainContainer} className="homeMobile-container">
        <Parallax
          ref={parallaxRef}
          // pages={window.innerWidth < 685 ? 9.725 : 8.6}
          pages={14}
          config={config}
          className='parallax-container'
        >

          <ParallaxLayer offset={0.12} speed={0.4} factor={0.2} >
            <anim.div className="title-imgs" style={propsImgs}>
              <SuspenseImage src={img_draw_bird_1} alt='Орёл' />
              <SuspenseImage src={img_draw_disk} alt='Диск' />
              <SuspenseImage src={img_draw_bird_2} alt='Сокол' />
            </anim.div>
          </ParallaxLayer>

          <ParallaxLayer offset={0.4} speed={0.3} factor={0.2}>
            <div className="title-text">
              <anim.h1 style={propsH1}>
                Пункт<br />Прошлого
              </anim.h1>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={0.58} speed={0.2} factor={0.2}>
            <div className="title-text">
              <anim.h6 style={propsH6}>
                3D ОБЗОР НАХОДОК ИЗ АРХЕОЛОГИЧЕСКОГО КОМПЛЕКСА ПИНЧУГА-6
              </anim.h6>
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={0.9} speed={0.1} factor={0.1} className="title-scroll" onClick={() => parallaxRef.current.scrollTo(1)} >
            <anim.div style={propsScroll}>
              <p>
                ПРОКРУТИТЕ ИЛИ НАЖМИТЕ, ЧТОБЫ ПРОДОЛЖИТЬ
              </p>
              <SuspenseImage src={Arrow_scroll} alt='scroll' />
            </anim.div>
          </ParallaxLayer>


          <ParallaxLayer offset={2} speed={0.05} factor={1} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <SuspenseImage src={big_map} alt='Центральная Азия' className='big-map-img' />
            <ScrollArrow src={Arrow_scroll} className={'scroll-arrow black'} onClick={() => parallaxRef.current.scrollTo(2.65)} />
          </ParallaxLayer>

          <ParallaxLayer offset={1} speed={0.2} factor={1} style={{ background: '#2b2b2b' }}>
            <section className="section">
              <div className="container-migration">
                <div className="migration-img">
                  <SuspenseImage src={great_migration} alt='Великое переселение народов' />
                </div>

                <div className="migration-text">
                  <p>
                    <strong>Эпоха Великого переселения народов</strong> – один из ключевых моментов истории Евразии вообще и Сибири в частности.
                    <br /><br />
                    В период <b>со II по VI вв. н.э.</b> на большей части континента происходили масштабные миграции населения, что привело к формированию новых народов и государств.
                    <br /><br />
                    Толчком этого процесса стал разгром <b>Хуннской державы</b>, проигравшей в борьбе за гегемонию в Центральной Азии китайской империи Хань и её союзникам.
                    <br /><br />
                    Племена хунну двинулись на запад, сметая по пути другие народы и привнося серьезные изменения в их культуру.
                    <br /><br />
                    Спустя почти полтора века, в 354 г. н.э., они стали известны в Европе под именем <b>«гунны»</b>, как суровые и безжалостные завоеватели.
                  </p>

                  <ScrollArrow src={Arrow_scroll_white} className={'scroll-arrow white'} onClick={() => parallaxRef.current.scrollTo(2)} />

                </div>

              </div>
            </section>
          </ParallaxLayer>

          <ParallaxLayer offset={3.42} speed={0.05} factor={1} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <SuspenseImage src={angara_map} alt='Ангара и Енисей' className='angara-map-img' />
            <ScrollArrow src={Arrow_scroll} className={'scroll-arrow black'} onClick={() => parallaxRef.current.scrollTo(4.2)} />
          </ParallaxLayer>

          <ParallaxLayer offset={3} speed={0.2} factor={0.42} style={{ background: '#2b2b2b' }}>
            <section className="section">
              <div className="container-big-map">
                <div className="big-map-text">
                  <p>
                    Миграция хунну, начавшаяся в глубокой <b>Центральной Азии</b>, затронула большую часть <b>Евразии</b>.
                    <br /><br />
                    И хотя основные исторические события происходили в <b>степях</b>, но происходившие глобальные изменения коснулись и далёких <b>таёжных районов</b>.
                    <br /><br />
                    Сейчас, на основании последних <b>полевых работ</b> мы можем говорить об этом уверенно.
                  </p>

                  <ScrollArrow src={Arrow_scroll_white} className={'scroll-arrow white'} onClick={() => parallaxRef.current.scrollTo(3.42)} />
                </div>
              </div>
            </section>
          </ParallaxLayer>

          <ParallaxLayer offset={4.94} speed={0.05} factor={1} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <SuspenseImage src={funeral_pure} alt='Могильник Пинчуга-6' className='funeral-pure-img' />
            <ScrollArrow src={Arrow_scroll} className={'scroll-arrow black'} onClick={() => parallaxRef.current.scrollTo(5.7)} />
          </ParallaxLayer>

          <ParallaxLayer offset={4.42} speed={0.2} factor={0.52} style={{ background: '#2b2b2b' }}>
            <section className="section">
              <div className="container-angara-map">
                <div className="angara-map-text">
                  <p>
                    Именно в это время на берегах <b>Ангары и Енисея</b> возникают и активно развиваются технологии получения и обработки <b>железа</b>,
                    усиливается <b>обмен</b> с южными и западными территориями, получает распространение новая <b>керамическая посуда</b>, совершенствуется <b>оружие</b>.
                    <br /><br />
                    Все эти сведения получены археологами при изучении могильника <b>III – IV вв. н.э.</b> <strong>Пинчуга-6</strong>.
                    <br /><br />
                    Он изучался археологами <b>Сибирского федерального университета</b> с 2018 по 2022 год и стал первым полностью раскопанным некрополем эпохи Великого переселения народов на Ангаре.
                  </p>

                  <ScrollArrow src={Arrow_scroll_white} className={'scroll-arrow white'} onClick={() => parallaxRef.current.scrollTo(4.94)} />
                </div>
              </div>
            </section>
          </ParallaxLayer>

          <ParallaxLayer offset={6.54} speed={0.05} factor={3} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <div className="items-img-container">
              <div>
                <div>
                  <AnimTextR>Сокол</AnimTextR>
                  <AnimHrR />
                  <SuspenseImage src={img_draw_bird_2} alt='Сокол' className='items-img' />
                </div>
                <div>
                  <SuspenseImage src={img_draw_bird_1} alt='Орёл' className='items-img' />
                  <AnimHrL />
                  <AnimTextL>Орёл</AnimTextL>
                </div>
              </div>
              <div>
                <div>
                  <AnimTextR>Олень</AnimTextR>
                  <AnimHrR />
                  <SuspenseImage src={img_draw_horse} alt='Олень' className='items-img' />
                </div>
                <div>
                  <SuspenseImage src={img_draw_disk} alt='Диск с циркульным орнаментом' className='items-img' />
                  <AnimHrL />
                  <AnimTextL>Диск с циркульным орнаментом</AnimTextL>
                </div>
              </div>
              <div>
                <div>
                  <AnimTextR>Прямоугольная Пряжка</AnimTextR>
                  <AnimHrR />
                  <SuspenseImage src={img_draw_item_2} alt='Прямоугольная Пряжка' className='items-img' />
                </div>
                <div>
                  <SuspenseImage src={img_draw_item_1} alt='Пряжка' className='items-img' />
                  <AnimHrL />
                  <AnimTextL>Пряжка</AnimTextL>
                </div>
              </div>
              <div>
                <div>
                  <AnimTextR>Горшок «личина»</AnimTextR>
                  <AnimHrR />
                  <SuspenseImage src={img_draw_cup_2} alt='Горшок с личиной' className='items-img' />
                </div>
                <div>
                  <SuspenseImage src={img_draw_cup_1} alt='Горшок с оттисками «сетки-плетенки»' className='items-img' />
                  <AnimHrL />
                  <AnimTextL>Горшок «сетка-плетенка»</AnimTextL>
                </div>
              </div>

              <ScrollArrow src={Arrow_scroll} className={'scroll-arrow black margin-top'} onClick={() => parallaxRef.current.scrollTo(9.25)} />
            </div>
          </ParallaxLayer>

          <ParallaxLayer offset={5.94} speed={0.2} factor={0.6} style={{ background: '#2b2b2b' }}>
            <section className="section">
              <div className="container-funeral-pure">
                <div className="funeral-pure-text">
                  <p>
                    Здесь найдено <b>18 погребений</b>, выполненных по одному обряду. Тело умершего сжигали на погребальном огне, после чего остывший прах хоронили в небольших ямах или просто рассыпали по поверхности.
                    <br /><br />
                    Вместе с прахом оставляли и некоторые вещи, необходимые в загробном мире: <b>посуду, ножи, иглы, тёсла, украшения, наконечники стрел, детали луков</b> и другие предметы.
                    <br /><br />
                    На могильнике <b>Пинчуга-6</b> найдено более <b>500</b> разнообразных предметов.
                    Все они важны для датировки памятника и реконструкции быта, оставивших его людей.
                    <br /><br />
                    Но в этом проекте представлена только небольшая часть всех находок.
                    Упор сделан на изделиях из бронзы, красивых, ярких и обладающих <b>художественной ценностью</b>.
                  </p>

                  <ScrollArrow src={Arrow_scroll_white} className={'scroll-arrow white'} onClick={() => parallaxRef.current.scrollTo(6.55)} />
                </div>
              </div>
            </section>
          </ParallaxLayer>

          <ParallaxLayer offset={10.2} speed={0.05} factor={1} style={{ textAlign: 'center' }}>
            <ModelsArray
              showModal={showModal} 
              setShowModal={setShowModal}
              currentModel={currentModel} 
              setCurrentModel={setCurrentModel}
            />
          </ParallaxLayer>

          <ParallaxLayer offset={9.54} speed={0.2} factor={0.46} style={{ background: '#2b2b2b' }}>
            <section className="section">
              <div className="container-items">
                <div className="items-text">
                  <p>
                    Эти предметы попали на <b>Ангару</b> из разных регионов и позволяют проследить направления <b>культурных связей</b>, понять, что выступало предметом обмена.
                    <br /><br />
                    Узнаваемые изображения <b>животных и птиц</b> позволяют нам заглянуть в мир идей и образов людей, живших на ангарских берегах более <b>1500 лет</b> назад.
                    <br /><br />
                    Представленные <b>керамические сосуды</b> не относятся к могильнику, но найдены на этом же памятнике и характерны для раннего железного века и неолита Приангарья.
                  </p>

                  <ScrollArrow src={Arrow_scroll_white} className={'scroll-arrow white'} onClick={() => parallaxRef.current.scrollTo(10.19)} />
                </div>
              </div>
            </section>
          </ParallaxLayer>

        </Parallax>
        <PopupModel 
          showModal={showModal} 
          setShowModal={setShowModal}
          currentModel={currentModel} 
          setCurrentModel={setCurrentModel}
        />
      </anim.div>
    </Suspense>
  )
}
