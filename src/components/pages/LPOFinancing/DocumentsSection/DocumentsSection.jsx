import React from 'react';
import styles from './DocumentsSection.module.css';

const DocumentsSection = () => {
  // Document data array for easy maintenance
  const requiredDocuments = [
    {
      id: 'doc1',
      name: 'Local Purchase Order Copy',
      description: 'Original copy of the LPO from the client',
      essential: true
    },
    {
      id: 'doc2',
      name: 'Certificate of Incorporation',
      description: 'Proof of business registration',
      essential: true
    },
    {
      id: 'doc3',
      name: 'Director\'s ID/Passport and Tax Documents',
      description: 'Valid identification and tax compliance documents',
      essential: true
    },
    {
      id: 'doc4',
      name: 'Bank Statements',
      description: '3-6 months of recent statements',
      essential: true
    },
    {
      id: 'doc5',
      name: 'Pro Forma Invoice/Supplier Quotation',
      description: 'If applicable for your specific order',
      essential: true
    },
    {
      id: 'doc6',
      name: 'Company Profile',
      description: 'Background of your business operations',
      essential: false
    }
  ];

  return (
    <section className={styles.documentsSection} id="required-documents">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Required Documents</h2>
          <p className={styles.subtitle}>
            To process your LPO financing application quickly, please prepare the following documents:
          </p>
        </div>

        <div className={styles.documentsContainer}>
          <div className={styles.documentsList}>
            {requiredDocuments.map((doc) => (
              <div 
                key={doc.id} 
                className={`${styles.documentCard} ${!doc.essential ? styles.optional : ''}`}
              >
                <div className={styles.documentIcon} aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M5.625 1.5H9a3.75 3.75 0 013.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 013.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 01-1.875-1.875V3.375c0-1.036.84-1.875 1.875-1.875zm6.905 9.97a.75.75 0 00-1.06 0l-3 3a.75.75 0 101.06 1.06l1.72-1.72V18a.75.75 0 001.5 0v-4.19l1.72 1.72a.75.75 0 101.06-1.06l-3-3z" clipRule="evenodd" />
                    <path d="M14.25 5.25a5.23 5.23 0 00-1.279-3.434 9.768 9.768 0 016.963 6.963A5.23 5.23 0 0016.5 7.5h-1.875a.375.375 0 01-.375-.375V5.25z" />
                  </svg>
                </div>
                <div className={styles.documentContent}>
                  <h3 className={styles.documentName}>
                    {doc.name}
                    {!doc.essential && <span className={styles.optionalTag}>Optional</span>}
                  </h3>
                  <p className={styles.documentDescription}>{doc.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.documentsTips}>
            <div className={styles.tipCard}>
              <h3 className={styles.tipTitle}>Document Tips</h3>
              <ul className={styles.tipsList}>
                <li>Ensure all documents are clear and legible</li>
                <li>Documents should be recent (within the last 3 months where applicable)</li>
                <li>Submit digital copies in PDF format where possible</li>
                <li>All official documents should be properly certified if required</li>
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.additionalInfo}>
          <p>
            Our team might request additional documents based on your specific situation. 
            If you have questions about document requirements, please 
            <button className={styles.contactLink}>contact our support team</button>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DocumentsSection;
