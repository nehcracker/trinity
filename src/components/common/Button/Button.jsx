import React from 'react';
import { Link } from 'react-scroll';
import './Button.css';

const Button = ({ text, onClick, className, to, smooth, duration, offset }) => {
  // If 'to' prop is provided, render as a react-scroll Link
  if (to) {
    return (
      <Link
        to={to}
        smooth={smooth || true}
        duration={duration || 800}
        offset={offset || -70}
        className={`button ${className}`}
      >
        {text}
      </Link>
    );
  }
  
  // Otherwise, render as a regular button
  return (
    <button 
      className={`button ${className}`} 
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;