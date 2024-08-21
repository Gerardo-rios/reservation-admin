import { User } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const localStorageUser = typeof window !== 'undefined' && localStorage.getItem('user');

export const UserInitialState: User = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  account: {
    id: localStorageUser ? JSON.parse(localStorageUser).account.id : '',
    username: localStorageUser ? JSON.parse(localStorageUser).account.username : '',
    photo: localStorageUser ? JSON.parse(localStorageUser).account.photo : '',
    email: localStorageUser ? JSON.parse(localStorageUser).account.email : ''
  },
  person: {
    id: localStorageUser ? JSON.parse(localStorageUser).person.id : '',
    name: localStorageUser ? JSON.parse(localStorageUser).person.name : '',
    phone: localStorageUser ? JSON.parse(localStorageUser).person.phone : '',
    address: localStorageUser ? JSON.parse(localStorageUser).person.address : ''
  },
  role: {
    id: localStorageUser ? JSON.parse(localStorageUser).role.id : '',
    name: localStorageUser ? JSON.parse(localStorageUser).role.name : ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.token = action.payload.token;
      state.account = action.payload.account;
      state.person = action.payload.person;
      state.role = action.payload.role;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    modifyUser: (state, action) => ({ ...state, ...action.payload }),
    resetUser: () => {
      localStorage.removeItem('user');
      return UserInitialState;
    }
  }
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
