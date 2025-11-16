import React from 'react';

const ColumnControls = ({ columns, onToggle, onReset }) => {
  return (
    <div className="bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
      <div className="font-semibold mb-2">Columns</div>
      <div className="flex flex-col gap-2 max-h-48 overflow-auto">
        {columns.map((col) => (
          <label key={col.accessorKey} className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={col.visible}
              onChange={() => onToggle(col.accessorKey)}
              className="w-4 h-4"
            />
            <span className="truncate">{col.header}</span>
          </label>
        ))}
      </div>
      <div className="mt-3">
        <button onClick={onReset} className="px-3 py-1 bg-gray-100 rounded text-sm">Reset</button>
      </div>
    </div>
  );
};

export default ColumnControls;
