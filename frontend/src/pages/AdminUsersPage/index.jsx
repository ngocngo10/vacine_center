import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, Button, Row, Col, Modal, Checkbox, Form, Card } from 'antd';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import { getUserList } from '../../actions/user.action';
import patterns from '../../constants/pattern.constant';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import './index.css';

const { Search } = Input;

const AdminUsersPage = () => {
  const DEFAULT_PAGE_NUMBER = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinnish = (values) => {
    console.log('values', values);
  };

  const userList = useSelector((state) => state.userList);
  const { loading, error, users, totalItem } = userList;
  console.log('users', users);

  // const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);
  // const scheduleOnDay = useSelector((state) => state.scheduleOnDay);
  // const { schedules } = scheduleOnDay;
  // let scheduleOptions = schedules?.map((item) => ({
  //   key: item.id,
  //   label: `${moment(moment(item.startAt, 'HH:mm')).format('HH:mm')} - ${moment(
  //     moment(item.startAt, 'HH:mm')
  //   )
  //     .add(item.appointmentDuration, 'minutes')
  //     .format('HH:mm')}`,
  //   value: item.id
  // }));

  // const handleChangeDay = (date) => {
  //   const selectedDay = moment(date).format('YYYY-MM-DD');
  //   dispatch(getScheduleOnDay(selectedDay));
  // };

  const handleTableChange = (pagination) => {
    dispatch(getUserList({ perPage: 10, page: pagination.current }));
    setCurrentPage(pagination.current - 1);
  };

  const handleOnSearch = (value) => {
    console.log(value);
    dispatch(getUserList({ perPage: 10, name: value }));
  };

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('admin')) {
      dispatch(getUserList({ perPage: 10 }));
    } else {
      navigate('/login');
    }
  }, [userInfo]);
  const roleOptions = [
    {
      label: 'Quản trị viên',
      value: 'admin'
    },
    {
      label: 'Nhân viên',
      value: 'staff'
    },
    {
      label: 'Khách hàng',
      value: 'user'
    }
  ];

  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'key',
      align: 'center'
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center'
    },
    {
      title: 'Role',
      dataIndex: 'roles',
      key: 'roles',
      align: 'center',
      render: (roles) =>
        roles.map((item) => (
          <ul>
            <li>
              {item == 'admin' ? 'Quản trị viên' : item == 'staff' ? 'Nhân viên' : 'Khách hàng'}
            </li>
          </ul>
        ))
    },
    {
      title: 'Tài khoản đang mở',
      dataIndex: 'block',
      key: 'block',
      align: 'center',
      render: (value) =>
        !value ? (
          <CheckOutlined style={{ color: 'blue' }} />
        ) : (
          <CloseOutlined style={{ color: 'red' }} />
        )
    },

    {
      title: 'Xem chi tiết',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (value) => <Link to={`${value}`}>Xem chi tiết</Link>
    }
  ];
  const data = {};
  data.totalElements = totalItem;
  data.content = users?.map((item, index) => ({
    key: item.id,
    index: currentPage * 10 + index + 1,
    name: item.name,
    email: item.email,
    phoneNumber: item.phoneNumber,
    roles: ['user', 'staff'],
    action: item.id,
    block: item.isBlock
  }));

  return (
    <div>
      <Card style={{ borderRadius: 10 }}>
        <h2 className="page-title">Quản lí tài khoản người dùng</h2>
        <Row justify="space-between">
          <Col span={10}>
            <Search placeholder="Tìm theo tên" onSearch={handleOnSearch} />
          </Col>
          <Col>
            <Button onClick={showModal} icon={<PlusOutlined />} type="primary">
              Thêm
            </Button>
          </Col>
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message description={error} />
        ) : (
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
        )}
      </Card>
      <Modal width={800} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Card className="category-card">
          <h2 className="page-title">Thêm tài khoản người dùng</h2>
          <Row justify="space-around">
            <Col span={24}>
              <Form
                labelAlign="left"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                name="product-form"
                onFinish={onFinnish}>
                <Form.Item
                  name="email"
                  label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'Email không đúng!'
                    },
                    {
                      required: true,
                      message: 'Vui lòng nhập email!'
                    }
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="name"
                  label="Họ và tên"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập họ và tên!',
                      whitespace: true
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value?.trim() || patterns.FULL_NAME_PATTERN.test(value?.trim())) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error('Họ và tên có ít nhất 3 kí tự và tối đa 40 kí tự!')
                        );
                      }
                    })
                  ]}>
                  <Input />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Mật khẩu"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu!'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || patterns.PASSWORD_PATTERN.test(value)) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            'Mật khẩu phải có ít nhất 8 kí tự, tối đa 15 kí tự, bao gồm ít nhất 1 kí tự hoa, thường, số và kí tự đặc biệt!'
                          )
                        );
                      }
                    })
                  ]}
                  hasFeedback>
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label="Xác nhận mật khẩu"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập lại mật khẩu!'
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                      }
                    })
                  ]}>
                  <Input.Password />
                </Form.Item>
                <Form.Item
                  name="roles"
                  label="Roles"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn role!'
                    }
                  ]}>
                  <Checkbox.Group options={roleOptions} />
                </Form.Item>
                <Row justify="center">
                  <Col span={3}>
                    <Form.Item>
                      <Button onClick={handleCancel} type="primary">
                        Hủy
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={3}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ border: '#198754', background: '#198754' }}>
                        Thêm tài khoản
                      </Button>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </Modal>
    </div>
  );
};

export default AdminUsersPage;
