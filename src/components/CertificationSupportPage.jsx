import React from "react";
import { Link } from "react-router-dom";
import {
  FaShieldAlt,
  FaClock,
  FaStar,
  FaAward,
  FaLandmark,
  FaCloud,
  FaChartBar,
  FaBolt,
} from "react-icons/fa";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import "./ServicePageCommon.css";

export default function CertificationSupportPage() {
  const supportFaqs = [
    {
      q: "What is 1-on-1 Certification Support?",
      a: "Our Certification Support service provides end-to-end guidance for candidates applying for global professional certifications (PMI®, AWS, SAP, Salesforce, Cisco, CAMS). We assist with eligibility checks, application drafting, experience mapping, audit clearance, and exam strategy.",
    },
    {
      q: "What happens if my application is selected for audit?",
      a: "If your application (such as PMI PMP®) is selected for a random audit, our senior experts verify your project experience descriptions, prepare signature-ready verification documents for your managers, and guide you through electronic audit submission within 48 hours.",
    },
    {
      q: "Who is Certification Support suitable for?",
      a: "This service is suitable for busy working professionals, executives, team leads, and career changers who want to ensure their exam application is accepted on the first attempt without administrative delays or rejection.",
    },
    {
      q: "Does JSTechnoHub provide exam voucher assistance?",
      a: "Yes! We guide candidates on how to claim authorized exam discount vouchers, PMI membership fee savings, and regional exam pricing benefits.",
    },
    {
      q: "What is the turnaround time for application audit clearance support?",
      a: "Our team reviews draft application forms within 24 business hours and completes audit documentation packages within 48 business hours.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Global Professional Certification & Audit Clearance Support",
    "description": "Expert 1-on-1 assistance for PMI PMP, AWS, SAP, and Salesforce certification application drafting, eligibility verification, and audit clearance.",
    "provider": {
      "@type": "EducationalOrganization",
      "name": "JSTechnoHub",
      "sameAs": "https://www.jstechnohub.com",
    },
  };

  return (
    <div className="sp-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-container sp-hero-grid">
          <div>
            <span className="sp-hero-badge">
              <FaShieldAlt style={{ color: "#059669" }} /> 100% Guaranteed Audit Clearance Guidance
            </span>
            <h1 className="sp-hero-title">Certification Support & Audit Clearance</h1>
            <p className="sp-hero-desc">
              Don't risk exam application rejection or audit delays. Our certified experts guide you step-by-step through experience mapping, application submission, audit document package assembly, and exam scheduling.
            </p>
            <div className="sp-hero-meta">
              <div className="sp-meta-item">
                <FaClock style={{ color: "#059669" }} /> <span>24-48 Hr Response</span>
              </div>
              <div className="sp-meta-item">
                <FaStar style={{ color: "#f59e0b" }} /> <span>100% Audit Success</span>
              </div>
              <div className="sp-meta-item">
                <FaAward style={{ color: "#059669" }} /> <span>PMI / AWS / SAP / Salesforce</span>
              </div>
            </div>
          </div>

          <div className="sp-hero-card">
            <h3>1-on-1 Audit & Application Package</h3>
            <div className="sp-card-price">
              <s>₹9,999</s> ₹4,999
            </div>
            <ul className="sp-card-features">
              <li>Comprehensive Experience Draft Writing & Alignment</li>
              <li>Official Vendor Audit Package Preparation</li>
              <li>Manager Verification & Sign-off Guidance</li>
              <li>Exam Registration & Scheduling Support</li>
              <li>Retake Strategy & Mock Assessment Audit</li>
            </ul>
            <Link to="/contact" className="sp-btn-primary">
              Get Application Assistance Now →
            </Link>
          </div>
        </div>
      </section>

      {/* Supported Certifications */}
      <section className="sp-section">
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>Global Certifications Supported</h2>
            <p>End-to-end administrative and technical guidance across top vendor bodies.</p>
          </div>

          <div className="sp-grid">
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaLandmark />
              </div>
              <h3>PMI® Credentials (PMP, CAPM, PgMP)</h3>
              <p>Project experience domain mapping, deliverables wording, 35 contact hours verification, and PMI audit resolution.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaCloud />
              </div>
              <h3>AWS & Cloud Certifications</h3>
              <p>Candidate account registration, exam voucher redemption, Pearson VUE testing center scheduling support.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaChartBar />
              </div>
              <h3>SAP Global Certifications</h3>
              <p>SAP Learning Hub registration, S-User ID assistance, exam attempt allocation, and certification badge verification.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaBolt />
              </div>
              <h3>Salesforce & Security Credentials</h3>
              <p>Kryterion Webassessor setup, Salesforce Trailhead verification, CCNA, CBAP, and CAMS audit assistance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="sp-section" style={{ backgroundColor: "#ffffff" }}>
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>Our 4-Step Audit Clearance Process</h2>
            <p>How we ensure your application passes vendor scrutiny effortlessly.</p>
          </div>

          <div className="sp-audience-box">
            <ul className="sp-audience-list">
              <li><span>1</span> Initial Eligibility & Experience Evaluation</li>
              <li><span>2</span> Professional Experience Drafting & Review</li>
              <li><span>3</span> Application Portal Submission & Verification</li>
              <li><span>4</span> Audit Documentation & Manager Verification Package</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <ServiceFAQAccordion title="Certification Support Frequently Asked Questions" faqs={supportFaqs} />
    </div>
  );
}
