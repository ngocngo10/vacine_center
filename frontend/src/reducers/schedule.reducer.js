import {
  SCHEDULE_ON_DAY_REQUEST,
  SCHEDULE_ON_DAY_SUCCESS,
  SCHEDULE_ON_DAY_FAIL
} from '../constants/schedule.constant';

export const scheduleOnDayReducer = (state = {}, action) => {
  switch (action.type) {
    case SCHEDULE_ON_DAY_REQUEST:
      return { loading: true };
    case SCHEDULE_ON_DAY_SUCCESS:
      return {
        loading: false,
        schedules: action.payload
      };
    case SCHEDULE_ON_DAY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
