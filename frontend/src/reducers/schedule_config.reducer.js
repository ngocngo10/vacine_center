import {
  SCHEDULE_CONFIGS_REQUEST,
  SCHEDULE_CONFIGS_SUCCESS,
  SCHEDULE_CONFIGS_FAIL,
  SCHEDULE_CONFIG_CREATE_REQUEST,
  SCHEDULE_CONFIG_CREATE_SUCCESS,
  SCHEDULE_CONFIG_CREATE_FAIL,
  SCHEDULE_CONFIG_EDIT_REQUEST,
  SCHEDULE_CONFIG_EDIT_SUCCESS,
  SCHEDULE_CONFIG_EDIT_FAIL
} from '../constants/schedule_config.constant';

export const scheduleConfigsReducer = (state = {}, action) => {
  switch (action.type) {
    case SCHEDULE_CONFIGS_REQUEST:
      return { loading: true };
    case SCHEDULE_CONFIGS_SUCCESS:
      return {
        loading: false,
        scheduleConfigList: action.payload
      };
    case SCHEDULE_CONFIGS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const scheduleConfigEditReducer = (state = {}, action) => {
  switch (action.type) {
    case SCHEDULE_CONFIG_EDIT_REQUEST:
      return { loading: true };
    case SCHEDULE_CONFIG_EDIT_SUCCESS:
      return {
        loading: false,
        editSuccess: true
      };
    case SCHEDULE_CONFIG_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const scheduleConfigCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SCHEDULE_CONFIG_CREATE_REQUEST:
      return { loading: true };
    case SCHEDULE_CONFIG_CREATE_SUCCESS:
      return {
        loading: false,
        createSuccess: true
      };
    case SCHEDULE_CONFIG_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
