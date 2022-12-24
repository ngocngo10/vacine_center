import React from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import Container from '../../layout/Container';
import patterns from '../../constants/pattern.constant';
import './index.css';

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('values', values);
    navigate('/forget-password/new-password');
  };
  return (
    <div>
      <Container>
        <div className="new-password-card">
          <h2 className="page-title">Mật khẩu mới</h2>
          <Form onFinish={onFinish} name="new-password-form" className="new-password-form">
            <Form.Item
              labelCol={{
                span: 7
              }}
              labelAlign="left"
              wrapperCol={{ span: 17 }}
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
              labelAlign="left"
              labelCol={{
                span: 7
              }}
              wrapperCol={{ span: 17 }}
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
            <Row justify="center">
              <Col span={3}>
                <Button type="primary" onClick={() => navigate('/forget-password')}>
                  Hủy
                </Button>
              </Col>
              <Col>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ background: '#1f2b6c', border: '#1f2b6c' }}>
                    Đổi mật khẩu
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

export default NewPasswordPage;
