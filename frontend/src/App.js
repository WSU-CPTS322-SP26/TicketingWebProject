import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import SeatSelection from './SeatSelection';
import MoviesPage from './MoviesPage';
import OffersPage from './OffersPage';
import LocationsPage from './LocationsPage';
import PrivateBookingPage from './PrivateBookingPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking/:movieId" element={<BookingPage />} />
        <Route path="/seats" element={<SeatSelection />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/offers" element={<OffersPage />} />
        <Route path="/locations" element={<LocationsPage />} />
        <Route path="/private-booking" element={<PrivateBookingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;