import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцепторы для обработки запросов и ответов
api.interceptors.request.use(
  (config) => {
    // Здесь можно добавить токен авторизации
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Обработка ошибок
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Типы для API
export interface ContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

// API методы
export const contactApi = {
  submit: async (data: ContactRequest): Promise<ContactResponse> => {
    const response = await api.post<ContactResponse>('/contact', data);
    return response.data;
  },
};




