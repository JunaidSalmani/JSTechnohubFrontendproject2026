import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PmpBatchesSection from "./PmpBatchesSection";
import "./CertificationsPage.css";
import { submitCertificationEnquiry } from "../services/api";

function CertificationsPage() {
  const { certId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (certId === "pmp" || certId === "pmp-certification" || certId === "pmp-training") {
    return <PmpBatchesSection />;
  }

  const certificationTitle = (certId || "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    const phoneCleaned = formData.phone.replace(/[^0-9]/g, "");
    if (phoneCleaned.length < 10 || phoneCleaned.length > 15) {
      setStatus("error_phone");
      return;
    }

    setIsSubmitting(true);

    const enquiryPayload = {
      ...formData,
      certificationName: certificationTitle,
    };

    try {
      await submitCertificationEnquiry(enquiryPayload);
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
    <div className="cert-detail-container">
      <header className="cert-detail-hero">
        <div className="hero-content">
          <span className="badge">Professional Certification</span>
          <h1>{certificationTitle} Training Program</h1>
          <p>
            Bridge the gap between certification and expertise. Gain the
            technical confidence to lead enterprise-level projects with
            JSTechnoHub.
          </p>
        </div>
      </header>

      <div className="cert-detail-main">
        <div className="cert-detail-content">
          <section>
            <h2>About This Certification</h2>
            <p>
              The <strong>{certificationTitle}</strong> is a globally recognized
              credential designed to validate your advanced technical skills and
              strategic thinking. At JSTechnoHub, our training program bridges
              the gap between theoretical knowledge and real-world application,
              ensuring you are prepared for both the certification exam and the
              challenges of the modern workplace.
            </p>
          </section>

          <section>
            <h3>What You Will Learn</h3>
            <ul className="learning-list">
              <li>
                <strong>Fundamentals & Core Architecture:</strong> Comprehensive
                deep-dive into the {certificationTitle} framework.
              </li>
              <li>
                <strong>Industry Best Practices:</strong> Learning standard
                workflows used by top Fortune 500 companies.
              </li>
              <li>
                <strong>Advanced Implementation:</strong> Hands-on labs focusing
                on configuration, troubleshooting, and optimization.
              </li>
              <li>
                <strong>Strategic Problem Solving:</strong> Analyzing complex
                scenarios to provide efficient, scalable solutions.
              </li>
              <li>
                <strong>Exam Success Strategy:</strong> Intensive mock exams and
                focus sessions on high-weightage topics.
              </li>
            </ul>
          </section>

          <section>
            <h3>Who Should Enroll?</h3>
            <p>
              This program is ideal for IT Professionals, System Administrators,
              Project Managers, and aspiring specialists who want to formalize
              their skills. Whether you are aiming for a salary hike or
              transitioning into a specialized role, this course provides the
              roadmap to your success.
            </p>
          </section>

          <section className="features-grid">
            <div className="feature-item">
              <h4>Expert-Led</h4>
              <p>
                Train under certified instructors with years of industry
                experience.
              </p>
            </div>
            <div className="feature-item">
              <h4>Flexible Learning</h4>
              <p>
                Interactive sessions designed to fit your professional schedule.
              </p>
            </div>
          </section>
        </div>

        <aside className="cert-detail-sidebar">
          <div className="enquiry-form-wrapper-detail">
            <h3>Start Your Journey</h3>
            <p className="form-sub">
              Enter your details to receive the full syllabus and batch
              schedule.
            </p>

            <form className="enquiry-form-detail" onSubmit={handleSubmit}>
              <div className="fl-field">
                <input
                  type="text"
                  name="name"
                  placeholder=" "
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label>Full Name *</label>
              </div>

              <div className="fl-field">
                <input
                  type="email"
                  name="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label>Work Email *</label>
              </div>

              <div className="fl-field">
                <input
                  type="tel"
                  name="phone"
                  placeholder=" "
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
                <label>Phone Number (WhatsApp) *</label>
              </div>

              <div className="fl-field">
                <textarea
                  name="message"
                  placeholder=" "
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <label>Tell us about your learning goals...</label>
              </div>

              <button
                type="submit"
                className="btn-submit-detail"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Processing Request..."
                  : "Request Course Details"}
              </button>
            </form>

            {status === "success" && (
              <div className="status-msg success">
                ✅ Request received! A{" "}
                <strong>Technical Program Advisor</strong> will reach out within
                24 hours.
              </div>
            )}
            {status === "error_name" && (
              <p className="error-msg">⚠️ Please enter a valid full name (at least 2 characters).</p>
            )}
            {status === "error_email" && (
              <p className="error-msg">⚠️ Please enter a valid email address.</p>
            )}
            {status === "error_phone" && (
              <p className="error-msg">⚠️ Please enter a valid 10-digit phone number.</p>
            )}
            {status === "error" && (
              <p className="error-msg">
                ❌ Error connecting to server. Please call us directly.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CertificationsPage;
