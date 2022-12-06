import axios from 'axios';
import {
  SCHEDULE_ON_DAY_REQUEST,
  SCHEDULE_ON_DAY_SUCCESS,
  SCHEDULE_ON_DAY_FAIL
} from '../constants/schedule.constant';

import { BASE_URL } from '../constants/base_url.constant';

export const getScheduleOnDay = (day) => async (dispatch) => {
  try {
    dispatch({
      type: SCHEDULE_ON_DAY_REQUEST
    });

    const url = `${BASE_URL}/api/schedule?day=${day}`;

    const { data } = await axios.get(url);

    dispatch({
      type: SCHEDULE_ON_DAY_SUCCESS,
      payload: data.rows
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_ON_DAY_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
