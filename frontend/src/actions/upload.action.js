import axios from 'axios';
import { UPLOAD_REQUEST, UPLOAD_SUCCESS, UPLOAD_FAIL } from '../constants/upload.constant';
import { BASE_URL } from '../constants/base_url.constant';

export const getSignedRequest = (file) => async (dispatch) => {
  try {
    dispatch({
      type: UPLOAD_REQUEST
    });
    const fileName = file.name;
    const fileType = file.type;
    const url = `${BASE_URL}/api/upload/get-s3-signed-url?file-name=${fileName}&file-type=${fileType}&bucket-name=vaccines`;
    console.log('url', url);

    const { data } = await axios.get(url);
    console.log('getSignedRequest', data);
    console.log('file type', fileType);
    const config = {
      headers: {
        'Content-Type': fileType
        // 'x-amz-acl': 'public-read'
      }
    };

    // const requestOptions = {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': fileType
    //     'Access-Control-Allow-Origin': 'http://127.0.0.1:5173'
    //   },
    //   body: file
    // };
    // await fetch(data.signedRequest, requestOptions);

    await axios.put(data.signedRequest, file, config);

    dispatch({
      type: UPLOAD_SUCCESS,
      payload: data
    });
  } catch (error) {
    console.log('error', error);
    dispatch({
      type: UPLOAD_FAIL,
      payload: error.response?.data.error
    });
  }
};
