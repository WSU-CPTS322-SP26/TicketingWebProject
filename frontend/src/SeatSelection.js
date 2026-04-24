import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SeatSelection.css';

const API_BASE = 'http://localhost:8080';
const TICKET_PRICE = 15;

// Fallback static seats if backend has no data
const FALLBACK_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const FALLBACK_COLS = 14;
const FALLBACK_UNAVAILABLE = new Set([
  'A-3', 'A-4', 'B-7', 'B-8', 'C-2', 'C-11',
  'D-5', 'D-6', 'E-9', 'F-1', 'F-13', 'G-4',
  'H-7', 'H-8', 'I-3', 'J-10', 'J-11'
]);
const FALLBACK_WHEELCHAIR = new Set(['A-14', 'J-14']);

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    movie,
    showtime,
    showtimeId,
    screenId,
    cinema,
    date,
  } = location.state || {
    movie: { title: 'CRIME 101', genre: 'Crime, Thriller', duration: '139MIN', language: 'English', poster: null },
    showtime: '4:45 PM',
    cinema: 'AMC PACIFIC PLACE 11',
    date: 'FRI 04/24',
  };

  const [selected, setSelected]       = useState(new Set());
  const [seats, setSeats]             = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError]     = useState('');

  // Fetch seats from backend
  useEffect(() => {
    const fetchSeats = async () => {
      if (!screenId) {
        setUsingFallback(true);
        setLoadingSeats(false);
        return;
      }

      try {
        const token = localStorage.getItem('tickr_token');
        const res = await fetch(`${API_BASE}/api/public/seats/screen/${screenId}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });

        if (!res.ok) throw new Error('Failed to fetch seats');

        const data = await res.json();

        if (!data || data.length === 0) {
          setUsingFallback(true);
        } else {
          setSeats(data);
        }
      } catch (err) {
        console.error('Error fetching seats:', err);
        setUsingFallback(true);
      } finally {
        setLoadingSeats(false);
      }
    };

    fetchSeats();
  }, [screenId]);

  // ---- SEAT TOGGLE ----
  const toggleSeat = (seatId) => {
    if (usingFallback) {
      if (FALLBACK_UNAVAILABLE.has(seatId)) return;
    } else {
      const seat = seats.find(s => getSeatLabel(s) === seatId);
      if (!seat || seat.status === 'booked' || seat.status === 'unavailable') return;
    }

    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(seatId)) next.delete(seatId);
      else next.add(seatId);
      return next;
    });
  };

  // Get label for a backend seat (e.g. "A-1")
  const getSeatLabel = (seat) => {
    if (seat.seatLabel) return seat.seatLabel;
    if (seat.rowLabel && seat.seatNumber) return `${seat.rowLabel}-${seat.seatNumber}`;
    return `${seat.seatId}`;
  };

  // Get seat class for backend seat
  const getBackendSeatClass = (seat) => {
    const label = getSeatLabel(seat);
    if (selected.has(label)) return 'seat selected';
    if (seat.seatType === 'wheelchair' || seat.seatType === 'accessible') return 'seat wheelchair';
    if (seat.status === 'booked' || seat.status === 'unavailable') return 'seat unavailable';
    return 'seat available';
  };

  // Get seat class for fallback seat
  const getFallbackSeatClass = (seatId) => {
    if (FALLBACK_WHEELCHAIR.has(seatId)) return 'seat wheelchair';
    if (FALLBACK_UNAVAILABLE.has(seatId)) return 'seat unavailable';
    if (selected.has(seatId)) return 'seat selected';
    return 'seat available';
  };

  const totalPrice   = selected.size * TICKET_PRICE;
  const selectedList = [...selected].sort().join(', ');

  // ---- CONFIRM BOOKING ----
  const handleConfirmBooking = async () => {
    if (selected.size === 0) return;
    setBookingLoading(true);
    setBookingError('');

    try {
      const token  = localStorage.getItem('tickr_token');
      const user   = JSON.parse(localStorage.getItem('tickr_user') || '{}');

      if (!token || !user.userId) {
        setBookingError('You must be logged in to book tickets.');
        setBookingLoading(false);
        return;
      }

      const bookingData = {
        user:       { userId: user.userId },
        showtime:   showtimeId ? { showtimeId } : null,
        seatLabels: [...selected],
        totalPrice,
        status:     'confirmed',
      };

      const res = await fetch(`${API_BASE}/api/user/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      if (res.ok) {
        setBookingSuccess(true);
      } else {
        const data = await res.json();
        setBookingError(data.message || 'Booking failed. Please try again.');
      }
    } catch (err) {
      console.error('Booking error:', err);
      setBookingError('Unable to connect to server. Please try again.');
    } finally {
      setBookingLoading(false);
    }
  };

  // ---- BOOKING SUCCESS SCREEN ----
  if (bookingSuccess) {
    return (
      <div className="seat-page">
        <nav className="seat-nav">
          <div className="seat-nav-inner">
            <span className="seat-logo" onClick={() => navigate('/')}>TICKR</span>
          </div>
        </nav>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '64px 40px', gap: '20px', textAlign: 'center'
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: '#e63946', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: '700'
          }}>✓</div>
          <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '40px', letterSpacing: '4px', margin: 0 }}>
            BOOKING CONFIRMED
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '14px', maxWidth: '400px' }}>
            Your seats {selectedList} have been booked for {movie.title} at {cinema} on {date} at {showtime}.
          </p>
          <p style={{ color: '#e63946', fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', letterSpacing: '2px' }}>
            TOTAL: ${totalPrice}
          </p>
          <button
            className="booking-confirm-btn"
            style={{ marginTop: '12px' , maxWidth: '300px'}}
            onClick={() => navigate('/')}
          >
            BACK TO HOME
          </button>
        </div>
        <footer className="seat-footer">
          <span className="seat-footer-logo">TICKR</span>
          <p>© 2025 Tickr. All rights reserved.</p>
        </footer>
      </div>
    );
  }

  return (
    <div className="seat-page">

      {/* Navbar */}
      <nav className="seat-nav">
        <div className="seat-nav-inner">
          <span className="seat-logo" onClick={() => navigate('/')}>TICKR</span>
          <div className="seat-nav-links">
            <span onClick={() => navigate('/')}>Home</span>
            <span onClick={() => navigate('/movies')}>Movies</span>
            <span onClick={() => navigate('/locations')}>Cinemas</span>
            <span onClick={() => navigate('/offers')}>Offers</span>
          </div>
          <button className="seat-nav-signin" onClick={() => navigate('/')}>SIGN IN</button>
        </div>
      </nav>

      {/* Back button */}
      <button className="seat-back-btn" onClick={() => navigate(-1)}>← Back</button>

      {/* Main layout */}
      <div className="seat-main">

        {/* Left: Cinema + Seat Grid */}
        <div className="seat-grid-section">

          {/* Screen */}
          <div className="screen-wrapper">
            <div className="screen-curve" />
            <p className="screen-label">SCREEN</p>
          </div>

          {/* Loading */}
          {loadingSeats ? (
            <div style={{ color: 'rgba(255,255,255,0.4)', fontFamily: 'Bebas Neue, sans-serif', fontSize: '18px', letterSpacing: '3px', padding: '40px 0' }}>
              LOADING SEATS...
            </div>
          ) : usingFallback ? (
            /* Fallback Seat Grid */
            <div className="seat-grid">
              {FALLBACK_ROWS.map((row) => (
                <div className="seat-row" key={row}>
                  <span className="row-label">{row}</span>
                  <div className="seat-cols">
                    {Array.from({ length: FALLBACK_COLS }, (_, i) => {
                      const seatId = `${row}-${i + 1}`;
                      return (
                        <button
                          key={seatId}
                          className={getFallbackSeatClass(seatId)}
                          onClick={() => toggleSeat(seatId)}
                          title={seatId}
                        >
                          {FALLBACK_WHEELCHAIR.has(seatId) ? '♿' : ''}
                        </button>
                      );
                    })}
                  </div>
                  <span className="row-label">{row}</span>
                </div>
              ))}
            </div>
          ) : (
            /* Backend Seat Grid */
            <div className="seat-grid">
              {Array.from(new Set(seats.map(s => s.rowLabel || 'A'))).map((row) => (
                <div className="seat-row" key={row}>
                  <span className="row-label">{row}</span>
                  <div className="seat-cols">
                    {seats
                      .filter(s => (s.rowLabel || 'A') === row)
                      .sort((a, b) => (a.seatNumber || 0) - (b.seatNumber || 0))
                      .map((seat) => {
                        const label = getSeatLabel(seat);
                        return (
                          <button
                            key={seat.seatId}
                            className={getBackendSeatClass(seat)}
                            onClick={() => toggleSeat(label)}
                            title={label}
                          >
                            {(seat.seatType === 'wheelchair' || seat.seatType === 'accessible') ? '♿' : ''}
                          </button>
                        );
                      })}
                  </div>
                  <span className="row-label">{row}</span>
                </div>
              ))}
            </div>
          )}

          {/* Legend */}
          <div className="seat-legend">
            <div className="legend-item"><div className="legend-box available" /><span>Available</span></div>
            <div className="legend-item"><div className="legend-box unavailable" /><span>Unavailable</span></div>
            <div className="legend-item"><div className="legend-box selected" /><span>Selected</span></div>
            <div className="legend-item"><div className="legend-box wheelchair" /><span>Wheelchair</span></div>
          </div>
        </div>

        {/* Right: Booking Panel */}
        <div className="booking-panel">
          <h2 className="booking-title">BOOKING DETAILS</h2>

          <div className="booking-poster">
            {movie.poster
              ? <img src={movie.poster} alt={movie.title} />
              : <div className="poster-placeholder"><span>{movie.title}</span></div>
            }
          </div>

          <h3 className="booking-movie-title">{movie.title}</h3>
          <p className="booking-meta">{movie.language} · {movie.duration} · {movie.genre}</p>

          <div className="booking-divider" />

          <div className="booking-info-row">
            <span className="booking-label">CINEMA</span>
            <span className="booking-value">{cinema}</span>
          </div>
          <div className="booking-info-row">
            <span className="booking-label">DATE</span>
            <span className="booking-value">{date}</span>
          </div>
          <div className="booking-info-row">
            <span className="booking-label">TIME</span>
            <span className="booking-value">{showtime}</span>
          </div>

          <div className="booking-divider" />

          <div className="booking-info-row">
            <span className="booking-label">SEATS</span>
            <span className="booking-value seats-value">
              {selected.size > 0 ? selectedList : '—'}
            </span>
          </div>
          <div className="booking-info-row">
            <span className="booking-label">TICKETS</span>
            <span className="booking-value">{selected.size}</span>
          </div>
          <div className="booking-info-row">
            <span className="booking-label">PRICE EACH</span>
            <span className="booking-value">${TICKET_PRICE}.00</span>
          </div>

          <div className="booking-divider" />

          <div className="booking-total-row">
            <span>TOTAL</span>
            <span className="booking-total-price">${totalPrice}.00</span>
          </div>

          {bookingError && (
            <div style={{ fontSize: '12px', color: '#e63946', background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.2)', borderRadius: '2px', padding: '10px 14px' }}>
              {bookingError}
            </div>
          )}

          <button
            className="booking-confirm-btn"
            disabled={selected.size === 0 || bookingLoading}
            onClick={handleConfirmBooking}
          >
            {bookingLoading
              ? 'CONFIRMING...'
              : selected.size === 0
              ? 'SELECT SEATS'
              : `CONFIRM BOOKING — $${totalPrice}`}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="seat-footer">
        <span className="seat-footer-logo">TICKR</span>
        <p>© 2025 Tickr. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SeatSelection;