import React, { useState } from 'react';
import './PackageDetails.css';

const PackageDetails = ({ package: tourPackage, onClose }) => {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    travelDate: '',
    numberOfTravelers: 1,
    specialRequirements: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    console.log('Booking form submitted:', formData);
    setShowBookingForm(false);
    // Add your form submission logic here
  };

  return (
    <div className="package-details-overlay">
      <div className="package-details-content">
        <button className="close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>

        {/* Hero Section */}
        <div className="package-details-hero" style={{ backgroundImage: `url(${tourPackage.image})` }}>
          <div className="hero-content">
            <h1>{tourPackage.name}</h1>
            <div className="package-type-badge">{tourPackage.type}</div>
          </div>
        </div>

        <div className="package-details-body">
          {/* Quick Info */}
          <div className="quick-info">
            <div className="info-item">
              <i className="fas fa-clock"></i>
              <span>{tourPackage.duration}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-calendar-alt"></i>
              <span>Best Time: {tourPackage.bestSeason}</span>
            </div>
            <div className="info-item">
              <i className="fas fa-rupee-sign"></i>
              <span>{tourPackage.price}</span>
            </div>
          </div>

          {/* Destinations */}
          <section className="destinations-section">
            <h2>Destinations</h2>
            <div className="destinations-list">
              {tourPackage.destinations.map((destination, index) => (
                <div key={index} className="destination-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{destination}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Tabs Navigation */}
          <div className="package-tabs">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'accommodation' ? 'active' : ''}`}
              onClick={() => setActiveTab('accommodation')}
            >
              Accommodation
            </button>
            <button
              className={`tab-btn ${activeTab === 'costs' ? 'active' : ''}`}
              onClick={() => setActiveTab('costs')}
            >
              Cost Breakdown
            </button>
            <button
              className={`tab-btn ${activeTab === 'inclusions' ? 'active' : ''}`}
              onClick={() => setActiveTab('inclusions')}
            >
              Inclusions/Exclusions
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="overview-tab">
                <section className="highlights-section">
                  <h2>Tour Highlights</h2>
                  <div className="highlights-list">
                    {tourPackage.highlights.map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        <i className="fas fa-check-circle"></i>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Accommodation Tab */}
            {activeTab === 'accommodation' && (
              <div className="accommodation-tab">
                <h2>Accommodation Details</h2>
                <div className="accommodation-list">
                  {tourPackage.destinations.map((destination, index) => (
                    <div key={index} className="accommodation-item">
                      <h3>{destination}</h3>
                      <div className="hotel-details">
                        <div className="hotel-info">
                          <i className="fas fa-hotel"></i>
                          <span>Luxury Hotel/Resort</span>
                        </div>
                        <div className="room-info">
                          <i className="fas fa-bed"></i>
                          <span>Deluxe Room with City/Nature View</span>
                        </div>
                        <div className="amenities">
                          <i className="fas fa-concierge-bell"></i>
                          <span>24/7 Room Service, Wi-Fi, Pool Access</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cost Breakdown Tab */}
            {activeTab === 'costs' && (
              <div className="costs-tab">
                <h2>Cost Breakdown</h2>
                <div className="cost-table">
                  <div className="cost-item">
                    <span>Base Package Cost</span>
                    <span>₹45,000</span>
                  </div>
                  <div className="cost-item">
                    <span>Accommodation (Luxury Hotels)</span>
                    <span>₹15,000</span>
                  </div>
                  <div className="cost-item">
                    <span>Transportation</span>
                    <span>₹8,000</span>
                  </div>
                  <div className="cost-item">
                    <span>Activities & Entry Fees</span>
                    <span>₹5,000</span>
                  </div>
                  <div className="cost-item">
                    <span>Taxes & Service Charges (18%)</span>
                    <span>₹13,140</span>
                  </div>
                  <div className="cost-item total">
                    <span>Total Cost</span>
                    <span>₹86,140</span>
                  </div>
                </div>
                <div className="cost-notes">
                  <p>* Prices are per person based on double occupancy</p>
                  <p>* Additional charges may apply for peak season</p>
                </div>
              </div>
            )}

            {/* Inclusions/Exclusions Tab */}
            {activeTab === 'inclusions' && (
              <div className="inclusions-tab">
                <div className="inclusions-section">
                  <h2>What's Included</h2>
                  <ul className="inclusion-list">
                    <li><i className="fas fa-check"></i> Luxury accommodation with breakfast</li>
                    <li><i className="fas fa-check"></i> Private air-conditioned vehicle</li>
                    <li><i className="fas fa-check"></i> Professional English-speaking guide</li>
                    <li><i className="fas fa-check"></i> All sightseeing & entry fees</li>
                    <li><i className="fas fa-check"></i> Welcome dinner & farewell dinner</li>
                    <li><i className="fas fa-check"></i> 24/7 on-tour assistance</li>
                    <li><i className="fas fa-check"></i> All applicable taxes</li>
                  </ul>
                </div>
                <div className="exclusions-section">
                  <h2>What's Not Included</h2>
                  <ul className="exclusion-list">
                    <li><i className="fas fa-times"></i> International/domestic flights</li>
                    <li><i className="fas fa-times"></i> Travel insurance</li>
                    <li><i className="fas fa-times"></i> Personal expenses</li>
                    <li><i className="fas fa-times"></i> Optional activities</li>
                    <li><i className="fas fa-times"></i> Camera/video fees at monuments</li>
                    <li><i className="fas fa-times"></i> Tips and gratuities</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Book Now Button */}
          <div className="booking-section">
            <button className="book-now-btn" onClick={() => setShowBookingForm(true)}>
              Book Now
            </button>
          </div>
        </div>

        {/* Booking Form Modal */}
        {showBookingForm && (
          <div className="booking-form-modal">
            <div className="booking-form-content">
              <button className="close-form-btn" onClick={() => setShowBookingForm(false)}>
                <i className="fas fa-times"></i>
              </button>
              <h2>Book Your Tour</h2>
              <h3>{tourPackage.name}</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="travelDate">Preferred Travel Date</label>
                  <input
                    type="date"
                    id="travelDate"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="numberOfTravelers">Number of Travelers</label>
                  <input
                    type="number"
                    id="numberOfTravelers"
                    name="numberOfTravelers"
                    min="1"
                    value={formData.numberOfTravelers}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="specialRequirements">Special Requirements</label>
                  <textarea
                    id="specialRequirements"
                    name="specialRequirements"
                    value={formData.specialRequirements}
                    onChange={handleInputChange}
                    rows="4"
                  ></textarea>
                </div>
                <button type="submit" className="submit-booking-btn">
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PackageDetails;