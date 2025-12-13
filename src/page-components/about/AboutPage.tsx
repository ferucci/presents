'use client';

import { useContactModal } from '@app/context/ContactModalContext';
import { ContactModalForm } from '@features/contact-modal';
import { Button } from '@shared/ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useApi } from '@hooks/useApi';
import { aboutApi, AboutStats, AboutValues } from '@shared/api';
import styles from './About.module.scss';

const AboutPage: FC = () => {
  const { isOpen, openModal, closeModal } = useContactModal();
  
  const { data: statsData, loading: statsLoading } = useApi<AboutStats[]>(
    () => aboutApi.stats.getAll(),
    []
  );
  
  const { data: valuesData, loading: valuesLoading } = useApi<AboutValues[]>(
    () => aboutApi.values.getAll(),
    []
  );
  
  const adv = statsData || [];
  const values = valuesData || [];

  return (
    <div className={styles.page}>
      <div className={styles.page}>
        <section className={styles.about}>
          <div className={styles.container}>
            {/* Заголовок */}
            <motion.div
              className={styles.header}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>
                О <span className="gradient-text">нас</span>
              </h1>
              <p className={styles.subtitle}>
                Мы создаем миниатюрные миры, которые оживляют страницы ваших любимых книг
              </p>
            </motion.div>

            {/* Статистика */}
            <motion.div
              className={styles.statsSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {statsLoading ? (
                <p style={{ textAlign: 'center', padding: '2rem' }}>Загрузка...</p>
              ) : (
                <div className={styles.statsGrid}>
                  {adv.map((stat, index) => (
                  <motion.div
                    key={index}
                    className={styles.statCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={styles.statNumber}>{stat.number}</div>
                    <div className={styles.statLabel}>{stat.label}</div>
                  </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* История */}
            <motion.div
              className={styles.storySection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className={styles.storyContent}>
                <h2>
                  Наша <span className="gradient-text">история</span>
                </h2>
                <div className={styles.storyText}>
                  <p>
                    Она началась с любви к историям — тем, что живут на страницах книг. Мы хотели поймать их неповторимую магию и подарить вам, чтобы вы могли не просто прочитать, а буквально прикоснуться к любимому миру.
                  </p>
                  <p>
                    Каждая наша модель — это готовый портал в другую реальность. Наши мастера, вдохновляясь литературными вселенными, кропотливо воссоздают их атмосферу и ключевые детали. От идеальных оттенков до миниатюрных аксессуаров — каждая деталь продумана, чтобы история ожила прямо перед вами.
                  </p>
                  <p>
                    Наша миссия — дать вам возможность не просто помечтать о другом мире, а поселить его у себя дома. Мы верим, что каждая готовая сцена несет в себе частичку волшебства книги и становится вашим личным, осязаемым воспоминанием.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Ценности */}
            <motion.div
              className={styles.valuesSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2>
                Наши <span className="gradient-text">ценности</span>
              </h2>
              {valuesLoading ? (
                <p style={{ textAlign: 'center', padding: '2rem' }}>Загрузка...</p>
              ) : (
                <div className={styles.valuesGrid}>
                  {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className={styles.valueCard}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className={styles.valueIcon}>{value.icon}</div>
                    <h3>{value.title}</h3>
                    <p>{value.description}</p>
                  </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Команда */}
            {/* <motion.div
              className={styles.teamSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <h2>
                Наша <span className="gradient-text">команда</span>
              </h2>
              <div className={styles.teamGrid}>
                {team.map((member, index) => (
                  <motion.div
                    key={index}
                    className={styles.teamCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={styles.teamIcon}>{member.icon}</div>
                    <h3>{member.name}</h3>
                    <div className={styles.teamRole}>{member.role}</div>
                    <p>{member.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div> */}

            {/* CTA */}
            <motion.div
              className={styles.ctaSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className={styles.ctaCard}>
                <h2>
                  Готовы заказать свой <span className="gradient-text">миниатюрный мир</span>?
                </h2>
                <p>
                  Для консультации и подбора оставьте заявку. Мы с радостью поможем найти именно то, что вы ищете.
                </p>
                <Button variant="secondary" size="lg" onClick={() => openModal('Страница "О нас"')}>
                  Оставить заявку
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      <ContactModalForm isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default AboutPage;

