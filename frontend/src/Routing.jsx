import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VaccineListPage from './pages/VaccineListPage';
import VaccineDetailPage from './pages/VaccineDetailPage';

const Routing = () => {
  return (
    <Routes>
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/vaccine-list" element={<VaccineListPage />} />
      <Route path="/vaccine-detail" element={<VaccineDetailPage />} />
    </Routes>
  );
};

export default Routing;
