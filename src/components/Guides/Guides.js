import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Guides.css';
import TouristGuideButton from '../Home/TouristGuideButton';

// Simplify the supabase import to avoid potential errors
let supabase;
try {
  supabase = require('../../helper/supabaseClient').default;
} catch (error) {
  console.warn('Supabase client not available, using sample data only');
}

// Sample data for guides (defined at the top to ensure it's available)
// Base64 encoded SVG user icon matching the theme colors
// Updated user icon with proper SVG format and background circle for better visibility
const userIcon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTIiIGZpbGw9IiMyYTJhMzAiLz48cGF0aCBkPSJNMTIgMTMuNWMtMi42NyAwLTggMS4zNC04IDR2Mi41aDE2di0yLjVjMC0yLjY2LTUuMzMtNC04LTR6bTAtOS41YTMuNSAzLjUgMCAxIDAgMCA3IDMuNSAzLjUgMCAwIDAgMC03eiIgZmlsbD0iI2FmYTM3NSIvPjwvc3ZnPg==";

const sampleGuides = [
  {
    sno: 1,
    name: "Arjun Sharma",
    image: userIcon,
    specialization: "Adventure & Trekking",
    experience: 8,
    languages: ["English", "Hindi", "Nepali"],
    regions: ["Himalayas", "Western Ghats"],
    maxGroupSize: 12,
    certifications: ["Mountain Guide"],
    verified: true,
    featured: true,
    description: "Passionate mountain guide with 8 years of experience leading treks across the Himalayas. Specialized in high-altitude expeditions and wildlife photography tours. Known for creating safe yet thrilling adventures for all skill levels.",
    reviews: [
      {
        user: "Sarah M.",
        rating: 5,
        comment: "Arjun made our trek through the Himalayas unforgettable! His knowledge of the terrain and wildlife was impressive.",
        date: "August 15, 2023"
      }
    ]
  },
  {
    sno: 2,
    name: "Priya Patel",
    image: userIcon,
    specialization: "Cultural & Historical",
    experience: 12,
    languages: ["English", "Hindi", "Gujarati"],
    regions: ["Rajasthan", "Gujarat", "Kerala"],
    maxGroupSize: 15,
    certifications: ["Art History", "Cultural Heritage"],
    verified: true,
    featured: true,
    description: "Cultural expert with a PhD in Art History, specializing in immersive tours of historical sites and monuments. Priya brings ancient Indian civilizations to life through storytelling and in-depth knowledge of local customs, architecture, and art.",
    reviews: [
      {
        user: "Robert J.",
        rating: 5,
        comment: "Priya's knowledge of Indian art transformed our Rajasthan tour. She showed us hidden gems we would never have found on our own.",
        date: "September 5, 2023"
      },
      {
        user: "Jennifer P.",
        rating: 5,
        comment: "Our tour of the Taj Mahal with Priya was incredible. Her stories about the history and symbolism made it so much more meaningful.",
        date: "August 12, 2023"
      }
    ]
  },
  {
    sno: 3,
    name: "Vikram Singh",
    image: userIcon,
    specialization: "Food & Culinary",
    experience: 10,
    languages: ["English", "Hindi", "Punjabi"],
    regions: ["Punjab", "Delhi", "Mumbai"],
    maxGroupSize: 8,
    certifications: ["Culinary Arts", "Wine Sommelier"],
    verified: true,
    featured: false,
    description: "Culinary expert and food historian with a passion for authentic Indian cuisines. Vikram takes you beyond tourist restaurants to discover hidden gems, local markets, and traditional cooking techniques. His tours combine delicious tastings with cultural insights.",
    reviews: [
      {
        user: "Emma T.",
        rating: 5,
        comment: "Carlos' tapas tour in Barcelona was the highlight of our trip! We discovered amazing local spots we would never have found on our own.",
        date: "October 10, 2023"
      },
      {
        user: "Michael R.",
        rating: 4.5,
        comment: "Great wine tasting experience in Portugal. Carlos is incredibly knowledgeable and makes learning about wine fun and accessible.",
        date: "September 22, 2023"
      }
    ]
  },
  {
    sno: 4,
    name: "Meera Agarwal",
    image: userIcon,
    specialization: "Cultural & Heritage",
    experience: 6,
    languages: ["Hindi", "English", "Bengali"],
    regions: ["West Bengal", "Odisha", "Assam"],
    maxGroupSize: 10,
    certifications: ["Cultural Heritage", "Art History"],
    verified: true,
    featured: false,
    description: "Cultural enthusiast specializing in Eastern Indian history and traditional arts. Offers immersive experiences in local communities and tribal villages.",
    reviews: []
  },
  {
    sno: 5,
    name: "Rajesh Kumar",
    image: userIcon,
    specialization: "Wildlife & Nature",
    experience: 9,
    languages: ["Hindi", "English", "Bengali"],
    regions: ["Himalayas", "Western Ghats", "Sundarbans"],
    maxGroupSize: 8,
    certifications: ["Wildlife Conservation", "Ecology"],
    verified: true,
    featured: true,
    description: "Expert in Indian wildlife with a focus on sustainable eco-tourism. Leads jungle safaris and birdwatching expeditions.",
    reviews: [
      {
        user: "Priya S.",
        rating: 4.8,
        comment: "Rajesh's knowledge of Bengal tigers was incredible!",
        date: "November 5, 2023"
      }
    ]
  },
  {
    sno: 6,
    name: "Elena Petrova",
    image: userIcon,
    specialization: "Winter Sports",
    experience: 7,
    languages: ["Russian", "English", "French"],
    regions: ["Siberia", "Alps", "Scandinavia"],
    maxGroupSize: 6,
    certifications: ["Ski Instructor", "Mountain Rescue"],
    verified: true,
    featured: true,
    description: "Professional ski instructor and winter expedition leader. Specializes in extreme winter sports and aurora tours.",
    reviews: []
  },
  // Add 3 more guides following the same pattern
  {
    sno: 7,
    name: "Liam O'Connor",
    image: userIcon,
    specialization: "Food & Culinary",
    experience: 5,
    languages: ["English", "Irish", "French"],
    regions: ["Ireland", "France", "Italy"],
    maxGroupSize: 8,
    certifications: ["Culinary Arts", "Wine Pairing"],
    verified: true,
    featured: false,
    description: "Passionate about traditional cooking methods and local food cultures. Creates unforgettable gastronomic journeys.",
    reviews: []
  },
  {
    sno: 8,
    name: "Aisha Khan",
    image: userIcon,
    specialization: "Desert Safaris",
    experience: 11,
    languages: ["Arabic", "English", "Urdu"],
    regions: ["Sahara", "Arabian Desert", "Thar Desert"],
    maxGroupSize: 15,
    certifications: ["Desert Survival", "Archaeology"],
    verified: true,
    featured: true,
    description: "Expert in desert ecosystems and nomadic cultures. Offers camel treks and stargazing experiences.",
    reviews: [
      {
        user: "Omar T.",
        rating: 5,
        comment: "Aisha's knowledge of Bedouin culture is unparalleled!",
        date: "December 12, 2023"
      }
    ]
  },
  {
    sno: 9,
    name: "Kenji Tanaka",
    image: userIcon,
    specialization: "Historical Tours",
    experience: 15,
    languages: ["Japanese", "English", "Mandarin"],
    regions: ["Japan", "China", "South Korea"],
    maxGroupSize: 12,
    certifications: ["Asian History", "Museum Studies"],
    verified: true,
    featured: true,
    description: "Historian specializing in East Asian civilizations. Provides deep insights into ancient temples and samurai culture.",
    reviews: [
      {
        user: "Yuki N.",
        rating: 5,
        comment: "Kenji brought ancient Japan to life for us!",
        date: "January 8, 2024"
      }
    ]
  }
];

