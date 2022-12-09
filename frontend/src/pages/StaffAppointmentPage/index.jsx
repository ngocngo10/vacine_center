import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Tag, Badge, Input, Button, Select, Row, Col, DatePicker, Card, Form } from 'antd';
import { CheckOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { getScheduleOnDay } from '../../actions/schedule.action';
import moment from 'moment';
import './index.css';

const { Search } = Input;

const StaffAppointmentPage = () => {
  const DEFAULT_PAGE_NUMBER = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    console.log('date', date);
    const selectedDay = moment(date).format('YYYY-MM-DD');
    console.log('selectedDay', selectedDay);
    dispatch(getScheduleOnDay(selectedDay));
  };

  const handleTableChange = (pagination) => {
    // handleChangePage(pagination.current);
    // call api
    console.log('pagination', pagination.current);
    setCurrentPage(pagination.current - 1);
  };
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
      title: 'Loại vắc xin ',
      dataIndex: 'listType',
      key: 'listType',
      align: 'center',
      render: (listType) =>
        listType == 1 ? <Tag color="green">GÓI</Tag> : <Tag color="purple">LẺ</Tag>
    },

    {
      title: 'Tên vắc xin',
      dataIndex: 'wishList',
      key: 'wishList',
      align: 'center',
      render: (wishList) =>
        wishList?.map((item, index) => (
          <p>
            <Badge status="success" style={{ marginRight: 10 }} />
            {item}
          </p>
        ))
    },
    {
      title: 'Đã xác nhận',
      dataIndex: 'isConfirmed',
      key: 'isConfirmed',
      align: 'center',
      render: (isConfirmed) => isConfirmed && <CheckOutlined style={{ color: 'blue' }} />
    },
    {
      title: 'Giờ check in',
      dataIndex: 'checkInDate',
      align: 'center',
      key: 'checkInDate'
    }
  ];
  const data = {};
  data.totalElements = 20;
  data.content = [
    {
      key: 1,
      index: 1,
      patientName: 'Nguyễn Văn C',
      desiredDate: '12/10/2022',
      schedule: '10:00   -   11:00',
      listType: 'Vắc xin lẻ',
      wishList: ['ROTAVIN-M1: Vắc xin phòng bệnh tiêu chảy cấp do Rotavirus '],
      isConfirmed: true,
      checkInDate: '9:00 '
    },
    {
      key: 1,
      index: 1,
      patientName: 'Nguyễn Văn C',
      desiredDate: '12/10/2022',
      schedule: '10:00 -11:00',
      listType: 'Vắc xin lẻ',
      wishList: ['ROTAVIN-M1: Vắc xin phòng bệnh tiêu chảy cấp do Rotavirus '],
      isConfirmed: true,
      checkInDate: '9:00'
    }
  ];

  return (
    <div>
      <h2 className="page-title">Quản lí đăng kí tiêm trực tuyến</h2>
      <Card style={{ borderRadius: 10 }}>
        <Form>
          <Row justify="space-evenly">
            <Col>
              <Form.Item name="code">
                <Input placeholder="Tìm theo mã định danh" style={{ float: 'left' }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="patientName">
                <Input placeholder="Tìm tên người tiêm" style={{ float: 'left', width: 250 }} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="date">
                <DatePicker placeholder="Chọn ngày" onChange={handleChangeDay} />
              </Form.Item>
            </Col>
            <Col>
              <Form.Item name="hours">
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
