import { services } from '@/data/servicesPage';
import { useContactModal } from '@app/context/ContactModalContext';
import { ContactModalForm } from '@features/contact-modal';
import { Button } from '@shared/ui';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { motion } from 'framer-motion';
import { FC, useEffect, useRef } from 'react';
import styles from './Services.module.scss';

const ServicesPage: FC = () => {
  const { isOpen, openModal, closeModal } = useContactModal();
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const colors = ['rgba(139, 92, 246, 0.3)', 'rgba(59, 130, 246, 0.3)', 'rgba(236, 72, 153, 0.3)'];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        particles.forEach((other) => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <Header />
      <main className={styles.page}>
        <canvas ref={canvasRef} className={styles.canvas} />

        <section className={styles.services}>
          <div className={styles.container}>
            {/* Заголовок */}
            <motion.div
              className={styles.header}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>
                Наши <span className="gradient-text">услуги</span>
              </h1>
              <p className={styles.subtitle}>
                Мы предлагаем полный спектр услуг, чтобы сделать ваш опыт создания румбокса незабываемым
              </p>
            </motion.div>

            {/* Услуги */}
            <div className={styles.servicesGrid}>
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className={styles.serviceCard}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className={`${styles.serviceGradient} ${styles[service.gradient]}`} />
                  <div className={styles.serviceContent}>
                    <motion.div
                      className={styles.serviceIcon}
                      whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3>{service.title}</h3>
                    <p className={styles.serviceDescription}>{service.description}</p>
                    <div className={styles.servicePrice}>{service.price}</div>
                    <ul className={styles.serviceFeatures}>
                      {service.features.map((feature, idx) => (
                        <li key={idx}>
                          <span className={styles.check}>✓</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant="outline"
                      size="md"
                      fullWidth
                      onClick={() => openModal('Страница "Услуги"')}
                      className={styles.serviceButton}
                    >
                      Заказать услугу
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Дополнительная информация */}
            <motion.div
              className={styles.infoSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>⭐</div>
                <h3>Гарантия качества</h3>
                <p>
                  Мы гарантируем высокое качество всех наших услуг. Если что-то пойдет не так,
                  мы исправим это бесплатно.
                </p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>⚡</div>
                <h3>Быстрое выполнение</h3>
                <p>
                  Большинство услуг выполняются в течение 1-3 рабочих дней. Срочные заказы
                  обрабатываются в приоритетном порядке.
                </p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoIcon}>🎯</div>
                <h3>Индивидуальный подход</h3>
                <p>
                  Каждый заказ обрабатывается индивидуально. Мы учитываем все ваши пожелания
                  и создаем уникальное решение.
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              className={styles.ctaSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className={styles.ctaCard}>
                <h2>
                  Готовы заказать <span className="gradient-text">услугу</span>?
                </h2>
                <p>
                  Свяжитесь с нами, и мы поможем выбрать идеальный вариант для вашего румбокса
                </p>
                <Button variant="secondary" size="lg" onClick={() => openModal('Страница "Услуги"')}>
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

export { ServicesPage };

