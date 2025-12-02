import { z } from 'zod';

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя слишком длинное'),
  email: z
    .string()
    .email('Некорректный email адрес')
    .min(5, 'Email слишком короткий'),
  phone: z
    .string()
    .refine(
      (val) => {
        if (!val || val === '' || val === '+7') return true;
        return /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(val);
      },
      { message: 'Номер телефона должен быть в формате +7 (999) 999-99-99' }
    )
    .optional(),
  message: z
    .string()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(500, 'Сообщение слишком длинное'),
  pageSource: z.string().optional(),
  productName: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;




