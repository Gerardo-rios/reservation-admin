import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SignInWithPassword from './form';
import SignInComponent from './signin.component';

describe('SignInWithPassword form tests', () => {
  it('renders the email input', () => {
    render(<SignInWithPassword />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('renders the password input', () => {
    render(<SignInWithPassword />);
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  it('renders the remember me checkbox', () => {
    render(<SignInWithPassword />);
    expect(screen.getByLabelText('Remember me')).toBeInTheDocument();
  });

  it('renders the forgot password link', () => {
    render(<SignInWithPassword />);
    const forgotPasswordLink = screen.getByRole('link', { name: 'Forgot Password?' });
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink).toHaveAttribute('href', '/auth/forgot-password');
  });

  it('renders the sign in button', () => {
    render(<SignInWithPassword />);
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
  });

  it('updates the remember me state when checkbox is clicked', () => {
    render(<SignInWithPassword />);
    const checkbox = screen.getByLabelText('Remember me');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });
});

describe('SignInComponent tests', () => {
  it('renders the sign-in form', () => {
    render(<SignInComponent />);
    expect(screen.getByTestId('sign-in-form')).toBeInTheDocument();
  });

  it('renders the Sign Up link', () => {
    render(<SignInComponent />);
    const signUpLink = screen.getByRole('link', { name: 'Sign Up' });
    expect(signUpLink).toBeInTheDocument();
    expect(signUpLink).toHaveAttribute('href', '/auth/signup');
  });
});
