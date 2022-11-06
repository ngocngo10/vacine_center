import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

const Routing = () => {
  return (
    <Routes>
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<SignInPage />} />
    </Routes>
  );
};

export default Routing;
