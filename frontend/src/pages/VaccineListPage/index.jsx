import { AudioOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const { Search } = Input;
import { Link } from 'react-router-dom';
import Container from '../../layout/Container';
import Header from '../../components/Header';
import VaccineCategoryCarousel from '../../components/VaccineCategoryCarousel';
import 'antd/dist/antd.css';
import './index.css';
import { getCategoryList } from '../../actions/category.action';

// const contentStyle = {
//   height: '160px',
//   color: '#fff',
//   lineHeight: '160px',
//   textAlign: 'center'
//   // background: '#364d79'
// };
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1890ff'
    }}
  />
);

const onSearch = (value) => console.log(value);

const VaccineListPage = () => {
  const dispatch = useDispatch();

  const handleGetCategories = (cateGroup) => {
    dispatch(getCategoryList(cateGroup));
  };

  useEffect(() => {
    dispatch(getCategoryList(), [dispatch]);
  });

  return (
    <>
      <Header />
      <main className="main-page">
        <section className="section-slideshow">
          <Container>
            <nav className="slideshow-nav">
              <p>
                <a href="/" className="slideshow-nav__link">
                  Trang chủ
                </a>
                <span>/</span>
                <span>Thông tin sản phẩm vắc xin</span>
              </p>
            </nav>
            <h2 className="slideshow-title">Thông tin sản phẩm vắc xin</h2>
            <div className="slideshow-btn">
              <Link to="/vaccine-list?cateGroup=age" onClick={handleGetCategories('AGE')}>
                Vắc xin theo nhóm bệnh
              </Link>
              <Link to="/vaccine-list?cateGroup=disease" onClick={handleGetCategories('DISEASE')}>
                Vắc xin theo độ tuổi
              </Link>
            </div>
            <Space direction="vertical" className="slideshow-search">
              <Search placeholder="Tìm kiếm ..." onSearch={onSearch} enterButton />
            </Space>
            <section className="section-categories">
              <VaccineCategoryCarousel />
            </section>
          </Container>
        </section>
      </main>
    </>
  );
};

export default VaccineListPage;
