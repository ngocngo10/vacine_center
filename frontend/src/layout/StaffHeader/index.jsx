import React from 'react';
import { UserOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Avatar, Dropdown, Image } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/user.action';
import './index.css';

const StaffHeader = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const items = [
    {
      label: <Link to="/staff-home/profile">Tài khoản cá nhân</Link>,
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
    <>
      <h2 className="title"></h2>
      <Dropdown menu={{ items }}>
        <div className="avatar">
          <span>{userInfo.user.name}</span>
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
  );
};

export default StaffHeader;
