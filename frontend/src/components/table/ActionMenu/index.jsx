import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css';

function useActionMenu({ selectedRow, updateEntityPath, handleDelete }) {
  const [open, setOpen] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const navigate = useNavigate();

  const handleEdit = () => {
    const updatePath = '/' + updateEntityPath + '/' + selectedRow?.key;
    navigate(updatePath);
  };

  const handleDeleteSingle = () => {
    hideModal();
    handleDelete(selectedRow.key);
  };

  const actionColumnView = (
    <>
      <span>
        <Button type="primary" danger style={{ float: 'right' }} onClick={showModal}>
          Delete
        </Button>
        <Button
          type="primary"
          onClick={handleEdit}
          style={{ background: '#ffc107', border: '#ffc107' }}>
          Edit
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
