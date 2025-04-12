import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../../helper/supabaseClient';
import './UserProfile.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    fullName: '',
    phone: '',
    address: '',
    preferences: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          // Fetch user profile data from a profiles table if you have one
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();
            
          if (data && !error) {
            setProfileData({
              fullName: data.full_name || '',
              phone: data.phone || '',
              address: data.address || '',
              preferences: data.preferences || ''
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) return;
    
    try {
      // Update profile in database
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          full_name: profileData.fullName,
          phone: profileData.phone,
          address: profileData.address,
          preferences: profileData.preferences,
          updated_at: new Date()
        });
        
      if (error) throw error;
      
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile. Please try again.');
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="profile-container">
        <div className="not-logged-in">
          <h2>You are not logged in</h2>
          <p>Please log in to view your profile</p>
          <Link to="/login" className="login-link-btn">
            <i className="fas fa-sign-in-alt"></i> Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <div className="header-line"></div>
      </div>

      {message && (
        <div className={message.includes('Failed') ? "error-message" : "success-message"}>
          {message}
        </div>
      )}

      <div className="profile-card">
        <div className="profile-avatar">
          <i className="fas fa-user-circle"></i>
        </div>
        
        <div className="profile-email">
          <h3>{user.email}</h3>
          <p>Member since {new Date(user.created_at || Date.now()).toLocaleDateString()}</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={profileData.fullName}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Enter your address"
            />
          </div>

          <div className="form-group">
            <label htmlFor="preferences">Travel Preferences</label>
            <textarea
              id="preferences"
              name="preferences"
              value={profileData.preferences}
              onChange={handleChange}
              disabled={!isEditing}
              placeholder="Tell us about your travel preferences"
              rows="4"
            ></textarea>
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button type="submit" className="save-btn">
                  <i className="fas fa-save"></i> Save Changes
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => setIsEditing(false)}
                >
                  <i className="fas fa-times"></i> Cancel
                </button>
              </>
            ) : (
              <button 
                type="button" 
                className="edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            )}
          </div>
        </form>

        <div className="profile-links">
          <Link to="/packages" className="profile-link">
            <i className="fas fa-suitcase"></i> My Bookings
          </Link>
          <Link to="/destinations" className="profile-link">
            <i className="fas fa-heart"></i> Saved Destinations
          </Link>
          <button onClick={handleSignOut} className="signout-btn">
            <i className="fas fa-sign-out-alt"></i> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;