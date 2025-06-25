
// src/pages/PrivacyPolicy.jsx
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4 text-sm text-gray-600">Effective Date: [2024]</p>

      <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Full name, email address, phone number</li>
        <li>Company and financial documentation</li>
        <li>Inquiry and service request details</li>
        <li>Technical data like IP and browser info</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Responding to your inquiries</li>
        <li>Processing financing applications</li>
        <li>Improving user experience</li>
        <li>Regulatory compliance</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. Sharing of Information</h2>
      <p className="mb-4">
        We do not sell or rent your data. We may share it with financial partners, service providers, or regulatory bodies under legal obligations.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Data Security</h2>
      <p className="mb-4">
        We use secure servers, encryption, and access control to protect your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">5. Your Rights</h2>
      <ul className="list-disc pl-5 mb-4">
        <li>Access, correct, or delete your data</li>
        <li>Object to certain uses</li>
        <li>Withdraw consent at any time</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">6. Cookies and Tracking</h2>
      <p className="mb-4">
        We use cookies to improve user experience. You can disable them in your browser settings.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Third-Party Links</h2>
      <p className="mb-4">
        We are not responsible for external site practices linked from our site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Updates to This Policy</h2>
      <p className="mb-4">
        This policy may change. Check the effective date above for the latest version.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
      <p>
        Email: <a href="mailto:support@trinityfinancing.com" className="text-blue-600">finance.support@trinityfinancing.com</a><br />
        
      </p>
    </div>
  );
};

export default PrivacyPolicy;