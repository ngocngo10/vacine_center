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

  const { loading, error, appointmentItem } = useSelector((state) => state.appointment);

  const appointmentEdit = useSelector((state) => state.appointmentEdit);
  const { editSuccess } = appointmentEdit;

  const injectionCreate = useSelector((state) => state.injectionCreate);
  const { createSuccess } = injectionCreate;

  const gender = appointmentItem?.patient.gender ? 'Nam' : 'Nữ';
  const birthday = moment(appointmentItem?.patient.birthday).format('DD/MM/YYYY');
  const province = provinces?.find((item) => item.code == +appointmentItem?.patient.province);
  const district = province?.districts?.find(
    (item) => item.code == +appointmentItem?.patient.district
  );
  const ward = district?.wards?.find((item) => item.code == +appointmentItem?.patient.ward);
  const address = `${appointmentItem?.patient.street}, ${province?.name}, ${district?.name},  ${ward?.name}`;

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
  }, [userInfo, id, editSuccess, confirmSuccess]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message description={error} />
  ) : (
    <div>
      {appointmentEdit?.error && <Message description={appointmentEdit?.error} />}
      {appointmentEdit?.editSuccess && createSuccess && (
        <Message type="success" description="Check in thành công!" />
      )}
      {appointmentConfirm?.error && <Message description={appointmentConfirm?.error} />}
      {appointmentConfirm?.confirmSuccess && (
        <Message type="success" description="Xác nhận cuộc hẹn thành công!" />
      )}
      <Row justify="center">
        <Col span={24}>
          <Card className="appointment-details-card">
            <h2 className="page-title">Thông tin chi tiết cuộc hẹn</h2>
            <Row>
              <Col>
                <h3>THÔNG TIN NGƯỜI TIÊM</h3>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={12}>
                <span>
                  Họ và tên người tiêm: <strong>{appointmentItem?.patient.patientName}</strong>
                </span>
              </Col>
              <Col span={12}>
                <span>
                  Mã số bệnh nhân: <strong>{appointmentItem?.patient.patientCode}</strong>
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
                  Số điện thoại: <strong>{appointmentItem?.patient.phoneNumber}</strong>
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
                  Họ và tên người liên hệ: <strong>{appointmentItem?.user.name}</strong>
                </span>
              </Col>
            </Row>
            <Row justify="space-between">
              <Col span={8}>
                <span>
                  Số điện thoại: <strong>{appointmentItem?.user.phoneNumber}</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Email: <strong>{appointmentItem?.user.email}</strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Mối quan hệ với người tiêm: <strong>{appointmentItem?.relative}</strong>
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
                  {appointmentItem?.wishList.map((item) => (
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
                  <strong>{moment(appointmentItem?.desiredDate).format('DD/MM/YYYY')}</strong>
                </span>
              </Col>
              <Col span={12}>
                <span>
                  Khung giờ:
                  <strong>{`${moment(moment(appointmentItem?.schedule.startAt, 'HH:mm')).format(
                    'HH:mm'
                  )}-${moment(moment(appointmentItem?.schedule.startAt, 'HH:mm'))
                    .add(appointmentItem?.schedule.appointmentDuration, 'minutes')
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
                  <strong>{appointmentItem?.isConfirmed ? 'Đã xác nhận' : 'Chưa xác nhận'}</strong>
                </span>
              </Col>
              <Col>
                <span>
                  Giờ check in:
                  <strong>
                    {appointmentItem?.checkInAt &&
                      moment(appointmentItem?.checkInAt).format('DD/MM/YYY HH:mm:ss')}
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
                  disabled={appointmentItem?.isConfirmed ? true : false}
                  style={{ background: '#1f2b6c', border: '#1f2b6c', color: '#fff' }}>
                  Xác nhận hẹn
                </Button>
              </Col>
              <Col>
                <Button
                  disabled={appointmentItem?.checkInAt ? true : false}
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
