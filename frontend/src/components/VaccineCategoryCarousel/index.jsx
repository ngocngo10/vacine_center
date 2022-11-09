import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../Message';
import './index.css';

const VaccineCategoryCarousel = () => {
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  console.log('categoryList', categoryList);

  return error ? (
    <Message description={error} />
  ) : (
    <Carousel autoplay="true" dotPosition="bottom" className="slideshow-list">
      {console.log('render1')}
      {categories &&
        categories.map((subCategories, index) => {
          {
            console.log('subCategories', subCategories);
          }
          <div key={`slideshow-item-${index}`} className="slideshow-item">
            {subCategories.map((category) => {
              {
                console.log('Categories', category);
              }
              <div key={category.id} className="category-item">
                <Link to={`/product/${category.id}`}>
                  <img className="category-item__image" src={category.image} alt="slideshow-item" />
                </Link>
                <h3 className="category-item__name">
                  <Link to={`/product/${category._id}`}></Link>
                </h3>
              </div>;
            })}
          </div>;
        })}
    </Carousel>
  );
};

export default VaccineCategoryCarousel;
