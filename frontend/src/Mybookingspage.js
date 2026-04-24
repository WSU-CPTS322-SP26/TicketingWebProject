import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Mybookingspage.css';
import Footer from './Footer';

const API_BASE = 'http://localhost:8080';

const posterMap = {
  'CRIME 101':         '/crime101.jpg',
  'HAMNET':            '/hamnet.jpg',
  'SEND HELP':         '/sendhelp.jpg',
  'WUTHERING HEIGHTS': '/wuthering.jpg',
  'MERCY':             '/mercy.jpg',
  'SCREAM 7':          '/scream7.jpg',
};

const getPoster = (title) => {
  if (!title) return '/crime101.jpg';
  return posterMap[title.toUpperCase()] || '/crime101.jpg';
};

const getStatusColor = (status) => {
  if (!status) return 'rgba(255,255,255,0.3)';
  switch (status.toLowerCase()) {
    case 'confirmed': return '#2ec4b6';
    case 'cancelled': return '#e63946';
    case 'pending':   return '#d4af37';
    default:          return 'rgba(255,255,255,0.3)';
  }
};

const MyBookingsPage = () => {
  const navigate  = useNavigate();
  const [bookings, setBookings]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState('');
  const [cancelling, setCancelling] = useState(null);
  const [cancelError, setCancelError] = useState('');

  const user  = JSON.parse(localStorage.getItem('tickr_user') || '{}');
  const token = localStorage.getItem('tickr_token');

  useEffect(() => {
    if (!token || !user.userId) {
      navigate('/auth');
      return;
    }
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_BASE}/api/user/bookings/user/${user.userId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch bookings');
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Could not load your bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    setCancelling(bookingId);
    setCancelError('');
    try {
      const res = await fetch(`${API_BASE}/api/user/bookings/${bookingId}/cancel`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (res.ok) {
        // Update local state
        setBookings(prev =>
          prev.map(b => (b.bookingId === bookingId || b.id === bookingId)
            ? { ...b, status: 'cancelled' }
            : b
          )
        );
      } else {
        const data = await res.json();
        setCancelError(data.error || data.message || 'Cancellation failed');
      }
    } catch (err) {
      console.error('Error cancelling booking:', err);
      setCancelError('Network error. Please try again.');
    } finally {
      setCancelling(null);
    }
  };

  const getBookingId = (b) => b.bookingId || b.id;
  const getMovieTitle = (b) => b.showtime?.movie?.title || b.movieTitle || ('Booking #' + (b.bookingId || b.id));
  const getCinema = (b) => b.showtime?.screen?.theater?.name || b.theaterName || '—';
  const getDate = (b) => b.showtime?.showDate || b.bookingDate || '—';
  const getTime = (b) => b.showtime?.showTime || b.showTime || '—';
  const getSeats = (b) => b.seatLabels?.join(', ') || b.seats || '—';
  const getTotal = (b) => b.totalAmount || b.totalPrice || b.total || 0;

  return (
    <div className="mb-page">

      {/* Navbar */}
      <nav className="mb-nav">
        <div className="mb-nav-inner">
          <div className="mb-nav-left">
            <span className="mb-nav-link" onClick={() => navigate('/offers')}>Offers & Promotions</span>
            <span className="mb-nav-link" onClick={() => navigate('/movies')}>Movies</span>
          </div>
          <span className="mb-logo" onClick={() => navigate('/')}>Tickr</span>
          <div className="mb-nav-right">
            <span className="mb-nav-link" onClick={() => navigate('/private-booking')}>Private Bookings</span>
            <span className="mb-nav-link" onClick={() => navigate('/locations')}>Locations</span>
            <span className="mb-nav-icon">👤</span>
            <span className="mb-nav-icon">🔍</span>
            <span className="mb-nav-icon">☰</span>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="mb-header">
        <div className="mb-header-inner">
          <div>
            <h1 className="mb-heading">MY BOOKINGS</h1>
            <p className="mb-sub">Your upcoming and past screenings</p>
          </div>
          {user.name && (
            <div className="mb-user-badge">
              <span className="mb-user-icon">👤</span>
              <span className="mb-user-name">{user.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="mb-content">

        {loading && (
          <div className="mb-state">
            <div className="mb-spinner" />
            <p>Loading your bookings...</p>
          </div>
        )}

        {!loading && error && (
          <div className="mb-state">
            <p className="mb-error">{error}</p>
            <button className="mb-retry-btn" onClick={fetchBookings}>TRY AGAIN</button>
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="mb-state">
            <div className="mb-empty-icon">🎬</div>
            <h2 className="mb-empty-title">NO BOOKINGS YET</h2>
            <p className="mb-empty-desc">You haven't booked any tickets yet. Browse movies and book your first screening!</p>
            <button className="mb-browse-btn" onClick={() => navigate('/movies')}>BROWSE MOVIES →</button>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="mb-list">
            {/* Cancel error banner */}
            {cancelError && (
              <div style={{
                background: 'rgba(230,57,70,0.08)',
                border: '1px solid rgba(230,57,70,0.25)',
                padding: '10px 16px',
                borderRadius: '2px',
                color: '#e63946',
                fontSize: '12px',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>⚠</span> {cancelError}
              </div>
            )}

            {bookings.map((booking) => {
              const id     = getBookingId(booking);
              const title  = getMovieTitle(booking);
              const cinema = getCinema(booking);
              const date   = getDate(booking);
              const time   = getTime(booking);
              const seats  = getSeats(booking);
              const total  = getTotal(booking);
              const status = booking.status || 'confirmed';
              const isCancelled = status.toLowerCase() === 'cancelled';

              return (
                <div key={id} className={`mb-card ${isCancelled ? 'mb-card--cancelled' : ''}`}>

                  {/* Poster */}
                  <div className="mb-card-poster">
                    <img src={getPoster(title)} alt={title} />
                    {isCancelled && <div className="mb-cancelled-overlay">CANCELLED</div>}
                  </div>

                  {/* Info */}
                  <div className="mb-card-info">
                    <div className="mb-card-top">
                      <h2 className="mb-card-title">{title}</h2>
                      <span
                        className="mb-card-status"
                        style={{ color: getStatusColor(status), borderColor: getStatusColor(status) }}
                      >
                        {status.toUpperCase()}
                      </span>
                    </div>

                    <div className="mb-card-details">
                      <div className="mb-detail-row">
                        <span className="mb-detail-label">CINEMA</span>
                        <span className="mb-detail-value">{cinema}</span>
                      </div>
                      <div className="mb-detail-row">
                        <span className="mb-detail-label">DATE</span>
                        <span className="mb-detail-value">{date}</span>
                      </div>
                      <div className="mb-detail-row">
                        <span className="mb-detail-label">TIME</span>
                        <span className="mb-detail-value">{time}</span>
                      </div>
                      <div className="mb-detail-row">
                        <span className="mb-detail-label">SEATS</span>
                        <span className="mb-detail-value mb-seats">{seats}</span>
                      </div>
                    </div>

                    <div className="mb-card-footer">
                      <span className="mb-card-total">${total}</span>
                      {!isCancelled && (
                        <button
                          className="mb-cancel-btn"
                          disabled={cancelling === id}
                          onClick={() => handleCancel(id)}
                        >
                          {cancelling === id ? 'CANCELLING...' : 'CANCEL BOOKING'}
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyBookingsPage;