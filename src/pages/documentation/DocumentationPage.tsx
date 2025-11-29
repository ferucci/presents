import { imagesDocs, roomboxAdv, tips } from '@/data/documentationPage';
import { useContactModal } from '@app/context/ContactModalContext';
import { ContactModalForm } from '@features/contact-modal';
import { Button, ImageModal, ImageSlider } from '@shared/ui';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { motion } from 'framer-motion';
import { FC, useCallback, useState } from 'react';
import styles from './Documentation.module.scss';

const DocumentationPage: FC = () => {
  const { isOpen: isContactModalOpen, openModal: openContactModal, closeModal: closeContactModal } = useContactModal();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalIndex, setImageModalIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setImageModalIndex(index);
    setIsImageModalOpen(true);
  };

  const handleImageIndexChange = (index: number) => {
    setImageModalIndex(index);
  };

  const handleCloseImageModal = useCallback(() => {
    setIsImageModalOpen(false);
  }, []);



  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.documentation}>
          <div className={styles.container}>
            {/* Заголовок */}
            <motion.div
              className={styles.header}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>
                Документация по <span className="gradient-text">сборке румбокса</span>
              </h1>
              <p className={styles.subtitle}>
                Всё, что нужно знать для успешной сборки вашего миниатюрного мира
              </p>
            </motion.div>

            <div className={styles.documentation__hero}>

              {/* Слайдер с изображениями */}
              <motion.div
                className={styles.sliderSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <ImageSlider
                  images={imagesDocs}
                  alt="Примеры готовых румбоксов"
                  onImageClick={handleImageClick}
                />
              </motion.div>

              {/* Советы по сборке */}
              <motion.div
                className={styles.tipsSection}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <div className={styles.tipsGrid}>
                  {tips.map((tip, index) => (
                    <motion.div
                      key={index}
                      className={styles.tipCard}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className={styles.tipIcon}>{tip.icon}</div>
                      <h3>{tip.title}</h3>
                      <p>{tip.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Элементы румбокса */}
            <motion.div
              className={styles.elementsSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h2>
                Что входит в <span className="gradient-text">комплект</span>
              </h2>
              <div className={styles.elementsGrid}>
                {roomboxAdv.map((element, index) => (
                  <motion.div
                    key={index}
                    className={styles.elementCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className={styles.elementIcon}>{element.icon}</div>
                    <h3>{element.name}</h3>
                    <p>{element.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Скидка для друга */}
            <motion.div
              className={styles.discountSection}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className={styles.discountCard}>
                <div className={styles.discountIcon}>🎁</div>
                <h2>
                  Приведи друга — получи <span className="gradient-text">скидку 15%</span>
                </h2>
                <p>
                  Закажите румбокс вместе с другом и получите скидку 15% на оба заказа!
                  Это отличная возможность создать миниатюрные миры вместе и сэкономить.
                </p>
                <ul className={styles.discountList}>
                  <li>✓ Скидка действует на оба заказа</li>
                  <li>✓ Можно выбрать разные румбоксы</li>
                  <li>✓ Скидка применяется автоматически</li>
                  <li>✓ Действует постоянно</li>
                </ul>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={openContactModal}
                >
                  Заказать со скидкой
                </Button>
              </div>
            </motion.div>

            {/* Дополнительная информация */}
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
                <p>Готовая подарочная коробка в комплекте</p>
              </div>
              <div className={styles.infoCard}>
                <span className={styles.infoIcon}>🛠️</span>
                <h4>Инструменты</h4>
                <p>Всё необходимое уже в наборе</p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={handleCloseImageModal}
        images={imagesDocs}
        currentIndex={imageModalIndex}
        onIndexChange={handleImageIndexChange}
        alt="Примеры готовых румбоксов"
      />
      <ContactModalForm isOpen={isContactModalOpen} onClose={closeContactModal} />
    </>
  );
};

export { DocumentationPage };

