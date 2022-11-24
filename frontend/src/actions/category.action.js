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
    const carouselCategories = [];
    let index = 0;
    while (carouselCategories.length < data.rows.length / 6.0) {
      carouselCategories.push(data.rows.slice(index, index + 6));
      index = index + 6;
    }

    dispatch({
      type: CATEGORY_LIST_SUCCESS,
      payload: { data, carouselCategories }
    });
  } catch (error) {
    dispatch({
      type: CATEGORY_LIST_FAIL,
      payload: error.response.data.error
    });
  }
};
