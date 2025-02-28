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

  const services = [
    {
        id: 1,
        title: 'Business Loans & Investment Financing',
        image: '/assets/images/business.jpg',
        shortDesc: 'Flexible funding solutions to fuel business growth and expansion.',
        fullDesc: 'Our business loan and investment financing solutions are designed to meet your specific needs, whether you\'re looking to expand operations, invest in new equipment, or capitalize on market opportunities. With competitive rates and flexible terms, we ensure you have the capital needed to achieve your business objectives.',
        
    },
    {
        id: 2,
        title: 'Asset-Based Lending',
        image: '/assets/images/asset-based.jpg',
        shortDesc: 'Leveraging your existing assets to secure competitive funding.',
        fullDesc: 'Our asset-based lending solutions allow you to unlock the value of your existing assets, including inventory, equipment, and accounts receivable. This flexible financing approach provides immediate liquidity without diluting ownership, making it ideal for businesses with substantial assets but limited cash flow.',
        
    },
    {
        id: 3,
        title: 'Real Estate Financing',
        image: '/assets/images/real-estate.jpg',
        shortDesc: 'Specialized funding for commercial and residential real estate ventures.',
        fullDesc: 'From commercial property acquisition to residential developments, our real estate financing options provide the resources you need to secure and develop profitable properties. Our team of experts will guide you through the process, ensuring optimal financing structures that align with your investment strategy.',
        
    },
    {
        id: 1,
        title: 'Business Loans & Investment Financing',
        image: '/assets/images/business.jpg',
        shortDesc: 'Flexible funding solutions to fuel business growth and expansion.',
        fullDesc: 'Our business loan and investment financing solutions are designed to meet your specific needs, whether you\'re looking to expand operations, invest in new equipment, or capitalize on market opportunities. With competitive rates and flexible terms, we ensure you have the capital needed to achieve your business objectives.',
        
    },
    {
        id: 2,
        title: 'Asset-Based Lending',
        image: '/assets/images/asset-based.jpg',
        shortDesc: 'Leveraging your existing assets to secure competitive funding.',
        fullDesc: 'Our asset-based lending solutions allow you to unlock the value of your existing assets, including inventory, equipment, and accounts receivable. This flexible financing approach provides immediate liquidity without diluting ownership, making it ideal for businesses with substantial assets but limited cash flow.',
        
    },
    {
        id: 3,
        title: 'Real Estate Financing',
        image: '/assets/images/real-estate.jpg',
        shortDesc: 'Specialized funding for commercial and residential real estate ventures.',
        fullDesc: 'From commercial property acquisition to residential developments, our real estate financing options provide the resources you need to secure and develop profitable properties. Our team of experts will guide you through the process, ensuring optimal financing structures that align with your investment strategy.',
        
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
          <h2 className="services-title">
            Financial services tailored to your needs 
          </h2>
          <p className="services-subtitle">
          We offer comprehensive financial sourcing solutions, including <strong>non-collateral funds, 
          no-guarantee loans, and financing with a low interest rate of 6.5% APR.</strong> Our goal is to 
          provide businesses and real estate investors with seamless access to funding tailored to their needs.
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
            navigation
            pagination={{ clickable: true }}
            autoplay={{ 
              delay: 5000, 
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true} // Enable infinite loop
            loopFillGroupWithBlank={true}
            speed={800} // Transition speed in ms
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