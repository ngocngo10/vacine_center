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
  CATEGORY_CREATE_FAIL
} from '../constants/category.constant';
import { BASE_URL } from '../constants/base_url.constant';
import { useHref } from 'react-router-dom';

export const getCategoryList = () => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST
    });

    const url = `${BASE_URL}/api/categories`;

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

    localStorage.setItem('disease-categories', JSON.stringify(data.rows));
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
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
      payload: data.rows
    });
  } catch (error) {
    dispatch({
      type: AGE_GROUPS_CATEGORY_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
