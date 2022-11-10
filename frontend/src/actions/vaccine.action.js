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

    const url = vaccineGroup
      ? `http://localhost:8080/api/vaccines?vaccineGroup=${vaccineGroup}`
      : `http://localhost:8080/api/vaccines`;

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
