import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import {
  Card,
  InputNumber,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Select,
  Divider,
  Button,
  Image,
  TimePicker,
  DatePicker,
  Modal
} from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import FormConfig from '../../components/FormConfig';
import './index.css';

const AdminScheduleConfig = () => {
  const formRef = useRef();
  const format = 'HH:mm';

  const appointmentConfigs = [1, 2];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card loading={false} className="appointment-schedule-card">
        <h2 className="page-title">Cài đặt khung giờ hẹn</h2>
        {appointmentConfigs?.length &&
          appointmentConfigs.map((item, index) => (
            <Row justify="center">
              <Col span={14}>
                <FormConfig appointmentConfig={{ ...item, index: index }} okText="Cập nhật" />
                <Divider />
              </Col>
            </Row>
          ))}

        {appointmentConfigs?.length < 2 && (
          <Row justify="center">
            <Col>
              <Button type="primary" className="btn-cancel" onClick={showModal}>
                Thêm
              </Button>
            </Col>
          </Row>
        )}
      </Card>
      <Modal
        title="Thêm cài đặt các khung giờ làm việc"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
        cancelButtonProps={{ style: { display: 'none' } }}
        okButtonProps={{ style: { display: 'none' } }}>
        <FormConfig handleAdd={handleCancel} okText="Thêm" handleCancel={handleCancel} />
      </Modal>
    </>
  );
};

export default AdminScheduleConfig;
