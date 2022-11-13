import React from 'react';
import parse from 'html-react-parser';
import './index.css';

const VaccineInformItem = (props) => {
  const { title, content } = props;
  // const HTMLParser = require('node-html-parser');
  const ContentElement = parse(content);
  console.log(ContentElement);

  return (
    <li className="inform-item">
      <h4>{title}</h4>
      {ContentElement}
    </li>
  );
};

export default VaccineInformItem;
