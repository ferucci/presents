import { apiClient } from '../config';

export interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  gradient: string;
  order: number;
}

export const servicesApi = {
  async getAll(): Promise<Service[]> {
    const response = await apiClient.get<Service[]>('/services');
    return response.data;
  },

  async getById(id: number): Promise<Service> {
    const response = await apiClient.get<Service>(`/services/${id}`);
    return response.data;
  },

  async create(data: Omit<Service, 'id'>): Promise<Service> {
    const response = await apiClient.post<Service>('/services', data);
    return response.data;
  },

  async update(id: number, data: Partial<Service>): Promise<Service> {
    const response = await apiClient.put<Service>(`/services/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/services/${id}`);
  },
};

