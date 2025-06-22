// steps/ServiceSelection.jsx
import React from 'react';
import styles from './ServiceSelection.module.css';

// Service definitions
const services = [
  {
    id: 'bank-guarantees',
    title: 'Bank Guarantees',
    description: 'Bid bonds, performance guarantees, advance payment guarantees',
    icon: '🏦'
  },
  {
    id: 'lpo-financing',
    title: 'LPO Financing',
    description: 'Local purchase order funding, supplier payments',
    icon: '📄'
  },
  {
    id: 'contract-financing',
    title: 'Contract Financing',
    description: 'Project financing, construction contracts',
    icon: '📝'
  },
  {
    id: 'sblc-lc',
    title: 'SBLC & LC',
    description: 'Standby letters of credit, documentary letters of credit',
    icon: '📃'
  },
  {
    id: 'proof-of-funds',
    title: 'Proof of Funds',
    description: 'Bank statements, account verification',
    icon: '💰'
  },
  {
    id: 'trade-finance',
    title: 'Trade Finance',
    description: 'Import/export financing, documentary collections',
    icon: '🚢'
  }
];

function ServiceSelection({ selectedServices, dispatch, errors }) {
  const toggleService = (serviceId) => {
    const isSelected = selectedServices.includes(serviceId);
    let updatedServices;
    
    if (isSelected) {
      updatedServices = selectedServices.filter(id => id !== serviceId);
    } else {
      updatedServices = [...selectedServices, serviceId];
    }
    
    dispatch({ 
      type: 'UPDATE_SERVICES',
      services: updatedServices
    });
  };
  
  return (
    <div className={styles.serviceSelection}>
      <h2 className={styles.title}>What services are you interested in?</h2>
      <p className={styles.stepDescription}>Select one or more services that match your needs</p>
      
      <div className={styles.servicesGrid}>
        {services.map(service => (
          <div 
            key={service.id}
            className={`${styles.serviceCard} ${selectedServices.includes(service.id) ? styles.selected : ''}`}
            onClick={() => toggleService(service.id)}
          >
            <div className={styles.serviceIcon}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <div className={styles.serviceCheckbox}>
              <div className={styles.checkboxInner}></div>
            </div>
          </div>
        ))}
      </div>
      
      {errors.selectedServices && (
        <div className={styles.errorMessage}>{errors.selectedServices}</div>
      )}
    </div>
  );
}

export default ServiceSelection;