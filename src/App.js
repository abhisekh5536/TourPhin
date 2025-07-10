import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import './index.css';
import TouristGuideForm from './components/Home/TouristGuideForm';
// import Destinations from './components/Destinations/Destinations';
import AiHelp from './components/Ai Help/AiHelp';
import Packages from './components/Packages/Packages';
import PackageDetails from './components/PackageDetails/PackageDetails';
import Footer from './components/Footer/Footer';
import AboutUs from './components/About us/AboutUs';
import ContactUs from './components/Contact Us/ContactUs';
import LoginPage from './components/LoginP or Reg/loginP';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/navbar';
import SignUp from './components/LoginP or Reg/signUp';
import './App.css';
import UserProfile from './components/Profile/UserProfile';
import Guides from './components/Guides/Guides';
import ProtectedRoute from './components/Proctectd/ProtectedRoute';
import supabase from './helper/supabaseClient';
import Destinations_copy from './components/Destinations/Destinations_copy';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

// Create a conditional footer component
function ConditionalFooter() {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Check for screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Don't render footer on home page or on mobile devices
  if (pathname === '/' || isMobile) {
    return null;
  }
  
  // Render footer on all other pages and non-mobile devices
  return <Footer />;
}

function App() {
  const [showTouristGuideForm, setShowTouristGuideForm] = React.useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error checking user:', error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    // Clean up listener on unmount
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleTouristGuideClick = () => {
    setShowTouristGuideForm(true);
  };

  const handleCloseForm = () => {
    setShowTouristGuideForm(false);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#121212',
        color: '#ffd29c'
      }}>
        <div>
          <div style={{ fontSize: '40px', textAlign: 'center', marginBottom: '15px' }}>
            <i className="fas fa-spinner fa-spin"></i>
          </div>
          <p>Loading application...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      {user && <Navbar handleTouristGuideClick={handleTouristGuideClick} />}

      {/* Routes */}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" replace />} />
        <Route path="/signUp" element={!user ? <SignUp /> : <Navigate to="/" replace />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations_copy />} />
          <Route path="/aihelp" element={<AiHelp />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:id" element={<PackageDetails />} />
          {/* <Route path="/ai-help" element={<AiHelp />} /> */}
          <Route path="/aihelp" element={<div>AI Help is temporarily disabled for testing</div>} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs handleTouristGuideClick={handleTouristGuideClick} />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/guides" element={<Guides handleTouristGuideClick={handleTouristGuideClick} />} />
        </Route>
        
        {/* Catch all route - redirect to login if not logged in, or home if logged in */}
        <Route path="*" element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
      </Routes>

      {/* Show the tourist guide form when button is clicked */}
      {showTouristGuideForm && <TouristGuideForm onClose={handleCloseForm} />}
      
      {/* Only show footer if user is logged in */}
      {user && <ConditionalFooter />}
      {/* Bottom Navigation for Mobile */}
      {/* Only show bottom navigation if user is logged in and on mobile */}
      {user && (
        <div className="test">
          <Link to="/"><i className="fas fa-home"></i><span>Home</span></Link>
          <Link to="/destinations"><i className="fas fa-map-marker-alt"></i><span>Destinations</span></Link>
          <Link to="/aihelp"><i className="fas fa-robot"></i><span>AI Help</span></Link>
          <Link to="/packages"><i className="fas fa-suitcase-rolling"></i><span>Packages</span></Link>
          <Link to="/profile"><i className="fas fa-user-circle"></i><span>Profile</span></Link>
        </div>
      )}
    </Router>
  );
}

export default App;