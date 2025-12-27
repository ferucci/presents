// Глобальные типы приложения

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface ApiError {
  message: string;
  code: string;
  details?: unknown;
}




