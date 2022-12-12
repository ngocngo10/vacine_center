import axios from 'axios';
import {
  WAREHOUSE_LIST_REQUEST,
  WAREHOUSE_LIST_SUCCESS,
  WAREHOUSE_LIST_FAIL,
  WAREHOUSE_CREATE_REQUEST,
  WAREHOUSE_CREATE_SUCCESS,
  WAREHOUSE_CREATE_FAIL
} from '../constants/warehouse.constant';
import { BASE_URL } from '../constants/base_url.constant';

export const getVaccineListWarehouse = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WAREHOUSE_LIST_REQUEST
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
      ? `${BASE_URL}/api/vaccine-items?${queryString}`
      : `${BASE_URL}/api/vaccine-items`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: WAREHOUSE_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: WAREHOUSE_LIST_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const createVaccineWarehouse = (fileUrl) => async (dispatch, getState) => {
  try {
    dispatch({
      type: WAREHOUSE_CREATE_REQUEST
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
    const body = { fileName: fileUrl };

    const url = `${BASE_URL}/api/upload/vaccine-items`;

    const { data } = await axios.post(url, body, config);

    dispatch({
      type: WAREHOUSE_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: WAREHOUSE_CREATE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
