import React, { useState } from 'react'
import './navbar.css'
import {Link} from 'react-router-dom'
import TouristGuideButton from '../Home/TouristGuideButton';

function Navbar({handleTouristGuideClick}) {
  // State to track if mobile menu is open
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Toggle mobile menu function
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
            // Navigation Bar 
            <nav className="navbar">
            <div className="logo">
              <h2>TourPhin</h2>
            </div>
            <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/destinations">Destinations</Link></li>
              <li><Link to="/aihelp">AI Help</Link></li>
              <li><Link to="/packages">Tour Packages</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
            <TouristGuideButton onClick={handleTouristGuideClick} />
  
            <div className="hamburger" onClick={toggleMobileMenu}>
              <i className="fas fa-bars"></i>
            </div>
          </nav>
  )
}

export default Navbar