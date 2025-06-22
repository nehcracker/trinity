import React from 'react';
import styles from './LPOFinancing.module.css';

// Import section components
import HeroSectionLPO from './HeroSectionLPO/HeroSectionLPO';
import IntroductionSection from './IntroductionSection/IntroductionSection';
import HowItWorksSection from './HowItWorksSection/HowItWorksSection';
import EligibilitySection from './EligibilitySection/EligibilitySection';
import BenefitsSection from './BenefitsSection/BenefitsSection';
import DocumentsSection from './DocumentsSection/DocumentsSection';
import CTASection from './CTASection/CTASection';

const LPOFinancing = () => {
  return (
    <div className={styles.container}>
      {/* SEO Meta Tags would be handled by a helmet component in a real implementation */}
      
      {/* Main content sections */}
      <HeroSectionLPO />
      <IntroductionSection />
      <HowItWorksSection />
      <EligibilitySection />
      <BenefitsSection />
      <DocumentsSection />
      <CTASection />
      
    </div>
  );
};

export default LPOFinancing;
