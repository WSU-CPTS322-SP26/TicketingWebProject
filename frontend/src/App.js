import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './HomePage';
import BookingPage from './BookingPage';
import SeatSelection from './SeatSelection';
import MoviesPage from './MoviesPage';
import OffersPage from './OffersPage';
import LocationsPage from './LocationsPage';
import PrivateBookingPage from './PrivateBookingPage';
import TickrAnimation from './TickrAnimation';
import AuthPage from './AuthPage';
import { AuthProvider } from './context/AuthContext';
import MyBookingsPage from './Mybookingspage';
import './App.css';

// Protected route — redirects to /auth if not logged in
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('tickr_token');
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

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
              {/* Public route — login/register */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Protected routes — must be logged in */}
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/booking/:movieId" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
              <Route path="/seats" element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />
              <Route path="/movies" element={<ProtectedRoute><MoviesPage /></ProtectedRoute>} />
              <Route path="/offers" element={<ProtectedRoute><OffersPage /></ProtectedRoute>} />
              <Route path="/locations" element={<ProtectedRoute><LocationsPage /></ProtectedRoute>} />
              <Route path="/private-booking" element={<ProtectedRoute><PrivateBookingPage /></ProtectedRoute>} />
              <Route path="/my-bookings" element={<ProtectedRoute><MyBookingsPage /></ProtectedRoute>} />

              {/* Catch all — redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        )}
      </div>
    </AuthProvider>
  );
}

export default App;
