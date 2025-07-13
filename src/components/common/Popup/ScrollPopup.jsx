import React, { useState, useEffect } from 'react';
import './ScrollPopup.css';

const ScrollPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    // Check if popup has already been shown this session
    const popupShown = sessionStorage.getItem('trinityPopupShown');
    if (popupShown) {
      setHasShown(true);
      return;
    }

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage >= 25 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
        sessionStorage.setItem('trinityPopupShown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasShown]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleContactClick = () => {
    setIsVisible(false);
    // Scroll to contact form (assuming it has id="contact-form")
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="close-button" onClick={handleClose} aria-label="Close popup">
          ×
        </button>
        
        <div className="popup-content">
          <h2 className="popup-title">📋 Minimum Application Thresholds – Please Read Before Applying</h2>
          
          <p className="popup-subtitle">
            To ensure efficiency and align with our funding mandates, <strong>Trinity Financing only reviews applications meeting the following minimum thresholds</strong>:
          </p>
          
          <ul className="threshold-list">
            <li><strong>Global Financial Sourcing</strong>: $500 million+ USD</li>
            <li><strong>Bank Instruments & Trade Finance</strong>: $1 million+ USD</li>
            <li><strong>LPO Financing</strong>: $100,000+ USD</li>
          </ul>
          
          <p className="warning-text">⚠️ <em>Applications below these thresholds will not be processed.</em></p>
          
          <div className="not-provided-section">
            <p className="not-provided-title">🚫 <strong>Please Note:</strong> Trinity Financing <strong>does not source or provide</strong>:</p>
            <ul className="not-provided-list">
              <li><strong>Grants</strong></li>
              <li><strong>Free money</strong></li>
              <li><strong>Start-up loans for new businesses</strong></li>
            </ul>
          </div>
          
          <div className="submission-guidelines">
            <p className="guidelines-title"><strong>Submission Guidelines:</strong></p>
            <ul className="guidelines-list">
              <li>All documents must be sent in <strong>PDF format</strong>.</li>
              <li>Submit by replying to this email thread.</li>
              <li><strong>No upfront fees</strong> — any third-party costs (if needed) are disclosed <strong>in writing after our preliminary review.</strong></li>
            </ul>
          </div>
          
          <button className="cta-button" onClick={handleContactClick}>
            Contact Us Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollPopup;