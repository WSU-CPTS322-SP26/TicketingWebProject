import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import SeatSelection from './SeatSelection';
import MoviesPage from './MoviesPage';
import OffersPage from './OffersPage';
import LocationsPage from './LocationsPage';
import PrivateBookingPage from './PrivateBookingPage';
import TickrAnimation from './TickrAnimation';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  const [showHomePage, setShowHomePage] = useState(false);

  const handleAnimationComplete = () => {
    setTimeout(() => setShowHomePage(true), 1000);
  };

  return (
    <AuthProvider>
      <div className="App">
        {!showHomePage ? (
          <TickrAnimation onComplete={handleAnimationComplete} />
        ) : (
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
        )}
      </div>
    </AuthProvider>
  );
}

export default App;