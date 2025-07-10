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
    preferences: '',
    role:''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (user) {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)  
            .single();
            
          if (data && !error) {
            setProfileData({
              fullName: data.full_name || '',
              phone: data.phone || '',
              address: data.address || '',
              preferences: data.preferences || '' ,
              role: data.role || ''

            });
            if (data.profile_pic) {
              setImageUrl(data.profile_pic);
            }
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
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,  
          full_name: profileData.fullName,
          phone: profileData.phone,
          address: profileData.address,
          prefrences: profileData.preferences, 
          profile_pic: imageUrl,
          updated_at: new Date()
        });
        
      if (error) throw error;
      
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
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

  // Handle image upload and update state
  async function uploadImage(e) {
    try {
      if (!e.target.files || !e.target.files[0]) {
        console.log('No file selected');
        return;
      }
      const file = e.target.files[0];
      const fileName = `${Date.now()}-${file.name}`;
      const { error } = await supabase.storage
        .from('images')
        .upload(fileName, file);

      if (error) {
        console.error('Error uploading image:', error);
      } else {
        const { data: publicUrlData } = supabase.storage
          .from('images')
          .getPublicUrl(fileName);

        const publicUrl = publicUrlData.publicUrl;
        console.log('Public URL:', publicUrl);
        setImageUrl(publicUrl);
        
        // Update the image display immediately
        const profileImage = document.getElementById('profileImage');
        if (profileImage) {
          profileImage.src = publicUrl;
        }
      }
    } catch (error) {
      console.error('Error in uploadImage function:', error);
    }
  }

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
          <img 
            src={imageUrl || 'https://via.placeholder.com/120'} 
            alt='Profile' 
            id='profileImage'
          />
          <div className='indicator'>
            {/* to make first uppercase */}
            {profileData.role.charAt(0).toUpperCase() + profileData.role.slice(1)}
          </div>
        </div>
        
        <div className="profile-email">
          <h3>{user.email}</h3>
          <p>Member since {new Date(user.created_at || Date.now()).toLocaleDateString()}</p>
        </div>

        <form className="profile-form">
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

          {/* Profile Picture Upload */}
          <div className="form-group">
            <label htmlFor='profilePicInput'>Profile Picture</label>
            <input
              type='file'
              id='profilePicInput'
              name='profilePic'
              accept='image/*'
              disabled={!isEditing}
              onChange={uploadImage}
              className="file-input"
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
                <button 
                type="button" 
                className="save-btn"
                onClick={handleSubmit}>
                  <i className="fas fa-save"></i> Save Changes
                </button>
                <button 
                  type="button" 
                  className="cancel-btn"
                  onClick={() => {setIsEditing(false)}}
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
