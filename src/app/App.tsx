import { ContactModalProvider } from '@app/context/ContactModalContext';
import { store } from '@app/store';
import { Provider } from 'react-redux';
import { AppRouter } from './router';

export const App = () => {
  return (
    <Provider store={store}>
      <ContactModalProvider>
        <AppRouter />
      </ContactModalProvider>
    </Provider>
  );
};



