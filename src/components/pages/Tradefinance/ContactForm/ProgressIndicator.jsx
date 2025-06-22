// ProgressIndicator.jsx
import React from 'react';
import styles from './ProgressIndicator.module.css';

function ProgressIndicator({ currentStep, totalSteps }) {
  const steps = [
    { number: 1, title: 'Service Selection' },
    { number: 2, title: 'Essential Details' },
    { number: 3, title: 'Review & Submit' }
  ];
  
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
  
  return (
    <div className={styles.progressIndicator}>
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      
      <div className={styles.progressSteps}>
        {steps.map(step => {
          const isActive = currentStep >= step.number;
          const isCurrent = currentStep === step.number;
          
          return (
            <div 
              key={step.number} 
              className={`${styles.progressStep} ${isActive ? styles.active : ''} ${isCurrent ? styles.current : ''}`}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepTitle}>{step.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressIndicator;