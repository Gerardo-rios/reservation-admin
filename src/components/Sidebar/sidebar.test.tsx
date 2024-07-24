import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './sidebar.component';
import SidebarItem from './sidebar-item';
import SidebarDropdown from './sidebar-dropdown';

describe('Sidebar', () => {
  it('renders correctly', () => {
    render(<Sidebar />);
    expect(screen.getByText('MAIN MENU')).toBeInTheDocument();
    expect(screen.getByText('My stores')).toBeInTheDocument();
    expect(screen.getByText('Reservations')).toBeInTheDocument();
  });
});

describe('SidebarItem', () => {
  const mockSetPageName = jest.fn();
  const mockItem = {
    icon: <span>Icon</span>,
    label: 'Test Item',
    route: '/test',
    children: [{ label: 'Sub Item', route: '/sub' }]
  };

  it('renders correctly', () => {
    render(<SidebarItem item={mockItem} pageName="" setPageName={mockSetPageName} />);
    expect(screen.getByText('Test Item')).toBeInTheDocument();
    expect(screen.getByText('Icon')).toBeInTheDocument();
  });

  it('calls setPageName on click', () => {
    render(<SidebarItem item={mockItem} pageName="" setPageName={mockSetPageName} />);
    fireEvent.click(screen.getByText('Test Item'));
    expect(mockSetPageName).toHaveBeenCalledWith('test item');
  });

  it('renders dropdown when item has children', () => {
    render(<SidebarItem item={mockItem} pageName="test item" setPageName={mockSetPageName} />);
    expect(screen.getByText('Sub Item')).toBeInTheDocument();
  });
});

jest.mock('next/navigation', () => ({
  usePathname: () => '/test'
}));

describe('SidebarDropdown', () => {
  const mockItems = [{ label: 'Item 1', route: '/test' }];

  it('renders dropdown items correctly', () => {
    render(<SidebarDropdown item={mockItems} />);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('applies active class to current route', () => {
    render(<SidebarDropdown item={mockItems} />);
    const activeItem = screen.getByText('Item 1').closest('a');
    expect(activeItem).toHaveClass('bg-primary/[.07]');
  });
});
