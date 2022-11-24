import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './index.css';

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 50
    }}
    spin
  />
);

const Loader = () => {
  return <Spin className="loader" indicator={antIcon} />;
};

export default Loader;
