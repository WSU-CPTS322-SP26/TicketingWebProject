import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MoviesPage.css';
import Footer from './Footer';

const movies = [
  {
    id: 1,
    title: 'CRIME 101',
    image: '/crime101.jpg',
    duration: '139 MIN',
    language: 'English',
    genre: ['Crime', 'Thriller'],
    description: 'A master thief and an insurance broker join forces for a big heist, while a determined detective pursues them to prevent the multi-million-dollar crime.'
  },
  {
    id: 2,
    title: 'HAMNET',
    image: '/hamnet.jpg',
    duration: '120 MIN',
    language: 'English',
    genre: ['Drama', 'Biography'],
    description: 'William Shakespeare and his wife Agnes celebrate the birth of their son Hamnet. When tragedy strikes and Hamnet dies young, it inspires Shakespeare to write his timeless masterpiece "Hamlet".'
  },
  {
    id: 3,
    title: 'SEND HELP',
    image: '/sendhelp.jpg',
    duration: '105 MIN',
    language: 'English',
    genre: ['Comedy', 'Adventure'],
    description: 'A woman and her overbearing boss become stranded on a deserted island after a plane crash. They must overcome grievances and work together to survive.'
  },
  {
    id: 4,
    title: 'WUTHERING HEIGHTS',
    image: '/wuthering.jpg',
    duration: '142 MIN',
    language: 'English',
    genre: ['Romance', 'Drama'],
    description: 'A sweeping tale of love and revenge set across the wild Yorkshire moors, following the passionate and destructive relationship between Catherine and Heathcliff.'
  },
  {
    id: 5,
    title: 'MERCY',
    image: '/mercy.jpg',
    duration: '98 MIN',
    language: 'English',
    genre: ['Sci-Fi', 'Thriller'],
    description: 'In a near-future world where AI governs justice, one detective uncovers a conspiracy that could determine the fate of humanity.'
  },
  {
    id: 6,
    title: 'SCREAM 7',
    image: '/scream7.jpg',
    duration: '115 MIN',
    language: 'English',
    genre: ['Horror', 'Thriller'],
    description: 'Ghostface returns once again, this time targeting a new generation of survivors who must unmask the killer before it\'s too late.'
  }
];

const allGenres = ['All', 'Crime', 'Thriller', 'Drama', 'Biography', 'Comedy', 'Adventure', 'Romance', 'Sci-Fi', 'Horror'];

const MoviesPage = () => {
  const navigate = useNavigate();
  const [activeGenre, setActiveGenre] = useState('All');

  const filtered = activeGenre === 'All'
    ? movies
    : movies.filter(m => m.genre.includes(activeGenre));

  return (
    <div className="movies-page">

      {/* Navbar */}
      <nav className="movies-nav">
        <div className="movies-nav-inner">
          <div className="movies-nav-left">
            <span className="movies-nav-link" onClick={() => navigate('/')}>Offers & Promotions</span>
            <span className="movies-nav-link active">Movies</span>
          </div>
          <span className="movies-logo" onClick={() => navigate('/')}>Tickr</span>
          <div className="movies-nav-right">
            <span className="movies-nav-link">Private Bookings</span>
            <span className="movies-nav-link">Locations</span>
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
        {filtered.length === 0 ? (
          <div className="no-results">No movies found for this genre.</div>
        ) : (
          <div className="movies-grid">
            {filtered.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => navigate(`/booking/${movie.id}`)}
              >
                <div className="movie-card-image">
                  <img src={movie.image} alt={movie.title} />
                  <div className="movie-card-overlay">
                    <span className="movie-card-cta">BOOK NOW →</span>
                  </div>
                </div>
                <div className="movie-card-info">
                  <div className="movie-card-tags">
                    {movie.genre.map(g => (
                      <span key={g} className="movie-tag">{g}</span>
                    ))}
                    <span className="movie-tag">{movie.duration}</span>
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