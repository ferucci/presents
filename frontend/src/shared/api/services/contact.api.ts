import { apiClient } from '../config';
import { ContactFormData } from '@features/contact-form/model/validation';

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: {
    id: number;
    name: string;
    email: string;
    phone?: string;
    message: string;
    pageSource?: string;
    productName?: string;
    status: string;
    createdAt: string;
  };
}

export const contactApi = {
  async submit(data: ContactFormData): Promise<ContactResponse> {
    const response = await apiClient.post<ContactResponse>('/contact', data);
    return response.data;
  },

  // Для админ панели (опционально)
  async getAll() {
    const response = await apiClient.get('/contact');
    return response.data;
  },

  async getById(id: number) {
    const response = await apiClient.get(`/contact/${id}`);
    return response.data;
  },
};

