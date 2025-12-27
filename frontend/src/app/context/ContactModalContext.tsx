'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

interface ContactModalContextType {
  isOpen: boolean;
  pageSource?: string;
  productName?: string;
  openModal: (pageSource?: string, productName?: string) => void;
  closeModal: () => void;
}

// Создаем фолбэк контекст для SSR
const fallbackContext: ContactModalContextType = {
  isOpen: false,
  pageSource: undefined,
  productName: undefined,
  openModal: () => {
    // Пустая функция для SSR
  },
  closeModal: () => {
    // Пустая функция для SSR
  },
};

const ContactModalContext = createContext<ContactModalContextType>(fallbackContext);

export const ContactModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageSource, setPageSource] = useState<string | undefined>();
  const [productName, setProductName] = useState<string | undefined>();

  const openModal = (source?: string, product?: string) => {
    setPageSource(source);
    setProductName(product);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setPageSource(undefined);
    setProductName(undefined);
  };

  const contextValue = {
    isOpen,
    pageSource,
    productName,
    openModal,
    closeModal,
  };

  return (
    <ContactModalContext.Provider value={contextValue}>
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => {
  return useContext(ContactModalContext);
};