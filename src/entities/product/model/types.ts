// Типы для продуктов (румбоксов)

export interface Product {
  name: string;
  images: string[];
  price: string;
  period: string;
  features: string[];
  popular: boolean;
}

export const products: Product[] = [
  {
    name: 'Хогвартс-экспресс',
    images: [
      './.src/assets/images/product-1.jpg',
      '../src/assets/images/products.jpg',
      '../src/assets/images/product-1.jpg',
    ],
    price: '4 900 руб',
    period: '',
    features: [
      'Светящиеся элементы',
      'Точная копия интерьера',
      'Фирменная коробка',
      'Подарочная упаковка',
    ],
    popular: true,
  },
  {
    name: 'Кабинет Шерлока',
    images: [
      '../src/assets/images/product-2.jpg',
      '../src/assets/images/products.jpg',
      '../src/assets/images/product-2.jpg',
    ],
    price: '6 200 руб',
    period: '',
    features: [
      'Улики в деталях',
      'Деревянные аксессуары',
      'Реалистичные документы',
      'Безлимитные консультации',
      'Подвижные элементы',
    ],
    popular: false,
  },
  {
    name: 'Сад Маленького принца',
    images: [
      '../src/assets/images/product-3.jpg',
      '../src/assets/images/products.jpg',
      '../src/assets/images/product-3.jpg',
    ],
    price: '5 500 руб',
    period: '',
    features: [
      'Светящиеся звезды',
      'Живая роза',
      'Ручная роспись',
      'Магическая подсветка',
      'Шелковый баобаб',
    ],
    popular: false,
  },
];

