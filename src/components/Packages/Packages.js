import React, { useState } from 'react';
import './Packages.css';
import PackageDetails from './PackageDetails';
// Change the incorrect import
// FROM: import { destinations } from './Destinations';
// TO: import { destinations } from '../Destinations/Destinations';

import { destinations } from '../Destinations/Destinations';
import { Link } from 'react-router-dom';

const combinePackagesAndDestinations = (packages, destinations) => {
  const destinationCards = destinations.map(dest => ({
    id: `dest_${dest.id}`,
    name: dest.name,
    duration: 'Flexible',
    price: `From ₹${dest.avgPrice} per person`,
    destinations: [dest.region],
    highlights: dest.description.split('. ').filter(item => item.length > 0),
    bestSeason: dest.bestSeason,
    type: dest.interests.join(' & '),
    image: dest.image,
    isDestination: true,
    originalData: dest
  }));
  return [...packages, ...destinationCards];
};

const Packages = ({ setCurrentPage }) => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const packages = [
   
  ];

  const allItems = combinePackagesAndDestinations(packages, destinations);

  return (
    <div className="packages-page">
      {/* Hero Section */}
      <div className="packages-hero">
        <div className="packages-hero-content">
          <h1>Travel Packages & Destinations</h1>
          <p>Discover India's finest experiences with our carefully curated travel packages and iconic destinations</p>
        </div>
      </div>

      {/* Packages Section */}
      <section className="packages-section">
        <div className="packages-container">
          <div className="section-header">
            <h2>Our Curated Packages</h2>
            <div className="header-line"></div>
          </div>

          <div className="packages-grid">
            {allItems.map(pkg => (
              <div key={pkg.id} className="package-card">
                <div className="package-image">
                  <img src={pkg.image} alt={pkg.name} />
                  <div className="package-type">{pkg.type}</div>
                </div>
                <div className="package-content">
                  <h3>{pkg.name}</h3>
                  <div className="package-info">
                    {!pkg.isDestination && <p><i className="fas fa-clock"></i> {pkg.duration}</p>}
                    <p><i className="fas fa-map-marker-alt"></i> {pkg.destinations.join(' • ')}</p>
                    {pkg.isDestination && <p><i className="fas fa-star"></i> Rating: {pkg.originalData.rating}</p>}
                  </div>
                  <div className="package-highlights">
                    <h4>Highlights</h4>
                    <ul>
                      {pkg.highlights.map((highlight, index) => (
                        <li key={index}><i className="fas fa-check"></i> {highlight}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="package-footer">
                    <div className="package-price">{pkg.price}</div>
                    <div className="package-season">
                      <i className="fas fa-calendar-alt"></i> Best Time: {pkg.bestSeason}
                    </div>
                    {pkg.isDestination && (
                      <div className="package-difficulty">
                        <i className="fas fa-hiking"></i> Difficulty: {pkg.originalData.difficulty}
                      </div>
                    )}
                  </div>
                  <Link to={`/packages/${pkg.id}`} className="view-details-btn">View Details</Link>
                  
                </div>
              </div>
            ))}
            {destinations.map(dest => (
              <div key={dest.id} className="package-card">
                <div className="package-image">
                  <img src={dest.image} alt={dest.name} />
                  <div className="package-type">{dest.interests.join(' • ')}</div>
                </div>
                <div className="package-content">
                  <h3>{dest.name}</h3>
                  <div className="package-info">
                    <p><i className="fas fa-map-marker-alt"></i> {dest.region}</p>
                    <p><i className="fas fa-hiking"></i> Difficulty: {dest.difficulty}</p>
                  </div>
                  <div className="package-highlights">
                    <p>{dest.description}</p>
                  </div>
                  <div className="package-footer">
                    <div className="package-price">From ₹{dest.avgPrice}</div>
                    <div className="package-season">
                      <i className="fas fa-calendar-alt"></i> Best Time: {dest.bestSeason}
                    </div>
                  </div>
                  <Link to={`/destinations/${dest.id}`} className="view-details-btn">View Details</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="packages-cta">
        <div className="packages-container">
          <h2>Ready to Start Your Journey?</h2>
          <p>Contact us to customize any package according to your preferences</p>
          <button className="contact-btn" onClick={() => setCurrentPage('contact')}>Contact Us</button>
        </div>
      </section>

      {/* Package Details Modal */}
      {selectedPackage && (
        <PackageDetails
          package={selectedPackage}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </div>
  );
};

export default Packages;