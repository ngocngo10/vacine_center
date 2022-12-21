import { Menu } from 'antd';
import {
  IdcardOutlined,
  DashboardOutlined,
  ApiOutlined,
  BarsOutlined,
  ClusterOutlined
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';
import './index.css';

function StaffSideNav() {
  const { pathname } = useLocation();
  const page = pathname.replace('/', '');

  return (
    <>
      <h1 className="brand">MEDDICAL</h1>
      <hr />
      <h3 className="sidebar-title">
        <ClusterOutlined style={{ fontSize: '22px', marginRight: '10px' }} />
        Hệ thống quản lí bệnh nhân
      </h3>
      <Menu them="dark" mode="inline" className="admin-menu" defaultSelectedKeys={['appointments']}>
        <Menu.Item key="appointments" className="admin-menu__item">
          <NavLink to="appointments">
            <span className="label">
              <DashboardOutlined style={{ fontSize: '22px', marginRight: '10px' }} />
              Đăng kí online
            </span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="appointments-on-day" className="admin-menu__item">
          <NavLink to="appointments-on-day">
            <span className="label">
              <IdcardOutlined style={{ fontSize: '22px', marginRight: '10px' }} />
              Trong ngày
            </span>
          </NavLink>
        </Menu.Item>

        <Menu.Item key="appointments-history">
          <NavLink to="appointments-history">
            <ApiOutlined style={{ fontSize: '22px', marginRight: '10px' }} />
            Hồ sơ tiêm
          </NavLink>
        </Menu.Item>
        <Menu.Item key="vaccines">
          <NavLink to="vaccines">
            <BarsOutlined style={{ fontSize: '22px', marginRight: '10px' }} />
            Danh mục vắc xin
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default StaffSideNav;
