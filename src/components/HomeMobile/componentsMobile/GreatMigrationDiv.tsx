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
                background: '#f6f6f6'
            },
            to: {
                opacity: 1,
                background: '#2b2b2b'
            },
            config: {
                mass: 1,
                friction: 30,
                tension: 220,
              },
        }),
        {
          rootMargin: '-30% -30%',
          amount: buildInteractionObserverThreshold()
        }
      )
    
      return (
        <>
            <ParallaxLayer offset={offset} speed={speed} factor={factor}>
                <animated.div style={springs} className={'bgColor'}>
                </animated.div>
                <animated.div ref={ref} style={springs} className={'bgColor'}>
                </animated.div>
                <animated.div style={springs} className={'bgColor'}>
                </animated.div>
            </ParallaxLayer>

            <ParallaxLayer offset={1.05} speed={1} factor={1.1} >
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
                    </div>
                  </div>
                </section>
            </ParallaxLayer>
        </>
      )
}
