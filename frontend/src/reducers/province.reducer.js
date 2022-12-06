import {
  PROVINCES_REQUEST,
  PROVINCES_SUCCESS,
  PROVINCES_FAIL
} from '../constants/province.constant';

export const provinceListReducer = (state = {}, action) => {
  switch (action.type) {
    case PROVINCES_REQUEST:
      return { ...state, loading: true };
    case PROVINCES_SUCCESS:
      return {
        ...state,
        loading: false,
        provinces: action.payload
      };
    case PROVINCES_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
