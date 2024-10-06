import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownUser from './dropdown-user.component';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { User } from '@/models';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: ''
    };
  }
}));

const mockedUser: User = {
  account: {
    id: '1',
    username: 'juancho_ripan',
    photo: 'https://randomuser.me/api/portraits',
    email: 'test_mail@gmail.com'
  },
  person: {
    id: '1',
    name: 'Juancho Ripan',
    phone: '123456789',
    address: 'Test Address'
  },
  role: {
    id: '1',
    name: 'Admin'
  }
};

const mockStore = configureStore([]);
const store = mockStore({
  auth: { isAuthenticated: true, token: 'test_token' },
  user: mockedUser
});

describe('DropdownUser Component', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <DropdownUser />
      </Provider>
    );
  });

  it('displays the user image', () => {
    expect(screen.getByAltText('User')).toBeInTheDocument();
  });

  it('displays the user name', () => {
    expect(screen.getByText('Juancho Ripan')).toBeInTheDocument();
  });

  it('toggles dropdown when clicked', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(screen.getByText('juancho_ripan')).toBeInTheDocument();
    fireEvent.click(link);
    expect(screen.queryByText('juancho_ripan')).not.toBeInTheDocument();
  });

  it('displays correct user information in dropdown', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(screen.getByText('test_mail@gmail.com')).toBeInTheDocument();
  });

  it('displays logout button in dropdown', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
