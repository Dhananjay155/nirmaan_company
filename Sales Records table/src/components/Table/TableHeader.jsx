import React, { useEffect, useRef } from 'react';
import { ChevronUpDownIcon, ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import * as actions from '../../store/actions';

const TableHeader = ({ columns, pageRowIds = [], selectedIds = {}, dispatch, sorting = [], showCheckboxes = false, onReorder, onResize, columnWidths = {} }) => {

  const handleSort = (columnId) => {
    const currentSort = sorting[0];
    let newSorting = [];

    if (currentSort?.id === columnId) {
      if (!currentSort.desc) {
        newSorting = [{ id: columnId, desc: true }];
      }
      // If already descending, remove sort
    } else {
      newSorting = [{ id: columnId, desc: false }];
    }

    dispatch(actions.setSorting(newSorting));
  };

  const getSortIcon = (columnId) => {
    const currentSort = sorting[0];
    if (currentSort?.id !== columnId) {
      return <ChevronUpDownIcon className="w-4 h-4" />;
    }
    return currentSort.desc ? 
      <ChevronDownIcon className="w-4 h-4" /> : 
      <ChevronUpIcon className="w-4 h-4" />;
  };

  const allSelected = pageRowIds.length > 0 && pageRowIds.every(id => selectedIds && selectedIds[id]);
  const someSelected = pageRowIds.length > 0 && pageRowIds.some(id => selectedIds && selectedIds[id]) && !allSelected;
  const checkboxRef = useRef(null);

  useEffect(() => {
    if (checkboxRef.current) checkboxRef.current.indeterminate = someSelected;
  }, [someSelected]);

  const onToggleAll = (e) => {
    if (e.target.checked) dispatch(actions.selectAllOnPage(pageRowIds));
    else dispatch(actions.deselectAllOnPage(pageRowIds));
  };

  return (
    <thead className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 border-b-2 border-blue-200">
      <tr>
        {showCheckboxes && (
          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
            <input
              ref={checkboxRef}
              type="checkbox"
              checked={allSelected}
              onChange={onToggleAll}
              aria-label="Select all on page"
              className="w-4 h-4"
            />
          </th>
        )}
        {columns.map((column) => (
          <th
            key={column.accessorKey}
            draggable
            onDragStart={(e) => { e.dataTransfer.setData('text/plain', column.accessorKey); }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const sourceKey = e.dataTransfer.getData('text/plain');
              if (sourceKey && sourceKey !== column.accessorKey && onReorder) onReorder(sourceKey, column.accessorKey);
            }}
            className={`px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider ${column.accessorKey ? 'cursor-pointer hover:bg-blue-100' : ''}`}
            onClick={() => column.accessorKey ? handleSort(column.accessorKey) : undefined}
            title={`Click to sort by ${column.header}`}
            style={ columnWidths[column.accessorKey] ? { width: columnWidths[column.accessorKey] } : undefined }
          >
            <div className="flex items-center gap-2 justify-between group relative">
              <span className="truncate">{column.header}</span>
              <span className="text-gray-400 group-hover:text-blue-600 transition-colors duration-150">
                {getSortIcon(column.accessorKey)}
              </span>
              <div
                onMouseDown={(e) => {
                  if (!onResize) return;
                  e.preventDefault();
                  const startX = e.clientX;
                  const startWidth = columnWidths[column.accessorKey] || e.currentTarget.parentElement.offsetWidth;
                  const onMove = (ev) => {
                    const delta = ev.clientX - startX;
                    const newWidth = Math.max(60, startWidth + delta);
                    onResize(column.accessorKey, newWidth);
                  };
                  const onUp = () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp); };
                  window.addEventListener('mousemove', onMove);
                  window.addEventListener('mouseup', onUp);
                }}
                className="absolute right-0 top-0 h-full w-1 cursor-col-resize"
              />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;