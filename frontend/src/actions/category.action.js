import axios from 'axios';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL
} from '../constants/category.constant';
import { BASE_URL } from '../constants/base_url.constant';

export const getCategoryList = (cateGroup) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST
    });

    const url = cateGroup
      ? `${BASE_URL}/api/categories?categoryGroup=${cateGroup}`
      : `${BASE_URL}/api/categories`;
    const { data } = await axios.get(url);
    const categories = [];
    let index = 0;
    while (categories.length < data.categories.length / 6.0) {
      categories.push(data.categories.slice(index, index + 6));
      index = index + 6;
    }

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: categories
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
