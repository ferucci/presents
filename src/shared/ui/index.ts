/**
 * Barrel-файл для экспорта всех UI компонентов
 * 
 * ВАЖНО: Всегда импортируйте компоненты через этот файл!
 * ✅ Правильно:   import { Button, Modal } from '@shared/ui';
 * ❌ Неправильно: import { Button } from '@shared/ui/Button/Button';
 * 
 * Причины:
 * 1. Избежание дублирования импортов стилей (CSS Modules)
 * 2. Единая точка входа для всех компонентов
 * 3. Упрощение рефакторинга и поддержки кода
 * 4. ESLint правило no-restricted-imports следит за этим
 */

export { Button } from './Button';
export { Card } from './Card';
export { ImageModal } from './ImageModal';
export { ImageSlider } from './ImageSlider';
export { Input } from './Input';
export { Modal } from './Modal';
export { SEO } from './SEO';
export type { SEOProps } from './SEO';



