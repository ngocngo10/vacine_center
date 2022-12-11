import axios from 'axios';
import {
  INJECTION_LIST_REQUEST,
  INJECTION_LIST_SUCCESS,
  INJECTION_LIST_FAIL,
  INJECTION_REQUEST,
  INJECTION_SUCCESS,
  INJECTION_FAIL,
  INJECTION_CREATE_REQUEST,
  INJECTION_CREATE_SUCCESS,
  INJECTION_CREATE_FAIL
} from '../constants/injection.constant';

import { logout } from './user.action';
import { BASE_URL } from '../constants/base_url.constant';

export const createInjection = (injection) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INJECTION_CREATE_REQUEST
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

    const url = `${BASE_URL}/api/injections`;

    const { result } = await axios.post(url, injection, config);

    dispatch({
      type: INJECTION_CREATE_SUCCESS,
      payload: result
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: INJECTION_CREATE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const getInjectionList = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INJECTION_LIST_REQUEST
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
      ? `${BASE_URL}/api/injections?${queryString}`
      : `${BASE_URL}/api/injections`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: INJECTION_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: INJECTION_LIST_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const getInjection = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INJECTION_REQUEST
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

    const url = `${BASE_URL}/api/injections/${id}`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: INJECTION_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: INJECTION_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

// export const editAppointment = (appointment) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: APPOINTMENT_EDIT_REQUEST
//     });

//     const {
//       userLogin: { userInfo }
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//         'Content-Type': 'application/json'
//       }
//     };

//     const url = `${BASE_URL}/api/appointments/${appointment.id}`;

//     const { result } = await axios.put(url, appointment, config);

//     dispatch({
//       type: APPOINTMENT_EDIT_SUCCESS,
//       payload: result
//     });
//   } catch (error) {
//     if (error.response?.status == 401 || error.response?.status == 403) {
//       dispatch(logout());
//     }
//     dispatch({
//       type: APPOINTMENT_EDIT_FAIL,
//       payload: error.response ? error.response.data.error : error.message
//     });
//   }
// };

// export const deleteAppointment = (id) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: APPOINTMENT_DELETE_REQUEST
//     });

//     const {
//       userLogin: { userInfo }
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//         'Content-Type': 'application/json'
//       }
//     };

//     const url = `${BASE_URL}/api/appointments/${id}`;

//     const { result } = await axios.delete(url, config);

//     dispatch({
//       type: APPOINTMENT_DELETE_SUCCESS,
//       payload: result
//     });
//   } catch (error) {
//     if (error.response?.status == 401 || error.response?.status == 403) {
//       dispatch(logout());
//     }
//     dispatch({
//       type: APPOINTMENT_DELETE_FAIL,
//       payload: error.response ? error.response.data.error : error.message
//     });
//   }
// };

// export const deleteMultiAppointment = (ids) => async (dispatch, getState) => {
//   try {
//     dispatch({
//       type: APPOINTMENT_MULTI_DELETE_REQUEST
//     });

//     const {
//       userLogin: { userInfo }
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: `Bearer ${userInfo.token}`,
//         'Content-Type': 'application/json'
//       },
//       data: { ids }
//     };

//     const url = `${BASE_URL}/api/appointments`;

//     const { result } = await axios.delete(url, config);

//     dispatch({
//       type: APPOINTMENT_MULTI_DELETE_SUCCESS,
//       payload: result
//     });
//   } catch (error) {
//     if (error.response?.status == 401 || error.response?.status == 403) {
//       dispatch(logout());
//     }
//     dispatch({
//       type: APPOINTMENT_MULTI_DELETE_FAIL,
//       payload: error.response ? error.response.data.error : error.message
//     });
//   }
// };
