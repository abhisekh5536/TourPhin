import React, { useState } from 'react';
import './Packages.css';
import PackageDetails from './PackageDetails';

const Packages = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const packages = [
    {
      id: 6,
      name: 'Mountain Expedition',
      duration: '9 Days / 8 Nights',
      price: 'From ₹70,000 per person',
      destinations: ['Rishikesh', 'Auli', 'Valley of Flowers', 'Badrinath'],
      highlights: [
        'Professional mountaineering guides',
        'High-altitude camping experience',
        'Sacred temple visits',
        'Adventure sports activities'
      ],
      bestSeason: 'April to June',
      type: 'Adventure & Spiritual',
      image: 'https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 7,
      name: 'Temple Trail',
      duration: '8 Days / 7 Nights',
      price: 'From ₹48,000 per person',
      destinations: ['Madurai', 'Rameshwaram', 'Tirupati', 'Mahabalipuram'],
      highlights: [
        'Ancient temple architecture tours',
        'Traditional ritual experiences',
        'Local cuisine exploration',
        'Cultural performances'
      ],
      bestSeason: 'November to February',
      type: 'Spiritual & Cultural',
      image: 'https://images.unsplash.com/photo-1582651957695-5506ea6df02b?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 8,
      name: 'Palace Stay',
      duration: '6 Days / 5 Nights',
      price: 'From ₹95,000 per person',
      destinations: ['Mysore', 'Bangalore', 'Hampi'],
      highlights: [
        'Luxury palace hotel accommodations',
        'Royal dining experiences',
        'Private heritage tours',
        'Cultural performances'
      ],
      bestSeason: 'September to March',
      type: 'Luxury & Heritage',
      image: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 1,
      name: 'Royal Rajasthan Heritage',
      duration: '7 Days / 6 Nights',
      price: 'From ₹45,000 per person',
      destinations: ['Jaipur', 'Udaipur', 'Jodhpur', 'Jaisalmer'],
      highlights: [
        'Palace stays in heritage hotels',
        'Desert safari in Jaisalmer',
        'Traditional Rajasthani folk performances',
        'Royal palace and fort tours'
      ],
      bestSeason: 'October to March',
      type: 'Cultural & Heritage',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Himalayan Adventure',
      duration: '8 Days / 7 Nights',
      price: 'From ₹55,000 per person',
      destinations: ['Manali', 'Leh', 'Pangong Lake', 'Nubra Valley'],
      highlights: [
        'High-altitude lake camping',
        'Buddhist monastery visits',
        'Mountain biking trails',
        'Local homestay experience'
      ],
      bestSeason: 'June to September',
      type: 'Adventure & Nature',
      image: 'https://images.unsplash.com/photo-1626014303757-6366ef55c4ab?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Kerala Backwaters Bliss',
      duration: '5 Days / 4 Nights',
      price: 'From ₹35,000 per person',
      destinations: ['Kochi', 'Alleppey', 'Kumarakom', 'Munnar'],
      highlights: [
        'Houseboat cruise in backwaters',
        'Ayurvedic spa treatments',
        'Tea plantation visits',
        'Traditional Kathakali performance'
      ],
      bestSeason: 'September to March',
      type: 'Relaxation & Culture',
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Golden Triangle Classic',
      duration: '6 Days / 5 Nights',
      price: 'From ₹40,000 per person',
      destinations: ['Delhi', 'Agra', 'Jaipur'],
      highlights: [
        'Taj Mahal sunrise visit',
        'Old Delhi food walk',
        'Amber Fort elephant ride',
        'Craft workshops'
      ],
      bestSeason: 'October to March',
      type: 'Cultural & Heritage',
      image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 5,
      name: 'Northeast Explorer',
      duration: '10 Days / 9 Nights',
      price: 'From ₹65,000 per person',
      destinations: ['Gangtok', 'Pelling', 'Darjeeling', 'Kaziranga'],
      highlights: [
        'Wildlife safari in Kaziranga',
        'Buddhist monastery tours',
        'Himalayan toy train ride',
        'Tea estate visits'
      ],
      bestSeason: 'March to May',
      type: 'Nature & Wildlife',
      image: 'https://images.unsplash.com/photo-1626014303757-6366ef55c4ab?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  return (
    <div className="packages-page">
      {/* Hero Section */}
      <div className="packages-hero">
        <div className="packages-hero-content">
          <h1>Travel Packages</h1>
          <p>Discover India's finest experiences with our carefully curated travel packages</p>
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
            {packages.map(pkg => (
              <div key={pkg.id} className="package-card">
                <div className="package-image">
                  <img src={pkg.image} alt={pkg.name} />
                  <div className="package-type">{pkg.type}</div>
                </div>
                <div className="package-content">
                  <h3>{pkg.name}</h3>
                  <div className="package-info">
                    <p><i className="fas fa-clock"></i> {pkg.duration}</p>
                    <p><i className="fas fa-map-marker-alt"></i> {pkg.destinations.join(' • ')}</p>
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
                  </div>
                  <button className="view-details-btn" onClick={() => setSelectedPackage(pkg)}>View Details</button>
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
          <button className="contact-btn">Contact Us</button>
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