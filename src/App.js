import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import TouristGuideButton from './components/TouristGuideButton';
import TouristGuideForm from './components/TouristGuideForm';
import Destinations from './components/Destinations';
import AiHelp from './components/AiHelp';
import './components/TouristGuideButton.css';
import './components/SwipeDownAnimation.css';
import './components/Destinations.css';
import Footer from  './components/Footer';
import './components/Footer.css';
import AboutUs from './components/AboutUs';
import './components/AboutUs.css';


function App() {
  const [showTouristGuideForm, setShowTouristGuideForm] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const destinationsRef = useRef(null);

  useEffect(() => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
      });
    });
  }, []);

  const handleTouristGuideClick = () => {
    setShowTouristGuideForm(true);
  };

  const handleCloseForm = () => {
    setShowTouristGuideForm(false);
  };

  const handleSwipeDownClick = () => {
    // Smooth scroll to destinations section
    destinationsRef.current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div id="wrapper">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo">
          <h2>TourPhin</h2>
        </div>
        <ul className="nav-links">
          <li><a href="#" className={currentPage === 'home' ? 'active' : ''} onClick={() => setCurrentPage('home')}>Home</a></li>
          <li><a href="#" className={currentPage === 'destinations' ? 'active' : ''} onClick={() => setCurrentPage('destinations')}>Destinations</a></li>
          <li><a href="#" className={currentPage === 'aihelp' ? 'active' : ''} onClick={() => setCurrentPage('aihelp')}>AI Help</a></li>
          <li><a href="#">Tour Packages</a></li>
          <li><a href="#" className={currentPage === 'AboutUs' ? 'active': ''} onClick={()=> setCurrentPage('AboutUs')}>About Us</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
        <TouristGuideButton onClick={handleTouristGuideClick} />

        <div className="hamburger">
          <i className="fas fa-bars"></i>
        </div>
      </nav>

      {currentPage === 'home' ? (
        <>
          {/* Parallax Section */}
          <div className="container">
            <img src="Camel.png" alt="" className="foreground" />
            <img src="taaj.jpg" alt="" className="background" />
            <div className="exolore_swipe">
              <h1>EXPLORE MORE</h1>
              <h3 id="swipe_down" onClick={handleSwipeDownClick}>SWIPE DOWN <i className="fa-solid fa-chevron-down"></i></h3>
            </div>
          </div>

          {/* Destinations Section */}
          <section className="destinations" ref={destinationsRef}>
            <div className="section-header">
              <h2>Popular Destinations</h2>
              <div className="header-line"></div>
            </div>
            <div className="container">
              {/* Destination Cards */}
              <div className="popular_destinations">
                <img src="https://skift.com/wp-content/uploads/2022/06/GettyImages-1208049833-scaled-e1654782364566-1536x1024.jpg" alt="taj mahal img" />
                <h3>Agra</h3>
                <p>Visit to Tajmahal, Agra fort, Fatehpur Sikri, Itmad-ud-daulah's tomb, Mehtab Bagh by BAJRANG TOUR TRAVELS.</p>
                <div type="button" className="view_button"> <a href="#">View Details</a></div>
              </div>
              <div className="popular_destinations">
                <img src="https://1.bp.blogspot.com/-az09PefXMpQ/UdRMg81w8QI/AAAAAAAAATg/tEFq4Pp9LRY/s575/lotus+temple.jpg" alt="Lotus temple img" />
                <h3>DELHI</h3>
                <p>
                  Embarking on a journey to Delhi is akin to stepping into a bustling tapestry of history, culture, and modernity woven seamlessly together. The city's vibrant streets pulsate with life, echoing the footsteps of emperors and poets alike. From the iconic Red Fort, where Mughal emperors once held court, to the tranquil gardens of Humayun's Tomb, every corner whispers tales of bygone eras.
                </p>
                <div type="button" className="view_button"> <a href="#">View Details</a></div>
              </div>
              {/* Add more destination cards here */}
              <div className="popular_destinations">
                <img src="https://www.sharpholidays.in/blog/wp-content/uploads/2018/02/goa-night-time-beach.jpg" alt="Lotus temple img" />
                <h3>GOA</h3>
                <p>
                  Journeying to Goa is a retreat to a sun-soaked paradise, where golden beaches, azure waters, and vibrant culture intertwine seamlessly. From lounging on palm-fringed shores to exploring colonial charm, every moment is a blissful escape. Whether indulging in fresh seafood or immersing in lively nightlife, Goa offers a perfect blend of relaxation and adventure in a tropical haven.</p>
                <div type="button" className="view_button"> <a href="#">View Details</a></div>
              </div>
              <div className="popular_destinations">
                <img src="https://img.freepik.com/free-photo/magnetic-hill-mountain-blue-sky-road-way-leh-ladakh-india_1150-11111.jpg?t=st=1741605104~exp=1741608704~hmac=1fa4ed3b9056924beecfbf203030fefddf0c2de152dbeb1274e3c293abd38a0f&w=1380" alt="Lotus temple img" />
                <h3>LADAKH</h3>
                <p>
                  Ladakh is a land of stark contrasts, where the rugged Himalayas meet the arid highlands, creating a landscape of breathtaking beauty and unique charm. This region, located in the northernmost part of India, is known for its high altitude, snow-capped mountains, and pristine natural beauty.
                </p>
                <div type="button" className="view_button"> <a href="#">View Details</a></div>
              </div>
              <div className="popular_destinations">
                <img src="https://maharajatravels.in/wp-content/uploads/2023/08/Andaman-Honeymoon1-1.jpg" alt="Lotus temple img" />
                <h3>ANDAMAN</h3>
                <p>
                  Discover pristine beaches, crystal-clear waters, and vibrant coral reefs. Perfect for water sports, honeymoons, and relaxing getaways in a tropical paradise.
                </p>
                <div type="button" className="view_button"> <a href="#">View Details</a></div>
              </div>
              <div className="popular_destinations">
                <img src="https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2022/09/23113313/andaman-nicobar.jpg?tr=w-1366,f-jpg,pr-true" alt="Lotus temple img" />
                <h3>NICOBAR</h3>
                <p>
                  Explore pristine beaches, lush green forests, and rich biodiversity in these remote islands of the Bay of Bengal.
                </p>
                <div type="button" className="view_button"> <a href="#">View Details</a></div>
              </div>
            </div>
            <div className="view-more-container">
              <button className="view-more-btn" onClick={() => setCurrentPage('destinations')}>View More Destinations <i className="fas fa-arrow-right"></i></button>
            </div>
          </section>
        </>
      ) : currentPage === 'destinations' ? (
        <Destinations />
      ) : currentPage === 'aihelp' ? (
        <AiHelp />
      ) : currentPage === 'AboutUs' ? (
        <AboutUs />
      ) : null}

      {/* Tourist Guide Form Modal */}
      {showTouristGuideForm && <TouristGuideForm onClose={handleCloseForm} />}

      <Footer />
    </div>
  );
}

export default App;