import React from 'react';
import Container from '../Container';
import './index.css';

const Footer = () => {
  return (
    <footer className="home-page-footer">
      <Container>
        <ul className="footer-contact">
          <li>Họ và tên: Ngô Thị Ngọc</li>
          <li>Lớp: 18T1</li>
          <li>Mã số sinh viên: 102180031</li>
          <li>Email: ngothingocbk99@gmail.com</li>
        </ul>
      </Container>
    </footer>
  );
};

export default Footer;
