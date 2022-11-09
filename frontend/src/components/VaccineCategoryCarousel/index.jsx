import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../Message';
import './index.css';

const VaccineCategoryCarousel = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;

  // useEffect(() => {
  //   dispatch(listTopProducts());
  // }, [dispatch]);

  return error ? (
    <Message description={error} />
  ) : (
    <Carousel autoplay="true" dotPosition="bottom" className="slideshow-list">
      {categories &&
        categories.map((subCategories) => {
          <div className="slideshow-item">
            {subCategories.map((category) => {
              <div key={category.id} className="category-item">
                <Link to={`/product/${category._id}`}>
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
