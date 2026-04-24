import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoviesPage.css';
import Footer from './Footer';

const API_BASE = 'http://localhost:8080';

const allGenres = ['All', 'Crime', 'Thriller', 'Drama', 'Biography', 'Comedy', 'Adventure', 'Romance', 'Sci-Fi', 'Horror'];

// Fallback poster images mapped by movie title
const posterMap = {
  'CRIME 101':        '/crime101.jpg',
  'HAMNET':           '/hamnet.jpg',
  'SEND HELP':        '/sendhelp.jpg',
  'WUTHERING HEIGHTS':'/wuthering.jpg',
  'MERCY':            '/mercy.jpg',
  'SCREAM 7':         '/scream7.jpg',
};

const getPoster = (movie) => {
  if (movie.posterUrl) return movie.posterUrl;
  const key = movie.title?.toUpperCase();
  return posterMap[key] || '/crime101.jpg';
};

const getGenres = (movie) => {
  if (Array.isArray(movie.genre)) return movie.genre;
  if (typeof movie.genre === 'string') return movie.genre.split(',').map(g => g.trim());
  return [];
};

const getDuration = (movie) => {
  if (movie.duration) return `${movie.duration} MIN`;
  if (movie.durationMinutes) return `${movie.durationMinutes} MIN`;
  return '';
};

const MoviesPage = () => {
  const navigate = useNavigate();
  const [activeGenre, setActiveGenre] = useState('All');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('tickr_token');
        const res = await fetch(`${API_BASE}/api/public/movies`, {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {},
        });

        if (!res.ok) throw new Error('Failed to fetch movies');

        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Could not load movies from server. Showing local data.');
        // Fallback to hardcoded data
        setMovies([
          { movieId: 1, title: 'CRIME 101',          genre: 'Crime,Thriller',    duration: '139', language: 'English', description: 'A master thief and an insurance broker join forces for a big heist, while a determined detective pursues them to prevent the multi-million-dollar crime.' },
          { movieId: 2, title: 'HAMNET',              genre: 'Drama,Biography',   duration: '120', language: 'English', description: 'William Shakespeare and his wife Agnes celebrate the birth of their son Hamnet. When tragedy strikes and Hamnet dies young, it inspires Shakespeare to write his timeless masterpiece "Hamlet".' },
          { movieId: 3, title: 'SEND HELP',           genre: 'Comedy,Adventure',  duration: '105', language: 'English', description: 'A woman and her overbearing boss become stranded on a deserted island after a plane crash. They must overcome grievances and work together to survive.' },
          { movieId: 4, title: 'WUTHERING HEIGHTS',   genre: 'Romance,Drama',     duration: '142', language: 'English', description: 'A sweeping tale of love and revenge set across the wild Yorkshire moors, following the passionate and destructive relationship between Catherine and Heathcliff.' },
          { movieId: 5, title: 'MERCY',               genre: 'Sci-Fi,Thriller',   duration: '98',  language: 'English', description: 'In a near-future world where AI governs justice, one detective uncovers a conspiracy that could determine the fate of humanity.' },
          { movieId: 6, title: 'SCREAM 7',            genre: 'Horror,Thriller',   duration: '115', language: 'English', description: 'Ghostface returns once again, this time targeting a new generation of survivors who must unmask the killer before it\'s too late.' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const filtered = activeGenre === 'All'
    ? movies
    : movies.filter(m => getGenres(m).includes(activeGenre));

  const getMovieId = (movie) => movie.movieId || movie.id;

  return (
    <div className="movies-page">

      {/* Navbar */}
      <nav className="movies-nav">
        <div className="movies-nav-inner">
          <div className="movies-nav-left">
            <span className="movies-nav-link" onClick={() => navigate('/offers')}>Offers & Promotions</span>
            <span className="movies-nav-link active">Movies</span>
          </div>
          <span className="movies-logo" onClick={() => navigate('/')}>Tickr</span>
          <div className="movies-nav-right">
            <span className="movies-nav-link" onClick={() => navigate('/private-booking')}>Private Bookings</span>
            <span className="movies-nav-link" onClick={() => navigate('/locations')}>Locations</span>
            <span className="movies-nav-icon">👤</span>
            <span className="movies-nav-icon">🔍</span>
            <span className="movies-nav-icon">☰</span>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="movies-header">
        <h1 className="movies-heading">MOVIES</h1>
        <p className="movies-subheading">Now Showing</p>
      </div>

      {/* Error banner */}
      {error && (
        <div style={{
          maxWidth: '1300px', margin: '0 auto', padding: '0 40px 8px',
          fontSize: '12px', color: 'rgba(230,57,70,0.8)', letterSpacing: '0.5px'
        }}>
          ⚠ {error}
        </div>
      )}

      {/* Genre Filter */}
      <div className="genre-filter-wrapper">
        <div className="genre-filter">
          {allGenres.map(genre => (
            <button
              key={genre}
              className={`genre-btn ${activeGenre === genre ? 'active' : ''}`}
              onClick={() => setActiveGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Grid */}
      <div className="movies-grid-wrapper">
        {loading ? (
          <div className="no-results">Loading movies...</div>
        ) : filtered.length === 0 ? (
          <div className="no-results">No movies found for this genre.</div>
        ) : (
          <div className="movies-grid">
            {filtered.map((movie) => (
              <div
                key={getMovieId(movie)}
                className="movie-card"
                onClick={() => navigate(`/booking/${getMovieId(movie)}`)}
              >
                <div className="movie-card-image">
                  <img src={getPoster(movie)} alt={movie.title} />
                  <div className="movie-card-overlay">
                    <span className="movie-card-cta">BOOK NOW →</span>
                  </div>
                </div>
                <div className="movie-card-info">
                  <div className="movie-card-tags">
                    {getGenres(movie).map(g => (
                      <span key={g} className="movie-tag">{g}</span>
                    ))}
                    {getDuration(movie) && (
                      <span className="movie-tag">{getDuration(movie)}</span>
                    )}
                  </div>
                  <h2 className="movie-card-title">{movie.title}</h2>
                  <p className="movie-card-desc">{movie.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MoviesPage;