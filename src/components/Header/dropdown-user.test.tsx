import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownUser from './dropdown-user.component';

describe('DropdownUser Component', () => {
  beforeEach(() => {
    render(<DropdownUser />);
  });

  it('displays the user image', () => {
    expect(screen.getByAltText('User')).toBeInTheDocument();
  });

  it('displays the user name', () => {
    expect(screen.getByText('Evo Morales')).toBeInTheDocument();
  });

  it('toggles dropdown when clicked', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(screen.getByText('Juancho Ripan')).toBeInTheDocument();
    fireEvent.click(link);
    expect(screen.queryByText('Juancho Ripan')).not.toBeInTheDocument();
  });

  it('displays correct user information in dropdown', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(screen.getByText('juancho_ripan@nextadmin.com')).toBeInTheDocument();
  });

  it('displays logout button in dropdown', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);

    expect(screen.getByText('Logout')).toBeInTheDocument();
  });
});
