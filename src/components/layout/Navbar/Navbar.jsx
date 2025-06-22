import React, { useState, useEffect, useRef } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [activePage, setActivePage] = useState('home');
  const isHomePage = location.pathname === '/' || location.pathname === '/home' || location.pathname === '';
  const dropdownRef = useRef(null);

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

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle click outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update activePage based on current location
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path === '/' || path === '/home' || path === '') {
      setActivePage('home');
    } else {
      const page = path.replace('/', '');
      setActivePage(page || 'home');
    }
  }, [location]);

  // Map sections to their corresponding URL paths
  const navLinks = [
    {
      id: 'home',
      label: 'Home',
      to: 'hero',
      path: '/',
      isScrollLink: isHomePage,
    },
    {
      id: 'services',
      label: 'Services',
      to: 'services',
      path: isHomePage ? '/services' : '/#services',
      isScrollLink: isHomePage,
      hasDropdown: true,
      dropdownItems: [
        {
          id: 'tradefinance',
          label: 'Trade Finance',
          path: '/tradefinance',
        },
        {
          id: 'lpofinancing',
          label: 'LPO Financing',
          path: '/lpofinancing',
        },
      ],
    },
    { 
      id: 'about', 
      label: 'About', 
      to: 'about', 
      path: isHomePage ? '/about' : '/#about', 
      isScrollLink: isHomePage 
    },
    { 
      id: 'stats', 
      label: 'Impact', 
      to: 'stats', 
      path: isHomePage ? '/stats' : '/#stats', 
      isScrollLink: isHomePage 
    },
    { 
      id: 'contact', 
      label: 'Contact', 
      to: 'contact', 
      path: isHomePage ? '/contact' : '/#contact', 
      isScrollLink: isHomePage 
    },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleServicesDropdown = () => {
    setIsServicesDropdownOpen(!isServicesDropdownOpen);
  };

  // Close mobile menu on navigation
  const handleNavClick = () => {
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
    setIsServicesDropdownOpen(false);
  };

  // Framer Motion variants
  const logoVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.1 * i,
        ease: 'easeOut',
      },
    }),
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
        when: 'afterChildren',
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.nav
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="navbar-container">
        <div className="navbar-content">
          <motion.div className="navbar-logo" variants={logoVariants} initial="hidden" animate="visible">
            {/* Logo with direct href to reload the homepage */}
            <RouterLink to="/" className="logo-link">
              <img src="/logo.png" alt="Trinity Logo" className="logo-image" />
            </RouterLink>
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
                style={{ position: 'relative' }}
                ref={link.hasDropdown ? dropdownRef : null}
              >
                {link.hasDropdown ? (
                  <div className="dropdown-container">
                    {link.isScrollLink ? (
                      <ScrollLink
                        to={link.to}
                        smooth={true}
                        duration={800}
                        offset={-70}
                        className={`nav-link dropdown-trigger ${activePage === link.id ? 'active' : ''}`}
                        activeClass="active"
                        spy={false}
                        onMouseEnter={() => setIsServicesDropdownOpen(true)}
                        onMouseLeave={() => setIsServicesDropdownOpen(false)}
                      >
                        {link.label}
                        <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </ScrollLink>
                    ) : (
                      <div
                        className={`nav-link dropdown-trigger ${activePage === link.id ? 'active' : ''}`}
                        onMouseEnter={() => setIsServicesDropdownOpen(true)}
                        onMouseLeave={() => setIsServicesDropdownOpen(false)}
                        onClick={() => {
                          if (!isHomePage) {
                            window.location.href = link.path;
                          }
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        {link.label}
                        <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    
                    <AnimatePresence>
                      {isServicesDropdownOpen && (
                        <motion.div
                          className="dropdown-menu"
                          variants={dropdownVariants}
                          initial="hidden"
                          animate="visible"
                          exit="hidden"
                          onMouseEnter={() => setIsServicesDropdownOpen(true)}
                          onMouseLeave={() => setIsServicesDropdownOpen(false)}
                        >
                          {link.dropdownItems.map((item) => (
                            <RouterLink
                              key={item.id}
                              to={item.path}
                              className={`dropdown-item ${activePage === item.id ? 'active' : ''}`}
                              onClick={handleNavClick}
                            >
                              {item.label}
                            </RouterLink>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  link.isScrollLink ? (
                    <ScrollLink
                      to={link.to}
                      smooth={true}
                      duration={800}
                      offset={-70}
                      className={`nav-link ${activePage === link.id ? 'active' : ''}`}
                      activeClass="active"
                      spy={false}
                      onClick={handleNavClick}
                    >
                      {link.label}
                    </ScrollLink>
                  ) : (
                    <RouterLink
                      to={link.path}
                      className={`nav-link ${activePage === link.id ? 'active' : ''}`}
                      onClick={handleNavClick}
                    >
                      {link.label}
                    </RouterLink>
                  )
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.div className="mobile-menu-button" onClick={toggleMobileMenu} whileTap={{ scale: 0.95 }}>
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
            <motion.div className="mobile-nav" variants={mobileMenuVariants} initial="hidden" animate="visible" exit="hidden">
              {navLinks.map((link) => (
                <motion.div key={link.id} variants={mobileNavItemVariants} style={{ position: 'relative' }}>
                  {link.hasDropdown ? (
                    <div className="mobile-dropdown-container">
                      <div
                        className={`mobile-nav-link dropdown-trigger ${activePage === link.id ? 'active' : ''}`}
                        onClick={toggleServicesDropdown}
                      >
                        {link.label}
                        <svg className={`dropdown-arrow ${isServicesDropdownOpen ? 'open' : ''}`} width="12" height="8" viewBox="0 0 12 8" fill="none">
                          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      
                      <AnimatePresence>
                        {isServicesDropdownOpen && (
                          <motion.div
                            className="mobile-dropdown-menu"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            {link.dropdownItems.map((item) => (
                              <RouterLink
                                key={item.id}
                                to={item.path}
                                className={`mobile-dropdown-item ${activePage === item.id ? 'active' : ''}`}
                                onClick={handleNavClick}
                              >
                                {item.label}
                              </RouterLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    link.isScrollLink ? (
                      <ScrollLink
                        to={link.to}
                        smooth={true}
                        duration={800}
                        offset={-70}
                        className={`mobile-nav-link ${activePage === link.id ? 'active' : ''}`}
                        activeClass="active"
                        spy={false}
                        onClick={handleNavClick}
                      >
                        {link.label}
                      </ScrollLink>
                    ) : (
                      <a
                        href={link.path}
                        className={`mobile-nav-link ${activePage === link.id ? 'active' : ''}`}
                        onClick={handleNavClick}
                      >
                        {link.label}
                      </a>
                    )
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;