import { Popconfirm, Button } from 'antd';
import 'antd/dist/antd.css';
import React, { useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function useActionMenu({ selectedRow, updateEntityPath }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    const updatePath = '/' + updateEntityPath + '/' + selectedRow?.key;
    navigate(updatePath);
  };

  const handleSingleDelete = () => {
    console.log('handleSingleDelete, selected:', selectedRow.key);
  };

  const actionColumnView = (
    <>
      <Button type="primary" danger style={{ float: 'right' }}>
        <Popconfirm
          onClick={(e) => {
            e.stopPropagation();
          }}
          title="Sure to delete?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={handleSingleDelete}>
          Delete
        </Popconfirm>
      </Button>

      <Button
        type="primary"
        onClick={handleEdit}
        style={{ background: '#ffc107', border: '#ffc107' }}>
        Edit
      </Button>
    </>
  );

  return [actionColumnView];
}

export default useActionMenu;
