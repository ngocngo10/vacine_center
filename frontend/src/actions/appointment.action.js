import axios from 'axios';
import {
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_CREATE_FAIL
} from '../constants/appointment.constant';

import { logout } from './user.action';
import { BASE_URL } from '../constants/base_url.constant';

export const createAppointment = (appointment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_CREATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    };

    const url = `${BASE_URL}/api/appointments`;

    const { result } = await axios.post(url, appointment, config);

    dispatch({
      type: APPOINTMENT_CREATE_SUCCESS,
      payload: result
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_CREATE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
