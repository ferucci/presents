import { motion } from 'framer-motion';
import { FC } from 'react';
import styles from './InfoDetails.module.scss';

export const InfoDetails: FC = () => {

  return (
    <motion.div
      className={styles.infoSection}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <div className={styles.infoCard}>
        <span className={styles.infoIcon}>⏱️</span>
        <h4>Время сборки</h4>
        <p>8-15 часов увлекательного творчества</p>
      </div>
      <div className={styles.infoCard}>
        <span className={styles.infoIcon}>📏</span>
        <h4>Размеры</h4>
        <p>Компактные габариты для любого пространства</p>
      </div>
      <div className={styles.infoCard}>
        <span className={styles.infoIcon}>🎁</span>
        <h4>Упаковка</h4>
        <p>Дополнительно возможно упоковать в готовую подарочную упаковку</p>
      </div>
      <div className={styles.infoCard}>
        <span className={styles.infoIcon}>🛠️</span>
        <h4>Инструменты</h4>
        <p>Всё необходимое уже в наборе</p>
      </div>

    </motion.div>
  )

}