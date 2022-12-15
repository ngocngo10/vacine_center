import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Select, Row, Col, Card, Checkbox } from 'antd';
import patterns from '../../constants/pattern.constant';
import { useNavigate, useParams } from 'react-router-dom';
import { editUser, getUser } from '../../actions/user.action';
import Loader from '../../components/Loader';
import Message from '../../components/Message';

const AdminUpdateUserPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const formRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const user = useSelector((state) => state.user);
  const { loading, error, userItem } = user;

  const userEdit = useSelector((state) => state.userEdit);
  const { editSuccess } = userEdit;

  const onFinish = (values) => {
    console.log('values', values);
    values.id = id;
    values.gender = values.gender ? true : false;
    values.isBlocked = values.isBlocked[0] ? true : false;
    dispatch(editUser(values));
  };

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('admin')) {
      dispatch(getUser(id));
    } else {
      navigate('/login');
    }
  }, [userInfo, id]);

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('admin')) {
      formRef?.current.setFieldsValue({
        email: userItem?.email,
        name: userItem?.name,
        phoneNumber: userItem?.phoneNumber,
        gender: (userItem?.gender && 'Nam') || (!userItem?.gender && 'Nữ'),
        roles: userItem?.roles,
        isBlocked: userItem?.isBlocked ? [true] : [false]
      });
    } else {
      navigate('/login');
    }
  }, [userInfo, userItem]);

  const formItemLayout = {
    labelCol: {
      sm: {
        span: 8
      }
    },
    wrapperCol: {
      sm: {
        span: 16
      }
    }
  };

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

  const blockOptions = [
    {
      label: 'Khóa',
      value: true
    }
  ];

  return (
    <div>
      {loading && <Loader />}
      {error && <Message description={error} />}
      {editSuccess && <Message type="success" description="Bạn đã cập nhật tài khoản thành công" />}
      {userEdit.error && <Message description={userEdit.error} />}
      <Card>
        <Row justify="center">
          <Col span={18}>
            <Form
              ref={formRef}
              labelAlign="left"
              {...formItemLayout}
              name="register"
              onFinish={onFinish}
              scrollToFirstError>
              <h3 className="form-title">Thông tin tài khoản người dùng</h3>
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
                <Input disabled={true} />
              </Form.Item>
              <Form.Item name="name" label="Họ và tên">
                <Input disabled={true} />
              </Form.Item>
              <Form.Item name="phoneNumber" label="Số điện thoại">
                <Input disabled={true} />
              </Form.Item>
              <Form.Item name="gender" label="Giới tính">
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Mật khẩu"
                rules={[
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
              <Form.Item name="isBlocked" label="Tình trạng tài khoản">
                <Checkbox.Group options={blockOptions} />
              </Form.Item>
              <Row justify="center">
                <Col span={3}>
                  <Form.Item>
                    <Button onClick={() => navigate('/admin-home/users')} type="primary">
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
                      Cập nhật tài khoản
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AdminUpdateUserPage;
