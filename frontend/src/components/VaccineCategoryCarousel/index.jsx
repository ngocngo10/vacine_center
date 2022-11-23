import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../Message';
import { getVaccineList } from '../../actions/vaccine.action';
import './index.css';

const VaccineCategoryCarousel = () => {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  const handleGetVaccines = (categoryId) => {
    dispatch(getVaccineList({ categoryId }));
  };

  return error ? (
    <Message description={error} />
  ) : (
    categories?.carouselCategories?.length && (
      <Carousel autoplay="true" dotPosition="bottom" className="slideshow-list">
        {categories.carouselCategories.map((subCategories, index) => (
          <div key={`slideshow-item-${index}`}>
            <div className="slideshow-item">
              {subCategories.map((category) => (
                <div key={category.id} className="category-item">
                  <Link
                    to={`/vaccine-list?cate=${category.id}`}
                    onClick={() => handleGetVaccines(category.id)}>
                    <div>
                      <img
                        className="category-item__image"
                        src={category.image}
                        alt="slideshow-item"
                      />
                    </div>
                  </Link>
                  <Link
                    to={`/vaccine-list?cate=${category.id}`}
                    onClick={() => {
                      handleGetVaccines(category.id);
                    }}>
                    <h3 className="category-item__name text"> {category.name}</h3>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Carousel>
    )
  );
};

export default VaccineCategoryCarousel;
