import React, { useEffect, useState, useRef } from 'react';
import styles from './HeroSection2.module.css';

const HeroSection = () => {
  const [yearsCount, setYearsCount] = useState(0);
  const [clientsCount, setClientsCount] = useState(0);
  const [transactionsCount, setTransactionsCount] = useState(0);
  const heroRef = useRef(null);

  // Animated counter effect
  useEffect(() => {
    const years = 15;
    const clients = 500;
    const transactions = 3800;

    const yearsInterval = setInterval(() => {
      setYearsCount(prev => {
        if (prev < years) return prev + 1;
        clearInterval(yearsInterval);
        return years;
      });
    }, 120);

    const clientsInterval = setInterval(() => {
      setClientsCount(prev => {
        if (prev < clients) return prev + 10;
        clearInterval(clientsInterval);
        return clients;
      });
    }, 20);

    const transactionsInterval = setInterval(() => {
      setTransactionsCount(prev => {
        if (prev < transactions) return prev + 50;
        clearInterval(transactionsInterval);
        return transactions;
      });
    }, 10);

    return () => {
      clearInterval(yearsInterval);
      clearInterval(clientsInterval);
      clearInterval(transactionsInterval);
    };
  }, []);

  // Scroll to ContactForm section
  const handleScrollToContact = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <section ref={heroRef} className={styles.heroContainer}>
      <div 
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/assets/images/Tradefinance.png'})` }}
      ></div>
      <div className={styles.gradientBackground}></div>
      <div className={styles.contentWrapper}>
        <h1 className={styles.headline}>Your Trusted Partner in Trade Finance</h1>

        <p className={styles.subheadline}>
          Secure, efficient financial instruments to power your international trade and business expansion
        </p>

        <div className={styles.ctaContainer}>
          <button
            className={styles.primaryButton}
            onClick={handleScrollToContact}
          >
            Start Your Application
          </button>
          <button className={styles.secondaryButton}>Learn More</button>
        </div>

        <div className={styles.credibilityLine}>
          ✓ Trusted by {clientsCount}+ businesses worldwide
        </div>

        <div className={styles.statsContainer}>
          <div className={styles.statItem}>
            <div className={styles.statNumber}>{yearsCount}+</div>
            <div className={styles.statLabel}>Years Experience</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statNumber}>{transactionsCount}+</div>
            <div className={styles.statLabel}>Transactions Completed</div>
          </div>

          <div className={styles.statItem}>
            <div className={styles.statNumber}>98%</div>
            <div className={styles.statLabel}>Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
