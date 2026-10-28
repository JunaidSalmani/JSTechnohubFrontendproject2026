import React, { useState } from "react";
import { Link } from "react-router-dom";
import { submitCertificationEnquiry } from "../services/api";
import PhoneInputField, { isValidPhoneNumber } from "./PhoneInputField";
import {
  FaLinkedin,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import "./Footer.css";

const SERVICE_LINKS = [
  { to: "/services/pmp", label: "PMP® Certification Prep" },
  { to: "/services/sap", label: "SAP ERP (FICO/MM/SD)" },
  { to: "/services/aws", label: "AWS Cloud Architect" },
  { to: "/services/devops", label: "DevOps CI/CD Pipelines" },
  { to: "/services/certification-support", label: "1-on-1 Audit Support" },
  { to: "/services/resume-career", label: "ATS Resume & LinkedIn" },
];

const NAV_LINKS = [
  { to: "/about", label: "About JSTechnoHub" },
  { to: "/services", label: "All Services" },
  { to: "/courses", label: "Upcoming Batches" },
  { to: "/certifications", label: "Certifications Catalog" },
  { to: "/consulting", label: "Career Consulting" },
  { to: "/interview-questions", label: "Interview Questions" },
  { to: "/contact", label: "Contact & Locations" },
];

export default function Footer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || form.name.trim().length < 2) {
      setStatus("Please enter your name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setStatus("Please enter a valid email address.");
      return;
    }
    if (!isValidPhoneNumber(form.phone)) {
      setStatus("Please enter a valid phone number with country code.");
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      await submitCertificationEnquiry({
        ...form,
        certificationName: "Footer Contact Inquiry",
      });
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="ft">
      {/* ── TOP ACCENT LINE ── */}
      <div className="ft-accent" aria-hidden="true" />

      {/* ══════════════ MAIN GRID ══════════════ */}
      <div className="ft-main">
        {/* ── COL 1 · BRAND & CONTACT ── */}
        <div className="ft-col ft-brand">
          <Link to="/" className="ft-logo" aria-label="JSTechnoHub home">
            <span className="ft-logo-js">JS</span>
            <span className="ft-logo-t">T</span>
            <span className="ft-logo-rest">echno</span>
            <span className="ft-logo-h">H</span>
            <span className="ft-logo-rest">ub</span>
          </Link>

          <p className="ft-tagline">
            Premier global training institute and career accelerator specializing in PMP®, SAP ERP, AWS Cloud, DevOps, 1-on-1 Certification Audit Support, and ATS Resume Writing.
          </p>

          <div style={{ margin: "16px 0", fontSize: "0.88rem", color: "#94a3b8", lineHeight: "1.8" }}>
            <p style={{ margin: "4px 0", display: "flex", alignItems: "center" }}>
              <FaMapMarkerAlt style={{ color: "#00c2ff", marginRight: "8px", flexShrink: 0 }} />
              <span><strong>Offices:</strong> Nagpur &amp; Bangalore, India</span>
            </p>
            <p style={{ margin: "4px 0", display: "flex", alignItems: "center" }}>
              <FaPhoneAlt style={{ color: "#00c2ff", marginRight: "8px", flexShrink: 0 }} />
              <span><strong>Phone:</strong> +91 87430 39914</span>
            </p>
            <p style={{ margin: "4px 0", display: "flex", alignItems: "center" }}>
              <FaEnvelope style={{ color: "#00c2ff", marginRight: "8px", flexShrink: 0 }} />
              <span><strong>Email:</strong> support@jstechnohub.com</span>
            </p>
          </div>

          <div className="ft-social">
            <a
              href="https://www.linkedin.com/company/jstechnohub/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-social-link"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://www.instagram.com/jstechno_hub?igsh=cG81djVwZnNrbDZj"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-social-link"
            >
              <FaInstagram size={18} />
            </a>
          </div>

          <div className="ft-stats">
            <div className="ft-stat">
              <span className="ft-stat-num">1,200+</span>
              <span className="ft-stat-label">Certified Alumni</span>
            </div>
            <div className="ft-stat">
              <span className="ft-stat-num">98.4%</span>
              <span className="ft-stat-label">Exam Pass Rate</span>
            </div>
          </div>
        </div>

        {/* ── COL 2 · CORE SERVICES ── */}
        <div className="ft-col">
          <h4 className="ft-col-heading">
            <span className="ft-col-heading-bar" />
            Dedicated Services
          </h4>
          <ul className="ft-links">
            {SERVICE_LINKS.map((s) => (
              <li key={s.to}>
                <Link to={s.to} className="ft-link">
                  <span className="ft-link-dot" />
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── COL 3 · QUICK LINKS ── */}
        <div className="ft-col">
          <h4 className="ft-col-heading">
            <span className="ft-col-heading-bar" />
            Company & Navigation
          </h4>
          <ul className="ft-links">
            {NAV_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="ft-link">
                  <span className="ft-link-dot" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── COL 4 · ENQUIRY FORM ── */}
        <div className="ft-col ft-form-col">
          <h4 className="ft-col-heading">
            <span className="ft-col-heading-bar" />
            Get Course Assistance
          </h4>

          <form className="ft-form" onSubmit={handleSubmit} noValidate>
            <div className="fl-field">
              <input
                className="ft-input"
                type="text"
                name="name"
                placeholder=" "
                value={form.name}
                onChange={handleChange}
                required
              />
              <label>Your Name *</label>
            </div>
            <div className="fl-field">
              <input
                className="ft-input"
                type="email"
                name="email"
                placeholder=" "
                value={form.email}
                onChange={handleChange}
                required
              />
              <label>Your Email *</label>
            </div>
            <PhoneInputField
              name="phone"
              label="Phone Number *"
              value={form.phone}
              onChange={(val) => setForm((p) => ({ ...p, phone: val }))}
              required
            />
            <div className="fl-field">
              <textarea
                className="ft-input ft-textarea"
                name="message"
                placeholder=" "
                rows={2}
                value={form.message}
                onChange={handleChange}
                required
              />
              <label>Service / Course Interested In *</label>
            </div>

            <button className="ft-submit" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Submit Enquiry →"}
            </button>

            {status === "success" && (
              <p className="ft-status ft-status--ok">
                ✓ Enquiry sent! We will contact you within 24 hours.
              </p>
            )}
            {status === "error" && (
              <p className="ft-status ft-status--err">
                ✗ Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* ══════════════ MAPS ROW ══════════════ */}
      <div className="ft-maps">
        <div className="ft-map-card">
          <p className="ft-map-label">
            <span className="ft-map-dot" />
            Nagpur Office
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3721.423535758346!2d79.0881547154023!3d21.14580068903689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c7bd80c3f53f%3A0x2b8f6d8b1c5cfb5d!2sNagpur!5e0!3m2!1sen!2sin!4v1631872740123!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            title="Nagpur Office"
          />
        </div>
        <div className="ft-map-card">
          <p className="ft-map-label">
            <span className="ft-map-dot" />
            Bangalore Office
          </p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.8893790352333!2d77.59456271533603!3d12.971598990856214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670b3f7a9b7%3A0x37ef2c0c1a92a69f!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1631872780164!5m2!1sen!2sin"
            allowFullScreen=""
            loading="lazy"
            title="Bangalore Office"
          />
        </div>
      </div>

      {/* ══════════════ BOTTOM BAR ══════════════ */}
      <div className="ft-bottom">
        <p className="ft-copy">
          © {new Date().getFullYear()} JSTechnoHub Training &amp; Career Consulting. All rights reserved.
        </p>
        <div className="ft-legal">
          <Link to="/cancellation-policy">Cancellation &amp; Refunds</Link>
          <span className="ft-legal-sep" />
          <Link to="/privacy-policy">Privacy Policy</Link>
          <span className="ft-legal-sep" />
          <Link to="/terms-of-service">Terms &amp; Conditions</Link>
        </div>
      </div>
    </footer>
  );
}
