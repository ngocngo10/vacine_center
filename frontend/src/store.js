import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  userRegisterReducer,
  userLoginReducer,
  userListReducer,
  userReducer,
  userCreateReducer,
  userEditReducer
} from './reducers/user.reducer';
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

import {
  appointmentCreateReducer,
  appointmentListReducer,
  appointmentEditReducer,
  appointmentDeleteReducer,
  appointmentMultiDeleteReducer,
  appointmentReducer,
  appointmentConfirmReducer
} from './reducers/appointment.reducer';

import {
  injectionCreateReducer,
  injectionListReducer,
  injectionReducer,
  injectionDeleteMultiReducer
} from './reducers/injection.reducer';

import {
  vaccineListWareHouseReducer,
  vaccineWareHouseCreateReducer
} from './reducers/warehouse.reducer';

import { screenTestCreateReducer, screenTestEditReducer } from './reducers/screen_test.reducer';

import { patientListReducer, patientReducer } from './reducers/patient.reducer';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,

  userList: userListReducer,
  user: userReducer,
  userCreate: userCreateReducer,
  userEdit: userEditReducer,

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
  scheduleOnDay: scheduleOnDayReducer,

  appointmentCreate: appointmentCreateReducer,
  appointmentList: appointmentListReducer,
  appointmentEdit: appointmentEditReducer,
  appointmentDelete: appointmentDeleteReducer,
  appointmentMultiDelete: appointmentMultiDeleteReducer,
  appointment: appointmentReducer,
  appointmentConfirm: appointmentConfirmReducer,

  injectionCreate: injectionCreateReducer,
  injectionList: injectionListReducer,
  injection: injectionReducer,

  vaccineListWareHouse: vaccineListWareHouseReducer,
  vaccineWareHouseCreate: vaccineWareHouseCreateReducer,

  screenTestCreate: screenTestCreateReducer,
  screenTestEdit: screenTestEditReducer,

  patientList: patientListReducer,
  patient: patientReducer,
  injectionDeleteMulti: injectionDeleteMultiReducer
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

const patientsFromStorage = localStorage.getItem('patients')
  ? JSON.parse(localStorage.getItem('patients'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  vaccineList: { vaccines: vaccineListFromStorage },
  categoryList: { categories: diseaseCategoriesFromStorage },
  patientList: {
    patients: patientsFromStorage
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
