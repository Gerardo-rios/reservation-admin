import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './states/user';
import { authSlice } from './states/auth';

export interface AppStore {
  user: any;
  auth: {
    isAuthenticated: boolean;
    token: string | null;
  };
}

export default configureStore<AppStore>({
  reducer: {
    user: userSlice.reducer,
    auth: authSlice.reducer
  }
});
