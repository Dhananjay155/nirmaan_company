import * as types from './types';

export const setData = (payload) => ({ type: types.SET_DATA, payload });
export const setSorting = (payload) => ({ type: types.SET_SORTING, payload });
export const setGlobalFilter = (payload) => ({ type: types.SET_GLOBAL_FILTER, payload });
export const setColumnFilter = (columnId, value) => ({ type: types.SET_COLUMN_FILTER, payload: { columnId, value } });
export const setPagination = (payload) => ({ type: types.SET_PAGINATION, payload });

export default {
  setData,
  setSorting,
  setGlobalFilter,
  setColumnFilter,
  setPagination,
};
