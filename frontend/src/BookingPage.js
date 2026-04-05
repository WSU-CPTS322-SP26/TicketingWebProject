import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingPage.css';
import Footer from './Footer';

const BookingPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(0);

  // Movie data
  const movieData = {
    1: { title: 'CRIME 101', image: '/crime101.jpg', bgImage: '/crime101bg.jpg', language: 'ENGLISH', duration: '139MIN', genre: 'CRIME, THRILLER' },
    2: { title: 'HAMNET', image: '/hamnet.jpg', bgImage: '/hamnet.jpg', language: 'ENGLISH', duration: '120MIN', genre: 'DRAMA, BIOGRAPHY' },
    3: { title: 'SEND HELP', image: '/sendhelp.jpg', bgImage: '/sendhelp.jpg', language: 'ENGLISH', duration: '105MIN', genre: 'COMEDY, ADVENTURE' },
    4: { title: 'WUTHERING HEIGHTS', image: '/wuthering.jpg', bgImage: '/wuthering.jpg', language: 'ENGLISH', duration: '142MIN', genre: 'ROMANCE, DRAMA' },
    5: { title: 'MERCY', image: '/mercy.jpg', bgImage: '/mercy.jpg', language: 'ENGLISH', duration: '98MIN', genre: 'SCI-FI, THRILLER' },
    6: { title: 'SCREAM 7', image: '/scream7.jpg', bgImage: '/scream7.jpg', language: 'ENGLISH', duration: '115MIN', genre: 'HORROR, THRILLER' }
  };

  const movie = movieData[movieId] || movieData[1];

  const theaterShowtimes = {
    'AMC Pacific Place 11': {
      0: ['10:00 AM', '1:30 PM', '4:45 PM', '8:15 PM'],
      1: ['9:30 AM', '12:45 PM', '4:00 PM', '7:30 PM', '10:45 PM'],
      2: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM'],
      3: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'],
      4: ['10:00 AM', '1:15 PM', '4:30 PM', '8:00 PM'],
      5: ['9:00 AM', '12:30 PM', '4:00 PM', '7:15 PM', '10:30 PM']
    },
    'Regal Meridian': {
      0: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'],
      1: ['10:30 AM', '1:45 PM', '5:15 PM', '8:45 PM'],
      2: ['9:45 AM', '1:00 PM', '4:30 PM', '8:00 PM', '11:00 PM'],
      3: ['10:15 AM', '1:30 PM', '5:00 PM', '8:30 PM'],
      4: ['11:30 AM', '3:00 PM', '6:30 PM', '10:00 PM'],
      5: ['10:00 AM', '1:00 PM', '4:15 PM', '7:45 PM']
    },
    'Majestic Bay Theatres': {
      0: ['12:00 PM', '3:30 PM', '7:00 PM', '10:15 PM'],
      1: ['11:15 AM', '2:30 PM', '5:45 PM', '9:00 PM'],
      2: ['10:45 AM', '2:15 PM', '5:45 PM', '9:15 PM'],
      3: ['12:30 PM', '4:00 PM', '7:30 PM'],
      4: ['11:00 AM', '2:00 PM', '5:30 PM', '8:45 PM'],
      5: ['10:30 AM', '1:45 PM', '5:00 PM', '8:15 PM', '11:00 PM']
    },
    'Regal Thornton Place': {
      0: ['9:30 AM', '1:00 PM', '4:30 PM', '8:00 PM'],
      1: ['10:00 AM', '1:15 PM', '4:45 PM', '8:15 PM', '11:00 PM'],
      2: ['11:30 AM', '3:00 PM', '6:30 PM', '9:45 PM'],
      3: ['9:45 AM', '1:15 PM', '4:45 PM', '8:15 PM'],
      4: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM'],
      5: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM']
    },
    'AMC Oak Tree 6': {
      0: ['10:15 AM', '1:45 PM', '5:15 PM', '8:45 PM'],
      1: ['9:00 AM', '12:30 PM', '4:00 PM', '7:30 PM'],
      2: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM', '11:15 PM'],
      3: ['11:15 AM', '2:45 PM', '6:15 PM', '9:45 PM'],
      4: ['9:30 AM', '1:00 PM', '4:30 PM', '8:00 PM'],
      5: ['10:45 AM', '2:15 PM', '5:45 PM', '9:15 PM']
    },
    'SIFF Cinema Downtown': {
      0: ['11:30 AM', '3:00 PM', '6:30 PM', '9:45 PM'],
      1: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'],
      2: ['9:30 AM', '12:45 PM', '4:15 PM', '7:45 PM', '10:30 PM'],
      3: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM'],
      4: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'],
      5: ['9:15 AM', '12:30 PM', '4:00 PM', '7:30 PM', '10:45 PM']
    }
  };

  const theaters = [
    { name: 'AMC Pacific Place 11', address: '600 Pine St Ste 400, Seattle, WA 98101' },
    { name: 'Regal Meridian', address: '1501 7th Ave, Seattle, WA 98101' },
    { name: 'Majestic Bay Theatres', address: '2044 NW Market St, Seattle, WA 98107' },
    { name: 'Regal Thornton Place', address: '301 NE 103rd St, Seattle, WA 98125' },
    { name: 'AMC Oak Tree 6', address: '10006 Aurora Ave N, Seattle, WA 98133' },
    { name: 'SIFF Cinema Downtown', address: '2100 4th Ave, Seattle, WA 98121' }
  ];

  const dates = [
    { day: 'Fri', date: '04/03' },
    { day: 'Sat', date: '04/04' },
    { day: 'Sun', date: '04/05' },
    { day: 'Mon', date: '04/06' },
    { day: 'Tue', date: '04/07' },
    { day: 'Wed', date: '04/08' }
  ];

  // ✅ Navigate to seat selection with all movie + showtime info
  const handleShowtimeClick = (time, theaterName, theaterAddress) => {
    navigate('/seats', {
      state: {
        movie: {
          title: movie.title,
          genre: movie.genre,
          duration: movie.duration,
          language: movie.language,
          poster: movie.image,
        },
        showtime: time,
        cinema: theaterName,
        cinemaAddress: theaterAddress,
        date: `${dates[selectedDate].day} ${dates[selectedDate].date}`,
      }
    });
  };

  return (
    <div className="booking-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      {/* Movie Header Section with Background Image */}
      <div
        className="movie-header"
        style={{
          backgroundImage: `url(${movie.bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="movie-header-content">
          <img className="movie-poster" alt={movie.title} src={movie.image} />
          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-details">
              <span className="language">{movie.language}</span>
              <span className="dot"></span>
              <span className="duration">{movie.duration}</span>
              <span className="dot"></span>
              <span className="genre">{movie.genre}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Date Selection */}
      <div className="date-selector-container">
        <div className="date-selector">
          {dates.map((date, index) => (
            <button
              key={index}
              className={`date-button ${selectedDate === index ? 'selected' : ''}`}
              onClick={() => setSelectedDate(index)}
            >
              {date.day}
              <br />
              {date.date}
            </button>
          ))}
        </div>
      </div>

      {/* Theater Listings with Dynamic Showtimes */}
      <div className="theater-listings">
        {theaters.map((theater, index) => (
          <div key={index} className="theater-item">
            <div className="theater-row">
              <div className="theater-info">
                <h3 className="theater-name">{theater.name}</h3>
                <p className="theater-address">{theater.address}</p>
              </div>
              <div className="showtimes">
                {theaterShowtimes[theater.name][selectedDate].map((time, idx) => (
                  // ✅ This is the only change — onClick now navigates to /seats
                  <button
                    key={idx}
                    className="showtime-button"
                    onClick={() => handleShowtimeClick(time, theater.name, theater.address)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            {index < theaters.length - 1 && <div className="divider"></div>}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;