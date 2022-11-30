import React from 'react';
import { useParams } from 'react-router-dom';
import FormCategory from '../../components/FormCategory';
import { createCategory } from '../../actions/category.action';

const AdminAddCategory = () => {
  const { id } = useParams();

  return (
    <FormCategory
      cardTitle="Thêm loại bệnh"
      label="Loại bệnh"
      okText="Thêm"
      backURL="/admin-home/disease-categories"
      handleAction={createCategory}
    />
  );
};

export default AdminAddCategory;
