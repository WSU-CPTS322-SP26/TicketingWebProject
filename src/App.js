import React, { useState } from 'react';
import TickrAnimation from './TickrAnimation';
import HomePage from './HomePage';

function App() {
  const [showHomePage, setShowHomePage] = useState(false);

  const handleAnimationComplete = () => {
    setTimeout(() => {
      setShowHomePage(true);
    }, 1000);
  };

  return (
    <div className="App">
      {!showHomePage ? (
        <TickrAnimation onComplete={handleAnimationComplete} />
      ) : (
        <HomePage />
      )}
    </div>
  );
}

export default App;