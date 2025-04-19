import React, { useState } from 'react';
import './TouristGuideForm.css';

const TouristGuideForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    experience: '',
    languages: '',
    specialization: '',
    about: '',
    agreeToTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your interest in becoming a tourist guide! We will contact you soon.');
    onClose();
  };

  return (
    <div className="tourist-guide-form-overlay">
      <div className="tourist-guide-form-container">
        <div className="form-header">
          <h2>Join as a Tourist Guide</h2>
          <button className="close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="experience">Years of Experience</label>
            <input
              type="number"
              id="experience"
              name="experience"
              min="0"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="languages">Languages Spoken</label>
            <input
              type="text"
              id="languages"
              name="languages"
              placeholder="e.g., English, Hindi, French"
              value={formData.languages}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="specialization">Specialization</label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              required
            >
              <option value="">Select your specialization</option>
              <option value="historical">Historical Sites</option>
              <option value="adventure">Adventure Tourism</option>
              <option value="cultural">Cultural Tourism</option>
              <option value="wildlife">Wildlife Tourism</option>
              <option value="food">Food Tourism</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="about">Tell us about yourself</label>
            <textarea
              id="about"
              name="about"
              rows="4"
              value={formData.about}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="the_checkbox">
            <input
              type="checkbox"
              id="agreeToTerms"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              required
            />
            <label htmlFor="agreeToTerms">I agree to the terms and conditions</label>
          </div>
          
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="submit-btn">Submit Application</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TouristGuideForm;