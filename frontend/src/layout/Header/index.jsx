import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Dropdown, Image } from 'antd';
import 'antd/dist/antd.css';
import {
  UserOutlined,
  LogoutOutlined,
  ScheduleOutlined,
  CalendarOutlined,
  ApiOutlined,
  ProfileOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../../layout/Container';
import { logout } from '../../actions/user.action';
import './index.css';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const items = [
    {
      label: <Link to="/profile">Tài khoản cá nhân</Link>,
      key: 'profile',
      icon: (
        <ProfileOutlined
          style={{
            fontSize: '20px'
          }}
        />
      ),
      className: 'dropdown-account__item'
    },
    {
      label: (
        <Link
          to="/login"
          onClick={(e) => {
            e.preventDefault();
            handleLogout(e);
          }}>
          Đăng xuất
        </Link>
      ),
      key: 'log-out',
      icon: (
        <LogoutOutlined
          style={{
            fontSize: '20px'
          }}
        />
      ),
      className: 'dropdown-account__item'
    }
  ];

  return (
    <header className="page-header">
      <div className="header-top">
        <Container>
          <Link to="/" className="logo">
            MEDDICAL
          </Link>
          <ul className="header-actions">
            <li className="header-action__emergency">
              <ul className="header-action__item">
                <li>LIÊN HỆ</li>
                <li>
                  <time>0364675651</time>
                </li>
              </ul>
            </li>
            <li className="header-action__time">
              <ul className="header-action__item">
                <li>GIỜ LÀM VIỆC</li>
                <li>
                  <time>07:00 - 20:00 Everyday</time>
                </li>
              </ul>
            </li>
            <li className="header-action__location">
              <ul className="header-action__item">
                <li>LOCATION</li>
                <li>
                  <time>57 Ngô Thì Nhậm</time>
                </li>
              </ul>
            </li>
          </ul>
        </Container>
      </div>
      <nav className="header-nav">
        <Container>
          <div className="header-nav-card">
            <ul className="header-menu">
              <li className="header-menu__item">
                <Link to="/" className="header-menu-item__link">
                  Trang chủ
                </Link>
              </li>
              <li className="header-menu__item">
                <Link to="/vaccine-list" className="header-menu-item__link">
                  Danh mục vắc xin
                </Link>
              </li>
            </ul>
            <div className="header-user-action">
              <Button
                type="primary"
                className="appointment-register-btn"
                style={{ background: '#52de97', border: '#52de97', color: '#1f2b6c' }}
                onClick={() => navigate('/register-appointment')}>
                <CalendarOutlined />
                Đăng kí tiêm
              </Button>
              <div className="user-info">
                {userInfo ? (
                  <>
                    <Button
                      type="primary"
                      className="appointment-register-btn"
                      style={{ background: '#ffc107', border: '#ffc107', color: '#1f2b6c' }}
                      onClick={() => navigate('/appointment-history')}>
                      <ScheduleOutlined />
                      Lịch sử hẹn
                    </Button>
                    <Button
                      type="primary"
                      className="appointment-register-btn"
                      style={{ background: '#e7e7e7', border: '#e7e7e7', color: '#1f2b6c' }}
                      onClick={() => navigate('/injection-history')}>
                      <ApiOutlined />
                      Lịch sử tiêm
                    </Button>
                    <Dropdown menu={{ items }}>
                      <div>
                        <span className="user-info__name">{userInfo.user.name}</span>
                        {userInfo.user.avatar ? (
                          <Avatar
                            src={<Image src={userInfo.user.avatar} />}
                            size="large"
                            icon={<UserOutlined />}
                          />
                        ) : (
                          <Avatar size="large" icon={<UserOutlined />} />
                        )}
                      </div>
                    </Dropdown>
                  </>
                ) : (
                  <Button
                    type="primary"
                    className="user-info__login-btn"
                    style={{ background: '#ffc107', border: '#ffc107' }}
                    onClick={() => navigate('/login')}>
                    Login
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </header>
  );
};

export default Header;
