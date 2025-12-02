import { RootState } from '@app/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from '@shared/ui';
import { motion } from 'framer-motion';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { submitFailure, submitStart, submitSuccess } from '../model/contactSlice';
import { ContactFormData, contactSchema } from '../model/validation';
import styles from './ContactForm.module.scss';

export const ContactForm: FC = () => {
  const dispatch = useDispatch();
  const { isSubmitting, success, error } = useSelector((state: RootState) => state.contact);
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  useEffect(() => {
    const pageSource = location.pathname === '/' ? 'Главная страница (секция Контакты)' : location.pathname;
    setValue('pageSource', pageSource);
  }, [location.pathname, setValue]);

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
        placeholder="example@yandex.ru"
        error={errors.email?.message}
        {...register('email')}
      />

      <Input
        label="Телефон (необязательно)"
        placeholder="+7 (123) 456-78-90"
        error={errors.phone?.message}
        {...register('phone')}
      />

      <div className={styles.textareaWrapper}>
        <label className={styles.label}>Сообщение</label>
        <textarea
          className={styles.textarea}
          placeholder="Хочу сделать не забываемый подарок на пятнадцатилетие ребенка..."
          rows={5}
          {...register('message')}
        />
        {errors.message && (
          <span className={styles.error}>{errors.message.message}</span>
        )}
      </div>

      {/* Скрытые поля для идентификации */}
      <input type="hidden" {...register('pageSource')} />

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




