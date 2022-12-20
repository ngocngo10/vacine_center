import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, Tag, Button, Select, Row, Col, DatePicker, Card, Form } from 'antd';
import { CheckOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getScheduleOnDay } from '../../actions/schedule.action';
import { getAppointmentHistories } from '../../actions/appointment.action';
import moment from 'moment';
import './index.css';

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

  const statusOptions = [
    { label: 'Chưa xác nhận', value: 1 },
    { label: 'Đã xác nhận', value: 2 },
    { label: 'Đã hủy', value: 3 }
  ];

  const handleChangeDay = (date) => {
    const selectedDay = moment(date).format('YYYY-MM-DD');
    dispatch(getScheduleOnDay(selectedDay));
  };

  const handleTableChange = (pagination) => {
    dispatch(getAppointmentHistories({ perPage: 10, page: pagination.current }));
    setCurrentPage(pagination.current - 1);
  };

  const handleOnSearch = (values) => {
    let query = {
      perPage: 10,
      patientCode: values.patientCode,
      patientName: values.patientName,
      desiredDate: values.desiredDate ? moment(values.desiredDate).format('YYYY-MM-DD') : null,
      scheduleId: values.schedule
    };

    if (values.status === 1) {
      query = { ...query, isConfirmed: 'null', isCancelled: 'false' };
    }
    if (values.status === 2) {
      query = { ...query, isConfirmed: 'true', isCancelled: 'false' };
    }
    if (values.status === 3) {
      query = { ...query, isCancelled: 'trueOrFalseConfirm' };
    }
    dispatch(getAppointmentHistories(query));
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
      title: 'Xác nhận',
      dataIndex: 'isConfirmed',
      key: 'isConfirmed',
      render: (isConfirmed) =>
        isConfirmed ? (
          <Tag icon={<CheckCircleOutlined />} color="success">
            ĐÃ XÁC NHẬN
          </Tag>
        ) : typeof isConfirmed === 'boolean' && !isConfirmed ? (
          <Tag icon={<CloseCircleOutlined />} color="error">
            ĐÃ TỪ CHỐI
          </Tag>
        ) : (
          <Tag icon={<CloseCircleOutlined />} color="purple">
            CHƯA XÁC NHẬN
          </Tag>
        )
    },
    {
      title: 'Đã tự hủy',
      dataIndex: 'isCancelled',
      align: 'center',
      key: 'isCancelled',
      render: (value) => value && <CheckOutlined style={{ color: 'blue' }} />
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
    wishList: item.wishList,
    isConfirmed: item.isConfirmed,
    isCancelled: item.isCancelled
  }));

  return (
    <div>
      <Card style={{ borderRadius: 10 }}>
        <h2 className="page-title">Quản lí đăng kí tiêm trực tuyến</h2>
        <Form onFinish={handleOnSearch}>
          <Row justify="space-between">
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
            <Col span={3}>
              <Form.Item name="status">
                <Select
                  showSearch
                  placeholder="Trạng thái"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  options={statusOptions}
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
