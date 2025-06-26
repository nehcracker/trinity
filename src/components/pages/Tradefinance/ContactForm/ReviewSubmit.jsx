import React from 'react';
import { Helmet } from 'react-helmet';
import styles from './ReviewSubmit.module.css';

const ReviewSubmit = ({ 
  formData, 
  onSubmit, 
  isSubmitting, 
  turnstileRef,
  onBack,
  onInputChange
}) => {
  const { 
    selectedServices, 
    companyName, 
    contactPerson, 
    email, 
    phone, 
    country,
    amount,
    currency,
    timeline,
    description,
    termsAccepted,
    privacyAccepted,
    marketingOptIn
  } = formData;

  const formatServices = () => {
    return selectedServices.map(service => (
      <div key={service} className={styles.serviceItem}>
        <div className={styles.serviceIcon}>
          {/* You can replace with actual icons based on service type */}
          <span className={styles.icon}>•</span>
        </div>
        <span>{service}</span>
      </div>
    ));
  };

  return (
    <>
      <Helmet>
        <title>Review Your Application - Trinity Finance</title>
        <meta name="description" content="Review and submit your financing application" />
      </Helmet>
      
      <div className={styles.reviewContainer}>
        <h2 className={styles.sectionTitle}>Review Your Application</h2>
        <p className={styles.sectionDescription}>
          Please review your information before submitting your application.
        </p>

        <div className={styles.reviewSection}>
          <h3>Selected Services</h3>
          <div className={styles.servicesGrid}>
            {formatServices()}
          </div>
        </div>

        <div className={styles.twoColumnLayout}>
          <div className={styles.column}>
            <div className={styles.reviewSection}>
              <h3>Company Information</h3>
              <div className={styles.detailItem}>
                <span className={styles.label}>Company Name:</span>
                <span className={styles.value}>{companyName}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Country:</span>
                <span className={styles.value}>{country}</span>
              </div>
            </div>
          </div>

          <div className={styles.column}>
            <div className={styles.reviewSection}>
              <h3>Contact Details</h3>
              <div className={styles.detailItem}>
                <span className={styles.label}>Contact Person:</span>
                <span className={styles.value}>{contactPerson}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{email}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Phone:</span>
                <span className={styles.value}>{phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.reviewSection}>
          <h3>Transaction Overview</h3>
          <div className={styles.twoColumnLayout}>
            <div className={styles.column}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Amount:</span>
                <span className={styles.value}>{currency} {amount}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Timeline:</span>
                <span className={styles.value}>{timeline}</span>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Description:</span>
                <span className={styles.value}>{description}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.submitForm}>
          <div className={styles.checkboxContainer}>
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={termsAccepted}
                onChange={(e) => onInputChange('termsAccepted', e.target.checked)}
                required
              />
              <label htmlFor="termsAccepted">
                I accept the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms and Conditions</a>*
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="privacyAccepted"
                name="privacyAccepted"
                checked={privacyAccepted}
                onChange={(e) => onInputChange('privacyAccepted', e.target.checked)}
                required
              />
              <label htmlFor="privacyAccepted">
                I acknowledge the <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>*
              </label>
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="marketingOptIn"
                name="marketingOptIn"
                checked={marketingOptIn}
                onChange={(e) => onInputChange('marketingOptIn', e.target.checked)}
              />
              <label htmlFor="marketingOptIn">
                I would like to receive updates about services and promotions
              </label>
            </div>
          </div>

          <div className={styles.turnstileContainer} ref={turnstileRef}></div>
        </div>
      </div>
    </>
  );
};

export default ReviewSubmit;
