import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../../sections/HeroSection/HeroSection';
import ServicesSlider from '../../sections/ServicesSlider/ServicesSlider';
import TrinityServicesSection from '../../sections/servicesection/TrinityServicesSection';
import GrantServicesSection from '../../sections/GrantServices/GrantServicesSection';
import AboutUs from '../../sections/AboutUs/AboutUs';
import KeyStats from '../../sections/KeyStats/KeyStats';
import ContactSection from '../../sections/contact/ContactSection';

const Home = () => {
  // Scroll behavior for smooth scrolling
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-content">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="section-container"
      >
        <HeroSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="section-container"
      >
       <ServicesSlider />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="section-container"
      >
      <TrinityServicesSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="section-container"
      >
      <GrantServicesSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="section-container"
      >
      <AboutUs />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="section-container"
      >
      <KeyStats />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="section-container"
      >
      <ContactSection />
      </motion.div>
    </main>
  );
};

export default Home;
