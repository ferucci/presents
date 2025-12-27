import { apiClient } from '../config';

export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
  order: number;
}

export const featuresApi = {
  async getAll(): Promise<Feature[]> {
    const response = await apiClient.get<Feature[]>('/features');
    return response.data;
  },

  async getById(id: number): Promise<Feature> {
    const response = await apiClient.get<Feature>(`/features/${id}`);
    return response.data;
  },

  async create(data: Omit<Feature, 'id'>): Promise<Feature> {
    const response = await apiClient.post<Feature>('/features', data);
    return response.data;
  },

  async update(id: number, data: Partial<Feature>): Promise<Feature> {
    const response = await apiClient.put<Feature>(`/features/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/features/${id}`);
  },
};

