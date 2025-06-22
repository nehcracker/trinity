import React, { useState, useEffect, useRef } from 'react';
import { FaFileAlt, FaFileSignature, FaBuilding, FaCheckCircle, FaStamp } from 'react-icons/fa';
import './ProcessTimeline.css';

const ProcessTimeline = () => {
  const [activeStep, setActiveStep] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef(null);

  const steps = [
    {
      id: 1,
      title: "Initial Consultation",
      icon: <FaFileAlt />,
      description: "Our team reviews your business needs and advises on the most suitable financial instruments for your specific trade requirements."
    },
    {
      id: 2,
      title: "Application Submission",
      icon: <FaFileSignature />,
      description: "Complete our streamlined application process with the necessary documentation to initiate your trade finance request."
    },
    {
      id: 3,
      title: "Bank Processing",
      icon: <FaBuilding />,
      description: "Our banking partners evaluate your application and prepare the required financial instruments according to international standards."
    },
    {
      id: 4,
      title: "Approval & Documentation",
      icon: <FaCheckCircle />,
      description: "Upon approval, we prepare all necessary documentation and verify details to ensure compliance with regulatory requirements."
    },
    {
      id: 5,
      title: "Instrument Issuance",
      icon: <FaStamp />,
      description: "The final financial instrument is issued and delivered to you, ready for use in your international trade transactions."
    }
  ];

  const handleStepClick = (stepId) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const element = timelineRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // If the element is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate how much of the element is visible
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        const visiblePercentage = visibleHeight / element.offsetHeight;
        
        // Set progress based on visibility
        setScrollProgress(Math.min(Math.max(visiblePercentage, 0), 1));
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="process-timeline-container" ref={timelineRef}>
      <h2 className="timeline-title">Our Financing Process</h2>
      <p className="timeline-subtitle">A streamlined approach to securing your trade finance needs</p>
      
      <div className="timeline">
        <div 
          className="timeline-progress-bar" 
          style={{ width: `${scrollProgress * 100}%` }}
        ></div>
        
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`timeline-step ${activeStep === step.id ? 'active' : ''}`}
            onClick={() => handleStepClick(step.id)}
          >
            <div className="step-icon">
              {step.icon}
            </div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <div className="step-description">
                <p>{step.description}</p>
              </div>
            </div>
            <div className="step-number">{step.id}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessTimeline;
