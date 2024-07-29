import React from 'react';

interface TableColumn {
  key: string;
  header: string;
  render: (item: any) => React.ReactNode;
}

interface CustomTableProps {
  columns: TableColumn[];
  data: any[];
}

const CustomTable: React.FC<CustomTableProps> = ({ columns, data }) => {
  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#F7F9FC] text-left dark:bg-dark-2">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-4 font-medium text-dark dark:text-white"
                  style={{ width: `${100 / columns.length}%` }}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.key}`}
                    className={`border-[#eee] px-4 py-4 dark:border-dark-3 ${rowIndex === data.length - 1 ? 'border-b-0' : 'border-b'}`}
                    style={{ width: `${100 / columns.length}%` }}
                  >
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
