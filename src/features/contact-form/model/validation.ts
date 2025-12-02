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
    .regex(/^[\d\s+()-]+$/, 'Некорректный номер телефона')
    .min(10, 'Номер телефона слишком короткий')
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(500, 'Сообщение слишком длинное'),
  pageSource: z.string().optional(),
  productName: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;




