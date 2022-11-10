import axios from 'axios';
import {
  VACCINE_LIST_REQUEST,
  VACCINE_LIST_SUCCESS,
  VACCINE_LIST_FAIL
} from '../constants/vaccine.constant';

export const getVaccineList = (vaccineGroup) => async (dispatch) => {
  try {
    dispatch({
      type: VACCINE_LIST_REQUEST
    });
    const BASE_URL = process.env.BASE_URL;
    const url = vaccineGroup
      ? `${BASE_URL}/api/vaccines?vaccineGroup=${vaccineGroup}`
      : `${BASE_URL}/api/vaccines`;

    const { data } = await axios.get(url);
    const { vaccines } = data;

    dispatch({
      type: VACCINE_LIST_SUCCESS,
      payload: vaccines
    });
  } catch (error) {
    dispatch({
      type: VACCINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
