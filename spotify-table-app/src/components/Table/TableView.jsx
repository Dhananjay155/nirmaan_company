import React, { useMemo, useState, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

// ✅ UNIVERSAL WORKING IMPORT FOR ALL react-window VERSIONS
import * as RW from "react-window";
const FixedSizeList = RW.FixedSizeList;

import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/solid";

export default function TableView({ data }) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pageSize, setPageSize] = useState(50);

  const columns = useMemo(
    () => [
      { accessorKey: "order_id", header: "Order ID" },
      { accessorKey: "product_name", header: "Product" },
      { accessorKey: "category", header: "Category" },
      { accessorKey: "customer_name", header: "Customer" },
      { accessorKey: "quantity", header: "Qty" },
      { accessorKey: "price", header: "Price" },
      { accessorKey: "total", header: "Total" },
      { accessorKey: "order_date", header: "Date" },
      { accessorKey: "state", header: "State" },
      { accessorKey: "payment_method", header: "Payment" },
    ],
    []
  );

  const table = useReactTable({
    data: data || [],
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: "includesString",
  });

  useEffect(() => {
    const id = setTimeout(() => table.setGlobalFilter(globalFilter), 300);
    return () => clearTimeout(id);
  }, [globalFilter]);

  const rows = table.getRowModel().rows;
  const rowHeight = 55;
  const height = Math.min(550, rows.length * rowHeight);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200">
      {/* Search + Page Size */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
          placeholder="Search orders, products, customers..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="px-4 py-2 rounded-lg border border-gray-300"
        >
          {[50, 100, 200].map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const sort = header.column.getIsSorted();
                  return (
                    <th
                      key={header.id}
                      className="px-4 py-3 font-semibold text-gray-700 text-sm"
                    >
                      <div
                        className={`flex items-center gap-2 ${
                          header.column.getCanSort() && "cursor-pointer"
                        }`}
                        onClick={
                          header.column.getCanSort()
                            ? header.column.toggleSorting
                            : undefined
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {sort === "asc" && (
                          <ArrowUpIcon className="w-4 h-4 text-gray-600" />
                        )}
                        {sort === "desc" && (
                          <ArrowDownIcon className="w-4 h-4 text-gray-600" />
                        )}
                      </div>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="p-6 text-center text-gray-500"
                >
                  No results found
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={columns.length} className="p-0">
                  {/* Virtualized Rows */}
                  <FixedSizeList
                    height={height}
                    itemCount={rows.length}
                    itemSize={rowHeight}
                    width="100%"
                  >
                    {({ index, style }) => {
                      const row = rows[index];
                      return (
                        <div
                          style={style}
                          className={`grid grid-cols-10 px-4 py-3 text-sm ${
                            index % 2 === 0 ? "bg-white" : "bg-gray-50"
                          }`}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <div key={cell.id} className="truncate">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          ))}
                        </div>
                      );
                    }}
                  </FixedSizeList>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-100 rounded-lg border disabled:opacity-40"
        >
          Prev
        </button>

        <p className="text-gray-600 text-sm">
          Page {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount() || 1}
        </p>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-100 rounded-lg border disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
