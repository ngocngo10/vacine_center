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
      <Menu them="dark" mode="inline" className="admin-menu" defaultSelectedKeys={['vaccines']}>
        <Menu.Item key="1" className="admin-menu__item">
          <NavLink to="/users">
            <span className="label">Người dùng</span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="2"> */}
        <Menu.SubMenu key="submenu-2" title="Vắc xin">
          <Menu.Item key="vaccines">
            <NavLink to="vaccines">Danh sách</NavLink>
          </Menu.Item>
          <Menu.Item key="add-vaccine">
            <NavLink to="vaccines/add-vaccine">Thêm</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu key="submenu-3" title="Loại vắc xin">
          <Menu.Item key="disease-categories">
            <NavLink to="disease-categories">Phòng bệnh</NavLink>
          </Menu.Item>
          <Menu.Item key="age-groups-categories">
            <NavLink to="age-groups">Đối tượng</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="3">
          <NavLink to="/billing">
            <span className="label">Loại vkkkkkkkkk</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="4">
          <NavLink to="/rtl">
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
      </Menu>
    </>
  );
}

export default AdminSideNav;
