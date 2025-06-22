import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from './HeroSection2';
import ServicesGrid from './ServicesGrid/ServicesGrid';
import WhyChooseTrinitySection from './WhyChooseTrinity/WhyChooseTrinitySection';
import ProcessTimeline from './ProcessTimeline/ProcessTimeline';
import ContactForm from './ContactForm/ContactForm';

const Tradefinance = () => {
  return (
    <>
      <Helmet>
        <title>Trade Finance Services | Bank Instrument | Trinity Financing</title>
        <meta name="description" content="Secure, efficient financial instruments to power your international trade and business expansion" />
        <meta name="keywords" content="Trade Finance Services, bank guarantee, letter of credit, Surety bond, trade finance, international trade, business expansion" />
        <meta name="author" content="Trinity" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <link rel="canonical" href='https://trinityfinancing.com' />
      </Helmet>
      <div>
        <HeroSection />
        <ServicesGrid />
        <WhyChooseTrinitySection />
        <ProcessTimeline />
        <ContactForm />
        {/* Additional trade finance sections can be added here */}
      </div>
    </>
  );
};

export default Tradefinance;
