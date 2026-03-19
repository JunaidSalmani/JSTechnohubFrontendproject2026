import React, { useState } from "react";
import { Link } from "react-router-dom";
import { submitCertificationEnquiry } from "../services/api";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer.css";

const NAV_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/courses", label: "Courses" },
  { to: "/consulting", label: "Consulting" },
  { to: "/services", label: "Services" },
  { to: "/resume", label: "Resume Writing" },
  { to: "/interview-questions", label: "Interview Q's" },
  { to: "/contact", label: "Contact" },
];

const CERT_LINKS = [
  { to: "/certifications/sales-force", label: "Sales Force" },
  { to: "/certifications/ccna", label: "CCNA" },
  { to: "/certifications/palo-alto", label: "Palo Alto" },
  { to: "/certifications/vmware", label: "VMware" },
  { to: "/certifications/cbap", label: "CBAP" },
  { to: "/certifications/pmp", label: "PMP" },
];

export default function Footer() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | "success" | "error"
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await submitCertificationEnquiry({
        ...form,
        certificationName: "General Inquiry",
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
        {/* ── COL 1 · BRAND ── */}
        <div className="ft-col ft-brand">
          <Link to="/" className="ft-logo" aria-label="JSTechnoHub home">
            <span className="ft-logo-js">JS</span>
            <span className="ft-logo-t">T</span>
            <span className="ft-logo-rest">echno</span>
            <span className="ft-logo-h">H</span>
            <span className="ft-logo-rest">ub</span>
          </Link>

          <p className="ft-tagline">
            Empowering careers through world-class training, certification, and
            career consulting services.
          </p>

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

          {/* Subtle stat pills */}
          <div className="ft-stats">
            <div className="ft-stat">
              <span className="ft-stat-num">50K+</span>
              <span className="ft-stat-label">Professionals Trained</span>
            </div>
            <div className="ft-stat">
              <span className="ft-stat-num">20+</span>
              <span className="ft-stat-label">States Covered</span>
            </div>
          </div>
        </div>

        {/* ── COL 2 · QUICK LINKS ── */}
        <div className="ft-col">
          <h4 className="ft-col-heading">
            <span className="ft-col-heading-bar" />
            Quick Links
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

        {/* ── COL 3 · CERTIFICATIONS ── */}
        <div className="ft-col">
          <h4 className="ft-col-heading">
            <span className="ft-col-heading-bar" />
            Certifications
          </h4>
          <ul className="ft-links">
            {CERT_LINKS.map((c) => (
              <li key={c.to}>
                <Link to={c.to} className="ft-link">
                  <span className="ft-link-dot" />
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* ── COL 4 · ENQUIRY FORM ── */}
        <div className="ft-col ft-form-col">
          <h4 className="ft-col-heading">
            <span className="ft-col-heading-bar" />
            Have a Question?
          </h4>

          <form className="ft-form" onSubmit={handleSubmit} noValidate>
            <input
              className="ft-input"
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="ft-input"
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="ft-input"
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <textarea
              className="ft-input ft-textarea"
              name="message"
              placeholder="Your message…"
              rows={4}
              value={form.message}
              onChange={handleChange}
              required
            />

            <button className="ft-submit" type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send Message →"}
            </button>

            {status === "success" && (
              <p className="ft-status ft-status--ok">
                ✓ Message sent! We'll be in touch shortly.
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
      {/* /ft-main */}

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
          © {new Date().getFullYear()} JSTechnoHub. All rights reserved.
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
