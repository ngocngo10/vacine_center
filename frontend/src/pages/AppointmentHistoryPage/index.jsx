import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Tag, Badge } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import Loader from '../../components/Loader';
import Header from '../../components/table/Header';
import useDataTable from '../../components/table/DataTable';
import Message from '../../components/Message';
import Container from '../../layout/Container';
import {
  getAppointmentHistories,
  deleteAppointment,
  deleteMultiAppointment
} from '../../actions/appointment.action';
import './index.css';

const AppointmentHistoryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointmentHistories, totalItem } = appointmentList;

  const appointmentDelete = useSelector((state) => state.appointmentDelete);
  const { deleteSuccess } = appointmentDelete;

  const appointmentMultiDelete = useSelector((state) => state.appointmentMultiDelete);
  const { multiDeleteSuccess } = appointmentMultiDelete;

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('user')) {
      dispatch(getAppointmentHistories({ perPage: 10 }));
    } else {
      navigate('/login');
    }
  }, [deleteSuccess, userInfo, multiDeleteSuccess]);

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'key'
    },
    {
      title: 'Tên người tiêm',
      dataIndex: 'patientName',
      key: 'patientName'
    },
    // {
    //   title: 'Ngày sinh',
    //   key: 'birthday',
    //   dataIndex: 'birthday'
    // },
    // {
    //   title: 'Giới tính',
    //   dataIndex: 'gender',
    //   key: 'gender'
    // },
    // {
    //   title: 'Số điện thoại',
    //   dataIndex: 'phoneNumber',
    //   key: 'phoneNumber'
    // },
    {
      title: 'Ngày hẹn',
      dataIndex: 'desiredDate',
      key: 'desiredDate'
    },
    {
      title: 'Thời gian',
      dataIndex: 'schedule',
      key: 'schedule'
    },

    {
      title: 'Loại vắc xin ',
      dataIndex: 'listType',
      key: 'listType',
      render: (listType) =>
        listType == 1 ? <Tag color="green">VẮC XIN GÓI</Tag> : <Tag color="purple">VẮC XIN LẺ</Tag>
    },

    {
      title: 'Tên vắc xin',
      dataIndex: 'wishList',
      key: 'wishList',
      render: (wishList) =>
        wishList.map((item, index) => (
          <p>
            <Badge status="success" style={{ marginRight: 10 }} />
            {item}
          </p>
        ))
    },
    {
      title: 'Xác nhận',
      dataIndex: 'isConfirmed',
      key: 'isConfirmed',
      render: (isConfirmed) =>
        isConfirmed ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            ĐÃ XÁC NHẬN
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="error">
            CHƯA XÁC NHẬN
          </Tag>
        )
    },
    {
      title: 'Đã tiêm',
      dataIndex: 'isInjected',
      key: 'isInjected'
    }
  ];

  const data = {};
  data.totalElements = totalItem;
  data.content = appointmentHistories?.map((item, index) => ({
    key: item.id,
    index: index + 1,
    patientName: item.patientName,
    // birthday: moment(moment(item.birthday, 'DD-MM-YYYY')).format('DD-MM-YYYY'),
    // birthday: item.birthday,
    // gender: item.gender,
    // phoneNumber: item.phoneNumber,
    desiredDate: moment(item.desiredDate).format('DD-MM-YYYY'),
    // desiredDate: moment(moment(item.desiredDate, 'DD-MM-YYYY')).format('DD-MM-YYYY'),
    schedule: moment(moment(item.schedule.startAt, 'HH:mm')).format('HH:mm'),
    listType: item.listType,
    wishList: item.wishList,
    isConfirmed: item.isConfirmed,
    isInjected: 'Chưa tiêm'
  }));

  const handleDeleteSingleAppointment = (id) => {
    dispatch(deleteAppointment(id));
  };

  const handleDeleteMultiAppointments = (ids) => {
    dispatch(deleteMultiAppointment(ids));
  };

  const getAppointments = (page) => {
    dispatch(getAppointmentHistories({ perPage: 10, page: page }));
  };

  const handleOnSearch = (name) => {
    dispatch(getAppointments({ desiredDate: name, perPage: 10 }));
  };

  const {
    DataTable,
    hasSelected,
    selectedRowKeys,
    selectedRow,
    currentPage,
    pageSize,
    resetPagination
  } = useDataTable({
    columns: columns,
    dataSource: data,
    updateEntityPath: 'admin-home/vaccines/update-vaccine',
    handleDelete: handleDeleteSingleAppointment,
    handleChangePage: getAppointments
  });

  return loading ? (
    <Loader />
  ) : error ? (
    <Message description={error} />
  ) : (
    <div className="vaccines-card">
      <Container>
        <>
          <h2 className="page-title">Lịch sử tiêm</h2>
          <Header
            addNewPath="register-appointment"
            selectedRowKeys={selectedRowKeys}
            hasSelected={hasSelected}
            handleMultiDelete={handleDeleteMultiAppointments}
            handleSearch={handleOnSearch}
          />
          <DataTable />
        </>
      </Container>
    </div>
  );
};

export default AppointmentHistoryPage;
