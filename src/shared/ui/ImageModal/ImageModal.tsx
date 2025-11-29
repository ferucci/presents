import { Modal } from '@shared/ui/Modal';
import { FC, useCallback, useEffect, useState } from 'react';
import styles from './ImageModal.module.scss';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
  alt: string;
}

export const ImageModal: FC<ImageModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  alt,
}) => {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchEndY, setTouchEndY] = useState(0);
  const [imageIndex, setImageIndex] = useState(currentIndex);

  useEffect(() => {
    setImageIndex(currentIndex);
  }, [currentIndex]);

  const handlePrevImage = useCallback(() => {
    if (imageIndex > 0) {
      const newIndex = imageIndex - 1;
      setImageIndex(newIndex);
      onIndexChange?.(newIndex);
    }
  }, [imageIndex, onIndexChange]);

  const handleNextImage = useCallback(() => {
    if (imageIndex < images.length - 1) {
      const newIndex = imageIndex + 1;
      setImageIndex(newIndex);
      onIndexChange?.(newIndex);
    }
  }, [imageIndex, images.length, onIndexChange]);

  // Touch handlers для свайпов
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart - touchEnd;
    const distanceY = touchStartY - touchEndY;
    const minSwipeDistance = 50;

    // Если вертикальный свайп больше горизонтального - закрываем модалку
    if (Math.abs(distanceY) > Math.abs(distanceX) && Math.abs(distanceY) > minSwipeDistance) {
      if (distanceY < 0) {
        onClose();
      }
      setTouchStart(0);
      setTouchEnd(0);
      setTouchStartY(0);
      setTouchEndY(0);
      return;
    }

    // Горизонтальные свайпы для переключения изображений
    if (Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        handleNextImage();
      } else {
        handlePrevImage();
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
    setTouchStartY(0);
    setTouchEndY(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, handlePrevImage, handleNextImage]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" closeOnBackdropClick={true}>
      <div
        className={styles.imageWrapper}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[imageIndex]}
          alt={`${alt} - фото ${imageIndex + 1}`}
        />
      </div>

      {images.length > 1 && (
        <>
          <button
            className={`${styles.arrow} ${styles.arrowLeft}`}
            onClick={handlePrevImage}
            disabled={imageIndex === 0}
            aria-label="Предыдущее изображение"
          >
            ‹
          </button>
          <button
            className={`${styles.arrow} ${styles.arrowRight}`}
            onClick={handleNextImage}
            disabled={imageIndex === images.length - 1}
            aria-label="Следующее изображение"
          >
            ›
          </button>

          <div className={styles.counter}>
            {imageIndex + 1} / {images.length}
          </div>
        </>
      )}
    </Modal>
  );
};

