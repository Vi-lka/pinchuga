import { Text, Html, OrbitControls, Stats, useAspect, PerspectiveCamera } from '@react-three/drei'
import { Image as DreiImage  } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { createRef, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import img_draw_bird_1 from '../../assets/images/img_draw_bird_1.svg'
import img_draw_bird_2 from '../../assets/images/img_draw_bird_2.svg'
import img_draw_disk from '../../assets/images/img_draw_disk.svg'
import img_draw_horse from '../../assets/images/img_draw_horse.svg'
import img_draw_cup_1 from '../../assets/images/img_draw_cup_1.svg'
import img_draw_cup_2 from '../../assets/images/img_draw_cup_2.svg'
import img_draw_item_1 from '../../assets/images/img_draw_item_1.svg'
import img_draw_item_2 from '../../assets/images/img_draw_item_2.svg'
import angara_map from '../../assets/images/angara_map.svg'
import great_migration from '../../assets/images/great_migration_fill.svg'
import sfu_logo from '../../assets/images/sfu_logo.png'
import funeral_pure from '../../assets/images/funeral_pure.svg'
import Arrow_scroll from '../../assets/images/Arrow_scroll.png'
import './sceneHome.css'
import { Box, Flex } from '@react-three/flex'
import state from '../../utils/state'
import disableScroll from 'disable-scroll'
import { EffectComposer, SMAA, SSAO, Vignette } from '@react-three/postprocessing'
import OverlayHome from '../OverlayHome/OverlayHome'
import Model from '../Models/Model'

function SceneHome({onReflow, scrollTop} : {onReflow: any, scrollTop?: any}) {

  const stateThree = useThree()

  const width = stateThree.viewport.width

  //For recalculate size of Flex
  function HeightReporter({ onReflow }:any) {
    useLayoutEffect(() => onReflow, [onReflow])
    return null
  }

  const handleReflow = useCallback((w: any, h: any) => {
    onReflow((state.pages = h / stateThree.viewport.height + plusHeight))

    // scrollTop()
  }, [onReflow, stateThree.viewport.height])
  
  const groupFlex = createRef<THREE.Group>()
  const titleRef = createRef<THREE.Group>()
  const mainTextRef = createRef<THREE.Group>()
  const modelsArrayRef = createRef<THREE.Group>()
  const footerTitleRef = createRef<THREE.Group>()
  
  const bgRef = createRef<any>()
  const bgMaterialRef = createRef<any>()

  const depth = createRef<any>()

  const ghostMeshRef = createRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>()

  const [bW, bH] = useAspect(1920, 1920, 0.5)
  const vec = new THREE.Vector3()
  const pageLerp = useRef(state.top / stateThree.size.height)
  const plusHeight = 28
  const startMainText = 1.2
  const startModelsArray = 6.2

  // stateThree.size.width * 0.0006 = 0.92
  // stateThree.size.width * 0.0009 = 1.38

  useFrame(() => {
    // Scroll value 
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, 0.15))

    // Page value
    const y = page * stateThree.viewport.height

    const sticky = state.threshold * stateThree.viewport.height
    
    // Position of Flex
    // groupFlex.current!.position.lerp(vec.set(0, page < state.threshold ? (page >= startMainText ? 11 : y) : sticky, page < state.threshold ? 0 : page * 2), 0.15)
    groupFlex.current!.position.lerp(vec.set(0, (page >= startMainText ? 11 : y), 0), 0.15)

    // Position and opacity of BackGround
    bgRef.current!.position.lerp(vec.set(
      page > 2 ? 
        page >= startModelsArray ? 
          -50 
          : 
          -page*0.7*stateThree.viewport.aspect
      : 0,

      -11,

      (page > 3 ? (page >= startModelsArray ? -20 : -page) : 5)
    ), 0.1)
    bgMaterialRef.current!.opacity = ((page < 0.8) ? 0 : (0 + (page - 1)*2))

    // Inner Flex element positions
    titleRef.current!.position.lerp(vec.set(0, -(page), page * 5), 0.15)
    mainTextRef.current!.position.lerp(vec.set(0, -3.85, (page >= startModelsArray) ? 35 : 4 ), 0.15)
    modelsArrayRef.current!.position.lerp(vec.set(page >= startModelsArray ? -1 : 25, 6.25, 1), 0.1)
    footerTitleRef.current!.position.lerp(vec.set(page > 29.6 ? 0 : -8, page > 29.6 ? 60.5 : 80, -10), 0.1)

    titleRef.current!.visible = (page > 6.21) ? false : true
    mainTextRef.current!.visible = (page > 0.4) ? (page > 6.21 ? false : true) : false
    modelsArrayRef.current!.visible = (page > 5) ? true : false
    bgRef.current!.visible = (page > 6.21) ? false: true
    footerTitleRef.current!.visible = (page > 29.4) ? true : false
    
    // Position of Camera
    if (!zoom) {    
      if (page < startModelsArray) {stateThree.camera.position.lerp(vec.set(0, 0, 10), 0.15)}
      if (page < startModelsArray) {ghostMeshRef.current!.position.lerp(vec.set(0, 0, 0), 0.1)}

      //1
      if (page >= startModelsArray && page < 10) {stateThree.camera.position.lerp(vec.set(2*page - 20, 0, 5 - 2*stateThree.viewport.aspect), 0.04)}
      if (page >= startModelsArray && page < 10) {ghostMeshRef.current!.position.lerp(vec.set(-6, 0, -5), 0.1)}

      //2
      if (page > 10 && page < 13) {stateThree.camera.position.lerp(vec.set(2*page - 22, 5.5, -4), 0.04)}
      if (page > 10 && page < 13) {ghostMeshRef.current!.position.lerp(vec.set(-0.5, 5.8, -10), 0.2)}

      //3
      if (page > 13 && page < 16.2) {stateThree.camera.position.lerp(vec.set(-0.7*page + 19, 12, -1.5*page + 10), 0.04)}
      if (page > 13 && page < 16.2) {ghostMeshRef.current!.position.lerp(vec.set(0, 12.2, -12.5), 0.2)}

      //4
      if (page > 16.2 && page < 19.2) {stateThree.camera.position.lerp(vec.set(9, 20.2, -0.6*page - 8), 0.04)}
      if (page > 16.2 && page < 19.2) {ghostMeshRef.current!.position.lerp(vec.set(4, 20.2, -12), 0.2)}

      //5
      if (page > 19.2 && page < 22) {stateThree.camera.position.lerp(vec.set(13 - page*0.5, 26, -0.4*page - 14), 0.04)}
      if (page > 19.2 && page < 22) {ghostMeshRef.current!.position.lerp(vec.set(2.4, 26, -14), 0.2)}

      //6
      if (page > 22 && page < 24.8) {stateThree.camera.position.lerp(vec.set(-page*0.8 + 6, 33, 0.5*page - 33), 0.04)}
      if (page > 22 && page < 24.8) {ghostMeshRef.current!.position.lerp(vec.set(-6, 32, -10), 0.2)}

      //7
      if (page > 24.8 && page < 27.7) {stateThree.camera.position.lerp(vec.set(page*0.8 - 38, 40, page*1.5 - 50), 0.04)}
      if (page > 24.8 && page < 27.7) {ghostMeshRef.current!.position.lerp(vec.set(-6.5, 40.8, -13.5), 0.2)}

      //8
      if (page > 27.7 && page < 29.6) {stateThree.camera.position.lerp(vec.set(page*0.8 - 38, 49.5, page*0.5 - 16), 0.04)}
      if (page > 27.7 && page < 29.6) {ghostMeshRef.current!.position.lerp(vec.set(-5, 50, -12), 0.2)}

      //End
      if (page > 29.6) {stateThree.camera.position.lerp(vec.set(0, 55, 0), 0.08)}
      if (page > 29.6) {ghostMeshRef.current!.position.lerp(vec.set(0, 55, -10), 0.08)}

    } else {

      //1
      if (page >= startModelsArray && page < 10) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model1Pos[0], state.model1Pos[1], state.model1Pos[2]), 0.08)
      }
      
      //2
      if (page > 10 && page < 13) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model2Pos[0], state.model2Pos[1], state.model2Pos[2]), 0.08)
      }

      //3
      if (page > 13 && page < 16.2) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model3Pos[0], state.model3Pos[1], state.model3Pos[2]), 0.08)
      }

      //4
      if (page > 16.2 && page < 19.2) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model4Pos[0], state.model4Pos[1], state.model4Pos[2]), 0.08)
      }

      //5
      if (page > 19.2 && page < 22) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model5Pos[0], state.model5Pos[1], state.model5Pos[2]), 0.08)
      }

      //6
      if (page > 22 && page < 24.8) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model6Pos[0], state.model6Pos[1], state.model6Pos[2]), 0.08)
      }

      //7
      if (page > 24.8 && page < 27.7) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model7Pos[0], state.model7Pos[1], state.model7Pos[2]), 0.08)
      }

      //8
      if (page > 27.7 && page < 29.6) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model8Pos[0], state.model8Pos[1], state.model8Pos[2]), 0.08)
      }

    }

    stateThree.camera.lookAt(ghostMeshRef.current!.position)
  })

  const [zoom, setZoom] = useState(false);

  zoom ? disableScroll.on() : disableScroll.off()

  // useEffect(() => {
  //   document.getElementById('scrollArea')!.style.zIndex = zoom ? '-1' : '1000000'
  // }, [zoom])


  function Title( {onReflow}: any ) {

    return (
      <>
        <Box dir="column" align={"center"} justify="center" width="100%" height="auto" minHeight="100%">

          <HeightReporter onReflow={onReflow} />

          <DreiImage position={[Math.max(-1.4, (stateThree.size.width * 0.0006)*(-1.4)), 1.2, 4.2]} transparent scale={[Math.min(0.77, (stateThree.size.width * 0.0006)*0.73), Math.min(1, (stateThree.size.width * 0.0006)*0.95)]} url={img_draw_bird_1} />
          <DreiImage position={[0, 1.2, 4.2]} transparent scale={[Math.min(0.985, (stateThree.size.width * 0.0006)*0.945), Math.min(1, (stateThree.size.width * 0.0006)*0.95)]} url={img_draw_disk} />
          <DreiImage position={[Math.min(1.4, (stateThree.size.width * 0.0006)*1.4), 1.2, 4.2]} transparent scale={[Math.min(0.65, (stateThree.size.width * 0.0006)*0.61), Math.min(1, (stateThree.size.width * 0.0006)*0.95)]} url={img_draw_bird_2} />
          
          <Text 
            position={[0, -0.23, 3]} 
            font={"../fonts/FoglihtenNo06/FoglihtenNo06.otf"} 
            color="black" 
            fontSize={Math.min(0.9, stateThree.viewport.width / 14)}
            textAlign="center"
            letterSpacing={0.28}
            lineHeight={1.05}
          >
            {`Пункт\nПрошлого`}
          </Text>

          <Text 
            position={[0, -1.8, 1]} 
            font={"../fonts/Lato/Lato-Light.ttf"} 
            color="black" 
            anchorX="center" 
            anchorY="middle"
            fontSize={Math.min(0.16, stateThree.viewport.width / 40)}
            maxWidth={(stateThree.viewport.width / 5) * 4}
            textAlign="center"
            letterSpacing={0.15}
          >
            {`3D ОБЗОР НАХОДОК ИЗ АРХЕОЛОГИЧЕСКОГО КОМПЛЕКСА ПИНЧУГА-6`}
          </Text>

          <Text 
            position={[0, -3, -1]} 
            font={"../fonts/Lato/Lato-Light.ttf"} 
            color="black" 
            anchorX="center" 
            anchorY="middle"
            fontSize={Math.min(0.16, stateThree.viewport.width / 40)}
            maxWidth={(stateThree.viewport.width / 5) * 4}
            textAlign="center"
            letterSpacing={0.15}
          >
            {`ПРОКРУТИТЕ, ЧТОБЫ ПРОДОЛЖИТЬ`}
          </Text>

          <DreiImage position={[0, -3.4, -1]} transparent scale={[0.09, 0.36]} url={Arrow_scroll}/>

        </Box>
      </>
    )
  }

  function MainText( {onReflow}: any ) {

    const dreiImage1Ref = createRef<any>()
    const dreiImage2Ref = createRef<any>()
    const dreiImage3Ref = createRef<any>()
    const dreiImage4Ref = createRef<any>()
    const dreiImage5Ref = createRef<any>()
    const dreiImage6Ref = createRef<any>()
    const dreiImage7Ref = createRef<any>()
    const dreiImage8Ref = createRef<any>()
    const dreiImage9Ref = createRef<any>()
    const dreiImage10Ref = createRef<any>()
    const dreiImage11Ref = createRef<any>()
    const dreiImage12Ref = createRef<any>()

    const mainText1Ref = createRef<any>()
    const mainText1PRef = createRef<any>()

    const mainText2Ref = createRef<any>()
    const mainText2PRef = createRef<any>()

    const mainText3Ref = createRef<any>()
    const mainText3PRef = createRef<any>()

    const mainText4Ref = createRef<any>()
    const mainText4PRef = createRef<any>()

    
    const mainText5Ref = createRef<any>()
    const mainText5PRef = createRef<any>()

    useFrame(() => {
      const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, 0.15))

      // console.log(stateThree.viewport.aspect)

      dreiImage1Ref.current?.position.lerp(vec.set((page > 2) ? -20 : -0.22*stateThree.viewport.aspect, 1.2*page - 0.7, 4.4), 0.15)
      mainText1Ref.current?.position.lerp(vec.set((page > 2) ? -20 : 1.3*stateThree.viewport.aspect, 1, 0 ), 0.2)
      mainText1PRef.current && 
        (mainText1PRef.current.style.display = (page > 0.4) ? (page > 6.21 ? 'none' : 'block') : 'none')

      dreiImage2Ref.current?.position.lerp(vec.set((page > 2) ? (page > 3 ? 15 : 0.5*stateThree.viewport.aspect) : 15, 1.1, 3.5 ), 0.15)
      mainText2Ref.current?.position.lerp(vec.set((page > 2) ? (page > 3 ? -20 : -1.3*stateThree.viewport.aspect) : -20 , 1, 0 ), 0.15)
      mainText2PRef.current && 
        (mainText2PRef.current.style.display = (page > 0.4) ? (page > 6.21 ? 'none' : 'block') : 'none')

      dreiImage3Ref.current?.position.lerp(vec.set((-page*0.7*stateThree.viewport.aspect), page > 3 ? (page > 4 ? 10 : 1.1) : 22,  page > 3 ? (-page - 3.8) : -page + 5), 0.1)
      mainText3Ref.current?.position.lerp(vec.set((page > 3) ? (page > 4 ? 20 : 1*stateThree.viewport.aspect) : 20 , page > 4 ? -10 : 1.1, 0 ), 0.15)
      mainText3PRef.current && 
        (mainText3PRef.current.style.display = (page > 0.4) ? (page > 6.21 ? 'none' : 'block') : 'none')

      dreiImage4Ref.current?.position.lerp(vec.set(page > 2 ? (page > 4 ? 0.6*stateThree.viewport.aspect : 7) : 27, page > 4 ? (page > 5 ? -2 : 1) : 10, 3), 0.15)
      mainText4Ref.current?.position.lerp(vec.set((page > 4) ? (page > 5 ? 20 : (-page*0.7*stateThree.viewport.aspect + 0.1)) : 20 , page > 5 ? -10 : 1.1, -page - 3.9), 0.1)
      mainText4PRef.current && 
        (mainText4PRef.current.style.display = (page > 0.4) ? (page > 6.21 ? 'none' : 'block') : 'none')

      dreiImage6Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 2.7*stateThree.viewport.aspect*0.75-0.5) : -7, page > 2 ? -1.9 : -20, page > 5 ? (2*page - 15.5) : -20), 0.18)
      dreiImage5Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 4.4*stateThree.viewport.aspect*0.75-0.5) : -7, page > 2 ? -1.6 : -20, page > 5 ? (2*page - 17.2) : -20), 0.18)
      dreiImage11Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 6.3*stateThree.viewport.aspect*0.75-0.5) : -7, page > 2 ? -0.7 : -20, page > 5 ? (2*page - 19.5) : -20), 0.18)
      dreiImage9Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 5.4*stateThree.viewport.aspect*0.75-0.5) : -7, page > 2 ? 0.4 : -20, page > 5 ? (2*page - 21.5) : -20), 0.18)
      dreiImage10Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 3.3*stateThree.viewport.aspect*0.75-0.5) : -7, page > 2 ? 1.2 : -20, page > 5 ? (2*page - 22.5) : -20), 0.18)
      dreiImage12Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 1.3*stateThree.viewport.aspect*0.75-0.5) : -7, page > 2 ? 2.4 : -20, page > 5 ? (2*page - 21.5) : -20), 0.18)
      dreiImage8Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 2*stateThree.viewport.aspect*0.75-0.5) : -7, page > 2 ? 3.5 : -20, page > 5 ? (2*page - 18) : -20), 0.18)
      dreiImage7Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 3*stateThree.viewport.aspect*0.75-0.5) : -7, page > 2 ? 4 : -20, page > 5 ? (2*page - 15.5) : -20), 0.18)

      mainText5Ref.current?.position.lerp(vec.set((page > 5) ? (page > 6.2 ? -20 : (-page*0.7*stateThree.viewport.aspect + 0.1)) : -20 , 1.1, -page - 3.9 ), 0.1)
      mainText5PRef.current && 
        (mainText5PRef.current.style.display = (page > 0.4) ? (page > 6.21 ? 'none' : 'block') : 'none')

    })

    return (
      <>
        <Box dir="column" align={"center"} justify="center" width="100%" height="auto" minHeight="100%">

          <HeightReporter onReflow={onReflow} />
          
          <DreiImage ref={dreiImage1Ref} url={angara_map} scale={[1.2, 2]} toneMapped={true} transparent opacity={1} position={[(pageLerp.current > 2) ? -20 : 0, pageLerp.current > 0.6 ? 1.2*pageLerp.current : -5, -4*pageLerp.current + 7.5]}/>
          <group ref={mainText1Ref} position={[(pageLerp.current > 2) ? -20 : (window.innerWidth < 1000 ? (stateThree.size.width * 0.0006)*3 : 3), 1, -4*pageLerp.current]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="textArea" // The className of the wrapping element (default: undefined)
              center
            >
              <p ref={mainText1PRef} className="mainText1">
                <b>Ангара</b> – одна из крупнейших рек Енисейской Сибири, на берегах которой археологи работают уже более ста лет. 
                <br/><br/>
                За это время открыты памятники древности, получены яркие находки, написаны научные статьи и книги.
              </p>
            </Html>
          </group>

          <DreiImage ref={dreiImage2Ref} scale={[1.5, 1]} url={great_migration} toneMapped={false} transparent opacity={1} position={[(pageLerp.current > 2) ? (pageLerp.current > 3 ? 15 : 1.2) : 15, 1.1, -1.4*(pageLerp.current)]}/>
          <group ref={mainText2Ref} position={[(pageLerp.current > 2) ? (pageLerp.current > 3 ? -20 : (window.innerWidth < 1000 ? (stateThree.size.width * 0.0006)*(-3) : -3)) : -20 , 1, -4*pageLerp.current]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="textArea" // The className of the wrapping element (default: undefined)
              center
            >
              <p ref={mainText2PRef} className="mainText1">
                Одной из темных страниц истории Приангарья долгое время оставалась эпоха <b>Великого переселения народов</b>.  
                <br/><br/>
                В период <b>со II по VI вв. н.э.</b> в Сибири происходили масштабные миграции населения, развивалось кузнечество, появлялись новые типы вещей. 
              </p>
            </Html>
          </group>

          <DreiImage ref={dreiImage3Ref} scale={[2.4, 2.62]} url={sfu_logo} toneMapped={false} transparent opacity={1} position={[(-pageLerp.current), pageLerp.current > 3 ? (pageLerp.current > 4 ? 10 : 1) : 22, (pageLerp.current > 3 ? (-4*pageLerp.current - 2) : (2))]}/>
          <group ref={mainText3Ref} position={[(pageLerp.current > 3) ? (pageLerp.current > 4 ? 20 : (window.innerWidth < 1000 ? (stateThree.size.width * 0.0006)*3 : 3.8)) : 20 , pageLerp.current > 4 ? -10 : 1.2, -4*pageLerp.current]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="textArea" // The className of the wrapping element (default: undefined)
              center
            >
              <p ref={mainText3PRef} className="mainText2">
                Могильник III – IV вв. н.э. <br/><b>Пинчуга-6</b> – стал первым полностью раскопанным некрополем эпохи Великого переселения народов на Ангаре. 
                <br/><br/>
                Он изучался археологами <b>Сибирского федерального университета</b> с 2018 по 2022 год. 
              </p>
            </Html>
          </group>

          <DreiImage ref={dreiImage4Ref} scale={[1.7*stateThree.viewport.aspect*0.6, 1.2*stateThree.viewport.aspect*0.6]} url={funeral_pure} toneMapped={false} transparent opacity={1} position={[pageLerp.current > 2 ? (pageLerp.current > 4 ?  1.1 : 7) : 27, pageLerp.current > 4 ? (pageLerp.current > 5 ? -2 : 1.1) : 10, (-pageLerp.current - 7.4)]}/>
          <group ref={mainText4Ref} position={[(pageLerp.current > 4) ? (pageLerp.current > 5 ? 20 : (window.innerWidth < 1000 ? (stateThree.size.width * 0.0006)*(-pageLerp.current) : (-pageLerp.current))) : 20 , pageLerp.current > 5 ? -10 : 1.2, -4*pageLerp.current - 3]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="textArea" // The className of the wrapping element (default: undefined)
              center
            >
              <p ref={mainText4PRef} className="mainText3">
                Здесь найдено <b>18</b> погребений, выполненных по одному <b>обряду</b>. 
                <br/><br/>
                Тело умершего сжигали на <b>погребальном огне</b>, после чего остывший прах хоронили в небольших ямах или просто рассыпали по поверхности. 
              </p>
            </Html>
          </group>

          <DreiImage ref={dreiImage5Ref} transparent scale={[1, 1.3]} url={img_draw_bird_1} position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? 20 : 4.6) : -7, pageLerp.current > 2 ? -1.8 : -20, pageLerp.current > 5 ? pageLerp.current - 32 : pageLerp.current-35]}/>
          <DreiImage ref={dreiImage6Ref} transparent scale={[0.84, 1.3]} url={img_draw_bird_2} position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? 20 : 2.76) : -7, pageLerp.current > 2 ? -2 : -20, pageLerp.current > 5 ? pageLerp.current - 30 : pageLerp.current-35]}/>
          <DreiImage ref={dreiImage7Ref} transparent scale={[1.2, 1.21]} url={img_draw_cup_1} position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? 20 : 3) : -7, pageLerp.current > 2 ? 4 : -20, pageLerp.current > 5 ? pageLerp.current - 30 : pageLerp.current-35]}/>
          <DreiImage ref={dreiImage8Ref} transparent scale={[1.48, 1.32]} url={img_draw_cup_2} position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? 20 : 2.2) : -7, pageLerp.current > 2 ? 3.6 : -20, pageLerp.current > 5 ? pageLerp.current - 33 : pageLerp.current-35]}/>
          <DreiImage ref={dreiImage9Ref} transparent scale={[1.8, 1.16]} url={img_draw_item_1} position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? 20 : 5.52) : -7, pageLerp.current > 2 ? 0.4 : -20, pageLerp.current > 5 ? pageLerp.current - 36 : pageLerp.current-35]}/>
          <DreiImage ref={dreiImage10Ref} transparent scale={[1.8, 1.05]} url={img_draw_item_2} position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? 20 : 3.68) : -7, pageLerp.current > 2 ? 1.2 : -20, pageLerp.current > 5 ? pageLerp.current - 38 : pageLerp.current-35]}/>
          <DreiImage ref={dreiImage11Ref} transparent scale={[1.48, 1.2]} url={img_draw_horse} position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? 20 : 6.44) : -7, pageLerp.current > 2 ? -0.8 : -20, pageLerp.current > 5 ? pageLerp.current - 34 : pageLerp.current-35]}/>
          <DreiImage ref={dreiImage12Ref} transparent scale={[1.5, 1.51]} url={img_draw_disk} position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? 20 : 1.56) : -7, pageLerp.current > 2 ? 2.4 : -20, pageLerp.current > 5 ? pageLerp.current - 36 : pageLerp.current-35]}/>
          <group ref={mainText5Ref} position={[(pageLerp.current > 5) ? (pageLerp.current > 6.2 ? -20 : (window.innerWidth < 1000 ? (stateThree.size.width * 0.0006)*(-pageLerp.current*0.92) : (-pageLerp.current*0.92))) : -20 , 1.2, -4*pageLerp.current - 3]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="textArea" // The className of the wrapping element (default: undefined)
              center
            >
              <p ref={mainText5PRef} className="mainText4">
                На могильнике найдены <b>украшения</b>, <b>предметы культового литья</b>, <b>наконечники стрел</b>, <b>кинжал</b>, <b>ножи</b>, <b>тесла</b>, <b>пряжки</b>, стеклянные и каменные <b>бусы</b>. 
                <br/><br/>
                Часть предметов попала на Ангару из других территорий Евразии.
              </p>
            </Html>
          </group>


        </Box>
      </>
    )
  }

  function FooterTitle( {onReflow}: any ) {

    return (
      <>
        <Box dir="column" align={"center"} justify="center" width="100%" height="auto" minHeight="100%">

          <HeightReporter onReflow={onReflow} />

          <DreiImage position={[Math.max(-1.4, (stateThree.size.width * 0.0006)*(-1.4)), 1.2, 4.2]} transparent scale={[Math.min(0.77, (stateThree.size.width * 0.0006)*0.73), Math.min(1, (stateThree.size.width * 0.0006)*0.95)]} url={img_draw_bird_1} />
          <DreiImage position={[0, 1.2, 4.2]} transparent scale={[Math.min(0.98, (stateThree.size.width * 0.0006)*0.94), Math.min(1, (stateThree.size.width * 0.0006)*0.95)]} url={img_draw_disk} />
          <DreiImage position={[Math.min(1.4, (stateThree.size.width * 0.0006)*1.4), 1.2, 4.2]} transparent scale={[Math.min(0.65, (stateThree.size.width * 0.0006)*0.61), Math.min(1, (stateThree.size.width * 0.0006)*0.95)]} url={img_draw_bird_2} />
          
          <Text 
            position={[0, -0.23, 3]} 
            font={"../fonts/FoglihtenNo06/FoglihtenNo06.otf"} 
            color="black" 
            fontSize={Math.min(0.9, stateThree.viewport.width / 14)}
            textAlign="center"
            letterSpacing={0.28}
            lineHeight={1.05}
          >
            {`Пункт\nПрошлого`}
          </Text>

          <Text 
            position={[0, -1.8, 1]} 
            font={"../fonts/Lato/Lato-Light.ttf"} 
            color="black" 
            anchorX="center" 
            anchorY="middle"
            fontSize={Math.min(0.16, stateThree.viewport.width / 40)}
            maxWidth={(stateThree.viewport.width / 5) * 4}
            textAlign="center"
            letterSpacing={0.15}
          >
            {`3D ОБЗОР НАХОДОК ИЗ АРХЕОЛОГИЧЕСКОГО КОМПЛЕКСА ПИНЧУГА-6`}
          </Text>

        </Box>
      </>
    )
  }

