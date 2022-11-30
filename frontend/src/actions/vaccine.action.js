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
  VACCINE_EDIT_FAIL,
  VACCINE_REQUEST,
  VACCINE_SUCCESS,
  VACCINE_FAIL
} from '../constants/vaccine.constant';
import { logout } from './user.action';
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
    localStorage.setItem('vaccines', JSON.stringify(data.rows));
  } catch (error) {
    dispatch({
      type: VACCINE_LIST_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const getVaccine = (id) => async (dispatch) => {
  try {
    dispatch({
      type: VACCINE_REQUEST
    });

    const url = `${BASE_URL}/api/vaccines/${id}`;

    const { data } = await axios.get(url);

    dispatch({
      type: VACCINE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VACCINE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

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
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: SINGLE_PRODUCT_DELETE_FAIL,
      payload: error.response ? error.response.data.error : error.message
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
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: MULTI_PRODUCT_DELETE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const createVaccine = (vaccine) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VACCINE_CREATE_REQUEST
    });

    const fileName = vaccine.image.name;
    const fileType = vaccine.image.type;
    const uploadUrl = `${BASE_URL}/api/upload/get-s3-signed-url?file-name=${fileName}&file-type=${fileType}&bucket-name=vaccines`;
    const { data } = await axios.get(uploadUrl);
    const sendData = { ...vaccine, image: data.url };

    const uploadConfig = {
      headers: {
        'Content-Type': fileType
      }
    };

    await axios.put(data.signedRequest, vaccine.image, uploadConfig);

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    };

    const url = `${BASE_URL}/api/vaccines`;

    const { result } = await axios.post(url, sendData, config);

    dispatch({
      type: VACCINE_CREATE_SUCCESS,
      payload: result
    });
    document.location.href = '/admin-home/vaccines';
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: VACCINE_CREATE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const editVaccine = (vaccine) => async (dispatch, getState) => {
  try {
    dispatch({
      type: VACCINE_EDIT_REQUEST
    });

    const file = vaccine.imageFile;
    let sendData;
    if (file) {
      console.log('vaccine', file.name);
      const fileName = file.name;
      const fileType = file.type;
      const uploadUrl = `${BASE_URL}/api/upload/get-s3-signed-url?file-name=${fileName}&file-type=${fileType}&bucket-name=vaccines`;
      const { data } = await axios.get(uploadUrl);
      sendData = { ...vaccine, image: data.url };

      const uploadConfig = {
        headers: {
          'Content-Type': fileType
        }
      };

      await axios.put(data.signedRequest, vaccine.imageFile, uploadConfig);
    } else {
      sendData = vaccine;
    }

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        'Content-Type': 'application/json'
      }
    };

    const url = `${BASE_URL}/api/vaccines/${vaccine.id}`;
    console.log('vaccine1', sendData);

    const { result } = await axios.put(url, sendData, config);

    dispatch({
      type: VACCINE_EDIT_SUCCESS,
      payload: result
    });
    document.location.href = '/admin-home/vaccines';
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: VACCINE_EDIT_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
