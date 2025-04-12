import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import TouristGuideButton from '../Home/TouristGuideButton';

function Navbar({handleTouristGuideClick}) {
  // State to track if mobile menu is open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Navigation Bar for desktop */}
      <nav className="navbar">
        <div className="logo">
          <h2>TourPhin</h2>
        </div>
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/destinations">Destinations</Link></li>
          <li><Link to="/aihelp">AI Help</Link></li>
          <li><Link to="/packages">Tour Packages</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/contact-us">Contact</Link></li>
        </ul>
        
        <div className="nav-right">
          <TouristGuideButton onClick={handleTouristGuideClick} />
          <div className="profile-icon">
            <Link to="/profile">
              <i className="fas fa-user-circle"></i>
            </Link>
          </div>
        </div>

        <div className="hamburger" onClick={toggleMobileMenu}>
          <i className="fas fa-bars"></i>
        </div>
      </nav>
      
      {/* Bottom Navigation for mobile - Removed */}
    </>
  )
}

export default Navbar;