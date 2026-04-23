import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Left Column */}
        <div className="footer-column">
          <div className="footer-logo">
            <h2>TICKR</h2>
            <p>TICKETING MADE EASY</p>
          </div>
          <div className="footer-links">
            <a href="#privacy">PRIVACY POLICY</a>
            <a href="#faqs">FAQs</a>
            <a href="#terms">TERMS & CONDITIONS</a>
          </div>
        </div>

        {/* Middle Column */}
        <div className="footer-column">
          <h3>DOWNLOAD OUR APP NOW!</h3>
          <div className="app-buttons">
            <a href="https://play.google.com/store" className="app-btn google-play" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" />
            </a>
            <a href="https://www.apple.com/app-store/" className="app-btn app-store" target="_blank" rel="noopener noreferrer">
              <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on the App Store" />
            </a>
          </div>
        </div>

        {/* Right Column */}
        <div className="footer-column">
          <div className="footer-links">
            <a href="#about">ABOUT US</a>
            <a href="#careers">CAREERS</a>
            <a href="#contact">CONTACT US</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;