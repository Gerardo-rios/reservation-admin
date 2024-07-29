import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardTable from './dashboard-table';

jest.mock('./custom-table', () => {
  return function MockedCustomTable({ columns, data }: any) {
    return (
      <div data-testid="custom-table">
        <div data-testid="columns">{JSON.stringify(columns)}</div>
        <div data-testid="data">{JSON.stringify(data)}</div>
      </div>
    );
  };
});

describe('DashboardTable', () => {
  beforeEach(() => {
    render(<DashboardTable />);
  });

  it('renders CustomTable with correct props', () => {
    const customTable = screen.getByTestId('custom-table');
    const columnsData = JSON.parse(screen.getByTestId('columns').textContent || '');
    const tableData = JSON.parse(screen.getByTestId('data').textContent || '');

    expect(customTable).toBeInTheDocument();
    expect(columnsData).toHaveLength(4);
    expect(columnsData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ key: 'court' }),
        expect.objectContaining({ key: 'freeAt' }),
        expect.objectContaining({ key: 'status' }),
        expect.objectContaining({ key: 'actions' })
      ])
    );
    expect(tableData).toHaveLength(4);
    expect(tableData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: '1' }),
        expect.objectContaining({ name: '2' }),
        expect.objectContaining({ name: '3' }),
        expect.objectContaining({ name: '4' })
      ])
    );
  });

  it('renders correct number of columns', () => {
    const columnsData = JSON.parse(screen.getByTestId('columns').textContent || '');
    expect(columnsData).toHaveLength(4);
  });

  it('renders correct headers for columns', () => {
    const columnsData = JSON.parse(screen.getByTestId('columns').textContent || '');
    expect(columnsData).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ header: 'Court' }),
        expect.objectContaining({ header: 'Free At' }),
        expect.objectContaining({ header: 'Status' }),
        expect.objectContaining({ header: 'Actions' })
      ])
    );
  });
});
