import {
  SCREEN_TEST_CREATE_REQUEST,
  SCREEN_TEST_CREATE_SUCCESS,
  SCREEN_TEST_CREATE_FAIL,
  SCREEN_TEST_EDIT_REQUEST,
  SCREEN_TEST_EDIT_SUCCESS,
  SCREEN_TEST_EDIT_FAIL
} from '../constants/screen_test.constant';

export const screenTestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SCREEN_TEST_CREATE_REQUEST:
      return { loading: true };
    case SCREEN_TEST_CREATE_SUCCESS:
      return {
        loading: false,
        createSuccess: true
      };
    case SCREEN_TEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const screenTestEditReducer = (state = {}, action) => {
  switch (action.type) {
    case SCREEN_TEST_EDIT_REQUEST:
      return { loading: true };
    case SCREEN_TEST_EDIT_SUCCESS:
      return {
        loading: false,
        editSuccess: true
      };
    case SCREEN_TEST_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
