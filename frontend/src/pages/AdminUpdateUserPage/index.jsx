import React from 'react';
import { Button, Form, Input, Select, Row, Col, Card, Checkbox } from 'antd';
import patterns from '../../constants/pattern.constant';
import { useNavigate } from 'react-router-dom';

const AdminUpdateUserPage = () => {
  const navigate = useNavigate();
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
      value: 'true'
    }
  ];

  const onFinish = (values) => {
    console.log('values', values);
  };

  return (
    <div>
      <Card>
        <Row justify="center">
          <Col span={18}>
            <Form
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
                <Input />
              </Form.Item>
              <Form.Item name="name" label="Họ và tên">
                <Input disabled={true} />
              </Form.Item>
              <Form.Item name="phoneNumber" label="Số điện thoại">
                <Input disabled={true} />
              </Form.Item>
              <Form.Item name="gender" label="Giới tính">
                <Select disabled={true} placeholder="Chọn giới tính">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
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
              <Form.Item name="block" label="Tình trạng tài khoản">
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
