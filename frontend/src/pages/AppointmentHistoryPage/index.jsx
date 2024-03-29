import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Tag, Badge, Table, Input, Row, Col, Form, Select, Button } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, CheckOutlined } from '@ant-design/icons';
import moment from 'moment';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Container from '../../layout/Container';
import { getAppointmentHistories } from '../../actions/appointment.action';
import './index.css';

const { Search } = Input;

const AppointmentHistoryPage = () => {
  const DEFAULT_PAGE_NUMBER = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const appointmentList = useSelector((state) => state.appointmentList);
  const { loading, error, appointmentHistories, totalItem } = appointmentList;

  const appointmentDelete = useSelector((state) => state.appointmentDelete);
  const { deleteSuccess } = appointmentDelete;

  const appointmentMultiDelete = useSelector((state) => state.appointmentMultiDelete);
  const { multiDeleteSuccess } = appointmentMultiDelete;

  const handleTableChange = (pagination) => {
    dispatch(getAppointmentHistories({ perPage: 10, page: pagination.current }));
    setCurrentPage(pagination.current - 1);
  };

  const handleOnSearch = (values) => {
    let query = {
      perPage: 10,
      patientCode: values.patientCode,
      patientName: values.patientName
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
    if (userInfo && userInfo.user.roles.includes('user')) {
      dispatch(getAppointmentHistories({ perPage: 10 }));
    } else {
      navigate('/login');
    }
  }, [deleteSuccess, userInfo, multiDeleteSuccess]);

  const statusOptions = [
    { label: 'Chưa xác nhận', value: 1 },
    { label: 'Đã xác nhận', value: 2 },
    { label: 'Đã hủy', value: 3 }
  ];
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'key'
    },
    {
      title: 'Mã định danh',
      dataIndex: 'patientCode',
      key: 'patientCode'
    },
    {
      title: 'Tên người tiêm',
      dataIndex: 'patientName',
      key: 'patientName'
    },
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
      title: 'Tên vắc xin',
      dataIndex: 'wishList',
      key: 'wishList',
      render: (wishList) =>
        wishList.map((item, index) => (
          <p>
            <Badge status="success" style={{ marginRight: 10 }} />
            {JSON.parse(item).name}
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
    },
    {
      title: 'Xem chi tiết',
      dataIndex: 'action',
      key: 'action',
      render: (id) => <Link to={`/appointment-history/details/${id}`}>Xem chi tiết</Link>
    }
  ];

  const data = {};
  data.totalElements = totalItem;
  data.content = appointmentHistories?.map((item, index) => ({
    key: item.id,
    index: currentPage * 10 + index + 1,
    patientCode: item.patient.patientCode,
    patientName: item.patient.patientName,
    desiredDate: moment(item.desiredDate).format('DD-MM-YYYY'),
    schedule: `${moment(moment(item.schedule?.startAt, 'HH:mm')).format('HH:mm')}-${moment(
      moment(item.schedule?.startAt, 'HH:mm')
    )
      .add(item.schedule?.appointmentDuration, 'minutes')
      .format('HH:mm')}`,
    listType: item.listType,
    wishList: item.wishList,
    isConfirmed: item.isConfirmed,
    isCancelled: item.isCancelled,
    isInjected: 'Chưa tiêm',
    action: item.id
  }));

  return loading ? (
    <Loader />
  ) : error ? (
    <Message description={error} />
  ) : (
    <div className="vaccines-card">
      <Container>
        <>
          <h2 className="page-title">Lịch sử cuộc hẹn</h2>
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
        </>
      </Container>
    </div>
  );
};

export default AppointmentHistoryPage;
