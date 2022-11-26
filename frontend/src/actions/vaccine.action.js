import axios from 'axios';
import {
  VACCINE_LIST_REQUEST,
  VACCINE_LIST_SUCCESS,
  VACCINE_LIST_FAIL,
  SINGLE_PRODUCT_DELETE_REQUEST,
  SINGLE_PRODUCT_DELETE_SUCCESS,
  SINGLE_PRODUCT_DELETE_FAIL,
  MULTI_PRODUCT_DELETE_REQUEST,
  MULTI_PRODUCT_DELETE_SUCCESS,
  MULTI_PRODUCT_DELETE_FAIL,
  VACCINE_CREATE_REQUEST,
  VACCINE_CREATE_SUCCESS,
  VACCINE_CREATE_FAIL,
  VACCINE_EDIT_REQUEST,
  VACCINE_EDIT_SUCCESS,
  VACCINE_EDIT_FAIL
} from '../constants/vaccine.constant';
import { BASE_URL } from '../constants/base_url.constant';

export const getVaccineList = (query) => async (dispatch) => {
  try {
    dispatch({
      type: VACCINE_LIST_REQUEST
    });
    const reqQuery = { ...query, perPage: query.perPage || 9, page: query.page };

    const queries = [];
    for (let key in reqQuery) {
      if (reqQuery[key]) {
        queries.push(`${key}=${reqQuery[key]}`);
      }
    }
    const queryString = queries.join('&');

    const url = queryString
      ? `${BASE_URL}/api/vaccines?${queryString}`
      : `${BASE_URL}/api/vaccines`;

    const { data } = await axios.get(url);

    dispatch({
      type: VACCINE_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VACCINE_LIST_FAIL,
      payload: error.response.data.error
    });
  }
};

// export const getVaccineDetails = (vaccineId) => async (dispatch) => {
//   try {
//     dispatch({
//       type: VACCINE_DETAIL_REQUEST
//     });

//     const url = `${BASE_URL}/api/vaccine-details?vaccineId=${vaccineId}`;

//     const { data } = await axios.get(url);

//     dispatch({
//       type: VACCINE_DETAIL_SUCCESS,
//       payload: data
//     });
//   } catch (error) {
//     dispatch({
//       type: VACCINE_DETAIL_FAIL,
//       payload: error.response.data.error
//     });
//   }
// };

export const deleteSingleVaccine = (vaccineId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SINGLE_PRODUCT_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const url = `${BASE_URL}/api/vaccines/${vaccineId}`;

    const { data } = await axios.delete(url, config);

    dispatch({
      type: SINGLE_PRODUCT_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_DELETE_FAIL,
      payload: error.response.data.error
    });
  }
};

export const deleteMultiVaccine = (ids) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MULTI_PRODUCT_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
      data: { ids: ids }
    };

    const url = `${BASE_URL}/api/vaccines`;

    const { data } = await axios.delete(url, config);

    dispatch({
      type: MULTI_PRODUCT_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: MULTI_PRODUCT_DELETE_FAIL,
      payload: error.response?.data.error
    });
  }
};

export const createVaccine = (vaccine) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VACCINE_CREATE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
      data: vaccine
    };

    const url = `${BASE_URL}/api/vaccines`;

    const { data } = await axios.post(url, config);

    dispatch({
      type: VACCINE_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VACCINE_CREATE_FAIL,
      payload: error.response?.data.error
    });
  }
};

export const editVaccine = (vaccine) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VACCINE_EDIT_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      },
      data: vaccine
    };

    const url = `${BASE_URL}/api/vaccines`;

    const { data } = await axios.put(url, config);

    dispatch({
      type: VACCINE_EDIT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VACCINE_EDIT_FAIL,
      payload: error.response?.data.error
    });
  }
};
