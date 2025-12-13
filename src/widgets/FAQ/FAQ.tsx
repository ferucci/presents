'use client';

import { useContactModal } from '@/app/context/ContactModalContext';
import { ContactModalForm } from '@/features/contact-modal';
import { Button } from '@/shared/ui';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import { useApi } from '@hooks/useApi';
import { faqApi, Faq } from '@shared/api';
import styles from './FAQ.module.scss';

export const FAQ: FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { isOpen, openModal, closeModal } = useContactModal();
  
  const { data: faqData, loading } = useApi<Faq[]>(
    () => faqApi.getAll(),
    []
  );

  const faqs = faqData || [];

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faq}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>
            Часто задаваемые <span className="gradient-text">вопросы</span>
          </h1>
          <p>Ответы на самые популярные вопросы о румбоксах</p>
        </motion.div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '2rem' }}>Загрузка...</p>
        ) : (
          <div className={styles.list}>
            {faqs.map((item, index) => (
            <motion.div
              key={index}
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <button
                className={styles.question}
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span
                  className={`${styles.icon} ${openIndex === index ? styles.iconOpen : ''
                    }`}
                >
                  ▼
                </span>
              </button>

              <motion.div
                className={styles.answer}
                initial={false}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.answerContent}>{item.answer}</div>
              </motion.div>
            </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3>Не нашли ответ на свой вопрос?</h3>
          <p>Свяжитесь с нами — мы с радостью ответим!</p>
          <Button size="lg" onClick={() => openModal('Страница "FAQ"')} >
            Написать нам
          </Button>
        </motion.div>
      </div>
      <ContactModalForm isOpen={isOpen} onClose={closeModal} />
    </section>
  );
};



