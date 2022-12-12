import {
  WAREHOUSE_LIST_REQUEST,
  WAREHOUSE_LIST_SUCCESS,
  WAREHOUSE_LIST_FAIL,
  WAREHOUSE_CREATE_REQUEST,
  WAREHOUSE_CREATE_SUCCESS,
  WAREHOUSE_CREATE_FAIL
} from '../constants/warehouse.constant';

export const vaccineListWareHouseReducer = (state = {}, action) => {
  switch (action.type) {
    case WAREHOUSE_LIST_REQUEST:
      return { ...state, loading: true };
    case WAREHOUSE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        vaccineItemList: action.payload.rows,
        totalItem: action.payload.count
      };
    case WAREHOUSE_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const vaccineWareHouseCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case WAREHOUSE_CREATE_REQUEST:
      return { ...state, loading: true };
    case WAREHOUSE_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        createSuccess: true
      };
    case WAREHOUSE_CREATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
