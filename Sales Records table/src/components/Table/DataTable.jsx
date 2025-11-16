import React, { useMemo } from 'react';
import { useTableData } from '../../hooks/useTableData';
import { useTableState } from '../../hooks/useTableState.jsx';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';
import GlobalSearch from '../Filters/GlobalSearch';
import FilterControls from '../Filters/FilterControls';
import ExportButton from '../UI/ExportButton';
import LoadingSpinner from '../UI/LoadingSpinner';
import { exportToCsv } from '../../utils/csvExport';
import * as actions from '../../store/actions';

const DataTable = () => {
  const { data: allData, loading, error } = useTableData();
  const { state, dispatch } = useTableState();
  const [selectionMode, setSelectionMode] = React.useState(false);

  // Apply filters and sorting - keep useMemo call unconditionally so hooks order remains stable
  const filteredData = useMemo(() => {
    if (loading || error) return [];
    let source = (state.data && state.data.length) ? state.data : allData;
    let filtered = source;

    // Global search
    if (state.globalFilter) {
      filtered = filtered.filter(row =>
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(state.globalFilter.toLowerCase())
        )
      );
    }

    // Column filters
    Object.entries(state.columnFilters).forEach(([columnId, filterValue]) => {
      if (filterValue) {
        filtered = filtered.filter(row => 
          String(row[columnId]).toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    });

    // Sorting
    if (state.sorting.length > 0) {
      const { id, desc } = state.sorting[0];
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[id];
        const bVal = b[id];
        if (desc) {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      });
    }

    return filtered;
  }, [allData, state.data, state.globalFilter, state.columnFilters, state.sorting, loading, error]);

  // After CSV load, initialize store data if not already set
  React.useEffect(() => {
    if (!loading && !error && allData && allData.length > 0 && (!state.data || state.data.length === 0)) {
      dispatch(actions.setData(allData));
    }
  }, [loading, error, allData]);
  // Pagination
  const pageCount = Math.ceil(filteredData.length / state.pagination.pageSize);
  const paginatedData = filteredData.slice(
    state.pagination.pageIndex * state.pagination.pageSize,
    (state.pagination.pageIndex + 1) * state.pagination.pageSize
  );

  // If deletion caused current page to go out of range, clamp it
  React.useEffect(() => {
    if (pageCount === 0) return;
    if (state.pagination.pageIndex >= pageCount) {
      const newIndex = Math.max(0, pageCount - 1);
      dispatch(actions.setPagination({ ...state.pagination, pageIndex: newIndex }));
    }
  }, [pageCount, state.pagination.pageIndex, state.pagination.pageSize]);

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="error-message">
      <div className="flex items-start gap-3">
        <div className="text-2xl">⚠️</div>
        <div>
          <h3 className="font-bold text-lg">Error loading data</h3>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    </div>
  );

  const columns = [
    { accessorKey: 'Region', header: 'Region' },
    { accessorKey: 'Country', header: 'Country' },
    { accessorKey: 'Item Type', header: 'Item Type' },
    { accessorKey: 'Sales Channel', header: 'Sales Channel' },
    { accessorKey: 'Order Priority', header: 'Priority' },
    { accessorKey: 'Order Date', header: 'Order Date' },
    { accessorKey: 'Units Sold', header: 'Units Sold' },
    { accessorKey: 'Unit Price', header: 'Unit Price' },
    { accessorKey: 'Total Profit', header: 'Total Profit' },
  ];

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
        <div className="w-full sm:w-auto">
          <GlobalSearch />
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none">
            <FilterControls columns={columns} />
          </div>
            <div className="flex-1 sm:flex-none flex gap-2">
              <ExportButton data={filteredData} />
              <button
                onClick={() => {
                  // If selection UI is not open, open it first
                  if (!selectionMode) {
                    setSelectionMode(true);
                    return;
                  }

                  // If already open, perform export of selected rows
                  const selectedIds = Object.keys(state.selectedIds || {}).map(id => Number(id));
                  const rows = (state.data || []).filter(r => selectedIds.includes(r.id));
                  if (rows.length === 0) return;
                  exportToCsv('selected-sales.csv', rows);
                  // hide selection UI and clear selection after export
                  dispatch(actions.clearSelection());
                  setSelectionMode(false);
                }}
                disabled={selectionMode ? Object.keys(state.selectedIds || {}).length === 0 : false}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:shadow transition-colors disabled:opacity-50"
              >
                {selectionMode ? 'Export Selected' : 'Export'}
              </button>
              <button
                onClick={() => {
                  // If selection UI not open, open it first
                  if (!selectionMode) {
                    setSelectionMode(true);
                    return;
                  }
                  // If open, perform delete
                  const selectedCount = Object.keys(state.selectedIds || {}).length;
                  if (selectedCount === 0) return;
                  dispatch(actions.deleteSelected());
                  setSelectionMode(false);
                }}
                disabled={selectionMode ? Object.keys(state.selectedIds || {}).length === 0 : false}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-xl hover:shadow transition-colors disabled:opacity-50"
              >
                {selectionMode ? 'Delete Selected' : 'Delete'}
              </button>
                {selectionMode && (
                  <button
                    onClick={() => {
                      dispatch(actions.clearSelection());
                      setSelectionMode(false);
                    }}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-xl hover:shadow transition-colors"
                  >
                    Cancel
                  </button>
                )}
            </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader
            columns={columns}
            pageRowIds={paginatedData.map(r => r.id)}
            selectedIds={state.selectedIds}
            dispatch={dispatch}
            sorting={state.sorting}
            showCheckboxes={selectionMode}
          />
          <TableBody
            data={paginatedData}
            columns={columns}
            selectedIds={state.selectedIds}
            dispatch={dispatch}
            showCheckboxes={selectionMode}
          />
        </table>
      </div>

      {/* Pagination */}
      <Pagination 
        pageCount={pageCount}
        totalItems={filteredData.length}
      />
    </div>
  );
};

export default DataTable;