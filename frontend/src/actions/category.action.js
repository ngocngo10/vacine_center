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
  CATEGORY_DELETE_FAIL
} from '../constants/category.constant';
import { BASE_URL } from '../constants/base_url.constant';

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
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_DELETE_REQUEST
    });

    const url = `${BASE_URL}/api/categories/${id}`;

    const { data } = await axios.delete(url);

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
