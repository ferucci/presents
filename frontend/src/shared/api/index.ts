// Экспорт всех API сервисов
export { apiClient, API_BASE_URL } from './config';
export { productsApi } from './services/products.api';
export { featuresApi } from './services/features.api';
export { faqApi } from './services/faq.api';
export { servicesApi } from './services/services.api';
export { aboutApi } from './services/about.api';
export { contactApi } from './services/contact.api';

// Экспорт типов
export type { Feature } from './services/features.api';
export type { Faq } from './services/faq.api';
export type { Service } from './services/services.api';
export type { AboutStats, AboutTeam, AboutValues } from './services/about.api';
export type { ContactResponse } from './services/contact.api';
