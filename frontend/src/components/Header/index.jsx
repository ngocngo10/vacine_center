import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../../layout/Container';
import './index.css';
const Header = () => {
  return (
    <header className="page-header">
      <div className="header-top">
        <Container>
          <Link to="/" className="logo">
            MEDDICAL
          </Link>
          <ul className="header-actions">
            <li className="header-action__emergency">
              <ul className="header-action__item">
                <li>LIÊN HỆ</li>
                <li>
                  <time>0364675651</time>
                </li>
              </ul>
            </li>
            <li className="header-action__time">
              <ul className="header-action__item">
                <li>GIỜ LÀM VIỆC</li>
                <li>
                  <time>07:00 - 20:00 Everyday</time>
                </li>
              </ul>
            </li>
            <li className="header-action__location">
              <ul className="header-action__item">
                <li>LOCATION</li>
                <li>
                  <time>57 Ngô Thì Nhậm</time>
                </li>
              </ul>
            </li>
          </ul>
        </Container>
      </div>
      <div className="header-nav">
        <Container>
          <ul className="header-menu">
            <li>
              <a href="#">Trang chủ</a>
            </li>
            <li>
              <a href="#">Giới thiệu</a>
            </li>
            <li>
              <a href="#">Gói tiêm</a>
            </li>
            <li>
              <a href="#">Cẩm nang</a>
            </li>
            <li>
              <a href="#">Bảng giá </a>
            </li>
            <li>
              <a href="#">Bệnh học</a>
            </li>
          </ul>
        </Container>
      </div>
    </header>
  );
};

export default Header;
