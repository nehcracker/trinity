// config/emailConfig.js
const nodemailer = require("nodemailer");
require("dotenv").config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Should be true in production for security
  },
});

// Export the transporter and email addresses for reuse
module.exports = {
  transporter,
  defaultEmail: process.env.ZOHO_EMAIL,
  ccEmail: process.env.ZOHO_CC_EMAIL,
  zohoName: process.env.ZOHO_NAME || "Trinity Financing"
};