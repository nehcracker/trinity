// src/components/ServicesGrid/ServicesGrid.jsx
import React from 'react';
import styles from './ServicesGrid.module.css';
import { FaUniversity, FaFileContract, FaHardHat, 
         FaCreditCard, FaChartLine, FaGlobeAmericas } from 'react-icons/fa';

const ServicesGrid = () => {
  const services = [
    {
      id: 'bank-guarantees',
      icon: <FaUniversity />,
      title: 'Bank Guarantees',
      description: 'Comprehensive guarantee solutions including bid bonds, performance guarantees, and advance payment guarantees to secure your business transactions.',
      link: '/services/bank-guarantees',
      className: styles.bankGuarantees
    },
    {
      id: 'LPOFinancing',
      icon: <FaFileContract />,
      title: 'LPO Financing',
      description: 'Local purchase order funding solutions and supplier payment financing to help you fulfill orders and maintain smooth cash flow operations.',
      link: '/LPOFinancing',
      className: styles.lpoFinancing
    },
    {
      id: 'contract-financing',
      icon: <FaHardHat />,
      title: 'Contract Financing',
      description: 'Specialized project financing and construction contract funding to support your large-scale projects from inception to completion.',
      link: '/services/contract-financing',
      className: styles.contractFinancing
    },
    {
      id: 'sblc-lc',
      icon: <FaCreditCard />,
      title: 'SBLC & LC',
      description: 'Standby letters of credit and documentary letters of credit services to facilitate secure international and domestic trade transactions.',
      link: '/services/letters-of-credit',
      className: styles.sblcLc
    },
    {
      id: 'proof-of-funds',
      icon: <FaChartLine />,
      title: 'Proof of Funds',
      description: 'Bank statements, account verification, and proof of funds documentation to support your business credibility and financial standing.',
      link: '/services/proof-of-funds',
      className: styles.proofOfFunds
    },
    {
      id: 'trade-finance',
      icon: <FaGlobeAmericas />,
      title: 'Trade Finance',
      description: 'Complete import/export financing solutions and documentary collections to facilitate smooth international trade operations.',
      link: '/services/trade-finance',
      className: styles.tradeFinance
    }
  ];

  return (
    <section className={styles.servicesSection}>
      <div className={styles.servicesContainer}>
        <h2 className={styles.servicesTitle}>Our Trade Finance Services</h2>
        <p className={styles.servicesSubtitle}>
          Comprehensive financial solutions tailored to meet your business needs. 
          From bank guarantees to trade finance, we provide the expertise and support 
          to help your business thrive in today's competitive market.
        </p>
        
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div 
              key={service.id}
              className={`${styles.serviceCard} ${service.className}`}
            >
              <div className={styles.serviceIcon}>
                {service.icon}
              </div>
              <h3 className={styles.serviceTitle}>
                {service.title}
              </h3>
              <p className={styles.serviceDescription}>
                {service.description}
              </p>
              <a href={service.link} className={styles.serviceLink}>
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;
