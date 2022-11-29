import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  AGE_GROUPS_CATEGORY_REQUEST,
  AGE_GROUPS_CATEGORY_SUCCESS,
  AGE_GROUPS_CATEGORY_FAIL
} from '../constants/category.constant';

export const categoryListReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_LIST_SUCCESS:
      return { ...state, loading: false, categories: action.payload };
    case CATEGORY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ageGroupsCategoryListReducer = (state = {}, action) => {
  switch (action.type) {
    case AGE_GROUPS_CATEGORY_REQUEST:
      return { loading: true };
    case AGE_GROUPS_CATEGORY_SUCCESS:
      return { loading: false, ageGroups: action.payload };
    case AGE_GROUPS_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
