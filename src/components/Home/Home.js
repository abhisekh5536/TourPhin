import React, { useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Home.css';
import './SwipeDownAnimation.css';

const Home = () => {
  const navigate = useNavigate();
  const destinationsRef = useRef(null);

  const handleViewMoreClick = () => {
    navigate('/destinations');
  };

  const handleSwipeDownClick = () => {
    destinationsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="wrapper">
      <div className="container">
        <img src="/Camel.png" alt="Camel" className="foreground" />
        <img src="/taaj.jpg" alt="Background" className="background" />
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
          <div className="popular_destinations">
            <img src="https://skift.com/wp-content/uploads/2022/06/GettyImages-1208049833-scaled-e1654782364566-1536x1024.jpg" alt="taj mahal img" />
            <h3>Agra</h3>
            <p>Visit to Tajmahal, Agra fort, Fatehpur Sikri, Itmad-ud-daulah's tomb, Mehtab Bagh by BAJRANG TOUR TRAVELS.</p>
            <div className="view_button"> <Link to="/packages/dest_1">View Details</Link></div> 
          </div>
          <div className="popular_destinations">
            <img src="https://1.bp.blogspot.com/-az09PefXMpQ/UdRMg81w8QI/AAAAAAAAATg/tEFq4Pp9LRY/s575/lotus+temple.jpg" alt="Lotus temple img" />
            <h3>DELHI</h3>
            <p>
              Embarking on a journey to Delhi is akin to stepping into a bustling tapestry of history, culture, and modernity woven seamlessly together. The city's vibrant streets pulsate with life, echoing the footsteps of emperors and poets alike.
            </p>
            <div className="view_button"> <Link to="/packages/dest_2">View Details</Link></div>
          </div>
          <div className="popular_destinations">
            <img src="https://www.sharpholidays.in/blog/wp-content/uploads/2018/02/goa-night-time-beach.jpg" alt="Goa beach img" />
            <h3>GOA</h3>
            <p>
              Journeying to Goa is a retreat to a sun-soaked paradise, where golden beaches, azure waters, and vibrant culture intertwine seamlessly. From lounging on palm-fringed shores to exploring colonial charm, every moment is a blissful escape.
            </p>
            <div className="view_button"> <Link to="/packages/dest_3">View Details</Link></div>
          </div>
          <div className="popular_destinations">
            <img src="https://img.freepik.com/free-photo/magnetic-hill-mountain-blue-sky-road-way-leh-ladakh-india_1150-11111.jpg" alt="Ladakh img" />
            <h3>LADAKH</h3>
            <p>
              Ladakh is a land of stark contrasts, where the rugged Himalayas meet the arid highlands, creating a landscape of breathtaking beauty and unique charm. This region, located in the northernmost part of India, is known for its high altitude.
            </p>
            <div className="view_button"> <Link to="/packages/dest_4">View Details</Link></div>
          </div>
        </div>
        <div className="view-more-container">
          <button className="view-more-btn" onClick={handleViewMoreClick}>View More Destinations <i className="fas fa-arrow-right"></i></button>
        </div>
      </section>
    </div>
  );
};

export default Home;