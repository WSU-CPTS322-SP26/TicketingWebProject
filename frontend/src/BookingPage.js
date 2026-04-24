import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './BookingPage.css';
import Footer from './Footer';

const API_BASE = 'http://localhost:8080';

// Fallback movie data
const fallbackMovieData = {
  1: { title: 'CRIME 101',          image: '/crime101.jpg',  bgImage: '/crime101bg.jpg', language: 'ENGLISH', duration: '139MIN', genre: 'CRIME, THRILLER' },
  2: { title: 'HAMNET',             image: '/hamnet.jpg',    bgImage: '/hamnet.jpg',     language: 'ENGLISH', duration: '120MIN', genre: 'DRAMA, BIOGRAPHY' },
  3: { title: 'SEND HELP',          image: '/sendhelp.jpg',  bgImage: '/sendhelp.jpg',   language: 'ENGLISH', duration: '105MIN', genre: 'COMEDY, ADVENTURE' },
  4: { title: 'WUTHERING HEIGHTS',  image: '/wuthering.jpg', bgImage: '/wuthering.jpg',  language: 'ENGLISH', duration: '142MIN', genre: 'ROMANCE, DRAMA' },
  5: { title: 'MERCY',              image: '/mercy.jpg',     bgImage: '/mercy.jpg',      language: 'ENGLISH', duration: '98MIN',  genre: 'SCI-FI, THRILLER' },
  6: { title: 'SCREAM 7',           image: '/scream7.jpg',   bgImage: '/scream7.jpg',    language: 'ENGLISH', duration: '115MIN', genre: 'HORROR, THRILLER' },
};

const posterMap = {
  'CRIME 101':         '/crime101.jpg',
  'HAMNET':            '/hamnet.jpg',
  'SEND HELP':         '/sendhelp.jpg',
  'WUTHERING HEIGHTS': '/wuthering.jpg',
  'MERCY':             '/mercy.jpg',
  'SCREAM 7':          '/scream7.jpg',
};

const theaters = [
  { name: 'AMC Pacific Place 11',  address: '600 Pine St Ste 400, Seattle, WA 98101' },
  { name: 'Regal Meridian',        address: '1501 7th Ave, Seattle, WA 98101' },
  { name: 'Majestic Bay Theatres', address: '2044 NW Market St, Seattle, WA 98107' },
  { name: 'Regal Thornton Place',  address: '301 NE 103rd St, Seattle, WA 98125' },
  { name: 'AMC Oak Tree 6',        address: '10006 Aurora Ave N, Seattle, WA 98133' },
  { name: 'SIFF Cinema Downtown',  address: '2100 4th Ave, Seattle, WA 98121' },
];

// Generate 6 dates starting from today
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