const Guides = ({ handleTouristGuideClick }) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [showComments, setShowComments] = useState(false);
  
  // Add these missing state variables
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  // Add these missing functions
  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    return reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;
  };
  
  const calculateAverageRating = (reviews) => {
    return getAverageRating(reviews).toFixed(1);
  };

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        // Set a timeout to ensure we don't wait too long for Supabase
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Supabase connection timeout')), 5000)
        );
        
        // Try to fetch from Supabase if it's available
        if (supabase) {
          try {
            let query = supabase.from('guides').select('*');
            
            // Add filter parameters to the supabase query
            if (searchQuery) {
              query = query.ilike('name', `%${searchQuery}%`);
            }
            if (selectedSpecialization !== 'all') {
              query = query.eq('specialization', selectedSpecialization);
            }
            
            // Race between timeout and actual fetch
            const { data, error } = await Promise.race([
              query,
              timeoutPromise
            ]);

            if (error) throw error;

            // If we have data, use it
            if (data && data.length > 0) {
              console.log('Data fetched Successfully:');
              setGuides(data);
              setLoading(false);
              return;
            }
          } catch (supabaseError) {
            console.error('Supabase error:', supabaseError);
            // Continue to use sample data
          }
        }
        
        // If we reach here, either supabase is not available or there was no data
        console.log('Using sample guide data');
        setGuides(sampleGuides);
        
      } catch (error) {
        console.error('Error:', error);
        setGuides(sampleGuides); // Ensure sample data is set
        setError('');
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, [searchQuery, selectedSpecialization]); // Add dependencies to re-fetch when filters change

  // Filter and sort guides
  const filteredGuides = guides.filter(guide => {
    const matchesSearch = (guide.name && guide.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (guide.specialization && guide.specialization.toLowerCase().includes(searchQuery.toLowerCase())) ||
                        (guide.description && guide.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSpecialization = selectedSpecialization === 'all' || 
                                guide.specialization === selectedSpecialization;
    
    return matchesSearch && matchesSpecialization;
  }).sort((a, b) => {
    if (sortBy === 'rating') {
      const aRating = getAverageRating(a.reviews);
      const bRating = getAverageRating(b.reviews);
      return bRating - aRating;
    }
    if (sortBy === 'experience') return b.experience - a.experience;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleGuideClick = (guideId) => {
    setSelectedGuide(guideId === selectedGuide ? null : guideId);
    setShowComments(false);
  };

  const toggleComments = (e, guideId) => {
    e.stopPropagation();
    if (selectedGuide === guideId) {
      setShowComments(!showComments);
    } else {
      setSelectedGuide(guideId);
      setShowComments(true);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<i key={i} className="fas fa-star"></i>);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<i key={i} className="fas fa-star-half-alt"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star"></i>);
      }
    }

    return stars;
  };

  if (loading) {
    return (
      <div className="guides-container">
        <div className="guides-loading">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading guides...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="guides-container">
      <div className="guides-header">
        <div className="header-with-button">
          <h1>Our Expert Tour Guides</h1>
          {handleTouristGuideClick && (
            <TouristGuideButton onClick={handleTouristGuideClick} />
          )}
        </div>
        <div className="header-line"></div>
        <p>Meet our professional guides who will make your journey unforgettable</p>
      </div>

      {error ? (
        <div className="guides-error">
          <i className="fas fa-exclamation-circle"></i>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      ) : (
        <>
          <div className="guides-filter">
            <div className="filter-options">
              <select 
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
              >
                <option value="all">All Specializations</option>
                <option value="Adventure & Trekking">Adventure</option>
                <option value="Cultural & Historical">Cultural</option>
                <option value="Food & Culinary">Culinary</option>
                <option value="Wildlife & Nature">Nature</option>
                <option value="Desert Safaris">Desert</option>
                <option value="Historical Tours">Historical</option>
                <option value="Winter Sports">Winter</option>
              </select>
              
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="experience">Most Experienced</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
          </div>
          
          <div className="guides-grid">
            {filteredGuides.map((guide) => (
              <div 
                key={guide.sno} 
                className={`guide-card ${selectedGuide === guide.sno ? 'expanded' : ''}`}
                onClick={() => handleGuideClick(guide.sno)}
              >
                {/* Rest of the guide card JSX remains the same */}
                <div className="guide-card-inner">
                  <div className="guide-card-front">
                    <div className="guide-image">
                      <img src={guide.image || userIcon} alt={guide.name} />
                      <div className="guide-badges">
                        {guide.verified && (
                          <span className="verified-badge">
                            <i className="fas fa-check-circle"></i> Verified
                          </span>
                        )}
                        {guide.featured && (
                          <span className="featured-badge">
                            <i className="fas fa-award"></i> Featured
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="guide-info">
                      <h3>{guide.name}</h3>
                      <p className="guide-specialization">{guide.specialization}</p>
                      <div className="guide-rating">
                        <div className="stars">
                          {renderStars(calculateAverageRating(guide.reviews))}
                        </div>
                        <span className="rating-value">
                          {calculateAverageRating(guide.reviews)}
                          <span className="review-count">({guide.reviews ? guide.reviews.length : 0} reviews)</span>
                        </span>
                      </div>
                      <div className="guide-highlights">
                        <div className="highlight">
                          <i className="fas fa-language"></i>
                          <span>{Array.isArray(guide.languages) ? guide.languages.join(', ') : 'Not specified'}</span>
                        </div>
                        <div className="highlight">
                          <i className="fas fa-briefcase"></i>
                          <span>{guide.experience} years</span>
                        </div>
                      </div>
                      <p className="guide-description">{guide.description.substring(0, 200)}...</p>
                    </div>
                  </div>

                  <div className="guide-card-back">
                    {/* Back of card content remains the same */}
                    <div className="back-header">
                      <h3>{guide.name}</h3>
                      <button className="close-btn" onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGuide(null);
                      }}>
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="guide-details">
                      <div className="detail-item">
                        <i className="fas fa-map-marker-alt"></i>
                        <span>{Array.isArray(guide.regions) ? guide.regions.join(', ') : 'Not listed'}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-users"></i>
                        <span>Group Size: Up to {guide.maxGroupSize} people</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-certificate"></i>
                        <span>{Array.isArray(guide.certifications) ? guide.certifications.join(', ') : 'None'}</span>
                      </div>
                      <div className="detail-item">
                        <i className="fas fa-info-circle"></i>
                        <span>About: {guide.description}</span>
                      </div>
                    </div>
                    <div className="guide-actions">
                      <button className="action-btn comments-btn" onClick={(e) => toggleComments(e, guide.sno)}>
                        <i className="fas fa-comment"></i> 
                        {showComments && selectedGuide === guide.sno ? 'Hide Reviews' : 'Show Reviews'}
                      </button>
                      <Link to={`/contact-us?guide=${guide.sno}`} className="action-btn book-btn" onClick={(e) => e.stopPropagation()}>
                        <i className="fas fa-calendar-check"></i> Book This Guide
                      </Link>
                    </div>
                    
                    {showComments && selectedGuide === guide.sno && (
                      <div className="guide-comments">
                        <h4>Traveler Reviews</h4>
                        {guide.reviews && guide.reviews.length > 0 ? (
                          <div className="comments-list">
                            {guide.reviews.map((review, index) => (
                              <div key={index} className="comment">
                                <div className="comment-header">
                                  <div className="comment-user">
                                    <i className="fas fa-user-circle"></i>
                                    <span>{review.user}</span>
                                  </div>
                                  <div className="comment-rating">
                                    {renderStars(review.rating)}
                                  </div>
                                </div>
                                <p className="comment-text">{review.comment}</p>
                                <p className="comment-date">{review.date}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="no-comments">No reviews yet. Be the first to book and review this guide!</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Guides;