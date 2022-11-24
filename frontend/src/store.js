import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userRegisterReducer, userLoginReducer } from './reducers/user.reducer';
import { categoryListReducer } from './reducers/category.reducer';
import {
  vaccineListReducer,
  vaccineDetailReducer,
  vaccineSingleDeleteReducer,
  vaccineMultiDeleteReducer,
  vaccineCreateReducer,
  vaccineEditReducer
} from './reducers/vaccine.reducer';
import { vaccineInformCreateReducer } from './reducers/vaccine_detail.reducer';
import { uploadReducer } from './reducers/upload.reducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  categoryList: categoryListReducer,
  vaccineList: vaccineListReducer,
  vaccineDetail: vaccineDetailReducer,
  vaccineSingleDelete: vaccineSingleDeleteReducer,
  vaccineMultiDelete: vaccineMultiDeleteReducer,
  vaccineCreate: vaccineCreateReducer,
  upload: uploadReducer,
  vaccineEdit: vaccineEditReducer,
  vaccineInformCreate: vaccineInformCreateReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = { userLogin: { userInfo: userInfoFromStorage } };

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
