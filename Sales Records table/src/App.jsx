import React from 'react';
import DataTable from './components/Table/DataTable';
import { TableProvider } from './hooks/useTableState.jsx';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header Section */}
        <div className="mb-10 space-y-2 controls-container">
          <div>
            <h1 className="dashboard-header">📊 Sales Records Dashboard</h1>
            <p className="dashboard-subtitle">Managing 100,000+ sales records efficiently with real-time filtering and sorting</p>
          </div>
        </div>

        {/* Main Content */}
        <TableProvider>
          <div className="table-container">
            <DataTable />
          </div>
        </TableProvider>
      </div>
    </div>
  );
}

export default App;