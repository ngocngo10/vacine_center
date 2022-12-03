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
  TimePicker
} from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';

const AdminScheduleConfig = () => {
  return (
    <Card loading={false} className="appointment-schedule-card">
      <h2 className="page-title">Cài đặt lịch hẹn</h2>
      <Row justify="space-around">
        <Col span={12}></Col>
      </Row>
    </Card>
  );
};

export default AdminScheduleConfig;
