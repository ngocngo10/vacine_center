import React, { useState, useEffect, useRef } from 'react';
import {
  Radio,
  Card,
  Row,
  Col,
  Divider,
  Button,
  Checkbox,
  Form,
  Input,
  Collapse,
  Select,
  InputNumber
} from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAppointment, editAppointment } from '../../actions/appointment.action';
import { createInjection, deleteMultiInjection } from '../../actions/injection.action';
import { getProvinceList } from '../../actions/province.action';
import { getVaccineList } from '../../actions/vaccine.action';
import { createScreenTest, editScreenTest } from '../../actions/screen_test.action';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import moment from 'moment';
import './index.css';

const { TextArea } = Input;
const { Meta } = Card;
const { Panel } = Collapse;

const StaffAppointmentDetailOnDayPage = () => {
  const { id } = useParams();
  const [formRef] = Form.useForm();
  const [screenTestFormRef] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [changedVaccineId, setChangedVaccineId] = useState();
  const [isEditAction, setIsEditAction] = useState(false);

  const [isScreenTestAction, setIsScreenTestAction] = useState(false);

  const provinceList = useSelector((state) => state.provinceList);
  const { provinces } = provinceList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const appointment = useSelector((state) => state.appointment);
  const { loading, error, appointmentItem } = appointment;

  const gender = appointmentItem?.patient.gender ? 'Nam' : 'Nữ';
  const birthday = moment(appointmentItem?.patient.birthday).format('DD/MM/YYYY');
  const province = provinces?.find((item) => item.code == +appointmentItem?.patient.province);
  const district = province?.districts?.find(
    (item) => item.code == +appointmentItem?.patient.district
  );
  const ward = district?.wards?.find((item) => item.code == +appointmentItem?.patient.ward);
  const address = `${appointmentItem?.patient.street}, ${province?.name}, ${district?.name},  ${ward?.name}`;

  const vaccineList = useSelector((state) => state.vaccineList);
  const { vaccines } = vaccineList;

  const screenTestCreate = useSelector((state) => state.screenTestCreate);
  const { createSuccess } = screenTestCreate;

  const screenTestEdit = useSelector((state) => state.screenTestEdit);
  const { editSuccess } = screenTestEdit;

  const appointmentEdit = useSelector((state) => state.appointmentEdit);

  const injectionCreate = useSelector((state) => state.injectionCreate);

  const injectionDeleteMulti = useSelector((state) => state.injectionDeleteMulti);

  const vaccineOptions = vaccines?.map((item) => ({
    label: item.name,
    value: item.id,
    key: item.id
  }));

  const totalPrice = selectedVaccines?.reduce((total, crr) => total + crr.price, 0);

  const options = [
    {
      label: 'Đã tiêm',
      value: 1
    }
  ];

  const payOptions = [
    {
      label: 'Đã thanh toán',
      value: 1
    }
  ];

  const onChangeVaccine = (value) => {
    setChangedVaccineId(value);
  };
  const onSearchVaccine = (value) => {
    console.log('search:', value);
  };

  const handleRemoveVaccine = (id) => {
    if (id) setSelectedVaccines(selectedVaccines.filter((item) => item.id != id));
  };

  const handleAddVaccine = () => {
    const vaccine = vaccines.find((item) => item.id == changedVaccineId);
    if (vaccine) setSelectedVaccines(selectedVaccines.concat(vaccine));
  };

  const handleCreateInjection = () => {
    console.log('selectedVaccines', selectedVaccines);
    dispatch(
      createInjection({
        injections: selectedVaccines?.map((item) => ({
          appointmentId: id,
          vaccineId: item.id,
          vaccineItemId: null,
          price: item.price,
          injectionTime: item.injectionTime,
          isInjected: item.isInjected || false
        }))
      })
    );
  };

  const handleUpdateScreenTest = (values) => {
    console.log('values', values);
    setIsEditAction(false);

    setIsScreenTestAction(true);
    if (!appointmentItem?.injections?.length && values.isQualified == 1) {
      //add injection
      handleCreateInjection();
    }
    if (appointmentItem?.injections?.length && values.isQualified == 0) {
      //remove injection id
      const ids = appointmentItem.injections.map((item) => item.id);
      dispatch(deleteMultiInjection(ids));
    }
    if (appointmentItem?.screeningTest || appointmentItem?.screeningTest?.length) {
      values.id = appointmentItem.screeningTest.id;
      dispatch(editScreenTest(values));
    } else {
      values.appointmentId = id;
      dispatch(createScreenTest(values));
    }
  };

  const handleUpdateAppointment = (values) => {
    if (appointmentItem?.injections?.length) {
      //update injection (remove/add)
      const ids = appointmentItem.injections.map((item) => item.id);
      dispatch(deleteMultiInjection(ids));
      handleCreateInjection();
    } else {
      handleCreateInjection();
    }
    setIsScreenTestAction(false);
    setIsEditAction(true);
    values.isPaid = values.isPaid == 1 ? true : false;
    dispatch(
      editAppointment({
        id: id,
        isPaid: values.isPaid,
        postInjectionReaction: values.postInjectionReaction
      })
    );
  };

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('staff')) {
      dispatch(getProvinceList());
      dispatch(getAppointment(id));
      dispatch(getVaccineList({}));
    } else {
      navigate('/login');
    }
  }, [
    userInfo,
    id,
    screenTestCreate.createSuccess,
    screenTestCreate.editSuccess,
    appointmentEdit.editSuccess,
    injectionCreate.createSuccess,
    injectionDeleteMulti.deleteMultiSuccess
  ]);

  useEffect(() => {
    if (appointmentItem?.injections?.length) {
      setSelectedVaccines(
        appointmentItem.vaccines.map((item) => {
          const injection = appointmentItem.injections.find((i) => i.vaccineId == item.id);
          return {
            name: item.name,
            image: item.image,
            price: injection.price,
            id: item.id,
            injectionTime: injection.injectionTime,
            isInjected: injection.isInjected
          };
        })
      );
    } else {
      setSelectedVaccines(
        appointmentItem?.wishList.map((item, index) => ({
          name: JSON.parse(item).name,
          image: JSON.parse(item).image,
          price: JSON.parse(item).price,
          id: JSON.parse(item).id
        }))
      );
    }

    if (appointmentItem?.screeningTest)
      screenTestFormRef.setFieldsValue({
        injectionHistory: appointmentItem.screeningTest.injectionHistory,
        temperature: appointmentItem.screeningTest.temperature,
        circuit: appointmentItem.screeningTest.circuit,
        bloodPressure: appointmentItem.screeningTest.bloodPressure,
        breath: appointmentItem.screeningTest.breath,
        medicalHistory: appointmentItem.screeningTest.medicalHistory,
        isQualified: appointmentItem.screeningTest.isQualified ? 1 : 0,
        rejectReason: appointmentItem.screeningTest.rejectReason
      });
  }, [appointmentItem]);

  useEffect(() => {
    formRef.setFieldsValue({
      injection: appointmentItem?.injections?.length ? '1 ' : ' 0',
      postInjectionReaction: appointmentItem?.postInjectionReaction,
      isPaid: appointmentItem?.isPaid ? '1' : '0'
    });
    // appointmentItem?.injections.forEach((item, index) => {
    //   const obj = {};
    //   obj[`injectionTime${item.id}`] = item.injectionTime;
    //   return formRef.setFieldsValue(obj);
    // });
  }, [appointmentItem]);

  return (
    <div>
      {loading || provinceList.loading ? (
        <Loader />
      ) : error || provinceList.error ? (
        <Message description={`${error} ${provinceList.error}`} />
      ) : (
        <Row justify="center">
          {changedVaccineId && !vaccines.find((item) => item.id == changedVaccineId)?.quantity && (
            <Message description="Vắc xin hiện tại đã hết trong kho!" />
          )}
          {screenTestCreate?.error && <Message description={screenTestCreate.error} />}
          {screenTestEdit?.error && <Message description={screenTestEdit.error} />}
          {appointmentEdit?.error && <Message description={appointmentEdit.error} />}
          {injectionCreate?.error && <Message description={injectionCreate.error} />}
          {screenTestCreate?.createSuccess && isScreenTestAction && (
            <Message type="success" description="Bạn đã tạo khám sàn lọc thành công!" />
          )}
          {appointmentEdit?.editSuccess && isEditAction && (
            <Message type="success" description="Bạn đã cập nhật thông tin thành công!" />
          )}
          {screenTestEdit.editSuccess && isScreenTestAction && (
            <Message type="success" description="Bạn đã cập nhật khám sàn lọc thành công!" />
          )}

          <Col span={24}>
            <Card className="appointment-on-day-details-card">
              <h2 className="page-title">Thông tin chi tiết bệnh nhân</h2>
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
                    Mã số bệnh nhân:
                    <strong>{appointmentItem?.patient.patientCode}</strong>
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
                <Col span={12}>
                  <span>
                    Khung giờ hẹn:
                    <strong>{`${moment(moment(appointmentItem?.schedule.startAt, 'HH:mm')).format(
                      'HH:mm'
                    )}-${moment(moment(appointmentItem?.schedule.startAt, 'HH:mm'))
                      .add(appointmentItem?.schedule.appointmentDuration, 'minutes')
                      .format('HH:mm')}`}</strong>
                  </span>
                </Col>
                <Col span={7}>
                  <span>
                    Giờ check in:
                    <strong>
                      {appointmentItem?.checkInAt &&
                        moment(appointmentItem?.checkInAt).format('DD/MM/YYY HH:mm:ss')}
                    </strong>
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
                  <h3>THÔNG TIN KHÁM SÀN LỌC</h3>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Collapse className="injection-history-list" style={{ background: '#bfd2f8' }}>
                    <Panel header="THÔNG TIN KHÁM SÀN LỌC" key="1">
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

                      <Form
                        form={screenTestFormRef}
                        onFinish={handleUpdateScreenTest}
                        className="injection-form">
                        <Row>
                          <Col span={24}>
                            <Form.Item
                              name="injectionHistory"
                              label="Lịch sử tiêm chủng"
                              rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng nhập lịch sử tiêm chủng! ',
                                  whitespace: true
                                }
                              ]}>
                              <TextArea />
                            </Form.Item>
                          </Col>
                        </Row>
                        <h4>I. SÀN LỌC</h4>
                        <Row justify="space-between">
                          <Col span={8}>
                            <Form.Item
                              name="temperature"
                              label="Nhiệt độ (độ C)"
                              rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng nhập nhiệt độ! ',
                                  whitespace: true
                                }
                              ]}>
                              <Input></Input>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              name="circuit"
                              label="Mạch (lần/phút)"
                              rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng nhập mạch! ',
                                  whitespace: true
                                }
                              ]}>
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row justify="space-between">
                          <Col span={8}>
                            <Form.Item
                              name="bloodPressure"
                              label="Huyết áp (mmHg)"
                              rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng nhập huyết áp! ',
                                  whitespace: true
                                }
                              ]}>
                              <Input></Input>
                            </Form.Item>
                          </Col>
                          <Col span={8}>
                            <Form.Item
                              name="breath"
                              label="Nhịp thở (lần/phút)"
                              rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng nhập nhịp thở! ',
                                  whitespace: true
                                }
                              ]}>
                              <Input />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Row>
                          <Col span={24}>
                            <Form.Item name="medicalHistory" label="Tiền sử bệnh (Nếu có)">
                              <TextArea />
                            </Form.Item>
                          </Col>
                        </Row>
                        <h4>II. KẾT LUẬN</h4>
                        <Row>
                          <Col span={6}>
                            <Form.Item
                              name="isQualified"
                              label="Được tiêm"
                              rules={[
                                {
                                  required: true,
                                  message: 'Vui lòng chọn! '
                                }
                              ]}>
                              <Radio.Group>
                                <Radio value={1}>Được tiêm</Radio>
                                <Radio value={0}>Không được tiêm</Radio>
                              </Radio.Group>
                            </Form.Item>
                          </Col>
                          <Col span={18}>
                            <Form.Item name="rejectReason" label="Lý do (Nếu không được tiêm)">
                              <TextArea />
                            </Form.Item>
                          </Col>
                        </Row>
                        <Divider />
                        <Row justify="center">
                          <Col>
                            <Button
                              type="primary"
                              htmlType="submit"
                              style={{
                                background: '#bfd2f8',
                                border: '#bfd2f8',
                                color: '#1f2b6c'
                              }}>
                              Cập nhật hồ sơ khám sàn lọc
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3>THÔNG TIN DỊCH VỤ</h3>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={24}>
                  <Form.Item
                    label="Chọn vắc xin"
                    name="wishList"
                    labelCol={{
                      span: 24
                    }}
                    wrapperCol={{ span: 24 }}>
                    <Row justify="space-between">
                      <Col span={16}>
                        <Select
                          showSearch
                          placeholder="Chọn vắc xin"
                          onChange={onChangeVaccine}
                          onSearch={onSearchVaccine}
                          filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                          }
                          options={vaccineOptions}
                        />
                      </Col>
                      <Col span={6}>
                        <Button
                          type="primary"
                          style={{ background: '#1f2b6c', border: '#1f2b6c' }}
                          onClick={handleAddVaccine}>
                          Thêm vắc xin
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="space-between">
                <Col span={24}>
                  <div className="selected-vaccines-card">
                    {selectedVaccines?.map((item) => (
                      <Card
                        key={item.id}
                        extra={
                          <CloseOutlined
                            onClick={() => handleRemoveVaccine(item.id)}
                            className="card-icon"
                            style={{ cursor: 'pointer' }}
                          />
                        }
                        hoverable
                        style={{
                          width: 300,
                          margin: 10
                        }}
                        cover={
                          <img
                            className="vaccine-image-cover"
                            alt="vaccine-image"
                            src={item.image}
                          />
                        }>
                        <Meta
                          description={
                            <>
                              <h5 className="text text--card-title">{item.name}</h5>
                              <p className="text text--card-desc">{item.description}</p>
                            </>
                          }
                        />
                      </Card>
                    ))}
                  </div>
                </Col>
              </Row>
              <Form form={formRef} onFinish={handleUpdateAppointment} className="injection-form">
                <Row>
                  <Col span={24}>
                    <p>
                      Vắc xin mong muốn tiêm:{' '}
                      <strong>
                        <ul>
                          {selectedVaccines?.map((item, index) => (
                            <Row>
                              <Col key={item.id} span={12}>
                                <strong>{`${index + 1}. ${item.name}`}</strong>
                              </Col>
                              <Col span={3}>
                                <strong>{`${item.price} ₫`}</strong>
                              </Col>
                              <Col span={5}>
                                <Form.Item label=" Mũi tiêm thứ" name={`injectionTime${item.id}`}>
                                  <InputNumber
                                    defaultValue={item.injectionTime}
                                    min={1}
                                    max={10}
                                    onChange={(values) =>
                                      (selectedVaccines[index].injectionTime = values)
                                    }
                                  />
                                </Form.Item>
                              </Col>
                              <Col>
                                <Form.Item name={`isInjected${id}`} label=" Đã tiêm">
                                  <Checkbox
                                    defaultChecked={item.isInjected}
                                    onChange={(e) => {
                                      selectedVaccines[index].isInjected = e.target.checked;
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>
                          ))}
                        </ul>
                      </strong>
                    </p>
                  </Col>
                </Row>

                <Row>
                  <Col span={12}>
                    <strong className="checkout-total">Tổng tiền: </strong>
                  </Col>

                  <Col>
                    <strong className="checkout-total">{`${totalPrice}   ₫`}</strong>
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
                      Đã khám sàn lọc:
                      <strong>
                        {appointmentItem?.screeningTest ? (
                          <CheckOutlined style={{ color: 'blue' }} />
                        ) : (
                          <CloseOutlined style={{ color: 'red' }} />
                        )}
                      </strong>
                    </span>
                  </Col>
                </Row>

                <Row>
                  <Col span={8}>
                    <Form.Item name="isPaid" label=" Đã thanh toán">
                      <Checkbox.Group options={payOptions} />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item name="postInjectionReaction" label="Phản ứng sau tiêm">
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
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default StaffAppointmentDetailOnDayPage;
