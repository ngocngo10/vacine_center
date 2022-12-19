import React from 'react';
import { Row, Col, List } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import moment from 'moment';
import './index.css';

const InjectionHistoryItem = ({ appointment }) => {
  const vaccines = appointment.injections.map((item, index) => ({
    key: item.id,
    name: item.vaccine.name,
    price: item.price
  }));

  let priceTotal = vaccines.reduce((total, crr) => total + crr.price, 0);
  vaccines.push({
    key: 'total',
    name: 'Tổng cộng',
    price: priceTotal,
    className: 'total-price'
  });

  return (
    <div className="injection-history-item">
      <Row>
        <Col>
          <h3>THÔNG TIN NGƯỜI LIÊN HỆ</h3>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={12}>
          <span>
            Họ và tên người liên hệ: <strong>{appointment.user.name}</strong>
          </span>
        </Col>
      </Row>
      <Row justify="space-between">
        <Col span={8}>
          <span>
            Số điện thoại: <strong>{appointment.user.phoneNumber}</strong>
          </span>
        </Col>
        <Col span={8}>
          <span>
            Email: <strong>{appointment.user.email}</strong>
          </span>
        </Col>
        <Col span={8}>
          <span>
            Mối quan hệ với người tiêm: <strong>{appointment.relative}</strong>
          </span>
        </Col>
      </Row>
      <h3>THÔNG TIN KHÁM SÀN LỌC</h3>
      <Row justify="center">
        <Col span={23}>
          <h4>I. SÀN LỌC</h4>
          <Row>
            <Col>
              <span>
                Lịch sử tiêm chủng: <strong>{appointment.screeningTest?.injectionHistory}</strong>
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <span>
                Nhiệt độ (độ C): <strong>{appointment.screeningTest?.temperature}</strong>
              </span>
            </Col>
            <Col span={12}>
              <span>
                Mạch (lần/phút): <strong>{appointment.screeningTest?.circuit}</strong>
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <span>
                Huyết áp (mmHg): <strong>{appointment.screeningTest?.bloodPressure}</strong>
              </span>
            </Col>
            <Col span={12}>
              <span>
                Nhịp thở (lần/phút): <strong>{appointment.screeningTest?.breath}</strong>
              </span>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <span>
                Tiền sử bệnh (Nếu có): <strong>{appointment.screeningTest?.medicalHistory}</strong>
              </span>
            </Col>
          </Row>
          <h4>II. KẾT LUẬN</h4>
          <Row>
            <Col span={12}>
              <span>
                Được tiêm:{' '}
                <strong>
                  {appointment.screeningTest?.isQualified ? (
                    <CheckOutlined style={{ color: 'blue' }} />
                  ) : (
                    <CloseOutlined style={{ color: 'red' }} />
                  )}
                </strong>
              </span>
            </Col>
            <Col span={12}>
              <span>
                Lí do (Nếu không được tiêm):
                <strong>{appointment.screeningTest?.rejectReason}</strong>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>

      <h3>THÔNG TIN VẮC XIN</h3>
      <Row>
        <Col>Vắc xin đã tiêm:</Col>
      </Row>
      {appointment.injections.map((item, index) => (
        <>
          <Row justify="space-between" key={item.id}>
            <Col span={10}>
              <span>
                <strong>{`${index + 1}. ${item.vaccine.name}`}</strong>
              </span>
            </Col>
            <Col span={4}>
              <span>
                Mã vắc xin: <strong>{item.vaccine.vaccineCode}</strong>
              </span>
            </Col>
            <Col span={3}>
              <span>
                Mũi tiêm thứ: <strong>{item.injectionTime}</strong>
              </span>
            </Col>
            <Col span={3}>
              <span>
                Đã tiêm:
                <strong>
                  {item.isInjected ? (
                    <CheckOutlined style={{ color: 'blue' }} />
                  ) : (
                    <CloseOutlined style={{ color: 'red' }} />
                  )}
                </strong>
              </span>
            </Col>
          </Row>
        </>
      ))}

      <Row>
        <Col>
          <h3>TÌNH TRẠNG TIÊM</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* <Row>
            <Col>
              <span>
                Ngày tiêm:{' '}
                <strong>
                  {appointment.desiredDate && moment(appointment.desiredDate).format('DD/MM/YYYY')}
                </strong>
              </span>
            </Col>
          </Row> */}
          <Row>
            <Col>
              <span>
                Sức khỏe sau khi tiêm: <strong> {appointment.postInjectionReaction}</strong>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>THANH TOÁN</h3>
        </Col>
      </Row>

      <Row>
        <Col span={4}>Chi phí thanh toán:</Col>
        <Col span={10}>
          <List
            dataSource={vaccines}
            renderItem={(item) => (
              <List.Item key={item.key}>
                <List.Item.Meta
                  title={
                    <div className={`vaccine-item-price ${item.className}`}>
                      <strong>{item.name} </strong> <strong>{item.price}</strong>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <span>
            Tình trạng thanh toán:{' '}
            <strong>
              {appointment.isPaid ? (
                <CheckOutlined style={{ color: 'blue' }} />
              ) : (
                <CloseOutlined style={{ color: 'red' }} />
              )}
            </strong>
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default InjectionHistoryItem;
