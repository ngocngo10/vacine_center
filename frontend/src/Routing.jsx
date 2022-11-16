import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VaccineListPage from './pages/VaccineListPage';
import VaccineDetailPage from './pages/VaccineDetailPage';
import AdminMain from './layout/AdminMain';
import AdminVaccinePage from './pages/AdminVaccinePage';

const Routing = () => {
  return (
    <Routes>
      <Route exact path="/register" element={<SignUpPage />} />
      <Route exact path="/login" element={<SignInPage />} />
      <Route path="/vaccine-list" element={<VaccineListPage />} />
      <Route path="/vaccine-detail/:vaccineId" element={<VaccineDetailPage />} />
      {/* <Route path="/admin-home" element={<AdminMain />} /> */}
      <Route exact path="/admin-home" element={<AdminMain />}>
        <Route index element={<AdminVaccinePage />} />
        <Route path="vaccines" element={<AdminVaccinePage />} />
      </Route>
    </Routes>
  );
};

export default Routing;
