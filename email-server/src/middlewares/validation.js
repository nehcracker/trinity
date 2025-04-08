const validator = require('validator');

const validateContactForm = async (c, next) => {
  const { 
    firstName, 
    lastName, 
    email, 
    phone, 
    city, 
    country, 
    service, 
    message 
  } = await c.req.json();

  const errors = [];

  // First Name Validation
  if (!firstName || firstName.trim().length < 2 || firstName.trim().length > 50) {
    errors.push({ field: 'firstName', message: 'First name must be between 2 and 50 characters' });
  }

  // Last Name Validation
  if (!lastName || lastName.trim().length < 2 || lastName.trim().length > 50) {
    errors.push({ field: 'lastName', message: 'Last name must be between 2 and 50 characters' });
  }

  // Email Validation
  if (!email || !validator.isEmail(email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  // Phone Validation (optional)
  if (phone && !validator.matches(phone, /^[0-9+\-\s()]*$/)) {
    errors.push({ field: 'phone', message: 'Phone number can only contain digits, spaces, and the characters +, -, (, )' });
  }

  // City Validation (optional)
  if (city && (city.trim().length < 2 || city.trim().length > 100)) {
    errors.push({ field: 'city', message: 'City must be between 2 and 100 characters' });
  }

  // Country Validation (optional)
  if (country && (country.trim().length < 2 || country.trim().length > 100)) {
    errors.push({ field: 'country', message: 'Country must be between 2 and 100 characters' });
  }

  // Service Validation
  if (!service || service.trim().length < 2 || service.trim().length > 100) {
    errors.push({ field: 'service', message: 'Service must be between 2 and 100 characters' });
  }

  if (message && message.trim().length > 2000) {
    errors.push({ field: 'message', message: 'Message must not exceed 2000 characters' });
  }

  if (errors.length > 0) {
    return c.json({
      success: false,
      errors: errors
    }, 400);
  }

  await next();
};

const validateNewsletter = async (c, next) => {
  const { email } = await c.req.json();

  const errors = [];

  if (!email || !validator.isEmail(email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  if (errors.length > 0) {
    return c.json({
      success: false,
      errors: errors
    }, 400);
  }

  await next();
};

module.exports = {
  validateContactForm,
  validateNewsletter
};