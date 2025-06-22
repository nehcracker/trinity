import React from 'react';
import styles from './CTASection.module.css';

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
            <button className={styles.primaryButton}>
              Apply for Financing
            </button>
            <div className={styles.secondaryActions}>
              <button className={styles.secondaryLink}>Schedule a Consultation</button>
              <span className={styles.divider}>or</span>
              <a href="tel:+1234567890" className={styles.phoneLink}>
                <svg className={styles.phoneIcon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                </svg>
                Call Us
              </a>
            </div>
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
