import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import useFetchAndLoad from '@/hooks/use-fetch-and-load.hook';
import { getUser } from '@/services';
import { createUser } from '@/redux/states/user';
import Dashboard from './dashboard.component';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('@/hooks/use-fetch-and-load.hook', () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock('@/services', () => ({
  getUser: jest.fn()
}));

jest.mock('@/redux/states/user', () => ({
  createUser: jest.fn()
}));

describe('Dashboard Component', () => {
  let dispatchMock: jest.Mock;
  let callEndpointMock: jest.Mock;

  beforeEach(() => {
    dispatchMock = jest.fn();
    callEndpointMock = jest.fn();

    (useDispatch as unknown as jest.Mock).mockReturnValue(dispatchMock);
    (useSelector as unknown as jest.Mock).mockReturnValue('someAccountId');
    (useFetchAndLoad as jest.Mock).mockReturnValue({
      loading: false,
      callEndpoint: callEndpointMock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('It shows loader when loading', () => {
    (useFetchAndLoad as jest.Mock).mockReturnValue({
      loading: true,
      callEndpoint: callEndpointMock
    });

    render(<Dashboard />);

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();
  });

  test('Call dispatch when the endpoint returns a response', async () => {
    const mockUser = {
      account: {
        id: 'someAccountId',
        username: 'someUsername',
        photo: 'somePhoto',
        email: 'someEmail'
      },
      person: {
        id: 'somePersonId',
        name: 'someName',
        phone: 'somePhone',
        address: 'someAddress'
      },
      role: {
        id: 'someRoleId',
        name: 'someRoleName'
      }
    };

    callEndpointMock.mockResolvedValue({
      data: mockUser
    });

    render(<Dashboard />);

    await waitFor(() => {
      expect(callEndpointMock).toHaveBeenCalledWith(getUser('someAccountId'));
    });

    await waitFor(() => {
      expect(dispatchMock).toHaveBeenCalledWith(createUser(mockUser));
    });
  });

  test('fetchData is called when the component loads', async () => {
    render(<Dashboard />);

    await waitFor(() => {
      expect(callEndpointMock).toHaveBeenCalledWith(getUser('someAccountId'));
    });
  });
});
