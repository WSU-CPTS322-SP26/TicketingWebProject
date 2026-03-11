import React, { useState } from 'react';
import './HomePage.css';

// Import your movie images - make sure these are in the public folder
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
  const [scrollPosition, setScrollPosition] = useState(0);

  const scroll = (direction) => {
    const container = document.querySelector('.movies-scroll');
    const scrollAmount = 790; // Width of one card + gap
    
    if (direction === 'next') {
      container.scrollLeft += scrollAmount;
      setScrollPosition(container.scrollLeft + scrollAmount);
    } else {
      container.scrollLeft -= scrollAmount;
      setScrollPosition(container.scrollLeft - scrollAmount);
    }
  };

  return (
    <div className="frame">
      <div className="navbar">
        <div className="nav-content">
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
            <button className="search-btn">🔍</button>
            <button className="menu-btn">☰</button>
          </div>
        </div>
      </div>

      <div className="movies-container">
        <button className="scroll-btn prev" onClick={() => scroll('prev')}>‹</button>
        
        <div className="movies-scroll">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card-figma">
              <img src={movie.image} alt={movie.title} className="movie-image" />
              <div className="movie-overlay">
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="scroll-btn next" onClick={() => scroll('next')}>›</button>
      </div>
    </div>
  );
};

export default HomePage;