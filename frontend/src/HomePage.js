import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Footer from './Footer';
import TickrAnimation from './TickrAnimation';

const movies = [
  {
    id: 1,
    title: 'CRIME 101',
    description: 'A master thief and an insurance broker join forces for a big heist, while a determined detective pursues them to prevent the multi-million-dollar crime.',
    image: '/crime101.jpg',
    genre: 'Crime, Thriller',
    duration: '139min'
  },
  {
    id: 2,
    title: 'HAMNET',
    description: 'William Shakespeare and his wife, Agnes, celebrate the birth of their son, Hamnet. However, when tragedy strikes and Hamnet dies at a young age, it inspires Shakespeare to write his timeless masterpiece "Hamlet".',
    image: '/hamnet.jpg',
    genre: 'Drama, Biography',
    duration: '120min'
  },
  {
    id: 3,
    title: 'SEND HELP',
    description: 'A woman and her overbearing boss become stranded on a deserted island after a plane crash. They must overcome past grievances and work together to survive, but ultimately, it\'s a battle of wills and wits to make it out alive.',
    image: '/sendhelp.jpg',
    genre: 'Comedy, Adventure',
    duration: '105min'
  },
  {
    id: 4,
    title: 'WUTHERING HEIGHTS',
    description: 'Tragedy strikes when Heathcliff falls in love with Catherine Earnshaw, a woman from a wealthy family in 18th-century England.',
    image: '/wuthering.jpg',
    genre: 'Romance, Drama',
    duration: '142min'
  },
  {
    id: 5,
    title: 'MERCY',
    description: 'In the near future, an advanced AI judge tells a captive detective that he\'s on trial for the murder of his wife. If he fails to prove his innocence within 90 minutes, he\'ll be executed on the spot.',
    image: '/mercy.jpg',
    genre: 'Sci-Fi, Thriller',
    duration: '98min'
  },
  {
    id: 6,
    title: 'SCREAM 7',
    description: 'When a new Ghostface killer emerges in the quiet town where Sidney has built a new life, her darkest fears are realized as her daughter becomes the next target.',
    image: '/scream7.jpg',
    genre: 'Horror, Thriller',
    duration: '115min'
  }
];

const menuLinks = [
  { label: 'Home',                path: '/' },
  { label: 'Movies',              path: '/movies' },
  { label: 'Offers & Promotions', path: '/offers' },
  { label: 'Locations',           path: '/locations' },
  { label: 'Private Bookings',    path: '/private-booking' },
  { label: 'My Bookings',         path: '/my-bookings' },
];

