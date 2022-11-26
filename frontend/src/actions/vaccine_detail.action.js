import axios from 'axios';
import {
  VACCINE_INFORM_CREATE_REQUEST,
  VACCINE_INFORM_CREATE_SUCCESS,
  VACCINE_INFORM_CREATE_FAIL,
  VACCINE_INFORM_LIST_REQUEST,
  VACCINE_INFORM_LIST_SUCCESS,
  VACCINE_INFORM_LIST_FAIL,
  VACCINE_INFORM_EDIT_REQUEST,
  VACCINE_INFORM_EDIT_SUCCESS,
  VACCINE_INFORM_EDIT_FAIL,
  VACCINE_INFORM_DELETE_REQUEST,
  VACCINE_INFORM_DELETE_SUCCESS,
  VACCINE_INFORM_DELETE_FAIL
} from '../constants/vaccine.constant';
import { BASE_URL } from '../constants/base_url.constant';

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
      }
    };

    const url = `${BASE_URL}/api/vaccine-details`;
    const { data } = await axios.post(url, vaccineDetail, config);

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

export const deleteVaccineDetail = (informId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VACCINE_INFORM_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const url = `${BASE_URL}/api/vaccine-details/${informId}`;
    const { data } = await axios.delete(url, config);

    dispatch({
      type: VACCINE_INFORM_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VACCINE_INFORM_DELETE_FAIL,
      payload: error.response?.data.error
    });
  }
};

export const editVaccineDetail =
  ({ vaccineDetail, informId }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: VACCINE_INFORM_EDIT_REQUEST
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

      const url = `${BASE_URL}/api/vaccine-details/${informId}`;
      const { data } = await axios.put(url, vaccineDetail, config);

      dispatch({
        type: VACCINE_INFORM_EDIT_SUCCESS,
        payload: data
      });
    } catch (error) {
      dispatch({
        type: VACCINE_INFORM_EDIT_FAIL,
        payload: error.response?.data.error
      });
    }
  };

export const getVaccineDetails = (vaccineId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VACCINE_INFORM_LIST_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const url = `${BASE_URL}/api/vaccine-details?vaccineId=${vaccineId}`;
    console.log('url', url);

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
