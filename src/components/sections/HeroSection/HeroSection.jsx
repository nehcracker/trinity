import React, { useEffect, useState } from 'react';
import Helmet from 'helmet';

import { Link } from 'react-scroll';
import { motion, useTransform, useScroll } from 'framer-motion';
import Button from '../../common/Button/Button';

import './HeroSection.css';

const HeroSection = () => {
  // Add viewport width detection for optimizations
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if viewport is mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Run on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // For advanced parallax effect with Framer Motion - reduce intensity on mobile
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, isMobile ? 75 : 150]);
  
  // Text animation variants - simplified for mobile
  const titleVariants = {
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
  };
  
  const subtitleVariants = {
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
  };
  
  const buttonContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.6,
        staggerChildren: isMobile ? 0.1 : 0.2
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: isMobile ? 10 : 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: isMobile ? 0.3 : 0.5, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <>
    <Helmet>
      <title>trinity financing | Global Financial sourcing brokers</title>
      <meta name="description" content="We specialize in sourcing grants, donations, government grants, international development funds, philanthropic contributions, and corporate social responsibility (CSR) funding for various industries, including non-profit organizations, and individuals." />
      <meta name="keywords" content="trinity financing, global financial sourcing brokers, grants, donations, government grants, international development funds, philanthropic contributions, corporate social responsibility, CSR, funding, non-profit organizations, individuals funding, " />
      <link rel="canonical" href="https://trinityfinancing.com/about" />
      <meta name="robots" content="index, follow" />
      <meta property="og:title" content="" />
      <meta property="og:image" content="https://trinityfinancing.com/hero-ng.jpg" />
      <meta property="og:url" content="https://trinityfinancing.com/about" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Trinity Financing" />
      <meta property="og:locale" content="en_UK" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:alt" content="trinity financing" />
      <meta property="og:image:secure_url" content="https://trinityfinancing.com  /hero-ng.jpg" />
      </Helmet>
    <section id="hero" className="hero-section">
      {/* Background image with parallax effect - reduced intensity on mobile */}
      <motion.div 
        className="hero-background"
        style={{ y: backgroundY }}
      />

      {/* Content */}
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Global Financial Sourcing brokers
        </motion.h1>

        <motion.h2
          className="hero-second-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Premier Financial Sourcing & Intermediary Agency
        </motion.h2>

        <motion.p 
          className="hero-subtitle"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
         Trinity Financial Soliciting Brokers has successfully connected thousands of 
         companies worldwide with leading funding organizations and institutions, securing 
         low-interest financing with swift processing times. To date, we have sourced over 
         <strong> $15 billion in grants, donations, government grants, international development 
          funds, philanthropic contributions, and corporate social responsibility (CSR) funding.</strong>
        </motion.p>

        <motion.div
          className="hero-buttons"
          variants={buttonContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={buttonVariants} className="button-container">
            <Link 
              to="contact"
              smooth={true} 
              duration={800} 
              offset={isMobile ? -50 : -70} // Adjusted offset for mobile
              className="full-width-link"
            >
              <Button 
                text="Free consultation" 
                className="secondary-button"
              />
            </Link>
          </motion.div>
          
          <motion.div variants={buttonVariants} className="button-container">
            <Link 
              to="services"
              smooth={true} 
              duration={800} 
              offset={isMobile ? -50 : -70} // Adjusted offset for mobile
              className="full-width-link"
            >
              <Button 
                text="Explore Our Services" 
                className="secondary-button"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator - simplified animation for mobile */}
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
          to={isMobile ? "services" : "about"} // Shorter scroll on mobile
          smooth={true}
          duration={800}
          offset={-70}
          className="scroll-link"
        >
          <div className="scroll-icon">
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
