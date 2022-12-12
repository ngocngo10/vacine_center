import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Row, Col, Card, Input } from 'antd';
import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.css';

const { Search } = Input;

const AdminWarehousePage = () => {
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'key',
      align: 'center'
    },
    {
      title: 'Mã vắc xin',
      dataIndex: 'vaccineCode',
      key: 'vaccineCode',
      align: 'center'
    },
    {
      title: 'Tên vắc xin',
      dataIndex: 'vaccineName',
      key: 'vaccineName',
      align: 'center'
    },
    {
      title: 'Ngày nhập',
      dataIndex: 'importDate',
      key: 'importDate',
      align: 'center'
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center'
    },
    {
      title: 'Giá/1 sản phẩm',
      dataIndex: 'price',
      key: 'price',
      align: 'center'
    },

    {
      title: 'Xem chi tiết',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (value) => <Link to={`${value}`}>Xem chi tiết</Link>
    }
  ];
  const data = {};
  data.totalElements = 12;
  // data.content = appointmentHistories?.map((item, index) => ({
  //   key: item.id,
  //   index: index + 1,
  //   code: item.patientCode,
  //   phoneNumber: item.phoneNumber,
  //   patientName: item.patientName
  // }));
  data.content = [
    // {
    //   key: 1,
    //   index: 1,
    //   name: 'Trần Văn A',
    //   email: 'a@gmail.com',
    //   phoneNumber: '1234567890',
    //   roles: ['user', 'staff'],
    //   action: '1',
    //   block: true
    // }
  ];

  return (
    <div>
      <Card style={{ borderRadius: 10 }}>
        <h2 className="page-title">Quản lí kho vắc xin</h2>
        <Row justify="space-between">
          <Col span={10}>
            <Search placeholder="Tìm theo tên" />
          </Col>
          <Col>
            <Button icon={<PlusOutlined />} type="primary">
              Nhập kho
            </Button>
          </Col>
        </Row>

        <Table
          style={{ marginTop: 20 }}
          rowKey={(record) => record.key}
          dataSource={data.content}
          columns={columns}
          // onChange={handleTableChange}
          pagination={{
            pageSize: 10,
            // current: currentPage + 1,
            total: data.totalElements,
            showTotal: (total, range) => {
              return `${range[0]}-${range[1]} of ${total} items`;
            }
          }}
        />
      </Card>
    </div>
  );
};

export default AdminWarehousePage;
