import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, Button, Select, Row, Col, DatePicker, Card, Form } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate, NavLink, Link } from 'react-router-dom';
import { getScheduleOnDay } from '../../actions/schedule.action';
import { getAppointmentHistories } from '../../actions/appointment.action';
import moment from 'moment';
import './index.css';

const { Search } = Input;

const StaffInjectionHistoryPage = () => {
  const DEFAULT_PAGE_NUMBER = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointmentHistories, totalItem } = appointmentList;

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const scheduleOnDay = useSelector((state) => state.scheduleOnDay);
  const { schedules } = scheduleOnDay;
  let scheduleOptions = schedules?.map((item) => ({
    key: item.id,
    label: `${moment(moment(item.startAt, 'HH:mm')).format('HH:mm')} - ${moment(
      moment(item.startAt, 'HH:mm')
    )
      .add(item.appointmentDuration, 'minutes')
      .format('HH:mm')}`,
    value: item.id
  }));

  const handleChangeDay = (date) => {
    const selectedDay = moment(date).format('YYYY-MM-DD');
    dispatch(getScheduleOnDay(selectedDay));
  };

  const handleTableChange = (pagination) => {
    dispatch(getAppointmentHistories({ perPage: 10, page: pagination.current }));
    setCurrentPage(pagination.current - 1);
  };

  const handleOnSearch = (values) => {
    console.log(values);
    dispatch(
      getAppointmentHistories({
        perPage: 10,
        patientCode: values.patientCode,
        patientName: values.patientName,
        desiredDate: moment(values.desiredDate).format('YYYY-MM-DD'),
        scheduleId: values.schedule
      })
    );
  };

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('staff')) {
      dispatch(getAppointmentHistories({ perPage: 10 }));
    } else {
      navigate('/login');
    }
  }, [userInfo]);
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'key',
      align: 'center'
    },
    {
      title: 'Mã định danh',
      dataIndex: 'code',
      key: 'code',
      align: 'center'
    },
    {
      title: 'Tên người tiêm',
      dataIndex: 'patientName',
      key: 'patientName',
      align: 'center'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center'
    },
    {
      title: 'Xem chi tiết',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (value) => <Link to={value}>Xem chi tiết</Link>
    }
  ];
  const data = {};
  data.totalElements = totalItem;
  // data.content = appointmentHistories?.map((item, index) => ({
  //   key: item.id,
  //   index: index + 1,
  //   code: item.patientCode,
  //   phoneNumber: item.phoneNumber,
  //   patientName: item.patientName
  // }));
  data.content = [
    {
      key: 1,
      index: 1,
      code: 'P0001',
      phoneNumber: '1234567890',
      patientName: 'Nguyễn Văn A',
      action: 'details/1'
    }
  ];

  return (
    <div>
      <Card style={{ borderRadius: 10 }}>
        <h2 className="page-title">Lịch sử tiêm chủng bệnh nhân</h2>
        <Row justify="space-evenly">
          <Col span={8}>
            <Search placeholder="Tìm theo mã định danh" />
          </Col>
          <Col span={8}>
            <Search placeholder="Tìm theo tên bệnh nhân" />
          </Col>
        </Row>

        <Table
          style={{ marginTop: 20 }}
          rowKey={(record) => record.key}
          dataSource={data.content}
          columns={columns}
          onChange={handleTableChange}
          pagination={{
            pageSize: 10,
            current: currentPage + 1,
            total: data.totalElements,
            showTotal: (total, range) => {
              return `${range[0]}-${range[1]} of ${total} items`;
            }
          }}
        />
      </Card>
    </div>
  );
};

export default StaffInjectionHistoryPage;
