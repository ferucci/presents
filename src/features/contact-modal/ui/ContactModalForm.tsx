import { RootState } from '@app/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input, Modal } from '@shared/ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitFailure, submitStart, submitSuccess } from '@features/contact-form/model/contactSlice';
import { ContactModalFormData, contactModalSchema, contactTopics } from '../model/validation';
import styles from './ContactModalForm.module.scss';

interface ContactModalFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModalForm: FC<ContactModalFormProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { isSubmitting, success, error } = useSelector((state: RootState) => state.contact);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactModalFormData>({
    resolver: zodResolver(contactModalSchema),
  });

  const onSubmit = async (data: ContactModalFormData) => {
    dispatch(submitStart());

    try {
      // Имитация отправки данных на сервер
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Отправленные данные:', data);
      dispatch(submitSuccess());
      reset();

      setTimeout(() => {
        dispatch(submitFailure(''));
        onClose();
      }, 2000);
    } catch (err) {
      dispatch(submitFailure('Ошибка при отправке формы'));
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <div className={styles.formWrapper}>
        <h2 className={styles.title}>
          Связаться с <span className="gradient-text">нами</span>
        </h2>
        <p className={styles.subtitle}>
          Заполните форму, и мы свяжемся с вами в ближайшее время
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            label="Ваше имя"
            placeholder="Иван Иванов"
            error={errors.name?.message}
            {...register('name')}
          />

          <Input
            label="Email"
            type="email"
            placeholder="ivan@example.com"
            error={errors.email?.message}
            {...register('email')}
          />

          <Input
            label="Телефон (необязательно)"
            placeholder="+7 (999) 123-45-67"
            error={errors.phone?.message}
            {...register('phone')}
          />

          <div className={styles.selectWrapper}>
            <label className={styles.label}>Тема обращения</label>
            <select
              className={`${styles.select} ${errors.topic ? styles.error : ''}`}
              {...register('topic')}
            >
              <option value="">Выберите тему</option>
              {contactTopics.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </select>
            {errors.topic && (
              <span className={styles.errorText}>{errors.topic.message}</span>
            )}
          </div>

          <div className={styles.textareaWrapper}>
            <label className={styles.label}>Сообщение</label>
            <textarea
              className={`${styles.textarea} ${errors.message ? styles.error : ''}`}
              placeholder="Расскажите о вашем вопросе или заказе..."
              rows={5}
              {...register('message')}
            />
            {errors.message && (
              <span className={styles.errorText}>{errors.message.message}</span>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Отправить'}
          </Button>

          {success && (
            <motion.div
              className={styles.successMessage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✓ Спасибо! Мы свяжемся с вами в ближайшее время.
            </motion.div>
          )}

          {error && (
            <motion.div
              className={styles.errorMessage}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✗ {error}
            </motion.div>
          )}
        </form>
      </div>
    </Modal>
  );
};