// SceneHome RETURN
  return (
    <>
    <OverlayHome zoom={zoom} setZoom={setZoom} />
    <PerspectiveCamera makeDefault fov={45} near={0.1} far={zoom ? 1000 : 25}  position={
      (pageLerp.current < startModelsArray) ? 
      [0, 0, 10]
      :
      (pageLerp.current >= startModelsArray && pageLerp.current < 10) ? 
      [2*pageLerp.current - 20, 0, 1]
      :
      (pageLerp.current > 10 && pageLerp.current < 13) ? 
      [2*pageLerp.current - 22, 5.5, -4]
      :
      (pageLerp.current > 13 && pageLerp.current < 16.2) ?
      [-0.7*pageLerp.current + 19, 12, -1.5*pageLerp.current + 10]
      :
      (pageLerp.current > 16.2 && pageLerp.current < 19.2) ?
      [9, 20.2, -0.6*pageLerp.current - 8]
      :
      (pageLerp.current > 19.2 && pageLerp.current < 22) ?
      [13 - pageLerp.current*0.5, 26, -0.4*pageLerp.current - 14]
      :
      (pageLerp.current > 22 && pageLerp.current < 24.8) ?
      [-pageLerp.current*0.8 + 6, 33, 0.5*pageLerp.current - 33]
      :
      (pageLerp.current > 24.8 && pageLerp.current < 27.7) ?
      [pageLerp.current*0.8 - 38, 40, pageLerp.current*1.5 - 50]
      :
      (pageLerp.current > 27.7 && pageLerp.current < 29.6) ?
      [pageLerp.current*0.8 - 38, 49.5, pageLerp.current*0.5 - 16]
      :
      [0, 55, 0]
    }/>

    <OrbitControls enabled={zoom} enablePan={false} target={
      (pageLerp.current < startModelsArray) ? 
      [0, 0, 0]
      :
      (pageLerp.current >= startModelsArray && pageLerp.current < 10) ? 
      [state.model1Pos[0], state.model1Pos[1], state.model1Pos[2]]
      :
      (pageLerp.current > 10 && pageLerp.current < 13) ? 
      [state.model2Pos[0], state.model2Pos[1], state.model2Pos[2]]
      :
      (pageLerp.current > 13 && pageLerp.current < 16.2) ?
      [state.model3Pos[0], state.model3Pos[1], state.model3Pos[2]]
      :
      (pageLerp.current > 16.2 && pageLerp.current < 19.2) ?
      [state.model4Pos[0], state.model4Pos[1], state.model4Pos[2]]
      :
      (pageLerp.current > 19.2 && pageLerp.current < 22) ?
      [state.model5Pos[0], state.model5Pos[1], state.model5Pos[2]]
      :
      (pageLerp.current > 22 && pageLerp.current < 24.8) ?
      [state.model6Pos[0], state.model6Pos[1], state.model6Pos[2]]
      :
      (pageLerp.current > 24.8 && pageLerp.current < 27.7) ?
      [state.model7Pos[0], state.model7Pos[1], state.model7Pos[2]]
      :
      (pageLerp.current > 27.7 && pageLerp.current < 29.6) ?
      [state.model8Pos[0], state.model8Pos[1], state.model8Pos[2]]
      :
      [0, 55, 0]
    }/>

    <mesh ref={ghostMeshRef} position={
      (pageLerp.current < startModelsArray) ? 
      [0, 0, 0]
      :
      (pageLerp.current >= startModelsArray && pageLerp.current < 10) ? 
      [-6, 0, -5]
      :
      (pageLerp.current > 10 && pageLerp.current < 13) ? 
      [-0.5, 5.8, -10]
      :
      (pageLerp.current > 13 && pageLerp.current < 16.2) ?
      [0, 12.2, -12.5]
      :
      (pageLerp.current > 16.2 && pageLerp.current < 19.2) ?
      [4, 20.2, -12]
      :
      (pageLerp.current > 19.2 && pageLerp.current < 22) ?
      [2, 26, -14]
      :
      (pageLerp.current > 22 && pageLerp.current < 24.8) ?
      [-6, 32, -10]
      :
      (pageLerp.current > 24.8 && pageLerp.current < 27.7) ?
      [-6.5, 40.8, -13.5]
      :
      (pageLerp.current > 27.7 && pageLerp.current < 29.6) ?
      [-6, 50, -12]
      :
      [0, 55, -10]
    }>
      <planeBufferGeometry args={[1, 1]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0} />
      {/* <boxBufferGeometry args={[1, 1, 1]} />
      <meshBasicMaterial color={"#000000"} toneMapped={false} /> */}
    </mesh>
    <group ref={groupFlex} position={[0, ((pageLerp.current >= startMainText) ? 11 : (pageLerp.current * stateThree.viewport.height)), pageLerp.current < (state.threshold + plusHeight) ? 0 : 0]}>
      <Flex 
        dir="column" 
        // position={[-stateThree.viewport.width / 2, stateThree.viewport.height / 2, 0]} 
        size={[stateThree.viewport.width, stateThree.viewport.height, 10]} 
        onReflow={handleReflow}
      >

        <mesh ref={bgRef} position={[
          ((pageLerp.current > 2) ? 
            (pageLerp.current >= startModelsArray) ? 
              -50 
              : 
              (window.innerWidth < 1000) ? //Need to set for modile
                (-pageLerp.current*1.1)*(stateThree.size.width*0.0006)
                : 
                (-pageLerp.current*1.1)
          : 0),

          ((pageLerp.current > 0.6) ? -11 : -5),

          ((pageLerp.current > 3) ? ((pageLerp.current >= startModelsArray) ? -20 : -pageLerp.current) : 5)
        ]}>
          <planeBufferGeometry args={[bW, bH]} />
          <meshBasicMaterial ref={bgMaterialRef} color={"#2b2b2b"} toneMapped={false} transparent opacity={1} />
          {/* color #343434 */}
        </mesh>

        <Box dir="row" width="100%" height="100%" align="center" justify="center">
          <group ref={titleRef} position={[0, -(pageLerp.current), pageLerp.current * 5]}>
            <Title onReflow={(w: any, h: any) => {
                state.threshold = Math.max(8, (8 / (15.8 * 3)) * 1)
              }} 
            />
          </group>
        </Box>

        <Box dir="row" width="100%" height="100%" align="center" justify="center">
          <group ref={mainTextRef} position={[0, (pageLerp.current >= startMainText) ? -(3.85) : -(pageLerp.current * 2.5), (pageLerp.current >= startModelsArray) ? 35 : (pageLerp.current * 4) ]}>
            <MainText onReflow={(w: any, h: any) => {
                state.threshold = Math.max(20, (20 / (15.8 * 3)) * 1)
              }} 
            />
          </group>
        </Box>


        <Box dir="row" width="100%" height="100%" align="center" justify="center">
          <group ref={footerTitleRef} position={[pageLerp.current > 29.6 ? 0 : -8, pageLerp.current > 29.6 ? 68.8 : 80, -10]}>
            <FooterTitle onReflow={(w: any, h: any) => {
                state.threshold = Math.max(8, (8 / (15.8 * 3)) * 1)
              }} 
            />
          </group>
        </Box>
      </Flex>
    </group>
    <group ref={modelsArrayRef} position={[pageLerp.current >= startModelsArray ? -1 : 25, 6.2, 1]}>
      <Model 
        zoom={zoom}
        setZoom={setZoom}
      />
      <directionalLight position={[-3, -15, -15]} />
      <directionalLight position={[-3, 15, 15]} />
    </group>
    { zoom && 
      <EffectComposer>
        <Vignette offset={0.25} darkness={0.55} />      
      </EffectComposer>
    }
    </>
  )
}

export default SceneHome;
