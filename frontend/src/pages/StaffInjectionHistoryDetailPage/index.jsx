import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Collapse, Skeleton, Table, Button, Input } from 'antd';
import InjectionHistoryItem from '../../components/InjectionHistoryItem';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPatient, getPatientInjections } from '../../actions/patient.action';
import { getProvinceList } from '../../actions/province.action';
import moment from 'moment';
import './index.css';
import Message from '../../components/Message';

const { Panel } = Collapse;
const { Search } = Input;

const StaffInjectionHistoryDetailPage = () => {
  const DEFAULT_PAGE_NUMBER = 0;
  const { id } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patient = useSelector((state) => state.patient);
  const { patientItem, error, loading } = patient;
  const injections = [];
  patientItem?.appointments?.forEach((appointment, index) => {
    if (appointment.injections.length) {
      const desiredDate = appointment.desiredDate;
      appointment.injections.forEach((injection) => {
        if (injection.isInjected == true) {
          injections.push({ ...injection, desiredDate: desiredDate });
        }
      });
    }
  });

  const provinceList = useSelector((state) => state.provinceList);
  const { provinces } = provinceList;
  const province = provinces?.find((item) => item.code == +patientItem?.province);
  const district = province?.districts?.find((item) => item.code == +patientItem?.district);
  const ward = district?.wards?.find((item) => item.code == patientItem?.ward);
  const address = `${patientItem?.street}, ${province?.name}, ${district?.name},  ${ward?.name}`;

  const patientInjections = useSelector((state) => state.patientInjections);
  const { patientInjectionsList, totalItem } = patientInjections;
  console.log('patientInjectionsList', patientInjectionsList);
  const handleTableChange = (pagination) => {
    dispatch(getPatientInjections({ query: { perPage: 10, page: pagination.current }, id: id }));
    setCurrentPage(pagination.current - 1);
  };

  const onSearchVaccineCode = (value) => {
    dispatch(getPatientInjections({ query: { perPage: 10, vaccineCode: value }, id: id }));
  };

  const onSearchVaccineName = (value) => {
    dispatch(getPatientInjections({ query: { perPage: 10, vaccineName: value }, id: id }));
  };

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('staff')) {
      dispatch(getProvinceList());
      dispatch(getPatient(id));
      dispatch(getPatientInjections({ query: { perPage: 10 }, id: id }));
    } else {
      navigate('/login');
    }
  }, [userInfo, id]);
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'key',
      align: 'center'
    },
    {
      title: 'Mã vắc xin',
      dataIndex: 'vaccineCode',
      key: 'vaccineCode',
      align: 'center'
    },
    {
      title: 'Tên vắc xin',
      dataIndex: 'name',
      key: 'name',
      align: 'center'
    },
    {
      title: 'Mũi tiêm thứ',
      dataIndex: 'injectionTime',
      key: 'injectionTime',
      align: 'center'
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'center'
    },
    {
      title: 'Ngày tiêm',
      dataIndex: 'day',
      key: 'day',
      align: 'center'
    }
  ];
  const data = {};
  data.totalElements = totalItem;
  data.content = patientInjectionsList?.map((item, index) => ({
    key: item.vaccineId,
    index: currentPage * 10 + index + 1,
    vaccineCode: item.vaccineCode,
    name: item.vaccineName,
    price: item.price,
    injectionTime: item.injectionTime,
    day: moment(item.injectionAt).format('DD/MM/YYYY')
  }));
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
            {loading && provinceList.loading ? (
              <Skeleton />
            ) : error && provinceList.error ? (
              <Message description={error} />
            ) : (
              <>
                <Row justify="space-between">
                  <Col span={12}>
                    <span>
                      Họ và tên người tiêm: <strong>{patientItem?.patientName}</strong>
                    </span>
                  </Col>
                  <Col span={12}>
                    <span>
                      Mã số bệnh nhân: <strong>{patientItem?.patientCode}</strong>
                    </span>
                  </Col>
                </Row>
                <Row justify="space-between">
                  <Col span={8}>
                    <span>
                      Giới tính: <strong>{patientItem?.gender ? 'Nam' : 'Nữ'}</strong>
                    </span>
                  </Col>
                  <Col span={8}>
                    <span>
                      Ngày sinh:{' '}
                      <strong>
                        {patientItem?.birthday &&
                          moment(patientItem?.birthday).format('DD/MM/YYYY')}
                      </strong>
                    </span>
                  </Col>
                  <Col span={8}>
                    <span>
                      Số điện thoại: <strong>{patientItem?.phoneNumber}</strong>
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
                    <h3>LỊCH SỬ TIÊM</h3>
                  </Col>
                </Row>
                <br></br>
                <Row justify="space-evenly">
                  <Col span={8}>
                    <Search onSearch={onSearchVaccineCode} placeholder="Tìm theo mã vắc xin" />
                  </Col>
                  <Col span={8}>
                    <Search onSearch={onSearchVaccineName} placeholder="Tìm theo tên vắc xin" />
                  </Col>
                </Row>
                <Table
                  style={{ marginTop: 20 }}
                  rowKey={(record) => record.key}
                  dataSource={data.content}
                  columns={columns}
                  onChange={handleTableChange}
                  pagination={{
                    pageSize: 10,
                    current: currentPage + 1,
                    total: data.totalElements,
                    showTotal: (total, range) => {
                      return `${range[0]}-${range[1]} of ${total} items`;
                    }
                  }}
                />
                <Row>
                  <Col span={24}>
                    <Collapse
                      className="injection-history-list"
                      defaultActiveKey={['1']}
                      style={{ background: '#bfd2f8' }}>
                      {patientItem?.appointments?.map((item, index) => (
                        <Panel
                          header={`${index + 1}.   Ngày ${
                            item.desiredDate && moment(item.desiredDate).format('DD/MM/YYYY')
                          }`}
                          key={index}>
                          <InjectionHistoryItem appointment={item} />
                        </Panel>
                      ))}
                    </Collapse>
                  </Col>
                </Row>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffInjectionHistoryDetailPage;
