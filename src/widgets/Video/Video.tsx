import { motion } from 'framer-motion';
import { FC, RefObject, useRef, useState } from 'react';
import styles from './Video.module.scss';

export const Video: FC = () => {

  const [, setIsPlaying] = useState(false);
  const videoRef: RefObject<HTMLVideoElement> = useRef<HTMLVideoElement>(null);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleDoubleClick = (): void => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch((err: Error) => {
          console.log(`Ошибка при переходе в полноэкранный режим: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <section className={styles.video}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2>
            Посмотрите, как собираются <span className="gradient-text">наши румбоксы</span>
          </h2>
          <p>Погрузитесь в процесс создания миниатюрных миров</p>
        </motion.div>

        <motion.div
          className={styles.videoWrapper}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className={styles.videoContainer}>
            <video
              ref={videoRef}
              onClick={handleVideoClick}
              onDoubleClick={handleDoubleClick}
              className={styles.videoItem}
              autoPlay={true}
              muted
              loop
              preload="metadata"
              playsInline
              poster="/src/assets/video/poster.png"
            >
              <source src="/src/assets/video/assembly-of-the-constructor.mp4" type="video/mp4" />
              Ваш браузер не поддерживает видео тег.
            </video>
          </div>
        </motion.div>

        <motion.div
          className={styles.features}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className={styles.feature}>
            <span className={styles.featureIcon}>✨</span>
            <span>Ручная работа</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>🎨</span>
            <span>Детальная проработка</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>💡</span>
            <span>Светящиеся элементы</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

