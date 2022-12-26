import axios from 'axios';
import {STATISTIC_REQUEST, STATISTIC_SUCCESS,STATISTIC_FAIL } from '../constants/statistic.constant'
import { logout } from './user.action';
import { BASE_URL } from '../constants/base_url.constant';

export const getStatistics = (query) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STATISTIC_REQUEST
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

    const reqQuery = { ...query };

    const queries = [];
    for (let key in reqQuery) {
      if (reqQuery[key]) {
        queries.push(`${key}=${reqQuery[key]}`);
      }
    }
    const queryString = queries.join('&');

    const url = queryString
      ? `${BASE_URL}/api/admin/statistics?${queryString}`
      : `${BASE_URL}/api/admin/statistics`;


    const { data } = await axios.get(url, config);

    dispatch({
      type: STATISTIC_SUCCESS,
      payload: data
    });


  } catch (error) {
    dispatch({
      type: STATISTIC_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
