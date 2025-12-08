import { Product } from '@entities/product';

const BASE_URL = 'https://yourdomain.com';

export const generateOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Румбоксы',
  description: 'Премиальные румбоксы - миниатюрные книжные конструкторы',
  url: BASE_URL,
  logo: `${BASE_URL}/images/products/products.jpg`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Russian',
  },
  sameAs: [
    // Добавьте ссылки на соцсети
  ],
});

export const generateWebsiteSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Румбоксы',
  url: BASE_URL,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${BASE_URL}/catalog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
});

export const generateProductSchema = (product: Product, index: number) => {
  const priceValue = product.priceValue || 0;
  const priceMatch = product.price.match(/\d+/);
  const numericPrice = priceMatch ? parseInt(priceMatch[0], 10) : priceValue;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: `Румбокс "${product.name}". ${product.features.join(', ')}`,
    image: product.images.map(img => `${BASE_URL}${img}`),
    brand: {
      '@type': 'Brand',
      name: 'Румбоксы',
    },
    offers: {
      '@type': 'Offer',
      url: `${BASE_URL}/product/${index}`,
      priceCurrency: 'RUB',
      price: numericPrice,
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '150',
    },
  };
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: `${BASE_URL}${item.url}`,
  })),
});

export const generateFAQSchema = (faqItems: Array<{ question: string; answer: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
});

