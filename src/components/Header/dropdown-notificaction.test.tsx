import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownNotification from './dropdown-notification.component';

describe('DropdownNotification Component', () => {
  beforeEach(() => {
    render(<DropdownNotification />);
  });

  it('displays the notification icon', () => {
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('shows notification indicator when there are new notifications', () => {
    expect(screen.getByRole('link').querySelector('span:nth-child(2)')).toBeInTheDocument();
  });

  it('toggles dropdown when clicked', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
    fireEvent.click(link);
    expect(screen.queryByText('Notifications')).not.toBeInTheDocument();
  });

  it('displays correct number of notifications', () => {
    const link = screen.getByRole('link');
    fireEvent.click(link);
    expect(screen.getAllByRole('listitem').length - 1).toBe(5);
  });
});
