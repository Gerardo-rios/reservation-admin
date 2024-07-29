import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInWithPassword from './form';
import SignInComponent from './signin.component';

describe('SignInWithPassword form tests', () => {
  beforeEach(() => {
    render(<SignInWithPassword />);
  });

  it('renders the email input', () => {
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('renders the password input', () => {
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  it('renders the remember me checkbox', () => {
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
  });

  it('renders the forgot password link', () => {
    const forgotPasswordLink = screen.getByRole('link', { name: 'Forgot Password?' });
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink).toHaveAttribute('href', '/auth/forgot-password');
  });

  it('renders the sign in button', () => {
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('updates the remember me state when checkbox is clicked', () => {
    const checkbox = screen.getByLabelText('Remember me');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});

describe('SignInComponent tests', () => {
  beforeEach(() => {
    render(<SignInComponent />);
  });

  it('renders the sign-in form', () => {
    expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
  });

  it('renders the Sign Up link', () => {
    const signUpLink = screen.getByRole('link', { name: 'Sign Up' });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/auth/signup');
  });
});
