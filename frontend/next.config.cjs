const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // Поддержка SCSS модулей
  sassOptions: {
    additionalData: `@use "@/app/styles/variables.scss" as *;`,
    // Отключаем предупреждения о глобальных селекторах для variables.scss
    silenceDeprecations: ['legacy-js-api'],
  },

  // Алиасы путей (совместимость с текущей структурой)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/page-components'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
    };
    return config;
  },

  // Оптимизация изображений
  images: {
    domains: ['first-present.ru'], // Добавьте ваш домен
    formats: ['image/avif', 'image/webp'],
  },

  // Экспериментальные функции для лучшей производительности
  experimental: {
    optimizeCss: true,
  },

  // Для Docker: создание standalone output
  output: 'standalone',
};

module.exports = nextConfig;

