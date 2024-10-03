import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/models';

const initialState: AuthState = {
  isAuthenticated: typeof window !== 'undefined' && localStorage.getItem('token') !== null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  account: typeof window !== 'undefined' ? localStorage.getItem('account') : null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createLoginAuth: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.account = action.payload;
      localStorage.setItem('token', action.payload);
      localStorage.setItem('account', action.payload);
    },
    createLogoutAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.account = null;
      localStorage.removeItem('token');
      localStorage.removeItem('account');
    }
  }
});

export const { createLoginAuth, createLogoutAuth } = authSlice.actions;

export default authSlice.reducer;
