import React, { useState } from 'react';
import { FunnelIcon } from '@heroicons/react/24/outline';
import { useTableState } from '../../hooks/useTableState.jsx';

const FilterControls = ({ columns }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useTableState();

  const handleFilterChange = (columnId, value) => {
    dispatch({
      type: 'SET_COLUMN_FILTER',
      payload: { columnId, value }
    });
  };

  const filterableColumns = columns.filter(col => 
    ['Region', 'Country', 'Item Type'].includes(col.header)
  );

  return (
    <div className="relative w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center gap-2 px-5 py-3 w-full sm:w-auto bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg shadow-md transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <FunnelIcon className="w-5 h-5" />
        Filters
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-3 w-72 bg-white border-2 border-purple-200 rounded-xl shadow-2xl z-10 p-5 backdrop-blur-sm bg-opacity-99 space-y-4">
          <h3 className="font-bold text-gray-900 text-lg">Filter by Column</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {filterableColumns.map(column => (
              <div key={column.accessorKey} className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  {column.header}
                </label>
                <input
                  type="text"
                  placeholder={`Enter ${column.header}...`}
                  value={state.columnFilters[column.accessorKey] || ''}
                  onChange={(e) => handleFilterChange(column.accessorKey, e.target.value)}
                  className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-200 transition-all duration-200 text-sm"
                />
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200 flex gap-2">
            <button
              onClick={() => {
                Object.keys(state.columnFilters).forEach(key => handleFilterChange(key, ''));
              }}
              className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
            >
              Clear All
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-200 text-sm"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterControls;