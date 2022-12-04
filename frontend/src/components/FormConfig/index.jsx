import React from 'react';
import { InputNumber, Button, Form, Row, Col, Select, Divider, TimePicker, DatePicker } from 'antd';

const FormConfig = ({ appointmentConfig, handleAdd, okText, handleCancel }) => {
  const format = 'HH:mm';

  const onFinish = (values) => {
    console.log('values', values);
  };

  let disabled;
  if (appointmentConfig?.index === 0) {
    disabled = true;
  } else disabled = false;

  return (
    <Form
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
                  if (!endTime || endTime.diff(startAt) > 0) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Giờ kết thúc phải lớn hơn giờ bắt đầu!'));
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
                    (restTime.diff(startAt) > 0 && endTime.diff(restTime) > 0)
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
            name="appointment_duration"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập thời lượng mỗi khung giờ!'
              },
              ({ getFieldValue }) => ({
                validator(_, appointment_duration) {
                  const startAt = getFieldValue('startAt');
                  const restTime = getFieldValue('restTime');
                  const endTime = getFieldValue('endTime');
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
            name="apply_from"
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập ngày bắt đầu áp dụng!'
              }
            ]}
            labelAlign="left">
            <DatePicker />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="center">
        {(appointmentConfig?.index === 1 || handleAdd) && (
          <>
            <Button type="primary" className="btn-cancel" onClick={handleCancel}>
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
