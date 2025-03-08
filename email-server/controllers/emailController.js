// controllers/emailController.js
const validator = require('validator');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ZOHO_EMAIL || "contact@trinityfinancing.com",
    pass: process.env.ZOHO_PASSWORD,
  },
  tls: {
    rejectUnauthorized: true,
  },
});

const sendContactEmail = async (req, res) => {
  try {
    // Get all fields from the request body
    const { name, email, phone, location, service, message, ...otherFields } = req.body;
    
    // Validate required fields
    if (!name || !email || !message || !validator.isEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, valid email, and message are required' 
      });
    }

    // 1. Email to Trinity Financing (with all form fields)
    const adminMailOptions = {
      from: {
        name: "Trinity Financing",
        address: process.env.ZOHO_EMAIL || "contact@trinityfinancing.com"
      },
      to: process.env.ZOHO_EMAIL || "contact@trinityfinancing.com",
      cc: process.env.ZOHO_CC_EMAIL || "finance.support@trinityfinancing.com",
      replyTo: email, // Replies go to the client
      subject: `Contact Form: ${service || 'New Inquiry'}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Location: ${location || 'Not provided'}
Service: ${service || 'Not provided'}
${Object.entries(otherFields).map(([key, value]) => 
  `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value}`
).join('\n')}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #FF6600; color: white; padding: 20px;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>You have received a new inquiry from your website contact form.</p>
            
            <p><strong>Name:</strong> ${validator.escape(name)}</p>
            <p><strong>Email:</strong> <a href="mailto:${validator.escape(email)}" style="color: #0066CC;">${validator.escape(email)}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${validator.escape(phone)}</p>` : ''}
            ${location ? `<p><strong>Location:</strong> ${validator.escape(location)}</p>` : ''}
            ${service ? `<p><strong>Service of Interest:</strong> ${validator.escape(service)}</p>` : ''}
            
            ${Object.entries(otherFields).map(([key, value]) => {
              const formattedKey = key.charAt(0).toUpperCase() + 
                key.slice(1).replace(/([A-Z])/g, ' $1');
              return `<p><strong>${formattedKey}:</strong> ${validator.escape(String(value))}</p>`;
            }).join('')}
            
            <p><strong>Message:</strong></p>
            <p>${validator.escape(message)}</p>
          </div>
        </div>
      `,
    };

    // 2. Confirmation email to the client
    const clientMailOptions = {
      from: {
        name: "Trinity Financing",
        address: process.env.ZOHO_EMAIL || "contact@trinityfinancing.com"
      },
      to: email,
      subject: "Thank You for Contacting Trinity Financing",
      text: `
Dear ${name},

Thank you for contacting Trinity Financing. We have received your inquiry and will get back to you shortly.

Here's a summary of the information you provided:

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${location ? `Location: ${location}` : ''}
${service ? `Service of Interest: ${service}` : ''}

Your Message:
${message}

We appreciate your interest and will respond as soon as possible.

Best regards,
The Trinity Financing Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #FF6600; color: white; padding: 20px;">
            <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Us</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear ${validator.escape(name)},</p>
            
            <p>Thank you for contacting Trinity Financing. We have received your inquiry and will get back to you shortly.</p>
            
            <p>Here's a summary of the information you provided:</p>
            
            <div style="background-color: #f7f7f7; padding: 15px; margin: 15px 0;">
              <p><strong>Name:</strong> ${validator.escape(name)}</p>
              <p><strong>Email:</strong> ${validator.escape(email)}</p>
              ${phone ? `<p><strong>Phone:</strong> ${validator.escape(phone)}</p>` : ''}
              ${location ? `<p><strong>Location:</strong> ${validator.escape(location)}</p>` : ''}
              ${service ? `<p><strong>Service of Interest:</strong> ${validator.escape(service)}</p>` : ''}
              
              <p><strong>Your Message:</strong></p>
              <p>${validator.escape(message)}</p>
            </div>
            
            <p>We appreciate your interest and will respond as soon as possible.</p>
            
            <p>Best regards,<br>
            The Trinity Financing Team</p>
          </div>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(clientMailOptions);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    console.error('❌ Error sending email:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  sendContactEmail,
};