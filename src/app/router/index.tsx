import { AboutPage } from '@pages/about';
import { CatalogPage } from '@pages/catalog';
import { DocumentationPage } from '@pages/documentation';
import { FAQPage } from '@pages/faq';
import { LandingPage } from '@pages/landing';
import { ProductDetailPage } from '@pages/product-detail';
import { ServicesPage } from '@pages/services';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ScrollToTop } from './ScrollToTop';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};


