import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PackageDetails.css';
// Change the incorrect import
// FROM: import { destinations } from './Destinations';
// TO: import { destinations } from '../Destinations/Destinations';

import { destinations } from '../Destinations/Destinations';

const PackageDetails = ({ package: propPackage, onClose: propOnClose }) => {

useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(propPackage);
  const [isModal, setIsModal] = useState(!!propPackage);
  
  useEffect(() => {
    // If package is passed as prop, use it (modal mode)
    if (propPackage) {
      setPkg(propPackage);
      setIsModal(true);
      return;
    }
    
    // Otherwise, try to find the package by ID from the URL
    if (id) {
      // Check if it's a destination (format: dest_1, dest_2, etc.)
      if (id.startsWith('dest_')) {
        const destId = parseInt(id.split('_')[1]);
        const destination = destinations.find(d => d.id === destId);
        
        if (destination) {
          // Convert destination to package format
          const packageData = {
            id: `dest_${destination.id}`,
            name: destination.name,
            duration: 'Flexible',
            price: `From ₹${destination.avgPrice} per person`,
            destinations: [destination.region],
            highlights: destination.description.split('. ').filter(item => item.length > 0),
            bestSeason: destination.bestSeason,
            type: destination.interests.join(' & '),
            image: destination.image,
            isDestination: true,
            originalData: destination
          };
          setPkg(packageData);
          setIsModal(false);
        } else {
          // Destination not found, redirect to packages page
          navigate('/packages');
        }
      } else {
        // Handle regular package IDs here
        // For now, redirect to packages page since we don't have a packages array
        navigate('/packages');
      }
    } else if (!propPackage) {
      // No ID and no prop package, redirect to packages page
      navigate('/packages');
    }
  }, [id, propPackage, navigate]);
  
  const handleClose = () => {
    if (isModal && propOnClose) {
      propOnClose();
    } else {
      // If not in modal mode, navigate back to packages page
      navigate('/packages');
    }
  };
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
        {isModal && (
          <button className="close-btn" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>
        )}

        {/* Hero Section */}
        {pkg && (
          <div className="package-details-hero" style={{ backgroundImage: pkg.image ? `url(${pkg.image})` : 'none' }}>
            <div className="hero-content">
              <h1>{pkg?.name || 'Package Details'}</h1>
              <div className="package-type-badge">{pkg?.type || 'Tour Package'}</div>
            </div>
          </div>
        )}

        <div className="package-details-body">
          {/* Quick Info */}
          {pkg && (
            <div className="quick-info">
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <span>{pkg.duration || 'Flexible'}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-calendar-alt"></i>
                <span>Best Time: {pkg.bestSeason || 'Year-round'}</span>
              </div>
              <div className="info-item">
                <i className="fas fa-rupee-sign"></i>
                <span>{pkg.price || 'Contact for pricing'}</span>
              </div>
            </div>
          )}

          {/* Destinations */}
          {pkg && pkg.destinations && (
            <section className="destinations-section">
              <h2>Destinations</h2>
              <div className="destinations-list">
                {pkg.destinations.map((destination, index) => (
                  <div key={index} className="destination-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>{destination}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tabs Navigation */}
          <div className="package-tabs">
            <button
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`tab-btn ${activeTab === 'itinerary' ? 'active' : ''}`}
              onClick={() => setActiveTab('itinerary')}
            >
              Itinerary
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
            <button
              className={`tab-btn ${activeTab === 'gallery' ? 'active' : ''}`}
              onClick={() => setActiveTab('gallery')}
            >
              Gallery
            </button>
            <button
              className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
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
                    {pkg && pkg.highlights ? pkg.highlights.map((highlight, index) => (
                      <div key={index} className="highlight-item">
                        <i className="fas fa-check-circle"></i>
                        <span>{highlight}</span>
                      </div>
                    )) : (
                      <div className="highlight-item">
                        <i className="fas fa-info-circle"></i>
                        <span>Highlights information not available</span>
                      </div>
                    )}
                  </div>
                </section>
                
                <section className="overview-description">
                  <h2>About This Tour</h2>
                  <p>
                    Experience the magic of {pkg?.name || 'this destination'} with our carefully crafted tour package. 
                    Immerse yourself in the local culture, savor authentic cuisine, and create memories that will last a lifetime.
                  </p>
                  <p>
                    Our expert guides will take you through hidden gems and iconic landmarks, ensuring you get the most authentic experience possible.
                  </p>
                </section>
                
                <section className="key-attractions">
                  <h2>Key Attractions</h2>
                  <div className="attractions-grid">
                    <div className="attraction-card">
                      <div className="attraction-icon"><i className="fas fa-landmark"></i></div>
                      <h3>Historical Sites</h3>
                      <p>Explore ancient monuments and historical landmarks that tell the story of this region's rich past.</p>
                    </div>
                    <div className="attraction-card">
                      <div className="attraction-icon"><i className="fas fa-utensils"></i></div>
                      <h3>Culinary Experiences</h3>
                      <p>Taste authentic local cuisine and participate in cooking demonstrations with local chefs.</p>
                    </div>
                    <div className="attraction-card">
                      <div className="attraction-icon"><i className="fas fa-mountain"></i></div>
                      <h3>Natural Wonders</h3>
                      <p>Witness breathtaking landscapes, from majestic mountains to serene lakes and lush forests.</p>
                    </div>
                    <div className="attraction-card">
                      <div className="attraction-icon"><i className="fas fa-theater-masks"></i></div>
                      <h3>Cultural Immersion</h3>
                      <p>Participate in local festivals, traditional ceremonies, and artistic performances.</p>
                    </div>
                  </div>
                </section>
              </div>
            )}
            
            {/* Itinerary Tab */}
            {activeTab === 'itinerary' && (
              <div className="itinerary-tab">
                <div className="itinerary-overview">
                  <h2>Tour Itinerary</h2>
                  <p>Our carefully crafted itinerary ensures you experience the best of {pkg?.name || 'this destination'} while maintaining a comfortable pace. Each day is designed to offer a perfect balance of guided exploration and personal discovery.</p>
                  
                  <div className="itinerary-highlights">
                    <div className="highlight-box">
                      <i className="fas fa-map-marked-alt"></i>
                      <h4>Expertly Planned</h4>
                      <p>Routes optimized for the best experience</p>
                    </div>
                    <div className="highlight-box">
                      <i className="fas fa-clock"></i>
                      <h4>Balanced Pace</h4>
                      <p>Time for both activities and relaxation</p>
                    </div>
                    <div className="highlight-box">
                      <i className="fas fa-star"></i>
                      <h4>Hidden Gems</h4>
                      <p>Discover spots most tourists miss</p>
                    </div>
                  </div>
                </div>
                
                <div className="day-by-day">
                  <h2>Day-by-Day Plan</h2>
                  
                  <div className="itinerary-day">
                    <div className="day-header">
                      <div className="day-number">Day 1</div>
                      <h3>Arrival & Welcome</h3>
                    </div>
                    <div className="day-content">
                      <div className="day-schedule">
                        <div className="schedule-item">
                          <div className="schedule-time">Morning</div>
                          <div className="schedule-details">
                            <h4>Airport Pickup & Hotel Check-in</h4>
                            <p>Our representative will greet you at the airport and escort you to your luxury accommodation. Enjoy a smooth check-in process and take some time to refresh.</p>
                          </div>
                        </div>
                        <div className="schedule-item">
                          <div className="schedule-time">Afternoon</div>
                          <div className="schedule-details">
                            <h4>Orientation Walk</h4>
                            <p>Take a leisurely orientation walk around the vicinity of your hotel to get familiar with the surroundings.</p>
                          </div>
                        </div>
                        <div className="schedule-item">
                          <div className="schedule-time">Evening</div>
                          <div className="schedule-details">
                            <h4>Welcome Dinner</h4>
                            <p>Enjoy a sumptuous welcome dinner featuring local delicacies while getting to know your fellow travelers and tour guide.</p>
                          </div>
                        </div>
                      </div>
                      <div className="day-meals">
                        <span><i className="fas fa-utensils"></i> Meals: Dinner</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="itinerary-day">
                    <div className="day-header">
                      <div className="day-number">Day 2</div>
                      <h3>Historical Exploration</h3>
                    </div>
                    <div className="day-content">
                      <div className="day-schedule">
                        <div className="schedule-item">
                          <div className="schedule-time">Morning</div>
                          <div className="schedule-details">
                            <h4>Heritage Site Visit</h4>
                            <p>After breakfast, visit the most iconic historical sites with an expert local guide who will share fascinating stories and historical context.</p>
                          </div>
                        </div>
                        <div className="schedule-item">
                          <div className="schedule-time">Afternoon</div>
                          <div className="schedule-details">
                            <h4>Local Craft Workshop</h4>
                            <p>Participate in a hands-on workshop learning traditional crafts from local artisans.</p>
                          </div>
                        </div>
                        <div className="schedule-item">
                          <div className="schedule-time">Evening</div>
                          <div className="schedule-details">
                            <h4>Cultural Performance</h4>
                            <p>Witness a spectacular cultural performance showcasing traditional music and dance forms.</p>
                          </div>
                        </div>
                      </div>
                      <div className="day-meals">
                        <span><i className="fas fa-utensils"></i> Meals: Breakfast, Lunch</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="itinerary-day">
                    <div className="day-header">
                      <div className="day-number">Day 3</div>
                      <h3>Natural Wonders</h3>
                    </div>
                    <div className="day-content">
                      <div className="day-schedule">
                        <div className="schedule-item">
                          <div className="schedule-time">Morning</div>
                          <div className="schedule-details">
                            <h4>Scenic Drive</h4>
                            <p>Embark on a scenic drive through picturesque landscapes, with stops at viewpoints for photography.</p>
                          </div>
                        </div>
                        <div className="schedule-item">
                          <div className="schedule-time">Afternoon</div>
                          <div className="schedule-details">
                            <h4>Nature Walk</h4>
                            <p>Take a guided nature walk through protected areas, learning about local flora and fauna.</p>
                          </div>
                        </div>
                        <div className="schedule-item">
                          <div className="schedule-time">Evening</div>
                          <div className="schedule-details">
                            <h4>Sunset Viewing</h4>
                            <p>Experience a breathtaking sunset from a specially selected vantage point, followed by dinner at a local restaurant.</p>
                          </div>
                        </div>
                      </div>
                      <div className="day-meals">
                        <span><i className="fas fa-utensils"></i> Meals: Breakfast, Dinner</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Accommodation Tab */}
            {activeTab === 'accommodation' && (
              <div className="accommodation-tab">
                <h2>Accommodation Details</h2>
                <div className="accommodation-list">
                  {pkg.destinations.map((destination, index) => (
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
                    <li><i className="fas fa-check"></i> Bottled water during sightseeing</li>
                    <li><i className="fas fa-check"></i> Wi-Fi in hotels and vehicles</li>
                    <li><i className="fas fa-check"></i> Cultural performances as per itinerary</li>
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
                    <li><i className="fas fa-times"></i> Visa fees (if applicable)</li>
                    <li><i className="fas fa-times"></i> Alcoholic beverages</li>
                  </ul>
                </div>
              </div>
            )}
            
            {/* Gallery Tab */}
            {activeTab === 'gallery' && (
              <div className="gallery-tab">
                <h2>Photo Gallery</h2>
                <p className="gallery-intro">Explore stunning visuals of the experiences awaiting you on this journey.</p>
                
                <div className="gallery-grid">
                  {/* In a real implementation, these would be actual images from the package */}
                  <div className="gallery-item">
                    <img src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="Destination view" />
                    <div className="gallery-caption">Iconic landmarks</div>
                  </div>
                  <div className="gallery-item">
                    <img src="https://images.unsplash.com/photo-1548013146-72479768bada?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="Local culture" />
                    <div className="gallery-caption">Cultural experiences</div>
                  </div>
                  <div className="gallery-item">
                    <img src="https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Local cuisine" />
                    <div className="gallery-caption">Culinary delights</div>
                  </div>
                  <div className="gallery-item">
                    <img src="https://images.unsplash.com/photo-1544123311-d3653f1e252b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwaG90ZWx8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" alt="Luxury accommodation" />
                    <div className="gallery-caption">Luxury accommodations</div>
                  </div>
                  <div className="gallery-item">
                    <img src="https://images.unsplash.com/photo-1561361058-c12e04d4d1cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwbmF0dXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="Natural landscapes" />
                    <div className="gallery-caption">Natural wonders</div>
                  </div>
                  <div className="gallery-item">
                    <img src="https://images.unsplash.com/photo-1583089892943-c2a3fc24deab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8aW5kaWFuJTIwY3VsdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="Traditional performances" />
                    <div className="gallery-caption">Traditional performances</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="reviews-tab">
                <h2>Traveler Reviews</h2>
                <div className="reviews-summary">
                  <div className="overall-rating">
                    <div className="rating-number">4.8</div>
                    <div className="rating-stars">
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star"></i>
                      <i className="fas fa-star-half-alt"></i>
                    </div>
                    <div className="rating-count">Based on 24 reviews</div>
                  </div>
                  
                  <div className="rating-breakdown">
                    <div className="rating-aspect">
                      <span>Value for Money</span>
                      <div className="rating-bar-container">
                        <div className="rating-bar" style={{width: '90%'}}></div>
                      </div>
                      <span>4.5</span>
                    </div>
                    <div className="rating-aspect">
                      <span>Guide Quality</span>
                      <div className="rating-bar-container">
                        <div className="rating-bar" style={{width: '96%'}}></div>
                      </div>
                      <span>4.8</span>
                    </div>
                    <div className="rating-aspect">
                      <span>Accommodation</span>
                      <div className="rating-bar-container">
                        <div className="rating-bar" style={{width: '94%'}}></div>
                      </div>
                      <span>4.7</span>
                    </div>
                    <div className="rating-aspect">
                      <span>Food Quality</span>
                      <div className="rating-bar-container">
                        <div className="rating-bar" style={{width: '92%'}}></div>
                      </div>
                      <span>4.6</span>
                    </div>
                  </div>
                </div>
                
                <div className="testimonials-list">
                  <div className="testimonial-card">
                    <div className="testimonial-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          <i className="fas fa-user-circle"></i>
                        </div>
                        <div>
                          <h4>Priya Sharma</h4>
                          <div className="reviewer-rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                          </div>
                        </div>
                      </div>
                      <div className="review-date">March 2023</div>
                    </div>
                    <div className="testimonial-content">
                      <p>"This tour exceeded all my expectations! The guides were knowledgeable and friendly, the accommodations were luxurious, and the itinerary was perfectly balanced. I especially loved the cultural performances and the food was absolutely delicious."</p>
                    </div>
                    <div className="testimonial-trip-info">
                      <div className="trip-detail">
                        <i className="fas fa-users"></i>
                        <span>Family trip</span>
                      </div>
                      <div className="trip-detail">
                        <i className="fas fa-calendar-alt"></i>
                        <span>7 days in February 2023</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="testimonial-card">
                    <div className="testimonial-header">
                      <div className="reviewer-info">
                        <div className="reviewer-avatar">
                          <i className="fas fa-user-circle"></i>
                        </div>
                        <div>
                          <h4>Rahul Mehta</h4>
                          <div className="reviewer-rating">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                          </div>
                        </div>
                      </div>
                      <div className="review-date">January 2023</div>
                    </div>
                    <div className="testimonial-content">
                      <p>"A truly memorable experience! The attention to detail was impressive - from the welcome package to the farewell dinner. Our guide was exceptional and made sure we experienced both the popular attractions and hidden local gems."</p>
                    </div>
                    <div className="testimonial-trip-info">
                      <div className="trip-detail">
                        <i className="fas fa-user-friends"></i>
                        <span>Couple trip</span>
                      </div>
                      <div className="trip-detail">
                        <i className="fas fa-calendar-alt"></i>
                        <span>5 days in December 2022</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Book Now Button */}
          <div className="booking-section">
            <button className="book-now-btn" onClick={() => setShowBookingForm(true)}>
              Book Now
            </button>
            <p className="booking-note">Need a customized itinerary? <span className="contact-link">Contact our travel experts</span></p>
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
              <h3>{pkg.name}</h3>
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