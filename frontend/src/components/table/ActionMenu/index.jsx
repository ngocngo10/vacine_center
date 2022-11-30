import { Button, Modal } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function useActionMenu({ selectedRow, updateEntityPath, handleDelete }) {
  const [open, setOpen] = useState(false);
  const [actionEdit, setActionEdit] = useState(false);
  const navigate = useNavigate();

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setActionEdit(true);
  };

  const updatePath = '/' + updateEntityPath + '/' + selectedRow?.key;
  if (actionEdit) navigate(updatePath);

  const handleDeleteSingle = () => {
    hideModal();
    handleDelete(selectedRow.key);
  };

  const actionColumnView = (
    <>
      <span>
        <Button type="primary" danger style={{ margin: '10px' }} onClick={showModal}>
          <DeleteOutlined />
        </Button>
        <Button
          type="primary"
          onClick={handleEdit}
          style={{ background: '#ffc107', border: '#ffc107' }}>
          <EditOutlined />
        </Button>
        <Modal
          mask={false}
          title="Delete Vaccine"
          open={open}
          onOk={handleDeleteSingle}
          onCancel={hideModal}
          okText="Delete"
          cancelText="Cancel">
          <p>Are you sure you want to delete this vaccine?</p>
        </Modal>
      </span>
    </>
  );

  return { actionColumnView: [actionColumnView] };
}

export default useActionMenu;
