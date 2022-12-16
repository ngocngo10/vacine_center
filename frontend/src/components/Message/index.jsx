import React from 'react';
import { Alert } from 'antd';
import './index.css';

const Message = ({ description, type = 'error' }) => {
  return (
    <Alert
      style={{
        position: 'fixed',
        zIndex: '100'
      }}
      className="message"
      description={description}
      type={type}
      showIcon
      closable
    />
  );
};

export default Message;
