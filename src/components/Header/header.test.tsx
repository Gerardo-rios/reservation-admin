import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './header.component';

jest.mock('./dark-mode-switcher.component', () => {
  return jest.fn();
});
jest.mock('./dropdown-notification.component', () => {
  return jest.fn();
});
jest.mock('./dropdown-user.component', () => {
  return jest.fn();
});

describe('Header Component', () => {
  beforeEach(() => {
    render(<Header />);
  });

  it('renders the header component', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('displays the correct title', () => {
    expect(screen.getByText('Business name of the manager')).toBeInTheDocument();
  });

  it('displays the correct subtitle', () => {
    expect(screen.getByText('Admin Page')).toBeInTheDocument();
  });

  it('renders the DarkModeSwitcher component', () => {
    expect(screen.getByTestId('dark-mode-switcher')).toBeInTheDocument();
  });

  it('renders the DropdownNotification component', () => {
    expect(screen.getByTestId('dropdown-notification')).toBeInTheDocument();
  });

  it('renders the DropdownUser component', () => {
    expect(screen.getByTestId('dropdown-user')).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('sticky top-0 z-999 flex w-full border-b border-stroke bg-white dark:border-stroke-dark dark:bg-gray-dark');
  });
});
