require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sendContactEmail } = require("./controllers/emailController");
const { contactFormValidation, validate } = require("./middlewares/validation");
const emailRateLimiter = require("./middlewares/rateLimiter");

const app = express();
app.use(express.json());
app.use(cors());

// Email API Route with validation middleware
app.post("/api/email/contact", 
    emailRateLimiter,
    contactFormValidation,
    validate,
    sendContactEmail
);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
