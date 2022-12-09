import React from 'react';
import { Card, Row, Col, Divider, Button, Checkbox } from 'antd';
import { useNavigate } from 'react-router-dom';
import './index.css';

const StaffAppointmentDetailPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="page-title">Thông tin chi tiết cuộc hẹn</h2>
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
              <Col span={12}>
                <span>
                  Ngày mong muốn tiêm: <strong>20/10/2022</strong>
                </span>
              </Col>
              <Col span={12}>
                <span>
                  Khung giờ: <strong>10:00 - 11:00</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>TRẠNG THÁI CUỘC HẸN</h3>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <span>
                  Đã xác nhận: <Checkbox />
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Đã check in: <Checkbox />
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Giờ check in: <strong></strong>
                </span>
              </Col>
            </Row>
            <Divider />
            <Row justify="center">
              <Col span={4}>
                <Button
                  onClick={() => navigate('/staff-home/appointments')}
                  style={{ background: '#ffc107', border: '#ffc107', color: '#fff' }}>
                  Trở về
                </Button>
              </Col>

              <Col>
                <Button style={{ background: '#1f2b6c', border: '#1f2b6c', color: '#fff' }}>
                  Cập nhật
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffAppointmentDetailPage;
