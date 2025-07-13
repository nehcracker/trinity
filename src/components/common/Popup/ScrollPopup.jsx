import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import './ScrollPopup.css';

const ScrollPopup = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    // Reset popup closed state on page change
    setIsClosed(false);
    setIsVisible(false);
  }, [location]);

  const handleScroll = useCallback(() => {
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (scrollPercentage >= 25 && !isClosed) {
      setIsVisible(true);
    }
  }, [isClosed]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setIsClosed(true);
  }, []);

  const handleEscape = useCallback((event) => {
    if (event.key === 'Escape' && isVisible) {
      handleClose();
    }
  }, [isVisible, handleClose]);

  const handleOverlayClick = useCallback((event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener('keydown', handleEscape);
      // Prevent background scrolling but allow popup scrolling
      document.body.style.overflow = 'hidden';
      // Prevent iOS bounce scroll
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      document.removeEventListener('keydown', handleEscape);
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      // Cleanup styles
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
    };
  }, [isVisible, handleEscape]);

  const handleContactClick = useCallback(() => {
    handleClose();
    // Small delay to allow popup to close before scrolling
    setTimeout(() => {
      const contactForm = document.getElementById('contact-form');
      if (contactForm) {
        contactForm.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, [handleClose]);

  // Prevent touch events from propagating to background
  const handleTouchMove = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="scroll-popup-overlay" 
      onClick={handleOverlayClick}
      onTouchMove={handleTouchMove}
    >
      <div className="scroll-popup-container">
        <button 
          className="scroll-popup-close-button" 
          onClick={handleClose} 
          aria-label="Close popup"
          type="button"
        >
          ×
        </button>
        
        <div className="scroll-popup-content">
          <h2 className="scroll-popup-title">
            📋 Minimum Application Thresholds – Please Read Before Applying
          </h2>
          
          <p className="scroll-popup-subtitle">
            To ensure efficiency and align with our funding mandates, <strong>Trinity Financing only reviews applications meeting the following minimum thresholds</strong>:
          </p>
          
          <ul className="scroll-popup-threshold-list">
            <li><strong>Global Financial Sourcing</strong>: $500 million+ USD</li>
            <li><strong>Bank Instruments & Trade Finance</strong>: $1 million+ USD</li>
            <li><strong>LPO Financing</strong>: $100,000+ USD</li>
          </ul>
          
          <p className="scroll-popup-warning-text">
            ⚠️ <em>Applications below these thresholds will not be processed.</em>
          </p>
          
          <div className="scroll-popup-not-provided-section">
            <p className="scroll-popup-not-provided-title">
              🚫 <strong>Please Note:</strong> Trinity Financing <strong>does not source or provide</strong>:
            </p>
            <ul className="scroll-popup-not-provided-list">
              <li><strong>Grants</strong></li>
              <li><strong>Free money</strong></li>
              <li><strong>Start-up loans for new businesses</strong></li>
            </ul>
          </div>
          
          <div className="scroll-popup-submission-guidelines">
            <p className="scroll-popup-guidelines-title">
              <strong>Submission Guidelines:</strong>
            </p>
            <ul className="scroll-popup-guidelines-list">
              <li>All documents must be sent in <strong>PDF format</strong>.</li>
              <li>Submit by replying to this email thread.</li>
              <li><strong>No upfront fees</strong> — any third-party costs (if needed) are disclosed <strong>in writing after our preliminary review.</strong></li>
            </ul>
          </div>
          
          <button 
            className="scroll-popup-cta-button" 
            onClick={handleContactClick}
            type="button"
          >
            Contact Us Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScrollPopup;