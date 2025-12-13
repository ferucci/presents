'use client';

import { Button, Card } from '@shared/ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useRouter } from 'next/navigation';
import { useApi } from '@hooks/useApi';
import { productsApi } from '@shared/api';
import { Product } from '@entities/product/model/types';
import styles from './Pricing.module.scss';

export const Pricing: FC = () => {
  const router = useRouter();
  const { data: productsData, loading } = useApi<Product[]>(
    () => productsApi.getAll(),
    []
  );
  
  const products = productsData || [];
  const MAX_DISPLAYED = 3;
  const displayedProducts = products.slice(0, MAX_DISPLAYED);
  const hasMore = products.length > MAX_DISPLAYED;

  const handleViewDetails = (index: number) => {
    router.push(`/product/${index}`);
  };

  const handleShowMore = () => {
    router.push('/catalog');
  };

  if (loading) {
    return (
      <section id="pricing" className={styles.pricing}>
        <div className={styles.container}>
          <p style={{ textAlign: 'center', padding: '2rem' }}>Загрузка продуктов...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="pricing" className={styles.pricing}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>Выберите свой  <span className="gradient-text">книжный мир</span></h2>
          <p>Каждый наш румбокс — это авторская работа. Мы тщательно прорабатываем каждую деталь, чтобы вы получили идеальное воплощение вашей любимой истории.</p>
        </motion.div>

        <div className={styles.grid}>
          {displayedProducts.map((variant, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className={styles.planWrapper}
            >
              {variant.popular && (
                <div className={styles.badge}>Популярный</div>
              )}
              <Card hover glow={variant.popular}>
                <div className={styles.planHeader}>
                  <h3>{variant.name}</h3>
                  <div className={styles.price}>
                    <span className={styles.amount}>{variant.price}</span>
                    {variant.period && <span className={styles.period}>₽ / {variant.period}</span>}
                  </div>
                </div>

                <ul className={styles.features}>
                  {variant.features.map((feature, i) => (
                    <li key={i}>
                      <span className={styles.check}>✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant={variant.popular ? 'secondary' : 'outline'}
                  fullWidth
                  onClick={() => handleViewDetails(index)}
                >
                  Подробнее
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {hasMore && (
          <motion.div
            className={styles.showMore}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Button variant="outline" size="lg" onClick={handleShowMore}>
              Показать ещё
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};


