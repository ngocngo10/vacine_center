import React, { useState } from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { Empty } from 'antd';
import Message from '../Message';
import Loader from '../Loader';
import VaccineItem from '../VaccineItem';
import { getVaccineList } from '../../actions/vaccine.action';
import 'antd/dist/antd.css';
import './index.css';

const VaccineList = () => {
  const [current, setCurrent] = useState(1);
  const vaccineList = useSelector((state) => state.vaccineList);
  const { loading, error, vaccines, totalItem } = vaccineList;
  const dispatch = useDispatch();

  const onChangePage = (page) => {
    dispatch(getVaccineList({ page }));
    setCurrent(page);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message description={error} />
  ) : vaccines.length ? (
    <>
      <ul className="vaccine-list">
        {vaccines.map((vaccine) => (
          <VaccineItem key={vaccine.id} vaccine={vaccine} />
        ))}
      </ul>

      <Pagination
        className="page-pagination"
        current={current}
        onChange={onChangePage}
        pageSize={9}
        total={totalItem}
        hideOnSinglePage
      />
    </>
  ) : (
    <Empty />
  );
};

export default VaccineList;
