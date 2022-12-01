import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormCategory from '../../components/FormCategory';
import { editCategory } from '../../actions/category.action';
import './index.css';

const AdminUpdateCategory = () => {
  const { id } = useParams();

  const categoryList = useSelector((state) => state.categoryList);
  const { categories, error, loading } = categoryList;

  const category = categories?.find((item) => item.id == id);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message description={error} />
  ) : (
    <FormCategory
      cardTitle="Cập nhật loại bệnh"
      label="Loại bệnh"
      okText="Cập nhật"
      category={category}
      backURL="/admin-home/disease-categories"
      handleAction={editCategory}
    />
  );
};

export default AdminUpdateCategory;
