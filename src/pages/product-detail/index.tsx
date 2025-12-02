import { useNavigation } from '@/hooks/useNavigation';
import { InfoDetails } from '@/widgets/InfoDetails/InfoDetails';
import { useContactModal } from '@app/context/ContactModalContext';
import { products } from '@entities/product';
import { ContactModalForm } from '@features/contact-modal';
import { Button, ImageModal, ImageSlider } from '@shared/ui';
import { Footer } from '@widgets/Footer';
import { Header } from '@widgets/Header';
import { motion } from 'framer-motion';
import { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.scss';

export const ProductDetailPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { isOpen: isContactModalOpen, openModal: openContactModal, closeModal: closeContactModal } = useContactModal();
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [imageModalIndex, setImageModalIndex] = useState(0);
  const { catalog } = useNavigation();

  const productIndex = id ? parseInt(id, 10) : -1;
  const product = products[productIndex];

  if (!product) {
    return null;
  }

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
        <section className={styles.detail}>
          <div className={styles.container}>
            {/* Хлебные крошки */}
            <motion.div
              className={styles.breadcrumbs}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <a href="/">Главная</a>
              <span className={styles.separator}>→</span>
              <a href="/catalog">Каталог</a>
              <span className={styles.separator}>→</span>
              <span>{product.name}</span>
            </motion.div>

            {/* Основной контент */}
            <div className={styles.content}>
              {/* Изображение */}
              <motion.div
                className={styles.imageSection}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                {product.popular && (
                  <div className={styles.badge}>Популярный</div>
                )}
                <ImageSlider
                  images={product.images}
                  alt={product.name}
                  onImageClick={handleImageClick}
                />
              </motion.div>

              {/* Информация */}
              <motion.div
                className={styles.infoSection}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1>{product.name}</h1>

                <div className={styles.price}>
                  <span className={styles.priceAmount}>{product.price}</span>
                </div>

                <div className={styles.features}>
                  <h3>Что входит в набор:</h3>
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>
                        <span className={styles.check}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.actions}>
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    onClick={openContactModal}
                  >
                    Забронировать
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    fullWidth
                    onClick={catalog}
                  >
                    Вернуться к каталогу
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Описание */}
            <motion.div
              className={styles.description}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h2>
                О <span className="gradient-text">румбоксе</span>
              </h2>

              <div className={styles.textBlock}>
                <p>
                  Каждый румбокс — это миниатюрное произведение искусства,
                  созданное вручную нашими мастерами. Мы тщательно
                  прорабатываем каждую деталь, чтобы воссоздать атмосферу
                  любимой книги. От выбора текстиля до создания крошечных
                  аксессуаров — всё делается с любовью и вниманием к мелочам.
                </p>

                <p>
                  Процесс сборки румбокса — это увлекательное путешествие в мир
                  вашей любимой истории. В комплекте вы найдете все необходимые
                  элементы, детальную пошаговую инструкцию с фотографиями и
                  QR-код для доступа к видео-гайду. Сборка не требует
                  специальных навыков — только желание творить и немного
                  свободного времени.
                </p>

                <p>
                  Готовый румбокс станет изюминкой вашего интерьера. Светящиеся
                  элементы создают волшебную атмосферу в вечернее время,
                  превращая композицию в настоящий ночник. Это не просто декор —
                  это частичка магии, которую вы создали своими руками, и она
                  будет радовать вас долгие годы.
                </p>
              </div>

              {/* Дополнительная информация */}
              <InfoDetails />

            </motion.div>

            {/* CTA блок */}
            <motion.div
              className={styles.cta}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3>Готовы создать свой миниатюрный мир?</h3>
              <p>
                Оставьте заявку, и мы свяжемся с вами для уточнения деталей
              </p>
              <Button variant="secondary" size="lg" onClick={openContactModal}>
                Забронировать румбокс
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={handleCloseImageModal}
        images={product.images}
        currentIndex={imageModalIndex}
        onIndexChange={handleImageIndexChange}
        alt={product.name}
      />
      <ContactModalForm isOpen={isContactModalOpen} onClose={closeContactModal} />
    </>
  );
};

