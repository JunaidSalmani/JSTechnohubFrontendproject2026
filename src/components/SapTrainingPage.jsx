import React from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaClock,
  FaStar,
  FaDesktop,
  FaChartBar,
  FaBox,
  FaRocket,
  FaLaptopCode,
  FaWhatsapp,
} from "react-icons/fa";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import "./ServicePageCommon.css";

export default function SapTrainingPage() {
  const sapFaqs = [
    {
      q: "What is SAP training and certification?",
      a: "SAP training provides hands-on expertise in SAP Enterprise Resource Planning (ERP) software modules including Financial Accounting (FICO), Materials Management (MM), Sales and Distribution (SD), and S/4HANA Migration. Certification validates your competence in implementing and configuring SAP for enterprise clients worldwide.",
    },
    {
      q: "What are the eligibility requirements for SAP training?",
      a: "There are no strict prerequisites. However, a Bachelor's degree in Commerce, Business, Engineering, or Computer Science, combined with basic domain knowledge in finance, supply chain, or IT, helps candidates learn faster.",
    },
    {
      q: "Who is SAP training suitable for?",
      a: "SAP training is suitable for Finance & Accounting professionals (FICO), Logistics & Purchasing leads (MM), Sales & Business Development executives (SD), IT Consultants, Software Developers, and Fresh Graduates aiming for high-paying ERP consultant roles.",
    },
    {
      q: "Which SAP module should I choose?",
      a: "If you have a background in Finance, Commerce, or Accounting, choose SAP FICO. If you come from Operations, Supply Chain, or Procurement, choose SAP MM. If you have sales or commercial experience, choose SAP SD. For IT and developer profiles, SAP ABAP or S/4HANA Technical is ideal.",
    },
    {
      q: "Does JSTechnoHub provide live SAP GUI server access?",
      a: "Yes! Every learner receives dedicated 24/7 remote SAP S/4HANA GUI server access with practical customization tasks, real company master data, and configuration exercises.",
    },
  ];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "SAP ERP Functional & Technical Certification Training",
    "description": "Comprehensive SAP training covering FICO, MM, SD, and S/4HANA with live SAP GUI server access and real-world enterprise configuration projects.",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />

      {/* Hero */}
      <section className="sp-hero">
        <div className="sp-container sp-hero-grid">
          <div>
            <span className="sp-hero-badge">
              <FaBriefcase style={{ color: "#eb001b" }} /> Enterprise ERP &amp; SAP S/4HANA Ready
            </span>
            <h1 className="sp-hero-title">SAP Training &amp; Global Certification Prep</h1>
            <p className="sp-hero-desc">
              Master enterprise ERP processes with hands-on SAP S/4HANA GUI server access. Training modules include SAP FICO (Finance), SAP MM (Materials Management), SAP SD (Sales &amp; Distribution), and ABAP customization.
            </p>
            <div className="sp-hero-meta">
              <div className="sp-meta-item">
                <FaClock style={{ color: "#f79e1b" }} /> <span>6 Weeks (45 Hrs)</span>
              </div>
              <div className="sp-meta-item">
                <FaStar style={{ color: "#f79e1b" }} /> <span>4.9 / 5 Rating</span>
              </div>
              <div className="sp-meta-item">
                <FaDesktop style={{ color: "#eb001b" }} /> <span>24/7 Live SAP GUI Access</span>
              </div>
            </div>
          </div>

          <div className="sp-hero-card">
            <h3>SAP Certification Program</h3>
            <div className="sp-card-price">
              <s>₹24,999</s> ₹12,499
            </div>
            <ul className="sp-card-features">
              <li>24/7 Dedicated SAP S/4HANA Server Access</li>
              <li>Real Enterprise Business Process Configuration</li>
              <li>Official SAP Certification Exam Blueprint</li>
              <li>Resume &amp; Interview Coaching for SAP Roles</li>
              <li>1-on-1 Mentor Doubt Resolution</li>
            </ul>
            <Link to="/contact" className="sp-btn-primary">
              Request Free SAP Demo Class →
            </Link>
            <a
              href="https://wa.me/918743039914?text=Hello%20JSTechnoHub%20I%20am%20interested%20in%20SAP%20S4HANA%20Training%20and%20Certification"
              target="_blank"
              rel="noopener noreferrer"
              className="sp-btn-whatsapp"
            >
              <FaWhatsapp />
              <span>Chat with SAP Advisor on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="sp-section">
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>SAP Specialization Modules Offered</h2>
            <p>Select your track based on your educational background and career goals.</p>
          </div>

          <div className="sp-grid">
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaChartBar />
              </div>
              <h3>SAP FICO (Financial & Controlling)</h3>
              <p>General Ledger, Accounts Payable/Receivable, Asset Accounting, Cost Center, and Asset Management in S/4HANA.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaBox />
              </div>
              <h3>SAP MM (Materials Management)</h3>
              <p>Procure-to-Pay (P2P), Purchase Orders, Inventory Management, Master Data, Vendor Evaluation, and Invoice Verification.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaRocket />
              </div>
              <h3>SAP SD (Sales & Distribution)</h3>
              <p>Order-to-Cash (O2C), Customer Master Data, Pricing Procedures, Shipping, Billing, and Partner Determination.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaLaptopCode />
              </div>
              <h3>SAP S/4HANA Migration & ABAP</h3>
              <p>Greenfield vs Brownfield migration strategies, Fiori Apps configuration, and core data services (CDS) views.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="sp-section" style={{ backgroundColor: "#ffffff" }}>
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>Who Should Enroll in SAP Training?</h2>
            <p>Ideal profiles for building an international SAP consulting career.</p>
          </div>

          <div className="sp-audience-box">
            <ul className="sp-audience-list">
              <li><span>1</span> Commerce, B.Com, MBA & Finance Professionals</li>
              <li><span>2</span> Supply Chain, Logistics & Procurement Managers</li>
              <li><span>3</span> B.Tech / BE Engineering & IT Graduates</li>
              <li><span>4</span> Legacy SAP ECC users transitioning to S/4HANA</li>
              <li><span>5</span> Business Analysts & ERP Functional Consultants</li>
              <li><span>6</span> IT Support & Systems Administrators</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <ServiceFAQAccordion title="SAP Training Frequently Asked Questions" faqs={sapFaqs} />
    </div>
  );
}
