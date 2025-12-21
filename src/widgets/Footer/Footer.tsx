'use client';

import { useNavigation } from '@/hooks/useNavigation';
import { TELEGRAM_URL } from '@/shared/utils/vars';
import { FC } from 'react';
import styles from './Footer.module.scss';

export const Footer: FC = () => {

  const { about, services, faq, contact, documentation, privacy } = useNavigation();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.column}>
            <h4 className="gradient-text">First Present</h4>
            <p>Подарок, который понравится на 100% — это не миф. <br />Это ваш следующий подарок.</p>
          </div>

          <div className={styles.column}>
            <h5>Компания</h5>
            <ul>
              <li><button onClick={about}>О нас</button></li>
              <li><button onClick={services}>Услуги</button></li>
              <li><button onClick={contact}>Контакты</button></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h5>Соцсети</h5>
            <ul>
              <li><a href={TELEGRAM_URL}>Telegram</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h5>Поддержка</h5>
            <ul>
              <li><button onClick={faq}>FAQ</button></li>
              <li><button onClick={documentation}>Документация</button></li>
              <li><button onClick={privacy}>Политика</button></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2025 First Present. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};


