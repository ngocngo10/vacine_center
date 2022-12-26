import axios from 'axios';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  AGE_GROUPS_CATEGORY_REQUEST,
  AGE_GROUPS_CATEGORY_SUCCESS,
  AGE_GROUPS_CATEGORY_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  MULTI_CATEGORY_DELETE_REQUEST,
  MULTI_CATEGORY_DELETE_SUCCESS,
  MULTI_CATEGORY_DELETE_FAIL,
  AGE_GROUPS_DELETE_REQUEST,
  AGE_GROUPS_DELETE_SUCCESS,
  AGE_GROUPS_DELETE_FAIL,
  MULTI_AGE_GROUPS_DELETE_REQUEST,
  MULTI_AGE_GROUPS_DELETE_SUCCESS,
  MULTI_AGE_GROUPS_DELETE_FAIL,
  AGE_GROUPS_EDIT_REQUEST,
  AGE_GROUPS_EDIT_SUCCESS,
  AGE_GROUPS_EDIT_FAIL,
  AGE_GROUPS_CREATE_REQUEST,
  AGE_GROUPS_CREATE_SUCCESS,
  AGE_GROUPS_CREATE_FAIL
} from '../constants/category.constant';
import { logout } from './user.action';
import { BASE_URL } from '../constants/base_url.constant';

export const getCategoryList = (query) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST
    });

    const reqQuery = { ...query };

    const queries = [];
    for (let key in reqQuery) {
      if (reqQuery[key]) {
        queries.push(`${key}=${reqQuery[key]}`);
      }
    }
    const queryString = queries.join('&');

    const url = queryString
      ? `${BASE_URL}/api/categories?${queryString}`
      : `${BASE_URL}/api/categories`;

    // const url = `${BASE_URL}/api/categories`;

    const { data } = await axios.get(url);
    // const carouselCategories = [];
    // let index = 0;
    // while (carouselCategories.length < data.rows.length / 6.0) {
    //   carouselCategories.push(data.rows.slice(index, index + 6));
    //   index = index + 6;
    // }

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: data
    });

    // localStorage.setItem('disease-categories', JSON.stringify(data.rows));
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const deleteMultiCategory = (ids) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MULTI_CATEGORY_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
      data: { ids }
    };

    const url = `${BASE_URL}/api/categories`;

    const { data } = await axios.delete(url, config);

    dispatch({
      type: MULTI_CATEGORY_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: MULTI_CATEGORY_DELETE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const url = `${BASE_URL}/api/categories/${id}`;

    const { data } = await axios.delete(url, config);

    dispatch({
      type: CATEGORY_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_DELETE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const editCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_EDIT_REQUEST
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

    const url = `${BASE_URL}/api/categories/${category.id}`;

    const { data } = await axios.put(url, category, config);

    dispatch({
      type: CATEGORY_EDIT_SUCCESS,
      payload: data
    });

    window.location.href = '/admin-home/disease-categories';
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_EDIT_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const createCategory = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATEGORY_CREATE_REQUEST
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

    const url = `${BASE_URL}/api/categories`;

    const { data } = await axios.post(url, category, config);

    dispatch({
      type: CATEGORY_CREATE_SUCCESS,
      payload: data
    });

    window.location.href = '/admin-home/disease-categories';
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: CATEGORY_CREATE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const getAgeGroups = () => async (dispatch) => {
  try {
    dispatch({
      type: AGE_GROUPS_CATEGORY_REQUEST
    });

    const url = `${BASE_URL}/api/age-groups`;

    const { data } = await axios.get(url);

    dispatch({
      type: AGE_GROUPS_CATEGORY_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: AGE_GROUPS_CATEGORY_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const deleteMultiAgeGroups = (ids) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MULTI_AGE_GROUPS_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      },
      data: { ids }
    };

    const url = `${BASE_URL}/api/age-groups`;

    const { data } = await axios.delete(url, config);

    dispatch({
      type: MULTI_AGE_GROUPS_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: MULTI_AGE_GROUPS_DELETE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const deleteAgeGroup = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AGE_GROUPS_DELETE_REQUEST
    });

    const {
      userLogin: { userInfo }
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const url = `${BASE_URL}/api/age-groups/${id}`;

    const { data } = await axios.delete(url, config);

    dispatch({
      type: AGE_GROUPS_DELETE_SUCCESS,
      payload: data
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: AGE_GROUPS_DELETE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const editAgeGroup = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AGE_GROUPS_EDIT_REQUEST
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

    const url = `${BASE_URL}/api/age-groups/${category.id}`;

    const { data } = await axios.put(url, category, config);

    dispatch({
      type: AGE_GROUPS_EDIT_SUCCESS,
      payload: data
    });

    window.location.href = '/admin-home/age-groups-categories';
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: AGE_GROUPS_EDIT_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const createAgeGroup = (category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AGE_GROUPS_CREATE_REQUEST
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

    const url = `${BASE_URL}/api/age-groups`;

    const { data } = await axios.post(url, category, config);

    dispatch({
      type: AGE_GROUPS_CREATE_SUCCESS,
      payload: data
    });

    window.location.href = '/admin-home/age-groups-categories';
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: AGE_GROUPS_CREATE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
