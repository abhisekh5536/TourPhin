import React, { useState, useEffect } from 'react';
import './TouristGuideButton.css';

const TouristGuideButton = ({ onClick }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <button className="tourist-guide-btn" onClick={onClick}>
      <i className="fas fa-user-plus"></i> {isMobile ? 'Join as Guide' : 'Join as Tourist Guide'}
    </button>
  );
};

export default TouristGuideButton;