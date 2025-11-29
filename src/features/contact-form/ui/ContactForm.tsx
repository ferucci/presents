import { RootState } from '@app/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@shared/ui';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { submitFailure, submitStart, submitSuccess } from '../model/contactSlice';
import { ContactFormData, contactSchema } from '../model/validation';
import styles from './ContactForm.module.scss';

export const ContactForm: FC = () => {
  const dispatch = useDispatch();
  const { isSubmitting, success, error } = useSelector((state: RootState) => state.contact);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    dispatch(submitStart());

    try {
      // Имитация отправки данных на сервер
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Отправленные данные:', data);
      dispatch(submitSuccess());
      reset();

      setTimeout(() => {
        dispatch(submitFailure(''));
      }, 3000);
    } catch (err) {
      dispatch(submitFailure('Ошибка при отправке формы'));
    }
  };

  return (
    <motion.form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
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

      <div className={styles.textareaWrapper}>
        <label className={styles.label}>Сообщение</label>
        <textarea
          className={styles.textarea}
          placeholder="Расскажите о вашем проекте..."
          rows={5}
          {...register('message')}
        />
        {errors.message && (
          <span className={styles.error}>{errors.message.message}</span>
        )}
      </div>

      <Button
        type="submit"
        fullWidth
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправка...' : 'Отправить заявку'}
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
    </motion.form>
  );
};




