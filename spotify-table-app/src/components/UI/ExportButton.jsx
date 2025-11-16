import React from 'react';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const ExportButton = ({ data }) => {
  const exportToCSV = () => {
    if (data.length === 0) return;

    const headers = Object.keys(data[0]).filter(key => key !== 'id');
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sales-data.csv';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportToCSV}
      disabled={data.length === 0}
      className="flex items-center justify-center gap-2 px-5 py-3 w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg shadow-md transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
    >
      <ArrowDownTrayIcon className="w-5 h-5" />
      Export CSV
    </button>
  );
};

export default ExportButton;