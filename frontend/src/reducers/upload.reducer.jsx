import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAIL } from '../constants/upload.constant';

export const uploadReducer = (state = {}, action) => {
  switch (action.type) {
    case UPLOAD_REQUEST:
      return { ...state, loading: true };
    case UPLOAD_SUCCESS:
      return { ...state, loading: false, uploadSuccess: action.payload };
    case UPLOAD_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
