import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContactState {
  isSubmitting: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ContactState = {
  isSubmitting: false,
  success: false,
  error: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    submitStart: (state) => {
      state.isSubmitting = true;
      state.error = null;
      state.success = false;
    },
    submitSuccess: (state) => {
      state.isSubmitting = false;
      state.success = true;
    },
    submitFailure: (state, action: PayloadAction<string>) => {
      state.isSubmitting = false;
      state.error = action.payload;
    },
    resetForm: (state) => {
      state.isSubmitting = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const { submitStart, submitSuccess, submitFailure, resetForm } = contactSlice.actions;
export const contactReducer = contactSlice.reducer;




