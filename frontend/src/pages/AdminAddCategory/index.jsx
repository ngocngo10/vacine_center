import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormCategory from '../../components/FormCategory';
import { createCategory } from '../../actions/category.action';

const AdminAddCategory = () => {
  const { id } = useParams();

  return (
    <FormCategory
      cardTitle="Thêm loại bệnh"
      okText="Thêm"
      backURL="admin-home/disease-categories"
      handleAction={createCategory}
    />
  );
};

export default AdminAddCategory;
