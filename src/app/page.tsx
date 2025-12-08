import LandingPage from '@/page-components/landing';
import { generateOrganizationSchema, generateWebsiteSchema } from '@shared/utils/structuredData';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Премиальные румбоксы - миниатюрные книжные конструкторы для детей и взрослых. Создайте свой волшебный мир из любимых книг!',
  keywords: 'румбоксы, книжные конструкторы, миниатюры, подарки, хобби',
  openGraph: {
    title: 'Румбоксы - Миниатюрные книжные конструкторы',
    description: 'Премиальные румбоксы - миниатюрные книжные конструкторы для детей и взрослых',
    images: ['/images/products/products.jpg'],
  },
};

// Отключаем статическую генерацию для страниц с клиентскими хуками
export const dynamic = 'force-dynamic';

export default function HomePage() {
  const structuredData = [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
  ];

  return (
    <>
      {/* Структурированные данные */}
      {structuredData.map((data, index) => (
        <Script
          key={index}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <LandingPage />
    </>
  );
}

