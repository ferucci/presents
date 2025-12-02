// Типы для продуктов (румбоксов)

export interface Product {
  name: string;
  images: string[];
  price: string;
  period: string;
  features: string[];
  popular: boolean;
  colors?: string[];
  attributes?: string[];
  functionality?: string[];
  priceValue?: number;
}

export const products: Product[] = [
  {
    name: 'Волшебный книжный дом',
    images: [

      '/images/products/product-1_2.jpg',
      '/images/products/product-1_3.jpg',
      '/images/products/product-1_4.jpg',
      '/images/products/product-1.jpg',
    ],
    price: '5500 руб',
    period: '',
    features: [
      'Светящиеся элементы',
      'Точная копия интерьера',
      'Ручная роспись',
      'Прочные материалы',
      'Подходящий возраст от 10-ти лет',
    ],
    popular: true,
    colors: ['Красный', 'Золотой', 'Синий'],
    attributes: ['Светящиеся элементы', 'Прочные материалы'],
    functionality: ['Подсветка', 'Детализированный интерьер'],
    priceValue: 5500,
  },
  {
    name: 'Волшебная комната',
    images: [
      '/images/products/product-2_2.png',
      '/images/products/product-2_1.png',
      '/images/products/product-2_3.png',
      '/images/products/product-2_4.jpg',
      '/images/products/product-2.png',
    ],
    price: '6 200 руб',
    period: '',
    features: [
      'Деревянные аксессуары',
      'История в миниатюре',
      'Безлимитные консультации',
      'Детализация',
      'Подходящий возраст от 10-ти лет',
    ],
    popular: false,
    colors: ['Коричневый', 'Бежевый', 'Черный'],
    attributes: ['Деревянные аксессуары', 'Подвижные элементы'],
    functionality: ['Интерактивные элементы', 'Детализированные документы'],
    priceValue: 6200,
  },
  {
    name: 'Волшебная ночная аллея',
    images: [
      '/images/products/product-3.jpg',
      '/images/products/product-3_1.jpg',
      '/images/products/product-3_2.jpg',
      '/images/products/product-3_3.jpg',
      '/images/products/product-3_4.jpg',
    ],
    price: '5 200 руб',
    period: '',
    features: [
      'Приятный дизайн',
      'Фирменная коробка',
      'Магическая подсветка',
      'Прочные материалы',
      'Подходящий возраст от 10-ти лет',
    ],
    popular: false,
    colors: ['Зеленый', 'Желтый', 'Синий'],
    attributes: ['Ручная роспись', 'Светящиеся элементы'],
    functionality: ['Подсветка', 'Декоративные элементы'],
    priceValue: 5200,
  },
  // {
  //   name: 'Библиотека Дамблдора',
  //   images: [
  //     '/images/products/products.jpg',
  //     '/images/products/product-1.jpg',
  //     '/images/products/product-2.jpg',
  //   ],
  //   price: '7 800 руб',
  //   period: '',
  //   features: [
  //     'Волшебные книги',
  //     'Светящиеся полки',
  //     'Магические артефакты',
  //     'Детализированные свитки',
  //   ],
  //   popular: true,
  //   colors: ['Коричневый', 'Золотой', 'Бордовый'],
  //   attributes: ['Светящиеся элементы', 'Магические артефакты'],
  //   functionality: ['Подсветка', 'Интерактивные книги'],
  //   priceValue: 7800,
  // },
  // {
  //   name: 'Комната Алисы',
  //   images: [
  //     '/images/products/products.jpg',
  //     '/images/products/product-3.jpg',
  //     '/images/products/product-1.jpg',
  //   ],
  //   price: '5 200 руб',
  //   period: '',
  //   features: [
  //     'Зеркало в полный рост',
  //     'Волшебные часы',
  //     'Игральные карты',
  //     'Чайный сервиз',
  //   ],
  //   popular: false,
  //   colors: ['Синий', 'Белый', 'Красный'],
  //   attributes: ['Декоративные элементы', 'Детализированный интерьер'],
  //   functionality: ['Декоративная подсветка'],
  //   priceValue: 5200,
  // },
  // {
  //   name: 'Каюты Титаника',
  //   images: [
  //     '/images/products/product-2.jpg',
  //     '/images/products/products.jpg',
  //     '/images/products/product-3.jpg',
  //   ],
  //   price: '6 900 руб',
  //   period: '',
  //   features: [
  //     'Элегантный интерьер',
  //     'Винтажные аксессуары',
  //     'Детализированная мебель',
  //     'Историческая точность',
  //   ],
  //   popular: false,
  //   colors: ['Белый', 'Золотой', 'Коричневый'],
  //   attributes: ['Винтажные аксессуары', 'Детализированная мебель'],
  //   functionality: ['Декоративная подсветка'],
  //   priceValue: 6900,
  // },
  // {
  //   name: 'Лаборатория Франкенштейна',
  //   images: [
  //     '/images/products/product-1.jpg',
  //     '/images/products/product-2.jpg',
  //     '/images/products/products.jpg',
  //   ],
  //   price: '7 500 руб',
  //   period: '',
  //   features: [
  //     'Светящиеся колбы',
  //     'Научные инструменты',
  //     'Готический стиль',
  //     'Эффект свечения',
  //   ],
  //   popular: true,
  //   colors: ['Зеленый', 'Черный', 'Серебряный'],
  //   attributes: ['Светящиеся элементы', 'Научные инструменты'],
  //   functionality: ['Подсветка', 'Эффект свечения'],
  //   priceValue: 7500,
  // },
  // {
  //   name: 'Дом Белль',
  //   images: [
  //     '/images/products/product-3.jpg',
  //     '/images/products/product-1.jpg',
  //     '/images/products/products.jpg',
  //   ],
  //   price: '5 800 руб',
  //   period: '',
  //   features: [
  //     'Вращающаяся библиотека',
  //     'Роза под стеклом',
  //     'Волшебное зеркало',
  //     'Детализированные книги',
  //   ],
  //   popular: false,
  //   colors: ['Желтый', 'Золотой', 'Красный'],
  //   attributes: ['Вращающиеся элементы', 'Детализированные книги'],
  //   functionality: ['Подвижные элементы', 'Декоративная подсветка'],
  //   priceValue: 5800,
  // },
  // {
  //   name: 'Нарния: Платяной шкаф',
  //   images: [
  //     '/images/products/products.jpg',
  //     '/images/products/product-2.jpg',
  //     '/images/products/product-3.jpg',
  //   ],
  //   price: '6 500 руб',
  //   period: '',
  //   features: [
  //     'Волшебный портал',
  //     'Снежные эффекты',
  //     'Детализированный шкаф',
  //     'Магическая атмосфера',
  //   ],
  //   popular: false,
  //   colors: ['Коричневый', 'Белый', 'Синий'],
  //   attributes: ['Волшебные эффекты', 'Детализированный интерьер'],
  //   functionality: ['Декоративная подсветка', 'Эффекты'],
  //   priceValue: 6500,
  // },
  // {
  //   name: 'Обитель Хоббита',
  //   images: [
  //     '/images/products/product-1.jpg',
  //     '/images/products/products.jpg',
  //     '/images/products/product-2.jpg',
  //   ],
  //   price: '7 200 руб',
  //   period: '',
  //   features: [
  //     'Уютный интерьер',
  //     'Детализированная мебель',
  //     'Текстильные элементы',
  //     'Теплое освещение',
  //   ],
  //   popular: true,
  //   colors: ['Коричневый', 'Зеленый', 'Бежевый'],
  //   attributes: ['Текстильные элементы', 'Детализированная мебель'],
  //   functionality: ['Теплая подсветка'],
  //   priceValue: 7200,
  // },
  // {
  //   name: 'Замок Рапунцель',
  //   images: [
  //     '/images/products/product-2.jpg',
  //     '/images/products/product-3.jpg',
  //     '/images/products/products.jpg',
  //   ],
  //   price: '6 800 руб',
  //   period: '',
  //   features: [
  //     'Светящаяся башня',
  //     'Волшебные цветы',
  //     'Детализированная комната',
  //     'Романтическая атмосфера',
  //   ],
  //   popular: false,
  //   colors: ['Фиолетовый', 'Золотой', 'Розовый'],
  //   attributes: ['Светящиеся элементы', 'Волшебные цветы'],
  //   functionality: ['Подсветка', 'Декоративные эффекты'],
  //   priceValue: 6800,
  // },
  // {
  //   name: 'Квартира Шерлока (221B)',
  //   images: [
  //     '/images/products/product-3.jpg',
  //     '/images/products/product-1.jpg',
  //     '/images/products/products.jpg',
  //   ],
  //   price: '6 400 руб',
  //   period: '',
  //   features: [
  //     'Винтажная мебель',
  //     'Детективные улики',
  //     'Книжные полки',
  //     'Атмосфера викторианской эпохи',
  //   ],
  //   popular: false,
  //   colors: ['Коричневый', 'Бордовый', 'Золотой'],
  //   attributes: ['Винтажная мебель', 'Детективные улики'],
  //   functionality: ['Декоративная подсветка'],
  //   priceValue: 6400,
  // },
];

