import {
  VACCINE_LIST_REQUEST,
  VACCINE_LIST_SUCCESS,
  VACCINE_LIST_FAIL
} from '../constants/vaccine.constant';

const initialState = {
  loading: false,
  vaccines: [],
  error: null
};
export const VaccineItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case VACCINE_LIST_REQUEST:
      return { ...state, loading: true };
    case VACCINE_LIST_SUCCESS:
      return { ...state, loading: false, vaccines: action.payload };
    case VACCINE_LIST_FAIL:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
