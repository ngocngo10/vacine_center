import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VaccineListPage from './pages/VaccineListPage';
import VaccineDetailPage from './pages/VaccineDetailPage';
import AdminMain from './layout/AdminMain';
import AdminVaccinePage from './pages/AdminVaccinePage';
import AdminAddVaccine from './pages/AdminAddVaccine';
import AdminUpdateVaccine from './pages/AdminUpdateVaccine';
import AdminDetailVaccine from './pages/AdminDetailVaccine';

import AdminDiseaseCategories from './pages/AdminDiseaseCategories';
import AdminUpdateCategory from './pages/AdminUpdateCategory';
import AdminAddCategory from './pages/AdminAddCategory';

import AdminAgeGroupsPage from './pages/AdminAgeGroupsPage';
import AdminUpdateGroupPage from './pages/AdminUpdateAgeGroupPage';
import AdminAddAgeGroupPage from './pages/AdminAddAgeGroupPage';

import AdminScheduleConfig from './pages/AdminScheduleConfig';

import RegisterAppointmentPage from './pages/RegisterAppointmentPage';
import HomePage from './pages/HomePage';
import AppointmentHistoryPage from './pages/AppointmentHistoryPage';

import StaffMain from './layout/StaffMain';
import StaffAppointmentPage from './pages/StaffAppointmentPage';
import StaffAppointmentDetailPage from './pages/StaffAppoinmentDetailPage';
import StaffAppointmentsOnDayPage from './pages/StaffAppointmentsOnDayPage';
import StaffAppointmentDetailOnDayPage from './pages/StaffAppointmentDetailOnDayPage';

import StaffInjectionHistoryPage from './pages/StaffInjectionHistoryPage';
import StaffInjectionHistoryDetailPage from './pages/StaffInjectionHistoryDetailPage';

import AdminUsersPage from './pages/AdminUsersPage';
import AdminUpdateUserPage from './pages/AdminUpdateUserPage';
import Main from './components/Main';
const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Main />}>
        <Route index element={<HomePage />} />
        <Route exact path="register" element={<SignUpPage />} />
        <Route exact path="login" element={<SignInPage />} />
        <Route path="vaccine-list" element={<VaccineListPage />} />
        <Route path="vaccine-detail/:vaccineId" element={<VaccineDetailPage />} />

        <Route path="register-appointment" element={<RegisterAppointmentPage />} />
        <Route path="appointment-history" element={<AppointmentHistoryPage />} />
      </Route>

      <Route exact path="/admin-home" element={<AdminMain />}>
        <Route index element={<AdminVaccinePage />} />
        <Route path="vaccines" element={<AdminVaccinePage />} />
        <Route path="vaccines/:id" element={<AdminDetailVaccine />} />
        <Route path="vaccines/add-vaccine" element={<AdminAddVaccine />} />
        <Route path="vaccines/update-vaccine/:id" element={<AdminUpdateVaccine />} />

        <Route path="disease-categories" element={<AdminDiseaseCategories />} />
        <Route path="disease-categories/update/:id" element={<AdminUpdateCategory />} />
        <Route path="disease-categories/add" element={<AdminAddCategory />} />

        <Route path="age-groups-categories" element={<AdminAgeGroupsPage />} />
        <Route path="age-groups-categories/update/:id" element={<AdminUpdateGroupPage />} />
        <Route path="age-groups-categories/add" element={<AdminAddAgeGroupPage />} />

        <Route path="appointment-schedule/config" element={<AdminScheduleConfig />} />

        <Route path="users" element={<AdminUsersPage />} />
        <Route path="users/:id" element={<AdminUpdateUserPage />} />
      </Route>

      <Route exact path="/staff-home" element={<StaffMain />}>
        <Route index element={<StaffAppointmentPage />} />
        <Route path="appointments" element={<StaffAppointmentPage />} />
        <Route path="appointments/details/:id" element={<StaffAppointmentDetailPage />} />
        <Route path="appointments-on-day" element={<StaffAppointmentsOnDayPage />} />
        <Route
          path="appointments-on-day/details/:id"
          element={<StaffAppointmentDetailOnDayPage />}
        />
        <Route path="appointments-history" element={<StaffInjectionHistoryPage />} />
        <Route
          path="appointments-history/details/:patientId"
          element={<StaffInjectionHistoryDetailPage />}
        />
      </Route>
    </Routes>
  );
};

export default Routing;
