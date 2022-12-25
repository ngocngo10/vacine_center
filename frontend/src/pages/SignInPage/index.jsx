import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../layout/Container';
import Message from '../../components/Message';
import { login } from '../../actions/user.action';
import './index.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  let url = '/';
  if (userInfo?.user.roles.includes('admin')) {
    url = '/admin-home';
  }
  if (userInfo?.user.roles.includes('staff')) {
    url = '/staff-home';
  }

  useEffect(() => {
    if (userInfo) {
      navigate(url);
    }
  }, [userInfo]);

  const onFinish = (values) => {
    dispatch(login(values));
  };
  return (
    <>
      <main>
        <Container>
          {error && <Message description={error} />}
          <div className="login-card">
            <h2 className="login-form-title">Đăng nhập</h2>
            <Form name="login-form" className="login-form" onFinish={onFinish}>
              <Form.Item
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
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu!'
                  }
                ]}>
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Mật khẩu"
                />
              </Form.Item>
              <Form.Item>
                <Link className="login-form-forgot" to="/forget-password">
                  Quên mật khẩu
                </Link>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-btn">
                  Đăng nhập
                </Button>
              </Form.Item>
              <Form.Item>
                <span>Bạn chưa có tài khoản </span>
                <Link to="/register">Đăng kí tại đây!</Link>
              </Form.Item>
            </Form>
          </div>
        </Container>
      </main>
    </>
  );
};

export default SignInPage;
