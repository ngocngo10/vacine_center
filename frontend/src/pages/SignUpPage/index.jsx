import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Button, Form, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../layout/Container';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import patterns from '../../constants/pattern.constant';
import { register } from '../../actions/user.action';
import './index.css';
import Header from '../../components/Header';

const { Option } = Select;

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

const SignUpPage = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  console.log('userRegister', userRegister);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo]);

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    values.gender = values.gender === 'male';
    dispatch(register(values));
  };

  return (
    <>
      <Header />
      <main className="sign-up-main">
        <Container>
          {error && <Message description={error} />}
          {loading && <Loader />}
          <div className="sign-up-card">
            <div className="sign-up-image">
              <img src="/sign_up.png" alt="Sign Up Image" />
            </div>
            <Form
              className="sign-up-form"
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              scrollToFirstError>
              <h3 className="form-title">Đăng kí</h3>
              <Form.Item
                name="phoneNumber"
                label="Số điện thoại"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập số điện thoại!'
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || patterns.PHONE_NUMBER_PATTERN.test(value)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Số điện thoại không đúng!'));
                    }
                  })
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
                name="gender"
                label="Giới tính"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn giới tính!'
                  }
                ]}>
                <Select placeholder="Chọn giới tính">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                </Select>
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
              <Form.Item>
                <Button type="primary" htmlType="submit" className="sign-up-btn">
                  Đăng kí
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Container>
      </main>
    </>
  );
};

export default SignUpPage;
