import axios from 'axios';
import {
  APPOINTMENT_CREATE_REQUEST,
  APPOINTMENT_CREATE_SUCCESS,
  APPOINTMENT_CREATE_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_EDIT_REQUEST,
  APPOINTMENT_EDIT_SUCCESS,
  APPOINTMENT_EDIT_FAIL,
  APPOINTMENT_DELETE_REQUEST,
  APPOINTMENT_DELETE_SUCCESS,
  APPOINTMENT_DELETE_FAIL,
  APPOINTMENT_MULTI_DELETE_REQUEST,
  APPOINTMENT_MULTI_DELETE_SUCCESS,
  APPOINTMENT_MULTI_DELETE_FAIL,
  APPOINTMENT_REQUEST,
  APPOINTMENT_SUCCESS,
  APPOINTMENT_FAIL,
  CONFIRM_APPOINTMENT_REQUEST,
  CONFIRM_APPOINTMENT_SUCCESS,
  CONFIRM_APPOINTMENT_FAIL
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

export const confirmAppointment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CONFIRM_APPOINTMENT_REQUEST
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

    const url = `${BASE_URL}/api/staffs/appointments/confirm/${id}`;

    const { result } = await axios.put(url, {}, config);

    dispatch({
      type: CONFIRM_APPOINTMENT_SUCCESS,
      payload: result
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      // dispatch(logout());
    }
    dispatch({
      type: CONFIRM_APPOINTMENT_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const getAppointmentHistories = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_LIST_REQUEST
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

    const reqQuery = { ...query, perPage: query.perPage || 9, page: query.page };

    const queries = [];
    for (let key in reqQuery) {
      if (reqQuery[key]) {
        queries.push(`${key}=${reqQuery[key]}`);
      }
    }
    const queryString = queries.join('&');

    const url = queryString
      ? `${BASE_URL}/api/appointments?${queryString}`
      : `${BASE_URL}/api/appointments`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: APPOINTMENT_LIST_SUCCESS,
      payload: data
    });
    localStorage.setItem('appointments', JSON.stringify(data.rows));
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_LIST_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const getAppointment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_REQUEST
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

    const url = `${BASE_URL}/api/appointments/${id}`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: APPOINTMENT_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const editAppointment = (appointment) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_EDIT_REQUEST
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

    const url = `${BASE_URL}/api/appointments/${appointment.id}`;

    const { result } = await axios.put(url, appointment, config);

    dispatch({
      type: APPOINTMENT_EDIT_SUCCESS,
      payload: result
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_EDIT_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const deleteAppointment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_DELETE_REQUEST
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

    const url = `${BASE_URL}/api/appointments/${id}`;

    const { result } = await axios.delete(url, config);

    dispatch({
      type: APPOINTMENT_DELETE_SUCCESS,
      payload: result
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_DELETE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const deleteMultiAppointment = (ids) => async (dispatch, getState) => {
  try {
    dispatch({
      type: APPOINTMENT_MULTI_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
      data: { ids }
    };

    const url = `${BASE_URL}/api/appointments`;

    const { result } = await axios.delete(url, config);

    dispatch({
      type: APPOINTMENT_MULTI_DELETE_SUCCESS,
      payload: result
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: APPOINTMENT_MULTI_DELETE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
