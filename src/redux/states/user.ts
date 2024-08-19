import { User } from '@/models';
import { createSlice } from '@reduxjs/toolkit';

export const UserEmptyState: User = {
  token: '',
  account: {
    id: '',
    username: '',
    photo: '',
    email: ''
  },
  person: {
    id: '',
    name: '',
    phone: '',
    address: ''
  },
  role: {
    id: '',
    name: ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState: UserEmptyState,
  reducers: {
    createUser: (state, action) => action.payload,
    modifyUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: () => UserEmptyState
  }
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
