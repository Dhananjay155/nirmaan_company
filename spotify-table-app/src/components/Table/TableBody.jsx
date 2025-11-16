import React from 'react';

const TableBody = ({ data, columns }) => {
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
            No records found
          </td>
        </tr>
      </tbody>
    );
  }

  const renderCell = (val) => {
    if (val === null || val === undefined) return '';
    if (typeof val === 'number') return val.toLocaleString();
    return val;
  };

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row, idx) => (
        <tr key={row.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-colors duration-150 even:bg-gray-50 hover:even:bg-gradient-to-r hover:even:from-blue-50 hover:even:to-purple-50">
          {columns.map((column) => (
            <td key={column.accessorKey} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
              {renderCell(row[column.accessorKey])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;