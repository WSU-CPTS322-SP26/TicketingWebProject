import React, { useState } from 'react';
import './HomePage.css';

const movies = [
  {
    id: 1,
    title: 'CRIME 101',
    description: 'A master thief and an insurance broker join forces for a big heist, while a determined detective pursues them to prevent the multi-million dollar crime.',
    image: '/crime101.jpg'
  },
  {
    id: 2,
    title: 'HAMNET',
    description: 'William Shakespeare and his wife, Agnes, celebrate the birth of their son, Hamnet. However, when tragedy strikes and Hamnet dies at a young age, it inspires Shakespeare to write his timeless masterpiece "Hamlet".',
    image: '/hamnet.jpg'
  },
  {
    id: 3,
    title: 'SEND HELP',
    description: 'A woman and her overbearing boss become stranded on a deserted island after a plane crash. They must overcome past grievances and work together to survive, but ultimately, it\'s a battle of wills and wits to make it out alive.',
    image: '/sendhelp.jpg'
  },
  {
    id: 4,
    title: 'WUTHERING HEIGHTS',
    description: 'Tragedy strikes when Heathcliff falls in love with Catherine Earnshaw, a woman from a wealthy family in 18th-century England.',
    image: '/wuthering.jpg'
  },
  {
    id: 5,
    title: 'MERCY',
    description: 'In the near future, an advanced AI judge tells a captive detective that he\'s on trial for the murder of his wife. If he fails to prove his innocence within 90 minutes, he\'ll be executed on the spot.',
    image: '/mercy.jpg'
  },
  {
    id: 6,
    title: 'SCREAM 7',
    description: 'When a new Ghostface killer emerges in the quiet town where Sidney has built a new life, her darkest fears are realized as her daughter becomes the next target.',
    image: '/scream7.jpg'
  }
];

const HomePage = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const scroll = (direction) => {
    const container = document.querySelector('.movies-scroll');
    const scrollAmount = 790;
    
    if (direction === 'next') {
      container.scrollLeft += scrollAmount;
    } else {
      container.scrollLeft -= scrollAmount;
    }
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log('Signing in with:', email, password);
    setShowSignIn(false);
  };

  return (
    <div className="frame">
      {/* Navbar */}
      <div className="navbar">
        <div className="offers-promotions">Offers & Promotions</div>
        <div className="text-wrapper-2">Movies</div>
        <div className="text-wrapper">Tickr</div>
        <div className="text-wrapper-3">Private Bookings</div>
        <div className="text-wrapper-4">Locations</div>
        
        {/* User Icon */}
        <div className="black-male-user" onClick={() => setShowSignIn(true)}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="8" r="4" stroke="white" strokeWidth="2"/>
            <path d="M4 20C4 16.6863 6.68629 14 10 14H14C17.3137 14 20 16.6863 20 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Search Icon */}
        <div className="vector">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="6" stroke="white" strokeWidth="2"/>
            <path d="M20 20L17 17" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Menu Icon */}
        <div className="group-2">
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="1" x2="15" y2="1" stroke="white" strokeWidth="2"/>
            <line x1="0" y1="7" x2="15" y2="7" stroke="white" strokeWidth="2"/>
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
                <div className="book-now-group">
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

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          {/* Left Column */}
          <div className="footer-column">
            <div className="footer-logo">
              <h2>TICKR</h2>
              <p>TICKETING MADE EASY</p>
            </div>
            <div className="footer-links">
              <a href="#privacy">PRIVACY POLICY</a>
              <a href="#faqs">FAQs</a>
              <a href="#terms">TERMS & CONDITIONS</a>
            </div>
          </div>

          {/* Middle Column */}
          <div className="footer-column">
            <h3>DOWNLOAD OUR APP NOW!</h3>
            <div className="app-buttons">
              <a href="https://play.google.com/store" className="app-btn google-play" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
              </a>
              <a href="https://www.apple.com/app-store/" className="app-btn app-store" target="_blank" rel="noopener noreferrer">
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" />
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="footer-column">
            <div className="footer-links">
              <a href="#about">ABOUT US</a>
              <a href="#careers">CAREERS</a>
              <a href="#contact">CONTACT US</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sign In Modal */}
      {showSignIn && (
        <div className="signin-overlay" onClick={() => setShowSignIn(false)}>
          <div className="signin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>SIGN IN</h2>
            <form onSubmit={handleSignIn}>
              <div className="input-group">
                <label>EMAIL</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label>PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="signin-btn">SIGN IN</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;


