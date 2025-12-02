import { Privacy } from '@widgets/Privacy';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { FC } from 'react';

export const PrivacyPage: FC = () => {
  return (
    <>
      <Header />
      <main>
        <Privacy />
      </main>
      <Footer />
    </>
  );
};


