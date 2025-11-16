import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTableState } from '../../hooks/useTableState.jsx';

const GlobalSearch = () => {
  const { state, dispatch } = useTableState();
  const [inputValue, setInputValue] = useState(state.globalFilter);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: 'SET_GLOBAL_FILTER', payload: inputValue });
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue, dispatch]);

  return (
    <div className="relative w-full sm:w-64">
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <MagnifyingGlassIcon className="w-5 h-5 text-blue-400" />
      </div>
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="pl-12 pr-4 py-3 w-full border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 text-sm font-medium placeholder:text-gray-500 shadow-sm hover:shadow-md"
      />
    </div>
  );
};

export default GlobalSearch;