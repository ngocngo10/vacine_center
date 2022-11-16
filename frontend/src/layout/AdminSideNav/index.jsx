import { useState } from 'react';
import { Menu, Button } from 'antd';
import { UserSwitchOutlined } from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import './index.css';

function AdminSideNav() {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  return (
    <>
      <h1 className="brand">MEDDICAL</h1>
      <hr />
      <Menu them="dark" mode="inline" className="admin-menu" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" className="admin-menu__item">
          <NavLink to="/users">
            <img className="icon" src="users-icon.svg" alt="Users Icon" />
            <span className="label">Người dùng</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="vaccines">
            <img className="icon" src="vaccine-icon.svg" alt="Vaccine Icon" />
            <span className="label">Vắc xin</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="3">
          <NavLink to="/billing">
            <img className="icon" src="categories-icon.svg" alt="Categories Icon" />
            <span className="label">Loại vắc xin</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/rtl">
            <span
              className="icon"
              style={{
                background: page === 'rtl' ? color : ''
              }}></span>
            <span className="label">RTL</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="5">
          Account Pages
        </Menu.Item>
        <Menu.Item key="6">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === 'profile' ? color : ''
              }}></span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="7">
          <NavLink to="/sign-in">
            <span className="label">Sign In</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="8">
          <NavLink to="/sign-up">
            <span className="label">Sign Up</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default AdminSideNav;
