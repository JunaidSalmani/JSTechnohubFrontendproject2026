import React from "react";
import { Link } from "react-router-dom";
import {
  FaBolt,
  FaClock,
  FaStar,
  FaTrophy,
  FaBookOpen,
  FaRobot,
  FaCheckCircle,
  FaSyncAlt,
} from "react-icons/fa";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import "./ServicePageCommon.css";

export default function PmpServicePage() {
  const pmpFaqs = [
    {
      q: "What is PMP® certification?",
      a: "The Project Management Professional (PMP)® is the world's leading project management certification issued by the Project Management Institute (PMI)®. It validates your ability to manage projects, teams, and processes across Predictive, Agile, and Hybrid methodologies.",
    },
    {
      q: "What are the eligibility requirements for the PMP® exam?",
      a: "Candidates need either: (1) A 4-year degree, 36 months of project leading experience, and 35 hours of project management education, OR (2) A high school diploma/associate degree, 60 months of project leading experience, and 35 hours of project management education.",
    },
    {
      q: "Who is PMP® training suitable for?",
      a: "PMP® training is designed for Project Managers, Associate PMs, Team Leads, Scrum Masters, Program Managers, Product Owners, Software Engineers, IT Leads, and Professionals aiming to transition into formal project management leadership roles.",
    },
    {
      q: "What are the 35 Contact Hours and how are they provided?",
      a: "PMI® mandates 35 formal contact hours of project management education before taking the PMP® exam. JSTechnoHub provides an official, verifiable 35 Contact Hours Certificate upon completion of our live interactive virtual training.",
    },
    {
      q: "How does JSTechnoHub assist with PMP® audit clearance?",
      a: "If your PMI application is selected for random audit, our experts review your experience descriptions, audit documentation, and manager verification forms to guarantee 100% smooth clearance within 48 hours.",
    },
  ];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "PMP® Certification Training with Gen AI Modules",
    "description": "PMI® Authorized 35 Contact Hours PMP Exam Prep course covering Predictive, Agile, Hybrid, and Gen AI project management workflows.",
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
              <FaBolt style={{ color: "#059669" }} /> PMI® Authorized 35 Contact Hours Included
            </span>
            <h1 className="sp-hero-title">PMP® Certification Prep & Gen AI Mastery</h1>
            <p className="sp-hero-desc">
              Pass your PMP® exam on the 1st attempt with live instructor-led training, official PMI® Examination Content Outline (ECO) coverage, situational mock exams, and ChatGPT prompt engineering for project managers.
            </p>
            <div className="sp-hero-meta">
              <div className="sp-meta-item">
                <FaClock style={{ color: "#059669" }} /> <span>4 Weeks (35 Hrs)</span>
              </div>
              <div className="sp-meta-item">
                <FaStar style={{ color: "#f59e0b" }} /> <span>4.9 / 5 Rating</span>
              </div>
              <div className="sp-meta-item">
                <FaTrophy style={{ color: "#059669" }} /> <span>98.4% Pass Rate</span>
              </div>
            </div>
          </div>

          <div className="sp-hero-card">
            <h3>Upcoming Batch Enrollment</h3>
            <div className="sp-card-price">
              <s>₹19,999</s> ₹9,999
            </div>
            <ul className="sp-card-features">
              <li>Official 35 Contact Hours Certificate</li>
              <li>PMI® ECO 2026 Aligned Study Kit</li>
              <li>1,500+ Situational Practice Questions</li>
              <li>1-on-1 PMP Application & Audit Support</li>
              <li>Gen AI Prompting for Project Managers</li>
            </ul>
            <Link to="/courses" className="sp-btn-primary">
              Enroll in Upcoming Batch →
            </Link>
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className="sp-section">
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>Why Train with JSTechnoHub for PMP®?</h2>
            <p>We bridge formal PMI® theory with practical workplace execution and AI tools.</p>
          </div>

          <div className="sp-grid">
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaBookOpen />
              </div>
              <h3>3 Domains ECO Coverage</h3>
              <p>Master People (42%), Process (50%), and Business Environment (8%) as specified by PMI®.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaRobot />
              </div>
              <h3>Gen AI Modules Included</h3>
              <p>Learn prompt engineering for automated WBS creation, risk registers, stakeholder reports, and charter drafts.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaCheckCircle />
              </div>
              <h3>100% Application Support</h3>
              <p>We review your experience draft to ensure compliance with PMI® standards and pass audit checks effortlessly.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaSyncAlt />
              </div>
              <h3>Retake Guarantee Support</h3>
              <p>Free refresher sessions and personalized error analysis until you clear your exam.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility & Target Audience */}
      <section className="sp-section" style={{ backgroundColor: "#ffffff" }}>
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>Who Should Attend & Eligibility Requirements</h2>
            <p>Clear criteria set by PMI® to qualify for the official PMP® exam.</p>
          </div>

          <div className="sp-audience-box">
            <ul className="sp-audience-list">
              <li><span>1</span> 4-Year Degree + 36 Months Project Experience</li>
              <li><span>2</span> High School Diploma + 60 Months Project Experience</li>
              <li><span>3</span> Project Managers & Program Leads</li>
              <li><span>4</span> Scrum Masters & Agile Coaches</li>
              <li><span>5</span> IT Leads, Software Managers & Consultants</li>
              <li><span>6</span> Operations & Quality Assurance Managers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <ServiceFAQAccordion title="PMP® Certification Frequently Asked Questions" faqs={pmpFaqs} />
    </div>
  );
}
