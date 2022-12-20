import {
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_REQUEST,
  PATIENT_SUCCESS,
  PATIENT_FAIL,
  PATIENT_INJECTIONS_REQUEST,
  PATIENT_INJECTIONS_SUCCESS,
  PATIENT_INJECTIONS_FAIL
} from '../constants/patient.constant';

export const patientListReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_LIST_REQUEST:
      return { loading: true };
    case PATIENT_LIST_SUCCESS:
      return {
        loading: false,
        patients: action.payload.rows,
        totalItem: action.payload.count
      };
    case PATIENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const patientReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_REQUEST:
      return { loading: true };
    case PATIENT_SUCCESS:
      return {
        loading: false,
        patientItem: action.payload.patient
      };
    case PATIENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const patientInjectionsReducer = (state = {}, action) => {
  switch (action.type) {
    case PATIENT_INJECTIONS_REQUEST:
      return { loading: true };
    case PATIENT_INJECTIONS_SUCCESS:
      return {
        loading: false,
        patientInjectionsList: action.payload.vaccines.rows,
        totalItem: action.payload.vaccines.count
      };
    case PATIENT_INJECTIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
