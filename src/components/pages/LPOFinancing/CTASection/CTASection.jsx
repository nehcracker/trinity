import React from 'react';
import styles from './CTASection.module.css';
import ContactForm from '../../Tradefinance/ContactForm/ContactForm';

const CTASection = () => {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div className={styles.textContent}>
            <h2 className={styles.title}>Ready to Grow Your Business?</h2>
            <p className={styles.description}>
              Get the working capital you need to fulfill your large purchase orders and take your business to the next level.
            </p>
            <div className={styles.trustIndicators}>
              <div className={styles.indicator}>
                <span className={styles.checkIcon}>✓</span>
                <span>Quick approval process</span>
              </div>
              <div className={styles.indicator}>
                <span className={styles.checkIcon}>✓</span>
                <span>Flexible financing terms</span>
              </div>
              <div className={styles.indicator}>
                <span className={styles.checkIcon}>✓</span>
                <span>Dedicated support team</span>
              </div>
            </div>
          </div>
          
          <div className={styles.actionBox}>
            <ContactForm />
          </div>
        </div>
        
        <div className={styles.testimonial}>
          <div className={styles.quote}>
            <svg className={styles.quoteIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z" clipRule="evenodd" />
            </svg>
            <p className={styles.quoteText}>
              "The LPO financing solution helped us fulfill a major government contract that transformed our business. The process was smooth and the team was incredibly supportive."
            </p>
            <div className={styles.author}>
              <div className={styles.authorAvatar}></div>
              <div className={styles.authorInfo}>
                <p className={styles.authorName}>Sarah Johnson</p>
                <p className={styles.authorRole}>CEO, TechSupply Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */} 
      <div className={styles.shapeDivider}></div>
      <div className={styles.glowEffect}></div>
    </section>
  );
};

export default CTASection;
