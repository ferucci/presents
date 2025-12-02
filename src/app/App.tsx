import { ContactModalProvider } from '@app/context/ContactModalContext';
import { store } from '@app/store';
import { FloatingTelegram } from '@widgets/FloatingTelegram';
import { Provider } from 'react-redux';
import { AppRouter } from './router';

export const App = () => {
  return (
    <Provider store={store}>
      <ContactModalProvider>
        <AppRouter />
        <FloatingTelegram />
      </ContactModalProvider>
    </Provider>
  );
};



