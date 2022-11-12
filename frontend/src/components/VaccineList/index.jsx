import React, { useState } from 'react';
import { Pagination } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../Message';
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

  // const error = null;
  // const vaccines = [
  //   {
  //     id: 1,
  //     image: 'https://vnvc.vn/wp-content/uploads/2017/04/SYNFLORIX.jpg',
  //     name: 'Vắc xin SYNFLORIX (Bỉ) phòng các bệnh do phế cầu khuẩn d ddd dddd ddd dddd ddd ddd ddd',
  //     description:
  //       'Vắc xin Synflorix phòng tránh 10 chủng vi khuẩn phế cầu (Streptococcus pneumoniae) gây các bệnh như: Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết và viêm tai giữa cấp,…'
  //   },
  //   {
  //     id: 2,
  //     image: 'https://vnvc.vn/wp-content/uploads/2019/11/prevenar.jpg',
  //     name: 'Vắc xin SYNFLORIX (Bỉ) phòng các bệnh do phế cầu khuẩn',
  //     description:
  //       'Vắc xin Synflorix phòng tránh 10 chủng vi khuẩn phế cầu (Streptococcus pneumoniae) gây các bệnh như: Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết và viêm tai giữa cấp,…'
  //   },
  //   {
  //     id: 3,
  //     image: 'https://vnvc.vn/wp-content/uploads/2019/11/prevenar.jpg',
  //     name: 'Vắc xin SYNFLORIX (Bỉ) phòng các bệnh do phế cầu khuẩn',
  //     description:
  //       'Vắc xin Synflorix phòng tránh 10 chủng vi khuẩn phế cầu (Streptococcus pneumoniae) gây các bệnh như: Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết và viêm tai giữa cấp,…'
  //   },
  //   {
  //     id: 4,
  //     image: 'https://vnvc.vn/wp-content/uploads/2019/11/prevenar.jpg',
  //     name: 'Vắc xin SYNFLORIX (Bỉ) phòng các bệnh do phế cầu khuẩn',
  //     description:
  //       'Vắc xin Synflorix phòng tránh 10 chủng vi khuẩn phế cầu (Streptococcus pneumoniae) gây các bệnh như: Hội chứng nhiễm trùng, viêm màng não, viêm phổi, nhiễm khuẩn huyết và viêm tai giữa cấp,…'
  //   }
  // ];

  return error ? (
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
        pageSize={6}
        total={totalItem}
        hideOnSinglePage
      />
    </>
  ) : (
    <div className="empty-vaccine-list">No records</div>
  );
};

export default VaccineList;
