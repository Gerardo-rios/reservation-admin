import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Verification from './form';
import VerificationComponent from './verification.component';

describe('Verification form', () => {
  beforeEach(() => {
    render(<Verification />);
  });

  it('renders four input fields', () => {
    const inputs = screen.getAllByRole('textbox');

    expect(inputs).toHaveLength(4);
  });

  it('renders "Did not receive a code?" text', () => {
    expect(screen.getByText('Did not receive a code?')).toBeInTheDocument();
  });

  it('renders a Resend button', () => {
    expect(screen.getByRole('button', { name: 'Resend' })).toBeInTheDocument();
  });

  it('renders a Verify button', () => {
    expect(screen.getByRole('button', { name: 'Verify' })).toBeInTheDocument();
  });

  it('allows input in the text fields', () => {
    const inputs = screen.getAllByRole('textbox');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(inputs[0]).toHaveValue('1');
  });
});

describe('VerificationComponent', () => {
  beforeEach(() => {
    render(<VerificationComponent />);
  });

  it('renders the logo', () => {
    const logos = screen.getAllByAltText('Logo');

    expect(logos).toHaveLength(2);
  });

  it('renders the title "Verify Your Account"', () => {
    expect(screen.getByText('Verify Your Account')).toBeInTheDocument();
  });

  it('renders the instruction text', () => {
    expect(screen.getByText('Enter the 4 digit code sent to the registered email id.')).toBeInTheDocument();
  });

  it('renders the Verification form', () => {
    expect(screen.getByTestId('verification-form')).toBeInTheDocument();
  });
});
