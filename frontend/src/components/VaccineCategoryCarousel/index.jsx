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
    categories.length && (
      <Carousel autoplay="true" dotPosition="bottom" className="slideshow-list">
        {categories.map((subCategories, index) => (
          <div key={`slideshow-item-${index}`}>
            <div className="slideshow-item">
              {subCategories.map((category) => (
                <div key={category.id} className="category-item">
                  <Link to={`/product/${category.id}`}>
                    <div>
                      <img
                        className="category-item__image"
                        src={category.image}
                        alt="slideshow-item"
                      />
                    </div>
                  </Link>
                  <h3 className="category-item__name">
                    <Link to={`/product/${category._id}`}>{category.name}</Link>
                  </h3>
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
