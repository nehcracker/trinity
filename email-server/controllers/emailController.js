const { transporter, defaultEmail, ccEmail } = require('../config/email');
const validator = require('validator');

// Helper function to validate input data
const validateEmailInput = (data) => {
  return Object.values(data).every(field => field && typeof field === 'string') && validator.isEmail(data.email);
};

// Controller for sending contact form emails
const sendContactEmail = async (req, res) => {
  try {
    const { name, email, phone, location, service, message, company, subject, website } = req.body;

    // Validate input data
    if (!validateEmailInput(req.body)) {
      return res.status(400).json({ success: false, message: 'All fields are required and must be valid' });
    }

    // Construct email options
    const userMailOptions = {
      from: `"Trinity Financing" <${defaultEmail}>`,
      to: email,
      cc: ccEmail,
      replyTo: defaultEmail,
      subject: `Inquiry: ${validator.escape(service)}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="background-color: #fe6700; color: white; padding: 10px; text-align: center;">
            New Contact Form Submission
          </h1>
          <p>You have received a new inquiry from your website contact form.</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td><strong>Name:</strong></td><td>${validator.escape(name)}</td></tr>
            <tr><td><strong>Email:</strong></td><td><a href="mailto:${email}">${validator.escape(email)}</a></td></tr>
            <tr><td><strong>Phone:</strong></td><td>${validator.escape(phone)}</td></tr>
            <tr><td><strong>Location:</strong></td><td>${validator.escape(location)}</td></tr>
            <tr><td><strong>Company:</strong></td><td>${validator.escape(company)}</td></tr>
            <tr><td><strong>Website:</strong></td><td>${validator.escape(website)}</td></tr>
            <tr><td><strong>Subject:</strong></td><td>${validator.escape(subject)}</td></tr>
            <tr><td><strong>Service of Interest:</strong></td><td>${validator.escape(service)}</td></tr>
          </table>

          <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #fe6700; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #1a1a1a;">Message:</h3>
            <p>${validator.escape(message)}</p>
          </div>
          
          <p>Our team will review your inquiry and get back to you shortly.</p>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(userMailOptions);

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
