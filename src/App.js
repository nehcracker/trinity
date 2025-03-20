import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import HeroSection from './components/sections/HeroSection/HeroSection';
import ServicesSlider from './components/sections/ServicesSlider/ServicesSlider';
import AboutUs from './components/sections/AboutUs/AboutUs';
import KeyStats from './components/sections/KeyStats/KeyStats';
import ContactSection from './components/sections/contact/ContactSection';
import GrantServicesSection from './components/sections/GrantServices/GrantServicesSection';
import TrinityServicesSection from './components/sections/servicesection/TrinityServicesSection';

console.log("App component is rendering"); // Log for debugging
console.log("HeroSection component is rendering"); // Log for debugging

function App() {
  // Scroll behavior for smooth scrolling
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="app">
      <Navbar />
      
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

      <Footer />
      
    </div>
  );
}

export default App;
