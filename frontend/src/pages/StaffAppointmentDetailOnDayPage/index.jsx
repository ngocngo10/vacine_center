import React, { useState } from 'react';
import {
  Radio,
  Card,
  Space,
  Row,
  Col,
  Divider,
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Table
} from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';

const { TextArea } = Input;

const StaffAppointmentDetailOnDayPage = () => {
  const dataSource = [
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
      của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
      của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    },
    {
      key: '1',
      information: `Tiền sử rõ ràng phản vệ với vắc xin phòng COVID-19 lần trƣớc hoặc các thành phần
    của vắcxin phòng COVID-19`
    }
  ];

  const columns = [
    {
      title: 'Thông tin',
      dataIndex: 'information',
      key: 'information',
      render: (text, record, index) => `${index + 1}. ${text}`
    },
    {
      title: 'Có/Không',
      dataIndex: 'true',
      key: 'true',
      align: 'center',
      render: (text, record, index) => (
        <Form.Item name="1" rules={[{ required: true, message: 'Please input a quantity' }]}>
          <Radio.Group>
            <Radio value="Có">Có</Radio>
            <Radio value="Không">Không</Radio>
          </Radio.Group>
        </Form.Item>
      )
    }
  ];
  const navigate = useNavigate();
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
    <div>
      <h2 className="page-title">Thông tin chi tiết bệnh nhân</h2>
      <Row justify="center">
        <Col span={18}>
          <Card className="appointment-details-card">
            <Row>
              <Col>
                <h3>THÔNG TIN NGƯỜI TIÊM</h3>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={12}>
                <span>
                  Họ và tên người tiêm: <strong>Nguyễn Văn C</strong>
                </span>
              </Col>
              <Col span={12}>
                <span>
                  Mã số bệnh nhân (Nếu có): <strong>1111111S</strong>
                </span>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={8}>
                <span>
                  Giới tính: <strong>Nữ</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Ngày sinh: <strong>10/12/2002</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Số điện thoại: <strong>111111</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>
                  Địa chỉ: <strong>29 Điện Biên Phủ, Quận Thanh Khuê, thành phố Đà Nắng</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>THÔNG TIN NGƯỜI LIÊN HỆ</h3>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={12}>
                <span>
                  Họ và tên người liên hệ: <strong>Nguyễn Văn A</strong>
                </span>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={8}>
                <span>
                  Số điện thoại: <strong>0364675651</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Email: <strong>a@gmail.com</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>Mối quan hệ với người tiêm: Cha</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>THÔNG TIN DỊCH VỤ</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>
                  Loại vắc xin: <strong>Lẻ</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>
                  Vắc xin mong muốn tiêm: <strong>Infanrix Hexa – Vắc xin 6 trong 1 của Bỉ</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <span>
                  Ngày mong muốn tiêm: <strong>20/10/2022</strong>
                </span>
              </Col>
              <Col span={7}>
                <span>
                  Khung giờ: <strong>10:00 - 11:00</strong>
                </span>
              </Col>
              <Col span={7}>
                <span>
                  Giờ check in: <strong></strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>TÌNH TRẠNG BỆNH NHÂN</h3>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>
                  Đã khám sàn lọc: <strong>Chưa</strong>
                </span>
              </Col>
            </Row>
            <Form>
              <Row>
                <Col span={8}>
                  <Form.Item name="isInjected" label=" Đã tiêm">
                    <Checkbox />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item name="" label="Phản ứng sau tiêm">
                    <TextArea
                      style={{
                        height: 120,
                        width: 380
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Divider />
              <Row justify="center">
                <Col span={4}>
                  <Button
                    onClick={() => navigate('/staff-home/appointments-on-day')}
                    style={{ background: '#ffc107', border: '#ffc107', color: '#fff' }}>
                    Trở về
                  </Button>
                </Col>

                <Col span={4}>
                  <Button
                    htmlType="submit"
                    style={{ background: '#1f2b6c', border: '#1f2b6c', color: '#fff' }}>
                    Cập nhật
                  </Button>
                </Col>
                <Col>
                  <Button
                    onClick={showModal}
                    style={{ background: '#159eec', border: '#159eec', color: '#fff' }}>
                    Khám sàn lọc
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <Modal
            title="Khám sàng lọc"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1200}>
            <Row>
              <Col span={8}>
                <span>
                  Họ và tên người tiêm: <strong>Nguyễn Văn C</strong>
                </span>
              </Col>
              <Col span={12}>
                <span>
                  Mã số bệnh nhân (Nếu có): <strong>1111111S</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>
                  Giới tính: <strong>Nữ</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Ngày sinh: <strong>10/12/2002</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Số điện thoại: <strong>111111</strong>
                </span>
              </Col>
            </Row>

            <Form>
              <Row>
                <Col>Tình trạng tiêm chủng</Col>
              </Row>
              <h4>I. SÀN LỌC</h4>
              <Table dataSource={dataSource} columns={columns} />
              <h4>II. KẾT LUẬN</h4>
              <Row>
                <Col span={6}>
                  <Form.Item name="dc_tiem" label="Được tiêm">
                    <Checkbox />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item name="li_do" label="Lý do (Nếu không được tiêm)">
                    <TextArea />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        </Col>
      </Row>
    </div>
  );
};

export default StaffAppointmentDetailOnDayPage;
