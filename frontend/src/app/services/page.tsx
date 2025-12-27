import ServicesPage from '@/page-components/services/ServicesPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Услуги',
  description: 'Наши услуги по созданию и доставке румбоксов. Индивидуальные заказы, подарочная упаковка, консультации по сборке.',
  keywords: 'услуги румбоксов, индивидуальные заказы, подарочная упаковка',
  openGraph: {
    title: 'Услуги - Румбоксы',
    description: 'Наши услуги по созданию и доставке румбоксов',
    url: '/services',
  },
};

// Отключаем статическую генерацию для страниц с клиентскими хуками
export const dynamic = 'force-dynamic';

export default function Services() {
  return <ServicesPage />;
}

