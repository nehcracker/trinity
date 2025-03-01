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
      icon: '👑',
      initials: 'AR',
      color: '#fe6700',
      background: 'rgba(254, 103, 0, 0.1)',
      credentials: 'MBA, Harvard Business School',
      experience: '15+ years in investment banking',
      expertise: 'Strategic partnerships, capital acquisition, corporate financing'
    },
    {
      id: 2,
      name: 'Michael Chen',
      position: 'Chief Financial Strategist',
      icon: '📊',
      initials: 'MC',
      color: '#3756f9',
      background: 'rgba(55, 86, 249, 0.1)',
      credentials: 'CFA, Ph.D. in Economics',
      experience: '12+ years in financial consulting',
      expertise: 'Risk assessment, market analysis, asset-based lending'
    },
    {
      id: 3,
      name: 'Sophia Williams',
      position: 'Real Estate Finance Director',
      icon: '🏢',
      initials: 'SW',
      color: '#32a852',
      background: 'rgba(50, 168, 82, 0.1)',
      credentials: 'Licensed Real Estate Broker, MBA',
      experience: '10+ years in commercial real estate',
      expertise: 'Property development financing, commercial mortgages'
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
            At Trinity Financing Agent, we are committed to bridging the financial gap for businesses, 
            organizations, and development projects. <strong>With a deep understanding of global funding opportunities,
            we specialize in securing grants, donations, and development funds to drive economic growth, social 
            impact, and sustainable development.</strong>
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

        {/* Redesigned Team Section - No Images */}
        <motion.div
          className="team-section"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="team-title">Our Leadership Team</h3>
          
          <div className="team-cards">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                className="team-card"
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.3 }
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.2 }}
              >
                <div className="card-header" style={{ backgroundColor: member.background }}>
                  <div className="member-avatar" style={{ backgroundColor: member.color }}>
                    {member.initials}
                  </div>
                  <div className="member-role-icon">
                    {member.icon}
                  </div>
                </div>
                
                <div className="card-content">
                  <h4 className="member-name">{member.name}</h4>
                  <p className="member-position">{member.position}</p>
                  
                  <div className="member-details">
                    <div className="member-detail">
                      <span className="detail-label">Credentials:</span>
                      <span className="detail-value">{member.credentials}</span>
                    </div>
                    <div className="member-detail">
                      <span className="detail-label">Experience:</span>
                      <span className="detail-value">{member.experience}</span>
                    </div>
                    <div className="member-detail">
                      <span className="detail-label">Expertise:</span>
                      <span className="detail-value">{member.expertise}</span>
                    </div>
                  </div>
                  
                  <div className="connect-link">
                    <a href={`/team/${member.id}`}>Connect</a>
                  </div>
                </div>
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
              to="contact"
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