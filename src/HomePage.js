import React, { useState } from 'react';
import './HomePage.css';

const movies = [
  {
    id: 1,
    title: 'CRIME 101',
    description: 'A master thief and an insurance broker join forces for a big heist, while a determined detective pursues them to prevent the multi-million-dollar crime.',
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
    description: 'A woman and her overbearing boss become stranded on a deserted island after a plane crash. They must overcome past grievances and work together to survive, but ultimately, it\'s a battle of wits and wills to make it out alive.',
    image: '/sendhelp.jpg'
  },
  {
    id: 4,
    title: 'WUTHERING HEIGHTS',
    description: 'Deeply striking Heathcliff falls in love with Catherine Earnshaw, a woman from a wealthy family in 18th-century England.',
    image: '/wuthering.jpg'
  },
  {
    id: 5,
    title: 'MERCY',
    description: 'In the near future, an advanced AI judge takes a captive detective that he\'s on trial for the murder of his wife. He fails to prove his innocence within 90 minutes, he\'ll be sentenced to death.',
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
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === movies.length - 2 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 2 : prevIndex - 1
    );
  };

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="nav-left">
          <a href="#offers">Offers & Promotions</a>
          <a href="#movies">Movies</a>
        </div>
        <div className="nav-center">
          <h1>Tickr</h1>
        </div>
        <div className="nav-right">
          <a href="#bookings">Private Bookings</a>
          <a href="#locations">Locations</a>
          <button className="icon-btn">🔍</button>
          <button className="icon-btn">☰</button>
        </div>
      </nav>

      <div className="carousel-container">
        <button className="carousel-btn prev" onClick={prevSlide}>‹</button>
        
        <div className="carousel">
          <div 
            className="carousel-track"
            style={{ transform: `translateX(-${currentIndex * 52}%)` }}
          >
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <div className="movie-image-placeholder">
                    <img src={movie.image} alt={movie.title} />
                </div>
                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  <p>{movie.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-btn next" onClick={nextSlide}>›</button>
      </div>
    </div>
  );
};

export default HomePage;