import { contactReducer } from '@features/contact-form';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;




