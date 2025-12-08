import { faqData } from '@/data/faq';
import { generateFAQSchema } from '@shared/utils/structuredData';
import { FAQ as FAQPage } from '@widgets/FAQ';
import { Metadata } from 'next';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Часто задаваемые вопросы',
  description: 'Ответы на популярные вопросы о румбоксах: сборка, материалы, доставка, гарантии. Всё что нужно знать перед покупкой.',
  keywords: 'румбоксы FAQ, вопросы о румбоксах, сборка румбокса, доставка румбоксов',
  openGraph: {
    title: 'Часто задаваемые вопросы - Румбоксы',
    description: 'Ответы на популярные вопросы о румбоксах',
    url: '/faq',
  },
};

export default function FAQ() {
  const structuredData = generateFAQSchema(faqData);

  return (
    <>
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <FAQPage />
    </>
  );
}


