import React from 'react';
import { render, screen } from '@testing-library/react';
import CustomTable from './custom-table';

const columns = [
  { key: 'name', header: 'Name', render: (item: any) => item.name },
  { key: 'age', header: 'Age', render: (item: any) => item.age },
  { key: 'address', header: 'Address', render: (item: any) => item.address },
  { key: 'phone', header: 'Phone', render: (item: any) => item.phone },
  { key: 'email', header: 'Email', render: (item: any) => item.email },
  { key: 'company', header: 'Company', render: (item: any) => item.company },
  { key: 'position', header: 'Position', render: (item: any) => item.position },
  { key: 'city', header: 'City', render: (item: any) => item.city },
  { key: 'country', header: 'Country', render: (item: any) => item.country }
];

const data = [
  {
    name: 'Juan',
    age: 30,
    address: 'Calle 123',
    phone: '123456789',
    email: 'sda@gmail.com',
    company: 'Company 1',
    position: 'Developer',
    city: 'City 1',
    country: 'Country 1'
  },
  {
    name: 'María',
    age: 25,
    address: 'Calle 456',
    phone: '987654321',
    email: 'maria@gmail.com',
    company: 'Company 2',
    position: 'Designer',
    city: 'City 2',
    country: 'Country 2'
  }
];

describe('CustomTable', () => {
  beforeEach(() => {
    render(<CustomTable columns={columns} data={data} />);
  });

  it('renders the table with correct headers', () => {
    columns.forEach((column) => {
      expect(screen.getByText(column.header)).toBeInTheDocument();
    });
  });

  it('renders the correct number of rows', () => {
    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(data.length + 1);
  });

  it('renders the correct data in each cell', () => {
    data.forEach((item: any, index) => {
      const row = screen.getAllByRole('row')[index + 1];
      columns.forEach((column) => {
        expect(row).toHaveTextContent(item[column.key].toString());
      });
    });
  });

  it('applies the correct CSS classes', () => {
    const table = screen.getByRole('table');
    expect(table).toHaveClass('w-full', 'table-auto');

    const headerCells = screen.getAllByRole('columnheader');
    headerCells.forEach((cell) => {
      expect(cell).toHaveClass('px-4', 'py-4', 'font-medium', 'text-dark', 'dark:text-white');
    });

    const dataCells = screen.getAllByRole('cell');
    dataCells.forEach((cell) => {
      expect(cell).toHaveClass('px-4', 'py-4');
    });
  });
});

describe('CustomTable with empty data', () => {
  it('renders an empty table when no data is provided', () => {
    render(<CustomTable columns={columns} data={[]} />);

    const rows = screen.getAllByRole('row');
    expect(rows).toHaveLength(1);
  });
});
