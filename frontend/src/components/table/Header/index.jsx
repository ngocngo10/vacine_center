import React from 'react';
import { Button, Col, Divider, Input, Popconfirm, Row } from 'antd';
import { DeleteOutlined, PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.css';

const { Search } = Input;

function Header({ addNewPath, hasSelected, selectedRowKeys, handleMultiDelete, handleSearch }) {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/' + addNewPath);
  };

  const handleOnConfirm = () => {
    handleMultiDelete(selectedRowKeys);
  };

  const handleOnSearch = (value) => {
    handleSearch(value);
  };

  return (
    <>
      <Row>
        <Col>
          <Search
            placeholder="Search"
            onSearch={handleOnSearch}
            allowClear
            style={{ float: 'left', width: 350 }}
          />
        </Col>
        <Col flex="auto">
          <Button
            icon={<PlusOutlined />}
            type="primary"
            style={{ float: 'right' }}
            onClick={handleAddNew}>
            Add New
          </Button>

          <Button
            icon={<DeleteOutlined />}
            danger
            disabled={!hasSelected}
            style={{ float: 'right', marginRight: 12 }}>
            <Popconfirm
              title="Sure to delete?"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={handleOnConfirm}>
              Delete
            </Popconfirm>
          </Button>
        </Col>
      </Row>
      <Divider />
    </>
  );
}

export default Header;
