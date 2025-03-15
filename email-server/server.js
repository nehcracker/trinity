require("dotenv").config();
const express = require("express");
const cors = require("cors");
const compression = require("compression"); // 🟢 Added for performance
const { sendContactEmail } = require("./controllers/emailController");
const { contactFormValidation, validate } = require("./middlewares/validation");
const emailRateLimiter = require("./middlewares/rateLimiter");

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.ALLOWED_ORIGINS || "*" })); // 🟢 Improved CORS security
app.use(compression()); // 🟢 Added for response compression

// 🟢 Added Health Check Route
app.get("/api/health", (req, res) => {
    res.status(200).json({ success: true, message: "Server is running" });
});

// Email API Route with validation middleware
app.post("/api/email/contact", 
    emailRateLimiter,
    contactFormValidation,
    validate,
    sendContactEmail
);

// 🟢 Improved Error handling middleware
app.use((err, req, res, next) => {
    console.error('❌ Server Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

// 🟢 Graceful Shutdown Handling
const server = app.listen(process.env.PORT || 5000, () => {
    console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});

// 🟢 Handle process termination properly
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