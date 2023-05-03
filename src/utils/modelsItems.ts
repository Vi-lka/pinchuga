const mockedItems = [
    {
      id: '1',
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
      id: '2',
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
    {
      id: '3',
      title: "Олень",
      text: `
        На могильнике найдено реалистичное изображение головы <b>северного оленя</b>.
        У животного показаны крупные уши, выразительные глаза и ноздри, небольшой выступ на месте рогов.
        Шея круто изогнута, украшена ложновитым декором, от нее отходит подогнутая нога с копытом. Туловище отсутствует.
        <br /><br />
        Ближайшие аналогии изображению известны в составе <b>Ишимской коллекции</b>, которая происходит из окрестностей Ачинска.
        Здесь представлены бронзовые изображения северных оленей и косуль.
        Стилистика этих изделий характерна для западносибирского культового литья середины II–V веков н.э.
        <br /><br />
      `
    },
    {
      id: '4',
      title: "Пряжка",
      text: `
        Обязательным элементом наборного пояса являются <b>пряжки</b>.
        На могильнике <b>Пинчуга-6</b> найдены пять бронзовых ажурных пряжек с выступом П-образной формы.
        Декор пряжек лаконичный и геометрический, это волнистые линии, круги, волюты, «псевдомеандр».
        Пряжки с выступом П-образной формы, крепились к ремню с помощью кожаной петли в узкой части.
        В одном погребении найдены две аналогичные пряжки.
        Вероятно, в их широкой части находились завязки, для крепления пояса.
        <br /><br />
        Ажурные пряжки такого типов хорошо известных в хуннских памятниках <b>Тувы, Хакасии и Прибайкалья</b>.
        В условиях ангарской тайги подобные пряжки используются до середины I тысячелетия н.э.
        <br /><br />
      `
    },
    {
      id: '5',
      title: "Прямоугольная Пряжка",
      text: `
        Одна пряжка из могильника другого типа. Это массивное изделие <b>прямоугольной формы</b>,
        с небольшим неподвижным штырьком и ажурным декором. Прототипы пряжек этого типа также
        известны в погребениях хунну в Прибайклье и Хакасии. Именно из этих районов идея такого
        оформления пояса попала на берега <b>Ангары</b>.
        <br /><br />
        Интересен декор в центре пряжки. Это ажурный <b>псевдомеандр</b>, который получает широкое
        распространение на бронзовых и костяных изделиях в середине I тыс. н.э. на многих территории Сибири.
        <br /><br />
      `
    },
    {
      id: '6',
      title: "Диск с циркульным орнаментом",
      text: `
        Особую группу бронзовых предметов на могильнике составляют <b>плоские диски с
        циркульным орнаментом и отверстием в центре</b>. Всего их найдено пять экземпляров.
        Диаметр дисков небольшой – от 3,5 до 6,0 см. Край предметов ровный или зубчатый.
        Лицевая сторона изделий тщательно заполирована, тонким прочным инструментом на ней
        вырезаны несколько окружностей.
        <br /><br />
        Такие диски частая находка в западносибирской археологии, но <b>на Ангаре их ранее не встречали</b>.
        Точное назначение этих предметов не известно. Диски могли быть частью доспехов или украшением костюма.
        Многие археологи подчеркивают их неутилитарное назначение и рассматривают как <b>солярные знаки</b>.
        Датируются они в рамках первой половиной I тысячелетия нашей эры.
        <br /><br />
      `
    },
    {
      id: '7',
      title: "Горшок с личиной",
      text: `
        Кроме могильника III–IV вв. н.э., на комплексе <b>Пинчуга-6</b> найдены и более древние материалы.
        В их числе фрагмент верхней части <b>керамического горшка</b> раннего железного века.
        Это сосуд с широкой налепной лентой, на которой гончар оставил небольшой рисунок,
        представляющий собой <b>прорезанное тонкими линиями изображение человека</b>.
        <br /><br />
        Горшки с подобными рисунками часто встречаются на Ангаре и Енисее в памятниках <b>скифского времени</b>.
        Фигурки могут иметь не только голову, но туловище, ноги и руки.
        У некоторых дополнительно показан головной убор «с ушками». «Рогатые» ромбические личины
        встречаются и в наскальном искусстве Нижнего Приангарья.
        <br /><br />
      `
    },
    {
      id: '8',
      title: "Горшок с оттисками «сетки-плетенки»",
      text: `
        Самый древний пласт материалов, найденный на комплексе <b>Пинчуга-6</b>, представлен двумя сосудами
        с оттисками <b>«сетки-плетенки»</b>. Это простые сосуды, украшенные прочерченными линиями и ямками,
        с неровной поверхностью. В раскопе фрагменты керамики лежали компактным скоплением, других находок рядом не было.
        <br /><br />
        Подобные горшки выбивали во время лепки небольшой лопаткой, обмотанной крупноячеистой сеткой.
        Это делало стенки сосудов тонкими и прочными, а отпечатки сетки на внешней поверхности снижали
        напряжение при сушке изделий. В период раннего неолита сетчатая керамика была распространена на
        огромной территории: <b>от Енисея на западе до Лены на востоке</b>. Носители этой керамической традиции занимали и берега Ангары.
        <br /><br />
      `
    },
  ]

export default mockedItems