import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input, Row, Col } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Container from '../../layout/Container';
import Message from '../../components/Message';
import { getForgotPasswordLink } from '../../actions/user.action';
import './index.css';

const SearchEmailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((state) => state.passwordForgot);
  const onFinish = (value) => {
    dispatch(getForgotPasswordLink(value));
  };
  return (
    <div>
      <Container>
        <div className="forget-password-card">
          {error && <Message description={error} />}
          {success && <Message description="Vui lòng check mail để nhận link đổi mật khẩu!" />}
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
