const rateLimit = require('express-rate-limit');

const emailRateLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, 
    max: 3, 
    message: {
        success: false,
        message: 'Too many email requests. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) => {
       
        return `${req.ip}-${req.body.email}`;
    }
});

module.exports = emailRateLimiter;
