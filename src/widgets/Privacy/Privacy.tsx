'use client';

import { privacyData } from '@/data/privacy';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import styles from './Privacy.module.scss';

export const Privacy: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleSection = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.privacy}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>
            Политика <span className="gradient-text">конфиденциальности</span>
          </h1>
          <p>Информация о том, как мы собираем, используем и защищаем ваши персональные данные</p>
        </motion.div>

        <div className={styles.list}>
          {privacyData.map((item, index) => (
            <motion.div
              key={index}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <button
                className={styles.title}
                onClick={() => toggleSection(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.titleText}>{item.title}</span>
                <span
                  className={`${styles.icon} ${openIndex === index ? styles.iconOpen : ''}`}
                >
                  ▼
                </span>
              </button>

              <motion.div
                className={styles.content}
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.contentText}>{item.content}</div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.footer}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>Последнее обновление: {new Date().toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </motion.div>
      </div>
    </section>
  );
};


