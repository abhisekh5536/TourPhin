import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column">
            <h3>TourPhin</h3>
            <p>Your trusted partner for unforgettable travel experiences across India. Discover the beauty and diversity of incredible destinations with our expertly crafted tour packages.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Destinations</a></li>
              <li><a href="#">Packages</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Popular Destinations</h4>
            <ul>
              <li><a href="#">Agra</a></li>
              <li><a href="#">Delhi</a></li>
              <li><a href="#">Goa</a></li>
              <li><a href="#">Ladakh</a></li>
              <li><a href="#">Andaman</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>Contact Us</h4>
            <p><i className="fas fa-map-marker-alt"></i> All India</p>
            <p><i className="fas fa-phone-alt"></i> +91 1234567890</p>
            <p><i className="fas fa-envelope"></i> info@tourphin.com</p>
            <div className="newsletter">
              <h5>Subscribe to our Newsletter</h5>
              <div className="newsletter-form">
                <input type="email" placeholder="Your Email" />
                <button type="submit"><i className="fas fa-paper-plane"></i></button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} TourPhin. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;