import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import TinyMceEditor from '../../components/TinyMceEditor';
import './index.css';

const AdminDetailVaccine = () => {
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const hideModal = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="admin-detail-vaccine">
        <section className="section-admin-vaccine-base-inform">
          <div className="admin-vaccine-image">
            <img
              src="https://vnvc.vn/wp-content/uploads/2019/11/prevenar.jpg"
              alt="vaccine-image"
            />
          </div>
          <div className="admin-vaccine-base-inform">
            <h2 className="admin-vaccine-name">
              Vắc xin phế cầu PREVENAR 13 – Phòng các bệnh do phế cầu khuẩn
            </h2>
            <hr />
            <p className="admin-vaccine-des">
              Vắc xin Prevenar 13 phòng các bệnh phế cầu khuẩn xâm lấn gây nguy hiểm cho trẻ em và
              người lớn như viêm phổi, viêm màng não, nhiễm khuẩn huyết (nhiễm trùng máu), viêm tai
              giữa cấp tính,… do 13 chủng phế cầu khuẩn Streptococcus Pneumoniae gây ra (type 1, 3,
              4, 5, 6A, 6B, 7F, 9V, 14, 18C, 19A, 19F và 23F). Đặc biệt, vắc xin Prevenar 13 được
              chứng minh có khả năng tạo miễn dịch chéo không đặc hiệu với Covid-19.
            </p>
            <p className="admin-vaccine-price">{/* 3.890.000₫ <del>3.590.000₫ </del> */}</p>
            <p className="admin-vaccine-category">
              <strong>Loại vắc xin: </strong>Vắc xin phòng lao
            </p>
          </div>
        </section>
        <section className="section-admin-vaccine-detail-inform">
          <h3 className="admin-inform-heading">Thông tin chi tiết vaccine</h3>
          <button className="admin-add-inform-btn" onClick={showModal}>
            Thêm thông tin chi tiết
          </button>
          <ul className="admin-inform-list">
            {/* {vaccine.vaccineDetails.length &&
      vaccine.vaccineDetails.map((informItem, index) => (
        <VaccineInformItem
          id={index + 1}
          key={informItem.id}
          title={informItem.title}
          content={informItem.content}
        />
      ))} */}
          </ul>
        </section>
      </div>
      <Modal
        className="modal-vaccine-inform"
        title="Thêm thông tin chi tiết vắc xin"
        open={open}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Thêm"
        cancelText="Hủy"
        width={1000}
        height={'1vh'}>
        <Input placeholder="Tiêu đề thông tin vắc xin" className="vaccinee-subject-input" />
        <TinyMceEditor />
      </Modal>
    </>
  );
};

export default AdminDetailVaccine;
