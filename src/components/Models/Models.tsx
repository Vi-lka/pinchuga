import { ContactShadows, Html, PresentationControls, Sphere, useGLTF } from '@react-three/drei';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import { createRef, Suspense, useRef } from 'react'
import * as THREE from 'three';
import { TextureLoader } from 'three';
import state from '../../utils/state';
import { Bird1 } from './Bird1/Bird1';
import { Bird1Simpled } from './Bird1/Bird1Simpled';
import { Bird2 } from './Bird2/Bird2';
import { Bird2Simpled } from './Bird2/Bird2Simpled';
import { Buckle1 } from './Buckle1/Buckle1';
import { Buckle1Simpled } from './Buckle1/Buckle1Simpled';
import { Buckle2 } from './Buckle2/Buckle2';
import { Buckle2Simpled } from './Buckle2/Buckle2Simpled';
import { Cup1 } from './Cup1/Cup1';
import { Cup1Simpled } from './Cup1/Cup1Simpled';
import { Cup2 } from './Cup2/Cup2';
import { Cup2Simpled } from './Cup2/Cup2Simpled';
import { Deer } from './Deer/Deer';
import { DeerSimpled } from './Deer/DeerSimpled';
import { Disk } from './DIsk/Disk';
import { DiskSimpled } from './DIsk/DiskSimpled';
import './models.css';

