import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  AGE_GROUPS_CATEGORY_REQUEST,
  AGE_GROUPS_CATEGORY_SUCCESS,
  AGE_GROUPS_CATEGORY_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_EDIT_REQUEST,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
  CATEGORY_CREATE_REQUEST,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_CREATE_FAIL,
  MULTI_CATEGORY_DELETE_REQUEST,
  MULTI_CATEGORY_DELETE_SUCCESS,
  MULTI_CATEGORY_DELETE_FAIL
} from '../constants/category.constant';

export const categoryListReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.rows,
        totalItem: action.payload.count
      };
    case CATEGORY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        deleteSuccess: true
      };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const multiCategoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MULTI_CATEGORY_DELETE_REQUEST:
      return { loading: true };
    case MULTI_CATEGORY_DELETE_SUCCESS:
      return {
        loading: false,
        deleteMultiSuccess: true
      };
    case MULTI_CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryEditReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_EDIT_REQUEST:
      return { loading: true };
    case CATEGORY_EDIT_SUCCESS:
      return {
        loading: false,
        editSuccess: true
      };
    case CATEGORY_EDIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case CATEGORY_CREATE_SUCCESS:
      return {
        loading: false,
        createSuccess: true
      };
    case CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
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
