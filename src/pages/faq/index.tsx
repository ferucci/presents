import { FAQ } from '@widgets/FAQ';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { FC } from 'react';

export const FAQPage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <FAQ />
      </main>
      <Footer />
    </>
  );
};



