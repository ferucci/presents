'use client';

import { ContactModalProvider } from '@app/context/ContactModalContext';
import { store } from '@app/store';
import { Provider } from 'react-redux';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ContactModalProvider>
        {children}
      </ContactModalProvider>
    </Provider>
  );
}

