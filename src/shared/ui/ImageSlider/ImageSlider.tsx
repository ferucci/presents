import { AnimatePresence, motion } from 'framer-motion';
import { FC, useEffect, useState } from 'react';
import styles from './ImageSlider.module.scss';

interface ImageSliderProps {
  images: string[];
  alt: string;
  onImageClick?: (index: number) => void;
}

export const ImageSlider: FC<ImageSliderProps> = ({ images, alt, onImageClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex = currentIndex + newDirection;
    if (newIndex >= 0 && newIndex < images.length) {
      setDirection(newDirection);
      setCurrentIndex(newIndex);
    }
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Touch handlers для свайпов
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      paginate(1);
    } else if (isRightSwipe) {
      paginate(-1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        paginate(-1);
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex]);

  // Проверка на placeholder
  const isPlaceholder = images[0]?.startsWith('url-with-image');

  return (
    <div className={styles.slider}>
      <div
        className={styles.mainImage}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className={styles.imageContainer}
          >
            {isPlaceholder ? (
              <div className={styles.placeholder}>
                <span className={styles.placeholderIcon}>📚</span>
                <p>Изображение {currentIndex + 1}</p>
              </div>
            ) : (
              <div className={styles.zoomWrapper} onClick={() => onImageClick?.(currentIndex)}>
                <img src={images[currentIndex]} alt={`${alt} - фото ${currentIndex + 1}`} />
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Стрелки навигации */}
        {images.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={() => paginate(-1)}
              disabled={currentIndex === 0}
              aria-label="Предыдущее изображение"
            >
              ‹
            </button>
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={() => paginate(1)}
              disabled={currentIndex === images.length - 1}
              aria-label="Следующее изображение"
            >
              ›
            </button>
          </>
        )}

        {/* Счетчик изображений */}
        {images.length > 1 && (
          <div className={styles.counter}>
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Точки навигации */}
      {images.length > 1 && (
        <div className={styles.dots}>
          {images.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${index === currentIndex ? styles.dotActive : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Перейти к изображению ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Миниатюры */}
      {images.length > 1 && (
        <div className={styles.thumbnails}>
          {images.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${index === currentIndex ? styles.thumbnailActive : ''}`}
              onClick={() => goToSlide(index)}
            >
              {isPlaceholder ? (
                <div className={styles.thumbnailPlaceholder}>
                  <span>{index + 1}</span>
                </div>
              ) : (
                <img src={image} alt={`Миниатюра ${index + 1}`} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

