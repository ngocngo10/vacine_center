import React, { useState } from 'react';
import './index.css';

const FormGroup = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, type, name, placeholder, message, refer, pattern, defaultValue } = props;
  const handleFocus = () => {
    setFocused(true);
  };

  return (
    <div className="form-group">
      <label className="form-label" htmlFor={name}>
        {label}
      </label>
      <input
        className="form-control"
        type={type}
        id={name}
        placeholder={placeholder}
        ref={refer}
        onBlur={handleFocus}
        onFocus={() => name === 'confirmPassword' && setFocused(true)}
        data-focused={focused.toString()}
        pattern={pattern}
        defaultValue={defaultValue}
      />
      <span className="form-error-message">{message}</span>
    </div>
  );
};

FormGroup.defaultProps = {
  pattern: '.*',
  defaultValue: ''
};

export default FormGroup;
