import React from 'react';
import * as actions from '../../store/actions';

const TableBody = ({ data, columns, selectedIds = {}, dispatch, showCheckboxes = false, columnWidths = {} }) => {
  if (data.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length + (showCheckboxes ? 1 : 0)} className="px-6 py-4 text-center text-gray-500">
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
          {showCheckboxes && (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium">
              <input
                type="checkbox"
                checked={!!selectedIds[row.id]}
                onChange={() => dispatch(actions.toggleRowSelection(row.id))}
                className="w-4 h-4"
                aria-label={`Select row ${row.id}`}
              />
            </td>
          )}
          {columns.map((column) => (
            <td
              key={column.accessorKey}
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 font-medium"
              style={ columnWidths[column.accessorKey] ? { width: columnWidths[column.accessorKey] } : undefined }
            >
              {renderCell(row[column.accessorKey])}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;