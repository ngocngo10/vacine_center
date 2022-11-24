import axios from 'axios';
import {
  VACCINE_INFORM_CREATE_REQUEST,
  VACCINE_INFORM_CREATE_SUCCESS,
  VACCINE_INFORM_CREATE_FAIL,
  VACCINE_INFORM_LIST_REQUEST,
  VACCINE_INFORM_LIST_SUCCESS,
  VACCINE_INFORM_LIST_FAIL
} from '../constants/vaccine.constant';

export const createVaccineDetail = (vaccineDetail) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VACCINE_INFORM_CREATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
      data: vaccineDetail
    };

    const url = `${BASE_URL}/api/vaccine-details`;

    const { data } = await axios.post(url, config);

    dispatch({
      type: VACCINE_INFORM_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VACCINE_INFORM_CREATE_FAIL,
      payload: error.response?.data.error
    });
  }
};

export const getVaccineDetails = (vaccineId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VACCINE_INFORM_LIST_REQUEST
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

    const url = `${BASE_URL}/api/vaccine-details?vaccineId=${vaccineId}`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: VACCINE_INFORM_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VACCINE_INFORM_LIST_FAIL,
      payload: error.response?.data.error
    });
  }
};
