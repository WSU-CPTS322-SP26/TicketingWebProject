import React, { useState } from 'react';
import TickrAnimation from './TickrAnimation';
import HomePage from './HomePage';
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
          <HomePage />
        )}
      </div>
    </AuthProvider>
  );
}

export default App;