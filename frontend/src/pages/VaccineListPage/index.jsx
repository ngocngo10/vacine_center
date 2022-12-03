import { AudioOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import { useDispatch, useSelector } from 'react-redux';
const { Search } = Input;
import { Link } from 'react-router-dom';
import Container from '../../layout/Container';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import VaccineCategoryCarousel from '../../components/VaccineCategoryCarousel';
import { getCategoryList, getAgeGroups } from '../../actions/category.action';
import { getVaccineList } from '../../actions/vaccine.action';
import VaccineList from '../../components/VaccineList';
import './index.css';

const VaccineListPage = () => {
  const dispatch = useDispatch();

  const ageGroupsCategoryList = useSelector((state) => state.ageGroupsCategoryList);
  const { ageGroups } = ageGroupsCategoryList;

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  const categoryTotal = categories?.concat(ageGroups);

  const [carouselCategories, setCarouselCategories] = useState(categoryTotal);

  const handleOnSearch = (name) => {
    dispatch(getVaccineList({ name, perPage: 9 }));
  };

  const handleOnClickDisease = () => {
    setCarouselCategories(categories);
  };

  const handleOnClickAgeGroups = () => {
    setCarouselCategories(ageGroups);
  };

  useEffect(() => {
    console.log('vaccine list page');
    dispatch(getCategoryList({}));
    dispatch(getAgeGroups({}));
    dispatch(getVaccineList({ perPage: 9 }));
  }, []);

  return ageGroupsCategoryList.loading || categoryList.loading ? (
    <Loader />
  ) : ageGroupsCategoryList.error || categoryList.error ? (
    <Message description={ageGroupsCategoryList.error + categoryList.error} />
  ) : (
    <>
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
              <Link to="/vaccine-list?categories=disease" onClick={handleOnClickDisease}>
                Vắc xin theo nhóm bệnh
              </Link>
              <Link to="/vaccine-list?categories=age" onClick={handleOnClickAgeGroups}>
                Vắc xin theo độ tuổi
              </Link>
            </div>
            <Space direction="vertical" className="slideshow-search">
              <Search placeholder="Tìm kiếm vắc xin ..." onSearch={handleOnSearch} enterButton />
            </Space>
            <section className="section-categories">
              <VaccineCategoryCarousel categories={carouselCategories} />
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
