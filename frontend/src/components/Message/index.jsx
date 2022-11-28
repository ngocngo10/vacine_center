import { Alert, message } from 'antd';
import React from 'react';
import './index.css';

const Message = ({ description, type = 'error' }) => {
  return (
    <Alert
      className="message"
      // message={message}
      description={description}
      type={type}
      showIcon
      closable
    />
  );
};

export default Message;
