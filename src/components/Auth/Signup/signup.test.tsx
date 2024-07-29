import React from 'react';
import { render, screen } from '@testing-library/react';
import SignUpWithPassword from './form';
import SignUpComponent from './signup.component';

describe('SignUpWithPassword', () => {
  beforeEach(() => {
    render(<SignUpWithPassword />);
  });

  it('renders the name input', () => {
    expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
  });

  it('renders the email input', () => {
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
  });

  it('renders the password input', () => {
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
  });

  it('renders the re-enter password input', () => {
    expect(screen.getByPlaceholderText('Re-enter your password')).toBeInTheDocument();
  });

  it('renders the create account button', () => {
    expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument();
  });
});

describe('SignUpComponent', () => {
  beforeEach(() => {
    render(<SignUpComponent />);
  });

  it('renders the sign-up form', () => {
    expect(screen.getByTestId('sign-up-form')).toBeInTheDocument();
  });

  it('displays the "Already have an account?" text', () => {
    expect(screen.getByText('Already have an account?')).toBeInTheDocument();
  });

  it('renders the Sign in link', () => {
    const signInLink = screen.getByRole('link', { name: 'Sign in' });

    expect(signInLink).toBeInTheDocument();
    expect(signInLink).toHaveAttribute('href', '/auth/signin');
  });
});
