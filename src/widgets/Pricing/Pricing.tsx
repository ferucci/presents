import { products } from '@entities/product';
import { Button, Card } from '@shared/ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Pricing.module.scss';

export const Pricing: FC = () => {
  const navigate = useNavigate();

  const handleViewDetails = (index: number) => {
    navigate(`/product/${index}`);
  };

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
          {products.map((variant, index) => (
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
      </div>
    </section>
  );
};


