import React, { useEffect } from 'react';
import { Row, Col, Card, Collapse, Skeleton } from 'antd';
import InjectionHistoryItem from '../../components/InjectionHistoryItem';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPatient } from '../../actions/patient.action';
import { getProvinceList } from '../../actions/province.action';
import moment from 'moment';
import './index.css';
import Message from '../../components/Message';

const { Panel } = Collapse;

const StaffInjectionHistoryDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const patient = useSelector((state) => state.patient);
  const { patientItem, error, loading } = patient;

  const provinceList = useSelector((state) => state.provinceList);
  const { provinces } = provinceList;
  const province = provinces?.find((item) => item.code == +patientItem?.province);
  const district = province?.districts?.find((item) => item.code == +patientItem?.district);
  const ward = district?.wards?.find((item) => item.code == patientItem?.ward);
  const address = `${patientItem?.street}, ${province?.name}, ${district?.name},  ${ward?.name}`;

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('staff')) {
      dispatch(getProvinceList());
      dispatch(getPatient(id));
    } else {
      navigate('/login');
    }
  }, [userInfo, id]);
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
