import React from 'react';
import Container from '../../layout/Container';
import Header from '../../components/Header';
import './index.css';

const VaccineListPage = () => {
  return (
    <>
      <Header />
      <main className="main-page">
        <Container>
          <h2>Thông tin sản phẩm vắc xin</h2>
        </Container>
      </main>
    </>
  );
};

export default VaccineListPage;
