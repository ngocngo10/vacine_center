import React, { useRef, useEffect } from 'react';
import {
  InputNumber,
  Button,
  Form,
  Row,
  Col,
  Select,
  Divider,
  TimePicker,
  DatePicker,
  Popconfirm
} from 'antd';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import './index.css';

const FormConfig = ({ appointmentConfig, handleOnSubmit, okText, handleCancel }) => {
  const navigate = useNavigate();
  const format = 'HH:mm';
  const formRef = useRef(null);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    values.startAt = moment(values.startAt).format('HH:mm');
    values.endTime = moment(values.endTime).format('HH:mm');
    values.restTime = moment(values.restTime).format('HH:mm');
    values.applyFrom = moment(values.applyFrom).format('YYYY/MM/DD');
    handleOnSubmit(values);
  };

  const handleCancelBtn = () => {
    if (handleCancel) {
      handleCancel();
    } else {
      navigate(0);
    }
  };

  let disabled;
  if (appointmentConfig?.index === 0 || appointmentConfig?.index === 1) {
    disabled = true;
  } else disabled = false;

  useEffect(() => {
    if (appointmentConfig) {
      formRef.current?.setFieldsValue({
        startAt: moment(appointmentConfig?.startAt, format),
        endTime: moment(appointmentConfig?.endTime, format),
        restTime: moment(appointmentConfig?.restTime, format),
        participantNumber: appointmentConfig?.participantNumber,
        appointmentDuration: appointmentConfig?.appointmentDuration,
        applyFrom: moment(appointmentConfig?.applyFrom)
      });
    }
  }, [appointmentConfig]);

  return (
    <Form
      ref={formRef}
      form={form}
      layout="vertical"
      className="appointment-config-form"
      labelCol={{
        span: 24
      }}
      wrapperCol={{ span: 24 }}
      name="appointment-config-form"
      onFinish={onFinish}
      disabled={disabled}>
      <Row justify="space-between">
        <Col span={10}>
          <Form.Item
            label="Thời gian bắt đầu làm việc"
            name="startAt"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập thời gian bắt đầu làm việc'
              }
            ]}
            labelAlign="left">
            <TimePicker format={format} />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Thời gian kết thúc làm việc"
            name="endTime"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập thời gian kết thúc làm việc!'
              },
              ({ getFieldValue }) => ({
                validator(_, endTime) {
                  const startAt = getFieldValue('startAt');
                  if (!endTime || endTime.diff(startAt.startOf('minute'), 'minutes') > 8 * 60) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Giờ kết thúc phải trễ nhiều hơn 8 tiếng so giờ bắt đầu!')
                  );
                }
              })
            ]}
            labelAlign="left">
            <TimePicker format={format} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={10}>
          <Form.Item
            label="Thời gian bắt đầu nghỉ trưa"
            name="restTime"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập thời gian bắt đầu nghỉ trưa!'
              },
              ({ getFieldValue }) => ({
                validator(_, restTime) {
                  const startAt = getFieldValue('startAt');
                  const endTime = getFieldValue('endTime');
                  if (
                    !restTime ||
                    !startAt ||
                    !endTime ||
                    (restTime.diff(startAt.startOf('minute'), 'minutes') > 0 &&
                      endTime.diff(restTime.startOf('minute'), 'minutes') > 0)
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Giờ nghỉ trưa phải lớn hơn giờ bắt đầu và nhỏ hơn giờ kết thúc!')
                  );
                }
              })
            ]}
            labelAlign="left">
            <TimePicker format={format} />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Số bệnh nhân tối đa mỗi khung giờ"
            name="participantNumber"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số bệnh nhân tối đa mỗi khung giờ!'
              }
            ]}
            labelAlign="left">
            <InputNumber min={0} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={10}>
          <Form.Item
            label="Thời lượng mỗi khung giờ"
            name="appointmentDuration"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập thời lượng mỗi khung giờ!'
              },
              ({ getFieldValue }) => ({
                validator(_, appointment_duration) {
                  const startAt = getFieldValue('startAt').startOf('minute');
                  const restTime = getFieldValue('restTime').startOf('minute');
                  const endTime = getFieldValue('endTime').startOf('minute');
                  if (
                    !appointment_duration ||
                    !startAt ||
                    !restTime ||
                    !endTime ||
                    (restTime.diff(startAt, 'minutes') >= appointment_duration &&
                      endTime.diff(restTime, 'minutes') >= appointment_duration)
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Thời lượng mỗi khung giờ phải nhỏ hơn thời gian mỗi buổi!')
                  );
                }
              })
            ]}
            labelAlign="left">
            <Select
              placeholder="Chọn thời lượng"
              options={[
                {
                  value: '10',
                  label: '10 phút'
                },
                {
                  value: '15',
                  label: '15 phút'
                },
                {
                  value: '20',
                  label: '20 phút'
                },
                {
                  value: '30',
                  label: '30 phút'
                },
                {
                  value: '60',
                  label: '60 phút'
                },
                {
                  value: '90',
                  label: '90 phút'
                }
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label="Áp dụng từ ngày"
            name="applyFrom"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập ngày bắt đầu áp dụng!'
              },
              ({ getFieldValue }) => ({
                validator(_, applyFrom) {
                  if (!applyFrom || applyFrom.diff(moment().startOf('day'), 'days') > 14) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Ngày áp dụng phải lớn hơn 14 ngày so với ngày cài đặt!')
                  );
                }
              })
            ]}
            labelAlign="left">
            <DatePicker format="YYYY/MM/DD" />
          </Form.Item>
        </Col>
      </Row>
      {handleCancel && (
        <Row>
          <Col span={24}>
            <p className='note-add-schedule'>
              Chú ý: Kiểm tra thông tin trước khi Cài đặt, vì sau khi cài đặt không được cập nhật!
            </p>
          </Col>
        </Row>
      )}
      <br></br>
      <Row justify="center">
        {handleCancel && (
          <>
            <Button type="primary" className="btn-cancel" onClick={handleCancelBtn}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-add"
              style={{ background: '#198754', border: '#198754' }}>
              {okText}
            </Button>
          </>
        )}
      </Row>
    </Form>
  );
};

export default FormConfig;
