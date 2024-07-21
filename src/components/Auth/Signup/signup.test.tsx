import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUpWithPassword from './form';
import SignUpComponent from './signup.component';

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
