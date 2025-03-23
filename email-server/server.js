const express = require("express");
const cors = require("cors");
const compression = require("compression");
const { sendContactEmail } = require("./controllers/emailController");
const { contactFormValidation, validate } = require("./middlewares/validation");
const emailRateLimiter = require("./middlewares/rateLimiter");

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: [
      "https://trinityfinancing.com", // Allow requests from your live frontend
      "http://trinityfinancing.com", // Allow requests from your live frontend (non-HTTPS)
      "http://localhost:3000", // Allow requests from local development
    ],
    methods: ["GET", "POST", "OPTIONS"], // Allow only necessary HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow only necessary headers
    credentials: true, // Allow credentials (if needed)
  })
);

app.use(express.json()); // Parse JSON request bodies
app.use(compression()); // Compress responses for better performance

// Health Check Route
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// Email API Route with validation middleware
app.post(
  "/api/email/contact",
  emailRateLimiter,
  contactFormValidation,
  validate,
  sendContactEmail
);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Start Server
const server = app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
    console.log(` Server running on port ${process.env.PORT || 5000}`);
});

// Graceful Shutdown Handling
process.on("SIGTERM", () => {
  console.log("🔴 Server is shutting down...");
  server.close(() => {
    console.log("🟢 Server has shut down gracefully.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("🔴 Server is shutting down...");
  server.close(() => {
    console.log("🟢 Server has shut down gracefully.");
    process.exit(0);
  });
});