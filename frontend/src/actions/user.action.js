import axios from 'axios';
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_REQUEST,
  USER_SUCCESS,
  USER_FAIL,
  USER_CREATE_REQUEST,
  USER_CREATE_SUCCESS,
  USER_CREATE_FAIL,
  USER_EDIT_REQUEST,
  USER_EDIT_SUCCESS,
  USER_EDIT_FAIL,
  PASSWORD_FORGOT_REQUEST,
  PASSWORD_FORGOT_SUCCESS,
  PASSWORD_FORGOT_FAIL,
  PASSWORD_CHANGE_REQUEST,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL
} from '../constants/user.constant';
import { BASE_URL } from '../constants/base_url.constant';

export const register = (values) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(`${BASE_URL}/auth/register`, values, config);

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const login = (sendData) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(`${BASE_URL}/auth/login`, sendData, config);

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data
    });

    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const getForgotPasswordLink = (email) => async (dispatch) => {
  try {
    dispatch({
      type: PASSWORD_FORGOT_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(`${BASE_URL}/auth/forgot-password`, email, config);

    dispatch({
      type: PASSWORD_FORGOT_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_FORGOT_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const changeNewPassword = (sendData) => async (dispatch) => {
  try {
    dispatch({
      type: PASSWORD_CHANGE_REQUEST
    });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const { data } = await axios.post(`${BASE_URL}/auth/change-password`, sendData, config);

    dispatch({
      type: PASSWORD_CHANGE_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PASSWORD_CHANGE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: USER_LOGOUT });
  document.location.href = '/login';
};

export const getUserList = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST
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

    const url = queryString ? `${BASE_URL}/api/users?${queryString}` : `${BASE_URL}/api/users`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: USER_LIST_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const getUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_REQUEST
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

    const url = `${BASE_URL}/api/users/${id}`;

    const { data } = await axios.get(url, config);

    dispatch({
      type: USER_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: USER_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const createUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_CREATE_REQUEST
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

    const url = `${BASE_URL}/api/users`;

    const { data } = await axios.post(url, user, config);

    dispatch({
      type: USER_CREATE_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: USER_CREATE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const editUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_EDIT_REQUEST
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

    const url = `${BASE_URL}/api/users/${user.id}`;

    const { data } = await axios.put(url, user, config);

    dispatch({
      type: USER_EDIT_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: USER_EDIT_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
