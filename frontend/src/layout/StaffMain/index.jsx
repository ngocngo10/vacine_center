import { Layout } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
const { Header, Footer, Sider, Content } = Layout;
import StaffSideNav from '../StaffSideNav';
import AdminHeader from '../AdminHeader';
import { Outlet } from 'react-router-dom';

const StaffMain = () => (
  <Layout>
    <Sider className="admin-sider" width={250}>
      <StaffSideNav />
    </Sider>
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="admin-header">
        <AdminHeader />
      </Header>
      <Content className="admin-content">
        <Outlet />
      </Content>
      <Footer className="admin-footer">Footer</Footer>
    </Layout>
  </Layout>
);
export default StaffMain;
