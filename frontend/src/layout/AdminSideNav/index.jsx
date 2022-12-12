import { Menu } from 'antd';
import {
  UsergroupAddOutlined,
  TableOutlined,
  ApiOutlined,
  FieldTimeOutlined,
  ClusterOutlined
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
        <ClusterOutlined style={{ fontSize: '25px', marginRight: '10px' }} />
        Hệ thống quản lí
      </h3>
      <Menu them="dark" mode="inline" className="admin-menu" defaultSelectedKeys={['users']}>
        <Menu.Item key="users" className="admin-menu__item">
          <NavLink to="users">
            <span className="label">
              <UsergroupAddOutlined style={{ fontSize: '25px', marginRight: '10px' }} />
              Người dùng
            </span>
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="2"> */}
        {/* <Menu.SubMenu key="submenu-2" title="Vắc xin"> */}
        <Menu.Item key="vaccines">
          <NavLink to="vaccines">
            <ApiOutlined style={{ fontSize: '25px', marginRight: '10px' }} />
            Vắc xin
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="add-vaccine">
          <NavLink to="vaccines/add-vaccine">Thêm</NavLink>
        </Menu.Item> */}
        {/* </Menu.SubMenu> */}
        <Menu.SubMenu
          key="submenu-3"
          title="Loại vắc xin"
          icon={<TableOutlined style={{ fontSize: '25px' }} />}>
          <Menu.Item key="disease-categories">
            <NavLink to="disease-categories">Phòng bệnh</NavLink>
          </Menu.Item>
          <Menu.Item key="age-groups-categories">
            <NavLink to="age-groups-categories">Độ tuổi</NavLink>
          </Menu.Item>
        </Menu.SubMenu>
        {/* <Menu.SubMenu */}
        {/* key="submenu-4" title="Lịch hẹn" icon={<FieldTimeOutlined style={{ fontSize: '20px' }} />}> */}
        {/* <Menu.Item key="appointment-schedule">
          <NavLink to="appointment-schedule">Danh sách lịch hẹn</NavLink>
        </Menu.Item> */}
        <Menu.Item key="appointment-schedule-config">
          <NavLink to="appointment-schedule/config">
            <FieldTimeOutlined style={{ fontSize: '25px', marginRight: '10px' }} />
            Cài đặt lịch hẹn
          </NavLink>
        </Menu.Item>
        {/* </Menu.SubMenu> */}
      </Menu>
    </>
  );
}

export default AdminSideNav;
