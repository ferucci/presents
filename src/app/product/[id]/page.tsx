import ProductDetailPage from '@/page-components/product-detail';
import { products } from '@entities/product';
import { generateBreadcrumbSchema, generateProductSchema } from '@shared/utils/structuredData';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Script from 'next/script';

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Отключаем статическую генерацию для страниц с клиентскими хуками
export const dynamic = 'force-dynamic';

// Генерация статических путей для всех продуктов (SSG)
export async function generateStaticParams() {
  return products.map((_, index) => ({
    id: index.toString(),
  }));
}

// Генерация метаданных для каждого продукта
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const productIndex = parseInt(params.id, 10);
  const product = products[productIndex];

  if (!product) {
    return {
      title: 'Продукт не найден',
    };
  }

  const productDescription = `Румбокс "${product.name}". ${product.features.join(', ')}. Премиальное качество, ручная работа.`;

  return {
    title: product.name,
    description: productDescription,
    keywords: `румбокс, ${product.name}, книжный конструктор, миниатюра, подарок, ${product.features.join(', ')}`,
    openGraph: {
      type: 'website',
      title: product.name,
      description: productDescription,
      images: [product.images[0] || '/images/products/products.jpg'],
      url: `/product/${productIndex}`,
    },
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const productIndex = parseInt(params.id, 10);
  const product = products[productIndex];

  if (!product) {
    notFound();
  }

  const structuredData = [
    generateProductSchema(product, productIndex),
    generateBreadcrumbSchema([
      { name: 'Главная', url: '/' },
      { name: 'Каталог', url: '/catalog' },
      { name: product.name, url: `/product/${productIndex}` },
    ]),
  ];

  return (
    <>
      {/* Структурированные данные */}
      {structuredData.map((data, index) => (
        <Script
          key={index}
          id={`product-structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <ProductDetailPage />
    </>
  );
}

