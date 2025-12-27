import PrivacyPage from '@/page-components/privacy/PrivacyPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности и обработки персональных данных. Как мы собираем, используем и защищаем вашу информацию.',
  keywords: 'политика конфиденциальности, персональные данные',
  openGraph: {
    type: 'article',
    title: 'Политика конфиденциальности - Румбоксы',
    description: 'Политика конфиденциальности и обработки персональных данных',
    url: '/privacy',
  },
};

export default function Privacy() {
  return <PrivacyPage />;
}

