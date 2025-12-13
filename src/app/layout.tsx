import { Providers } from '@app/providers';
import '@app/styles/globals.scss';
import type { Metadata } from 'next';

import { FloatingTelegram } from '@widgets/FloatingTelegram';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';

// import { Montserrat } from 'next/font/google';
// const font = Montserrat({ subsets: ['latin', 'cyrillic'] });
// на бади вешаю className={font.className} для подключения

export const metadata: Metadata = {
  title: {
    default: 'Румбоксы - Миниатюрные книжные конструкторы',
    template: '%s | Румбоксы',
  },
  description: 'Премиальные румбоксы - миниатюрные книжные конструкторы для детей и взрослых. Создайте свой волшебный мир из любимых книг!',
  keywords: ['румбоксы', 'книжные конструкторы', 'миниатюры', 'подарки', 'хобби'],
  icons: {
    icon: '/vite.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://first-present.ru',
    siteName: 'Румбоксы',
    title: 'Румбоксы - Миниатюрные книжные конструкторы',
    description: 'Премиальные румбоксы - миниатюрные книжные конструкторы для детей и взрослых',
    images: [
      {
        url: 'https://first-present.ru/images/products/products.jpg',
        width: 1200,
        height: 630,
        alt: 'Румбоксы',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Коды верификации для Google и Yandex
    google: process.env.GOOGLE_VERIFICATION || '',
    yandex: process.env.YANDEX_VERIFICATION || '',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingTelegram />
        </Providers>
      </body>
    </html>
  );
}