function Models({ zoom, setZoom }: { zoom: boolean, setZoom: any }) {

  const primitive = useRef<any>()

  const vec = new THREE.Vector3()

  const stateThree = useThree()

  // const bird1Re = useGLTF('./models/low_re/bird1_low_re.glb');
  // const bird2Re = useGLTF('./models/low_re/bird2_low_re.glb');
  const ceramicCupRe = useGLTF('./models/low_re/cup1_low_re.glb');
  const halfCeramicCupRe = useGLTF('./models/low_re/cup2_low_re.glb');
  // const item1Re = useGLTF('./models/low_re/buckle1_low_re.glb');
  // const item2Re = useGLTF('./models/low_re/buckle2_low_re.glb');
  // const deerRe = useGLTF('./models/low_re/deer_low_re.glb');
  // const diskRe = useGLTF('./models/low_re/disk_low_re.glb');

  // bird1Re.scene.traverse( function (object) {
  //   if (object instanceof THREE.Mesh) {
  //     object.material.metalness = 0.95
  //     object.material.roughness = 0.62
  //   }
  // });
  // bird2Re.scene.traverse( function (object) {
  //   if (object instanceof THREE.Mesh) {
  //     object.material.metalness = 0.95
  //     object.material.roughness = 0.6
  //   }
  // });
  // deerRe.scene.traverse( function (object) {
  //   if (object instanceof THREE.Mesh) {
  //     object.material.metalness = 0.95
  //     object.material.roughness = 0.64
  //   }
  // });
  // item1Re.scene.traverse( function (object) {
  //   if (object instanceof THREE.Mesh) {
  //     object.material.metalness = 0.95
  //     object.material.roughness = 0.88
  //   }
  // });
  // item2Re.scene.traverse( function (object) {
  //   if (object instanceof THREE.Mesh) {
  //     object.material.metalness = 0.95
  //     object.material.roughness = 0.88
  //   }
  // });
  // diskRe.scene.traverse( function (object) {
  //   if (object instanceof THREE.Mesh) {
  //     object.material.metalness = 0.95
  //     object.material.roughness = 0.74
  //   }
  // });
  halfCeramicCupRe.scene.traverse(function (object) {
    if (object instanceof THREE.Mesh) {
      object.material.metalness = 0.14
      object.material.roughness = 1
    }
  });
  ceramicCupRe.scene.traverse(function (object) {
    if (object instanceof THREE.Mesh) {
      object.material.metalness = 0.14
      object.material.roughness = 1
    }
  });

  const modelText1Ref = createRef<any>()
  const modelText1PRef = createRef<any>()

  const modelText2Ref = createRef<any>()
  const modelText2PRef = createRef<any>()

  const modelText3Ref = createRef<any>()
  const modelText3PRef = createRef<any>()

  const modelText4Ref = createRef<any>()
  const modelText4PRef = createRef<any>()

  const modelText5Ref = createRef<any>()
  const modelText5PRef = createRef<any>()

  const modelText6Ref = createRef<any>()
  const modelText6PRef = createRef<any>()

  const modelText7Ref = createRef<any>()
  const modelText7PRef = createRef<any>()

  const modelText8Ref = createRef<any>()
  const modelText8PRef = createRef<any>()

  const pageLerp = useRef(state.top / stateThree.size.height)

  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / stateThree.size.height, 0.15))

    modelText1PRef.current && (modelText1PRef.current.style.display = zoom ? 'none' : ((page > 6) ? (page > 11 ? 'none' : 'block') : 'none'))
    if (page < 6.2) modelText1Ref.current?.position.lerp(vec.set(-20, 9, -page * 0.2 + 1), 0.06)
    if (page > 6.2 && page < 10) modelText1Ref.current?.position.lerp(vec.set(0, 9, -page * 0.2 - 6), 0.06)

    modelText2PRef.current && (modelText2PRef.current.style.display = zoom ? 'none' : ((page > 9) ? (page > 13.00005 ? 'none' : 'block') : 'none'))
    if (page < 10) modelText2Ref.current?.position.lerp(vec.set(0, 40, -page * 0.2 + 1), 0.06)
    if (page > 10 && page < 13) modelText2Ref.current?.position.lerp(vec.set(-1.2, 21.2, -page * 0.08 - 2.5), 0.06)

    modelText3PRef.current && (modelText3PRef.current.style.display = zoom ? 'none' : ((page > 12) ? (page > 16.21 ? 'none' : 'block') : 'none'))
    if (page < 13) modelText3Ref.current?.position.lerp(vec.set(0, -10, -page * 0.3 - 1.5), 0.06)
    if (page > 13 && page < 16.2) modelText3Ref.current?.position.lerp(vec.set(2, 22.8, -6.3), 0.06)

    modelText4PRef.current && (modelText4PRef.current.style.display = zoom ? 'none' : ((page > 16) ? (page > 19.4 ? 'none' : 'block') : 'none'))
    if (page < 16.2) modelText4Ref.current?.position.lerp(vec.set(0, 12, page * 0.3 + 5), 0.06)
    if (page > 16.2 && page < 19.2) modelText4Ref.current?.position.lerp(vec.set(2.5, 11.8, page * 0.2 - 0.36), 0.06)

    modelText5PRef.current && (modelText5PRef.current.style.display = zoom ? 'none' : ((page > 19) ? (page > 22.2 ? 'none' : 'block') : 'none'))
    if (page < 19.2) modelText5Ref.current?.position.lerp(vec.set(0, 16.8, -page * 0.3 + 2), 0.06)
    if (page > 19.2 && page < 22) modelText5Ref.current?.position.lerp(vec.set(-0.5, 17.1, -3), 0.06)

    modelText6PRef.current && (modelText6PRef.current.style.display = zoom ? 'none' : ((page > 21.8) ? (page > 25 ? 'none' : 'block') : 'none'))
    if (page < 22) modelText6Ref.current?.position.lerp(vec.set(0, 25, -page * 0.2 + 20), 0.06)
    if (page > 22 && page < 24.8) modelText6Ref.current?.position.lerp(vec.set(0, 24.6, 7.1), 0.06)

    modelText7PRef.current && (modelText7PRef.current.style.display = zoom ? 'none' : ((page > 24.6) ? (page > 27.8 ? 'none' : 'block') : 'none'))
    if (page < 24.8) modelText7Ref.current?.position.lerp(vec.set(0, 15, page * 0.2 - 10.5), 0.06)
    if (page > 24.8 && page < 27.7) modelText7Ref.current?.position.lerp(vec.set(1, 10.6, -5), 0.06)

    modelText8PRef.current && (modelText8PRef.current.style.display = zoom ? 'none' : ((page > 27.5) ? (page > 31 ? 'none' : 'block') : 'none'))
    if (page < 27.7) modelText8Ref.current?.position.lerp(vec.set(0, 15, -page * 0.2 + 20), 0.06)
    if (page > 27.7 && page < 29.6) modelText8Ref.current?.position.lerp(vec.set(0, 8, 3.2), 0.06)
  })

  function handlePointerOverModel(event: MouseEvent) {
    if (!zoom) {
      event.stopPropagation()
      stateThree.gl.domElement.style.cursor = 'move'
    }
  }

  function handlePointerOutModel(event: MouseEvent) {
    event.stopPropagation()
    stateThree.gl.domElement.style.cursor = 'default'
  }

  function handleDoubleClickModel(event: MouseEvent, index: number) {
    event.stopPropagation()
    setZoom(true)
    state.selectedModel = index
    stateThree.gl.domElement.style.cursor = 'default'
  }

  return (
    <>
      <group position={[0, 0, 0]}>

        {/* 
          ******************************* MODEL 1 (Bird1) *******************************
        */}
        <group position={[0, -15.5, -6]} rotation={[0, 1.5, 0]}>
          <directionalLight position={[-30, 20, 10]} />
          <directionalLight position={[-18, 12, 10]} />

          <group position={[2.5, 9.2, -3.1]} rotation={[0, -1.5, 0]}>
            <PresentationControls
              enabled={!zoom} // the controls can be disabled by setting this to false
              global={false} // Spin globally or by dragging the model
              snap={true} // Snap-back to center (can also be a spring config)
              speed={3} // Speed factor
              zoom={1} // Zoom factor when half the polar-max is reached
              rotation={[0, 0, 0]} // Default rotation
              polar={[-Math.PI / 2, Math.PI / 2]} // Vertical limits
              azimuth={[-Infinity, Infinity]} // Horizontal limits
              config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
            >

              <Suspense fallback={
                <Sphere scale={1.2} position={[0, 0, 0]}>
                  <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                </Sphere>
              }>
                <Suspense fallback={
                  <Bird1Simpled
                    visible={!zoom || state.selectedModel === 1}
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    scale={0.52}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 1) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                }>
                  <Bird1
                    visible={!zoom || state.selectedModel === 1}
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    scale={0.52}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 1) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                </Suspense>
              </Suspense>
            </PresentationControls>
          </group>

          <group ref={modelText1Ref} position={[30, 9, 0]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="modelTextArea" // The className of the wrapping element (default: undefined)
              center
              ref={modelText1PRef}
            >
              <p className="modelText1">
                <b>Сокол</b>
                <br /><br />
                Одной из самых ярких находок на могильнике Пинчуга-6 стали <b>бронзовые изображения хищных птиц</b>.
                Это реалистичные объёмные фигурки, с выразительной головой, объемным клювом, богато украшенными
                крыльями и хвостом, длинными лапами. Фигурки отлиты из <b>«белой бронзы»</b>, сплава меди с оловом и
                небольшим количеством свинца. Внешняя сторона отливок тщательно заполирована.
                <br /><br />
                У одной фигурки узкие вытянутые крылья и длинный хвост.
                Эти черты позволяют видеть в ней изображение <b>сокола</b>, сложившего крылья во время пикирования.
                <br /><br />
                <button className='openModelButton' onClick={
                  (e: any) => {
                    setZoom(true)
                    state.selectedModel = 1
                  }
                }>3D модель</button>
              </p>
            </Html>
          </group>
        </group>

        {/* 
          ******************************* MODEL 2 (Bird2) *******************************
        */}
        <group position={[2.4, -22, -11]} rotation={[0, 1.5, 0]} >
          <group position={[-0.2, 21.4, 0.4]} rotation={[0, -1.6, 0]}>
            <PresentationControls
              enabled={!zoom} // the controls can be disabled by setting this to false
              global={false} // Spin globally or by dragging the model
              snap={true} // Snap-back to center (can also be a spring config)
              speed={3} // Speed factor
              zoom={1} // Zoom factor when half the polar-max is reached
              rotation={[0, 0, 0]} // Default rotation
              polar={[-Math.PI / 2, Math.PI / 2]} // Vertical limits
              azimuth={[-Infinity, Infinity]} // Horizontal limits
              config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
            >
              <Suspense fallback={
                <Sphere scale={1.2} position={[0, 0, 0]}>
                  <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                </Sphere>
              }>
                <Suspense fallback={
                  <Bird2Simpled
                    visible={!zoom || state.selectedModel === 2}
                    position={[0, 0, 0]}
                    rotation={[0, 3.3, 0]}
                    scale={2.5}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 2) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                }>
                  <Bird2
                    visible={!zoom || state.selectedModel === 2}
                    position={[0, 0, 0]}
                    rotation={[0, 3.3, 0]}
                    scale={2.5}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 2) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                </Suspense>
              </Suspense>
            </PresentationControls>
          </group>

          <group ref={modelText2Ref} position={[30, 9, 0]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="modelTextArea" // The className of the wrapping element (default: undefined)
              center
              ref={modelText2PRef}
            >
              <p className="modelText2">
                <b>Орёл</b>
                <br /><br />
                Второе изображение хищной птицы с широкими распахнутыми крыльями и коротким хвостом,
                напоминает парящего <b>орла</b> или <b>беркута</b>. На широкой груди птицы лунками показана человекоподобная «личина».
                В центре отливки просверлено отверстие, через которое был пропущен кожаный шнурок с узелком.
                <br /><br />
                Подобные изображения часто встречаются в Приуралье, на Урале и в Западной Сибири, но восточнее Енисея они найдены впервые.
                Их появление на ангарских берегах говорит о культурных связях, существовавших между населением ангарской долины и
                Западной Сибири в первой половине I тыс. н.э.
                <br /><br />
                <button className='openModelButton' onClick={
                  (e: any) => {
                    setZoom(true)
                    state.selectedModel = 2
                  }
                }>3D модель</button>
              </p>
            </Html>
          </group>
        </group>

        {/* 
          ******************************* MODEL 3 (Deer) *******************************
        */}
        <group position={[6, -17, -15.7]} rotation={[0, 2.8, 0]} >
          <group position={[2, 22.6, -1.5]} rotation={[0, -1.6, 0]}>
            <PresentationControls
              enabled={!zoom} // the controls can be disabled by setting this to false
              global={false} // Spin globally or by dragging the model
              snap={true} // Snap-back to center (can also be a spring config)
              speed={3} // Speed factor
              zoom={1} // Zoom factor when half the polar-max is reached
              rotation={[0, 0, 0]} // Default rotation
              polar={[-Math.PI / 2, Math.PI / 2]} // Vertical limits
              azimuth={[-Infinity, Infinity]} // Horizontal limits
              config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
            >
              <Suspense fallback={
                <Sphere scale={1.2} position={[0, 0, 0]}>
                  <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                </Sphere>
              }>
                <Suspense fallback={
                  <DeerSimpled
                    visible={!zoom || state.selectedModel === 3}
                    position={[0, 0, 0]}
                    rotation={[0, 0, -1]}
                    scale={3.8}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 3) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                }>
                  <Deer
                    visible={!zoom || state.selectedModel === 3}
                    position={[0, 0, 0]}
                    rotation={[0, 0, -1]}
                    scale={3.8}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 3) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                </Suspense>
              </Suspense>
            </PresentationControls>
          </group>

          <group ref={modelText3Ref} position={[30, 9, 0]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="modelTextArea" // The className of the wrapping element (default: undefined)
              center
              ref={modelText3PRef}
            >
              <p className="modelText3">
                <b>Олень</b>
                <br /><br />
                На могильнике найдено реалистичное изображение головы северного оленя.
                У животного показаны крупные уши, выразительные глаза и ноздри, небольшой выступ на месте рогов.
                Шея круто изогнута, украшена ложновитым декором, от нее отходит подогнутая нога с копытом. Туловище отсутствует.
                <br /><br />
                Ближайшие аналогии изображению известны в составе Ишимской коллекции, которая происходит из окрестностей Ачинска.
                Здесь представлены бронзовые изображения северных оленей и косуль.
                Стилистика этих изделий характерна для западносибирского культового литья середины II–V веков н.э.
                <br /><br />
                <button className='openModelButton' onClick={
                  (e: any) => {
                    setZoom(true)
                    state.selectedModel = 3
                  }
                }>3D модель</button>
              </p>
            </Html>
          </group>
        </group>

        {/* 
          ******************************* MODEL 4 (Buckle1) *******************************
        */}
        <group position={[10, 2, -16]} rotation={[0, 3.8, 0]} >
          <directionalLight position={[-15, 40, 10]} />

          <group position={[1.5, 11.9, 0.7]} rotation={[0, -1, 0]}>
            <PresentationControls
              enabled={!zoom} // the controls can be disabled by setting this to false
              global={false} // Spin globally or by dragging the model
              snap={true} // Snap-back to center (can also be a spring config)
              speed={3} // Speed factor
              zoom={1.05} // Zoom factor when half the polar-max is reached
              rotation={[0, 0, 0]} // Default rotation
              polar={[-Math.PI / 2, Math.PI / 2]} // Vertical limits
              azimuth={[-Infinity, Infinity]} // Horizontal limits
              config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
            >
              <Suspense fallback={
                <Sphere scale={1.2} position={[0, 0, 0]}>
                  <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                </Sphere>
              }>
                <Suspense fallback={
                  <Buckle1Simpled
                    visible={!zoom || state.selectedModel === 4}
                    position={[0, 0, 0]}
                    rotation={[0, -0.6, 0]}
                    scale={1.1}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 4) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                }>
                  <Buckle1
                    visible={!zoom || state.selectedModel === 4}
                    position={[0, 0, 0]}
                    rotation={[0, -0.6, 0]}
                    scale={1.1}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 4) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                </Suspense>
              </Suspense>
            </PresentationControls>
          </group>

          <group ref={modelText4Ref} position={[30, 9, 0]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="modelTextArea" // The className of the wrapping element (default: undefined)
              center
              ref={modelText4PRef}
            >
              <p className="modelText4">
                <b>Пряжка</b>
                <br /><br />
                Обязательным элементом наборного пояса являются пряжки.
                На могильнике Пинчуга-6 найдены пять бронзовых ажурных пряжек с выступом П-образной формы.
                Декор пряжек лаконичный и геометрический, это волнистые линии, круги, волюты, «псевдомеандр».
                Пряжки с выступом П-образной формы, крепились к ремню с помощью кожаной петли в узкой части.
                В одном погребении найдены две аналогичные пряжки.
                Вероятно, в их широкой части находились завязки, для крепления пояса.
                <br /><br />
                Ажурные пряжки такого типов хорошо известных в хуннских памятниках Тувы, Хакасии и Прибайкалья.
                В условиях ангарской тайги подобные пряжки используются до середины I тысячелетия н.э.
                <br /><br />
                <button className='openModelButton' onClick={
                  (e: any) => {
                    setZoom(true)
                    state.selectedModel = 4
                  }
                }>3D модель</button>
              </p>
            </Html>
          </group>
        </group>


        {/* 
          ******************************* MODEL 5 (Buckle2) *******************************
        */}
        <group position={[2, 2.5, -19]} rotation={[0, -1.5, 0]} >
          <directionalLight position={[-10, 16.9, 0]} intensity={0.8} />

          <group position={[1.2, 17.1, 0.2]} rotation={[0, -1.8, 0]}>
            <PresentationControls
              enabled={!zoom} // the controls can be disabled by setting this to false
              global={false} // Spin globally or by dragging the model
              snap={true} // Snap-back to center (can also be a spring config)
              speed={3} // Speed factor
              zoom={1.05} // Zoom factor when half the polar-max is reached
              rotation={[0, 0, 0]} // Default rotation
              polar={[-Math.PI / 2, Math.PI / 2]} // Vertical limits
              azimuth={[-Infinity, Infinity]} // Horizontal limits
              config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
            >
              <Suspense fallback={
                <Sphere scale={1.2} position={[0, 0, 0]}>
                  <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                </Sphere>
              }>
                <Suspense fallback={
                  <Buckle2Simpled
                    visible={!zoom || state.selectedModel === 5}
                    position={[0, 0, 0]}
                    rotation={[0, 0, -1.6]}
                    scale={0.7}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 5) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                }>
                  <Buckle2
                    visible={!zoom || state.selectedModel === 5}
                    position={[0, 0, 0]}
                    rotation={[0, 0, -1.6]}
                    scale={0.7}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 5) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                </Suspense>
              </Suspense>
            </PresentationControls>
          </group>

          <group ref={modelText5Ref} position={[30, 9, 0]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="modelTextArea" // The className of the wrapping element (default: undefined)
              center
              ref={modelText5PRef}
            >
              <p className="modelText5">
                <b>Прямоугольная Пряжка</b>
                <br /><br />
                Одна пряжка из могильника другого типа. Это массивное изделие прямоугольной формы,
                с небольшим неподвижным штырьком и ажурным декором. Прототипы пряжек этого типа также
                известны в погребениях хунну в Прибайклье и Хакасии. Именно из этих районов идея такого
                оформления пояса попала на берега Ангары.
                <br /><br />
                Интересен декор в центре пряжки. Это ажурный псевдомеандр, который получает широкое
                распространение на бронзовых и костяных изделиях в середине I тыс. н.э. на многих территории Сибири.
                <br /><br />
                <button className='openModelButton' onClick={
                  (e: any) => {
                    setZoom(true)
                    state.selectedModel = 5
                  }
                }>3D модель</button>
              </p>
            </Html>
          </group>
        </group>

        {/* 
          ******************************* MODEL 6 (Disk) *******************************
        */}
        <group position={[-4, 1.4, -17.5]} rotation={[0, -1, 0]} >
          <directionalLight position={[25, 100, 5]} />

          <group position={[-1.6, 24.7, 2.2]} rotation={[0, -1.5, 0]}>
            <PresentationControls
              enabled={!zoom} // the controls can be disabled by setting this to false
              global={false} // Spin globally or by dragging the model
              snap={true} // Snap-back to center (can also be a spring config)
              speed={3} // Speed factor
              zoom={1.05} // Zoom factor when half the polar-max is reached
              rotation={[0, 0, 0]} // Default rotation
              polar={[-Math.PI / 2, Math.PI / 2]} // Vertical limits
              azimuth={[-Infinity, Infinity]} // Horizontal limits
              config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
            >
              <Suspense fallback={
                <Sphere scale={1.2} position={[0, 0, 0]}>
                  <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                </Sphere>
              }>
                <Suspense fallback={
                  <DiskSimpled
                    visible={!zoom || state.selectedModel === 6}
                    position={[0, 0, 0]}
                    rotation={[1.55, 0, -1.5]}
                    scale={4.5}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 6) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                }>
                  <Disk
                    visible={!zoom || state.selectedModel === 6}
                    position={[0, 0, 0]}
                    rotation={[1.55, 0, -1.5]}
                    scale={4.5}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 6) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                </Suspense>
              </Suspense>
            </PresentationControls>
          </group>

          <group ref={modelText6Ref} position={[30, 9, 0]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="modelTextArea" // The className of the wrapping element (default: undefined)
              center
              ref={modelText6PRef}
            >
              <p className="modelText6">
                <b>Диск с циркульным орнаментом</b>
                <br /><br />
                Особую группу бронзовых предметов на могильнике составляют плоские диски с
                циркульным орнаментом и отверстием в центре. Всего их найдено пять экземпляров.
                Диаметр дисков небольшой – от 3,5 до 6,0 см. Край предметов ровный или зубчатый.
                Лицевая сторона изделий тщательно заполирована, тонким прочным инструментом на ней
                вырезаны несколько окружностей.
                <br /><br />
                Такие диски частая находка в западносибирской археологии, но на Ангаре их ранее не встречали.
                Точное назначение этих предметов не известно. Диски могли быть частью доспехов или украшением костюма.
                Многие археологи подчеркивают их неутилитарное назначение и рассматривают как солярные знаки.
                Датируются они в рамках первой половиной I тысячелетия нашей эры.
                <br /><br />
                <button className='openModelButton' onClick={
                  (e: any) => {
                    setZoom(true)
                    state.selectedModel = 6
                  }
                }>3D модель</button>
              </p>
            </Html>
          </group>
        </group>

        {/* 
          ******************************* MODEL 7 (Cup2) *******************************
        */}
        <group position={[-9.8, 23.5, -10]} rotation={[0, 0.3, 0]} >
          <directionalLight position={[-200, 40, 15]} intensity={0.6} />

          <group position={[0.5, 10.95, -0.85]} rotation={[0, -1.5, 0]}>
            <PresentationControls
              enabled={!zoom} // the controls can be disabled by setting this to false
              global={false} // Spin globally or by dragging the model
              snap={true} // Snap-back to center (can also be a spring config)
              speed={3} // Speed factor
              zoom={1.05} // Zoom factor when half the polar-max is reached
              rotation={[0, 0, 0]} // Default rotation
              polar={[-Math.PI / 2, Math.PI / 2]} // Vertical limits
              azimuth={[-Infinity, Infinity]} // Horizontal limits
              config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
            >
              <Suspense fallback={
                <Sphere scale={1.2} position={[0, 0, 0]}>
                  <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                </Sphere>
              }>
                <Suspense fallback={
                  <Cup2Simpled
                    visible={!zoom || state.selectedModel === 7}
                    position={[0, 0, 0]}
                    rotation={[0, 1.25, 0.1]}
                    scale={1}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 7) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                }>
                  <Cup2
                    visible={!zoom || state.selectedModel === 7}
                    position={[0, 0, 0]}
                    rotation={[0, 1.25, 0.1]}
                    scale={1}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 7) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                </Suspense>
              </Suspense>
            </PresentationControls>
          </group>

          <group ref={modelText7Ref} position={[30, 9, 0]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="modelTextArea" // The className of the wrapping element (default: undefined)
              center
              ref={modelText7PRef}
            >
              <p className="modelText7">
                <b>Горшок с личиной</b>
                <br /><br />
                Кроме могильника III–IV вв. н.э., на комплексе Пинчуга-6 найдены и более древние материалы.
                В их числе фрагмент верхней части керамического горшка раннего железного века.
                Это сосуд с широкой налепной лентой, на которой гончар оставил небольшой рисунок,
                представляющий собой прорезанное тонкими линиями изображение человека.
                <br /><br />
                Горшки с подобными рисунками часто встречаются на Ангаре и Енисее в памятниках скифского времени.
                Фигурки могут иметь не только голову, но туловище, ноги и руки.
                У некоторых дополнительно показан головной убор «с ушками». «Рогатые» ромбические личины
                встречаются и в наскальном искусстве Нижнего Приангарья.
                <br /><br />
                <button className='openModelButton' onClick={
                  (e: any) => {
                    setZoom(true)
                    state.selectedModel = 7
                  }
                }>3D модель</button>
              </p>
            </Html>
          </group>
        </group>

        {/* 
          ******************************* MODEL 8 (Cup1) *******************************
        */}
        <group position={[-10, 35.5, -7]} rotation={[0, 1.2, 0]}>

          <group position={[0, 7.8, -1.5]} rotation={[0, -1.5, 0]}>
            <PresentationControls
              enabled={!zoom} // the controls can be disabled by setting this to false
              global={false} // Spin globally or by dragging the model
              snap={true} // Snap-back to center (can also be a spring config)
              speed={3} // Speed factor
              zoom={1.05} // Zoom factor when half the polar-max is reached
              rotation={[0, 0, 0]} // Default rotation
              polar={[-Math.PI / 2, Math.PI / 2]} // Vertical limits
              azimuth={[-Infinity, Infinity]} // Horizontal limits
              config={{ mass: 1, tension: 170, friction: 26 }} // Spring config
            >
              <Suspense fallback={
                <Sphere scale={1.2} position={[0, 0, 0]}>
                  <meshStandardMaterial color='gray' roughness={0.4} metalness={0.2} />
                </Sphere>
              }>
                <Suspense fallback={
                  <Cup1Simpled
                    visible={!zoom || state.selectedModel === 8}
                    position={[0, 0, 0]}
                    rotation={[-1.8, 0.05, 3]}
                    scale={1.2}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 8) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                }>
                  <Cup1
                    visible={!zoom || state.selectedModel === 8}
                    position={[0, 0, 0]}
                    rotation={[-1.8, 0.05, 3]}
                    scale={1.2}
                    onDoubleClick={(e: any) => { handleDoubleClickModel(e, 8) }}
                    onPointerOver={(e: any) => { handlePointerOverModel(e) }}
                    onPointerOut={(e: any) => { handlePointerOutModel(e) }}
                  />
                </Suspense>
              </Suspense>
            </PresentationControls>
          </group>

          <group ref={modelText8Ref} position={[30, 9, 0]}>
            <Html
              as='div' // Wrapping element (default: 'div')
              wrapperClass="modelTextArea" // The className of the wrapping element (default: undefined)
              center
              ref={modelText8PRef}
            >
              <p className="modelText8">
                <b>Горшок с оттисками «сетки-плетенки»</b>
                <br /><br />
                Самый древний пласт материалов, найденный на комплексе Пинчуга-6, представлен двумя сосудами
                с оттисками «сетки-плетенки». Это простые сосуды, украшенные прочерченными линиями и ямками,
                с неровной поверхностью. В раскопе фрагменты керамики лежали компактным скоплением, других находок рядом не было.
                <br /><br />
                Подобные горшки выбивали во время лепки небольшой лопаткой, обмотанной крупноячеистой сеткой.
                Это делало стенки сосудов тонкими и прочными, а отпечатки сетки на внешней поверхности снижали
                напряжение при сушке изделий. В период раннего неолита сетчатая керамика была распространена на
                огромной территории: от Енисея на западе до Лены на востоке. Носители этой керамической традиции занимали и берега Ангары.
                <br /><br />
                <button className='openModelButton' onClick={
                  (e: any) => {
                    setZoom(true)
                    state.selectedModel = 8
                  }
                }>3D модель</button>
              </p>
            </Html>
          </group>
        </group>
      </group>
    </>
  )
}

export default Models
