import axios from 'axios';
import {
  SCREEN_TEST_CREATE_REQUEST,
  SCREEN_TEST_CREATE_SUCCESS,
  SCREEN_TEST_CREATE_FAIL,
  SCREEN_TEST_EDIT_REQUEST,
  SCREEN_TEST_EDIT_SUCCESS,
  SCREEN_TEST_EDIT_FAIL
} from '../constants/screen_test.constant';

import { logout } from './user.action';
import { BASE_URL } from '../constants/base_url.constant';

export const createScreenTest = (screenTest) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCREEN_TEST_CREATE_REQUEST
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

    const url = `${BASE_URL}/api/screening-tests`;

    const { result } = await axios.post(url, screenTest, config);

    dispatch({
      type: SCREEN_TEST_CREATE_SUCCESS,
      payload: result
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: SCREEN_TEST_CREATE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const editScreenTest = (screenTest) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCREEN_TEST_EDIT_REQUEST
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

    const url = `${BASE_URL}/api/screening-tests/${screenTest.id}`;

    const { result } = await axios.put(url, screenTest, config);

    dispatch({
      type: SCREEN_TEST_EDIT_SUCCESS,
      payload: result
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: SCREEN_TEST_EDIT_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};
