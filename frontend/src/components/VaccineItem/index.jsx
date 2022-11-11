import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';

const VaccineItem = ({ vaccine }) => {
  return (
    <li className="vaccine-item">
      <Link to="/vaccine-detail">
        <div className="vaccine-item__image">
          <img src={vaccine.image} alt="Vaccine Image" />
        </div>
        <div className="vaccine-item__info">
          <h4 className="vaccine-name text">{vaccine.name}</h4>
          <p className="vaccine-desc text">{vaccine.description}</p>
        </div>
      </Link>
    </li>
  );
};

export default VaccineItem;
