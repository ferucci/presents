'use client';

import { Card } from '@shared/ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useApi } from '@hooks/useApi';
import { featuresApi, Feature } from '@shared/api';
import styles from './Features.module.scss';


export const Features: FC = () => {
  const { data: featuresData, loading } = useApi<Feature[]>(
    () => featuresApi.getAll(),
    []
  );

  const features = featuresData || [];

  return (
    <section id="features" className={styles.features}>
      <div className={styles.background}>
        <div className={styles.gradient2} />
      </div>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Миниатюрный мир — большое
            <span className="gradient-text"> волшебство</span>
          </h2>
          <p>
            Наши румбоксы — это не просто интерьерный декор. Это уникальное хобби, развивающая игра и произведение искусства, которое несет пользу и радость как детям, так и взрослым.
          </p>
        </motion.div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '2rem' }}>Загрузка...</p>
        ) : (
          <div className={styles.grid}>
            {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Card hover>
                <div className={styles.icon}>{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </Card>
            </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};