const HomePage = () => {
  const [showAnimation, setShowAnimation] = useState(() => {
    return sessionStorage.getItem('animationPlayed') !== 'true';
  });
  const [showMenu, setShowMenu] = useState(false);

  // Search state
  const [searchOpen, setSearchOpen]   = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef                     = useRef(null);
  const inputRef                      = useRef(null);

  const navigate = useNavigate();

  // Get logged in user
  const user = JSON.parse(localStorage.getItem('tickr_user') || '{}');

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Sign out
  const handleSignOut = () => {
    localStorage.removeItem('tickr_token');
    localStorage.removeItem('tickr_user');
    sessionStorage.removeItem('animationPlayed');
    setShowMenu(false);
    navigate('/auth');
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus input when search opens
  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  // Filter movies by title or genre
  const searchResults = searchQuery.trim().length > 0
    ? movies.filter(m =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleSearchSelect = (movie) => {
    setSearchOpen(false);
    setSearchQuery('');
    navigate(`/booking/${movie.id}`);
  };

  const handleAnimationComplete = () => {
    sessionStorage.setItem('animationPlayed', 'true');
    setShowAnimation(false);
  };

  const scroll = (direction) => {
    const container = document.querySelector('.movies-scroll');
    const scrollAmount = 790;
    if (direction === 'next') container.scrollLeft += scrollAmount;
    else container.scrollLeft -= scrollAmount;
  };

  const handleMenuNav = (path) => {
    setShowMenu(false);
    navigate(path);
  };

  return (
    <>
      {showAnimation && (
        <TickrAnimation onComplete={handleAnimationComplete} />
      )}

      {!showAnimation && (
        <div className="frame">

          {/* Navbar */}
          <div className="navbar">
            <div
              className="offers-promotions"
              onClick={() => navigate('/offers')}
              style={{ cursor: 'pointer' }}
            >
              Offers & Promotions
            </div>
            <div
              className="text-wrapper-2"
              onClick={() => navigate('/movies')}
              style={{ cursor: 'pointer' }}
            >
              Movies
            </div>
            <div className="text-wrapper">Tickr</div>
            <div
              className="text-wrapper-3"
              onClick={() => navigate('/private-booking')}
              style={{ cursor: 'pointer' }}
            >
              Private Bookings
            </div>
            <div
              className="text-wrapper-4"
              onClick={() => navigate('/locations')}
              style={{ cursor: 'pointer' }}
            >
              Locations
            </div>

            {/* User Icon — shows initials avatar if logged in */}
            <div
              className="black-male-user"
              onClick={() => navigate('/my-bookings')}
              title={user.name ? `Logged in as ${user.name}` : 'My Account'}
              style={{ cursor: 'pointer' }}
            >
              {user.name ? (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: '#e63946',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontWeight: '700',
                  letterSpacing: '1px',
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {getInitials(user.name)}
                </div>
              ) : (
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
                  <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              )}
            </div>

            {/* Search Icon + Dropdown */}
            <div className="search-wrapper" ref={searchRef}>
              <div
                className="vector"
                onClick={() => setSearchOpen(prev => !prev)}
                style={{ cursor: 'pointer' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="6" stroke="white" strokeWidth="2"/>
                  <path d="M20 20L17 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              {/* Search Dropdown */}
              {searchOpen && (
                <div className="search-dropdown">
                  <div className="search-input-wrapper">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="search-input-icon">
                      <circle cx="11" cy="11" r="6" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
                      <path d="M20 20L17 17" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <input
                      ref={inputRef}
                      type="text"
                      className="search-input"
                      placeholder="Search movies or genres..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <button className="search-clear" onClick={() => setSearchQuery('')}>✕</button>
                    )}
                  </div>

                  <div className="search-results">
                    {searchQuery.trim() === '' && (
                      <div className="search-hint">Start typing to search movies...</div>
                    )}

                    {searchQuery.trim() !== '' && searchResults.length === 0 && (
                      <div className="search-no-results">
                        <span className="search-no-results-icon">🎬</span>
                        <span>No results found for "<strong>{searchQuery}</strong>"</span>
                      </div>
                    )}

                    {searchResults.map(movie => (
                      <div
                        key={movie.id}
                        className="search-result-item"
                        onClick={() => handleSearchSelect(movie)}
                      >
                        <div className="search-result-poster">
                          <img src={movie.image} alt={movie.title} />
                        </div>
                        <div className="search-result-info">
                          <span className="search-result-title">{movie.title}</span>
                          <span className="search-result-meta">{movie.genre} · {movie.duration}</span>
                        </div>
                        <span className="search-result-arrow">→</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Menu Icon */}
            <div className="group-2" onClick={() => setShowMenu(true)} style={{ cursor: 'pointer' }}>
              <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                <line x1="0" y1="1"  x2="15" y2="1"  stroke="white" strokeWidth="2"/>
                <line x1="0" y1="7"  x2="15" y2="7"  stroke="white" strokeWidth="2"/>
                <line x1="0" y1="13" x2="15" y2="13" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
          </div>

          {/* Movies Container */}
          <div className="movies-container">
            <button className="scroll-btn prev" onClick={() => scroll('prev')}>‹</button>
            <div className="movies-scroll">
              {movies.map((movie) => (
                <div key={movie.id} className="movie-card-figma">
                  <img src={movie.image} alt={movie.title} className="movie-image" />
                  <div className="movie-overlay">
                    <h2 className="movie-title">{movie.title}</h2>
                    <p className="movie-description">{movie.description}</p>
                    <div className="book-now-group" onClick={() => navigate(`/booking/${movie.id}`)}>
                      <div className="book-now-rectangle" />
                      <div className="book-now-text">BOOK NOW</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="scroll-btn next" onClick={() => scroll('next')}>›</button>
          </div>

          {/* Offers & Promotions Section */}
          <div className="offers-section">
            <h2 className="section-title">OFFERS & PROMOTIONS</h2>
            <div className="offers-grid">
              <div className="offer-card">
                <div className="offer-image">
                  <img src="/student-saturdays.jpg" alt="Student Saturdays" />
                </div>
                <h3>STUDENT SATURDAYS</h3>
                <p>Get exclusive student discounts every Saturday on movie tickets and snacks.</p>
              </div>
              <div className="offer-card">
                <div className="offer-image">
                  <img src="/group-bookings.jpg" alt="Group Bookings" />
                </div>
                <h3>GROUP BOOKINGS</h3>
                <p>Book tickets with friends and unlock exclusive group discounts on your total.</p>
              </div>
              <div className="offer-card">
                <div className="offer-image">
                  <img src="/snack-combo.jpg" alt="Snack & Save Combo" />
                </div>
                <h3>SNACK & SAVE COMBO</h3>
                <p>Get a free popcorn + drink with every premium ticket.</p>
              </div>
            </div>
          </div>

          <Footer />

          {/* Slide-out Menu */}
          <div
            className={`menu-backdrop ${showMenu ? 'menu-backdrop--visible' : ''}`}
            onClick={() => setShowMenu(false)}
          />
          <div className={`menu-panel ${showMenu ? 'menu-panel--open' : ''}`}>
            <button className="menu-close" onClick={() => setShowMenu(false)}>✕</button>
            <div className="menu-logo">Tickr</div>

            {/* User greeting in menu */}
            {user.name && (
              <div style={{
                marginBottom: '24px',
                padding: '12px 16px',
                background: 'rgba(255,255,255,0.04)',
                borderRadius: '3px',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#e63946',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontFamily: 'Bebas Neue, sans-serif',
                  letterSpacing: '1px',
                  color: '#fff',
                  flexShrink: 0,
                }}>
                  {getInitials(user.name)}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>
                    Signed in as
                  </p>
                  <p style={{ margin: '3px 0 0', fontSize: '14px', fontWeight: '600', color: '#fff', letterSpacing: '0.5px' }}>
                    {user.name}
                  </p>
                </div>
              </div>
            )}

            <nav className="menu-links">
              {menuLinks.map((link, i) => (
                <button
                  key={i}
                  className="menu-link"
                  onClick={() => handleMenuNav(link.path)}
                >
                  <span className="menu-link-number">0{i + 1}</span>
                  {link.label}
                </button>
              ))}
            </nav>
            <div className="menu-divider" />

            {/* Sign Out button */}
            <button className="menu-signin" onClick={handleSignOut}>
              SIGN OUT
            </button>

            <p className="menu-footer-note">© 2025 Tickr. All rights reserved.</p>
          </div>

        </div>
      )}
    </>
  );
};

export default HomePage;