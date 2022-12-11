import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Tag, Badge, Input, Button, Select, Row, Col, DatePicker, Card, Form } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getScheduleOnDay } from '../../actions/schedule.action';
import { getAppointmentHistories } from '../../actions/appointment.action';
import moment from 'moment';
import './index.css';

const { Search } = Input;

const StaffAppointmentPage = () => {
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
      title: 'Ngày hẹn',
      dataIndex: 'desiredDate',
      key: 'desiredDate',
      align: 'center'
    },
    {
      title: 'Thời gian',
      dataIndex: 'schedule',
      key: 'schedule',
      align: 'center'
    },

    {
      title: 'Tên vắc xin',
      dataIndex: 'wishList',
      key: 'wishList',
      render: (wishList) =>
        wishList?.map((item, index) => (
          <ol>
            <li>{`${index + 1}. ${JSON.parse(item).name}`}</li>
          </ol>
        ))
    },
    {
      title: 'Đã xác nhận',
      dataIndex: 'isConfirmed',
      key: 'isConfirmed',
      align: 'center',
      render: (value) =>
        value ? (
          <CheckOutlined style={{ color: 'blue' }} />
        ) : (
          <CloseOutlined style={{ color: 'red' }} />
        )
    },
    {
      title: 'Giờ check in',
      dataIndex: 'checkInDate',
      align: 'center',
      key: 'checkInDate'
    }
  ];
  const data = {};
  data.totalElements = totalItem;
  data.content = appointmentHistories?.map((item, index) => ({
    key: item.id,
    index: index + 1,
    code: item.patient.patientCode,
    patientName: item.patient.patientName,
    desiredDate: moment(item.desiredDate).format('DD/MM/YYYY'),
    schedule: `${moment(moment(item.schedule?.startAt, 'HH:mm')).format('HH:mm')}-${moment(
      moment(item.schedule?.startAt, 'HH:mm')
    )
      .add(item.schedule?.appointmentDuration, 'minutes')
      .format('HH:mm')}`,
    // listType: item.listType,
    wishList: item.wishList,
    isConfirmed: item.isConfirmed,
    checkInDate: item.checkInAt ? moment(item.checkInAt).format('HH:mm:ss') : 'Chưa check in'
  }));

  return (
    <div>
      <h2 className="page-title">Quản lí đăng kí tiêm trực tuyến</h2>
      <Card style={{ borderRadius: 10 }}>
        <Form onFinish={handleOnSearch}>
          <Row justify="space-evenly">
            <Col>
              <Form.Item name="patientCode">
                <Input placeholder="Tìm theo mã định danh" style={{ float: 'left' }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="patientName">
                <Input placeholder="Tìm tên người tiêm" style={{ float: 'left', width: 250 }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="desiredDate">
                <DatePicker placeholder="Chọn ngày" onChange={handleChangeDay} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="schedule">
                <Select
                  showSearch
                  placeholder="Chọn khung giờ"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={scheduleOptions}
                />
              </Form.Item>
            </Col>
            <Col>
              <Button type="primary" htmlType="submit">
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Form>

        <Table
          style={{ marginTop: 20 }}
          rowKey={(record) => record.key}
          onRow={(record) => {
            return {
              onClick: () => {
                console.log('record', record);
                navigate(`/staff-home/appointments/details/${record.key}`);
              }
            };
          }}
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

export default StaffAppointmentPage;
