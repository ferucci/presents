import { useNavigation } from '@/hooks/useNavigation';
import { Button } from '@shared/ui';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const { about, services, documentation } = useNavigation();

  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Если не на главной странице - переходим на главную с якорем
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
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
          <Link to="/" className={styles.logo}>
            <span className="gradient-text">First Present</span>
          </Link>
        )}

        <nav className={styles.nav}>
          <button onClick={() => scrollToSection('features')}>Опции</button>
          <button onClick={() => scrollToSection('pricing')}>Книги</button>
          <button onClick={services}>Услуги</button>
          <button onClick={about}>О нас</button>
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


