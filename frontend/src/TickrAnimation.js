import React, { useEffect, useState } from 'react';
import './TickrAnimation.css';

const TickrAnimation = ({ onComplete }) => {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    const frame2Timer = setTimeout(() => setFrame(2), 800);
    const frame3Timer = setTimeout(() => setFrame(3), 2600);
    const completeTimer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 4500); // ← Changed from 2600 to 4500 (holds final frame for ~2 seconds)

    return () => {
      clearTimeout(frame2Timer);
      clearTimeout(frame3Timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <main className={`screen frame-${frame}`}>
      <section className="stack">
        {[...Array(8)].map((_, i) => (
          <p 
            key={i} 
            className={`word ${i === 0 ? 'first' : ''}`}
            style={{ '--i': i }}
          >
            TICKR
          </p>
        ))}
      </section>
      <p className="tagline">TICKETING MADE EASY</p>
    </main>
  );
};

export default TickrAnimation;