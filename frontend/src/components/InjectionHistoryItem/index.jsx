import React from 'react';
import { Row, Col, List, Table, Radio, Checkbox, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const InjectionHistoryItem = ({ appointment }) => {
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
        <Radio.Group>
          <Radio value="Có">Có</Radio>
          <Radio value="Không">Không</Radio>
        </Radio.Group>
      )
    }
  ];
  return (
    <div>
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
            <Col span={6}>
              <span>
                Được tiêm:{' '}
                <strong>
                  {appointment.screeningTest?.isQualified ? 'Được tiêm' : 'Không được tiêm'}
                </strong>
              </span>
            </Col>
            <Col span={16}>
              <span>
                Lí do (Nếu không được tiêm):{' '}
                <strong>{appointment.screeningTest?.rejectReason}</strong>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>

      <h3>THÔNG TIN VẮC XIN</h3>

      {appointment.vaccines.map((item, index) => (
        <>
          <Row justify="space-between">
            <Col span={18}>
              <span>
                Vắc xin mong muốn tiêm: <strong>{item.name}</strong>
              </span>
            </Col>
            {/* <Col span={6}>
      <span>
        Mũi tiêm thứ: <strong>1</strong>
      </span>
    </Col> */}
          </Row>
          <Row>
            <Col span={12}>
              <span>
                Mã vắc xin: <strong>{item.vaccineCode}</strong>
              </span>
            </Col>
            {/* <Col>
      <span>
        Lô vắc xin: <strong>1222222</strong>
      </span>
    </Col> */}
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
          <Row>
            <Col>
              <span>
                Ngày tiêm:{' '}
                <strong>
                  {appointment.injections?.injectionAt &&
                    moment(appointment.injections?.injectionAt).format('DD/MM/YYYY')}
                </strong>
              </span>
            </Col>
          </Row>
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
        <Col>
          <span>
            Tình trạng thanh toán: <strong>{appointment.isPaid ? 'Rồi' : 'Chưa'}</strong>
          </span>
        </Col>
      </Row>
      <Row>
        <Col span={4}>Chi phí thanh toán:</Col>
        <Col span={10}>
          <List
            dataSource={[
              { id: 2, name: 'Vắc xin abcdđ', price: '120000' },
              // { id: 3, name: 'Vắc xin a', price: '120000' },
              { id: 4, name: 'Tổng cộng', price: '120000', className: 'checkout-total' }
            ]}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <List.Item.Meta
                  title={
                    <div className={`checkout-item ${item.className}`}>
                      <strong>{item.name} </strong> <strong>{item.price}</strong>
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default InjectionHistoryItem;
