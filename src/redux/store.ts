import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './states/user';
import authReducer from './states/auth';

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
    auth: authReducer
  }
});
