import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HeroSectionLPO.module.css';

const HeroSectionLPO = () => {
  const navigate = useNavigate();

  return (
    <section
      className={styles.heroSection}
      aria-label="Hero section"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/images/LPOFinancing.png'})` }}
    >
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <h1 className={styles.headline}>
            Unlock Your Business Potential with LPO Financing
          </h1>
          <p className={styles.subheadline}>
            Bridge the gap between secured orders and cash flow. Get the working capital you need to fulfill large purchase orders without straining your finances.
          </p>
          <div className={styles.ctaContainer}>
            <button 
              className={styles.primaryCta} 
              aria-label="Apply for LPO financing"
              onClick={() => navigate('/contactform')}
            >
              Apply for Financing
            </button>
            <button 
              className={styles.secondaryCta}
              aria-label="Learn more about LPO financing"
            >
              Learn More
            </button>
          </div>
          <div className={styles.trustIndicators}>
            <p className={styles.trustText}>Trusted by 500+ businesses worldwide</p>
          </div>
        </div>
        <div className={styles.imageContainer}>
          {/* Hero image would be implemented here */} 
          <div className={styles.heroImage} role="img" aria-label="Business professional reviewing financial documents">
            {/* This would be replaced with an actual image in production */} 
            <div className={styles.imagePlaceholder}></div>
          </div>
        </div>
      </div>
      
      {/* Optional decorative element */} 
      <div className={styles.backgroundShape} aria-hidden="true"></div>
    </section>
  );
};

export default HeroSectionLPO;
