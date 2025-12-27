'use client';

import { ContactForm } from '@features/contact-form';
import { motion } from 'framer-motion';
import { FC } from 'react';
import styles from './Contact.module.scss';

export const Contact: FC = () => {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2><span className="gradient-text">Свяжитесь </span>с нами!</h2>
          <p>Оставьте заявку, мы свяжимся с вами в ближайшее время</p>
        </motion.div>

        <div className={styles.content}>
          <motion.div
            className={styles.info}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📧</div>
              <div>
                <h4>Email</h4>
                <p>offers@usoltev.ru</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📞</div>
              <div>
                <h4>Телефон</h4>
                <p>+7 (985) 165-55-85</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📍</div>
              <div>
                <h4>Адрес</h4>
                <p>Красногорск, ул. Волоколамское шоссе, д. 3</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>⏰</div>
              <div>
                <h4>Режим работы</h4>
                <p>Пн-Пт: 9:00 - 21:00</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={styles.formWrapper}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
};




