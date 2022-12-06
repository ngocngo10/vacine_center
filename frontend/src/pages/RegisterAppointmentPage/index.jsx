import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input, Select, Col, Row, Divider, DatePicker, Button, Tag, Radio, Card } from 'antd';
import { AlertOutlined, CloseOutlined } from '@ant-design/icons';
import Container from '../../layout/Container';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getProvinceList } from '../../actions/province.action';
import { getScheduleOnDay } from '../../actions/schedule.action';
import { getVaccineList } from '../../actions/vaccine.action';
import moment from 'moment';
import './index.css';

const { CheckableTag } = Tag;
const { Meta } = Card;
const RegisterAppointmentPage = () => {
  const dispatch = useDispatch();
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();
  const [vaccineOptions, setVaccineOptions] = useState();
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const [changedVaccineId, setChangedVaccineId] = useState();

  const formRef = useRef();

  const provinceList = useSelector((state) => state.provinceList);
  const { loading, error, provinces } = provinceList;

  const scheduleOnDay = useSelector((state) => state.scheduleOnDay);
  const { schedules } = scheduleOnDay;

  const vaccineList = useSelector((state) => state.vaccineList);
  const { vaccines } = vaccineList;

  const scheduleArr = schedules?.map((item) => ({
    ...item,
    startAt: moment(moment(item.startAt, 'HH:mm')).format('HH:mm'),
    endAt: moment(moment(item.startAt, 'HH:mm'))
      .add(item.appointmentDuration, 'minutes')
      .format('HH:mm')
  }));

  const provinceOptions = provinces?.map((item) => ({
    label: item.name,
    value: item.code
  }));
  const districtOptions = districts?.map((item) => ({ label: item.name, value: item.code }));
  const wardOptions = wards?.map((item) => ({ label: item.name, value: item.code }));

  const relativeOptions = [
    {
      value: 'Bản thân',
      label: 'Bản thân'
    },
    {
      value: 'Con',
      label: 'Con'
    },
    {
      value: 'Cha',
      label: 'Cha'
    },
    {
      value: 'Mẹ',
      label: 'Mẹ'
    },
    {
      value: 'Vợ',
      label: 'Vợ'
    },
    {
      value: 'Chồng',
      label: 'Chồng'
    },
    {
      value: 'Anh',
      label: 'Anh'
    },
    {
      value: 'Chị',
      label: 'Chị'
    },
    {
      value: 'Em',
      label: 'Em'
    },
    {
      value: 'Họ hàng',
      label: 'Họ hàng'
    }
  ];

  const handleChangeProvince = (code) => {
    formRef.current?.setFieldsValue({
      qh: null,
      px: null
    });
    const districts = provinces.find((item) => item.code === code).districts;
    setDistricts(districts);
  };

  const handleChangeDistrict = (code) => {
    const wards = districts?.find((item) => item.code === code).wards;
    setWards(wards);
  };

  const handleChangeDay = (date) => {
    const selectedDay = moment(date).format('YYYY-MM-DD');
    dispatch(getScheduleOnDay(selectedDay));
  };

  const onChangeRadio = (e) => {
    if (e.target.value == 2) {
      dispatch(getVaccineList({}));
      setVaccineOptions(vaccines.map((item) => ({ label: item.name, value: item.id })));
    } else {
      setVaccineOptions([]);
    }
  };

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

  useEffect(() => {
    dispatch(getProvinceList());
  }, []);

  return (
    <>
      <div className="appointment-register-page">
        <Container>
          <h2 className="page-title appointment-register-title">Đăng kí hẹn giờ tiêm vắc xin</h2>
          <Row justify="center">
            <Col span={24}>
              <Form
                ref={formRef}
                className="appointment-register-form"
                labelCol={{
                  span: 12
                }}
                wrapperCol={{ span: 12 }}
                labelWrap
                name="appointment-register-form"
                labelAlign="left">
                <Row justify="center">
                  <Col span={18}>
                    <Row justify="center">
                      <Col span={24}>
                        <h4>THÔNG TIN NGƯỜI TIÊM</h4>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={11}>
                        <Form.Item
                          label="Họ và tên người tiêm"
                          name="d"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập họ và tên người tiêm!'
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          label="Ngày tháng năm sinh người tiêm"
                          name="f"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn ngày tháng năm sinh người tiêm!'
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <DatePicker
                            placeholder="Ngày/Tháng/Năm"
                            format="DD-MM-YYYY"
                            style={{ width: '100%' }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={11}>
                        <Form.Item
                          label="Giới tính"
                          name=""
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn giới tính người tiêm!'
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <Select
                            options={[
                              {
                                value: 'Nam',
                                label: 'Nam'
                              },
                              {
                                value: 'Nữ',
                                label: 'Nữ'
                              }
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          label="Số điện thoại người tiêm (nếu có)"
                          name="g"
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={7}>
                        <Form.Item
                          label="Tỉnh thành"
                          name=""
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn tỉnh thành!'
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <Select
                            onChange={handleChangeProvince}
                            placeholder="Chọn"
                            options={provinceOptions}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          label="Quận huyện"
                          name="qh"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn quận huyện!'
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <Select
                            onChange={handleChangeDistrict}
                            options={districtOptions}
                            placeholder="Chọn tỉnh thành trước"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={7}>
                        <Form.Item
                          label="Phường xã"
                          name="px"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn phường xã!'
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <Select options={wardOptions} placeholder="Chọn phường xã trước" />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Số nhà, tên đường"
                          name="sn"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập địa chỉ liên hệ!'
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="center">
                      <Col span={24}>
                        <h4>THÔNG TIN NGƯỜI LIÊN HỆ</h4>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={24}>
                        <Form.Item
                          label="Họ và tên người liên hệ"
                          name="nlh"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập họ và tên người liên hệ!'
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={11}>
                        <Form.Item
                          label="Mối quan hệ với người tiêm"
                          name="mqh"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn mối quan hệ với người tiêm!'
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <Select options={relativeOptions} />
                        </Form.Item>
                      </Col>
                      <Col span={11}>
                        <Form.Item
                          label="Số điện thoại người liên hệ "
                          name="sdtlh"
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn số điện thoại người liên hệ!'
                            }
                          ]}>
                          <Input />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="center">
                      <Col span={24}>
                        <h4>THÔNG TIN DỊCH VỤ</h4>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={24}>
                        <Form.Item
                          label="Loại vắc xin muốn đăng ký"
                          name="lvmdk"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn loại vắc xin muốn đăng kí! '
                            }
                          ]}
                          labelCol={{
                            span: 7
                          }}
                          wrapperCol={{ span: 11 }}>
                          <Radio.Group onChange={onChangeRadio}>
                            <Radio.Button value="1">Vắc xin gói </Radio.Button>
                            <Radio.Button value="2">Vắc xin lẻ</Radio.Button>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={24}>
                        <Form.Item
                          label="Chọn vắc xin hoặc gói vắc xin"
                          name="cvx"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn vắc xin ! '
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <Row justify="space-between">
                            <Col span={16}>
                              <Select
                                showSearch
                                placeholder="Chọn loại vắc xin trước"
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
                    <Row justify="start">
                      <Col span={24}>
                        {selectedVaccines.map((item) => (
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
                              width: 300
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
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={24}>
                        <Form.Item
                          label="Ngày mong muốn tiêm (Chỉ được hẹn trước trong vòng 2 tuần)"
                          name="nmmt"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn ngày mong muốn tiêm! '
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  (value.diff(moment().startOf('day'), 'days') <= 14 &&
                                    value.diff(moment().startOf('day'), 'days') >= 1)
                                ) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(
                                  new Error(
                                    'Vui lòng chọn ngày mong muốn tiêm trước 1 ngày và trong vòng 2 tuần!'
                                  )
                                );
                              }
                            })
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 11 }}>
                          <DatePicker
                            placeholder="Ngày/Tháng/Năm"
                            format="DD-MM-YYYY"
                            style={{ width: '100%' }}
                            onChange={handleChangeDay}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={24}>
                        <Form.Item
                          label="Chọn thời gian (Các ô màu đỏ đã có lịch hẹn). Lưu ý: Không thực hiện hẹn giờ khám chữa bệnh vào các ngày lễ, tết."
                          name="ctg"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng chọn thời gian mong muốn tiêm! '
                            }
                          ]}
                          labelCol={{
                            span: 24
                          }}
                          wrapperCol={{ span: 24 }}>
                          <div className="appointment-shift-card">
                            {scheduleOnDay?.loading ? (
                              <Loader />
                            ) : error ? (
                              <Message />
                            ) : !scheduleArr ? (
                              <p>
                                <AlertOutlined
                                  style={{ color: 'red', fontSize: '25px', margin: '5px' }}
                                />
                                Thời gian cụ thể để chọn chỉ hiển thị nếu đã chọn ngày
                              </p>
                            ) : (
                              scheduleArr?.length &&
                              scheduleArr.map((item) =>
                                item.caseNumber === 0 ? (
                                  <Tag
                                    className="appointment-shift-tag"
                                    style={{
                                      margin: '10px',
                                      border: ' 2px solid #ff4d4f',
                                      color: '#fcfefe',
                                      backgroundColor: '#1f2b6c'
                                    }}>
                                    {`${item.startAt} - ${item.endAt}`}
                                  </Tag>
                                ) : (
                                  <CheckableTag
                                    className="appointment-shift-tag"
                                    style={{
                                      margin: '10px',
                                      border: ' 2px solid #87d068',
                                      color: '#fcfefe'
                                    }}>
                                    {`${item.startAt} - ${item.endAt}`}
                                  </CheckableTag>
                                )
                              )
                            )}
                          </div>
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
                            color: '#1f2b6c',
                            width: '200px',
                            height: '40px'
                          }}
                          className="register-appointment-btn">
                          Gửi đăng kí
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default RegisterAppointmentPage;
