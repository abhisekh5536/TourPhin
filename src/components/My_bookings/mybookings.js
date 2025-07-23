import React, { useState, useEffect } from 'react';
import supabase from '../../helper/supabaseClient';
import './mybookings.css';
import Spinner from '../../spinner/spinner';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [packages, setPackages] = useState({});
  const [guides, setGuides] = useState({});

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          throw new Error('User not logged in');
        }

        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select(`*`)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (bookingsError) throw bookingsError;
        if (!bookingsData || bookingsData.length === 0) {
            setBookings([]);
            return; // No need to fetch packages or guides
        }

        setBookings(bookingsData);

        const packageIds = [...new Set(bookingsData.map(b => b.package_id))];
        const guideIds = [...new Set(bookingsData.map(b => b.guide_id))];

        const [packagesResponse, guidesResponse] = await Promise.all([
          supabase.from('packages').select('*').in('package_id', packageIds),
          supabase.from('guides').select('*').in('id', guideIds)
        ]);

        if (packagesResponse.error) throw packagesResponse.error;
        if (guidesResponse.error) throw guidesResponse.error;

        setPackages(Object.fromEntries(packagesResponse.data.map(pkg => [pkg.package_id, pkg])));
        setGuides(Object.fromEntries(guidesResponse.data.map(guide => [guide.id, guide])));

      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, []);

  // REMOVED the two other useEffect hooks for packages and guides

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;
      
      setBookings(prev => 
        prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' } : b)
      );
    } catch (err) {
      alert('Failed to cancel booking: ' + err.message);
    }
  };

  const [showChat, setShowChat] = useState(false);
  const [currentMessageRecipient, setCurrentMessageRecipient] = useState(null);
  const [message, setMessage] = useState('');

  const handleMessage = (guideId) => {
    setCurrentMessageRecipient(guideId);
    setShowChat(true);
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>My Bookings</h1>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="tabs">
            <button 
              className={activeTab === 'all' ? 'active' : ''}
              onClick={() => setActiveTab('all')}
            >
              All
            </button>
            <button 
              className={activeTab === 'pending' ? 'active' : ''}
              onClick={() => setActiveTab('pending')}
            >
              Pending
            </button>
            <button 
              className={activeTab === 'confirmed' ? 'active' : ''}
              onClick={() => setActiveTab('confirmed')}
            >
              Confirmed
            </button>
            <button 
              className={activeTab === 'cancelled' ? 'active' : ''}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled
            </button>
          </div>
    
          {isLoading ? (
            <Spinner />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : filteredBookings.length === 0 ? (
            <div className="empty-message">You have no {activeTab === 'all' ? '' : activeTab} bookings</div>
          ) : (
            <div className="bookings-list">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="booking-card">
                  <div className="booking-card-header">
                    <img src={packages[booking.package_id]?.image || 'default-package.jpg'} 
                           alt="Package" 
                           className="package-image" />
                    <div>
                      <h3>{guides[booking.guide_id]?.name || 'Unknown Guide'}</h3>
                      <div className="rating">
                        {guides[booking.guide_id]?.rating 
                          ? '⭐'.repeat(guides[booking.guide_id].rating) 
                          : 'No ratings'}
                      </div>
                    </div>
                  </div>
                  <p>Package: {packages[booking.package_id]?.name || 'Unknown Package'}</p>
                  <p>Trip: {new Date(booking.start_date).toLocaleDateString()} - 
                            {new Date(booking.end_date).toLocaleDateString()}</p>
                  <p>Status: <span className={`status-badge status-${booking.status}`}>
                    {booking.status}
                  </span></p>
                  <div className="action-buttons">
                    {['pending', 'confirmed'].includes(booking.status) && (
                      <>
                        <button className="cancel-btn"
                                onClick={() => handleCancelBooking(booking.id)}>
                          Cancel
                        </button>
                        <button className="message-btn"
                                onClick={() => handleMessage(booking.guide_id)}>
                          Message Guide
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {showChat && (
          <div className="chat-section">
            <button className="close-chat" onClick={() => setShowChat(false)}>×</button>
            <h2>Messages with {guides[currentMessageRecipient]?.name || 'Guide'}</h2>
            <div className="messages-container">
              {/* Messages will be displayed here */}
              <p>Messaging UI is not yet implemented.</p>
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

export default MyBookings;
