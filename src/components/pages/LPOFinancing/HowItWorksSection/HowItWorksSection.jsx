import React from 'react';
import styles from './HowItWorksSection.module.css';

const HowItWorksSection = () => {
  const steps = [
    {
      number: '01',
      title: 'Submit Your LPO',
      description: 'Upload your Local Purchase Order from a government entity or reputable corporate organization.'
    },
    {
      number: '02',
      title: 'Assessment',
      description: 'Our team reviews your application, LPO, and supporting documents to determine eligibility.'
    },
    {
      number: '03',
      title: 'Funding',
      description: 'Upon approval, we directly pay your suppliers to fulfill the order requirements.'
    },
    {
      number: '04',
      title: 'Execution',
      description: 'You deliver the products or services to your client as specified in the LPO.'
    },
    {
      number: '05',
      title: 'Repayment',
      description: 'When your client pays, you repay the financing amount plus our agreed-upon fee.'
    }
  ];

  return (
    <section className={styles.howItWorksSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>How It Works</h2>
        <p className={styles.subtitle}>Our simple 5-step process to get your LPO financed</p>
        
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <div key={index} className={styles.step}>
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={styles.connector} aria-hidden="true">
                  <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
