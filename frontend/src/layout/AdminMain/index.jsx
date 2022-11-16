import { Layout } from 'antd';
import React from 'react';
import 'antd/dist/antd.css';
const { Header, Footer, Sider, Content } = Layout;
import AdminSideNav from '../AdminSideNav';

import AdminHeader from '../AdminHeader';
import { Outlet } from 'react-router-dom';
import './index.css';

const AdminMain = () => (
  <Layout>
    <Sider className="admin-sider" width={250}>
      <AdminSideNav />
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
export default AdminMain;
