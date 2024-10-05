import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState } from '@/models';
import { getLocalStorageItem, setLocalStorageItem, removeLocalStorageItem } from '@/utilities';

const initialState: AuthState = {
  isAuthenticated: !!getLocalStorageItem('token'),
  token: getLocalStorageItem('token'),
  account: getLocalStorageItem('account')
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createLoginAuth: (state, action: PayloadAction<AuthState>) => {
      const { token, account } = action.payload;
      state.isAuthenticated = true;
      state.token = token;
      state.account = account;

      if (token) setLocalStorageItem('token', token);
      if (account) setLocalStorageItem('account', account);
    },
    createLogoutAuth: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.account = null;

      removeLocalStorageItem('token');
      removeLocalStorageItem('account');
    }
  }
});

export const { createLoginAuth, createLogoutAuth } = authSlice.actions;

export default authSlice.reducer;
