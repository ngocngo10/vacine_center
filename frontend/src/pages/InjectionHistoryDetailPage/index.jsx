import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, Row, Col, Skeleton, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getPatient } from '../../actions/patient.action';
import moment from 'moment';
import Container from '../../layout/Container';
import Message from '../../components/Message';
import './index.css';

const { Search } = Input;
const InjectionHistoryDetailPage = () => {
  const DEFAULT_PAGE_NUMBER = 0;
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  console.log('injections2', injections);

  const handleTableChange = (pagination) => {
    // dispatch(getPatientList({ perPage: 10, page: pagination.current }));
    setCurrentPage(pagination.current - 1);
  };

  const onSearchPatientCode = (value) => {
    console.log('value', value);
    // dispatch(
    //   getPatientList({
    //     perPage: 10,
    //     patientCode: value
    //   })
    // );
  };

  const onSearchPatientName = (value) => {
    console.log('value', value);
    // dispatch(
    //   getPatientList({
    //     perPage: 10,
    //     patientName: value
    //   })
    // );
  };

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('user')) {
      dispatch(getPatient(id));
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
  data.totalElements = injections.length;
  data.content = injections?.map((item, index) => ({
    key: item.id,
    index: currentPage * 10 + index + 1,
    vaccineCode: item.vaccine.vaccineCode,
    name: item.vaccine.name,
    price: item.price,
    injectionTime: item.injectionTime,
    day: moment(item.desiredDate).format('DD/MM/YYYY')
  }));

  return (
    <div className="injection-history-page">
      <Container>
        <h2 className="page-title">Lịch sử tiêm chủng chi tiết</h2>
        <Row>
          <Col>
            <h3>THÔNG TIN BỆNH NHÂN</h3>
          </Col>
        </Row>
        {loading ? (
          <Skeleton />
        ) : error ? (
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
                    {patientItem?.birthday && moment(patientItem?.birthday).format('DD/MM/YYYY')}
                  </strong>
                </span>
              </Col>
              <Col span={8}>
                <span>
                  Số điện thoại: <strong>{patientItem?.phoneNumber}</strong>
                </span>
              </Col>
            </Row>
            <br></br>
            <Row justify="space-evenly">
              <Col span={8}>
                <Search onSearch={onSearchPatientCode} placeholder="Tìm theo mã vắc xin" />
              </Col>
              <Col span={8}>
                <Search onSearch={onSearchPatientName} placeholder="Tìm theo tên vắc xin" />
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
          </>
        )}
        <br></br>
        <Row justify="center">
          <Col>
            <Button
              onClick={() => navigate('/injection-history')}
              style={{ background: '#1677ff', border: '#1677ff', color: '#fff' }}>
              Trở về
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InjectionHistoryDetailPage;
