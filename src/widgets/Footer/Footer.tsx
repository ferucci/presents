import { useNavigation } from '@/hooks/useNavigation';
import { FC } from 'react';
import styles from './Footer.module.scss';

export const Footer: FC = () => {

  const { about, services, faq, contact, documentation } = useNavigation();

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
              <li><a href="#">Telegram</a></li>
              <li><a href="#">LinkedIn</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h5>Поддержка</h5>
            <ul>
              <li><a href="#" onClick={faq}>FAQ</a></li>
              <li><a href="#" onClick={documentation}>Документация</a></li>
              <li><a href="#">Политика</a></li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; 2025 webdesng. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};


