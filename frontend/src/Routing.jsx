import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import VaccineListPage from './pages/VaccineListPage';

const Routing = () => {
  return (
    <Routes>
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/vaccine-list" element={<VaccineListPage />} />
    </Routes>
  );
};

export default Routing;
