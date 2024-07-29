import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './dashboard.component';

jest.mock('../Tables/dashboard-table', () => {
  return function MockedDashboardTable() {
    return <div data-testid="dashboard-table">Mocked Dashboard Table</div>;
  };
});

describe('Dashboard', () => {
  beforeEach(() => {
    render(<Dashboard />);
  });

  it('renders the heading correctly', () => {
    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Courts');
  });

  it('renders the DashboardTable component', () => {
    const dashboardTable = screen.getByTestId('dashboard-table');

    expect(dashboardTable).toBeInTheDocument();
  });

  it('applies correct CSS classes', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    const container = screen.getByTestId('dashboard-table').parentElement;

    expect(container).toHaveClass('flex', 'flex-col', 'gap-10');
    expect(heading).toHaveClass('text-2xl', 'font-semibold');
  });
});
