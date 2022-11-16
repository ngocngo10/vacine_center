import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import './index.css';

const AdminHeader = () => {
  return (
    <>
      <h2 className="title">Quản lí người dùng</h2>
      <div className="avatar">
        <span>Ngô Thị Ngọc</span>
        <Avatar size="large" icon={<UserOutlined />} />
      </div>
    </>
  );
};

export default AdminHeader;
