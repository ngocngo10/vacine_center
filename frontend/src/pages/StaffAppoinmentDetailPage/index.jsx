import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Divider, Button, Checkbox, Form } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getProvinceList } from '../../actions/province.action';
import {
  editAppointment,
  getAppointment,
  confirmAppointment
} from '../../actions/appointment.action';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import './index.css';
import moment from 'moment';

const StaffAppointmentDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const provinceList = useSelector((state) => state.provinceList);
  const { provinces } = provinceList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { loading, error, appointment } = useSelector((state) => state.appointment);

  const appointmentEdit = useSelector((state) => state.appointmentEdit);
  const { editSuccess } = appointmentEdit;

  const gender = appointment?.patient.gender ? 'Nam' : 'Nữ';
  const birthday = moment(appointment?.patient.birthday).format('DD/MM/YYYY');
  const province = provinces?.find((item) => item.code == +appointment?.patient.province);
  const district = province?.districts?.find((item) => item.code == +appointment?.patient.district);
  const ward = district?.wards?.find((item) => item.code == +appointment?.patient.ward);
  const address = `${appointment?.patient.street}, ${province?.name}, ${district?.name},  ${ward?.name}`;

  const appointmentConfirm = useSelector((state) => state.appointmentConfirm);
  const { confirmSuccess } = appointmentEdit;

  const handleCheckIn = () => {
    dispatch(editAppointment({ isCheckIn: true, id }));
  };

  const handleConfirm = () => {
    dispatch(confirmAppointment(id));
  };

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('staff')) {
      dispatch(getProvinceList());
      dispatch(getAppointment(id));
    } else {
      navigate('/login');
    }
  }, [userInfo, id, editSuccess]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message description={error} />
  ) : (
    <div>
      <h2 className="page-title">Thông tin chi tiết cuộc hẹn</h2>
      {appointmentEdit?.error && <Message description={appointmentEdit?.error} />}
      {appointmentEdit?.editSuccess && (
        <Message type="success" description="Check in thành công!" />
      )}
      {appointmentConfirm?.error && <Message description={appointmentConfirm?.error} />}
      {appointmentConfirm?.confirmSuccess && (
        <Message type="success" description="Xác nhận cuộc hẹn thành công!" />
      )}
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
                  Họ và tên người tiêm: <strong>{appointment?.patient.patientName}</strong>
                </span>
              </Col>
              <Col span={12}>
                <span>
                  Mã số bệnh nhân (Nếu có): <strong>{appointment?.patient.patientCode}</strong>
                </span>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={8}>
                <span>
                  Giới tính: <strong>{gender}</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Ngày sinh: <strong>{birthday}</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Số điện thoại: <strong>{appointment?.patient.phoneNumber}</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>
                  Địa chỉ: <strong>{address}</strong>
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
                  Loại vắc xin: <strong>{appointment?.listType == 1 ? 'Gói' : 'Lẻ'}</strong>
                </span>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>
                  Vắc xin mong muốn tiêm:
                  {appointment?.wishList.map((item) => (
                    <>
                      <strong>{item}</strong>
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
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffAppointmentDetailPage;
