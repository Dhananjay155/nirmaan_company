import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center py-16 space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full animate-spin opacity-20"></div>
        <div className="relative w-16 h-16 bg-white rounded-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-transparent border-t-blue-600 border-r-purple-600"></div>
        </div>
      </div>
      <p className="text-gray-600 font-semibold text-lg">Loading data...</p>
      <p className="text-gray-500 text-sm">Please wait while we fetch your records</p>
    </div>
  );
};

export default LoadingSpinner;