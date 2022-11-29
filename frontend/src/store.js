import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userRegisterReducer, userLoginReducer } from './reducers/user.reducer';
import { categoryListReducer, ageGroupsCategoryListReducer } from './reducers/category.reducer';
import {
  vaccineListReducer,
  vaccineSingleDeleteReducer,
  vaccineMultiDeleteReducer,
  vaccineCreateReducer,
  vaccineEditReducer,
  vaccineReducer
} from './reducers/vaccine.reducer';
import {
  vaccineInformCreateReducer,
  vaccineInformListReducer,
  vaccineInformDeleteReducer,
  vaccineInformEditReducer
} from './reducers/vaccine_detail.reducer';
import { uploadReducer } from './reducers/upload.reducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  categoryList: categoryListReducer,
  vaccineList: vaccineListReducer,
  vaccineSingleDelete: vaccineSingleDeleteReducer,
  vaccineMultiDelete: vaccineMultiDeleteReducer,
  vaccineCreate: vaccineCreateReducer,
  upload: uploadReducer,
  vaccineEdit: vaccineEditReducer,
  vaccineInformCreate: vaccineInformCreateReducer,
  vaccineInformList: vaccineInformListReducer,
  vaccineInformDelete: vaccineInformDeleteReducer,
  vaccineInformEdit: vaccineInformEditReducer,
  ageGroupsCategoryList: ageGroupsCategoryListReducer,
  vaccine: vaccineReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const vaccineListFromStorage = localStorage.getItem('vaccines')
  ? JSON.parse(localStorage.getItem('vaccines'))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  vaccineList: { vaccines: vaccineListFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
