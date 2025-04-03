const validator = require('validator');

const getTemplate = async (c) => {

const zohoName = c.env.ZOHO_NAME || "Trinity Financing" 

  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    country,
    service,
    message,
    ...otherFields
  } = await c.req.json();

  // Validate required fields
  if (!firstName || !lastName || !email || !validator.isEmail(email)) {
    return {
      success: false,
      message: 'First name, last name, and valid email are required'
    };
  }

  const fullName = `${firstName} ${lastName}`;

  // Construct email details
  const formatFields = (fields) => Object.entries(fields)
    .map(([key, value]) => `<p><strong>${key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong> ${validator.escape(String(value))}</p>`)
    .join('');

  // Admin Notification Template
  const adminTemplate = {
    subject: `Contact Form: ${service || 'New Inquiry'}`,
    text: `
Name: ${fullName}
Email: ${email}
Phone: ${phone || 'Not provided'}
City: ${city || 'Not provided'}
Country: ${country || 'Not provided'}
Service: ${service || 'Not provided'}
${Object.entries(otherFields).map(([key, value]) => `${key}: ${value}`).join('\n')}
${message ? `\nMessage:\n${message}` : ''}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <div style="background-color: #FF6600; color: white; padding: 20px;">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        <div style="padding: 20px;">
          <p><strong>Name:</strong> ${validator.escape(fullName)}</p>
          <p><strong>Email:</strong> <a href="mailto:${validator.escape(email)}" style="color: #0066CC;">${validator.escape(email)}</a></p>
          ${phone ? `<p><strong>Phone:</strong> ${validator.escape(phone)}</p>` : ''}
          ${city ? `<p><strong>City:</strong> ${validator.escape(city)}</p>` : ''}
          ${country ? `<p><strong>Country:</strong> ${validator.escape(country)}</p>` : ''}
          ${service ? `<p><strong>Service:</strong> ${validator.escape(service)}</p>` : ''}
          ${formatFields(otherFields)}
          ${message ? `<p><strong>Message:</strong></p><p>${validator.escape(message)}</p>` : ''}
        </div>
      </div>`
  };

  // Client Confirmation Template
  const clientTemplate = {
    subject: "Trinity Financing",
    text: `Dear ${fullName},\n\nThank you for contacting ${zohoName}. We have received your inquiry and will get back to you shortly.\n\nBest regards,\nThe ${zohoName} Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <div style="background-color: #FF6600; color: white; padding: 20px;">
          <h1 style="margin: 0; font-size: 24px;">Thank You for Contacting Us</h1>
        </div>
        <div style="padding: 20px;">
          <p>Dear ${validator.escape(fullName)},</p>
          <p>Thank you for contacting ${validator.escape(zohoName)}. We have received your inquiry and will get back to you shortly.</p>
          <p>Best regards,<br>The ${validator.escape(zohoName)} Team</p>
        </div>
      </div>`
  };

  return {
    adminTemplate,
    clientTemplate
  };
};

module.exports = { getTemplate };
