import { Menu } from 'antd';
import {
  UsergroupAddOutlined,
  TableOutlined,
  ApiOutlined,
  FieldTimeOutlined,
  ClusterOutlined,
  HomeOutlined,
  ShopOutlined
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import './index.css';

function AdminSideNav() {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  return (
    <>
      <h1 className="brand">MEDDICAL</h1>
      <hr />
      <h3 className="sidebar-title">
        <ClusterOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
        Hệ thống quản lí
      </h3>
      <Menu them="dark" mode="inline" className="admin-menu" defaultSelectedKeys={['dashboard']}>
        <Menu.Item key="dashboard" className="admin-menu__item">
          <NavLink to="dashboard">
            <span className="label">
              <HomeOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
              Thống kê
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="users" className="admin-menu__item">
          <NavLink to="users">
            <span className="label">
              <UsergroupAddOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
              Người dùng
            </span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="vaccines">
          <NavLink to="vaccines">
            <ApiOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
            Vắc xin
          </NavLink>
        </Menu.Item>

        <Menu.SubMenu
          key="submenu-3"
          title="Loại vắc xin"
          icon={<TableOutlined style={{ fontSize: '20px' }} />}>
          <Menu.Item key="disease-categories">
            <NavLink to="disease-categories">Phòng bệnh</NavLink>
          </Menu.Item>
          <Menu.Item key="age-groups-categories">
            <NavLink to="age-groups-categories">Độ tuổi</NavLink>
          </Menu.Item>
        </Menu.SubMenu>

        <Menu.Item key="appointment-schedule-config">
          <NavLink to="appointment-schedule/config">
            <FieldTimeOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
            Cài đặt lịch hẹn
          </NavLink>
        </Menu.Item>

        <Menu.Item key="warehouse">
          <NavLink to="warehouse">
            <ShopOutlined style={{ fontSize: '20px', marginRight: '10px' }} />
            Quản lí kho
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default AdminSideNav;
