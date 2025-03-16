import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Building, Users, Lightbulb, UsersRound, GraduationCap } from 'lucide-react';
import './GrantServicesSection.css';

const GrantServicesSection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  const services = [
    {
      title: "Business Grants",
      icon: <Building size={15} />,
      description: "We help entrepreneurs and business owners access grants that provide essential financial backing for startups, expansions, and innovation-driven initiatives.",
      color: "#fe6700"
    },
    {
      title: "Nonprofit & Community Grants",
      icon: <Users size={15} />,
      description: "Nonprofit organizations and community-driven projects require financial assistance to continue making a difference. We identify grant opportunities that support social initiatives.",
      color: "#3756f9"
    },
    {
      title: "Government & Institutional Grants",
      icon: <Building size={15} />,
      description: "Government agencies and institutions offer various funding programs to support businesses, research, and community development. We guide you through the application process.",
      color: "rgb(50, 168, 82)"
    },
    {
      title: "Research & Innovation Grants",
      icon: <Lightbulb size={15} />,
      description: "Are you developing groundbreaking technology, conducting scientific research, or working on an innovative project? We source grants that support research and development initiatives.",
      color: "#fe6700"
    },
    {
      title: "Women & Minority-Owned Business Grants",
      icon: <UsersRound size={15} />,
      description: "We advocate for diversity and inclusion by helping women-owned businesses, minority entrepreneurs, and underserved communities access funding opportunities.",
      color: "#3756f9"
    },
    {
      title: "Education & Scholarship Grants",
      icon: <GraduationCap size={15} />,
      description: "We assist educational institutions, students, and organizations in finding grants and scholarships that support academic programs, training, and capacity-building projects.",
      color: "rgb(50, 168, 82)"
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === services.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? services.length - 1 : prev - 1));
  };

      // Updated ServiceCard component with more compact design
    const ServiceCard = ({ service, isActive }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const cardStyle = {
      backgroundColor: isHovered ? service.color : 'white',
      color: isHovered ? 'white' : 'black',
      borderLeft: `4px solid ${service.color}`,
      boxShadow: isHovered ? '0 10px 15px rgba(0,0,0,0.1)' : '0 4px 6px rgba(0,0,0,0.05)',
      opacity: isActive ? 1 : 0.6,
      transform: isHovered ? 'translateY(-5px)' : 'translateY(0)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
    };

    const iconStyle = {
      color: isHovered ? 'white' : service.color
    };
    
    return (
      <div 
        className={`service-card ${isActive ? 'active' : ''}`}
        style={cardStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="service-icon" style={iconStyle}>
          {service.icon}
        </div>
        <h3 className="service-title">{service.title}</h3>
        <p className="service-description">{service.description}</p>
      </div>
    );
  };

  return (
    <div className="grant-services-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Grant Sourcing Services</h2>
          <div className="divider"></div>
          <p className="section-description">
            We connect you with the right funding opportunities to bring your vision to life. 
            Explore our specialized grant services below.
          </p>
        </div>
        
        {/* Desktop View - 3 cards in a row */}
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} isActive={true} />
          ))}
        </div>
        
        {/* Mobile View - Slider */}
        <div className="services-slider">
          <div className="slider-container">
            <div className="slider-item">
              <ServiceCard service={services[activeSlide]} isActive={true} />
            </div>
          </div>
          
          <div className="slider-controls">
            <button 
              onClick={prevSlide}
              className="slider-button prev"
              aria-label="Previous service"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="slider-indicators">
              {services.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`slider-indicator ${activeSlide === index ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="slider-button next"
              aria-label="Next service"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
        
        <div className="cta-container">
          <a 
            href="#contact"
            className="cta-button"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
        
        
  );
};

export default GrantServicesSection;