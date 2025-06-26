const validator = require("validator");

const getTemplate = async (c) => {
  const zohoName = c.env.ZOHO_NAME || "Trinity Financing";

  const body = await c.req.json();

  // Support both formats
  const isNewFormat = !!body.companyName && !!body.contactPerson;

  if (isNewFormat) {
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
      marketingOptIn,
    } = body;

    // Validate required fields
    const errors = [];

    if (!companyName.trim()) errors.push("Company name is required.");
    if (!contactPerson.trim()) errors.push("Contact person is required.");
    if (!email.trim() || !validator.isEmail(email))
      errors.push("A valid email is required.");
    if (!phone.trim()) errors.push("Phone is required.");
    if (!country.trim()) errors.push("Country is required.");
    if (!currency.trim()) errors.push("Currency is required.");
    if (!timeline.trim()) errors.push("Timeline is required.");
    if (!transactionAmount || isNaN(Number(transactionAmount)))
      errors.push("Transaction amount must be a number.");
    if (!description.trim()) errors.push("Description is required.");
    if (!Array.isArray(selectedServices) || selectedServices.length === 0)
      errors.push("At least one service must be selected.");

    if (errors.length > 0) {
      return {
        success: false,
        message: errors.join(" "),
      };
    }

    // Generate service list HTML
    const serviceList = selectedServices
      .map((s) => `<li>${validator.escape(s)}</li>`)
      .join("");

    return {
      success: true,
      adminTemplate: {
        subject: `New Application from ${companyName}`,
        text: `
Company: ${companyName}
Contact: ${contactPerson}
Email: ${email}
Phone: ${phone}
Country: ${country}
Currency: ${currency}
Amount: ${transactionAmount}
Timeline: ${timeline}
Services: ${selectedServices.join(", ")}
Marketing Opt-in: ${marketingOptIn ? "Yes" : "No"}
Description: ${description}
      `,
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <div style="background-color: #FF6600; color: white; padding: 20px;">
    <h1>New Financing Inquiry</h1>
  </div>
  <div style="padding: 20px;">
    <p><strong>Company:</strong> ${validator.escape(companyName)}</p>
    <p><strong>Contact Person:</strong> ${validator.escape(contactPerson)}</p>
    <p><strong>Email:</strong> <a href="mailto:${validator.escape(
      email
    )}">${validator.escape(email)}</a></p>
    <p><strong>Phone:</strong> ${validator.escape(phone)}</p>
    <p><strong>Country:</strong> ${validator.escape(country)}</p>
    <p><strong>Currency:</strong> ${validator.escape(currency)}</p>
    <p><strong>Transaction Amount:</strong> ${validator.escape(
      transactionAmount
    )}</p>
    <p><strong>Timeline:</strong> ${validator.escape(timeline)}</p>
    <p><strong>Marketing Opt-in:</strong> ${marketingOptIn ? "Yes" : "No"}</p>
    <p><strong>Services:</strong></p>
    <ul>${serviceList}</ul>
    <p><strong>Description:</strong></p>
    <p>${validator.escape(description)}</p>
  </div>
</div>`,
      },
      clientTemplate: {
        subject: `Thank you for your inquiry – ${zohoName}`,
        text: `
Dear ${contactPerson},

Thank you for contacting ${zohoName}. We have received your inquiry regarding the services: ${selectedServices.join(
          ", "
        )}.

A member of our team will get in touch with you shortly.

Best regards,
${zohoName} Team
      `,
        html: `
<div style="font-family: Arial, sans-serif; max-width: 600px;">
  <div style="background-color: #FF6600; color: white; padding: 20px;">
    <h1>Thank You for Your Inquiry</h1>
  </div>
  <div style="padding: 20px;">
    <p>Dear ${validator.escape(contactPerson)},</p>
    <p>Thank you for reaching out to <strong>${validator.escape(
      zohoName
    )}</strong>. We’ve received your inquiry regarding the following service(s):</p>
    <ul>${serviceList}</ul>
    <p>We’ll review your request and get back to you as soon as possible.</p>
    <p>Best regards,<br />The ${validator.escape(zohoName)} Team</p>
  </div>
</div>`,
      },
    };
  }

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
      message: "First name, last name, and valid email are required",
    };
  }

  const fullName = `${firstName} ${lastName}`;

  // Construct email details
  const formatFields = (fields) =>
    Object.entries(fields)
      .map(
        ([key, value]) =>
          `<p><strong>${
            key.charAt(0).toUpperCase() +
            key.slice(1).replace(/([A-Z])/g, " $1")
          }:</strong> ${validator.escape(String(value))}</p>`
      )
      .join("");

  // Admin Notification Template
  const adminTemplate = {
    subject: `Contact Form: ${service || "New Inquiry"}`,
    text: `
Name: ${fullName}
Email: ${email}
Phone: ${phone || "Not provided"}
City: ${city || "Not provided"}
Country: ${country || "Not provided"}
Service: ${service || "Not provided"}
${Object.entries(otherFields)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n")}
${message ? `\nMessage:\n${message}` : ""}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <div style="background-color: #FF6600; color: white; padding: 20px;">
          <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
        </div>
        <div style="padding: 20px;">
          <p><strong>Name:</strong> ${validator.escape(fullName)}</p>
          <p><strong>Email:</strong> <a href="mailto:${validator.escape(
            email
          )}" style="color: #0066CC;">${validator.escape(email)}</a></p>
          ${
            phone
              ? `<p><strong>Phone:</strong> ${validator.escape(phone)}</p>`
              : ""
          }
          ${
            city
              ? `<p><strong>City:</strong> ${validator.escape(city)}</p>`
              : ""
          }
          ${
            country
              ? `<p><strong>Country:</strong> ${validator.escape(country)}</p>`
              : ""
          }
          ${
            service
              ? `<p><strong>Service:</strong> ${validator.escape(service)}</p>`
              : ""
          }
          ${formatFields(otherFields)}
          ${
            message
              ? `<p><strong>Message:</strong></p><p>${validator.escape(
                  message
                )}</p>`
              : ""
          }
        </div>
      </div>`,
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
          <p>Thank you for contacting ${validator.escape(
            zohoName
          )}. We have received your inquiry and will get back to you shortly.</p>
          <p>Best regards,<br>The ${validator.escape(zohoName)} Team</p>
        </div>
      </div>`,
  };

  return {
    adminTemplate,
    clientTemplate,
  };
};

module.exports = { getTemplate };
