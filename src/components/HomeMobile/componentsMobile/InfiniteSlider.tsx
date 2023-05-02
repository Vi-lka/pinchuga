import React from 'react';
import { useSpringCarousel } from 'react-spring-carousel';
import parse from 'html-react-parser';

export default function InfiniteSlider({className} : {className: string}) {

    const mockedItems = [
        {
          id: 'item-1',
          color: 'black',
          title: "Сокол",
          text: `
            Одной из самых ярких находок на могильнике Пинчуга-6 стали <b>бронзовые изображения хищных птиц</b>.
            Это реалистичные объёмные фигурки, с выразительной головой, объемным клювом, богато украшенными
            крыльями и хвостом, длинными лапами. Фигурки отлиты из <b>«белой бронзы»</b>, сплава меди с оловом и
            небольшим количеством свинца. Внешняя сторона отливок тщательно заполирована.
            <br /><br />
            У одной фигурки узкие вытянутые крылья и длинный хвост.
            Эти черты позволяют видеть в ней изображение <b>сокола</b>, сложившего крылья во время пикирования.
            <br /><br />
          `
        },
        {
          id: 'item-2',
          color: 'white',
          title: "Орёл",
          text: `
            Второе изображение хищной птицы с широкими распахнутыми крыльями и коротким хвостом,
            напоминает парящего <b>орла</b> или <b>беркута</b>. На широкой груди птицы лунками показана человекоподобная «личина».
            В центре отливки просверлено отверстие, через которое был пропущен кожаный шнурок с узелком.
            <br /><br />
            Подобные изображения часто встречаются в Приуралье, на Урале и в Западной Сибири, но восточнее Енисея они найдены впервые.
            Их появление на ангарских берегах говорит о культурных связях, существовавших между населением ангарской долины и
            Западной Сибири в первой половине I тыс. н.э.
            <br /><br />
          `
        },
    ]

    const { carouselFragment } = useSpringCarousel({
      withLoop: true,
      items: mockedItems.map((i) => ({
        id: i.id,
        renderItem: (
            <div className='models-text-slider-item'>
                <b className='title-models' color={i.color}>{i.title}</b>
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
      <div className={className}>
        {carouselFragment}
      </div>
    );
  }