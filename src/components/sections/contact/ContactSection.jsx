// ContactSection.jsx - Updated with word restriction validation

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ContactSection.css';

// Comprehensive list of countries for the dropdown
const countries = [
  { code: "", name: "Select Country" },
  { code: "AF", name: "Afghanistan" },
  { code: "AL", name: "Albania" },
  { code: "DZ", name: "Algeria" },
  { code: "AS", name: "American Samoa" },
  { code: "AD", name: "Andorra" },
  { code: "AO", name: "Angola" },
  { code: "AI", name: "Anguilla" },
  { code: "AQ", name: "Antarctica" },
  { code: "AG", name: "Antigua and Barbuda" },
  { code: "AR", name: "Argentina" },
  { code: "AM", name: "Armenia" },
  { code: "AW", name: "Aruba" },
  { code: "AU", name: "Australia" },
  { code: "AT", name: "Austria" },
  { code: "AZ", name: "Azerbaijan" },
  { code: "BS", name: "Bahamas" },
  { code: "BH", name: "Bahrain" },
  { code: "BD", name: "Bangladesh" },
  { code: "BB", name: "Barbados" },
  { code: "BY", name: "Belarus" },
  { code: "BE", name: "Belgium" },
  { code: "BZ", name: "Belize" },
  { code: "BJ", name: "Benin" },
  { code: "BM", name: "Bermuda" },
  { code: "BT", name: "Bhutan" },
  { code: "BO", name: "Bolivia" },
  { code: "BA", name: "Bosnia and Herzegovina" },
  { code: "BW", name: "Botswana" },
  { code: "BV", name: "Bouvet Island" },
  { code: "BR", name: "Brazil" },
  { code: "IO", name: "British Indian Ocean Territory" },
  { code: "BN", name: "Brunei Darussalam" },
  { code: "BG", name: "Bulgaria" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "KH", name: "Cambodia" },
  { code: "CM", name: "Cameroon" },
  { code: "CA", name: "Canada" },
  { code: "CV", name: "Cape Verde" },
  { code: "KY", name: "Cayman Islands" },
  { code: "CF", name: "Central African Republic" },
  { code: "TD", name: "Chad" },
  { code: "CL", name: "Chile" },
  { code: "CN", name: "China" },
  { code: "CX", name: "Christmas Island" },
  { code: "CC", name: "Cocos (Keeling) Islands" },
  { code: "CO", name: "Colombia" },
  { code: "KM", name: "Comoros" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "Congo, Democratic Republic of the" },
  { code: "CK", name: "Cook Islands" },
  { code: "CR", name: "Costa Rica" },
  { code: "CI", name: "Cote D'Ivoire" },
  { code: "HR", name: "Croatia" },
  { code: "CU", name: "Cuba" },
  { code: "CY", name: "Cyprus" },
  { code: "CZ", name: "Czech Republic" },
  { code: "DK", name: "Denmark" },
  { code: "DJ", name: "Djibouti" },
  { code: "DM", name: "Dominica" },
  { code: "DO", name: "Dominican Republic" },
  { code: "EC", name: "Ecuador" },
  { code: "EG", name: "Egypt" },
  { code: "SV", name: "El Salvador" },
  { code: "GQ", name: "Equatorial Guinea" },
  { code: "ER", name: "Eritrea" },
  { code: "EE", name: "Estonia" },
  { code: "ET", name: "Ethiopia" },
  { code: "FK", name: "Falkland Islands (Malvinas)" },
  { code: "FO", name: "Faroe Islands" },
  { code: "FJ", name: "Fiji" },
  { code: "FI", name: "Finland" },
  { code: "FR", name: "France" },
  { code: "GF", name: "French Guiana" },
  { code: "PF", name: "French Polynesia" },
  { code: "TF", name: "French Southern Territories" },
  { code: "GA", name: "Gabon" },
  { code: "GM", name: "Gambia" },
  { code: "GE", name: "Georgia" },
  { code: "DE", name: "Germany" },
  { code: "GH", name: "Ghana" },
  { code: "GI", name: "Gibraltar" },
  { code: "GR", name: "Greece" },
  { code: "GL", name: "Greenland" },
  { code: "GD", name: "Grenada" },
  { code: "GP", name: "Guadeloupe" },
  { code: "GU", name: "Guam" },
  { code: "GT", name: "Guatemala" },
  { code: "GG", name: "Guernsey" },
  { code: "GN", name: "Guinea" },
  { code: "GW", name: "Guinea-Bissau" },
  { code: "GY", name: "Guyana" },
  { code: "HT", name: "Haiti" },
  { code: "HM", name: "Heard Island and Mcdonald Islands" },
  { code: "VA", name: "Holy See (Vatican City State)" },
  { code: "HN", name: "Honduras" },
  { code: "HK", name: "Hong Kong" },
  { code: "HU", name: "Hungary" },
  { code: "IS", name: "Iceland" },
  { code: "IN", name: "India" },
  { code: "ID", name: "Indonesia" },
  { code: "IR", name: "Iran, Islamic Republic Of" },
  { code: "IQ", name: "Iraq" },
  { code: "IE", name: "Ireland" },
  { code: "IM", name: "Isle of Man" },
  { code: "IL", name: "Israel" },
  { code: "IT", name: "Italy" },
  { code: "JM", name: "Jamaica" },
  { code: "JP", name: "Japan" },
  { code: "JE", name: "Jersey" },
  { code: "JO", name: "Jordan" },
  { code: "KZ", name: "Kazakhstan" },
  { code: "KE", name: "Kenya" },
  { code: "KI", name: "Kiribati" },
  { code: "KP", name: "Korea, Democratic People's Republic of" },
  { code: "KR", name: "Korea, Republic of" },
  { code: "XK", name: "Kosovo" },
  { code: "KW", name: "Kuwait" },
  { code: "KG", name: "Kyrgyzstan" },
  { code: "LA", name: "Lao People's Democratic Republic" },
  { code: "LV", name: "Latvia" },
  { code: "LB", name: "Lebanon" },
  { code: "LS", name: "Lesotho" },
  { code: "LR", name: "Liberia" },
  { code: "LY", name: "Libyan Arab Jamahiriya" },
  { code: "LI", name: "Liechtenstein" },
  { code: "LT", name: "Lithuania" },
  { code: "LU", name: "Luxembourg" },
  { code: "MO", name: "Macao" },
  { code: "MK", name: "Macedonia, The Former Yugoslav Republic of" },
  { code: "MG", name: "Madagascar" },
  { code: "MW", name: "Malawi" },
  { code: "MY", name: "Malaysia" },
  { code: "MV", name: "Maldives" },
  { code: "ML", name: "Mali" },
  { code: "MT", name: "Malta" },
  { code: "MH", name: "Marshall Islands" },
  { code: "MQ", name: "Martinique" },
  { code: "MR", name: "Mauritania" },
  { code: "MU", name: "Mauritius" },
  { code: "YT", name: "Mayotte" },
  { code: "MX", name: "Mexico" },
  { code: "FM", name: "Micronesia, Federated States of" },
  { code: "MD", name: "Moldova, Republic of" },
  { code: "MC", name: "Monaco" },
  { code: "MN", name: "Mongolia" },
  { code: "ME", name: "Montenegro" },
  { code: "MS", name: "Montserrat" },
  { code: "MA", name: "Morocco" },
  { code: "MZ", name: "Mozambique" },
  { code: "MM", name: "Myanmar" },
  { code: "NA", name: "Namibia" },
  { code: "NR", name: "Nauru" },
  { code: "NP", name: "Nepal" },
  { code: "NL", name: "Netherlands" },
  { code: "AN", name: "Netherlands Antilles" },
  { code: "NC", name: "New Caledonia" },
  { code: "NZ", name: "New Zealand" },
  { code: "NI", name: "Nicaragua" },
  { code: "NE", name: "Niger" },
  { code: "NG", name: "Nigeria" },
  { code: "NU", name: "Niue" },
  { code: "NF", name: "Norfolk Island" },
  { code: "MP", name: "Northern Mariana Islands" },
  { code: "NO", name: "Norway" },
  { code: "OM", name: "Oman" },
  { code: "PK", name: "Pakistan" },
  { code: "PW", name: "Palau" },
  { code: "PS", name: "Palestinian Territory, Occupied" },
  { code: "PA", name: "Panama" },
  { code: "PG", name: "Papua New Guinea" },
  { code: "PY", name: "Paraguay" },
  { code: "PE", name: "Peru" },
  { code: "PH", name: "Philippines" },
  { code: "PN", name: "Pitcairn" },
  { code: "PL", name: "Poland" },
  { code: "PT", name: "Portugal" },
  { code: "PR", name: "Puerto Rico" },
  { code: "QA", name: "Qatar" },
  { code: "RE", name: "Reunion" },
  { code: "RO", name: "Romania" },
  { code: "RU", name: "Russian Federation" },
  { code: "RW", name: "Rwanda" },
  { code: "BL", name: "Saint Barthelemy" },
  { code: "SH", name: "Saint Helena" },
  { code: "KN", name: "Saint Kitts and Nevis" },
  { code: "LC", name: "Saint Lucia" },
  { code: "MF", name: "Saint Martin" },
  { code: "PM", name: "Saint Pierre and Miquelon" },
  { code: "VC", name: "Saint Vincent and the Grenadines" },
  { code: "WS", name: "Samoa" },
  { code: "SM", name: "San Marino" },
  { code: "ST", name: "Sao Tome and Principe" },
  { code: "SA", name: "Saudi Arabia" },
  { code: "SN", name: "Senegal" },
  { code: "RS", name: "Serbia" },
  { code: "SC", name: "Seychelles" },
  { code: "SL", name: "Sierra Leone" },
  { code: "SG", name: "Singapore" },
  { code: "SK", name: "Slovakia" },
  { code: "SI", name: "Slovenia" },
  { code: "SB", name: "Solomon Islands" },
  { code: "SO", name: "Somalia" },
  { code: "ZA", name: "South Africa" },
  { code: "GS", name: "South Georgia and the South Sandwich Islands" },
  { code: "SS", name: "South Sudan" },
  { code: "ES", name: "Spain" },
  { code: "LK", name: "Sri Lanka" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SJ", name: "Svalbard and Jan Mayen" },
  { code: "SZ", name: "Swaziland" },
  { code: "SE", name: "Sweden" },
  { code: "CH", name: "Switzerland" },
  { code: "SY", name: "Syrian Arab Republic" },
  { code: "TW", name: "Taiwan" },
  { code: "TJ", name: "Tajikistan" },
  { code: "TZ", name: "Tanzania, United Republic of" },
  { code: "TH", name: "Thailand" },
  { code: "TL", name: "Timor-Leste" },
  { code: "TG", name: "Togo" },
  { code: "TK", name: "Tokelau" },
  { code: "TO", name: "Tonga" },
  { code: "TT", name: "Trinidad and Tobago" },
  { code: "TN", name: "Tunisia" },
  { code: "TR", name: "Turkey" },
  { code: "TM", name: "Turkmenistan" },
  { code: "TC", name: "Turks and Caicos Islands" },
  { code: "TV", name: "Tuvalu" },
  { code: "UG", name: "Uganda" },
  { code: "UA", name: "Ukraine" },
  { code: "AE", name: "United Arab Emirates" },
  { code: "GB", name: "United Kingdom" },
  { code: "US", name: "United States" },
  { code: "UM", name: "United States Minor Outlying Islands" },
  { code: "UY", name: "Uruguay" },
  { code: "UZ", name: "Uzbekistan" },
  { code: "VU", name: "Vanuatu" },
  { code: "VE", name: "Venezuela" },
  { code: "VN", name: "Vietnam" },
  { code: "VG", name: "Virgin Islands, British" },
  { code: "VI", name: "Virgin Islands, U.S." },
  { code: "WF", name: "Wallis and Futuna" },
  { code: "EH", name: "Western Sahara" },
  { code: "YE", name: "Yemen" },
  { code: "ZM", name: "Zambia" },
  { code: "ZW", name: "Zimbabwe" }
];

// Restricted words/phrases configuration
const RESTRICTED_TERMS = [
  // Business startup related
  'start up capital',
  'startup capital',
  'business start up',
  'business startup',
  'start-up capital',
  'need money to start a business',
  'money to start business',
  'starting a business',
  'new business funding',
  
  // Small business related
  'small business',
  'small business loan',
  'small business financing',
  'small business grant',
  'small business funding',
  
  // Grants related
  'grants',
  'business grant',
  'business grants',
  'government grants',
  'free grants',
  'grant money',
  'grant funding',
  'any grants available',
  'grants for small businesses',
  'grants available for small businesses',
  
  // Loan apps and quick funding
  'business loan app',
  'best business loan app',
  'loan app',
  'quick loan',
  'instant loan',
  'fast loan',
  'emergency loan',
  'payday loan',
  'cash advance',
  
  // Personal/consumer loans
  'personal loan',
  'consumer loan',
  'individual loan',
  'private loan',
  'unsecured loan',
  
  // Microfinance related
  'microfinance',
  'microcredit',
  'micro loan',
  'small loan',
  'mini loan',
  
  // Other restricted terms
  'free money',
  'easy money',
  'quick cash',
  'instant cash',
  'bad credit',
  'no credit check',
  'guaranteed approval',
  'side hustle',
  'passive income',
  'get rich quick'
];

// Validation function
const validateFormContent = (formData) => {
  const errors = [];
  
  // Combine all text fields for validation
  const textFields = [
    formData.message,
    formData.subject,
    formData.service,
    formData.firstName,
    formData.lastName
  ];
  
  const combinedText = textFields.join(' ').toLowerCase();
  
  // Check for restricted terms
  const foundTerms = RESTRICTED_TERMS.filter(term => 
    combinedText.includes(term.toLowerCase())
  );
  
  if (foundTerms.length > 0) {
    errors.push({
      type: 'restricted_content',
      message: `Your message contains terms that don't align with our services. Please review and modify your inquiry.`,
      foundTerms: foundTerms
    });
  }
  
  // Additional validation for suspicious patterns
  const suspiciousPatterns = [
    /\b(loan|funding|grant|money|capital|finance|financing)\s*(for|to)\s*(start|begin|launch|open)\b/gi,
    /\b(quick|fast|instant|immediate|emergency)\s*(loan|money|cash|funding)\b/gi,
    /\b(free|easy|guaranteed)\s*(money|loan|grant|funding)\b/gi,
    /\b(bad|poor|no)\s*credit\b/gi,
    /\bmicro\s*(loan|finance|credit)\b/gi
  ];
  
  suspiciousPatterns.forEach(pattern => {
    if (pattern.test(combinedText)) {
      errors.push({
        type: 'suspicious_pattern',
        message: 'Your inquiry appears to be for services we don\'t provide. Please ensure your message aligns with our commercial financing services.'
      });
    }
  });
  
  return errors;
};

// Enhanced ContactSection component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    service: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null,
    validationErrors: []
  });

  const [realTimeValidation, setRealTimeValidation] = useState({
    showWarning: false,
    warningMessage: ''
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Real-time validation on text input
  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value
    };
    
    setFormData(newFormData);
    
    // Real-time validation for message and subject fields
    if (name === 'message' || name === 'subject') {
      const errors = validateFormContent(newFormData);
      
      if (errors.length > 0) {
        setRealTimeValidation({
          showWarning: true,
          warningMessage: 'Your message may contain terms that don\'t align with our services. Please review before submitting.'
        });
      } else {
        setRealTimeValidation({
          showWarning: false,
          warningMessage: ''
        });
      }
    }
  };

  // Enhanced form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setFormStatus(prev => ({
      ...prev,
      error: null,
      validationErrors: []
    }));
    
    // Validate form content
    const validationErrors = validateFormContent(formData);
    
    if (validationErrors.length > 0) {
      setFormStatus(prev => ({
        ...prev,
        validationErrors: validationErrors,
        error: 'Please review your submission. It contains content that doesn\'t align with our commercial financing services.'
      }));
      
      // Log the attempt for monitoring
      console.log('Form submission blocked - Restricted content detected:', {
        timestamp: new Date().toISOString(),
        foundTerms: validationErrors.flatMap(error => error.foundTerms || []),
        userAgent: navigator.userAgent,
        formData: {
          email: formData.email,
          service: formData.service,
          country: formData.country
        }
      });
      
      return;
    }
    
    // Proceed with normal submission
    setFormStatus(prev => ({
      ...prev,
      isSubmitting: true,
      isSubmitted: false,
      error: null
    }));
  
    try {
      const API_URL = process.env.NODE_ENV === 'production'
        ? 'https://email-server.nehlmac4.workers.dev/api/email/contact'
        : 'https://email-server.nehlmac4.workers.dev/api/email/contact';
        
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          validationPassed: true, // Flag to indicate server-side validation passed
          timestamp: new Date().toISOString()
        }),
      });
  
      const contentType = response.headers.get("content-type");
  
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
  
        if (data.success) {
          setFormStatus({
            isSubmitting: false,
            isSubmitted: true,
            error: null,
            validationErrors: []
          });
  
          // Call conversion tracking
          if (window.gtag) {
            window.gtag('event', 'conversion', {
              'send_to': 'AW-16898712872/nV9ECMGRkrsaEKjK9_k-'
            });
          }
  
          // Reset form
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            city: '',
            country: '',
            service: '',
            subject: '',
            message: '',
          });
          
          setRealTimeValidation({
            showWarning: false,
            warningMessage: ''
          });
  
          // Reset success message after 5 seconds
          setTimeout(() => {
            setFormStatus((prevState) => ({
              ...prevState,
              isSubmitted: false,
            }));
          }, 5000);
        } else {
          throw new Error(data.message || 'Unexpected response from server. Please try again.');
        }
      } else {
        throw new Error('Server responded with non-JSON format. Please contact support.');
      }
    } catch (error) {
      console.error('Error response:', error);
      
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Failed to send your message. Please try again later.',
        validationErrors: []
      });
    }
  };

  // Animation variants (keeping original ones)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <section id="contact" className="contact-section" ref={ref}>
      <div className="contact-container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="contact-title">Contact Us</h2>
          <p className="contact-subtitle">
            Reach out to discuss your commercial financing needs or schedule a consultation with our team. We specialize in large-scale commercial projects and established business financing.
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div 
            className="contact-form-container"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div className="contact-form-wrapper" variants={itemVariants}>
              <h3>Send Us a Message</h3>
              
              {/* Real-time validation warning */}
              {realTimeValidation.showWarning && (
                <div className="form-warning-message">
                  ⚠️ {realTimeValidation.warningMessage}
                </div>
              )}
              
              {formStatus.isSubmitted && (
                <div className="form-success-message">
                  Thank you for your message! We'll get back to you shortly.
                </div>
              )}
              
              {formStatus.error && (
                <div className="form-error-message">
                  {formStatus.error}
                  {formStatus.validationErrors.length > 0 && (
                    <div className="validation-details">
                      <p><strong>Our services focus on:</strong></p>
                      <ul>
                        <li>Large-scale commercial real estate financing</li>
                        <li>Established business expansion funding</li>
                        <li>Project financing for developed businesses</li>
                        <li>Working capital for operational companies</li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
              
              <form id="contact-form" className="contact-form" onSubmit={handleSubmit}>
                {/* Form fields remain the same */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Your first name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Your last name"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                    >
                      {countries.map(({ code, name }) => (
                        <option key={code} value={code}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service of Interest</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a service</option>
                    <option value="Commercial Real Estate Financing">Commercial Real Estate Financing</option>
                    <option value="Large Project Financing">Large Project Financing</option>
                    <option value="Business Expansion Capital">Business Expansion Capital</option>
                    <option value="Working Capital (Established Business)">Working Capital (Established Business)</option>
                    <option value="Equity Financing">Equity Financing</option>
                    <option value="Agri-Business Financing">Agri-Business Financing</option>
                    <option value="Non-Recourse Financing">Non-Recourse Financing</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Commercial Financing Inquiry</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your commercial financing needs, project details, business background, and funding requirements"
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="submit-button"
                  disabled={formStatus.isSubmitting}
                >
                  {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="contact-info-container"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div className="contact-map" variants={itemVariants}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.3498185962394!2d27.920040537785958!3d-26.15273440543969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a006292f3f2b%3A0x33a15337db9fa923!2sRegus%20-%20Johannesburg%2C%20West%20Rand%20-%20Constantia%20Kloof!5e0!3m2!1sen!2ske!4v1740907067726!5m2!1sen!2ske"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Office Location"
              ></iframe>
            </motion.div>
            
            <motion.div className="contact-details" variants={itemVariants}>
              <h3>Contact Information</h3>
              
              <div className="contact-info-items">
                <div className="contact-info-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-text">
                    <h4>Visit Us</h4>
                    <p>Ground flr, Bldg 4, 50 Constantia Blvd, Constantia Kloof, Johannesburg, 1709, South Africa</p>
                  </div>
                </div>

                {/* 
                <div className="contact-info-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-text">
                    <h4>Call - WhatsApp | 24/7 service</h4>
                    <p>+27 (746) 877-953
                    </p>
                    <p>Mon-Fri 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
                */}
                
                <div className="contact-info-item">
                  <div className="contact-icon">📧</div>
                  <div className="contact-text">
                    <h4>24hrs Email Service</h4>
                    <p>finance.support@trinityfinancing.com</p>
                  </div>
                </div>
              </div>
              
              <div className="social-links">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="social-icon">in</i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="social-icon">𝕏</i>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="social-icon">f</i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                  <i className="social-icon">📷</i>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;