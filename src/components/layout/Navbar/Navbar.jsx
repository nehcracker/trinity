import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');

  // Change navbar appearance on scroll and detect active section
  useEffect(() => {
    const handleScroll = () => {
      // Handle navbar appearance change on scroll
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Check current URL path when component mounts
    const handleUrlChange = () => {
      const path = window.location.pathname;
      
      // If it's the homepage
      if (path === '/' || path === '/home' || path === '') {
        setActivePage('home');
      } else {
        // Remove the leading slash and get the page name
        const page = path.replace('/', '');
        setActivePage(page || 'home');
      }
    };
    
    // Listen for URL changes
    window.addEventListener('popstate', handleUrlChange);
    
    // Call once on component mount
    handleUrlChange();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  // Map sections to their corresponding URL paths
  const navLinks = [
    { id: 'home', label: 'Home', to: 'hero', path: '/' },
    { id: 'services', label: 'Services', to: 'services', path: '/services' },
    { id: 'about', label: 'About', to: 'about', path: '/about' },
    { id: 'stats', label: 'Impact', to: 'stats', path: '/stats' },
    { id: 'contact', label: 'Contact', to: 'contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Handle navigation click - update URL and navigate to section
  const handleNavClick = (item) => {
    // Update the URL
    window.history.pushState({}, '', item.path);
    
    // Update active page state
    setActivePage(item.id);
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  // Framer Motion variants
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: i => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: 0.1 * i,
        ease: "easeOut"
      }
    })
  };

  const mobileMenuVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="navbar-container">
        <div className="navbar-content">
          <motion.div 
            className="navbar-logo"
            variants={logoVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Logo with direct href to reload the homepage */}
            <a 
              href="/" 
              className="logo-link"
              // No onClick handler to let the browser handle the navigation naturally
            >
              <img src="/logo.png" alt="Trinity Logo" className="logo-image" />
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.id}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={link.to}
                  smooth={true}
                  duration={800}
                  offset={-70}
                  className={`nav-link ${activePage === link.id ? 'active' : ''}`}
                  activeClass="active"
                  spy={false}
                  onClick={() => handleNavClick(link)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div
              variants={navItemVariants}
              custom={navLinks.length}
              initial="hidden"
              animate="visible"
            >
              <Link
                to="contact"
                smooth={true}
                duration={800}
                offset={-70}
                className={`contact-button ${activePage === 'contact' ? 'active' : ''}`}
                onClick={() => handleNavClick({ id: 'contact', path: '/contact' })}
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.div 
            className="mobile-menu-button" 
            onClick={toggleMobileMenu}
            whileTap={{ scale: 0.95 }}
          >
            <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              className="mobile-nav"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.id}
                  variants={mobileNavItemVariants}
                >
                  <Link
                    to={link.to}
                    smooth={true}
                    duration={800}
                    offset={-70}
                    className={`mobile-nav-link ${activePage === link.id ? 'active' : ''}`}
                    activeClass="active"
                    spy={false}
                    onClick={() => handleNavClick(link)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={mobileNavItemVariants}>
                <Link
                  to="contact"
                  smooth={true}
                  duration={800}
                  offset={-70}
                  className={`mobile-contact-button ${activePage === 'contact' ? 'active' : ''}`}
                  onClick={() => handleNavClick({ id: 'contact', path: '/contact' })}
                >
                  Get Started
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;