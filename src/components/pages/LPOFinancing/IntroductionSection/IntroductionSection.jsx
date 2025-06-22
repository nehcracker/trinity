import React from 'react';
import styles from './IntroductionSection.module.css';

const IntroductionSection = () => {
  return (
    <section className={styles.introSection}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>What is LPO Financing?</h2>
          <p className={styles.description}>
            LPO Financing (Local Purchase Order Financing) is a short-term funding solution that 
            provides businesses with the capital needed to fulfill purchase orders from clients. 
            Instead of turning down large orders due to insufficient working capital, LPO financing 
            helps you bridge the gap between receiving an order and getting paid.
          </p>
          <p className={styles.description}>
            When you receive a purchase order but lack the funds to pay suppliers or produce the 
            goods, our LPO financing steps in to provide the necessary capital, enabling you to 
            deliver on time and grow your business without cash flow constraints.
          </p>

          <div className={styles.keyPoints}>
            <div className={styles.pointItem}>
              <div className={styles.pointIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                  <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
              <div className={styles.pointText}>
                <h3 className={styles.pointTitle}>Flexible Funding</h3>
                <p className={styles.pointDescription}>Get access to capital based on the value of your purchase orders</p>
              </div>
            </div>

            <div className={styles.pointItem}>
              <div className={styles.pointIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                  <path d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className={styles.pointText}>
                <h3 className={styles.pointTitle}>Quick Approvals</h3>
                <p className={styles.pointDescription}>Fast application process with decisions in as little as 48 hours</p>
              </div>
            </div>

            <div className={styles.pointItem}>
              <div className={styles.pointIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.icon}>
                  <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                  <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>
              </div>
              <div className={styles.pointText}>
                <h3 className={styles.pointTitle}>No Equity Loss</h3>
                <p className={styles.pointDescription}>Grow your business without giving up ownership or control</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
