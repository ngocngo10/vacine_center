import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Button, Row, Col, Input, Modal, Card, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getSignedRequest } from '../../actions/upload.action';
import { getVaccineListWarehouse, createVaccineWarehouse } from '../../actions/warehouse.action';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import moment from 'moment';
import './index.css';

const { Search } = Input;

const AdminWarehousePage = () => {
  const DEFAULT_PAGE_NUMBER = 0;
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE_NUMBER);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const upload = useSelector((state) => state.upload);
  const { imageUrl } = upload;

  const vaccineWareHouseCreate = useSelector((state) => state.vaccineWareHouseCreate);
  const { createSuccess } = vaccineWareHouseCreate;

  const vaccineListWareHouse = useSelector((state) => state.vaccineListWareHouse);
  const { loading, error, vaccineItemList, totalItem } = vaccineListWareHouse;

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeUpload = (file) => {
    dispatch(getSignedRequest(file.file));
  };

  const handleTableChange = (pagination) => {
    dispatch(getVaccineListWarehouse({ perPage: 10, page: pagination.current }));
    setCurrentPage(pagination.current - 1);
  };

  const handleOnSearchCode = (value) => {
    dispatch(getVaccineListWarehouse({ perPage: 10, vaccineCode: value }));
  };

  const handleOnSearchName = (value) => {
    dispatch(getVaccineListWarehouse({ perPage: 10, vaccineName: value }));
  };

  useEffect(() => {
    if (imageUrl) {
      const arr = imageUrl.split('/vaccines/');
      dispatch(createVaccineWarehouse(arr[1]));
    }
  }, [imageUrl]);

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('admin')) {
      dispatch(getVaccineListWarehouse({ perPage: 10 }));
    } else {
      navigate('/login');
    }
  }, [userInfo, createSuccess]);

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
      dataIndex: 'vaccineName',
      key: 'vaccineName',
      align: 'center'
    },

    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center'
    },
    {
      title: 'Giá/1 sản phẩm',
      dataIndex: 'price',
      key: 'price',
      align: 'center'
    },
    {
      title: 'Ngày sản xuất',
      dataIndex: 'manufactureDate',
      key: 'manufactureDate',
      align: 'center'
    },
    {
      title: 'Hạn sử dụng',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      align: 'center'
    },
    {
      title: 'Ngày nhập',
      dataIndex: 'importDate',
      key: 'importDate',
      align: 'center'
    }
  ];
  const data = {};
  data.totalElements = totalItem;
  data.content = vaccineItemList?.map((item, index) => ({
    key: item.id,
    index: currentPage * 10 + index + 1,
    vaccineCode: item.vaccine.vaccineCode,
    vaccineName: item.vaccine.name,
    quantity: item.quantity,
    price: item.price,
    manufactureDate: item.manufactureDate && moment(item.manufactureDate).format('DD/MM/YYYY'),
    expirationDate: item.expirationDate && moment(item.expirationDate).format('DD/MM/YYYY'),
    importDate: item.importDate && moment(item.importDate).format('DD/MM/YYYY')
  }));

  return (
    <div>
      <Card style={{ borderRadius: 10 }}>
        <h2 className="page-title">Quản lí kho vắc xin</h2>
        <Row justify="space-between">
          <Col span={8}>
            <Search onSearch={handleOnSearchCode} placeholder="Tìm theo mã vắc xin" />
          </Col>
          <Col span={8}>
            <Search onSearch={handleOnSearchName} placeholder="Tìm theo tên vắc xin" />
          </Col>
          <Col>
            <Upload
              accept=".xls, .xlsx"
              showUploadList={false}
              onChange={(file) => onChangeUpload(file)}
              beforeUpload={(file) => {
                const reader = new FileReader();

                reader.onload = (e) => {};
                reader.readAsText(file);

                // Prevent upload
                return false;
              }}>
              <Button type="primary" icon={<UploadOutlined />}>
                Nhập kho vắc xin
              </Button>
            </Upload>
          </Col>
        </Row>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message description={error} />
        ) : (
          <Table
            style={{ marginTop: 20 }}
            rowKey={(record) => record.key}
            onRow={(record) => {
              return {
                onClick: () => {
                  const id = record.key;
                  const vaccineItem = vaccineItemList.find((item) => (item.id = id));
                  setSelectedRow(vaccineItem);
                  showModal();
                }
              };
            }}
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
        )}
        {vaccineWareHouseCreate?.error && <Message description={vaccineWareHouseCreate.error} />}
      </Card>

      <Modal width={900} open={isModalOpen} onCancel={handleCancel} footer={null}>
        <Card className="warehouse-card">
          <h2 className="page-title">Thông tin chi tiết đơn hàng nhập kho vắc xin</h2>
          <Row justify="space-around">
            <Col span={24}>
              <Row>
                <Col>
                  <span>
                    Mã vắc xin: <strong>{selectedRow?.vaccine.vaccineCode}</strong>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>
                    Tên vắc xin: <strong>{selectedRow?.vaccine.name}</strong>
                  </span>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={8}>
                  <span>
                    Số lượng: <strong>{selectedRow?.quantity}</strong>
                  </span>
                </Col>
                <Col span={8}>
                  <span>
                    Giá / 1 sản phẩm: <strong>{selectedRow?.price}</strong>
                  </span>
                </Col>
                <Col span={8}>
                  <span>
                    Ngày nhập:{' '}
                    <strong>
                      {selectedRow?.importDate &&
                        moment(selectedRow?.importDate).format('DD/MM/YYYY')}
                    </strong>
                  </span>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={8}>
                  <span>
                    Ngày sản xuất:{' '}
                    <strong>
                      {selectedRow?.manufactureDate &&
                        moment(selectedRow?.manufactureDate).format('DD/MM/YYYY')}
                    </strong>
                  </span>
                </Col>
                <Col span={8}>
                  <span>
                    Lô sản xuất: <strong>{selectedRow?.productionBatch}</strong>
                  </span>
                </Col>
                <Col span={8}>
                  <span>
                    Hạn sử dụng:{' '}
                    <strong>
                      {selectedRow?.expirationDate &&
                        moment(selectedRow?.expirationDate).format('DD/MM/YYYY')}
                    </strong>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>
                    Nhà cung cấp: <strong>{selectedRow?.supplier}</strong>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col span={12}>
                  <span>
                    Số điện thoại nhà cung cấp: <strong>{selectedRow?.supplierPhoneNumber}</strong>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>
                    Tổng tiền đơn hàng:
                    <strong>{+selectedRow?.price * +selectedRow?.quantity}</strong>
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Modal>
    </div>
  );
};

export default AdminWarehousePage;
