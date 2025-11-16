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

const DataTable = () => {
  const { data: allData, loading, error } = useTableData();
  const { state } = useTableState();

  // Apply filters and sorting - keep useMemo call unconditionally so hooks order remains stable
  const filteredData = useMemo(() => {
    if (loading || error) return [];
    let filtered = allData;

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
  }, [allData, state.globalFilter, state.columnFilters, state.sorting, loading, error]);

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

  // Pagination
  const pageCount = Math.ceil(filteredData.length / state.pagination.pageSize);
  const paginatedData = filteredData.slice(
    state.pagination.pageIndex * state.pagination.pageSize,
    (state.pagination.pageIndex + 1) * state.pagination.pageSize
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
          <div className="flex-1 sm:flex-none">
            <ExportButton data={filteredData} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader columns={columns} />
          <TableBody data={paginatedData} columns={columns} />
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