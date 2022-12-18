import {
  INJECTION_LIST_REQUEST,
  INJECTION_LIST_SUCCESS,
  INJECTION_LIST_FAIL,
  INJECTION_REQUEST,
  INJECTION_SUCCESS,
  INJECTION_FAIL,
  INJECTION_CREATE_REQUEST,
  INJECTION_CREATE_SUCCESS,
  INJECTION_CREATE_FAIL,
  INJECTION_DELETE_MULTI_REQUEST,
  INJECTION_DELETE_MULTI_SUCCESS,
  INJECTION_DELETE_MULTI_FAIL
} from '../constants/injection.constant';

export const injectionCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case INJECTION_CREATE_REQUEST:
      return { loading: true };
    case INJECTION_CREATE_SUCCESS:
      return {
        loading: false,
        createSuccess: true
      };
    case INJECTION_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const injectionListReducer = (state = {}, action) => {
  switch (action.type) {
    case INJECTION_LIST_REQUEST:
      return { loading: true };
    case INJECTION_LIST_SUCCESS:
      return {
        loading: false,
        injections: action.payload.rows,
        totalItem: action.payload.count
      };
    case INJECTION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const injectionReducer = (state = {}, action) => {
  switch (action.type) {
    case INJECTION_REQUEST:
      return { loading: true };
    case INJECTION_SUCCESS:
      return {
        loading: false,
        injectionItem: action.payload
      };
    case INJECTION_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const injectionDeleteMultiReducer = (state = {}, action) => {
  switch (action.type) {
    case INJECTION_DELETE_MULTI_REQUEST:
      return { loading: true };
    case INJECTION_DELETE_MULTI_SUCCESS:
      return {
        loading: false,
        deleteMultiSuccess: true
      };
    case INJECTION_DELETE_MULTI_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
