// controllers/emailController.js
const validator = require('validator');
const { transporter, defaultEmail, ccEmail, zohoName } = require('../config/emailConfig');

const sendContactEmail = async (req, res) => {
  try {
    // Get all fields from the request body
    const { firstName, lastName, email, phone, city, country, service, message, ...otherFields } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !email || !validator.isEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'First name, last name, and valid email are required' 
      });
    }

    const fullName = `${firstName} ${lastName}`;

    // 1. Email to Trinity Financing (with all form fields)
    const adminMailOptions = {
      from: {
        name: zohoName,
        address: defaultEmail
      },
      to: defaultEmail,
      cc: ccEmail,
      replyTo: email,
      subject: `Contact Form: ${service || 'New Inquiry'}`,
      text: `
Name: ${fullName}
Email: ${email}
Phone: ${phone || 'Not provided'}
City: ${city || 'Not provided'}
Country: ${country || 'Not provided'}
Service: ${service || 'Not provided'}
${Object.entries(otherFields).map(([key, value]) => 
  `${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: ${value}`
).join('\n')}
${message ? `\nMessage:\n${message}` : ''}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #FF6600; color: white; padding: 20px;">
            <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>You have received a new inquiry from your website contact form.</p>
            
            <p><strong>Name:</strong> ${validator.escape(fullName)}</p>
            <p><strong>Email:</strong> <a href="mailto:${validator.escape(email)}" style="color: #0066CC;">${validator.escape(email)}</a></p>
            ${phone ? `<p><strong>Phone:</strong> ${validator.escape(phone)}</p>` : ''}
            ${city ? `<p><strong>City:</strong> ${validator.escape(city)}</p>` : ''}
            ${country ? `<p><strong>Country:</strong> ${validator.escape(country)}</p>` : ''}
            ${service ? `<p><strong>Service of Interest:</strong> ${validator.escape(service)}</p>` : ''}
            
            ${Object.entries(otherFields).map(([key, value]) => {
              const formattedKey = key.charAt(0).toUpperCase() + 
                key.slice(1).replace(/([A-Z])/g, ' $1');
              return `<p><strong>${formattedKey}:</strong> ${validator.escape(String(value))}</p>`;
            }).join('')}
            
            ${message ? `
              <p><strong>Message:</strong></p>
              <p>${validator.escape(message)}</p>
            ` : ''}
          </div>
        </div>
      `,
    };

    // 2. Confirmation email to the client
    const clientMailOptions = {
      from: {
        name: zohoName,
        address: defaultEmail
      },
      to: email,
      subject: "Thank You for Contacting Trinity Financing",
      text: `
Dear ${fullName},

Thank you for contacting ${zohoName}. We have received your inquiry and will get back to you shortly.

We appreciate your interest and will respond as soon as possible.

Best regards,
The ${zohoName} Team
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #FF6600; color: white; padding: 20px;">
            <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Us</h1>
          </div>
          
          <div style="padding: 20px;">
            <p>Dear ${validator.escape(fullName)},</p>
            
            <p>Thank you for contacting ${validator.escape(zohoName)}. We have received your inquiry and will get back to you shortly.</p>
            
            <p>We appreciate your interest and will respond as soon as possible.</p>
            
            <p>Best regards,<br>
            The ${validator.escape(zohoName)} Team</p>
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