import {
  VACCINE_INFORM_CREATE_REQUEST,
  VACCINE_INFORM_CREATE_SUCCESS,
  VACCINE_INFORM_CREATE_FAIL
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
