import React from 'react';
import '../index.css';

const TouristGuideButton = ({ onClick }) => {
  return (
    <button className="tourist-guide-btn" onClick={onClick}>
      <i className="fas fa-user-plus"></i> Join as Tourist Guide
    </button>
  );
};

export default TouristGuideButton;