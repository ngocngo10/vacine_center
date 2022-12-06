import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { userRegisterReducer, userLoginReducer } from './reducers/user.reducer';
import {
  categoryListReducer,
  categoryDeleteReducer,
  categoryCreateReducer,
  multiCategoryDeleteReducer,
  ageGroupsCategoryListReducer,
  ageGroupsDeleteReducer,
  multiAgeGroupsDeleteReducer,
  ageGroupsEditReducer,
  ageGroupsCreateReducer
} from './reducers/category.reducer';
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

import {
  scheduleConfigCreateReducer,
  scheduleConfigsReducer,
  scheduleConfigEditReducer
} from './reducers/schedule_config.reducer';

import { provinceListReducer } from './reducers/province.reducer';

import { scheduleOnDayReducer } from './reducers/schedule.reducer';

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
  vaccine: vaccineReducer,
  categoryDelete: categoryDeleteReducer,
  categoryCreate: categoryCreateReducer,
  multiCategoryDelete: multiCategoryDeleteReducer,

  ageGroupsCategoryList: ageGroupsCategoryListReducer,
  ageGroupsDelete: ageGroupsDeleteReducer,
  multiAgeGroupsDelete: multiAgeGroupsDeleteReducer,
  ageGroupsEdit: ageGroupsEditReducer,
  ageGroupsCreate: ageGroupsCreateReducer,

  scheduleConfigCreate: scheduleConfigCreateReducer,
  scheduleConfigs: scheduleConfigsReducer,
  scheduleConfigEdit: scheduleConfigEditReducer,

  provinceList: provinceListReducer,
  scheduleOnDay: scheduleOnDayReducer
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const vaccineListFromStorage = localStorage.getItem('vaccines')
  ? JSON.parse(localStorage.getItem('vaccines'))
  : null;

const diseaseCategoriesFromStorage = localStorage.getItem('disease-categories')
  ? JSON.parse(localStorage.getItem('disease-categories'))
  : null;
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  vaccineList: { vaccines: vaccineListFromStorage },
  categoryList: { categories: diseaseCategoriesFromStorage }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
