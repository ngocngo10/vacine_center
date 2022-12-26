import {STATISTIC_REQUEST, STATISTIC_SUCCESS,STATISTIC_FAIL } from '../constants/statistic.constant'
export const statisticReducer = (state = {}, action) => {
  switch (action.type) {
    case STATISTIC_REQUEST:
      return { ...state, loading: true };
    case STATISTIC_SUCCESS:
      return {
        ...state,
        loading: false,
        statistics: action.payload.statistics,
 
      };
    case STATISTIC_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
