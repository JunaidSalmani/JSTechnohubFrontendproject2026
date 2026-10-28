import React, { useState } from "react";
import styles from "./ContactPage.module.css";
import { submitCertificationEnquiry } from "../services/api";
import PhoneInputField, { isValidPhoneNumber } from "./PhoneInputField";

const ContactHero = () => (
  <div className={styles.contactHeader}>
    <h1>Ready to Transform Your Career? Contact JSTechnoHub</h1>
    <p>
      Whether you have questions about our PMP®, SAP, AWS Cloud, or DevOps certification batches, or need 1-on-1 application support and ATS resume services, our team is ready to guide you.
    </p>
  </div>
);

const BookingCTA = () => (
  <div className={styles.ctaSection}>
    <h2>Book a Free 30-Minute Career & Certification Discovery Call</h2>
    <p>
      Speak directly with a senior certification advisor. We'll evaluate your resume background, check exam eligibility, and map out your optimal training path.
    </p>
    <a
      href="tel:+919876543210"
      className={styles.ctaButton}
    >
      📞 Call Us: +91 98765 43210
    </a>
  </div>
);

const ContactForm = ({ certificationName }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus("error_name");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setStatus("error_email");
      return;
    }
    if (!isValidPhoneNumber(formData.phone)) {
      setStatus("error_phone");
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus("error_message");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...formData,
      certificationName: certificationName || "General Contact Inquiry",
    };

    try {
      await submitCertificationEnquiry(payload);
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2>Send Us a Message</h2>
      <form onSubmit={handleSubmit}>
        <div className="fl-field">
          <input
            type="text"
            id="name"
            name="name"
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label htmlFor="name">Full Name *</label>
        </div>

        <div className="fl-field">
          <input
            type="email"
            id="email"
            name="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email Address *</label>
        </div>

        <PhoneInputField
          name="phone"
          id="phone"
          label="Phone Number *"
          value={formData.phone}
          onChange={(val) => setFormData((p) => ({ ...p, phone: val }))}
          required
        />

        <div className="fl-field">
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder=" "
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
          <label htmlFor="message">How can we help you? *</label>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Send Message"}
        </button>
      </form>
      <div className={styles.statusMessage}>
        {status === "success" && (
          <p className={styles.successMsg}>
            ✓ Your enquiry was submitted successfully! Our team will contact you shortly.
          </p>
        )}
        {status === "error_name" && (
          <p className={styles.errorMsg}>⚠️ Please enter a valid full name (at least 2 characters).</p>
        )}
        {status === "error_email" && (
          <p className={styles.errorMsg}>⚠️ Please enter a valid email address.</p>
        )}
        {status === "error_phone" && (
          <p className={styles.errorMsg}>⚠️ Please enter a valid phone number with country code.</p>
        )}
        {status === "error_message" && (
          <p className={styles.errorMsg}>⚠️ Please enter a brief message (at least 5 characters).</p>
        )}
        {status === "error" && (
          <p className={styles.errorMsg}>
            ❌ Failed to submit enquiry. Please try again or call us directly.
          </p>
        )}
      </div>
      <p className={styles.responseTime}>
        Our support team responds to all inquiries within 24 business hours.
      </p>
    </div>
  );
};

const LocationAndDetails = () => (
  <div style={{ background: "#ffffff", border: "1.5px solid #e2e8f0", borderRadius: "16px", padding: "28px", marginTop: "24px" }}>
    <h3 style={{ fontSize: "1.25rem", color: "#0f172a", marginBottom: "16px" }}>📍 Corporate Contact &amp; Offices</h3>
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "0.95rem", color: "#334155" }}>
      <p><strong>Company:</strong> JSTechnoHub Training &amp; Career Consulting</p>
      <p><strong>Nagpur Office:</strong> West High Court Road, Dharampeth, Nagpur, Maharashtra 440010, India</p>
      <p><strong>Bangalore Office:</strong> MG Road, Bengaluru, Karnataka 560001, India</p>
      <p><strong>Support Email:</strong> <a href="mailto:support@jstechnohub.com" style={{ color: "#059669", fontWeight: "700" }}>support@jstechnohub.com</a></p>
      <p><strong>Support Phone:</strong> <a href="tel:+918743039914" style={{ color: "#059669", fontWeight: "700" }}>+91 87430 39914</a></p>
      <p><strong>Working Hours:</strong> Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
    </div>

    <h4 style={{ fontSize: "1rem", color: "#0f172a", marginTop: "20px", marginBottom: "8px" }}>Follow &amp; Connect:</h4>
    <div style={{ display: "flex", gap: "12px" }}>
      <a href="https://www.linkedin.com/company/jstechnohub/" target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontWeight: "700", textDecoration: "none" }}>
        LinkedIn Profile →
      </a>
      <a href="https://www.instagram.com/jstechno_hub?igsh=cG81djVwZnNrbDZj" target="_blank" rel="noopener noreferrer" style={{ color: "#e1306c", fontWeight: "700", textDecoration: "none" }}>
        Instagram →
      </a>
    </div>
  </div>
);

const ContactPage = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact JSTechnoHub",
    "url": "https://www.jstechnohub.com/contact",
    "mainEntity": {
      "@type": "EducationalOrganization",
      "name": "JSTechnoHub",
      "telephone": "+91 87430 39914",
      "email": "support@jstechnohub.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "West High Court Road, Dharampeth",
        "addressLocality": "Nagpur",
        "addressRegion": "Maharashtra",
        "postalCode": "440010",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <div className={styles.contactPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactHero />
      <BookingCTA />
      <div className={styles.contactBody}>
        <ContactForm />
        <LocationAndDetails />
      </div>
    </div>
  );
};

export default ContactPage;
