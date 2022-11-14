import React from 'react';
import parse from 'html-react-parser';
import './index.css';

const VaccineInformItem = (props) => {
  const { title, content, id } = props;
  const ContentElement = parse(content);
  console.log(ContentElement);

  return (
    <>
      <li id={`inform-${id}`} className="inform-item">
        <h4 className="inform-title">{`${id}. ${title}`}</h4>
        {ContentElement}
      </li>
    </>
  );
};

export default VaccineInformItem;
