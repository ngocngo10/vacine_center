import React from 'react';
import { useParams } from 'react-router-dom';
import FormCategory from '../../components/FormCategory';
import { createAgeGroup } from '../../actions/category.action';

const AdminAddAgeGroupPage = () => {
  const { id } = useParams();

  return (
    <FormCategory
      cardTitle="Thêm độ tuổi"
      label="Độ tuổi"
      okText="Thêm"
      backURL="/admin-home/age-groups-categories"
      handleAction={createAgeGroup}
    />
  );
};

export default AdminAddAgeGroupPage;
