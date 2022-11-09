import axios from 'axios';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL
} from '../constants/category.constant';

export const getCategoryList = (cateGroup) => async (dispatch) => {
  try {
    dispatch({
      type: CATEGORY_LIST_REQUEST
    });
    const url = cateGroup
      ? `http://localhost:8080/api/categories`
      : `http://localhost:8080/api/categories?categoryGroup=${cateGroup}`;
    const { data } = await axios.get(url);
    const categories = [];
    let index = 0;
    while (categories.length < data.categories.length / 6.0) {
      categories.push(data.categories.slice(index, index + 6));
      index = index + 6;
    }
    console.log(data, 'cate', categories);
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
