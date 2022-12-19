import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import './index.css';
const Main = () => {
  return (
    <div className="page">
      <Header />
      <main className="page-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
