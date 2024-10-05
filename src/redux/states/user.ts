import { User } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getLocalStorageItem } from '@/utilities';

const parseUserFromLocalStorage = () => {
  const storedUser = getLocalStorageItem('user');
  return storedUser ? JSON.parse(storedUser) : null;
};

const localStorageUser = parseUserFromLocalStorage();

export const UserInitialState: User = {
  account: {
    id: localStorageUser?.account?.id || '',
    username: localStorageUser?.account?.username || '',
    photo: localStorageUser?.account?.photo || '',
    email: localStorageUser?.account?.email || ''
  },
  person: {
    id: localStorageUser?.person?.id || '',
    name: localStorageUser?.person?.name || '',
    phone: localStorageUser?.person?.phone || '',
    address: localStorageUser?.person?.address || ''
  },
  role: {
    id: localStorageUser?.role?.id || '',
    name: localStorageUser?.role?.name || ''
  }
};

export const userSlice = createSlice({
  name: 'user',
  initialState: UserInitialState,
  reducers: {
    createUser: (state, action: PayloadAction<User>) => {
      state.account = action.payload.account;
      state.person = action.payload.person;
      state.role = action.payload.role;
    },
    modifyUser: (state, action) => {
      Object.assign(state, action.payload);
    },
    resetUser: () => {
      return UserInitialState;
    }
  }
});

export const { createUser, modifyUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
