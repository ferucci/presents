// Типы для продуктов (румбоксов) и временно данные, позже из бд

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
    price: '5200 руб',
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
    price: '4 500 руб',
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
    price: '5 500 руб',
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
    attributes: ['Магическая подсветка', 'Светящиеся элементы'],
    functionality: ['Подсветка', 'Декоративные элементы'],
    priceValue: 5200,
  },
];

