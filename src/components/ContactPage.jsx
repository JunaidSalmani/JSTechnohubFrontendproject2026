import React, { useState } from "react";
import styles from "./ContactPage.module.css";
import { submitCertificationEnquiry } from "../services/api";
import PhoneInputField, { isValidPhoneNumber } from "./PhoneInputField";

// ── SVG ICONS ────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ContactHero = () => (
  <section className={styles.contactHero}>
    <div className="app-container">
      <div className={styles.heroCenter}>
        <div className={styles.heroBadge}>
          <span className={styles.badgeDot} />
          Global Training &amp; Career Advisory Support
        </div>

        <h1 className={styles.heroTitle}>
          Connect with Our Executive Advisors <br />
          <span className={styles.textGradient}>Start Your Career Transformation</span>
        </h1>

        <p className={styles.heroDesc}>
          Whether you have questions about PMP®, SAP S/4HANA, AWS, or DevOps batches, need 1-on-1 application audit clearance,
          or require executive ATS resume writing — our dedicated team is here to guide you.
        </p>
      </div>
    </div>
  </section>
);

const BookingCTA = () => (
  <section className={styles.ctaSectionWrap}>
    <div className="app-container">
      <div className={styles.ctaCard}>
        <div className={styles.ctaText}>
          <h2>Book a Free 30-Minute Career Discovery Call</h2>
          <p>
            Speak directly with a senior certification advisor. We'll evaluate your background, verify exam eligibility, and outline your personalized roadmap.
          </p>
        </div>
        <div className={styles.ctaActions}>
          <a href="tel:+918743039914" className={styles.ctaPrimaryBtn}>
            <PhoneIcon /> Call: +91 87430 39914
          </a>
          <a
            href="https://wa.me/918743039914?text=Hi%20JSTechnoHub%2C%20I%20would%20like%20to%20enquire%20about%20your%20training%20and%20certification%20programs."
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaSecondaryBtn}
          >
            WhatsApp Direct →
          </a>
        </div>
      </div>
    </div>
  </section>
);

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    certificationName: "PMP Certification Training",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

    try {
      await submitCertificationEnquiry(formData);
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        certificationName: "PMP Certification Training",
        message: "",
      });
    } catch (err) {
      console.error("Error submitting enquiry:", err);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <div className={styles.cardHeader}>
        <h2>Send Us a Direct Message</h2>
        <p>Fill out the form below and an advisor will connect with you within 2 business hours.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.formElement}>
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
          <label htmlFor="email">Work / Personal Email *</label>
        </div>

        <PhoneInputField
          name="phone"
          id="phone"
          label="WhatsApp Phone Number *"
          value={formData.phone}
          onChange={(val) => setFormData((p) => ({ ...p, phone: val }))}
          required
        />

        <div className="fl-field">
          <select
            id="certificationName"
            name="certificationName"
            value={formData.certificationName}
            onChange={handleChange}
          >
            <option value="PMP Certification Training">PMP® Certification Training &amp; Exam Prep</option>
            <option value="SAP S/4HANA Training">SAP Training &amp; GUI Server (FICO, MM, SD)</option>
            <option value="AWS Cloud Solutions Architect">AWS Certified Solutions Architect</option>
            <option value="DevOps CI/CD Automation">DevOps Engineering &amp; Kubernetes</option>
            <option value="1-on-1 Certification Support">1-on-1 Certification Application &amp; Audit Support</option>
            <option value="ATS Resume & LinkedIn">ATS Resume Writing &amp; LinkedIn Optimization</option>
            <option value="Corporate Team Training">Corporate / Enterprise Team Training</option>
            <option value="General Inquiry">General Consultation Inquiry</option>
          </select>
          <label htmlFor="certificationName">Program / Service of Interest</label>
        </div>

        <div className="fl-field">
          <textarea
            id="message"
            name="message"
            rows="4"
            placeholder=" "
            value={formData.message}
            onChange={handleChange}
            required
          />
          <label htmlFor="message">How can our team assist you? *</label>
        </div>

        <button
          type="submit"
          className={styles.submitBtn}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting Inquiry..." : "Submit Direct Message →"}
        </button>

        {status === "success" && (
          <div className={styles.successBanner}>
            <CheckIcon /> Your enquiry has been received. Our senior advisor will reach out shortly!
          </div>
        )}
        {status === "error_name" && (
          <div className={styles.errorBanner}>Please enter your full name (at least 2 characters).</div>
        )}
        {status === "error_email" && (
          <div className={styles.errorBanner}>Please enter a valid email address.</div>
        )}
        {status === "error_phone" && (
          <div className={styles.errorBanner}>Please enter a valid phone number with country code.</div>
        )}
        {status === "error_message" && (
          <div className={styles.errorBanner}>Please enter a message of at least 5 characters.</div>
        )}
        {status === "error" && (
          <div className={styles.errorBanner}>
            Failed to submit enquiry. Please call us directly at +91 87430 39914.
          </div>
        )}

        <div className={styles.trustFooter}>
          <CheckIcon /> <span>Strict confidentiality · No spam guarantee</span>
        </div>
      </form>
    </div>
  );
};

const LocationAndDetails = () => (
  <div className={styles.detailsCard}>
    <div className={styles.cardHeader}>
      <h2>Corporate Contact &amp; Hubs</h2>
      <p>Reach out across our pan-India locations or through direct channels.</p>
    </div>

    <div className={styles.contactList}>
      <div className={styles.contactItem}>
        <div className={styles.itemIconWrap}>
          <PhoneIcon />
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemLabel}>Telephone Support</span>
          <a href="tel:+918743039914" className={styles.itemLink}>
            +91 87430 39914
          </a>
        </div>
      </div>

      <div className={styles.contactItem}>
        <div className={styles.itemIconWrap}>
          <MailIcon />
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemLabel}>Academic &amp; Student Inquiries</span>
          <a href="mailto:support@jstechnohub.com" className={styles.itemLink}>
            support@jstechnohub.com
          </a>
        </div>
      </div>

      <div className={styles.contactItem}>
        <div className={styles.itemIconWrap}>
          <ClockIcon />
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemLabel}>Operating Hours</span>
          <span className={styles.itemVal}>Monday – Saturday: 9:00 AM – 8:00 PM IST</span>
        </div>
      </div>

      <div className={styles.contactItem}>
        <div className={styles.itemIconWrap}>
          <MapPinIcon />
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemLabel}>Maharashtra Registered Office</span>
          <span className={styles.itemVal}>
            West High Court Road, Dharampeth, Nagpur, Maharashtra 440010, India
          </span>
        </div>
      </div>

      <div className={styles.contactItem}>
        <div className={styles.itemIconWrap}>
          <MapPinIcon />
        </div>
        <div className={styles.itemInfo}>
          <span className={styles.itemLabel}>Bengaluru Technology Center</span>
          <span className={styles.itemVal}>
            MG Road, Bengaluru, Karnataka 560001, India
          </span>
        </div>
      </div>
    </div>

    <div className={styles.socialBox}>
      <h4>Official Channels:</h4>
      <div className={styles.socialButtons}>
        <a
          href="https://www.linkedin.com/company/jstechnohub/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBtn}
        >
          LinkedIn Company Profile →
        </a>
        <a
          href="https://www.instagram.com/jstechno_hub?igsh=cG81djVwZnNrbDZj"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialBtn}
        >
          Instagram →
        </a>
      </div>
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
    <div className={styles.contactPageWrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <ContactHero />
      <BookingCTA />
      <div className="app-container">
        <div className={styles.contactGrid}>
          <ContactForm />
          <LocationAndDetails />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
