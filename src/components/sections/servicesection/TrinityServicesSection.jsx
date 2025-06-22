import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Briefcase, Globe, Building, TrendingUp, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styles from './TrinityServicesSection.module.css';

const TrinityServicesSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoverService, setHoverService] = useState(null);

  const navigate = useNavigate();
  
  // Services data
  const services = [
    {
      id: 1,
      title: "Corporate & Business Financing",
      description: "Tailored funding solutions for businesses of all sizes",
      icon: <Briefcase size={18} />,
      items: ["Business expansion loans", "Working capital financing", "Asset-based lending", "Project financing"]
    },
    {
      id: 2,
      title: "Trade & Export Finance",
      description: "Efficient management of international transactions",
      icon: <Globe size={18} />,
      items: ["Letter of Credit (LC)", "Standby Letter of Credit (SBLC)", "Bank Guarantees (BG)", "Invoice factoring"]
    },
    {
      id: 3,
      title: "Project Financing",
      description: "Funding for large-scale infrastructure and development",
      icon: <Building size={18} />,
      items: ["Private equity funding", "Public-Private Partnerships", "Structured finance solutions"]
    },
    {
      id: 4,
      title: "Alternative Funding",
      description: "Non-traditional lending and investment options",
      icon: <TrendingUp size={18} />,
      items: ["Venture capital", "Private equity funding", "Debt restructuring", "Refinancing solutions"]
    },
    {
      id: 5,
      title: "Financial Consultancy",
      description: "Expert guidance to optimize funding strategies",
      icon: <Users size={18} />,
      items: ["Financial risk assessment", "Investment structuring", "Credit enhancement", "Proposal development"]
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      text: "Trinity Financing Agent has been a game-changer for our business. They helped us secure funding quickly and efficiently, making the process seamless. Their expertise and professionalism are unmatched.",
      author: "Jack Edwinson, CEO of Global Enterprises"
    },
    {
      id: 2,
      text: "We were struggling to find the right trade finance solution, but Trinity Financing Agent connected us with the perfect lender. Their team guided us through every step, ensuring a smooth transaction. Highly recommended!",
      author: "Maria L., CFO, Export Masters Ltd."
    },
    {
      id: 3,
      text: "The level of service and dedication from Trinity Financing Agent is outstanding. They provided excellent financial consultancy and sourced the best funding options for our infrastructure project. A trustworthy partner in finance!",
      author: "Alex Peterson., Managing Director, Future Infrastructure Group"
    }
  ];

  // Auto-slide for testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // Slide navigation
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <div className={styles.trinityContainer}>
      {/* Services Section */}
      <div className={styles.servicesSection}>
        <div className={styles.servicesContainer}>
          <h2 className={styles.sectionTitle}>Our Regular Services</h2>
          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <div 
                key={service.id}
                className={`${styles.serviceCard} ${hoverService === service.id ? styles.hovered : ''}`}
                onMouseEnter={() => setHoverService(service.id)}
                onMouseLeave={() => setHoverService(null)}
              >
                <div className={styles.serviceContent}>
                  <div className={styles.serviceHeader}>
                    <div className={styles.serviceIcon}>
                      {service.icon}
                    </div>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                  </div>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  <ul className={styles.serviceList}>
                    {service.items.map((item, index) => (
                      <li key={index} className={styles.serviceItem}>
                        <span className={styles.serviceBullet}>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.serviceFooter}>
                  <button 
                    className={styles.serviceButton}
                    onClick={() => {
                      if (service.id === 2) {
                        navigate('/tradefinance');
                      }
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Slider */}
      <div className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          <h2 className={styles.testimonialsTitle}>What Our Clients Say</h2>
          <div className={styles.testimonialsSliderContainer}>
            <div className={styles.testimonialsSlider}>
              <div 
                className={styles.testimonialsTrack}
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className={styles.testimonialSlide}>
                    <div className={styles.testimonialCard}>
                      <p className={styles.testimonialText}>"{testimonial.text}"</p>
                      <p className={styles.testimonialAuthor}>{testimonial.author}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <button 
              className={`${styles.sliderNavButton} ${styles.prevButton}`}
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className={`${styles.sliderNavButton} ${styles.nextButton}`}
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          <div className={styles.sliderDots}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`${styles.sliderDot} ${activeSlide === index ? styles.active : ''}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrinityServicesSection;