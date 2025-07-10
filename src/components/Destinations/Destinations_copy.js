import React, { useState, useEffect, useRef } from 'react';
import './Destinations.css';
import { Link } from 'react-router-dom';
import supabase from '../../helper/supabaseClient';

function Destinations_copy() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedInterest, setSelectedInterest] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [sortBy, setSortBy] = useState('popularity');
  const filterSidebarRef = useRef(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*');
      if (error) {
        console.error('Error fetching destinations:', error.message);
        setDestinations([]);
      } else {
        setDestinations(data || []);
      }
      setLoading(false);
    };
    fetchDestinations();
  }, []);

  // Filtering logic
  const filteredDestinations = destinations.filter(destination => {
    const matchesSearch =
      destination.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      destination.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === 'all' || destination.region === selectedRegion;
    const matchesInterest =
      selectedInterest === 'all' ||
      (destination.interests && destination.interests.includes(selectedInterest));
    const matchesPrice =
      destination.avgPrice >= priceRange[0] && destination.avgPrice <= priceRange[1];
    return matchesSearch && matchesRegion && matchesInterest && matchesPrice;
  });

  // Sorting logic
  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case 'alphabetical':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.avgPrice - b.avgPrice;
      case 'price-high':
        return b.avgPrice - a.avgPrice;
      case 'rating':
        return b.rating - a.rating;
      default: // popularity (featured first, then by rating)
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.rating - a.rating;
    }
  });

  const displayedDestinations = sortedDestinations.slice(0, visibleCount);

  const loadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const toggleFilterSidebar = () => {
    if (filterSidebarRef.current) {
      filterSidebarRef.current.classList.toggle('active');
    }
  };

  if (loading)
    return (
      <div className="destinations-page">
        <div className="destinations-content">
          <div className="loading-container">
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
            </div>
            <p>Loading amazing destinations...</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="destinations-page">
      <div className="destinations-hero">
        <h1>Explore Destinations</h1>
        <p>Discover the most beautiful places in India</p>
      </div>
      <div className="container">
        <div className="search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search destinations..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button><i className="fas fa-search"></i> Search</button>
          </div>
        </div>
      </div>
      {/* Filter Toggle Button - OUTSIDE the sidebar */}
      <button className="filter-toggle" onClick={toggleFilterSidebar}>
        <i className="fas fa-filter"></i>
      </button>
      <div className="destinations-content">
        {/* Filter Sidebar */}
        <div className="filter-sidebar" ref={filterSidebarRef}>
          <button className="filter-close" onClick={toggleFilterSidebar}>
            <i className="fas fa-times"></i>
          </button>
          <div className="filter-section">
            <h3>Region <i className="fas fa-chevron-down"></i></h3>
            <div className="filter-options">
              {['all', 'North India', 'West India', 'South India', 'Islands', 'Central India'].map(region => (
                <div className="filter-option" key={region}>
                  <input
                    type="radio"
                    id={`region-${region}`}
                    name="region"
                    value={region}
                    checked={selectedRegion === region}
                    onChange={() => setSelectedRegion(region)}
                  />
                  <label htmlFor={`region-${region}`}>{region === 'all' ? 'All Regions' : region}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <h3>Interests <i className="fas fa-chevron-down"></i></h3>
            <div className="filter-options">
              {['all', 'historical', 'cultural', 'adventure', 'beach', 'nightlife', 'nature', 'spiritual', 'food', 'wildlife'].map(interest => (
                <div className="filter-option" key={interest}>
                  <input
                    type="radio"
                    id={`interest-${interest}`}
                    name="interest"
                    value={interest}
                    checked={selectedInterest === interest}
                    onChange={() => setSelectedInterest(interest)}
                  />
                  <label htmlFor={`interest-${interest}`}>{interest === 'all' ? 'All Interests' : interest.charAt(0).toUpperCase() + interest.slice(1)}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="filter-section">
            <h3>Price Range <i className="fas fa-chevron-down"></i></h3>
            <div className="price-range">
              <input
                type="range"
                min={0}
                max={100000}
                step={1000}
                value={priceRange[0]}
                onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
              />
              <input
                type="range"
                min={0}
                max={100000}
                step={1000}
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
              />
              <div className="price-values">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          </div>
          <div className="filter-section">
            <h3>Sort By <i className="fas fa-chevron-down"></i></h3>
            <div className="sort-dropdown">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                <option value="popularity">Popularity</option>
                <option value="alphabetical">Alphabetical</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>
        {/* Main Destinations Grid */}
        <div className="destinations-grid">
          <div className="grid-header">
            <div className="results-count">
              Showing {Math.min(visibleCount, sortedDestinations.length)} of {sortedDestinations.length} destinations
            </div>
          </div>
          <div className="destinations-cards">
            {displayedDestinations.map(destination => (
              <div key={destination.id} className="destination-card">
                <div className="card-image">
                  <img src={destination.image} alt={destination.name} />
                </div>
                <div className="card-content">
                  <h3 className="card-title">{destination.name}</h3>
                  <div className="card-highlights">
                    <span className="highlight"><i className="fas fa-map-marker-alt"></i> {destination.region}</span>
                    <span className="highlight"><i className="fas fa-calendar-alt"></i> {destination.bestSeason || destination.season}</span>
                  </div>
                  <div className="card-rating">
                    <i className="fas fa-star"></i>
                    <span className="rating-value">{destination.rating}</span>
                  </div>
                  <p className="card-description">{destination.description}</p>
                  <Link to={`/packages/dest_${destination.sr_no}`} className="card-button">
                    View Details <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          {visibleCount < sortedDestinations.length && (
            <div className="load-more-container">
              <button className="load-more-btn" onClick={loadMore}>
                Load More <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Destinations_copy;