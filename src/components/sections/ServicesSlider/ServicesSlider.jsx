import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

import './ServicesSlider.css';

const ServicesSlider = () => {
  const [expandedService, setExpandedService] = useState(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Updated services array with new content
  const services = [
    {
      id: 1,
      title: 'Donations',
      image: '/assets/images/donations-d.jpg',
      shortDesc: 'Facilitating corporate and private donations for impactful projects.',
      fullDesc: 'We connect donors with high-impact social and humanitarian initiatives, and structure effective fundraising strategies for non-profits and charitable organizations. Our team helps maximize donation impact through strategic partnerships and transparent fund management.',
    },
    {
      id: 2,
      title: 'Government & NGO Grants',
      image: '/assets/images/grants.jpg',
      shortDesc: 'Expert assistance in securing grants from government bodies and international organizations.',
      fullDesc: 'We provide comprehensive assistance in securing grants from local governments, international NGOs, and global financial institutions. Our experts offer guidance on eligibility criteria, application processes, and compliance requirements, alongside professional grant writing and proposal development services for high success rates.',
    },
    {
      id: 3,
      title: 'Development Funds',
      image: '/assets/images/develpoment-funds.jpg',
      shortDesc: 'Sourcing funding for infrastructure, social, and economic development projects.',
      fullDesc: 'Our team specializes in sourcing funding for infrastructure, social, and economic development projects. We support businesses, governments, and organizations in accessing sustainable financing and structuring long-term funding solutions for both public and private sector development initiatives.',
    },
    {
      id: 4,
      title: 'Microfinance & Community Loans',
      image: '/assets/images/micro-finance.jpg',
      shortDesc: 'Providing funding for small businesses and entrepreneurs in underserved communities.',
      fullDesc: 'We facilitate access to low-interest community development loans and partner with impact investors to support grassroots projects. Our microfinance solutions are designed to empower small businesses and entrepreneurs in underserved communities, fostering economic growth and self-sufficiency.',
    },
    {
      id: 5,
      title: 'Impact Investment',
      image: '/assets/images/impact.jpg',
      shortDesc: 'Connecting investors with high-impact, socially responsible projects.',
      fullDesc: 'Our team specializes in structuring blended finance solutions for sustainable development and providing advisory services for ethical and impact-driven investments. We connect forward-thinking investors with high-impact, socially responsible projects that deliver both financial returns and meaningful social or environmental benefits.',
    },
    {
      id: 6,
      title: 'Crowdfunding & Alternative Financing',
      image: '/assets/images/crowdfunding.jpg',
      shortDesc: 'Helping organizations raise funds through innovative platforms and models.',
      fullDesc: 'We help organizations raise funds through global crowdfunding platforms, structure peer-to-peer lending and social impact investment campaigns, and support innovative financing models for sustainable projects. Our alternative financing solutions are perfect for creative initiatives that might not fit traditional funding models.',
    }
  ];

  const toggleServiceDetails = (id) => {
    if (expandedService === id) {
      setExpandedService(null);
    } else {
      setExpandedService(id);
    }
  };

  // Framer Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  return (
    <motion.section 
      id="services" 
      className="services-section"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <div className="services-container">
        <motion.div 
          className="services-header"
          variants={headerVariants}
        >
          <h2 className="services-title">Our Core Services</h2>
          <p className="services-subtitle">
            At Trinity Financing Agent, we connect businesses, non-profits, and development projects 
            with sustainable funding solutions. Our expertise ensures seamless access to <strong>donations</strong>, 
            <strong>government & NGO grants</strong>, and <strong>development funds</strong>, along with other tailored financing solutions.
          </p>
        </motion.div>

        <motion.div
          variants={headerVariants}
          className="services-slider-container"
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            spaceBetween={30}
            slidesPerView={1}
            centeredSlides={true} /* Center the slides */
            navigation
            pagination={{ clickable: true }}
            autoplay={{ 
              delay: 5000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            loopFillGroupWithBlank={true}
            speed={800}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="services-swiper"
          >
            {services.map((service) => (
              <SwiperSlide key={service.id}>
                <motion.div 
                  className="service-card"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="service-icon">{service.icon}</div>
                  <div 
                    className="service-image" 
                    style={{ backgroundImage: `url(${service.image})` }}
                  ></div>
                  
                  <div className="service-content">
                    <h3 className="service-title">{service.title}</h3>
                    
                    <AnimatePresence mode="wait">
                      {expandedService === service.id ? (
                        <motion.p 
                          className="service-description"
                          key="full"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {service.fullDesc}
                        </motion.p>
                      ) : (
                        <motion.p 
                          className="service-description"
                          key="short"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {service.shortDesc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    
                    <motion.button
                      onClick={() => toggleServiceDetails(service.id)}
                      className="service-button"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {expandedService === service.id ? 'Show Less' : 'Learn More'}
                    </motion.button>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
        
      </div>
    </motion.section>
  );
};

export default ServicesSlider;