import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-content">
          <h1>About TourPhin</h1>
          <p>Your trusted travel partner for exploring the wonders of India</p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="section-header">
            <h2>Our Story</h2>
            <div className="header-line"></div>
          </div>
          
          <div className="about-content">
            <div className="about-image">
              <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" alt="TourPhin Team" />
            </div>
            <div className="about-text">
              <h3>How We Started</h3>
              <p>Founded in 2020, TourPhin began with a simple yet powerful vision: to showcase the incredible diversity and beauty of India to travelers from around the world. What started as a small team of passionate travel enthusiasts has grown into a trusted travel company dedicated to creating memorable experiences.</p>
              
              <p>Our journey began when our founders, avid travelers themselves, recognized the need for authentic, well-organized tours that go beyond the typical tourist attractions. They wanted to create experiences that connect travelers with the heart and soul of each destination.</p>
              
              <h3>Our Mission</h3>
              <p>At TourPhin, our mission is to provide exceptional travel experiences that showcase the authentic beauty, culture, and heritage of India. We strive to create journeys that are not just trips, but transformative experiences that leave lasting impressions.</p>
              
              <p>We believe that the best travel experiences come from local expertise. That's why we've created a platform where passionate individuals from all walks of life can join as tourist guides and share their unique knowledge and perspectives. Whether you're a history enthusiast, a cultural expert, or simply someone who loves showing others the hidden gems of your hometown, TourPhin welcomes you to become part of our community of guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-section why-choose-us">
        <div className="about-container">
          <div className="section-header" id='Why_Choose_Tourphn'>
            <h2>Why Choose TourPhin</h2>
            <div className="header-line"></div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3>Expertly Crafted Itineraries</h3>
              <p>Our travel experts design each itinerary with care, balancing must-see attractions with hidden gems for a comprehensive experience.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3>Personalized Service</h3>
              <p>We believe in personalized attention, tailoring each journey to match your preferences, interests, and travel style.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-user-shield"></i>
              </div>
              <h3>Safety First</h3>
              <p>Your safety is our priority. We maintain the highest standards of safety in all our tours and follow strict protocols.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-heart"></i>
              </div>
              <h3>Passion for Travel</h3>
              <p>Our team consists of travel enthusiasts who are passionate about creating unforgettable experiences for every traveler.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-leaf"></i>
              </div>
              <h3>Responsible Tourism</h3>
              <p>We are committed to sustainable travel practices that respect local communities and preserve the environment.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-rupee-sign"></i>
              </div>
              <h3>Value for Money</h3>
              <p>We offer competitive pricing without compromising on the quality of experiences, accommodations, or services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="about-section">
        <div className="about-container">
          <div className="section-header">
            <h2>Meet Our Team</h2>
            <div className="header-line"></div>
          </div>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="https://avatar.iran.liara.run/public/7" alt="Team Member" />
              </div>
              <h3>Swaraj Kumar</h3>
              <p className="member-role">..........</p>
              <p className="member-bio">With over 15 years of experience in the travel industry, Swaraj brings expertise and vision to TourPhin.</p>
              <div className="member-social">
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-twitter" ></i></a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="https://avatar.iran.liara.run/public/7" alt="Team Member" />
              </div>
              <h3>Abhisekh Yadav</h3>
              <p className="member-role">.........</p>
              <p className="member-bio">Abhisekh ensures that every tour runs smoothly, with attention to detail and customer satisfaction.</p>
              <div className="member-social">
                <a href="https://www.linkedin.com/in/abhisekh-yadav-493306248/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://x.com/abhisekh_y50320" target="_blank"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="https://avatar.iran.liara.run/public/7" alt="Team Member" />
              </div>
              <h3>Srajan Srivastav</h3>
              <p className="member-role">...............</p>
              <p className="member-bio">Srajan's passion for exploration helps him create unique and immersive travel experiences.</p>
              <div className="member-social">
                <a href="#"><i className="fab fa-linkedin-in"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="https://avatar.iran.liara.run/public/7" alt="Team Member" />
              </div>
              <h3>Saurabh Roy</h3>
              <p className="member-role">...............</p>
              <p className="member-bio">Saurabh passion for exploration helps him create unique and immersive travel experiences.</p>
              <div className="member-social">
                <a href="https://www.linkedin.com/in/saurabh-roy-840598273/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
                <a href="#" target="_blank"><i className="fab fa-twitter"></i></a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="about-section testimonials-section">
        <div className="about-container">
          <div className="section-header">
            <h2>What Our Travelers Say</h2>
            <div className="header-line"></div>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <i className="fas fa-quote-left quote-icon"></i>
                <p>Our trip to Rajasthan with TourPhin was absolutely magical. The attention to detail, the knowledgeable guides, and the unique experiences made it a journey to remember.</p>
              </div>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Testimonial Author" />
                <div>
                  <h4>Meera Kapoor</h4>
                  <p>Delhi, India</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <i className="fas fa-quote-left quote-icon"></i>
                <p>As a solo traveler, I was looking for a safe and enriching experience. TourPhin delivered beyond my expectations with their well-organized tours and friendly guides.</p>
              </div>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="Testimonial Author" />
                <div>
                  <h4>James Wilson</h4>
                  <p>London, UK</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <i className="fas fa-quote-left quote-icon"></i>
                <p>The Kerala backwaters tour was a highlight of our honeymoon. TourPhin arranged everything perfectly, from the houseboat stay to the cultural performances.</p>
              </div>
              <div className="testimonial-author">
                <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="Testimonial Author" />
                <div>
                  <h4>Sarah & David Chen</h4>
                  <p>Singapore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <div className="about-container">
          <h2>Ready to Explore India with Us?</h2>
          <p>Let us help you discover the incredible diversity and beauty of India</p>
          <div className="cta-buttons">
            <a href="#" className="cta-button primary">View Our Packages</a>
            <a href="#" className="cta-button secondary">Contact Us</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;