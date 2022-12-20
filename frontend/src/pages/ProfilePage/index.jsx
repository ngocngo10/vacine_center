import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Input, Image, Row, Col, Card, Checkbox } from 'antd';
import patterns from '../../constants/pattern.constant';
import { useNavigate } from 'react-router-dom';
import { editUser, getUser } from '../../actions/user.action';
import { getSignedRequest } from '../../actions/upload.action';
import Loader from '../../components/Loader';
import Container from '../../layout/Container';
import Message from '../../components/Message';
import './index.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formRef = useRef();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const user = useSelector((state) => state.user);
  const { loading, error, userItem } = user;

  const userEdit = useSelector((state) => state.userEdit);
  const { editSuccess } = userEdit;

  const upload = useSelector((state) => state.upload);
  const { imageUrl } = upload;

  const onChange = (e) => {
    let files = e.target.files;
    console.log('files', files[0]);
    dispatch(getSignedRequest(files[0]));
  };

  const onFinish = (values) => {
    // console.log('values', values);
    // values.id = id;
    // values.gender = values.gender ? true : false;
    // values.isBlocked = values.isBlocked[0] ? true : false;
    // dispatch(editUser(values));
  };

  // useEffect(() => {
  //   if (userInfo && userInfo.user.roles.includes('user')) {
  //     // dispatch(getUser());
  //   } else {
  //     navigate('/login');
  //   }
  // }, [userInfo, id]);

  // useEffect(() => {
  //   if (userInfo && userInfo.user.roles.includes('user')) {
  //     formRef?.current.setFieldsValue({
  //       email: userItem?.email,
  //       name: userItem?.name,
  //       phoneNumber: userItem?.phoneNumber,
  //       gender: (userItem?.gender && 'Nam') || (!userItem?.gender && 'Nữ'),
  //       roles: userItem?.roles,
  //       isBlocked: userItem?.isBlocked ? [true] : [false]
  //     });
  //   } else {
  //     navigate('/login');
  //   }
  // }, [userInfo, userItem]);

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

  return (
    <div>
      {loading && <Loader />}
      {error && <Message description={error} />}
      {editSuccess && <Message type="success" description="Bạn đã cập nhật tài khoản thành công" />}
      {userEdit.error && <Message description={userEdit.error} />}
      <Container>
        <Row justify="space-around">
          <Col span={7}>
            <div className="profile-avatar">
              <Image
                src={imageUrl ? imageUrl : ''}
                className="preview-profile-image"
                fallback="data:image/png;base64,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"
              />
              <input
                type="file"
                class="custom-file-input custom-file-input--profile"
                name="image-file"
                onChange={(e) => onChange(e)}
              />
            </div>
          </Col>
          <Col span={16}>
            <Form
              ref={formRef}
              labelAlign="left"
              {...formItemLayout}
              name="profile-form"
              onFinish={onFinish}
              scrollToFirstError>
              <h2 className="page-title">Thông tin tài khoản cá nhân</h2>
              <Form.Item
                name="email"
                label="E-mail"
                // rules={[
                //   {
                //     type: 'email',
                //     message: 'Email không đúng!'
                //   },
                //   {
                //     required: true,
                //     message: 'Vui lòng nhập email!'
                //   }
                // ]}
              >
                <Input disabled={true} />
              </Form.Item>
              <Form.Item
                name="name"
                label="Họ và tên"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ và tên!',
                    whitespace: true
                  }
                ]}>
                <Input />
              </Form.Item>
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
                name="gender"
                label="Giới tính"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn giới tinh!'
                  }
                ]}>
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
                name="confirm"
                label="Xác nhận mật khẩu"
                dependencies={['password']}
                hasFeedback
                rules={[
                  // {
                  //   required: true,
                  //   message: 'Vui lòng nhập lại mật khẩu!'
                  // },
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
      </Container>
    </div>
  );
};

export default ProfilePage;
