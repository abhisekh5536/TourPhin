import React, { useState, useEffect } from 'react';
import supabase from '../../../helper/supabaseClient';
import './dashboard.css';
import Spinner from '../../../spinner/spinner';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('notifications');
  const [message, setMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [availability, setAvailability] = useState('available');
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [bookings, setBookings] = useState([]);
  const [pkgDetails, setPkgDetails] = useState([]);

  // Filter bookings based on status
  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');

  useEffect(() => {
    setIsLoading(true);
    const fetchAvailability = async () => {
      // setIsLoading(true);
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
        // setIsLoading(false); 
      }
    };
    // fetch bookings
    const fetchBookings = async () => {
      // setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('guide_id', user.id)
        .order('created_at', { ascending: false });

      if (!error) setBookings(data || []);
      // setIsLoading(false);
    };
    
    
    
    
    fetchAvailability();
    fetchBookings();
    setIsLoading(false);
  }, []);


  // use effect for fetch booked package detail
useEffect(()=> {
  const fetchPkg = async() =>{
    setIsLoading(true);
    const pkgIds = bookings.map(b=>b.package_id); 
    const {data , error }  = await supabase
    .from('packages')
    .select('*')
    .in('package_id',pkgIds)

    if(error) {
      console.error('Error fetching package details',error);
    }
    else{
      setPkgDetails(data);
      console.log('package details fetched', data)
    }
    setIsLoading(false);
  }
  fetchPkg();
},[bookings])

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

  const handleStatusUpdate = async (bookingId, action) => {
    const confirmation = window.confirm(`Are you sure you want to ${action} this booking?`);
    if (!confirmation) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from('bookings')
      .update({ 
        status: action === 'accept' ? 'confirmed' : 'rejected',
        updated_at: new Date().toISOString()
      })
      .eq('booking_id', bookingId)
      .eq('guide_id', user.id);

    if (!error) {
      setBookings(prev => prev.filter(b => b.booking_id !== bookingId));
      alert(`Booking ${action === 'accept' ? 'accepted' : 'rejected'} successfully`);
    } else {
      alert('Status update failed');
      console.log('Error updating status:', error);
    }
  };

  const handleMessageClick = () => {
    setShowChat(true);
  };

  const notifications = [
    { id: 1, user: 'John Doe', date: '2023-11-15', status: 'pending' },
    { id: 2, user: 'Jane Smith', date: '2023-11-20', status: 'pending' }
  ];

  // Replace the mock data with actual upcoming bookings
  const [upcomingConfirmed, setUpcomingConfirmed] = useState([]);
  
  // Add this useEffect to fetch confirmed bookings
  useEffect(() => {
    const fetchConfirmedBookings = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('guide_id', user.id)
        .eq('status', 'confirmed')
        .gte('start_date', new Date().toISOString());
      
      setUpcomingConfirmed(data || []);
    };
    
    fetchConfirmedBookings();
  }, [bookings]); // Re-fetch when bookings change

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
              <h2>New Booking Requests</h2>
              {pendingBookings.map(booking => (
                <div key={booking.booking_id} className="notification-card">
                  <h3>{booking.name}</h3>
                  <h4>{pkgDetails.find(pkg=>pkg.package_id === booking.package_id)?.name}</h4>
                  <p>📧 {booking.email}</p>
                  <p>📱 {booking.phone}</p>
                  <p>🗓️ {new Date(booking.start_date).toLocaleDateString()} - 
                    {new Date(booking.end_date).toLocaleDateString()}</p>
                  <p>👥 Travelers: {booking.numberOfTravelers}</p>
                  {booking.notes && <p>📝 Notes: {booking.notes}</p>}
                  <div className="status-badge status-{booking.status.toLowerCase()}">
                    {booking.status}
                  </div>
                  <div className="action-buttons">
                    <button onClick={() => handleStatusUpdate(booking.booking_id, 'accept')}>
                      ✅ Accept
                    </button>
                    <button onClick={() => handleStatusUpdate(booking.booking_id, 'reject')}>
                      ❌ Reject
                    </button>
                    <button onClick={handleMessageClick}>
                      💬 Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'upcoming' && (
            <div className="upcoming-section">
              <h2>Upcoming Bookings</h2>
              {upcomingBookings.map(booking => (
                <div key={booking.booking_id} className="notification-card">
                  <h3>{booking.name}</h3>
                  <h4>{pkgDetails.find(pkg=>pkg.package_id === booking.package_id)?.name}</h4>
                  <p>📧 {booking.email}</p>
                  <p>📱 {booking.phone}</p>
                  <p>🗓️ {new Date(booking.start_date).toLocaleDateString()} - 
                    {new Date(booking.end_date).toLocaleDateString()}</p>
                  <p>👥 Travelers: {booking.numberOfTravelers}</p>
                  {booking.notes && <p>📝 Notes: {booking.notes}</p>}
                  <div className="status-badge status-confirmed">
                    {booking.status}
                  </div>
                  <div className="action-buttons">
                    <button onClick={handleMessageClick}>
                      💬 Message
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-section">
              <h2>Booking Management</h2>
              {bookings.map(booking => (
                <div key={booking.booking_id} className="notification-card">
                  <h3>{booking.name}</h3>
                  <h4>{pkgDetails.find(pkg=>pkg.package_id === booking.package_id)?.name}</h4>
                  <p>📧 {booking.email}</p>
                  <p>📱 {booking.phone}</p>
                  <p>🗓️ {new Date(booking.start_date).toLocaleDateString()} - 
                    {new Date(booking.end_date).toLocaleDateString()}</p>
                  <p>👥 Travelers: {booking.numberOfTravelers}</p>
                  {booking.notes && <p>📝 Notes: {booking.notes}</p>}
                  <div className={`status-badge status-${booking.status.toLowerCase()}`}>
                    {booking.status}
                  </div>
                  <div className="action-buttons">
                    <button onClick={handleMessageClick}>
                      💬 Message
                    </button>
                  </div>
                </div>
              ))}
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
