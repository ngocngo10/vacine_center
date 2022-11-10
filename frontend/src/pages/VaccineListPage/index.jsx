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
import VaccineList from '../../components/VaccineList';

const onSearch = (value) => console.log(value);

const VaccineListPage = () => {
  const dispatch = useDispatch();

  const handleGetCategories = (cateGroup) => {
    dispatch(getCategoryList(cateGroup));
  };

  useEffect(() => {
    dispatch(getCategoryList());
  }, []);

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
              <Link to="/vaccine-list?categroup=age" onClick={() => handleGetCategories('AGE')}>
                Vắc xin theo nhóm bệnh
              </Link>
              <Link
                to="/vaccine-list?categroup=disease"
                onClick={() => handleGetCategories('DISEASE')}>
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
        <section className="section-vaccine-list">
          <Container>
            <VaccineList />
          </Container>
        </section>
      </main>
    </>
  );
};

export default VaccineListPage;
