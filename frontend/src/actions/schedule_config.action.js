import axios from 'axios';
import {
  SCHEDULE_CONFIGS_REQUEST,
  SCHEDULE_CONFIGS_SUCCESS,
  SCHEDULE_CONFIGS_FAIL,
  SCHEDULE_CONFIG_CREATE_REQUEST,
  SCHEDULE_CONFIG_CREATE_SUCCESS,
  SCHEDULE_CONFIG_CREATE_FAIL,
  SCHEDULE_CONFIG_EDIT_REQUEST,
  SCHEDULE_CONFIG_EDIT_SUCCESS,
  SCHEDULE_CONFIG_EDIT_FAIL
} from '../constants/schedule_config.constant';
import { logout } from './user.action';
import { BASE_URL } from '../constants/base_url.constant';

export const getScheduleConfigs = () => async (dispatch) => {
  try {
    dispatch({
      type: SCHEDULE_CONFIGS_REQUEST
    });

    const url = `${BASE_URL}/api/schedule-configs`;

    const { data } = await axios.get(url);

    dispatch({
      type: SCHEDULE_CONFIGS_SUCCESS,
      payload: data.scheduleConfig
    });
  } catch (error) {
    dispatch({
      type: SCHEDULE_CONFIGS_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const createScheduleConfig = (scheduleConfig) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SCHEDULE_CONFIG_CREATE_REQUEST
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

    const url = `${BASE_URL}/api/schedule-configs`;

    const { result } = await axios.post(url, scheduleConfig, config);

    dispatch({
      type: SCHEDULE_CONFIG_CREATE_SUCCESS,
      payload: result
    });
  } catch (error) {
    if (error.response?.status == 401 || error.response?.status == 403) {
      dispatch(logout());
    }
    dispatch({
      type: SCHEDULE_CONFIG_CREATE_FAIL,
      payload: error.response ? error.response.data.error : error.message
    });
  }
};

export const editScheduleConfig =
  ({ scheduleConfig, id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: SCHEDULE_CONFIG_EDIT_REQUEST
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

      const url = `${BASE_URL}/api/schedule-configs/${id}`;

      const { result } = await axios.put(url, scheduleConfig, config);

      dispatch({
        type: SCHEDULE_CONFIG_EDIT_SUCCESS,
        payload: result
      });
    } catch (error) {
      if (error.response?.status == 401 || error.response?.status == 403) {
        dispatch(logout());
      }
      dispatch({
        type: SCHEDULE_CONFIG_EDIT_FAIL,
        payload: error.response ? error.response.data.error : error.message
      });
    }
  };
