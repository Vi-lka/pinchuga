import { Text, Html, OrbitControls, useAspect, PerspectiveCamera, Stats, usePerformanceMonitor } from '@react-three/drei'
import { Image as DreiImage } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { createRef, startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import * as THREE from 'three'
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
import Arrow_scroll from '../../assets/images/Arrow_scroll.png'
import './sceneHome.css'
import { Box, Flex } from '@react-three/flex'
import state from '../../utils/state'
import disableScroll from 'disable-scroll'
import OverlayHome from '../OverlayHome/OverlayHome'
import Models from '../Models/Models'
import MiniMap from '../minimap/MiniMap'

function SceneHome({ onReflow, handleScrollTo }: { onReflow: any, handleScrollTo(index: number): void }) {

  const stateThree = useThree()

  //For recalculate size of Flex
  function HeightReporter({ onReflow }: any) {
    useLayoutEffect(() => onReflow, [onReflow])
    return null
  }

  const [zoom, setZoom] = useState(false)

  useEffect(() => {
    state.zoomGlobal = zoom
  }, [zoom])

  zoom ? disableScroll.on() : disableScroll.off()

  const regress = useThree(state => state.performance.regress)
  useEffect(() => {
    // stateThree.controls?.addEventListener('change', regress)
    stateThree.controls?.addEventListener('change', regress)
  })

  function AdaptivePixelRatio() {
    const currentPerformance = useThree(state => state.performance.current)
    useEffect(() => {
      stateThree.gl.setPixelRatio((window.devicePixelRatio * currentPerformance))
    }, [currentPerformance])
    return null
  }

  const [wState, setwState] = useState(0)
  const [hState, sethState] = useState(0)

  const handleReflow = useCallback((w: any, h: any) => {

    if (!zoom && ((wState !== w) || (hState !== h))) {

      if (state.top > ((state.pages * window.innerHeight) / 5)) {
        state.top = ((state.pages * window.innerHeight) / 6)
      }

    } else if (zoom && ((wState !== w) || (hState !== h))) {
      setZoom(false)
    }

    onReflow((state.pages = h / stateThree.viewport.height + plusHeight))
    setwState(w)
    sethState(h)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom, onReflow, stateThree.viewport.height, stateThree.viewport.width, stateThree.size])

  const groupFlex = createRef<THREE.Group>()
  const titleRef = createRef<THREE.Group>()
  const mainTextRef = createRef<THREE.Group>()
  const modelsArrayRef = createRef<THREE.Group>()
  const footerTitleRef = createRef<THREE.Group>()

  const bgRef = createRef<any>()
  const bgMaterialRef = createRef<any>()

  const ghostMeshRef = createRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material | THREE.Material[]>>()

  const [bW, bH] = useAspect(1920, 1920, 0.5)
  const vec = new THREE.Vector3()
  const pageLerp = useRef(state.top / stateThree.size.height)
  const plusHeight = 28
  const startMainText = 0.9
  const startModelsArray = 6.2

  useFrame((s, delta) => {
    // Scroll value 
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, delta * 6))

    // Page value
    const y = page * stateThree.viewport.height

    // Position of Flex
    groupFlex.current!.position.lerp(vec.set(0, (page >= startMainText ? 11 : y), 0), delta * 15)

    // Position and opacity of BackGround
    bgRef.current!.position.lerp(vec.set(
      page > 2 ?
        page >= startModelsArray ?
          -50
          :
          -page * 0.7 * stateThree.viewport.aspect - 0.5
        : 0,

      -11,

      (page > 3 ? (page >= startModelsArray ? -20 : -page) : 5)
    ), delta * 8)
    // bgMaterialRef.current!.opacity = ((page < 0.8) ? 0 : (0 + (page - 1) * 2))
    bgMaterialRef.current!.opacity = ((page < 0.8) ? 0 : THREE.MathUtils.lerp(bgMaterialRef.current.opacity, 0 + (page - 1) * 2, delta * 8))

    // Inner Flex element positions
    titleRef.current!.position.lerp(vec.set(0, -(page), page * 5), delta * 11)
    mainTextRef.current!.position.lerp(vec.set(0, -3.85, (page >= startModelsArray) ? 35 : 4), delta * 8)
    modelsArrayRef.current!.position.lerp(vec.set(page >= startModelsArray ? -1 : 50, 6.25, 1), delta * 8)
    footerTitleRef.current!.position.lerp(vec.set(page > 30.8 ? 0 : -8, page > 30.8 ? 60.5 : 80, -10), delta * 8)

    titleRef.current!.visible = (page > 6.21) ? false : true
    mainTextRef.current!.visible = (page > 0.4) ? (page > 6.21 ? false : true) : false
    modelsArrayRef.current!.visible = (page > 6.19) ? true : false
    bgRef.current!.visible = (page > 6.21) ? false : true
    footerTitleRef.current!.visible = (page > 30.75) ? true : false

    // Position of Camera
    if (!zoom) {
      if (page < startModelsArray) { stateThree.camera.position.lerp(vec.set(0, 0, 10), delta * 15) }
      if (page < startModelsArray) { ghostMeshRef.current!.position.lerp(vec.set(0, 0, 0), delta * 15) }

      //1
      if (page >= startModelsArray && page < 10) { stateThree.camera.position.lerp(vec.set(2 * page - 20, 0, 5 - 2 * stateThree.viewport.aspect), delta * 4) }
      if (page >= startModelsArray && page < 10) { ghostMeshRef.current!.position.lerp(vec.set(-6, 0, -5), delta * 4) }

      //2
      if (page > 10 && page < 13) { stateThree.camera.position.lerp(vec.set(2 * page - 22, 5.5, -4), delta * 4) }
      if (page > 10 && page < 13) { ghostMeshRef.current!.position.lerp(vec.set(-0.5, 5.8, -10), delta * 4) }

      //3
      if (page > 13 && page < 16.2) { stateThree.camera.position.lerp(vec.set(-0.7 * page + 19, 12, -1.5 * page + 10), delta * 4) }
      if (page > 13 && page < 16.2) { ghostMeshRef.current!.position.lerp(vec.set(0, 12.2, -12.5), delta * 4) }

      //4
      if (page > 16.2 && page < 19.2) { stateThree.camera.position.lerp(vec.set(9, 20.2, -0.6 * page - 8), delta * 5) }
      if (page > 16.2 && page < 19.2) { ghostMeshRef.current!.position.lerp(vec.set(4, 20.2, -12), delta * 5) }

      //5
      if (page > 19.2 && page < 22) { stateThree.camera.position.lerp(vec.set(13 - page * 0.5, 26, -0.4 * page - 14), delta * 4) }
      if (page > 19.2 && page < 22) { ghostMeshRef.current!.position.lerp(vec.set(2.4, 26, -14), delta * 4) }

      //6
      if (page > 22 && page < 24.8) { stateThree.camera.position.lerp(vec.set(-page * 0.8 + 6, 33, 0.5 * page - 33), delta * 4) }
      if (page > 22 && page < 24.8) { ghostMeshRef.current!.position.lerp(vec.set(-6, 32, -10), delta * 4) }

      //7
      if (page > 24.8 && page < 27.7) { stateThree.camera.position.lerp(vec.set(page * 0.8 - 38, 40, page * 1.5 - 50), delta * 4) }
      if (page > 24.8 && page < 27.7) { ghostMeshRef.current!.position.lerp(vec.set(-6.5, 40.8, -13.5), delta * 4) }

      //8
      if (page > 27.7 && page < 30.8) { stateThree.camera.position.lerp(vec.set(page * 0.8 - 38, 49.5, page * 0.5 - 16), delta * 4) }
      if (page > 27.7 && page < 30.8) { ghostMeshRef.current!.position.lerp(vec.set(-5, 50, -12), delta * 4) }

      //End
      if (page >= 30.8) { stateThree.camera.position.lerp(vec.set(0, 55, 0), delta * 4) }
      if (page >= 30.8) { ghostMeshRef.current!.position.lerp(vec.set(0, 55, -10), delta * 4) }

    } else {

      //1
      if (page >= startModelsArray && page < 10) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model1Pos[0], state.model1Pos[1], state.model1Pos[2]), delta * 4)
      }

      //2
      if (page > 10 && page < 13) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model2Pos[0], state.model2Pos[1], state.model2Pos[2]), delta * 4)
      }

      //3
      if (page > 13 && page < 16.2) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model3Pos[0], state.model3Pos[1], state.model3Pos[2]), delta * 4)
      }

      //4
      if (page > 16.2 && page < 19.2) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model4Pos[0], state.model4Pos[1], state.model4Pos[2]), delta * 4)
      }

      //5
      if (page > 19.2 && page < 22) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model5Pos[0], state.model5Pos[1], state.model5Pos[2]), delta * 4)
      }

      //6
      if (page > 22 && page < 24.8) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model6Pos[0], state.model6Pos[1], state.model6Pos[2]), delta * 4)
      }

      //7
      if (page > 24.8 && page < 27.7) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model7Pos[0], state.model7Pos[1], state.model7Pos[2]), delta * 4)
      }

      //8
      if (page > 27.7 && page < 30.8) {
        ghostMeshRef.current!.position.lerp(vec.set(state.model8Pos[0], state.model8Pos[1], state.model8Pos[2]), delta * 4)
      }

    }

    stateThree.camera.lookAt(ghostMeshRef.current!.position)
  })

  function Title({ onReflow }: any) {

    return (
      <>
        <Box dir="column" align={"center"} justify="center" width="100%" height="auto" minHeight="100%">

          <HeightReporter onReflow={onReflow} />

          <DreiImage position={[Math.max(-1.4, (stateThree.size.width * 0.0006) * (-1.4)), 1.2, 4.2]} transparent scale={[Math.min(0.77, (stateThree.size.width * 0.0006) * 0.73), Math.min(1, (stateThree.size.width * 0.0006) * 0.95)]} url={img_draw_bird_1} />
          <DreiImage position={[0, 1.2, 4.2]} transparent scale={[Math.min(0.985, (stateThree.size.width * 0.0006) * 0.945), Math.min(1, (stateThree.size.width * 0.0006) * 0.95)]} url={img_draw_disk} />
          <DreiImage position={[Math.min(1.4, (stateThree.size.width * 0.0006) * 1.4), 1.2, 4.2]} transparent scale={[Math.min(0.65, (stateThree.size.width * 0.0006) * 0.61), Math.min(1, (stateThree.size.width * 0.0006) * 0.95)]} url={img_draw_bird_2} />

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

          <DreiImage position={[0, -3.4, -1]} transparent scale={[0.09, 0.36]} url={Arrow_scroll} />

        </Box>
      </>
    )
  }

  function MainText({ onReflow }: any) {

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

    useFrame((s, delta) => {
      const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, delta * 6))

      dreiImage1Ref.current?.position.lerp(vec.set((page > 2) ? -40 : -0.06 * stateThree.viewport.width, 1.12, 3.9), delta * 10)
      mainText1Ref.current?.position.lerp(vec.set((page > 2) ? -40 : 0.16 * stateThree.viewport.width, 1, 0), delta * 10)
      mainText1PRef.current &&
        (mainText1PRef.current.style.display = (page > 0.4) ? (page > 6.21 ? 'none' : 'block') : 'none')

      dreiImage2Ref.current?.position.lerp(vec.set(stateThree.viewport.aspect > 1.9 ? (page > 2 ? (page > 3 ? -7 : (7.2 - page / 0.55)) : 15) : (page > 2 ? (page > 3 ? 1 : (6.5 - page / 0.6)) : 15), 1.7 + (-page / 3.8), (page > 2 ? (page > 3 ? 20 : (page / 0.5) - 5.2) : -15)), delta * 10)
      mainText2Ref.current?.position.lerp(vec.set((page > 2) ? (page > 3 ? -40 : -0.16 * stateThree.viewport.width) : 40, 1.05, 0), delta * 12)
      mainText2PRef.current &&
        (mainText2PRef.current.style.display = (page > 1.9) ? (page > 6.21 ? 'none' : 'block') : 'none')

      dreiImage3Ref.current?.position.lerp(vec.set(stateThree.viewport.aspect > 1.9 ? (page > 3 ? (page > 4 ? 2 : -page * 1.5 + 7.2) : 15) : (page > 3 ? (page > 4 ? 2 : -page * 1.2 + 5.9) : 15), (page / 2.45), (page > 3 ? (page > 4 ? 20 : (page / 0.35) - 9) : -20)), delta * 10)
      mainText3Ref.current?.position.lerp(vec.set((page > 3) ? (page > 4 ? -40 : (-page * 0.7 * stateThree.viewport.aspect - 0.35)) : -40, page > 4.5 ? -10 : 1.1, -page - 3.9), delta * 12)
      mainText3PRef.current &&
        (mainText3PRef.current.style.display = (page > 2.9) ? (page > 6.21 ? 'none' : 'block') : 'none')

      dreiImage4Ref.current?.position.lerp(vec.set(page > 2 ? (page > 4 ? -page * 0.47 + 3 : 12) : 30, page > 4 ? 1 : -1, (page > 4 ? (page > 5 ? 20 : (page / 0.7) - 3.6) : -20)), delta * 10)
      mainText4Ref.current?.position.lerp(vec.set((page > 4) ? (page > 5 ? -40 : (-page * 0.7 * stateThree.viewport.aspect - 0.4)) : -40, page > 5.5 ? -10 : 1.1, -page - 3.9), delta * 12)
      mainText4PRef.current &&
        (mainText4PRef.current.style.display = (page > 3.9) ? (page > 6.21 ? 'none' : 'block') : 'none')

      dreiImage6Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 2.7 * stateThree.viewport.aspect * 0.75 - 1) : -7, page > 2 ? -1.8 : -20, page > 5 ? (2.5 * page - 15.5 * 1.15) : -15), delta * 10)
      dreiImage5Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 4.4 * stateThree.viewport.aspect * 0.75 - 1) : -7, page > 2 ? -1.5 : -20, page > 5 ? (2.5 * page - 17.2 * 1.15) : -15), delta * 10)
      dreiImage11Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 6.3 * stateThree.viewport.aspect * 0.75 - 1) : -7, page > 2 ? -0.6 : -20, page > 5 ? (2.5 * page - 19.5 * 1.15) : -15), delta * 10)
      dreiImage9Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 5.4 * stateThree.viewport.aspect * 0.75 - 1) : -7, page > 2 ? 0.5 : -20, page > 5 ? (2.5 * page - 21.5 * 1.15) : -15), delta * 10)
      dreiImage10Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 3.3 * stateThree.viewport.aspect * 0.75 - 1) : -7, page > 2 ? 1.3 : -20, page > 5 ? (2.5 * page - 22 * 1.15) : -15), delta * 10)
      dreiImage12Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 1.3 * stateThree.viewport.aspect * 0.75 - 1) : -7, page > 2 ? 2.5 : -20, page > 5 ? (2.5 * page - 21.5 * 1.15) : -15), delta * 10)
      dreiImage8Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 2 * stateThree.viewport.aspect * 0.75 - 1) : -7, page > 2 ? 3.7 : -20, page > 5 ? (2.5 * page - 18 * 1.15) : -15), delta * 10)
      dreiImage7Ref.current?.position.lerp(vec.set(page > 5 ? (page > 6.2 ? -20 : 2.7 * stateThree.viewport.aspect * 0.75 - 1) : -7, page > 2 ? 4.1 : -20, page > 5 ? (2.5 * page - 15.5 * 1.15) : -15), delta * 10)

      mainText5Ref.current?.position.lerp(vec.set((page > 5) ? (page > 6.2 ? -40 : (-page * 0.7 * stateThree.viewport.aspect - 0.4)) : -40, 1.1, -page - 3.9), delta * 12)
      mainText5PRef.current &&
        (mainText5PRef.current.style.display = (page > 4.9) ? (page > 6.21 ? 'none' : 'block') : 'none')
    })

    return (
      <>
        <Box dir="column" align={"center"} justify="center" width="100%" height="auto" minHeight="100%">

          <HeightReporter onReflow={onReflow} />

          <DreiImage
            ref={dreiImage1Ref}
            url={great_migration}
            scale={[2, 1.8]}
            color={'white'}
            toneMapped={true}
            transparent
            opacity={1}
            position={[(pageLerp.current > 2) ? -40 : -0.06 * stateThree.viewport.width, 1.12, 3.9]}
          />
          <group ref={mainText1Ref} position={[(pageLerp.current > 2) ? -40 : 0.16 * stateThree.viewport.width, 1, 0]}>
            <Html
              as='div'
              wrapperClass="textArea"
              center
            >
              <p ref={mainText1PRef} className="mainText1" style={{ display: 'none' }}>
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
            </Html>
          </group>

          <DreiImage
            ref={dreiImage2Ref}
            scale={stateThree.viewport.aspect > 1.9 ? [4, 3.78] : [3.6, 3.4]}
            url={big_map}
            toneMapped={false}
            transparent
            opacity={1}
            position={[stateThree.viewport.aspect > 1.9 ? (pageLerp.current > 2 ? (pageLerp.current > 3 ? -7 : (7.2 - pageLerp.current / 0.55)) : 15) : (pageLerp.current > 2 ? (pageLerp.current > 3 ? 1 : (6.5 - pageLerp.current / 0.6)) : 15), 1.7 + (-pageLerp.current / 3.8), (pageLerp.current > 2 ? (pageLerp.current > 3 ? 20 : (pageLerp.current / 0.5) - 5.2) : -15)]}
          />
          <group ref={mainText2Ref} position={[(pageLerp.current > 2) ? (pageLerp.current > 3 ? -40 : -0.16 * stateThree.viewport.width) : 40, 1.05, 0]}>
            <Html
              as='div'
              wrapperClass="textArea"
              center
            >
              <p ref={mainText2PRef} className="mainText2" style={{ display: 'none' }}>
                Миграция хунну, начавшаяся в глубокой <b>Центральной Азии</b>, затронула большую часть <b>Евразии</b>.
                <br /><br />
                И хотя основные исторические события происходили в <b>степях</b>, но происходившие глобальные изменения коснулись и далёких <b>таёжных районов</b>.
                <br /><br />
                Сейчас, на основании последних <b>полевых работ</b> мы можем говорить об этом уверенно.
              </p>
            </Html>
          </group>

          <DreiImage
            ref={dreiImage3Ref}
            scale={[3, 4.05]}
            url={angara_map}
            toneMapped={false}
            transparent
            opacity={1}
            position={[stateThree.viewport.aspect > 1.9 ? (pageLerp.current > 3 ? (pageLerp.current > 4 ? 2 : -pageLerp.current * 1.5 + 7.2) : 15) : (pageLerp.current > 3 ? (pageLerp.current > 4 ? 2 : -pageLerp.current * 1.2 + 5.9) : 15), (pageLerp.current / 2.45), (pageLerp.current > 3 ? (pageLerp.current > 4 ? 20 : (pageLerp.current / 0.35) - 9) : -20)]}
          />
          <group ref={mainText3Ref} position={[(pageLerp.current > 3) ? (pageLerp.current > 4 ? -40 : (-pageLerp.current * 0.7 * stateThree.viewport.aspect - 0.35)) : -40, pageLerp.current > 4.5 ? -10 : 1.1, -pageLerp.current - 3.9]}>
            <Html
              as='div'
              wrapperClass="textArea"
              center
            >
              <p ref={mainText3PRef} className="mainText2" style={{ display: 'none' }}>
                Именно в это время на берегах <b>Ангары и Енисея</b> возникают и активно развиваются технологии получения и обработки <b>железа</b>,
                усиливается <b>обмен</b> с южными и западными территориями, получает распространение новая <b>керамическая посуда</b>, совершенствуется <b>оружие</b>.
                <br /><br />
                Все эти сведения получены археологами при изучении могильника <b>III – IV вв. н.э.</b> <strong>Пинчуга-6</strong>.
                <br /><br />
                Он изучался археологами <b>Сибирского федерального университета</b> с 2018 по 2022 год и стал первым полностью раскопанным некрополем эпохи Великого переселения народов на Ангаре.
              </p>
            </Html>
          </group>

          <DreiImage
            ref={dreiImage4Ref}
            scale={[1.7 * stateThree.viewport.aspect * 0.6, 1.2 * stateThree.viewport.aspect * 0.6]}
            url={funeral_pure}
            toneMapped={false}
            transparent
            opacity={1}
            position={[pageLerp.current > 2 ? (pageLerp.current > 4 ? -pageLerp.current * 0.47 + 3 : 12) : 30, pageLerp.current > 4 ? 1 : -1, (pageLerp.current > 4 ? (pageLerp.current > 5 ? 20 : (pageLerp.current / 0.7) - 3.6) : -20)]}
          />
          <group ref={mainText4Ref} position={[(pageLerp.current > 4) ? (pageLerp.current > 5 ? -40 : (-pageLerp.current * 0.7 * stateThree.viewport.aspect - 0.4)) : -40, pageLerp.current > 5.5 ? -10 : 1.1, -pageLerp.current - 3.9]}>
            <Html
              as='div'
              wrapperClass="textArea"
              center
            >
              <p ref={mainText4PRef} className="mainText3" style={{ display: 'none' }}>
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
            </Html>
          </group>

          <DreiImage
            ref={dreiImage6Ref}
            transparent
            scale={[0.84, 1.3]}
            url={img_draw_bird_2}
            position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? -20 : 2.7 * stateThree.viewport.aspect * 0.75 - 1) : -7, pageLerp.current > 2 ? -1.8 : -20, pageLerp.current > 5 ? (2.5 * pageLerp.current - 15.5 * 1.15) : -15]}
          />
          <DreiImage
            ref={dreiImage5Ref}
            transparent
            scale={[1, 1.3]}
            url={img_draw_bird_1}
            position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? -20 : 4.4 * stateThree.viewport.aspect * 0.75 - 1) : -7, pageLerp.current > 2 ? -1.5 : -20, pageLerp.current > 5 ? (2.5 * pageLerp.current - 17.2 * 1.15) : -15]}
          />
          <DreiImage
            ref={dreiImage11Ref}
            transparent
            scale={[1.48, 1.2]}
            url={img_draw_horse}
            position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? -20 : 6.3 * stateThree.viewport.aspect * 0.75 - 1) : -7, pageLerp.current > 2 ? -0.6 : -20, pageLerp.current > 5 ? (2.5 * pageLerp.current - 19.5 * 1.15) : -15]}
          />
          <DreiImage
            ref={dreiImage9Ref}
            transparent
            scale={[1.8, 1.16]}
            url={img_draw_item_1}
            position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? -20 : 5.4 * stateThree.viewport.aspect * 0.75 - 1) : -7, pageLerp.current > 2 ? 0.5 : -20, pageLerp.current > 5 ? (2.5 * pageLerp.current - 21.5 * 1.15) : -15]}
          />
          <DreiImage
            ref={dreiImage10Ref}
            transparent
            scale={[1.8, 1.05]}
            url={img_draw_item_2}
            position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? -20 : 3.3 * stateThree.viewport.aspect * 0.75 - 1) : -7, pageLerp.current > 2 ? 1.3 : -20, pageLerp.current > 5 ? (2.5 * pageLerp.current - 22 * 1.15) : -15]}
          />
          <DreiImage
            ref={dreiImage12Ref}
            transparent
            scale={[1.5, 1.51]}
            url={img_draw_disk}
            position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? -20 : 1.3 * stateThree.viewport.aspect * 0.75 - 1) : -7, pageLerp.current > 2 ? 2.5 : -20, pageLerp.current > 5 ? (2.5 * pageLerp.current - 21.5 * 1.15) : -15]}
          />
          <DreiImage
            ref={dreiImage8Ref}
            transparent
            scale={[1.48, 1.32]}
            url={img_draw_cup_2}
            position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? -20 : 2 * stateThree.viewport.aspect * 0.75 - 1) : -7, pageLerp.current > 2 ? 3.7 : -20, pageLerp.current > 5 ? (2.5 * pageLerp.current - 18 * 1.15) : -15]}
          />
          <DreiImage
            ref={dreiImage7Ref}
            transparent
            scale={[1.2, 1.21]}
            url={img_draw_cup_1}
            position={[pageLerp.current > 5 ? (pageLerp.current > 6.2 ? -20 : 2.7 * stateThree.viewport.aspect * 0.75 - 1) : -7, pageLerp.current > 2 ? 4.1 : -20, pageLerp.current > 5 ? (2.5 * pageLerp.current - 15.5 * 1.15) : -15]}
          />

          <group ref={mainText5Ref} position={[(pageLerp.current > 5) ? (pageLerp.current > 6.2 ? -40 : (-pageLerp.current * 0.7 * stateThree.viewport.aspect - 0.4)) : -40, 1.1, -pageLerp.current - 3.9]}>
            <Html
              as='div'
              wrapperClass="textArea"
              center
            >
              <p ref={mainText5PRef} className="mainText4" style={{ display: 'none' }}>
                Эти предметы попали на <b>Ангару</b> из разных регионов и позволяют проследить направления <b>культурных связей</b>, понять, что выступало предметом обмена.
                <br /><br />
                Узнаваемые изображения <b>животных и птиц</b> позволяют нам заглянуть в мир идей и образов людей, живших на ангарских берегах более <b>1500 лет</b> назад.
                <br /><br />
                Представленные <b>керамические сосуды</b> не относятся к могильнику, но найдены на этом же памятнике и характерны для раннего железного века и неолита Приангарья.
              </p>
            </Html>
          </group>


        </Box>
      </>
    )
  }

  function FooterTitle({ onReflow }: any) {

    return (
      <>
        <Box dir="column" align={"center"} justify="center" width="100%" height="auto" minHeight="100%">

          <HeightReporter onReflow={onReflow} />

          <DreiImage position={[Math.max(-1.4, (stateThree.size.width * 0.0006) * (-1.4)), 1.2, 4.2]} transparent scale={[Math.min(0.77, (stateThree.size.width * 0.0006) * 0.73), Math.min(1, (stateThree.size.width * 0.0006) * 0.95)]} url={img_draw_bird_1} />
          <DreiImage position={[0, 1.2, 4.2]} transparent scale={[Math.min(0.98, (stateThree.size.width * 0.0006) * 0.94), Math.min(1, (stateThree.size.width * 0.0006) * 0.95)]} url={img_draw_disk} />
          <DreiImage position={[Math.min(1.4, (stateThree.size.width * 0.0006) * 1.4), 1.2, 4.2]} transparent scale={[Math.min(0.65, (stateThree.size.width * 0.0006) * 0.61), Math.min(1, (stateThree.size.width * 0.0006) * 0.95)]} url={img_draw_bird_2} />

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
      <Stats />
      <OverlayHome zoom={zoom} setZoom={setZoom} />
      <MiniMap
        handleScrollTo={handleScrollTo}
      />
      <PerspectiveCamera makeDefault fov={45} near={0.2} far={zoom ? 200 : 20} position={
        (pageLerp.current < startModelsArray) ?
          [0, 0, 10]
          :
          (pageLerp.current >= startModelsArray && pageLerp.current < 10) ?
            [2 * pageLerp.current - 20, 0, 1]
            :
            (pageLerp.current > 10 && pageLerp.current < 13) ?
              [2 * pageLerp.current - 22, 5.5, -4]
              :
              (pageLerp.current > 13 && pageLerp.current < 16.2) ?
                [-0.7 * pageLerp.current + 19, 12, -1.5 * pageLerp.current + 10]
                :
                (pageLerp.current > 16.2 && pageLerp.current < 19.2) ?
                  [9, 20.2, -0.6 * pageLerp.current - 8]
                  :
                  (pageLerp.current > 19.2 && pageLerp.current < 22) ?
                    [13 - pageLerp.current * 0.5, 26, -0.4 * pageLerp.current - 14]
                    :
                    (pageLerp.current > 22 && pageLerp.current < 24.8) ?
                      [-pageLerp.current * 0.8 + 6, 33, 0.5 * pageLerp.current - 33]
                      :
                      (pageLerp.current > 24.8 && pageLerp.current < 27.7) ?
                        [pageLerp.current * 0.8 - 38, 40, pageLerp.current * 1.5 - 50]
                        :
                        (pageLerp.current > 27.7 && pageLerp.current < 30.8) ?
                          [pageLerp.current * 0.8 - 38, 49.5, pageLerp.current * 0.5 - 16]
                          :
                          [0, 55, 0]
      } />

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
                        (pageLerp.current > 27.7 && pageLerp.current < 30.8) ?
                          [state.model8Pos[0], state.model8Pos[1], state.model8Pos[2]]
                          :
                          [0, 55, 0]
      } />

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
                        (pageLerp.current > 27.7 && pageLerp.current < 30.8) ?
                          [-6, 50, -12]
                          :
                          [0, 55, -10]
      }>
        <planeBufferGeometry args={[1, 1]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0} />
      </mesh>
      <group ref={groupFlex} position={[0, ((pageLerp.current >= startMainText) ? 11 : (pageLerp.current * stateThree.viewport.height)), pageLerp.current < (state.threshold + plusHeight) ? 0 : 0]}>
        <Flex
          dir="column"
          size={[stateThree.viewport.width, stateThree.viewport.height, 10]}
          onReflow={handleReflow}
        >

          <mesh ref={bgRef} position={[
            ((pageLerp.current > 2) ?
              (pageLerp.current >= startModelsArray) ?
                -50
                :
                (window.innerWidth < 1000) ? //Need to set for modile
                  (-pageLerp.current * 1.1) * (stateThree.size.width * 0.0006)
                  :
                  (-pageLerp.current * 1.1)
              : 0),

            ((pageLerp.current > 0.6) ? -11 : -5),

            ((pageLerp.current > 3) ? ((pageLerp.current >= startModelsArray) ? -20 : -pageLerp.current) : 5)
          ]}>
            <planeBufferGeometry args={[bW, bH]} />
            <meshBasicMaterial ref={bgMaterialRef} color={"#2b2b2b"} toneMapped={false} transparent opacity={1} />
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
            <group ref={mainTextRef} position={[0, (pageLerp.current >= startMainText) ? -(3.85) : -(pageLerp.current * 2.5), (pageLerp.current >= startModelsArray) ? 35 : (pageLerp.current * 4)]}>
              <MainText onReflow={(w: any, h: any) => {
                state.threshold = Math.max(20, (20 / (15.8 * 3)) * 1)
              }}
              />
            </group>
          </Box>


          <Box dir="row" width="100%" height="100%" align="center" justify="center">
            <group ref={footerTitleRef} position={[pageLerp.current > 30.8 ? 0 : -8, pageLerp.current > 30.8 ? 68.8 : 80, -10]}>
              <FooterTitle onReflow={(w: any, h: any) => {
                state.threshold = Math.max(8, (8 / (15.8 * 3)) * 1)
              }}
              />
            </group>
          </Box>
        </Flex>
      </group>

      <group ref={modelsArrayRef} position={[pageLerp.current >= startModelsArray ? -1 : 25, 6.2, 1]}>
        <Models
          zoom={zoom}
          setZoom={setZoom}
        />

        <directionalLight position={[-3, -15, -15]} />
        <directionalLight position={[-3, 15, 15]} />
      </group>

      <AdaptivePixelRatio />
    </>
  )
}

export default SceneHome;
