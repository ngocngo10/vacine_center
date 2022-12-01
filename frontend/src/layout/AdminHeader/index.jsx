import React from 'react';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import { Avatar, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../actions/user.action';
import './index.css';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };
  const items = [
    {
      label: (
        <Link
          to="/login"
          onClick={(e) => {
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
      className: 'dropdown-logout'
    }
  ];
  return (
    <>
      <h2 className="title"></h2>
      <Dropdown menu={{ items }}>
        <div className="avatar">
          <span>{userInfo.user.name}</span>
          <Avatar size="large" icon={<UserOutlined />} />
        </div>
      </Dropdown>
    </>
  );
};

export default AdminHeader;
