import axios, { AxiosError, AxiosInstance } from 'axios';

// Базовый URL API
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// Создание axios instance с базовой конфигурацией
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor для обработки ошибок
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Логирование ошибок в development
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response?.data || error.message);
    }

    // Обработка специфичных ошибок
    if (error.response?.status === 429) {
      console.error('Слишком много запросов. Пожалуйста, подождите.');
    }

    return Promise.reject(error);
  }
);

