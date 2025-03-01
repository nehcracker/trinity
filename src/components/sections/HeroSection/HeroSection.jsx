import React from 'react';
import { Link } from 'react-scroll';
import { motion, useTransform, useScroll } from 'framer-motion';
import Button from '../../common/Button/Button';

import './HeroSection.css';

const HeroSection = () => {
  // For advanced parallax effect with Framer Motion
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  
  // Text animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.2
      }
    }
  };
  
  const subtitleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
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
        staggerChildren: 0.2
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <section id="hero" className="hero-section">
      {/* Background image with parallax effect */}
      <motion.div 
        className="hero-background"
        style={{ y: backgroundY }}
      />

      {/* Overlay gradient */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Trinity Financing Agent
          
        </motion.h1>

        <motion.h2
          className="hero-second-title"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          Global Financial sourcing brokers
          
        </motion.h2>

        <motion.p 
          className="hero-subtitle"
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
        >
         We specialize in <strong>sourcing grants, donations, government grants, international development funds, 
         philanthropic contributions, and corporate social responsibility (CSR)</strong> funding for various industries, 
         including non-profit organizations, and individuals.

        </motion.p>

        <motion.div
          className="hero-buttons"
          variants={buttonContainerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={buttonVariants}>
          <Link 
              to="contact"
              smooth={true} 
              duration={800} 
              offset={-70}
            >
              <Button 
                text="Free consultation" 
                className="secondary-button"
              />
            </Link>
          </motion.div>
          
          <motion.div variants={buttonVariants}>
            <Link 
              to="services"
              smooth={true} 
              duration={800} 
              offset={-70}
            >
              <Button 
                text="Explore Our Services" 
                className="secondary-button"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="scroll-indicator"
        animate={{ 
          y: [0, 12, 0],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 1.5,
          ease: "easeInOut"
        }}
      >
        <div className="scroll-arrow"></div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
