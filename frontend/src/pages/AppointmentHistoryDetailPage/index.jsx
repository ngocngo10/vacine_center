import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Row, Col, Divider, Button, Popconfirm } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { getProvinceList } from '../../actions/province.action';
import { editAppointment, getAppointment } from '../../actions/appointment.action';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import Container from '../../layout/Container';
import './index.css';
import moment from 'moment';

const AppointmentHistoryDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEditAction, setIsEditAction] = useState(false);
  const { id } = useParams();

  const provinceList = useSelector((state) => state.provinceList);
  const { provinces } = provinceList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const { loading, error, appointmentItem } = useSelector((state) => state.appointment);
  const wishListPrice = appointmentItem?.wishList.reduce(
    (total, crr) => total + JSON.parse(crr).price,
    0
  );

  const appointmentEdit = useSelector((state) => state.appointmentEdit);
  const { editSuccess } = appointmentEdit;

  const gender = appointmentItem?.patient.gender ? 'Nam' : 'Nữ';
  const birthday = moment(appointmentItem?.patient.birthday).format('DD/MM/YYYY');
  const province = provinces?.find((item) => item.code == +appointmentItem?.patient.province);
  const district = province?.districts?.find(
    (item) => item.code == +appointmentItem?.patient.district
  );
  const ward = district?.wards?.find((item) => item.code == +appointmentItem?.patient.ward);
  const address = `${appointmentItem?.patient.street}, ${province?.name}, ${district?.name},  ${ward?.name}`;

  const handleCancelAppointment = () => {
    const data = { id: id, isCancelled: true };
    dispatch(editAppointment(data));
    setIsEditAction(true);
  };

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('user')) {
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
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message description={error} />
        ) : (
          <Row justify="center">
            <Col span={24}>
              <Card className="appointment-details-card">
                {appointmentEdit?.error && <Message description={appointmentEdit?.error} />}
                {editSuccess && isEditAction && (
                  <Message type="success" description="Bạn đã hủy lịch hẹn thành công!" />
                )}
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
                      {appointmentItem?.wishList.map((item, index) => (
                        <>
                          <ul>
                            <li>
                              <strong>{`${index + 1}. ${JSON.parse(item).name}-----${
                                JSON.parse(item).price
                              } ₫`}</strong>
                            </li>
                          </ul>
                        </>
                      ))}
                    </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="price-total">
                      Tổng tiền: <strong>{`${wishListPrice}   ₫`}</strong>
                    </p>
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
                      <strong>
                        {appointmentItem?.isConfirmed ? 'Đã xác nhận' : 'Chưa xác nhận'}
                      </strong>
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
                {appointmentItem?.isCancelled && (
                  <Row justify="center">
                    <Col>
                      <p className="appointment-cancel">Cuộc hẹn đã bị hủy</p>
                    </Col>
                  </Row>
                )}
                <Divider />
                <Row justify="center">
                  <Col span={3}>
                    <Button
                      onClick={() => navigate('/appointment-history')}
                      style={{ background: '#ffc107', border: '#ffc107', color: '#fff' }}>
                      Trở về
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      disabled={
                        appointmentItem?.isCancelled || appointmentItem?.checkInAt ? true : false
                      }
                      style={{ background: '#dc3545', border: '#dc3545', color: '#fff' }}>
                      <Popconfirm
                        title="Bạn có chắc chắc hủy lịch hẹn không?"
                        onConfirm={handleCancelAppointment}
                        okText="Yes"
                        cancelText="No">
                        <a href="#">Hủy lịch hẹn</a>
                      </Popconfirm>
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default AppointmentHistoryDetailPage;
