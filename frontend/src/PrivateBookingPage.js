import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrivateBookingPage.css';
import Footer from './Footer';

const theatreSizes = [
  {
    id: 'small',
    label: 'SMALL',
    seats: 20,
    price: 199,
    description: 'Perfect for intimate gatherings, date nights, or small group celebrations.',
    perks: ['20 premium recliner seats', 'Private screen', 'Dedicated host', 'Custom welcome message'],
  },
  {
    id: 'medium',
    label: 'MEDIUM',
    seats: 50,
    price: 399,
    description: 'Ideal for birthday parties, corporate events, or mid-size group outings.',
    perks: ['50 premium recliner seats', 'Private screen', 'Dedicated host', 'Custom welcome message', 'Pre-show slideshow'],
  },
  {
    id: 'large',
    label: 'LARGE',
    seats: 100,
    price: 699,
    description: 'The full experience — for big celebrations, company events, or large group screenings.',
    perks: ['100 premium recliner seats', 'Private screen', 'Dedicated host', 'Custom welcome message', 'Pre-show slideshow', 'Red carpet entrance'],
  },
];

const foodCombos = [
  {
    id: 'basic',
    label: 'BASIC',
    price: 12,
    unit: 'per person',
    description: 'Classic movie snacks to keep everyone happy.',
    includes: ['Large popcorn', 'Soft drink (choice of 3)', 'Candy selection'],
  },
  {
    id: 'premium',
    label: 'PREMIUM',
    price: 22,
    unit: 'per person',
    description: 'Elevated snacking with a little something extra.',
    includes: ['Large popcorn', 'Soft drink or juice', 'Loaded nachos', 'Chocolate bar'],
  },
  {
    id: 'deluxe',
    label: 'DELUXE',
    price: 38,
    unit: 'per person',
    description: 'Full snack bar experience — no one goes hungry.',
    includes: ['Large popcorn', 'Premium drink (incl. alcohol options)', 'Loaded nachos', 'Hot dogs or sliders', 'Dessert platter', 'Unlimited refills'],
  },
];

const movies = [
  { id: 1, title: 'CRIME 101',         genre: 'Crime, Thriller',   duration: '139 MIN' },
  { id: 2, title: 'HAMNET',            genre: 'Drama, Biography',  duration: '120 MIN' },
  { id: 3, title: 'SEND HELP',         genre: 'Comedy, Adventure', duration: '105 MIN' },
  { id: 4, title: 'WUTHERING HEIGHTS', genre: 'Romance, Drama',    duration: '142 MIN' },
  { id: 5, title: 'MERCY',             genre: 'Sci-Fi, Thriller',  duration: '98 MIN'  },
  { id: 6, title: 'SCREAM 7',          genre: 'Horror, Thriller',  duration: '115 MIN' },
];

const posterMap = {
  1: '/crime101.jpg',
  2: '/hamnet.jpg',
  3: '/sendhelp.jpg',
  4: '/wuthering.jpg',
  5: '/mercy.jpg',
  6: '/scream7.jpg',
};

// Generate dates 2 weeks in advance (14 days from today)
const generateDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 14; i <= 27; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      value: d.toISOString().split('T')[0],
      label: d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
    });
  }
  return dates;
};

const availableDates = generateDates();
const timeSlots = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
const STEPS = ['THEATRE SIZE', 'FOOD PACKAGE', 'MOVIE', 'DATE & TIME', 'REVIEW'];

const PrivateBookingPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const canNext = () => {
    if (step === 0) return !!selectedTheatre;
    if (step === 1) return !!selectedFood;
    if (step === 2) return !!selectedMovie;
    if (step === 3) return !!selectedDate && !!selectedTime;
    return true;
  };

  const theatre = theatreSizes.find(t => t.id === selectedTheatre);
  const food = foodCombos.find(f => f.id === selectedFood);
  const movie = movies.find(m => m.id === selectedMovie);
  const seats = theatre?.seats || 0;
  const total = theatre && food ? theatre.price + food.price * seats : 0;

  const handleConfirm = () => setConfirmed(true);

  // ---- CONFIRMATION SCREEN ----
  if (confirmed) {
    return (
      <div className="pb-page">
        <nav className="pb-nav">
          <div className="pb-nav-inner">
            <div className="pb-nav-left">
              <span className="pb-nav-link" onClick={() => navigate('/offers')}>Offers & Promotions</span>
              <span className="pb-nav-link" onClick={() => navigate('/movies')}>Movies</span>
            </div>
            <span className="pb-logo" onClick={() => navigate('/')}>Tickr</span>
            <div className="pb-nav-right">
              <span className="pb-nav-link active">Private Bookings</span>
              <span className="pb-nav-link" onClick={() => navigate('/locations')}>Locations</span>
              <span className="pb-nav-icon">👤</span>
              <span className="pb-nav-icon">🔍</span>
              <span className="pb-nav-icon">☰</span>
            </div>
          </div>
        </nav>
        <div className="pb-confirmed">
          <div className="pb-confirmed-inner">
            <div className="pb-confirmed-icon">✓</div>
            <h1>BOOKING CONFIRMED</h1>
            <p>Your private screening has been reserved. A confirmation will be sent to your email.</p>
            <div className="pb-confirmed-summary">
              <div className="pb-summary-row"><span>MOVIE</span><span>{movie?.title}</span></div>
              <div className="pb-summary-row"><span>THEATRE</span><span>{theatre?.label} — {theatre?.seats} seats</span></div>
              <div className="pb-summary-row"><span>PACKAGE</span><span>{food?.label}</span></div>
              <div className="pb-summary-row"><span>DATE</span><span>{selectedDate}</span></div>
              <div className="pb-summary-row"><span>TIME</span><span>{selectedTime}</span></div>
              <div className="pb-summary-row total"><span>TOTAL</span><span>${total.toLocaleString()}</span></div>
            </div>
            <button className="pb-btn" onClick={() => navigate('/')}>BACK TO HOME</button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // ---- MAIN PAGE ----
  return (
    <div className="pb-page">

      {/* Navbar */}
      <nav className="pb-nav">
        <div className="pb-nav-inner">
          <div className="pb-nav-left">
            <span className="pb-nav-link" onClick={() => navigate('/offers')}>Offers & Promotions</span>
            <span className="pb-nav-link" onClick={() => navigate('/movies')}>Movies</span>
          </div>
          <span className="pb-logo" onClick={() => navigate('/')}>Tickr</span>
          <div className="pb-nav-right">
            <span className="pb-nav-link active">Private Bookings</span>
            <span className="pb-nav-link" onClick={() => navigate('/locations')}>Locations</span>
            <span className="pb-nav-icon">👤</span>
            <span className="pb-nav-icon">🔍</span>
            <span className="pb-nav-icon">☰</span>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="pb-header">
        <h1 className="pb-heading">PRIVATE<br />BOOKINGS</h1>
        <p className="pb-sub">Reserve your own screen — your movie, your way</p>
      </div>

      {/* Stepper */}
      <div className="pb-stepper-wrapper">
        <div className="pb-stepper">
          {STEPS.map((s, i) => (
            <div key={i} className={`pb-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
              <div className="pb-step-dot">{i < step ? '✓' : i + 1}</div>
              <span className="pb-step-label">{s}</span>
              {i < STEPS.length - 1 && <div className="pb-step-line" />}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="pb-content">

        {/* STEP 0 — Theatre Size */}
        {step === 0 && (
          <div className="pb-section">
            <h2 className="pb-section-title">SELECT THEATRE SIZE</h2>
            <div className="pb-cards">
              {theatreSizes.map(t => (
                <div
                  key={t.id}
                  className={`pb-card ${selectedTheatre === t.id ? 'pb-card--selected' : ''}`}
                  onClick={() => setSelectedTheatre(t.id)}
                >
                  <div className="pb-card-top">
                    <span className="pb-card-label">{t.label}</span>
                    <span className="pb-card-seats">{t.seats} SEATS</span>
                  </div>
                  <p className="pb-card-price">${t.price}<span>/booking</span></p>
                  <p className="pb-card-desc">{t.description}</p>
                  <ul className="pb-card-perks">
                    {t.perks.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                  {selectedTheatre === t.id && <div className="pb-card-check">✓</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 1 — Food Package */}
        {step === 1 && (
          <div className="pb-section">
            <h2 className="pb-section-title">SELECT FOOD PACKAGE</h2>
            <div className="pb-cards">
              {foodCombos.map(f => (
                <div
                  key={f.id}
                  className={`pb-card ${selectedFood === f.id ? 'pb-card--selected' : ''}`}
                  onClick={() => setSelectedFood(f.id)}
                >
                  <div className="pb-card-top">
                    <span className="pb-card-label">{f.label}</span>
                  </div>
                  <p className="pb-card-price">${f.price}<span>/{f.unit}</span></p>
                  <p className="pb-card-desc">{f.description}</p>
                  <ul className="pb-card-perks">
                    {f.includes.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                  {selectedFood === f.id && <div className="pb-card-check">✓</div>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 2 — Movie */}
        {step === 2 && (
          <div className="pb-section">
            <h2 className="pb-section-title">SELECT A MOVIE</h2>
            <div className="pb-movie-grid">
              {movies.map(m => (
                <div
                  key={m.id}
                  className={`pb-movie-card ${selectedMovie === m.id ? 'pb-movie-card--selected' : ''}`}
                  onClick={() => setSelectedMovie(m.id)}
                >
                  <div className="pb-movie-poster">
                    <img src={posterMap[m.id]} alt={m.title} />
                    {selectedMovie === m.id && <div className="pb-movie-selected-overlay">✓</div>}
                  </div>
                  <div className="pb-movie-info">
                    <h3>{m.title}</h3>
                    <p>{m.genre} · {m.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — Date & Time */}
        {step === 3 && (
          <div className="pb-section">
            <h2 className="pb-section-title">SELECT DATE & TIME</h2>
            <p className="pb-section-note">Available dates start 2 weeks from today</p>
            <div className="pb-dates">
              {availableDates.map(d => (
                <button
                  key={d.value}
                  className={`pb-date-btn ${selectedDate === d.value ? 'active' : ''}`}
                  onClick={() => setSelectedDate(d.value)}
                >
                  {d.label}
                </button>
              ))}
            </div>
            {selectedDate && (
              <div className="pb-times">
                <h3 className="pb-times-title">SELECT A TIME</h3>
                <div className="pb-time-slots">
                  {timeSlots.map(t => (
                    <button
                      key={t}
                      className={`pb-time-btn ${selectedTime === t ? 'active' : ''}`}
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 4 — Review */}
        {step === 4 && (
          <div className="pb-section">
            <h2 className="pb-section-title">REVIEW YOUR BOOKING</h2>
            <div className="pb-review">
              <div className="pb-review-block">
                <span className="pb-review-label">MOVIE</span>
                <span className="pb-review-value">{movie?.title}</span>
                <span className="pb-review-meta">{movie?.genre} · {movie?.duration}</span>
              </div>
              <div className="pb-review-divider" />
              <div className="pb-review-block">
                <span className="pb-review-label">THEATRE SIZE</span>
                <span className="pb-review-value">{theatre?.label} — {theatre?.seats} seats</span>
                <span className="pb-review-meta">${theatre?.price} flat booking fee</span>
              </div>
              <div className="pb-review-divider" />
              <div className="pb-review-block">
                <span className="pb-review-label">FOOD PACKAGE</span>
                <span className="pb-review-value">{food?.label}</span>
                <span className="pb-review-meta">${food?.price} × {seats} people = ${food?.price * seats}</span>
              </div>
              <div className="pb-review-divider" />
              <div className="pb-review-block">
                <span className="pb-review-label">DATE & TIME</span>
                <span className="pb-review-value">{selectedDate}</span>
                <span className="pb-review-meta">{selectedTime}</span>
              </div>
              <div className="pb-review-divider" />
              <div className="pb-review-total">
                <span>TOTAL</span>
                <span className="pb-review-total-price">${total.toLocaleString()}</span>
              </div>
              <button className="pb-confirm-btn" onClick={handleConfirm}>
                CONFIRM BOOKING
              </button>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pb-nav-btns">
          {step > 0 && (
            <button className="pb-btn pb-btn--ghost" onClick={() => setStep(s => s - 1)}>
              ← BACK
            </button>
          )}
          {step < STEPS.length - 1 && (
            <button
              className="pb-btn"
              disabled={!canNext()}
              onClick={() => setStep(s => s + 1)}
            >
              NEXT →
            </button>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivateBookingPage;