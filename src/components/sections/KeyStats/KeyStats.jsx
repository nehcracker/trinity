import React from 'react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import './KeyStats.css';

const KeyStats = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const stats = [
    {
      id: 1,
      icon: '🏦',
      value: 5,
      suffix: 'B+',
      label: 'in Financed Projects',
      prefix: '$'
    },
    {
      id: 2,
      icon: '👥',
      value: 500,
      suffix: '+',
      label: 'Satisfied Clients Worldwide',
      prefix: ''
    },
    {
      id: 3,
      icon: '📅',
      value: 15,
      suffix: '+',
      label: 'Years of Industry Experience',
      prefix: ''
    },
    {
      id: 4,
      icon: '🌍',
      value: 130,
      suffix: '+',
      label: 'Countries Served',
      prefix: ''
    }
  ];

  return (
    <section id="stats" className="stats-section" ref={ref}>
      <div className="stats-container">
        <motion.div 
          className="stats-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="stats-title">Our Financial Impact</h2>
          <p className="stats-subtitle">
            We're proud of the results we've delivered for businesses and investors worldwide.
          </p>
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              className="stat-card"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(254, 103, 0, 0.05)' }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-value-container">
                <span className="stat-prefix">{stat.prefix}</span>
                {inView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    separator=","
                    delay={0.3}
                    className="stat-value"
                  />
                ) : (
                  <span className="stat-value">0</span>
                )}
                <span className="stat-suffix">{stat.suffix}</span>
              </div>
              <p className="stat-label">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyStats;