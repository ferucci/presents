import { useContactModal } from '@app/context/ContactModalContext';
import { Button } from '@shared/ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import styles from './Hero.module.scss';

export const Hero: FC = () => {
  const { openModal } = useContactModal();

  return (
    <section className={styles.hero}>
      <div className={styles.background}>
        <div className={styles.gradient1} />
        <div className={styles.gradient2} />
        <div className={styles.gradient3} />
      </div>

      <div className={styles.container}>
        <motion.div
          className={styles.content}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Ваш <span className="gradient-text">румбокс</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Миниатюрный мир на вашей книжной полке, собранный вручную. Мечта для коллекционера и волшебный подарок для читателя.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button size="lg" onClick={openModal}>
              Выбрать свой румбокс
            </Button>
            <Button variant="outline" size="lg">
              Подробнее
            </Button>
          </motion.div>

          <motion.div
            className={styles.stats}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className={styles.stat}>
              <span className={styles.statNumber}>150+</span>
              <span className={styles.statLabel}>Уголков создано</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Лучшая работа</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5</span>
              <span className={styles.statLabel}>Лет магии в деталях</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};


