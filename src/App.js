import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './index.css';
// Remove the unused import
// import TouristGuideButton from './components/Home/TouristGuideButton';
import TouristGuideForm from './components/Home/TouristGuideForm';
import Destinations from './components/Destinations/Destinations';
import AiHelp from './components/Ai Help/AiHelp';
import Packages from './components/Packages/Packages';
import PackageDetails from './components/Packages/PackageDetails';
import Footer from './components/Footer/Footer';
import AboutUs from './components/About us/AboutUs';
import ContactUs from './components/Contact Us/ContactUs';
import LoginPage from './components/LoginP or Reg/loginPage';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/navbar';
import SignUp from './components/LoginP or Reg/signUp';
import './App.css';
import UserProfile from './components/Profile/UserProfile';
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}
function App() {
  const [showTouristGuideForm, setShowTouristGuideForm] = React.useState(false);
  
  // Remove the unused ref
  // const destinationsRef = React.useRef(null);

  const handleTouristGuideClick = () => {
    setShowTouristGuideForm(true);
  };

  const handleCloseForm = () => {
    setShowTouristGuideForm(false);
  };

  return (
    <Router>
      <ScrollToTop />
      <Navbar handleTouristGuideClick={handleTouristGuideClick} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/aihelp" element={<AiHelp />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/packages/:id" element={<PackageDetails />} />
        <Route path="/ai-help" element={<AiHelp />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs handleTouristGuideClick={handleTouristGuideClick} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path='/signUp' element={<SignUp/>}/>
        {/* Add the new profile route */}
        <Route path='/profile' element={<UserProfile />} />
      </Routes>

      {/* Tourist Guide Form Modal */}
      {showTouristGuideForm && <TouristGuideForm onClose={handleCloseForm} />}

      <Footer />
      
      <div className='test'>
        <Link to="/">
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        <Link to="/destinations">
          <i className="fas fa-map-marker-alt"></i>
          <span>Destinations</span>
        </Link>
        <Link to="/aihelp">
          <i className="fas fa-robot"></i>
          <span>AI Help</span>
        </Link>
        <Link to="/packages">
          <i className="fas fa-suitcase"></i>
          <span>Packages</span>
        </Link>
        <Link to="/profile">
          <i className="fas fa-user-circle"></i>
          <span>Profile</span>
        </Link>
      </div>
    </Router>
  );
}

export default App;