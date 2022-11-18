import axios from 'axios';
import {
  VACCINE_LIST_REQUEST,
  VACCINE_LIST_SUCCESS,
  VACCINE_LIST_FAIL,
  VACCINE_DETAIL_REQUEST,
  VACCINE_DETAIL_SUCCESS,
  VACCINE_DETAIL_FAIL,
  SINGLE_PRODUCT_DELETE_REQUEST,
  SINGLE_PRODUCT_DELETE_SUCCESS,
  SINGLE_PRODUCT_DELETE_FAIL
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

export const getVaccineDetails = (vaccineId) => async (dispatch) => {
  try {
    dispatch({
      type: VACCINE_DETAIL_REQUEST
    });

    const url = `${BASE_URL}/api/vaccine-details?vaccineId=${vaccineId}`;

    const { data } = await axios.get(url);

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

export const deleteSingleVaccine = (vaccineId) => async (dispatch) => {
  try {
    dispatch({
      type: SINGLE_PRODUCT_DELETE_REQUEST
    });

    const url = `${BASE_URL}/api/vaccines/${vaccineId}`;

    const { data } = await axios.delete(url);

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
