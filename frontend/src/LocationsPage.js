import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LocationsPage.css';
import Footer from './Footer';

const locations = [
  {
    id: 1,
    name: 'AMC PACIFIC PLACE 11',
    neighborhood: 'Downtown Seattle',
    address: '600 Pine St Ste 400, Seattle, WA 98101',
    phone: '(206) 652-2404',
    hours: [
      { days: 'Mon – Thu', time: '10:00 AM – 11:00 PM' },
      { days: 'Fri – Sat', time: '10:00 AM – 1:00 AM' },
      { days: 'Sunday',    time: '10:00 AM – 11:00 PM' },
    ],
    image: '/amc-pacific.jpg',
    screens: 11,
    features: ['IMAX', 'Dolby', 'Dine-In'],
  },
  {
    id: 2,
    name: 'REGAL MERIDIAN',
    neighborhood: 'Belltown',
    address: '1501 7th Ave, Seattle, WA 98101',
    phone: '(206) 223-9600',
    hours: [
      { days: 'Mon – Thu', time: '11:00 AM – 11:00 PM' },
      { days: 'Fri – Sat', time: '11:00 AM – 12:30 AM' },
      { days: 'Sunday',    time: '11:00 AM – 10:30 PM' },
    ],
    image: '/regal-meridian.jpg',
    screens: 14,
    features: ['4DX', 'RPX', 'Bar & Lounge'],
  },
  {
    id: 3,
    name: 'MAJESTIC BAY THEATRES',
    neighborhood: 'Ballard',
    address: '2044 NW Market St, Seattle, WA 98107',
    phone: '(206) 781-2229',
    hours: [
      { days: 'Mon – Thu', time: '12:00 PM – 10:30 PM' },
      { days: 'Fri – Sat', time: '12:00 PM – 12:00 AM' },
      { days: 'Sunday',    time: '12:00 PM – 10:00 PM' },
    ],
    image: '/majestic-bay.jpg',
    screens: 3,
    features: ['Indie Films', 'Craft Beer', 'Historic Venue'],
  },
  {
    id: 4,
    name: 'REGAL THORNTON PLACE',
    neighborhood: 'Northgate',
    address: '301 NE 103rd St, Seattle, WA 98125',
    phone: '(206) 494-9985',
    hours: [
      { days: 'Mon – Thu', time: '10:30 AM – 11:00 PM' },
      { days: 'Fri – Sat', time: '10:30 AM – 1:00 AM' },
      { days: 'Sunday',    time: '10:30 AM – 11:00 PM' },
    ],
    image: '/regal-thornton.jpg',
    screens: 16,
    features: ['IMAX', 'Stadium Seating', 'Parking'],
  },
  {
    id: 5,
    name: 'AMC OAK TREE 6',
    neighborhood: 'North Seattle',
    address: '10006 Aurora Ave N, Seattle, WA 98133',
    phone: '(206) 527-1748',
    hours: [
      { days: 'Mon – Thu', time: '11:00 AM – 10:30 PM' },
      { days: 'Fri – Sat', time: '11:00 AM – 12:00 AM' },
      { days: 'Sunday',    time: '11:00 AM – 10:30 PM' },
    ],
    image: '/amc-oaktree.jpg',
    screens: 6,
    features: ['Recliner Seats', 'Mobile Ordering', 'Free Parking'],
  },
  {
    id: 6,
    name: 'SIFF CINEMA DOWNTOWN',
    neighborhood: 'Belltown',
    address: '2100 4th Ave, Seattle, WA 98121',
    phone: '(206) 464-5830',
    hours: [
      { days: 'Mon – Thu', time: '12:00 PM – 10:00 PM' },
      { days: 'Fri – Sat', time: '12:00 PM – 11:30 PM' },
      { days: 'Sunday',    time: '12:00 PM – 9:30 PM' },
    ],
    image: '/siff-downtown.jpg',
    screens: 5,
    features: ['Film Festival Venue', 'Art House', 'Members Club'],
  },
];

const movies = [
  { id: 1, title: 'CRIME 101',          genre: 'Crime, Thriller',   duration: '139 MIN', image: '/crime101.jpg',  showtimes: ['10:00 AM', '1:30 PM', '4:45 PM', '8:15 PM'] },
  { id: 2, title: 'HAMNET',             genre: 'Drama, Biography',  duration: '120 MIN', image: '/hamnet.jpg',    showtimes: ['11:00 AM', '2:00 PM', '5:00 PM', '8:00 PM'] },
  { id: 3, title: 'SEND HELP',          genre: 'Comedy, Adventure', duration: '105 MIN', image: '/sendhelp.jpg',  showtimes: ['10:30 AM', '1:00 PM', '3:30 PM', '6:30 PM', '9:00 PM'] },
  { id: 4, title: 'WUTHERING HEIGHTS',  genre: 'Romance, Drama',    duration: '142 MIN', image: '/wuthering.jpg', showtimes: ['12:00 PM', '3:30 PM', '7:15 PM'] },
  { id: 5, title: 'MERCY',              genre: 'Sci-Fi, Thriller',  duration: '98 MIN',  image: '/mercy.jpg',     showtimes: ['11:30 AM', '2:30 PM', '5:30 PM', '8:30 PM'] },
  { id: 6, title: 'SCREAM 7',           genre: 'Horror, Thriller',  duration: '115 MIN', image: '/scream7.jpg',   showtimes: ['1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'] },
];

