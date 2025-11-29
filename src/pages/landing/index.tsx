import { useContactModal } from '@app/context/ContactModalContext';
import { ContactModalForm } from '@features/contact-modal';
import { Contact } from '@widgets/Contact';
import { Features } from '@widgets/Features';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { Hero } from '@widgets/Hero';
import { Pricing } from '@widgets/Pricing';
import { Video } from '@widgets/Video';
import { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const LandingPage: FC = () => {
  const location = useLocation();
  const { isOpen, closeModal } = useContactModal();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Video />
        <Pricing />
        <Contact />
      </main>
      <Footer />
      <ContactModalForm isOpen={isOpen} onClose={closeModal} />
    </>
  );
};


