import React, { useState, useRef, useEffect } from 'react';
import { Modal, Input, List, Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import TinyMceEditor from '../../components/TinyMceEditor';
import { createVaccineDetail, getVaccineDetails } from '../../actions/vaccine_detail.action';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import './index.css';

const AdminDetailVaccine = () => {
  const [open, setOpen] = useState(false);
  const [contentInform, setContentInform] = useState();
  const vaccineInformTitleInput = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const vaccineInformCreate = useSelector((state) => state.vaccineInformCreate);
  const { createSuccess } = vaccineInformCreate;

  const vaccineDetails = useSelector((state) => state.vaccineInformList);
  const { vaccineInforms, vaccine } = vaccineDetails;

  const { id } = useParams();

  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  const handleOk = () => {
    const vaccineInformTitle = vaccineInformTitleInput.current.input.value;
    const vaccineDetail = {
      title: vaccineInformTitle,
      content: contentInform,
      vaccineId: id
    };
    dispatch(createVaccineDetail(vaccineDetail));
    hideModal();
  };

  const handleEditVaccineInform = (informId) => {
    console.log('informId', informId);
  };

  const handleDeleteVaccineInform = (informId) => {
    console.log('informId', informId);
  };

  useEffect(() => {
    if (userInfo && userInfo.user.roles.includes('admin')) {
      dispatch(getVaccineDetails(id));
    } else {
      navigate('/login');
    }
  }, [userInfo, id, createSuccess]);

  return vaccineDetails.loading ? (
    <Loader />
  ) : vaccineDetails.error ? (
    <Message description={vaccineDetails.error} />
  ) : (
    <>
      <div className="admin-detail-vaccine">
        <section className="section-admin-vaccine-base-inform">
          <div className="admin-vaccine-image">
            <img src={vaccine?.image} />
          </div>
          <div className="admin-vaccine-base-inform">
            <h2 className="admin-vaccine-name">{vaccine?.name}</h2>
            <hr />
            <p className="admin-vaccine-des">{vaccine?.description}</p>
            <p className="admin-vaccine-origin">
              <span>Nguồn gốc: </span>
              {vaccine?.origin}
            </p>
            <p className="admin-vaccine-price">{vaccine?.price}</p>
            <p className="admin-vaccine-category">
              <span>Loại vắc xin: </span>
              {vaccine?.category}
            </p>
          </div>
        </section>
        <section className="section-admin-vaccine-detail-inform">
          <h3 className="admin-inform-heading">Thông tin chi tiết vaccine</h3>
          <button className="admin-add-inform-btn" onClick={showModal}>
            Thêm thông tin chi tiết
          </button>
          <List
            className="admin-inform-list"
            bordered="true"
            itemLayout="horizontal"
            size="large"
            dataSource={vaccineInforms}
            renderItem={(item, index) => (
              <List.Item
                key={item.id}
                className="admin-inform-item"
                actions={[
                  <>
                    <Button
                      type="primary"
                      danger
                      style={{ float: 'right', marginLeft: '10px' }}
                      // onClick={showModal}
                    >
                      <Popconfirm
                        title="Sure to delete?"
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                        onConfirm={() => handleDeleteVaccineInform(item.id)}>
                        <DeleteOutlined />
                      </Popconfirm>
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => handleEditVaccineInform(item.id)}
                      style={{ background: '#ffc107', border: '#ffc107' }}>
                      <EditOutlined />
                    </Button>
                  </>
                ]}>
                <List.Item.Meta
                  title={<Link to={'/vaccine-detail/' + id}>{`${index + 1}. ${item.title}`}</Link>}
                />
              </List.Item>
            )}
          />
        </section>
      </div>
      <Modal
        className="modal-vaccine-inform"
        title="Thêm thông tin chi tiết vắc xin"
        open={open}
        onOk={handleOk}
        onCancel={hideModal}
        okText="Thêm"
        cancelText="Hủy"
        width={1000}>
        <Input
          ref={vaccineInformTitleInput}
          placeholder="Tiêu đề thông tin vắc xin"
          className="vaccinee-subject-input"
        />
        <TinyMceEditor contentInform={contentInform} setContentInform={setContentInform} />
      </Modal>
    </>
  );
};

export default AdminDetailVaccine;
