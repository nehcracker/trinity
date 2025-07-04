import React from 'react';
import { Link } from 'react-scroll';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const footerLinks = [
    { id: 'services', label: 'Services', to: 'services' },
    { id: 'about', label: 'About', to: 'about' },
    { id: 'stats', label: 'Our Impact', to: 'stats' },
    { id: 'contact', label: 'Contact', to: 'footer' },
  ];
  
  return (
    <footer id="footer" className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-company">
            <h3 className="company-name">Trinity Financing Agent</h3>
            <p className="company-description">
            At Trinity Financing Agent, we are committed to bridging the financial gap for businesses, 
            organizations, and development projects. With a deep understanding of global funding opportunities, 
            we specialize in securing grants, donations, and development funds to drive economic growth, social 
            impact, and sustainable development.
            </p>
            
          </div>
          
          <div className="footer-links">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-nav">
              {footerLinks.map((link) => (
                <li key={link.id} className="footer-nav-item">
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={800}
                    offset={-70}
                    className="footer-nav-link"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="footer-contact"> 
            <h4 className="footer-heading">Contact Information</h4>
            <ul className="contact-list">
              <li className="contact-item">
                <span className="contact-icon">📍</span>
                <span className="contact-text">Ground flr, Bldg 4, 50 Constantia Blvd, Constantia Kloof, Johannesburg, 1709, South Africa</span>
              </li>
              
              <li className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:finance.support@trinityfinancing.com" className="contact-link">
                finance.support@trinityfinancing.com
                </a>
              </li>
              <li className="contact-item">
                <span className="contact-icon">🌐</span>
                <a href="https://www.trinityfinancing.com" className="contact-link">
                  www.trinityfinancing.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {year} Trinity Financing Agent. All Rights Reserved.
          </p>
          <div className="legal-links">
            <a href="/privacypolicy" className="legal-link">Privacy Policy</a>
            <a href="/terms" className="legal-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;