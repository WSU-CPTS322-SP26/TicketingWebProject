import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import './App.css';
import SeatSelection from './SeatSelection';
import MoviesPage from './MoviesPage';
import OffersPage from './OffersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking/:movieId" element={<BookingPage />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/movies" element={<MoviesPage />} /> 
        <Route path="/offers" element={<OffersPage />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;