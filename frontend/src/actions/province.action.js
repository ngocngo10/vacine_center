import axios from 'axios';
import {
  PROVINCES_REQUEST,
  PROVINCES_SUCCESS,
  PROVINCES_FAIL
} from '../constants/province.constant';

export const getProvinceList = () => async (dispatch) => {
  try {
    dispatch({
      type: PROVINCES_REQUEST
    });

    const url = 'https://provinces.open-api.vn/api/?depth=3';

    const { data } = await axios.get(url);

    dispatch({
      type: PROVINCES_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: PROVINCES_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
