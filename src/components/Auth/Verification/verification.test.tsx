import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Verification from './form';
import VerificationComponent from './verification.component';

describe('Verification form', () => {
  it('renders four input fields', () => {
    render(<Verification />);
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

  it('renders "Did not receive a code?" text', () => {
    render(<Verification />);
    expect(screen.getByText('Did not receive a code?')).toBeInTheDocument();
  });

  it('renders a Resend button', () => {
    render(<Verification />);
    expect(screen.getByRole('button', { name: 'Resend' })).toBeInTheDocument();
  });

  it('renders a Verify button', () => {
    render(<Verification />);
    expect(screen.getByRole('button', { name: 'Verify' })).toBeInTheDocument();
  });

  // You can add more tests here for interaction, like:
  it('allows input in the text fields', () => {
    render(<Verification />);
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(inputs[0]).toHaveValue('1');
  });
});

describe('VerificationComponent', () => {
  it('renders the logo', () => {
    render(<VerificationComponent />);
    const logos = screen.getAllByAltText('Logo');
    expect(logos).toHaveLength(2);
  });

  it('renders the title "Verify Your Account"', () => {
    render(<VerificationComponent />);
    expect(screen.getByText('Verify Your Account')).toBeInTheDocument();
  });

  it('renders the instruction text', () => {
    render(<VerificationComponent />);
    expect(screen.getByText('Enter the 4 digit code sent to the registered email id.')).toBeInTheDocument();
  });

  it('renders the Verification form', () => {
    render(<VerificationComponent />);
    expect(screen.getByTestId('verification-form')).toBeInTheDocument();
  });
});
