import React from 'react';
import { Popconfirm, Button } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

function useActionMenu({ selectedRow, updateEntityPath }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    const updatePath = '/' + updateEntityPath + '/' + selectedRow.id;
    navigate(updatePath);
  };

  const handleSingleDelete = () => {
    console.log('handleSingleDelete, selected:', selectedRow);
  };

  const actionColumnView = (
    <>
      <Button type="primary" danger style={{ float: 'right' }}>
        <Popconfirm
          title="Sure to delete?"
          placement="left"
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
