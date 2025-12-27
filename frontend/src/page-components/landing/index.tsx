'use client';

import { useContactModal } from '@app/context/ContactModalContext';
import { ContactModalForm } from '@features/contact-modal';
import { Contact } from '@widgets/Contact';
import { Features } from '@widgets/Features';
import { Hero } from '@widgets/Hero';
import { Pricing } from '@widgets/Pricing';
import { Video } from '@widgets/Video';
import { usePathname, useSearchParams } from 'next/navigation';
import { FC, useEffect } from 'react';

const LandingPage: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isOpen, closeModal } = useContactModal();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hash = searchParams?.get('hash') || window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Hero />
      <Features />
      <Video />
      <Pricing />
      <Contact />
      <ContactModalForm isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export default LandingPage;


