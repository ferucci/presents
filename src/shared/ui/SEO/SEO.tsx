import { FC, useEffect } from 'react';

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

const DEFAULT_TITLE = 'Румбоксы - Миниатюрные книжные конструкторы';
const DEFAULT_DESCRIPTION = 'Премиальные румбоксы - миниатюрные книжные конструкторы для детей и взрослых. Создайте свой волшебный мир из любимых книг!';
const DEFAULT_OG_IMAGE = '/images/products/products.jpg';
const BASE_URL = 'https://yourdomain.com'; // Замените на ваш домен

export const SEO: FC<SEOProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  canonicalUrl,
  structuredData,
}) => {
  const fullTitle = title ? `${title} | Румбоксы` : DEFAULT_TITLE;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`;
  const fullCanonicalUrl = canonicalUrl ? `${BASE_URL}${canonicalUrl}` : BASE_URL;

  useEffect(() => {
    // Обновление title
    document.title = fullTitle;

    // Обновление или создание meta тегов
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Основные мета-теги
    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph теги
    updateMetaTag('og:title', fullTitle, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullOgImage, true);
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:url', fullCanonicalUrl, true);
    updateMetaTag('og:site_name', 'Румбоксы', true);
    updateMetaTag('og:locale', 'ru_RU', true);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', fullCanonicalUrl);

    // Структурированные данные (JSON-LD)
    // Удаляем старые структурированные данные
    const oldScriptTags = document.querySelectorAll('script[type="application/ld+json"]');
    oldScriptTags.forEach(tag => tag.remove());

    if (structuredData) {
      // Если structuredData - массив, создаем отдельный script для каждого элемента
      const dataArray = Array.isArray(structuredData) ? structuredData : [structuredData];

      dataArray.forEach((data) => {
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('type', 'application/ld+json');
        scriptTag.textContent = JSON.stringify(data);
        document.head.appendChild(scriptTag);
      });
    }
  }, [fullTitle, description, keywords, fullOgImage, ogType, fullCanonicalUrl, structuredData]);

  return null;
};

