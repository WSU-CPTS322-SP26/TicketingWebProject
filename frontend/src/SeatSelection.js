import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SeatSelection.css';

const ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const COLS = 14;
const TICKET_PRICE = 15;

// Pre-define some unavailable seats randomly
const UNAVAILABLE = new Set([
  'A-3', 'A-4', 'B-7', 'B-8', 'C-2', 'C-11',
  'D-5', 'D-6', 'E-9', 'F-1', 'F-13', 'G-4',
  'H-7', 'H-8', 'I-3', 'J-10', 'J-11'
]);

// Wheelchair seats (last seat of rows A and J)
const WHEELCHAIR = new Set(['A-14', 'J-14']);

const SeatSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { movie, showtime, cinema, date } = location.state || {
    movie: { title: 'CRIME 101', genre: 'Crime, Thriller', duration: '139MIN', language: 'English', poster: null },
    showtime: '4:45 PM',
    cinema: 'AMC PACIFIC PLACE 11',
    date: 'FRI 04/03'
  };

  const [selected, setSelected] = useState(new Set());

  const toggleSeat = (seatId) => {
    if (UNAVAILABLE.has(seatId)) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(seatId)) next.delete(seatId);
      else next.add(seatId);
      return next;
    });
  };

  const getSeatClass = (seatId) => {
    if (WHEELCHAIR.has(seatId)) return 'seat wheelchair';
    if (UNAVAILABLE.has(seatId)) return 'seat unavailable';
    if (selected.has(seatId)) return 'seat selected';
    return 'seat available';
  };

  const totalPrice = selected.size * TICKET_PRICE;
  const selectedList = [...selected].sort().join(', ');

  return (
    <div className="seat-page">

      {/* Navbar */}
      <nav className="seat-nav">
        <div className="seat-nav-inner">
          <span className="seat-logo" onClick={() => navigate('/')}>TICKR</span>
          <div className="seat-nav-links">
            <span onClick={() => navigate('/')}>Home</span>
            <span>Movies</span>
            <span>Cinemas</span>
            <span>Offers</span>
          </div>
          <button className="seat-nav-signin">SIGN IN</button>
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

          {/* Seat Grid */}
          <div className="seat-grid">
            {ROWS.map((row) => (
              <div className="seat-row" key={row}>
                <span className="row-label">{row}</span>
                <div className="seat-cols">
                  {Array.from({ length: COLS }, (_, i) => {
                    const seatId = `${row}-${i + 1}`;
                    return (
                      <button
                        key={seatId}
                        className={getSeatClass(seatId)}
                        onClick={() => toggleSeat(seatId)}
                        title={seatId}
                      >
                        {WHEELCHAIR.has(seatId) ? '♿' : ''}
                      </button>
                    );
                  })}
                </div>
                <span className="row-label">{row}</span>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="seat-legend">
            <div className="legend-item">
              <div className="legend-box available" />
              <span>Available</span>
            </div>
            <div className="legend-item">
              <div className="legend-box unavailable" />
              <span>Unavailable</span>
            </div>
            <div className="legend-item">
              <div className="legend-box selected" />
              <span>Selected</span>
            </div>
            <div className="legend-item">
              <div className="legend-box wheelchair" />
              <span>Wheelchair</span>
            </div>
          </div>
        </div>

        {/* Right: Booking Panel */}
        <div className="booking-panel">
          <h2 className="booking-title">BOOKING DETAILS</h2>

          {/* Movie poster placeholder */}
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

          <button
            className="booking-confirm-btn"
            disabled={selected.size === 0}
            onClick={() => alert(`Booking confirmed for seats: ${selectedList}\nTotal: $${totalPrice}`)}
          >
            {selected.size === 0 ? 'SELECT SEATS' : `CONFIRM BOOKING — $${totalPrice}`}
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