const LocationsPage = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (loc) => setActiveModal(loc);
  const closeModal = () => setActiveModal(null);

  return (
    <div className="locations-page">

      {/* Navbar */}
      <nav className="locations-nav">
        <div className="locations-nav-inner">
          <div className="locations-nav-left">
            <span className="locations-nav-link" onClick={() => navigate('/offers')}>Offers & Promotions</span>
            <span className="locations-nav-link" onClick={() => navigate('/movies')}>Movies</span>
          </div>
          <span className="locations-logo" onClick={() => navigate('/')}>Tickr</span>
          <div className="locations-nav-right">
            <span className="locations-nav-link" onClick={() => navigate('/private-booking')}>Private Bookings</span>
            <span className="locations-nav-link active">Locations</span>
            <span className="locations-nav-icon">👤</span>
            <span className="locations-nav-icon">🔍</span>
            <span className="locations-nav-icon">☰</span>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="locations-header">
        <h1 className="locations-heading">OUR<br />LOCATIONS</h1>
        <p className="locations-sub">6 cinemas across Seattle — click a location to see showtimes</p>
      </div>

      {/* Location Rows */}
      <div className="locations-list">
        {locations.map((loc, index) => (
          <div
            key={loc.id}
            className={`location-row ${index % 2 === 1 ? 'location-row--reverse' : ''}`}
            onClick={() => openModal(loc)}
          >
            {/* Image Side */}
            <div className="location-row-image">
              <img src={loc.image} alt={loc.name} />
              <div className="location-row-image-overlay" />
              <div className="location-screens-badge">{loc.screens} SCREENS</div>
            </div>

            {/* Content Side */}
            <div className="location-row-content">
              <span className="location-neighborhood">{loc.neighborhood}</span>
              <h2 className="location-name">{loc.name}</h2>

              <div className="location-features">
                {loc.features.map((f, i) => (
                  <span key={i} className="location-feature-tag">{f}</span>
                ))}
              </div>

              <div className="location-contact">
                <div className="location-contact-row">
                  <span className="location-contact-label">ADDRESS</span>
                  <span className="location-contact-value">{loc.address}</span>
                </div>
                <div className="location-contact-row">
                  <span className="location-contact-label">PHONE</span>
                  <span className="location-contact-value">{loc.phone}</span>
                </div>
              </div>

              <div className="location-hours">
                <span className="location-hours-label">OPENING HOURS</span>
                {loc.hours.map((h, i) => (
                  <div key={i} className="location-hours-row">
                    <span className="location-hours-days">{h.days}</span>
                    <span className="location-hours-time">{h.time}</span>
                  </div>
                ))}
              </div>

              <button
                className="location-btn"
                onClick={(e) => { e.stopPropagation(); openModal(loc); }}
              >
                VIEW SHOWTIMES →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeModal && (
        <div className="loc-modal-overlay" onClick={closeModal}>
          <div className="loc-modal" onClick={e => e.stopPropagation()}>

            {/* Modal Header */}
            <div className="loc-modal-header">
              <div>
                <p className="loc-modal-neighborhood">{activeModal.neighborhood}</p>
                <h2 className="loc-modal-title">{activeModal.name}</h2>
                <p className="loc-modal-address">{activeModal.address}</p>
              </div>
              <button className="loc-modal-close" onClick={closeModal}>✕</button>
            </div>

            <div className="loc-modal-divider" />

            {/* Movies + Showtimes */}
            <div className="loc-modal-body">
              {movies.map(movie => (
                <div key={movie.id} className="loc-movie-row">

                  {/* Poster */}
                  <div className="loc-movie-poster">
                    <img src={movie.image} alt={movie.title} />
                  </div>

                  {/* Info */}
                  <div className="loc-movie-info">
                    <h3 className="loc-movie-title">{movie.title}</h3>
                    <p className="loc-movie-meta">{movie.genre} · {movie.duration}</p>
                  </div>

                  {/* Showtimes — clicking goes straight to seat selection */}
                  <div className="loc-showtimes">
                    {movie.showtimes.map(time => (
                      <button
                        key={time}
                        className="loc-showtime-btn"
                        onClick={() => {
                          closeModal();
                          navigate('/seats', {
                            state: {
                              movie: {
                                title: movie.title,
                                genre: movie.genre,
                                duration: movie.duration,
                                language: 'English',
                                poster: movie.image,
                              },
                              showtime: time,
                              cinema: activeModal.name,
                              cinemaAddress: activeModal.address,
                              date: 'Today',
                            }
                          });
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LocationsPage;