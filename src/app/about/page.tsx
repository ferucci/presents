import AboutPage from '@/page-components/about/AboutPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'О нас',
  description: 'Узнайте больше о нашей компании, ценностях и команде. Мы создаем премиальные румбоксы с любовью и вниманием к деталям.',
  keywords: 'о компании, команда, ценности, румбоксы',
  openGraph: {
    title: 'О нас - Румбоксы',
    description: 'Узнайте больше о нашей компании, ценностях и команде',
    url: '/about',
  },
};

// Отключаем статическую генерацию для страниц с клиентскими хуками
export const dynamic = 'force-dynamic';

export default function About() {
  return <AboutPage />;
}

