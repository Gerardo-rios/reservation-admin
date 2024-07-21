import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PasswordResetComponent from './forgot-password.component';

describe('PasswordResetComponent', () => {
  it('renders the email input field from PasswordReset', () => {
    render(<PasswordResetComponent />);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    expect(emailInput).toBeInTheDocument();
  });

  it('renders the submit button from PasswordReset', () => {
    render(<PasswordResetComponent />);
    const submitButton = screen.getByRole('button', { name: /send password reset link/i });
    expect(submitButton).toBeInTheDocument();
  });

  it('renders the link to sign in page from PasswordReset', () => {
    render(<PasswordResetComponent />);
    const signInLink = screen.getByText(/here/i);
    expect(signInLink).toHaveAttribute('href', '/auth/signin');
  });

  it('submits the form with the email', () => {
    render(<PasswordResetComponent />);
    const emailInput = screen.getByPlaceholderText(/enter your email/i);
    const submitButton = screen.getByRole('button', { name: /send password reset link/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(emailInput).toHaveValue('test@example.com');
  });
});
