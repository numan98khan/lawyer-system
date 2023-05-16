import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import './Title.css';

const Title = ({ name, title, subHeading, extraSpace, leftSpace }) => {
  return (
    <div
      className={`title-container${extraSpace ? ' extra-space' : ''}${leftSpace ? ' left-space' : ''}`}
    >
      <h1 className={`title-text${subHeading ? ' sub-heading' : ''}`}>
        <span className="title-name">{name}</span>
        <span className="title-highlight">{title}</span>
      </h1>
      {/* <Link to="/AddProduct" className="title-add-product">
        <Icon className="fa fa-plus-circle" style={{ fontSize: 40 }} />
      </Link> */}
    </div>
  );
};

export default Title;
