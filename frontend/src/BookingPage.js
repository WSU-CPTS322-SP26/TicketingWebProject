import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingPage.css';
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

const generateDates = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 6; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day   = String(d.getDate()).padStart(2, '0');
    dates.push({
      day: days[d.getDay()],
      date: `${month}/${day}`,
      full: d.toISOString().split('T')[0],
    });
  }
  return dates;
};

const dates = generateDates();

const formatTime = (timeStr) => {
  if (!timeStr) return '';
  const [h, m] = timeStr.split(':');
  const hour = parseInt(h);
  const min  = m || '00';
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${min} ${ampm}`;
};

const BookingPage = () => {
  const { movieId } = useParams();
  const navigate    = useNavigate();

  const [selectedDate, setSelectedDate]     = useState(0);
  const [movie, setMovie]                   = useState(null);
  const [showtimes, setShowtimes]           = useState([]);
  const [loadingMovie, setLoadingMovie]     = useState(true);
  const [loadingShowtimes, setLoadingShowtimes] = useState(true);

  // Fetch movie details
  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const token = localStorage.getItem('tickr_token');
        const res = await fetch(`${API_BASE}/api/public/movies/${movieId}`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });
        if (!res.ok) throw new Error('Movie not found');
        const data = await res.json();
        setMovie({
          title:    data.title?.toUpperCase() || '',
          image:    posterMap[data.title?.toUpperCase()] || '/crime101.jpg',
          bgImage:  posterMap[data.title?.toUpperCase()] || '/crime101.jpg',
          language: data.language?.toUpperCase() || 'ENGLISH',
          duration: data.duration ? `${data.duration}MIN` : data.durationMinutes ? `${data.durationMinutes}MIN` : '',
          genre:    data.genre?.toUpperCase() || '',
        });
      } catch (err) {
        console.error('Error fetching movie:', err);
        setMovie({
          title:    'MOVIE NOT FOUND',
          image:    '/crime101.jpg',
          bgImage:  '/crime101.jpg',
          language: '',
          duration: '',
          genre:    '',
        });
      } finally {
        setLoadingMovie(false);
      }
    };
    fetchMovie();
  }, [movieId]);

  // Fetch showtimes for selected date
  useEffect(() => {
    const fetchShowtimes = async () => {
      setLoadingShowtimes(true);
      try {
        const token = localStorage.getItem('tickr_token');
        const selectedFullDate = dates[selectedDate].full;
        const res = await fetch(
          `${API_BASE}/api/public/showtimes/movie/${movieId}/date?date=${selectedFullDate}`,
          { headers: token ? { 'Authorization': `Bearer ${token}` } : {} }
        );
        if (!res.ok) throw new Error('Failed to fetch showtimes');
        const data = await res.json();
        setShowtimes(data);
      } catch (err) {
        console.error('Error fetching showtimes:', err);
        setShowtimes([]);
      } finally {
        setLoadingShowtimes(false);
      }
    };
    fetchShowtimes();
  }, [movieId, selectedDate]);

  // Dynamically group showtimes by theater from backend data
  const theatersWithShowtimes = [];
  const theaterMap = new Map();

  showtimes.forEach(s => {
    const theaterName = s.theaterName || s.screen?.theater?.name || 'Unknown Theater';
    const screenId = s.screen?.screenId || s.screenId || null;

    if (!theaterMap.has(theaterName)) {
      theaterMap.set(theaterName, {
        name: theaterName,
        address: '',
        screenId: screenId,
        showtimes: []
      });
    }

    theaterMap.get(theaterName).showtimes.push({
      time: formatTime(s.showTime || s.startTime || s.time),
      showtimeId: s.showtimeId || s.id,
      screenId: screenId,
    });
  });

  // Convert map to array for rendering
  theaterMap.forEach((value) => {
    theatersWithShowtimes.push(value);
  });

  const handleShowtimeClick = (timeObj, theaterName) => {
    if (!movie) return;
    navigate('/seats', {
      state: {
        movie: {
          title:    movie.title,
          genre:    movie.genre,
          duration: movie.duration,
          language: movie.language,
          poster:   movie.image,
        },
        showtime:      timeObj.time,
        showtimeId:    timeObj.showtimeId,
        screenId:      timeObj.screenId,
        cinema:        theaterName,
        cinemaAddress: '',
        date:          `${dates[selectedDate].day} ${dates[selectedDate].date}`,
      }
    });
  };

  if (loadingMovie) {
    return (
      <div className="booking-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p style={{ color: '#fff', fontFamily: 'Bebas Neue', fontSize: '24px', letterSpacing: '4px' }}>LOADING...</p>
      </div>
    );
  }

  return (
    <div className="booking-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      {/* Movie Header */}
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

      {/* Theater Listings — built dynamically from backend showtimes */}
      <div className="theater-listings">
        {loadingShowtimes ? (
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '1px', textAlign: 'center', padding: '40px' }}>
            Loading showtimes...
          </div>
        ) : theatersWithShowtimes.length === 0 ? (
          <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '1px', textAlign: 'center', padding: '40px' }}>
            No showtimes available for this date
          </div>
        ) : (
          theatersWithShowtimes.map((theater, index) => (
            <div key={index} className="theater-item">
              <div className="theater-row">
                <div className="theater-info">
                  <h3 className="theater-name">{theater.name}</h3>
                  {theater.address && <p className="theater-address">{theater.address}</p>}
                </div>
                <div className="showtimes">
                  {theater.showtimes.map((timeObj, idx) => (
                    <button
                      key={idx}
                      className="showtime-button"
                      onClick={() => handleShowtimeClick(timeObj, theater.name)}
                    >
                      {timeObj.time}
                    </button>
                  ))}
                </div>
              </div>
              {index < theatersWithShowtimes.length - 1 && <div className="divider"></div>}
            </div>
          ))
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;