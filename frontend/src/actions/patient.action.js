import axios from 'axios';
import {
  PATIENT_LIST_REQUEST,
  PATIENT_LIST_SUCCESS,
  PATIENT_LIST_FAIL,
  PATIENT_REQUEST,
  PATIENT_SUCCESS,
  PATIENT_FAIL
} from '../constants/patient.constant';

import { logout } from './user.action';
import { BASE_URL } from '../constants/base_url.constant';

export const getPatientList = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_LIST_REQUEST
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

    const reqQuery = { ...query, perPage: query.perPage, page: query.page };

    const queries = [];
    for (let key in reqQuery) {
      if (reqQuery[key]) {
        queries.push(`${key}=${reqQuery[key]}`);
      }
    }
    const queryString = queries.join('&');

    const url = queryString
      ? `${BASE_URL}/api/patients?${queryString}`
      : `${BASE_URL}/api/patients`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: PATIENT_LIST_SUCCESS,
      payload: data
    });

    localStorage.setItem('patients', JSON.stringify(data.rows));
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: PATIENT_LIST_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const getPatient = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PATIENT_REQUEST
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

    const url = `${BASE_URL}/api/patients/${id}`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: PATIENT_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: PATIENT_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
