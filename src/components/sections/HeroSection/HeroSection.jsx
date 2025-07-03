import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-scroll';
import { motion, useTransform, useScroll } from 'framer-motion';
import Button from '../../common/Button/Button';
import './HeroSection.css';

const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // Memoized resize handler to prevent unnecessary re-renders
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  useEffect(() => {
    // Throttle resize events for better performance
    let timeoutId;
    const throttledResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 100);
    };
    
    window.addEventListener('resize', throttledResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', throttledResize);
    };
  }, [handleResize]);
  
  // Parallax effect with reduced intensity on mobile
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, isMobile ? 75 : 150]);
  
  // Memoized animation variants to prevent recreation on every render
  const animationVariants = useMemo(() => ({
    title: {
      hidden: { opacity: 0, y: isMobile ? 15 : 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: isMobile ? 0.5 : 0.8, 
          ease: "easeOut",
          delay: 0.2
        }
      }
    },
    subtitle: {
      hidden: { opacity: 0, y: isMobile ? 15 : 30 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: isMobile ? 0.5 : 0.8, 
          ease: "easeOut",
          delay: 0.4
        }
      }
    },
    buttonContainer: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: 0.6,
          staggerChildren: isMobile ? 0.1 : 0.2
        }
      }
    },
    button: {
      hidden: { opacity: 0, y: isMobile ? 10 : 20 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: isMobile ? 0.3 : 0.5, 
          ease: "easeOut" 
        }
      }
    }
  }), [isMobile]);

  // Memoized scroll offset for mobile optimization
  const scrollOffset = useMemo(() => isMobile ? -50 : -70, [isMobile]);

  return (
    <>
      <Helmet>
        <title>Trinity Financing | Global Financial Sourcing Brokers</title>
        <meta name="description" content="Premier financial sourcing & intermediary agency specializing in grants, donations, government funding, and international development funds. Over $150 billion sourced." />
        <meta name="keywords" content="trinity financing, financial sourcing, grants, funding, international development, CSR, philanthropic capital" />
        <link rel="canonical" href="https://trinityfinancing.com/" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Trinity Financing | Global Financial Sourcing Brokers" />
        <meta property="og:description" content="Premier financial sourcing & intermediary agency. Over $150 billion in funding sourced." />
        <meta property="og:image" content="https://trinityfinancing.com/hero-bg.jpg" />
        <meta property="og:url" content="https://trinityfinancing.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Trinity Financing" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:alt" content="Trinity Financing - Global Financial Sourcing" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Trinity Financing | Global Financial Sourcing Brokers" />
        <meta name="twitter:description" content="Premier financial sourcing & intermediary agency. Over $150 billion in funding sourced." />
        <meta name="twitter:image" content="https://trinityfinancing.com/hero-bg.jpg" />
      </Helmet>

      <section id="hero" className="hero-section" role="banner">
        {/* Background with optimized parallax */}
        <motion.div 
          className="hero-background"
          style={{ y: backgroundY }}
          role="img"
          aria-label="Trinity Financing hero background"
        />

        {/* Main content */}
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            variants={animationVariants.title}
            initial="hidden"
            animate="visible"
          >
            Global Financial Sourcing Brokers
          </motion.h1>

          <motion.h2
            className="hero-second-title"
            variants={animationVariants.title}
            initial="hidden"
            animate="visible"
          >
            Premier Financial Sourcing & Intermediary Agency
          </motion.h2>

          <motion.p 
            className="hero-subtitle1"
            variants={animationVariants.subtitle}
            initial="hidden"
            animate="visible"
          >
            Trinity Financial Sourcing Brokers connects companies worldwide with top funding institutions, 
            securing low-interest financing for real estate developments, infrastructure, and mega business 
            projects—all with fast processing. We've sourced over{' '}
            <strong>$150 billion in international development funds, philanthropic capital, CSR funds, and real estate investment financing.</strong>
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={animationVariants.buttonContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={animationVariants.button} className="button-container">
              <Link 
                to="contact"
                smooth={true} 
                duration={800} 
                offset={scrollOffset}
                className="full-width-link"
                aria-label="Navigate to contact section for free consultation"
              >
                <Button 
                  text="Free Consultation" 
                  className="primary-button1"
                  aria-label="Get a free consultation"
                />
              </Link>
            </motion.div>
            
            <motion.div variants={animationVariants.button} className="button-container">
              <Link 
                to="services"
                smooth={true} 
                duration={800} 
                offset={scrollOffset}
                className="full-width-link"
                aria-label="Navigate to services section"
              >
                <Button 
                  text="Explore Our Services" 
                  className="secondary-button1"
                  aria-label="Explore our financial services"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll indicator with accessibility */}
        <motion.div 
          className="scroll-down-indicator"
          animate={{ 
            y: [0, isMobile ? 8 : 12, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: isMobile ? 1.2 : 1.5,
            ease: "easeInOut"
          }}
        >
          <Link
            to={isMobile ? "services" : "about"}
            smooth={true}
            duration={800}
            offset={-70}
            className="scroll-link"
            aria-label="Scroll to next section"
          >
            <div className="scroll-icon" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="scroll-text">Scroll Down</span>
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default HeroSection;