const { body, validationResult } = require('express-validator');

// Validation rules for contact form
const contactFormValidation = [
  body('firstName')
    .trim()
    .notEmpty().withMessage('First name is required')
    .isLength({ min: 2, max: 50 }).withMessage('First name must be between 2 and 50 characters'),
  
  body('lastName')
    .trim()
    .notEmpty().withMessage('Last name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Last name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9+\-\s()]*$/).withMessage('Phone number can only contain digits, spaces, and the characters +, -, (, )'),
  
  body('city')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('City must be between 2 and 100 characters'),
  
  body('country')
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 }).withMessage('Country must be between 2 and 100 characters'),
  
  body('service')
    .trim()
    .notEmpty().withMessage('Service is required')
    .isLength({ min: 2, max: 100 }).withMessage('Service must be between 2 and 100 characters'),
  
  body('message')
    .optional()
    .trim()
    .isLength({ max: 2000 }).withMessage('Message must not exceed 2000 characters')
];

// Validation rules for newsletter subscription
const newsletterValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address')
];

// Middleware to validate request
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({ field: err.path, message: err.msg }))
    });
  }
  next();
};

module.exports = {
  contactFormValidation,
  newsletterValidation,
  validate
};