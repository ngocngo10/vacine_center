import {
  VACCINE_INFORM_CREATE_REQUEST,
  VACCINE_INFORM_CREATE_SUCCESS,
  VACCINE_INFORM_CREATE_FAIL,
  VACCINE_INFORM_LIST_REQUEST,
  VACCINE_INFORM_LIST_SUCCESS,
  VACCINE_INFORM_LIST_FAIL
} from '../constants/vaccine.constant';

export const vaccineInformCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case VACCINE_INFORM_CREATE_REQUEST:
      return { loading: true };
    case VACCINE_INFORM_CREATE_SUCCESS:
      return {
        loading: false,
        createSuccess: true
      };
    case VACCINE_INFORM_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const vaccineInformListReducer = (state = {}, action) => {
  switch (action.type) {
    case VACCINE_INFORM_LIST_REQUEST:
      return { loading: true };
    case VACCINE_INFORM_LIST_SUCCESS:
      return {
        loading: false,
        vaccineInforms: action.payload
      };
    case VACCINE_INFORM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
