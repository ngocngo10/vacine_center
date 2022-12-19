import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Input, Row, Col } from 'antd';
import { useNavigate, Link } from 'react-router-dom';
import { getPatientList } from '../../actions/patient.action';
import moment from 'moment';
import Container from '../../layout/Container';
import './index.css';

const { Search } = Input;

const InjectionHistoryPage = () => {
  const DEFAULT_PAGE_NUMBER = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patientList = useSelector((state) => state.patientList);
  const { loading, error, patients, totalItem } = patientList;

  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);

  const handleTableChange = (pagination) => {
    dispatch(getPatientList({ perPage: 10, page: pagination.current }));
    setCurrentPage(pagination.current - 1);
  };

  const onSearchPatientCode = (value) => {
    dispatch(
      getPatientList({
        perPage: 10,
        patientCode: value
      })
    );
  };

  const onSearchPatientName = (value) => {
    dispatch(
      getPatientList({
        perPage: 10,
        patientName: value
      })
    );
  };

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('user')) {
      dispatch(getPatientList({ perPage: 10 }));
    } else {
      navigate('/login');
    }
  }, [userInfo]);
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'key',
      align: 'center'
    },
    {
      title: 'Mã định danh',
      dataIndex: 'code',
      key: 'code',
      align: 'center'
    },
    {
      title: 'Tên bệnh nhân',
      dataIndex: 'patientName',
      key: 'patientName',
      align: 'center'
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      align: 'center'
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center'
    },
    {
      title: 'Xem chi tiết',
      dataIndex: 'action',
      align: 'center',
      key: 'action',
      render: (value) => <Link to={value}>Xem chi tiết</Link>
    }
  ];
  const data = {};
  data.totalElements = totalItem;
  data.content = patients?.map((item, index) => ({
    key: item.id,
    index: currentPage * 10 + index + 1,
    code: item.patientCode,
    phoneNumber: item.phoneNumber,
    patientName: item.patientName,
    birthday: moment(item.birthday).format('DD/MM/YYYY'),
    action: `details/${item.id}`
  }));

  return (
    <div className="injection-history-page">
      <Container>
        <h2 className="page-title">Lịch sử tiêm chủng của người thân</h2>
        <Row justify="space-evenly">
          <Col span={8}>
            <Search onSearch={onSearchPatientCode} placeholder="Tìm theo mã định danh" />
          </Col>
          <Col span={8}>
            <Search onSearch={onSearchPatientName} placeholder="Tìm theo tên bệnh nhân" />
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
      </Container>
    </div>
  );
};

export default InjectionHistoryPage;
