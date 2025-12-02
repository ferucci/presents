import { createContext, ReactNode, useContext, useState } from 'react';

interface ContactModalContextType {
  isOpen: boolean;
  pageSource?: string;
  productName?: string;
  openModal: (pageSource?: string, productName?: string) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

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

  return (
    <ContactModalContext.Provider value={{ isOpen, pageSource, productName, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
};

export const useContactModal = () => {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return context;
};

