// steps/EssentialDetails.jsx
import React from 'react';
import './Essential.module.css';

// List of countries
const countries = [
  "United States", "United Kingdom", "Canada", "Australia", 
  "Germany", "France", "Italy", "Spain", "Japan", 
  "China", "India", "Brazil", "South Africa", "UAE",
  "Kenya", "Nigeria", "Ghana", "Egypt", "Saudi Arabia"
];

// Currency options
const currencies = [
  { code: "USD", label: "USD - US Dollar" },
  { code: "EUR", label: "EUR - Euro" },
  { code: "GBP", label: "GBP - British Pound" },
  { code: "JPY", label: "JPY - Japanese Yen" },
  { code: "AUD", label: "AUD - Australian Dollar" },
  { code: "CAD", label: "CAD - Canadian Dollar" },
  { code: "AED", label: "AED - UAE Dirham" },
  { code: "KES", label: "KES - Kenyan Shilling" },
  { code: "NGN", label: "NGN - Nigerian Naira" },
  { code: "ZAR", label: "ZAR - South African Rand" }
];

function EssentialDetails({ formState, dispatch, errors }) {
  const updateField = (field, value) => {
    dispatch({
      type: 'UPDATE_FIELD',
      field,
      value
    });
  };
  
  return (
    <div className="essential-details">
      <h2>Essential Details</h2>
      <p className="step-description">Please provide your company and transaction information</p>
      
      <div className="form-columns">
        <div className="form-column">
          <h3>Company & Contact</h3>
          
          <div className="form-group">
            <label htmlFor="companyName">Company Name *</label>
            <input
              type="text"
              id="companyName"
              value={formState.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              className={errors.companyName ? 'error' : ''}
            />
            {errors.companyName && (
              <div className="error-message">{errors.companyName}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="contactPerson">Contact Person *</label>
            <input
              type="text"
              id="contactPerson"
              value={formState.contactPerson}
              onChange={(e) => updateField('contactPerson', e.target.value)}
              className={errors.contactPerson ? 'error' : ''}
            />
            {errors.contactPerson && (
              <div className="error-message">{errors.contactPerson}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              value={formState.email}
              onChange={(e) => updateField('email', e.target.value)}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && (
              <div className="error-message">{errors.email}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              value={formState.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              className={errors.phone ? 'error' : ''}
              placeholder="+1 (555) 123-4567"
            />
            {errors.phone && (
              <div className="error-message">{errors.phone}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="country">Country *</label>
            <select
              id="country"
              value={formState.country}
              onChange={(e) => updateField('country', e.target.value)}
              className={errors.country ? 'error' : ''}
            >
              <option value="">Select Country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && (
              <div className="error-message">{errors.country}</div>
            )}
          </div>
        </div>
        
        <div className="form-column">
          <h3>Transaction Details</h3>
          
          <div className="form-group">
            <label htmlFor="transactionAmount">Transaction Amount *</label>
            <input
              type="number"
              id="transactionAmount"
              value={formState.transactionAmount}
              onChange={(e) => updateField('transactionAmount', e.target.value)}
              className={errors.transactionAmount ? 'error' : ''}
              min="0"
              step="1000"
            />
            {errors.transactionAmount && (
              <div className="error-message">{errors.transactionAmount}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="currency">Currency *</label>
            <select
              id="currency"
              value={formState.currency}
              onChange={(e) => updateField('currency', e.target.value)}
              className={errors.currency ? 'error' : ''}
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.label}
                </option>
              ))}
            </select>
            {errors.currency && (
              <div className="error-message">{errors.currency}</div>
            )}
          </div>
          
          <div className="form-group">
            <label>Timeline *</label>
            <div className="radio-group">
              <label className="radio-label">
                <input
                  type="radio"
                  name="timeline"
                  value="urgent"
                  checked={formState.timeline === 'urgent'}
                  onChange={() => updateField('timeline', 'urgent')}
                />
                <span>Urgent (within 48 hours)</span>
              </label>
              
              <label className="radio-label">
                <input
                  type="radio"
                  name="timeline"
                  value="standard"
                  checked={formState.timeline === 'standard'}
                  onChange={() => updateField('timeline', 'standard')}
                />
                <span>Standard (3-5 business days)</span>
              </label>
              
              <label className="radio-label">
                <input
                  type="radio"
                  name="timeline"
                  value="flexible"
                  checked={formState.timeline === 'flexible'}
                  onChange={() => updateField('timeline', 'flexible')}
                />
                <span>Flexible (over 5 business days)</span>
              </label>
            </div>
            {errors.timeline && (
              <div className="error-message">{errors.timeline}</div>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Brief Description *</label>
            <textarea
              id="description"
              value={formState.description}
              onChange={(e) => updateField('description', e.target.value)}
              className={errors.description ? 'error' : ''}
              rows="4"
              placeholder="Please describe your financing needs in a few sentences..."
            ></textarea>
            {errors.description && (
              <div className="error-message">{errors.description}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EssentialDetails;
