import DocumentationPage from '@/page-components/documentation/DocumentationPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Документация по сборке',
  description: 'Подробная документация по сборке румбоксов: пошаговые инструкции, советы, фотографии процесса сборки.',
  keywords: 'документация румбоксов, инструкция по сборке, советы по сборке',
  openGraph: {
    title: 'Документация по сборке - Румбоксы',
    description: 'Подробная документация по сборке румбоксов',
    url: '/documentation',
  },
};

// Отключаем статическую генерацию для страниц с клиентскими хуками
export const dynamic = 'force-dynamic';

export default function Documentation() {
  return <DocumentationPage />;
}

