import React, { useEffect, useRef, useState } from 'react'
import './homeMobile.css';
import './css/title.css';
import './css/migration.css';
import './css/big-map.css';
import './css/angara-map.css';
import Arrow_scroll from '../../assets/images/Arrow_scroll.png'
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
import { IParallax, Parallax, ParallaxLayer } from '@react-spring/parallax';
import { animated as anim, useInView, useSpring } from '@react-spring/web';
import { AnimTextR } from './componentsMobile/AnimTextR';
import { AnimImgL } from './componentsMobile/AnimImgL';
import { AnimTextD } from './componentsMobile/AnimTextD';
import { AnimImgD } from './componentsMobile/AnimImgD';

export default function HomeMobile() {
  const parallaxRef = useRef<IParallax>(null!)

  const propsH1 = useSpring({
    from: { opacity: 0, y: 15 },
    to: { opacity: 1, y: 0 },
    config: {
      mass: 7,
      friction: 120,
      tension: 200,
    },
    delay: 0
  })

  const propsImgs = useSpring({
    from: { opacity: 0, y: 15 },
    to: { opacity: 1, y: 0 },
    config: {
      mass: 7,
      friction: 120,
      tension: 200,
    },
    delay: 200
  })

  const propsH6 = useSpring({
    from: { opacity: 0, y: 15 },
    to: { opacity: 1, y: 0 },
    config: {
      mass: 7,
      friction: 120,
      tension: 200,
    },
    delay: 400
  })

  const propsScroll = useSpring({
    from: { opacity: 0, y: 15, },
    to: { opacity: 1, y: 0, },
    config: {
      mass: 7,
      friction: 120,
      tension: 200,
    },
    delay: 800
  })

  return (
    <div className="homeMobile-container">
      <Parallax ref={parallaxRef} pages={4}>
        <ParallaxLayer offset={0} speed={0.1} factor={1}>
          <section className="section">
            <div className="container-title">
              <ParallaxLayer offset={0.15} speed={0.6} factor={0.15}>
                <anim.div className="title-imgs" style={propsImgs}>
                  <img src={img_draw_bird_1} alt='Орёл'/>
                  <img src={img_draw_disk} alt='Диск'/>
                  <img src={img_draw_bird_2} alt='Сокол'/>
                </anim.div>
              </ParallaxLayer>

              <ParallaxLayer offset={0.4} speed={0.6} factor={0.3}>
                <div className="title-text">
                  <ParallaxLayer offset={0} speed={0.2} factor={0.2}>
                    <anim.h1 style={propsH1}>
                      Пункт<br/>Прошлого
                    </anim.h1>
                  </ParallaxLayer>
                  <ParallaxLayer offset={0.2} speed={0.1} factor={0.1}>
                    <anim.h6 style={propsH6}>
                      3D ОБЗОР НАХОДОК ИЗ АРХЕОЛОГИЧЕСКОГО КОМПЛЕКСА ПИНЧУГА-6
                    </anim.h6>
                  </ParallaxLayer>
                </div>
              </ParallaxLayer>

              <ParallaxLayer offset={0.9} speed={1} factor={0.1}>
                <anim.div className="title-scroll" style={propsScroll}>
                  <p>
                    ПРОКРУТИТЕ, ЧТОБЫ ПРОДОЛЖИТЬ
                  </p>
                  <img src={Arrow_scroll} alt='scroll'/>
                </anim.div>
              </ParallaxLayer>
            </div>
          </section>
        </ParallaxLayer>

        <ParallaxLayer offset={0.999999999} speed={1.6} factor={1.3} style={{ background: '#2b2b2b' }}>
          <section className="section">
            <div className="container-migration">
                <div className="migration-img">
                  <AnimImgL src={great_migration} alt='Великое переселение народов'/>
                </div>

                <div className="migration-text">
                  <AnimTextR>
                    <strong>Эпоха Великого переселения народов</strong> – один из ключевых моментов истории Евразии вообще и Сибири в частности.
                    <br /><br />
                    В период <b>со II по VI вв. н.э.</b> на большей части континента происходили масштабные миграции населения, что привело к формированию новых народов и государств.
                    <br /><br />
                    Толчком этого процесса стал разгром <b>Хуннской державы</b>, проигравшей в борьбе за гегемонию в Центральной Азии китайской империи Хань и её союзникам.
                    <br /><br />
                    Племена хунну двинулись на запад, сметая по пути другие народы и привнося серьезные изменения в их культуру.
                    <br /><br />
                    Спустя почти полтора века, в 354 г. н.э., они стали известны в Европе под именем <b>«гунны»</b>, как суровые и безжалостные завоеватели.
                  </AnimTextR>
                </div>
            </div>
          </section>
        </ParallaxLayer>


        <ParallaxLayer offset={window.innerWidth < 768 ? 1 : 1.08} speed={0.7} factor={0.7} style={{ textAlign: 'center' }}>
          <AnimImgD src={big_map} alt='Центральная Азия' className='big-map-img'/>
        </ParallaxLayer>

        
        <ParallaxLayer offset={window.innerWidth < 768 ? 1.9999 : 1.9} speed={0.6} factor={0.5} style={{ textAlign: 'center' }}>
          <AnimImgD src={angara_map} alt='Ангара и Енисей' className='angara-map-img'/>
        </ParallaxLayer>

        <ParallaxLayer offset={window.innerWidth < 768 ? 1.4 : 1.95} speed={1.4} factor={0.4} style={{ background: '#2b2b2b' }}>
          <section className="section">
            <div className="container-big-map">
                <div className="big-map-text">
                  <AnimTextD>
                    Миграция хунну, начавшаяся в глубокой <b>Центральной Азии</b>, затронула большую часть <b>Евразии</b>.
                    <br /><br />
                    И хотя основные исторические события происходили в <b>степях</b>, но происходившие глобальные изменения коснулись и далёких <b>таёжных районов</b>.
                    <br /><br />
                    Сейчас, на основании последних <b>полевых работ</b> мы можем говорить об этом уверенно.
                  </AnimTextD>
                </div>
            </div>
          </section>
        </ParallaxLayer>

        <ParallaxLayer offset={window.innerWidth < 768 ? 1.78 : 2} speed={1.4} factor={0.5} style={{ background: '#2b2b2b' }}>
          <section className="section">
            <div className="container-angara-map">
                <div className="angara-map-text">
                  <AnimTextD>
                    Именно в это время на берегах <b>Ангары и Енисея</b> возникают и активно развиваются технологии получения и обработки <b>железа</b>,
                    усиливается <b>обмен</b> с южными и западными территориями, получает распространение новая <b>керамическая посуда</b>, совершенствуется <b>оружие</b>.
                    <br /><br />
                    Все эти сведения получены археологами при изучении могильника <b>III – IV вв. н.э.</b> <strong>Пинчуга-6</strong>.
                    <br /><br />
                    Он изучался археологами <b>Сибирского федерального университета</b> с 2018 по 2022 год и стал первым полностью раскопанным некрополем эпохи Великого переселения народов на Ангаре.
                  </AnimTextD>
                </div>
            </div>
          </section>
        </ParallaxLayer>

      </Parallax>
    </div>
  )
}
