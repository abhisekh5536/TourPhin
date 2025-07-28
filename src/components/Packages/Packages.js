import React, { useState, useEffect } from 'react';
import './Packages.css';
import PackageDetails from '../PackageDetails/PackageDetails';
import { Link } from 'react-router-dom';
import supabase from '../../helper/supabaseClient';
import PackageCardSkeleton from './PackageCardSkeleton';

const combinePackagesAndDestinations = (packages, destinations) => {
  const destinationCards = destinations.map(dest => ({
    id: `dest_${dest.sr_no}`,
    name: dest.name,
    duration: 'Flexible',
    price: `From ₹${dest.avgPrice} per person`,
    destinations: [dest.region],
    highlights: dest.description ? dest.description.split('. ').filter(item => item.length > 0) : [],
    bestSeason: dest.bestSeason,
    type: Array.isArray(dest.interests) ? dest.interests.join(' & ') : '',
    image: dest.image,
    isDestination: true,
    originalData: dest
  }));
  return [...packages, ...destinationCards];
};

const Packages = ({ setCurrentPage }) => {
  // Declare state variables first
  const [destinations, setDestinations] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const packages = [];
  const [loading, setLoading] = useState(true); 
  
  // Fetch destinations from supabase
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        
        const { data, error } = await supabase
          .from('destinations')
          .select('*');
        if (error) {
          console.error('Error fetching destinations:', error.message);
          setDestinations([]);
        } else {
          setDestinations(data || []);
        }
      } catch (error) {
        console.error('Error fetching destinations in Packages tab:',error);
        setDestinations([]);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchDestinations();
  }, []);

  // Use either fetched destinations or static destinations
  const destinationsToUse = destinations.length > 0 ? destinations : destinations;
  const allItems = combinePackagesAndDestinations(packages, destinationsToUse);

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
            {loading ? (
              Array.from({ length: 6}).map((_,index) => (
                <div key={index} className="package-card">
                <PackageCardSkeleton />
                </div>
              ))
            ) : (
            allItems.map(pkg => (

              <div key={pkg.id} className="package-card">
                <div className="package-img">
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
            
            ))
            )}
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