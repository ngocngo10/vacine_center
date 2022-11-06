import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './index.css';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 30
    }}
    spin
  />
);

const Loader = () => {
  return <Spin indicator={antIcon} />;
};

export default Loader;
