import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SignUpWithPassword from './form';
import SignUpComponent from './signup.component';

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

describe('SignUpWithPassword', () => {
  it('renders the name input', () => {
    render(<SignUpWithPassword />);
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
  });

  it('renders the email input', () => {
    render(<SignUpWithPassword />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('renders the password input', () => {
    render(<SignUpWithPassword />);
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  it('renders the re-enter password input', () => {
    render(<SignUpWithPassword />);
    expect(screen.getByPlaceholderText('Re-enter your password')).toBeInTheDocument();
  });

  it('renders the create account button', () => {
    render(<SignUpWithPassword />);
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });

  it('renders the Username input', () => {
    render(<SignUpWithPassword />);
    expect(screen.getByPlaceholderText('Enter your username')).toBeInTheDocument();
  });

  it('renders the Phone number input', () => {
    render(<SignUpWithPassword />);
    expect(screen.getByPlaceholderText('Enter your phone number')).toBeInTheDocument();
  });

  it('renders the Address input', () => {
    render(<SignUpWithPassword />);
    expect(screen.getByPlaceholderText('Enter your address')).toBeInTheDocument();
  });

  it('renders the Avatar input', () => {
    render(<SignUpWithPassword />);
    expect(screen.getByTestId('avatar-input')).toBeInTheDocument();
  });

  it('changes the password visibility when the eye icon is clicked', () => {
    render(<SignUpWithPassword />);
    const passwordInput = screen.getByPlaceholderText('Enter your password');
    const eyeIcon = screen.getByTestId('eye-icon-password');
    expect(passwordInput).toHaveAttribute('type', 'password');
    fireEvent.click(eyeIcon);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  it('changes the re-enter password visibility when the eye icon is clicked', () => {
    render(<SignUpWithPassword />);
    const reEnterPasswordInput = screen.getByPlaceholderText('Re-enter your password');
    const eyeIcon = screen.getByTestId('eye-icon-password-retype');
    expect(reEnterPasswordInput).toHaveAttribute('type', 'password');
    fireEvent.click(eyeIcon);
    expect(reEnterPasswordInput).toHaveAttribute('type', 'text');
  });
});

describe('SignUpComponent', () => {
  it('renders the sign-up form', () => {
    render(<SignUpComponent />);
    expect(screen.getByTestId('sign-up-form')).toBeInTheDocument();
  });

  it('displays the "Already have an account?" text', () => {
    render(<SignUpComponent />);
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  it('renders the Sign in link', () => {
    render(<SignUpComponent />);
    const signInLink = screen.getByRole('link', { name: 'Sign in' });
    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/auth/signin');
  });
});
