import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OffersPage.css';
import Footer from './Footer';

const offers = [
  {
    id: 1,
    tag: 'EVERY SATURDAY',
    title: 'STUDENT SATURDAYS',
    subtitle: '$6 Tickets for Students',
    description: 'Show your valid student ID at the box office or enter your student email during checkout to unlock exclusive $6 tickets every Saturday. Available for all standard screenings across all Tickr cinema locations. Combine with snack deals for even more savings on your weekend movie night.',
    image: '/student-saturdays.jpg',
    accent: '#d4af37',
    details: ['Valid student ID required', 'All standard screenings', 'Every Saturday only', 'Cannot combine with other ticket offers']
  },
  {
    id: 2,
    tag: 'GROUPS OF 6+',
    title: 'GROUP BOOKINGS',
    subtitle: '20% Off for Your Crew',
    description: 'Planning a night out with friends, a team outing, or a birthday celebration? Book 6 or more tickets in a single transaction and automatically receive 20% off your total ticket price. Group bookings can be made online or at the box office, and you can choose your seats together so nobody gets separated.',
    image: '/group-bookings.jpg',
    accent: '#e63946',
    details: ['Minimum 6 tickets', '20% off total ticket price', 'Choose seats together', 'Available online & at box office']
  },
  {
    id: 3,
    tag: 'PREMIUM TICKETS',
    title: 'SNACK & SAVE COMBO',
    subtitle: 'Free Popcorn + Drink Included',
    description: 'Upgrade to a premium ticket and get a free large popcorn and drink included with your booking — no vouchers, no hassle. Just show your premium ticket confirmation at the concessions stand and your snacks are on us. Available for all premium and IMAX screenings at participating locations.',
    image: '/snack-combo.jpg',
    accent: '#2ec4b6',
    details: ['Premium ticket required', 'Free large popcorn + drink', 'Valid at concessions stand', 'All premium & IMAX screenings']
  }
];

const OffersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="offers-page">

      {/* Navbar */}
      <nav className="offers-nav">
        <div className="offers-nav-inner">
          <div className="offers-nav-left">
            <span className="offers-nav-link active">Offers & Promotions</span>
            <span className="offers-nav-link" onClick={() => navigate('/movies')}>Movies</span>
          </div>
          <span className="offers-logo" onClick={() => navigate('/')}>Tickr</span>
          <div className="offers-nav-right">
            <span className="offers-nav-link">Private Bookings</span>
            <span className="offers-nav-link">Locations</span>
            <span className="offers-nav-icon">👤</span>
            <span className="offers-nav-icon">🔍</span>
            <span className="offers-nav-icon">☰</span>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="offers-page-header">
        <h1 className="offers-page-heading">OFFERS &<br />PROMOTIONS</h1>
        <p className="offers-page-sub">Exclusive deals for every kind of moviegoer</p>
      </div>

      {/* Offer Rows */}
      <div className="offers-list">
        {offers.map((offer, index) => (
          <div
            key={offer.id}
            className={`offer-row ${index % 2 === 1 ? 'offer-row--reverse' : ''}`}
            style={{ '--accent': offer.accent }}
          >
            {/* Image Side */}
            <div className="offer-row-image">
              <img src={offer.image} alt={offer.title} />
              <div className="offer-row-image-overlay" />
            </div>

            {/* Content Side */}
            <div className="offer-row-content">
              <span className="offer-row-tag">{offer.tag}</span>
              <h2 className="offer-row-title">{offer.title}</h2>
              <p className="offer-row-subtitle">{offer.subtitle}</p>
              <p className="offer-row-desc">{offer.description}</p>

              <ul className="offer-row-details">
                {offer.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>

              <button
                className="offer-row-btn"
                onClick={() => navigate('/movies')}
              >
                BOOK A MOVIE →
              </button>
            </div>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default OffersPage;