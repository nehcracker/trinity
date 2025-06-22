import React from 'react';
import styles from './EligibilitySection.module.css';

const EligibilitySection = () => {
  // Eligibility criteria with their details
  const eligibilityCriteria = [
    {
      id: 1,
      title: 'Registered Business',
      description: 'Must be a legally registered business or company with proper documentation',
    },
    {
      id: 2,
      title: 'Valid LPO',
      description: 'Valid purchase order from a government entity or reputable corporate organization',
    },
    {
      id: 3,
      title: 'Operational History',
      description: 'Minimum of 3-6 months operational history with verifiable business activities',
    },
    {
      id: 4,
      title: 'Execution Capability',
      description: 'Demonstrated ability to execute and fulfill the purchase order requirements',
    },
    {
      id: 5,
      title: 'Financial Track Record',
      description: 'Good financial standing with no major adverse credit history',
    }
  ];

  return (
    <section className={styles.eligibilitySection} id="eligibility">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.title}>Eligibility Requirements</h2>
          <p className={styles.subtitle}>
            To qualify for our LPO financing, your business should meet the following criteria:
          </p>
        </div>

        <div className={styles.criteriaContainer}>
          {eligibilityCriteria.map((criterion) => (
            <div key={criterion.id} className={styles.criterionCard}>
              <div className={styles.checkmarkWrapper}>
                <svg 
                  className={styles.checkmark} 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </div>
              <div className={styles.criterionContent}>
                <h3 className={styles.criterionTitle}>{criterion.title}</h3>
                <p className={styles.criterionDescription}>{criterion.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.noteContainer}>
          <div className={styles.noteIcon}>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className={styles.infoIcon}
              aria-hidden="true"
            >
              <path 
                fillRule="evenodd" 
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
          <p className={styles.noteText}>
            Meeting these requirements doesn't guarantee approval. Each application is assessed individually based on various factors. 
            <span className={styles.contactLink}> Contact us</span> for a personalized assessment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;
