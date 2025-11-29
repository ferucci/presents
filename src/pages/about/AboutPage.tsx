import { useContactModal } from '@app/context/ContactModalContext';
import { Button } from '@shared/ui';
import { ContactModalForm } from '@features/contact-modal';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { motion } from 'framer-motion';
import { FC } from 'react';
import styles from './About.module.scss';

const AboutPage: FC = () => {
  const { isOpen, openModal, closeModal } = useContactModal();

  const values = [
    {
      icon: '🎨',
      title: 'Творчество',
      description: 'Каждый румбокс — это произведение искусства, созданное с любовью и вниманием к деталям.',
    },
    {
      icon: '✨',
      title: 'Качество',
      description: 'Мы используем только лучшие материалы и тщательно прорабатываем каждую деталь.',
    },
    {
      icon: '❤️',
      title: 'Страсть',
      description: 'Мы влюблены в свое дело и хотим поделиться этой магией с вами.',
    },
    {
      icon: '🤝',
      title: 'Поддержка',
      description: 'Мы всегда готовы помочь вам на каждом этапе создания вашего миниатюрного мира.',
    },
  ];

  const team = [
    {
      name: 'Мария',
      role: 'Основатель и мастер',
      description: 'Создает уникальные дизайны и следит за качеством каждого румбокса.',
      icon: '👩‍🎨',
    },
    {
      name: 'Алексей',
      role: 'Технический директор',
      description: 'Разрабатывает инструкции и видео-гайды для удобной сборки.',
      icon: '👨‍💻',
    },
    {
      name: 'Елена',
      role: 'Дизайнер',
      description: 'Создает визуальные концепции и подбирает материалы для каждого проекта.',
      icon: '👩‍🎨',
    },
  ];

  const stats = [
    { number: '500+', label: 'Собранных румбоксов' },
    { number: '50+', label: 'Довольных клиентов' },
    { number: '15+', label: 'Уникальных дизайнов' },
    { number: '5', label: 'Лет опыта' },
  ];

  return (
    <>
      <Header />
      <main className={styles.page}>
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
              <div className={styles.statsGrid}>
                {stats.map((stat, index) => (
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
                    Всё началось с любви к книгам и желания оживить те миры, которые мы
                    представляли, читая любимые произведения. Мы поняли, что можем создать
                    не просто сувенир, а настоящий портал в мир вашей любимой истории.
                  </p>
                  <p>
                    Каждый румбокс — это результат кропотливой работы наших мастеров. Мы
                    тщательно изучаем каждую книгу, чтобы воссоздать атмосферу и детали,
                    которые делают историю особенной. От выбора цветов до создания
                    миниатюрных аксессуаров — всё продумано до мелочей.
                  </p>
                  <p>
                    Наша миссия — дать вам возможность не просто прочитать книгу, а
                    погрузиться в её мир, создав его своими руками. Мы верим, что каждый
                    румбокс несет в себе частичку магии и становится особенным
                    воспоминанием.
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
            </motion.div>

            {/* Команда */}
            <motion.div
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
            </motion.div>

            {/* CTA */}
            <motion.div
              className={styles.ctaSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <div className={styles.ctaCard}>
                <h2>
                  Готовы создать свой <span className="gradient-text">миниатюрный мир</span>?
                </h2>
                <p>
                  Присоединяйтесь к нашему сообществу творцов и создавайте волшебство
                  своими руками
                </p>
                <Button variant="secondary" size="lg" onClick={openModal}>
                  Связаться с нами
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ContactModalForm isOpen={isOpen} onClose={closeModal} />
    </>
  );
};

export { AboutPage };

