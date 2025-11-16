import React from 'react';
import { useTableState } from '../../hooks/useTableState.jsx';

const Pagination = ({ pageCount, totalItems }) => {
  const { state, dispatch } = useTableState();

  const canPreviousPage = state.pagination.pageIndex > 0;
  const canNextPage = state.pagination.pageIndex < pageCount - 1;

  const goToPage = (pageIndex) => {
    dispatch({
      type: 'SET_PAGINATION',
      payload: { ...state.pagination, pageIndex }
    });
  };

  const setPageSize = (pageSize) => {
    dispatch({
      type: 'SET_PAGINATION',
      payload: { pageIndex: 0, pageSize: parseInt(pageSize) }
    });
  };

  const startItem = state.pagination.pageIndex * state.pagination.pageSize + 1;
  const endItem = Math.min((state.pagination.pageIndex + 1) * state.pagination.pageSize, totalItems);

  return (
    <div className="pagination-container">
      <div className="page-info">
        📄 Showing <span className="font-semibold text-blue-600">{startItem}</span> to <span className="font-semibold text-blue-600">{endItem}</span> of <span className="font-semibold text-blue-600">{totalItems}</span> results
      </div>
      
      <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-end w-full sm:w-auto">
        <select
          value={state.pagination.pageSize}
          onChange={(e) => setPageSize(e.target.value)}
          className="px-4 py-2.5 border-2 border-blue-200 rounded-lg text-sm font-medium focus:border-blue-500 focus:ring-4 focus:ring-blue-200 transition-all duration-200 hover:shadow-md"
        >
          {[25, 50, 100].map(size => (
            <option key={size} value={size}>{size} per page</option>
          ))}
        </select>

        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => goToPage(0)}
            disabled={!canPreviousPage}
            className="btn-page px-3 py-2 rounded-lg font-semibold"
            title="First Page"
          >
          </button>
          <button
            onClick={() => goToPage(state.pagination.pageIndex - 1)}
            disabled={!canPreviousPage}
            className="btn-page px-4 py-2 rounded-lg font-semibold"
          >
            ← Prev
          </button>
          
          <span className="px-4 py-2 text-sm font-semibold bg-blue-100 text-blue-700 rounded-lg">
            {state.pagination.pageIndex + 1} / {pageCount}
          </span>
          
          <button
            onClick={() => goToPage(state.pagination.pageIndex + 1)}
            disabled={!canNextPage}
            className="btn-page px-4 py-2 rounded-lg font-semibold"
          >
            Next →
          </button>
          <button
            onClick={() => goToPage(pageCount - 1)}
            disabled={!canNextPage}
            className="btn-page px-3 py-2 rounded-lg font-semibold"
            title="Last Page"
          >
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;