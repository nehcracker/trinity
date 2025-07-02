
import { Hono } from "hono";
import { cors } from "hono/cors";
import { lpoValidation } from "./middlewares/validation-lpo";
const emailRateLimiter = require("./middlewares/rateLimiter");
const { validateContactForm } = require("./middlewares/validation");
const { getTemplate } = require("./controllers/emailController");

const app = new Hono();

app.use(
  "/api/*",
  cors({
    origin: [
      "https://trinityfinancing.com",
      "http://trinityfinancing.com",
      "https://www.trinityfinancing.com",
      "http://www.trinityfinancing.com",
      "https://trinity-e8f.pages.dev/"
    ],
    allowMethods: ["POST", "GET", "OPTIONS"],
    maxAge: 600,
    credentials: true,
  })
);

app.get("/", (c) => {
  return c.json({ success: true, message: "Server is running" });
});

app.post(
  "/api/email/contact",
  emailRateLimiter,
  validateContactForm,
  async (c) => {
    const { adminTemplate, clientTemplate } = await getTemplate(c);

    const { firstName, lastName, email } = await c.req.json();

    try {
      // Send admin email
      const adminResponse = await fetch(
        "https://api.zeptomail.com/v1.1/email",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Zoho-enczapikey ${c.env.ZOHO_API_KEY}`,
          },
          body: JSON.stringify({
            from: {
              address: email,
              name: firstName + " " + lastName,
            },
            to: [
              {
                email_address: {
                  address: c.env.ZOHO_EMAIL,
                  name: c.env.ZOHO_NAME,
                },
              },
            ],
            cc: [
              {
                email_address: {
                  address: c.env.ZOHO_CC_EMAIL,
                  name: "Admin_cc",
                },
              },
            ],
            reply_to: [{ address: email, name: firstName + " " + lastName }],
            subject: adminTemplate.subject,
            htmlbody: adminTemplate.html,
            track_clicks: true,
            track_opens: true,
          }),
        }
      );

      // Send client email
      const clientResponse = await fetch(
        "https://api.zeptomail.com/v1.1/email",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Zoho-enczapikey ${c.env.ZOHO_API_KEY}`,
          },
          body: JSON.stringify({
            from: {
              address: c.env.ZOHO_EMAIL,
              name: c.env.ZOHO_NAME,
            },
            to: [
              {
                email_address: {
                  address: email,
                  name: firstName + " " + lastName,
                },
              },
            ],
            subject: clientTemplate.subject,
            htmlbody: clientTemplate.html,
            track_clicks: true,
            track_opens: true,
          }),
        }
      );

      // Parse responses
      const adminResponseData = await adminResponse.json();
      const clientResponseData = await clientResponse.json();

      if (adminResponse.ok && clientResponse.ok) {
        return c.json({
          success: true,
          message: "Emails sent successfully",
          adminMessageId: adminResponseData.data.message_id,
          clientMessageId: clientResponseData.data.message_id,
        });
      } else {
        return c.json(
          {
            success: false,
            message: "Failed to send emails",
            adminError: adminResponseData,
            clientError: clientResponseData,
          },
          500
        );
      }
    } catch (error) {
      return c.json(
        {
          success: false,
          message: error.message,
        },
        500
      );
    }
  }
);

app.post(
  "/api/email/lpo-financing",
  emailRateLimiter,
  lpoValidation,
  async (c) => {
    const { adminTemplate, clientTemplate } = await getTemplate(c);

    const { companyName, contactPerson, email } = await c.req.json();

    try {
      // Send admin email
      const adminResponse = await fetch(
        "https://api.zeptomail.com/v1.1/email",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Zoho-enczapikey ${c.env.ZOHO_API_KEY}`,
          },
          body: JSON.stringify({
            from: {
              address: email,
              name: contactPerson + " from " + companyName
            },
            to: [
              {
                email_address: {
                  address: c.env.ZOHO_EMAIL,
                  name: c.env.ZOHO_NAME,
                },
              },
            ],
            cc: [
              {
                email_address: {
                  address: c.env.ZOHO_CC_EMAIL,
                  name: "Admin_cc",
                },
              },
            ],
            reply_to: [{ address: email, name: contactPerson + " from " + companyName }],
            subject: adminTemplate.subject,
            htmlbody: adminTemplate.html,
            track_clicks: true,
            track_opens: true,
          }),
        }
      );

      // Send client email
      const clientResponse = await fetch(
        "https://api.zeptomail.com/v1.1/email",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Zoho-enczapikey ${c.env.ZOHO_API_KEY}`,
          },
          body: JSON.stringify({
            from: {
              address: c.env.ZOHO_EMAIL,
              name: c.env.ZOHO_NAME,
            },
            to: [
              {
                email_address: {
                  address: email,
                  name: contactPerson + " from " + companyName,
                },
              },
            ],
            subject: clientTemplate.subject,
            htmlbody: clientTemplate.html,
            track_clicks: true,
            track_opens: true,
          }),
        }
      );

      // Parse responses
      const adminResponseData = await adminResponse.json();
      const clientResponseData = await clientResponse.json();

      if (adminResponse.ok && clientResponse.ok) {
        return c.json({
          success: true,
          message: "Emails sent successfully",
          adminMessageId: adminResponseData.data.message_id,
          clientMessageId: clientResponseData.data.message_id,
        });
      } else {
        return c.json(
          {
            success: false,
            message: "Failed to send emails",
            adminError: adminResponseData,
            clientError: clientResponseData,
          },
          500
        );
      }
    } catch (error) {
      return c.json(
        {
          success: false,
          message: error.message,
        },
        500
      );
    }
  }
);

app.use((err, c) => {
  console.error(" Server Error:", err);
  return c.json(
    {
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? err.message : undefined,
    },
    500
  );
});

export default app;
