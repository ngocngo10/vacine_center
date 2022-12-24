import React from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Container from '../../layout/Container';
import './index.css';

const SearchEmailPage = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('values', values);
    navigate('/forget-password/new-password');
  };
  return (
    <div>
      <Container>
        <div className="forget-password-card">
          <h2 className="page-title">Tìm tài khoản</h2>
          <Form onFinish={onFinish} name="forget-password-form" className="forget-password-form">
            <Form.Item
              labelCol={{
                span: 24
              }}
              wrapperCol={{ span: 24 }}
              label="Vui lòng nhập email để tìm kiếm tài khoản của bạn"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập email!',
                  whitespace: true
                },
                {
                  type: 'email',
                  message: 'Email không đúng!'
                }
              ]}>
              <Input prefix={<MailOutlined />} placeholder=" Email" />
            </Form.Item>
            <Row justify="center">
              <Col span={3}>
                <Button type="primary" onClick={() => navigate('/login')}>
                  Hủy
                </Button>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: '#1f2b6c', border: '#1f2b6c' }}>
                    Tìm kiếm
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </div>
  );
};

export default SearchEmailPage;
