import {
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_EDIT_REQUEST,
  APPOINTMENT_EDIT_SUCCESS,
  APPOINTMENT_EDIT_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_MULTI_DELETE_REQUEST,
  APPOINTMENT_MULTI_DELETE_SUCCESS,
  APPOINTMENT_MULTI_DELETE_FAIL
} from '../constants/appointment.constant';

export const appointmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_CREATE_REQUEST:
      return { loading: true };
    case APPOINTMENT_CREATE_SUCCESS:
      return {
        loading: false,
        createSuccess: true
      };
    case APPOINTMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentListReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_LIST_REQUEST:
      return { loading: true };
    case APPOINTMENT_LIST_SUCCESS:
      return {
        loading: false,
        appointmentHistories: action.payload.rows,
        totalItem: action.payload.count
      };
    case APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentEditReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_EDIT_REQUEST:
      return { loading: true };
    case APPOINTMENT_EDIT_SUCCESS:
      return {
        loading: false,
        editSuccess: true
      };
    case APPOINTMENT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_DELETE_REQUEST:
      return { loading: true };
    case APPOINTMENT_DELETE_SUCCESS:
      return {
        loading: false,
        deleteSuccess: true
      };
    case APPOINTMENT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentMultiDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case APPOINTMENT_MULTI_DELETE_REQUEST:
      return { loading: true };
    case APPOINTMENT_MULTI_DELETE_SUCCESS:
      return {
        loading: false,
        multiDeleteSuccess: true
      };
    case APPOINTMENT_MULTI_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
