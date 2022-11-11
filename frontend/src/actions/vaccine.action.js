import axios from 'axios';
import {
  VACCINE_LIST_REQUEST,
  VACCINE_LIST_SUCCESS,
  VACCINE_LIST_FAIL
} from '../constants/vaccine.constant';
import { BASE_URL } from '../constants/base_url.constant';

export const getVaccineList = (query) => async (dispatch) => {
  try {
    dispatch({
      type: VACCINE_LIST_REQUEST
    });
    const reqQuery = { ...query, perPage: 6, page: query.page };
    console.log('reqQuery', reqQuery);
    const queries = [];
    for (let key in reqQuery) {
      if (reqQuery[key]) {
        queries.push(`${key}=${reqQuery[key]}`);
      }
    }
    const queryString = queries.join('&');
    console.log('queryString', queryString);

    const url = queryString
      ? `${BASE_URL}/api/vaccines?${queryString}`
      : `${BASE_URL}/api/vaccines`;

    const { data } = await axios.get(url);

    dispatch({
      type: VACCINE_LIST_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: VACCINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
