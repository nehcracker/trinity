
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Button from '../../common/Button/Button';

import './AboutUs.css';

const AboutUs = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const teamMembers = [
    {
      id: 1,
      name: 'Alexandra Reynolds',
      position: 'CEO & Founder',
      image: '/assets/images/team-1.jpg'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Chief Financial Strategist',
      image: '/assets/images/team-2.jpg'
    },
    {
      id: 3,
      name: 'Sophia Williams',
      position: 'Real Estate Finance Director',
      image: '/assets/images/team-3.jpg'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-container">
        <motion.div 
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="about-title">Who We Are</h2>
          <p className="about-subtitle">
          Our expertise covers <strong>government grants, international development funds, philanthropic contributions, and corporate social responsibility (CSR) funding. 
          We work closely with NGOs, startups, community organizations, and businesses</strong> to identify, apply for, and secure financial support tailored to their needs. 
          <br></br>By leveraging our global network of donors, foundations, and funding agencies, we help clients navigate complex application processes, meet eligibility criteria, 
          and maximise their chances of receiving grants and donations for impactful and sustainable growth.

          </p>
        </motion.div>

        <motion.div 
          className="about-features"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div 
            className="feature-card"
            variants={itemVariants}
          >
            <div className="feature-icon">✅</div>
            <h3 className="feature-title">Decades of Experience</h3>
            <p className="feature-text">
              Our team brings over 30 years of combined experience in global financing, 
              ensuring expert guidance for every client.
            </p>
          </motion.div>

          <motion.div 
            className="feature-card"
            variants={itemVariants}
          >
            <div className="feature-icon">✅</div>
            <h3 className="feature-title">Trusted Banking Partnerships</h3>
            <p className="feature-text">
              We've established relationships with top-tier financial institutions worldwide, 
              facilitating seamless transactions for our clients.
            </p>
          </motion.div>

          <motion.div 
            className="feature-card"
            variants={itemVariants}
          >
            <div className="feature-icon">✅</div>
            <h3 className="feature-title">Custom Financing Solutions</h3>
            <p className="feature-text">
              We don't believe in one-size-fits-all approaches. Each financing solution is 
              tailored to meet your specific business needs and goals.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="team-section"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="team-title">Our Leadership Team</h3>
          
          <div className="team-members">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                className="team-member"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 + index * 0.2 } } : { opacity: 0, y: 20 }}
              >
                <div 
                  className="member-image"
                  style={{ backgroundImage: `url(${member.image})` }}
                ></div>
                <h4 className="member-name">{member.name}</h4>
                <p className="member-position">{member.position}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Call-to-action with react-scroll */}
        <motion.div 
          className="about-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <h3 className="cta-title">Ready to explore our financial solutions?</h3>
          <div className="cta-buttons">
            {/* Button that uses react-scroll via the Button component */}
            <Button 
              text="View Our Services" 
              to="services"
              smooth={true}
              duration={800}
              offset={-70}
              className="primary-button"
            />
            
            <Button 
              text="Contact Us" 
              to="footer"
              smooth={true}
              duration={800}
              offset={-70}
              className="secondary-button about-secondary-button"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
