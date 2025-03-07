require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express(); // Initialize Express
app.use(express.json());
app.use(cors());

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 587, // Changed to 587 for TLS (more stable)
  secure: false, // Must be false for TLS (true is only for SSL 465)
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Bypass SSL certificate error
  },
});

// Email API Route
app.post("/api/email/contact", async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  try {
    let info = await transporter.sendMail({
      from: `"${name}" <${process.env.ZOHO_EMAIL}>`,
      to: process.env.ZOHO_EMAIL,
      cc: process.env.ZOHO_CC_EMAIL,
      subject: service,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
    });

    console.log("✅ Email sent successfully:", info.response);
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("❌ Email Error:", error);
    res.status(500).json({ success: false, message: "Error sending email", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
