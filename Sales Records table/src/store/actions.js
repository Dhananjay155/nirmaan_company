import * as types from './types';

export const setData = (payload) => ({ type: types.SET_DATA, payload });
export const setSorting = (payload) => ({ type: types.SET_SORTING, payload });
export const setGlobalFilter = (payload) => ({ type: types.SET_GLOBAL_FILTER, payload });
export const setColumnFilter = (columnId, value) => ({ type: types.SET_COLUMN_FILTER, payload: { columnId, value } });
export const setPagination = (payload) => ({ type: types.SET_PAGINATION, payload });

export const toggleRowSelection = (rowId) => ({ type: types.TOGGLE_ROW_SELECTION, payload: rowId });
export const setSelectedIds = (ids) => ({ type: types.SET_SELECTED_IDS, payload: ids });
export const clearSelection = () => ({ type: types.CLEAR_SELECTION });
export const selectAllOnPage = (ids) => ({ type: types.SELECT_ALL_ON_PAGE, payload: ids });
export const deselectAllOnPage = (ids) => ({ type: types.DESELECT_ALL_ON_PAGE, payload: ids });
export const deleteSelected = () => ({ type: types.DELETE_SELECTED });

export default {
  setData,
  setSorting,
  setGlobalFilter,
  setColumnFilter,
  setPagination,
};
