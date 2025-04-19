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
import Guides from './components/Guides/Guides';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

// Create a conditional footer component
function ConditionalFooter() {
  const { pathname } = useLocation();
  
  // Don't render footer on home page
  if (pathname === '/') {
    return null;
  }
  
  // Render footer on all other pages
  return <Footer />;
}

function App() {
  const [showTouristGuideForm, setShowTouristGuideForm] = React.useState(false);
  
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
        <Route path='/profile' element={<UserProfile />} />
        {/* Update the guides route to pass the handleTouristGuideClick prop */}
        <Route path='/guides' element={<Guides handleTouristGuideClick={handleTouristGuideClick} />} />
      </Routes>

      {/* Show the tourist guide form when button is clicked */}
      {showTouristGuideForm && <TouristGuideForm onClose={handleCloseForm} />}
      
      {/* Replace static Footer with conditional one */}
      <ConditionalFooter />
    </Router>
  );
}

export default App;