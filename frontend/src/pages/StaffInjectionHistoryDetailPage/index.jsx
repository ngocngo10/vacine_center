import React, { useEffect } from 'react';
import { Row, Col, Card, Collapse } from 'antd';
import InjectionHistoryItem from '../../components/InjectionHistoryItem';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAppointmentHistories } from '../../actions/appointment.action';
import './index.css';
import moment from 'moment';

const { Panel } = Collapse;

const StaffInjectionHistoryDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientList = useSelector((state) => state.patientList);
  const { patients } = patientList;
  const patient = patients?.find((item) => item.id == id);

  const appointmentList = useSelector((state) => state.appointmentList);
  const { appointmentHistories } = appointmentList;
  console.log('appointmentHistories', appointmentHistories);

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('staff')) {
      dispatch(getAppointmentHistories({ patientCode: patient.patientCode }));
    } else {
      navigate('/login');
    }
  }, [userInfo, patient]);
  return (
    <div>
      <Row justify="center">
        <Col span={24}>
          <Card className="injection-details-card">
            <h2 className="page-title">Hồ sơ chi tiết của bệnh nhân</h2>
            <Row>
              <Col>
                <h3>THÔNG TIN BỆNH NHÂN</h3>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={12}>
                <span>
                  Họ và tên người tiêm: <strong>{patient?.patientName}</strong>
                </span>
              </Col>
              <Col span={12}>
                <span>
                  Mã số bệnh nhân: <strong>{patient?.patientCode}</strong>
                </span>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={8}>
                <span>
                  Giới tính: <strong>{patient?.gender ? 'Name' : 'Nữ'}</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Ngày sinh:{' '}
                  <strong>
                    {patient?.birthday && moment(patient?.birthday).format('DD/MM/YYYY')}
                  </strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Số điện thoại: <strong>{patient?.phoneNumber}</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>
                  Địa chỉ: <strong>Số nhà 29 thôn phú đông</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>LỊCH SỬ TIÊM</h3>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Collapse
                  className="injection-history-list"
                  defaultActiveKey={['1']}
                  style={{ background: '#bfd2f8' }}>
                  {appointmentHistories?.map((item, index) => (
                    <Panel header={index + 1} key={index}>
                      <InjectionHistoryItem appointment={item} />
                    </Panel>
                  ))}
                </Collapse>
              </Col>
            </Row>

            {/*
            <Row justify="space-between">
              <Col span={12}>
                <span>
                  Họ và tên người liên hệ: <strong>{appointment?.user.name}</strong>
                </span>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={8}>
                <span>
                  Số điện thoại: <strong>{appointment?.user.phoneNumber}</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Email: <strong>{appointment?.user.email}</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Mối quan hệ với người tiêm: <strong>{appointment?.relative}</strong>
                </span>
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
                  Vắc xin mong muốn tiêm:
                  {appointment?.wishList.map((item) => (
                    <>
                      <strong>{JSON.parse(item).name}</strong>
                      <br />
                    </>
                  ))}
                </span>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <span>
                  Ngày mong muốn tiêm:
                  <strong>{moment(appointment?.desiredDate).format('DD/MM/YYYY')}</strong>
                </span>
              </Col>
              <Col span={12}>
                <span>
                  Khung giờ:
                  <strong>{`${moment(moment(appointment?.schedule.startAt, 'HH:mm')).format(
                    'HH:mm'
                  )}-${moment(moment(appointment?.schedule.startAt, 'HH:mm'))
                    .add(appointment?.schedule.appointmentDuration, 'minutes')
                    .format('HH:mm')}`}</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <h3>TRẠNG THÁI CUỘC HẸN</h3>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <span>
                  Trạng thái xác nhận:
                  <strong>{appointment?.isConfirmed ? 'Đã xác nhận' : 'Chưa xác nhận'}</strong>
                </span>
              </Col>
              <Col>
                <span>
                  Giờ check in:
                  <strong>
                    {appointment?.checkInAt &&
                      moment(appointment?.checkInAt).format('DD/MM/YYY HH:mm:ss')}
                  </strong>
                </span>
              </Col>
            </Row>
            <Divider />
            <Row justify="center">
              <Col span={3}>
                <Button
                  onClick={() => navigate('/staff-home/appointments')}
                  style={{ background: '#ffc107', border: '#ffc107', color: '#fff' }}>
                  Trở về
                </Button>
              </Col>
              <Col span={4}>
                <Button
                  onClick={handleConfirm}
                  disabled={appointment?.isConfirmed ? true : false}
                  style={{ background: '#1f2b6c', border: '#1f2b6c', color: '#fff' }}>
                  Xác nhận hẹn
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={appointment?.checkInAt ? true : false}
                  onClick={handleCheckIn}
                  style={{ background: '#dc3545', border: '#dc3545', color: '#fff' }}>
                  Xác nhận check in
                </Button>
              </Col>
            </Row>{' '}
            */}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffInjectionHistoryDetailPage;
