import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import { LockOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../layout/Container';
import Message from '../../components/Message';
import Header from '../../components/Header';
import { login } from '../../actions/user.action';
import './index.css';

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const url = userInfo?.user.roles.includes('admin') ? '/admin-home' : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(url);
    }
  }, [userInfo]);

  const onFinish = (values) => {
    const { phoneNumber, password } = values;
    console.log('values', values);
    dispatch(login(phoneNumber, password));
  };
  return (
    <>
      <Header />
      <main>
        <Container>
          {error && <Message description={error} />}
          <div className="login-card">
            <h2 className="login-form-title">Đăng nhập</h2>
            <Form name="login-form" className="login-form" onFinish={onFinish}>
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!'
                  }
                ]}>
                <Input prefix={<PhoneOutlined />} placeholder="Số điện thoại" />
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
                <a className="login-form-forgot" href="">
                  Quên mật khẩu
                </a>
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
