import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getVaccineList } from '../../actions/vaccine.action';
import './index.css';

const VaccineCategoryCarousel = ({ categories }) => {
  const dispatch = useDispatch();

  const carouselCategories = [];
  let index = 0;
  while (carouselCategories.length < categories?.length / 6.0) {
    carouselCategories.push(categories?.slice(index, index + 6));
    index = index + 6;
  }

  const handleGetVaccines = (categoryId) => {
    dispatch(getVaccineList({ categoryId }));
  };

  return (
    carouselCategories?.length && (
      <Carousel autoplay="true" dotPosition="bottom" className="slideshow-list">
        {carouselCategories?.map((subCategories, index) => (
          <div key={`slideshow-item-${index}`}>
            <div className="slideshow-item">
              {subCategories.map((category) => (
                <div key={category?.id} className="category-item">
                  <Link
                    to={`/vaccine-list?cate=${category?.id}`}
                    onClick={() => handleGetVaccines(category?.id)}>
                    <div>
                      <img
                        className="category-item__image"
                        src={category?.image}
                        alt="slideshow-item"
                      />
                    </div>
                  </Link>
                  <Link
                    to={`/vaccine-list?cate=${category?.id}`}
                    onClick={() => {
                      handleGetVaccines(category?.id);
                    }}>
                    <h3 className="category-item__name text"> {category?.name}</h3>
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
