import { apiClient } from '../config';

export interface Faq {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export const faqApi = {
  async getAll(): Promise<Faq[]> {
    const response = await apiClient.get<Faq[]>('/faq');
    return response.data;
  },

  async getById(id: number): Promise<Faq> {
    const response = await apiClient.get<Faq>(`/faq/${id}`);
    return response.data;
  },

  async create(data: Omit<Faq, 'id'>): Promise<Faq> {
    const response = await apiClient.post<Faq>('/faq', data);
    return response.data;
  },

  async update(id: number, data: Partial<Faq>): Promise<Faq> {
    const response = await apiClient.put<Faq>(`/faq/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/faq/${id}`);
  },
};

