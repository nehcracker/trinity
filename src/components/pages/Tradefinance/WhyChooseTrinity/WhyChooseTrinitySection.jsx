// src/components/sections/WhyChooseTrinitySection.jsx

import React, { useEffect, useRef } from 'react';
import styles from './WhyChooseTrinitySection.module.css';
import { FaClock, FaGlobeAmericas, FaUserTie } from 'react-icons/fa';

const WhyChooseTrinitySection = () => {
  const clockRef = useRef(null);
  const globeRef = useRef(null);
  const expertRef = useRef(null);

  useEffect(() => {
    // Set up intersection observer to trigger animations when elements come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.animate);
          }
        });
      },
      { threshold: 0.2 }
    );

    // Store current values of refs
    const clockNode = clockRef.current;
    const globeNode = globeRef.current;
    const expertNode = expertRef.current;

    // Observe all benefit cards
    if (clockNode) observer.observe(clockNode);
    if (globeNode) observer.observe(globeNode);
    if (expertNode) observer.observe(expertNode);

    return () => {
      if (clockNode) observer.unobserve(clockNode);
      if (globeNode) observer.unobserve(globeNode);
      if (expertNode) observer.unobserve(expertNode);
    };
  }, []);

  return (
    <section className={styles.whyChooseSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Why Choose Trinity</h2>
        <p className={styles.sectionSubtitle}>
          We combine speed, global reach, and expertise to deliver superior financial solutions
        </p>

        <div className={styles.benefitsGrid}>
          {/* Speed Benefit */}
          <div className={styles.benefitCard} ref={clockRef}>
            <div className={styles.iconContainer}>
              <FaClock className={`${styles.benefitIcon} ${styles.clockIcon}`} />
              <div className={styles.iconBackground}></div>
            </div>
            <h3 className={styles.benefitTitle}>48-Hour Processing</h3>
            <p className={styles.benefitDescription}>
              Quick turnaround on all applications with our streamlined approval process and dedicated team of experts
            </p>
          </div>

          {/* Global Reach Benefit */}
          <div className={styles.benefitCard} ref={globeRef}>
            <div className={styles.iconContainer}>
              <FaGlobeAmericas className={`${styles.benefitIcon} ${styles.globeIcon}`} />
              <div className={styles.iconBackground}></div>
            </div>
            <h3 className={styles.benefitTitle}>Worldwide Network</h3>
            <p className={styles.benefitDescription}>
              Access to banking and financial partners across 120+ countries to support your global business operations
            </p>
          </div>

          {/* Expertise Benefit */}
          <div className={styles.benefitCard} ref={expertRef}>
            <div className={styles.iconContainer}>
              <FaUserTie className={`${styles.benefitIcon} ${styles.expertIcon}`} />
              <div className={styles.iconBackground}></div>
            </div>
            <h3 className={styles.benefitTitle}>15+ Years Experience</h3>
            <p className={styles.benefitDescription}>
              Our team of seasoned professionals brings decades of combined expertise in international trade finance
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseTrinitySection;
