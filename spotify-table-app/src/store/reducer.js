import * as types from './types';

export const initialState = {
  data: [],
  sorting: [],
  globalFilter: '',
  columnFilters: {},
  pagination: { pageIndex: 0, pageSize: 25 },
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
    default:
      return state;
  }
}

export default tableReducer;
