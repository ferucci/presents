import { Product } from '@entities/product/model/types';
import { apiClient } from '../config';

export const productsApi = {
  // Получить все продукты
  async getAll(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products');
    return response.data;
  },

  // Получить один продукт по ID
  async getById(id: number): Promise<Product> {
    const response = await apiClient.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Получить популярные продукты
  async getPopular(): Promise<Product[]> {
    const response = await apiClient.get<Product[]>('/products/popular');
    return response.data;
  },

  // Создать продукт (для админа)
  async create(data: Omit<Product, 'id'>): Promise<Product> {
    const response = await apiClient.post<Product>('/products', data);
    return response.data;
  },

  // Обновить продукт (для админа)
  async update(id: number, data: Partial<Product>): Promise<Product> {
    const response = await apiClient.put<Product>(`/products/${id}`, data);
    return response.data;
  },

  // Удалить продукт (для админа)
  async delete(id: number): Promise<void> {
    await apiClient.delete(`/products/${id}`);
  },
};

