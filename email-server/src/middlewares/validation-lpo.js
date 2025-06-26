const validator = require('validator');

const lpoValidation = async (c, next) => {
  const {
    companyName,
    contactPerson,
    email,
    phone,
    country,
    currency,
    timeline,
    transactionAmount,
    description,
    selectedServices = [],
    marketingOptIn
  } = await c.req.json();

  const errors = [];

  // Company Name
  if (!companyName || companyName.trim().length < 2 || companyName.trim().length > 100) {
    errors.push({ field: 'companyName', message: 'Company name must be between 2 and 100 characters' });
  }

  // Contact Person
  if (!contactPerson || contactPerson.trim().length < 2 || contactPerson.trim().length > 100) {
    errors.push({ field: 'contactPerson', message: 'Contact person must be between 2 and 100 characters' });
  }

  // Email
  if (!email || !validator.isEmail(email.trim())) {
    errors.push({ field: 'email', message: 'Please provide a valid email address' });
  }

  // Phone (optional but validated if provided)
  if (!phone || !validator.matches(phone, /^[0-9+\-\s()]*$/)) {
    errors.push({ field: 'phone', message: 'Phone number must contain only digits, spaces, or + - ( ) characters' });
  }

  // Country
  if (!country || country.trim().length < 2 || country.trim().length > 100) {
    errors.push({ field: 'country', message: 'Country must be between 2 and 100 characters' });
  }

  // Currency
  if (!currency || currency.trim().length < 2 || currency.trim().length > 10) {
    errors.push({ field: 'currency', message: 'Currency must be between 2 and 10 characters' });
  }

  // Timeline
  if (!timeline || timeline.trim().length < 2 || timeline.trim().length > 100) {
    errors.push({ field: 'timeline', message: 'Timeline must be between 2 and 100 characters' });
  }

  // Transaction Amount
  if (!transactionAmount || isNaN(Number(transactionAmount))) {
    errors.push({ field: 'transactionAmount', message: 'Transaction amount must be a valid number' });
  }

  // Description
  if (!description || description.trim().length < 10 || description.trim().length > 2000) {
    errors.push({ field: 'description', message: 'Description must be between 10 and 2000 characters' });
  }

  // Selected Services
  if (!Array.isArray(selectedServices) || selectedServices.length === 0) {
    errors.push({ field: 'selectedServices', message: 'Please select at least one service' });
  }

  // Marketing Opt-In (optional, but must be boolean if present)
  if (typeof marketingOptIn !== 'undefined' && typeof marketingOptIn !== 'boolean') {
    errors.push({ field: 'marketingOptIn', message: 'Marketing opt-in must be a boolean value' });
  }

  if (errors.length > 0) {
    return c.json({ success: false, errors }, 400);
  }

  await next();
};

module.exports = {
  lpoValidation
};
