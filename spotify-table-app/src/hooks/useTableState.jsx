import React, { createContext, useContext, useReducer, useMemo } from 'react';
import reducer, { initialState as tableInitialState } from '../store/reducer';

const TableStateContext = createContext();

export function TableProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, tableInitialState);

  const value = useMemo(() => ({
    state,
    dispatch
  }), [state]);

  return (
    <TableStateContext.Provider value={value}>
      {children}
    </TableStateContext.Provider>
  );
}

export function useTableState() {
  const context = useContext(TableStateContext);
  if (!context) {
    throw new Error('useTableState must be used within a TableProvider');
  }
  return context;
}
