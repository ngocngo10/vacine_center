import React from 'react';
import { Card, Form, Input, Row, Col, Select, Divider, Button } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import './index.css';

const { Option } = Select;

const AdminAddVaccine = () => {
  const [form] = Form.useForm();

  const handleSave = (values) => {
    console.log('onFinish', values);
    // call save API
  };

  const requiredFieldRule = [{ required: true, message: 'Required Field' }];

  const ownerArray = [
    {
      id: 1,
      value: 'John Nash'
    },
    {
      id: 2,
      value: 'Leonhard Euler'
    },
    {
      id: 3,
      value: 'Alan Turing'
    }
  ];

  const categoryArray = [
    {
      id: 1,
      value: 'Clothing'
    },
    {
      id: 2,
      value: 'Jewelery'
    },
    {
      id: 3,
      value: 'Accessory'
    }
  ];

  return (
    <Card title="Thêm Vắc xin" loading={false} className="add-vaccine-card">
      <Row justify="space-around">
        <Col span={6}>dđ</Col>
        <Col span={12}>
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            form={form}
            name="product-form"
            onFinish={handleSave}>
            <Form.Item
              label="Tên"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên vắc xin!',
                  whitespace: true
                }
              ]}>
              <Input />
            </Form.Item>
            <Form.Item label="Ảnh" name="image" style={{ display: 'none' }}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Nguồn gốc"
              name="origin"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập nguồn gốc vắc xin!',
                  whitespace: true
                }
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mô tả vắc xin!',
                  whitespace: true
                }
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Loại vắc xin"
              name="category"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn loại vắc xin!',
                  whitespace: true
                }
              ]}>
              <Select>
                {categoryArray.map((item) => (
                  <Option key={item.id} value={item.id}>
                    {item.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Divider />
            <Row justify="center">
              <Button type="primary" htmlType="submit" className="btn-cancel">
                Hủy
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                className="btn-add"
                style={{ background: '#198754', border: '#198754' }}>
                Thêm
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
export default AdminAddVaccine;
