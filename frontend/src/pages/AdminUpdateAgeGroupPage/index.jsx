import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import FormCategory from '../../components/FormCategory';
import { editAgeGroup } from '../../actions/category.action';

const AdminUpdateGroupPage = () => {
  const { id } = useParams();

  const ageGroupsCategoryList = useSelector((state) => state.ageGroupsCategoryList);
  const { ageGroups, error, loading } = ageGroupsCategoryList;

  const ageGroup = ageGroups?.find((item) => item.id == id);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message description={error} />
  ) : (
    <FormCategory
      cardTitle="Cập nhật độ tuổi"
      label="Độ tuổi"
      okText="Cập nhật"
      category={ageGroup}
      backURL="/admin-home/age-groups-categories"
      handleAction={editAgeGroup}
    />
  );
};

export default AdminUpdateGroupPage;
