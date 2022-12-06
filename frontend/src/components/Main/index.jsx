import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../layout/Header';
import './index.css';
const Main = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Main;
