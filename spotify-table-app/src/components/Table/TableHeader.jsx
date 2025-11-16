import React from 'react';
import { ChevronUpDownIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { useTableState } from '../../hooks/useTableState.jsx';

const TableHeader = ({ columns }) => {
  const { state, dispatch } = useTableState();

  const handleSort = (columnId) => {
    const currentSort = state.sorting[0];
    let newSorting = [];

    if (currentSort?.id === columnId) {
      if (!currentSort.desc) {
        newSorting = [{ id: columnId, desc: true }];
      }
      // If already descending, remove sort
    } else {
      newSorting = [{ id: columnId, desc: false }];
    }

    dispatch({ type: 'SET_SORTING', payload: newSorting });
  };

  const getSortIcon = (columnId) => {
    const currentSort = state.sorting[0];
    if (currentSort?.id !== columnId) {
      return <ChevronUpDownIcon className="w-4 h-4" />;
    }
    return currentSort.desc ? 
      <ChevronDownIcon className="w-4 h-4" /> : 
      <ChevronUpIcon className="w-4 h-4" />;
  };

  return (
    <thead className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border-b-2 border-blue-200">
      <tr>
        {columns.map((column) => (
          <th
            key={column.accessorKey}
            className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-blue-100 transition-colors duration-150 select-none"
            onClick={() => handleSort(column.accessorKey)}
            title={`Click to sort by ${column.header}`}
          >
            <div className="flex items-center gap-2 justify-between group">
              <span>{column.header}</span>
              <span className="text-gray-400 group-hover:text-blue-600 transition-colors duration-150">
                {getSortIcon(column.accessorKey)}
              </span>
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;