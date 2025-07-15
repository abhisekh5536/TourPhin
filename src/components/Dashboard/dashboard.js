import React, { useState, useEffect } from 'react';
import supabase from '../../helper/supabaseClient';
import './dashboard.css';
import Spinner from './spinner';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [availability, setAvailability] = useState('available');
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchAvailability = async () => {
      setIsLoading(true); // Start loading
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          alert('User not logged in');
          return;
        }

        const { data, error } = await supabase
          .from('guides')
          .select('is_available')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching availability:', error);
          alert('Error fetching availability');
        } else {
          setAvailability(data.is_available ? 'available' : 'not_available');
        }
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchAvailability();
  }, []);

  // Handle dropdown change
  const handle_availability = async (event) => {
    const selectedValue = event.target.value;
    setAvailability(selectedValue);

    const isAvailable = selectedValue === 'available';
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      alert("User not logged in");
      return;
    }

    const { error } = await supabase
      .from('guides')
      .update({ is_available: isAvailable })
      .eq('id', user.id);

    if (error) {
      console.log('Error updating availability:', error);
      alert("Failed to update availability");
    } else {
      alert('Availability updated successfully');
    }
  };

  const handleStatusUpdate = (id, action) => {
    // Implement Supabase update logic here
  };

  const handleMessageClick = () => {
    setShowChat(true);
  };

  const notifications = [
    { id: 1, user: 'John Doe', date: '2023-11-15', status: 'pending' },
    { id: 2, user: 'Jane Smith', date: '2023-11-20', status: 'pending' }
  ];

  const upcomingBookings = [
    { id: 1, destination: 'Goa', date: '2023-12-10', status: 'confirmed' },
    { id: 2, destination: 'Kerala', date: '2023-12-15', status: 'confirmed' }
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <span><h1>Dashboard</h1></span> 
        {isLoading && <span className='spinner-div'><Spinner /></span>}
        {!isLoading && (
          <span className='availability'>
            Availability:
            <select
              name='availability'
              value={availability}
              onChange={handle_availability}
            >
              <option value='available'>Available</option>
              <option value='not_available'>Not Available</option>
            </select>
          </span>
        )}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="tabs">
            <button 
              onClick={() => setActiveTab('notifications')}
              className={activeTab === 'notifications' ? 'active' : ''}
            >
              New Booking Notifications
            </button>
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={activeTab === 'upcoming' ? 'active' : ''}
            >
              Upcoming Bookings
            </button>
            <button 
              onClick={() => setActiveTab('bookings')}
              className={activeTab === 'bookings' ? 'active' : ''}
            >
              Booking Management
            </button>
          </div>

          {activeTab === 'notifications' && (
            <div className="notifications-section">
              <h2>New Booking Notifications</h2>
              {notifications.map(notification => (
                <div key={notification.id} className="notification-card">
                  <h3>{notification.user}</h3>
                  <p>Requested for: {notification.date}</p>
                  <div className="action-buttons">
                    <button onClick={() => handleStatusUpdate(notification.id, 'accept')}>Accept</button>
                    <button onClick={() => handleStatusUpdate(notification.id, 'reject')}>Reject</button>
                    <button onClick={handleMessageClick}>Message</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="upcoming-section">
              <h2>Upcoming Bookings</h2>
              {upcomingBookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <h3>{booking.destination}</h3>
                  <p>Date: {booking.date}</p>
                  <p>Status: {booking.status}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-section">
              <h2>Booking Management</h2>
              {/* Future UI */}
            </div>
          )}
        </div>

        {showChat && (
          <div className="chat-section">
            <button className="close-chat" onClick={() => setShowChat(false)}>×</button>
            <h2>Messages</h2>
            <div className="messages-container">
              {/* Message list here */}
            </div>
            <div className="message-input">
              <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)} 
                placeholder="Type a message..."
              />
              <button>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
