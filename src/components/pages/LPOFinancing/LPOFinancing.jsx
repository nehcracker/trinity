import React from 'react';
import { Helmet } from 'react-helmet';
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
      <Helmet>
        <title>LPO Financing | Capital Financing | Business Loans</title>
        <meta name="description" content="Explore our LPO Financing solutions to support your business growth with flexible and reliable financing options." />
        <meta name="keywords" content="LPO Financing, Business Loans, Purchase Order Financing, Business line of credit, Contract financing, contract financing, Commercial business loan, Purchase order, LPO financing, Business financing, Business capital loans, Trinity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:image" content="https://trinityfinancing.com/micro-finance.jpg" />
        <link rel="canonical" href="https://trinityfinancing.com/lpofinancing/" />
      </Helmet>
      
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
