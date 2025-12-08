'use client';

import { useNavigation } from '@/hooks/useNavigation';
import { Button } from '@shared/ui';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const { about, services, documentation } = useNavigation();

  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Если не на главной странице - переходим на главную с якорем
    if (pathname !== '/') {
      router.push(`/#${id}`);
      return;
    }

    // Если на главной - скроллим к секции
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      className={clsx(styles.header, scrolled && styles.scrolled)}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.container}>
        {isHomePage ? (
          <span className={styles.logo}>
            <span className="gradient-text">First Present</span>
          </span>
        ) : (
          <Link href="/" className={styles.logo}>
            <span className="gradient-text">First Present</span>
          </Link>
        )}

        <nav className={styles.nav}>
          <button onClick={about}>О нас</button>
          <button onClick={() => scrollToSection('pricing')}>Каталог</button>
          <button onClick={services}>Услуги</button>
          <button onClick={() => scrollToSection('contact')}>Контакты</button>
        </nav>

        <Button
          variant="secondary"
          size="md"
          onClick={documentation}
        >
          Документация
        </Button>
      </div>
    </motion.header>
  );
};