// Format time from backend (e.g. "14:30:00" → "2:30 PM")
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
        setMovie(fallbackMovieData[movieId] || fallbackMovieData[1]);
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

  // Group showtimes by theater name
  const showtimesByTheater = theaters.reduce((acc, theater) => {
    acc[theater.name] = showtimes
      .filter(s => s.theaterName === theater.name || s.theater?.name === theater.name)
      .map(s => ({
        time: formatTime(s.showTime || s.startTime || s.time),
        showtimeId: s.showtimeId || s.id,
        screenId: s.screenId || s.screen?.screenId,
      }));
    return acc;
  }, {});

  // Fallback hardcoded showtimes if none from backend
  const fallbackShowtimes = {
    'AMC Pacific Place 11':  { 0: ['10:00 AM','1:30 PM','4:45 PM','8:15 PM'],   1: ['9:30 AM','12:45 PM','4:00 PM','7:30 PM'],  2: ['10:30 AM','2:00 PM','5:30 PM','9:00 PM'],  3: ['11:00 AM','2:30 PM','6:00 PM','9:30 PM'],  4: ['10:00 AM','1:15 PM','4:30 PM','8:00 PM'],  5: ['9:00 AM','12:30 PM','4:00 PM','7:15 PM'] },
    'Regal Meridian':        { 0: ['11:00 AM','2:30 PM','6:00 PM','9:30 PM'],   1: ['10:30 AM','1:45 PM','5:15 PM','8:45 PM'], 2: ['9:45 AM','1:00 PM','4:30 PM','8:00 PM'],   3: ['10:15 AM','1:30 PM','5:00 PM','8:30 PM'],  4: ['11:30 AM','3:00 PM','6:30 PM','10:00 PM'], 5: ['10:00 AM','1:00 PM','4:15 PM','7:45 PM'] },
    'Majestic Bay Theatres': { 0: ['12:00 PM','3:30 PM','7:00 PM','10:15 PM'],  1: ['11:15 AM','2:30 PM','5:45 PM','9:00 PM'], 2: ['10:45 AM','2:15 PM','5:45 PM','9:15 PM'],  3: ['12:30 PM','4:00 PM','7:30 PM'],            4: ['11:00 AM','2:00 PM','5:30 PM','8:45 PM'],  5: ['10:30 AM','1:45 PM','5:00 PM','8:15 PM'] },
    'Regal Thornton Place':  { 0: ['9:30 AM','1:00 PM','4:30 PM','8:00 PM'],    1: ['10:00 AM','1:15 PM','4:45 PM','8:15 PM'], 2: ['11:30 AM','3:00 PM','6:30 PM','9:45 PM'],  3: ['9:45 AM','1:15 PM','4:45 PM','8:15 PM'],   4: ['10:30 AM','2:00 PM','5:30 PM','9:00 PM'],  5: ['11:00 AM','2:30 PM','6:00 PM','9:30 PM'] },
    'AMC Oak Tree 6':        { 0: ['10:15 AM','1:45 PM','5:15 PM','8:45 PM'],   1: ['9:00 AM','12:30 PM','4:00 PM','7:30 PM'], 2: ['10:00 AM','1:30 PM','5:00 PM','8:30 PM'],  3: ['11:15 AM','2:45 PM','6:15 PM','9:45 PM'],  4: ['9:30 AM','1:00 PM','4:30 PM','8:00 PM'],   5: ['10:45 AM','2:15 PM','5:45 PM','9:15 PM'] },
    'SIFF Cinema Downtown':  { 0: ['11:30 AM','3:00 PM','6:30 PM','9:45 PM'],   1: ['10:00 AM','1:30 PM','5:00 PM','8:30 PM'], 2: ['9:30 AM','12:45 PM','4:15 PM','7:45 PM'],  3: ['10:30 AM','2:00 PM','5:30 PM','9:00 PM'],  4: ['11:00 AM','2:30 PM','6:00 PM','9:30 PM'],  5: ['9:15 AM','12:30 PM','4:00 PM','7:30 PM'] },
  };

  const getTimesForTheater = (theaterName) => {
    const fromBackend = showtimesByTheater[theaterName];
    if (fromBackend && fromBackend.length > 0) {
      return fromBackend.map(s => ({ time: s.time, showtimeId: s.showtimeId, screenId: s.screenId }));
    }
    return (fallbackShowtimes[theaterName]?.[selectedDate] || []).map(t => ({ time: t }));
  };

  const handleShowtimeClick = (timeObj, theaterName, theaterAddress) => {
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
        cinemaAddress: theaterAddress,
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

      {/* Theater Listings */}
      <div className="theater-listings">
        {theaters.map((theater, index) => {
          const times = getTimesForTheater(theater.name);
          return (
            <div key={index} className="theater-item">
              <div className="theater-row">
                <div className="theater-info">
                  <h3 className="theater-name">{theater.name}</h3>
                  <p className="theater-address">{theater.address}</p>
                </div>
                <div className="showtimes">
                  {loadingShowtimes ? (
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '1px' }}>
                      Loading showtimes...
                    </span>
                  ) : times.length === 0 ? (
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px', letterSpacing: '1px' }}>
                      No showtimes available
                    </span>
                  ) : (
                    times.map((timeObj, idx) => (
                      <button
                        key={idx}
                        className="showtime-button"
                        onClick={() => handleShowtimeClick(timeObj, theater.name, theater.address)}
                      >
                        {timeObj.time}
                      </button>
                    ))
                  )}
                </div>
              </div>
              {index < theaters.length - 1 && <div className="divider"></div>}
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default BookingPage;