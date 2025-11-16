import * as types from './types';

export const initialState = {
  data: [],
  sorting: [],
  globalFilter: '',
  columnFilters: {},
  pagination: { pageIndex: 0, pageSize: 25 },
  selectedIds: {},
};

export function tableReducer(state = initialState, action) {
  switch (action.type) {
    case types.SET_DATA:
      return { ...state, data: action.payload };
    case types.SET_SORTING:
      return { ...state, sorting: action.payload };
    case types.SET_GLOBAL_FILTER:
      return { ...state, globalFilter: action.payload };
    case types.SET_COLUMN_FILTER:
      return {
        ...state,
        columnFilters: { ...state.columnFilters, [action.payload.columnId]: action.payload.value },
      };
    case types.SET_PAGINATION:
      return { ...state, pagination: action.payload };
    case types.TOGGLE_ROW_SELECTION: {
      const id = action.payload;
      const selectedIds = { ...state.selectedIds };
      if (selectedIds[id]) delete selectedIds[id];
      else selectedIds[id] = true;
      return { ...state, selectedIds };
    }
    case types.SET_SELECTED_IDS:
      return { ...state, selectedIds: action.payload };
    case types.CLEAR_SELECTION:
      return { ...state, selectedIds: {} };
    case types.SELECT_ALL_ON_PAGE: {
      const ids = action.payload || [];
      const selectedIds = { ...state.selectedIds };
      ids.forEach((id) => { selectedIds[id] = true; });
      return { ...state, selectedIds };
    }
    case types.DESELECT_ALL_ON_PAGE: {
      const ids = action.payload || [];
      const selectedIds = { ...state.selectedIds };
      ids.forEach((id) => { if (selectedIds[id]) delete selectedIds[id]; });
      return { ...state, selectedIds };
    }
    case types.DELETE_SELECTED: {
      const selected = state.selectedIds || {};
      const newData = (state.data || []).filter((row) => !selected[row.id]);
      return { ...state, data: newData, selectedIds: {} };
    }
    default:
      return state;
  }
}

export default tableReducer;
