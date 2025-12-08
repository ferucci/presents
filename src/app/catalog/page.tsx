import CatalogPage from '@/page-components/catalog/CatalogPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Каталог румбоксов',
  description: 'Каталог всех румбоксов с фильтрами и поиском. Найдите идеальный миниатюрный книжный конструктор для себя или в подарок.',
  keywords: 'каталог румбоксов, купить румбокс, книжные конструкторы, миниатюры',
  openGraph: {
    title: 'Каталог румбоксов',
    description: 'Каталог всех румбоксов с фильтрами и поиском',
    url: '/catalog',
  },
};

// Отключаем статическую генерацию для страниц с клиентскими хуками
export const dynamic = 'force-dynamic';

export default function Catalog() {
  return <CatalogPage />;
}




