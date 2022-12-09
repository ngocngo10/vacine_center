import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const VaccineItem = ({ vaccine }) => {
  const vaccinePath = `/vaccine-detail/${vaccine.id}`;

  return (
    <li className="vaccine-item">
      <Link to={vaccinePath}>
        <div className="vaccine-item__image">
          <img src={vaccine.image} alt="Vaccine Image" />
        </div>
        <div className="vaccine-item__info">
          <h4 className="vaccine-item__name text">{vaccine.name}</h4>
          <p className="vaccine-item__desc text">{vaccine.description}</p>
        </div>
      </Link>
    </li>
  );
};
export default VaccineItem;
