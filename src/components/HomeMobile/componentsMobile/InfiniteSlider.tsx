import React from 'react';
import { useSpringCarousel } from 'react-spring-carousel';
import parse from 'html-react-parser';

export default function InfiniteSlider({className} : {className: string}) {

    const mockedItems = [
        {
          id: 'item-1',
          color: 'black',
          title: "Item1",
          text: `<br /><br />
          Одной из самых ярких находок на могильнике Пинчуга-6 стали <b>бронзовые изображения хищных птиц</b>.
          Это реалистичные объёмные фигурки, с выразительной головой, объемным клювом, богато украшенными
          крыльями и хвостом, длинными лапами. Фигурки отлиты из <b>«белой бронзы»</b>, сплава меди с оловом и
          небольшим количеством свинца. Внешняя сторона отливок тщательно заполирована.
          <br /><br />
          У одной фигурки узкие вытянутые крылья и длинный хвост.
          Эти черты позволяют видеть в ней изображение <b>сокола</b>, сложившего крылья во время пикирования.
          <br /><br />`
        },
        {
          id: 'item-2',
          color: 'white',
          title: "Item2",
          text: `<br /><br />
          <b>test</b>
          <br /><br />
          test
          <br /><br />`
        },
    ]

    const { carouselFragment } = useSpringCarousel({
      withLoop: true,
      items: mockedItems.map((i) => ({
        id: i.id,
        renderItem: (
            <div className='models-text-slider-item'>
                <p>
                  <b color={i.color}>{i.title}</b>
                  {parse(i.text)}
                  {/* <button className='openModelButton' onClick={
                    (e: any) => {
                      setZoom(true)
                      state.selectedModel = 1
                    }
                  }>3D модель</button> */}
                </p>
            </div>
        ),
      })),
    });

    return (
      <div className={className}>
        {carouselFragment}
      </div>
    );
  }