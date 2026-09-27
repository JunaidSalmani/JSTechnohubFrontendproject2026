import React from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaClock,
  FaStar,
  FaBullseye,
  FaFileAlt,
  FaLink,
  FaEnvelope,
} from "react-icons/fa";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import "./ServicePageCommon.css";

export default function ResumeCareerPage() {
  const resumeFaqs = [
    {
      q: "What is an ATS-compliant resume and why do I need one?",
      a: "An Applicant Tracking System (ATS) is automated software used by 99% of Fortune 500 companies to parse and score resumes before human recruiters ever see them. An ATS-compliant resume uses clean formatting, standard section headings, and targeted industry keywords to ensure your resume passes screening filters.",
    },
    {
      q: "What is included in the LinkedIn Profile Optimization service?",
      a: "Our certified career strategists rewrite your LinkedIn headline, summary, work experience bullets, and skills section with high-volume recruiter search keywords. We also optimize your profile settings for 'Open to Work' visibility.",
    },
    {
      q: "Who is Resume & Career Services suitable for?",
      a: "This service is suitable for professionals seeking salary raises, career switchers, project managers, cloud engineers, executives, and candidates applying for remote or international job positions in US, UK, Gulf (UAE), Canada, and India.",
    },
    {
      q: "What is the delivery turnaround time?",
      a: "Your initial draft is delivered within 3-4 business days. We provide up to 3 rounds of free revisions within 14 days to make sure you are 100% satisfied with the outcome.",
    },
    {
      q: "What file formats will I receive?",
      a: "You will receive fully editable Microsoft Word (.docx) files as well as polished PDF versions optimized for direct recruiter emailing and portal uploads.",
    },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "ATS Resume Writing & LinkedIn Profile Optimization",
    "description": "Professional ATS resume writing, job-targeted cover letters, and recruiter-optimized LinkedIn profile transformations.",
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
              <FaBriefcase style={{ color: "#059669" }} /> 100% ATS Compatibility & Recruiter Keyword Optimization
            </span>
            <h1 className="sp-hero-title">ATS Resume Writing & LinkedIn Optimization</h1>
            <p className="sp-hero-desc">
              Transform your resume into a high-converting job search asset. Land 3x more recruiter interview calls with industry-specific keywords, quantified achievements, and LinkedIn SEO optimization.
            </p>
            <div className="sp-hero-meta">
              <div className="sp-meta-item">
                <FaClock style={{ color: "#059669" }} /> <span>3-4 Days Turnaround</span>
              </div>
              <div className="sp-meta-item">
                <FaStar style={{ color: "#f59e0b" }} /> <span>4.9 / 5 Rating</span>
              </div>
              <div className="sp-meta-item">
                <FaBullseye style={{ color: "#059669" }} /> <span>3x Interview Callback Rate</span>
              </div>
            </div>
          </div>

          <div className="sp-hero-card">
            <h3>Complete Career Pack</h3>
            <div className="sp-card-price">
              <s>₹7,999</s> ₹3,499
            </div>
            <ul className="sp-card-features">
              <li>ATS-Optimized Resume (Word + PDF)</li>
              <li>Targeted Cover Letter Template</li>
              <li>LinkedIn Recruiter Profile Audit & Rewrite</li>
              <li>3 Rounds of Free Revisions</li>
              <li>1-on-1 Recruiter Strategy Session</li>
            </ul>
            <Link to="/resume" className="sp-btn-primary">
              Order Resume Package →
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="sp-section">
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>Career Transformation Features</h2>
            <p>Crafted by senior HR leaders and certified career strategists.</p>
          </div>

          <div className="sp-grid">
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaFileAlt />
              </div>
              <h3>ATS Parsing Optimization</h3>
              <p>Eliminate complex graphics and tables that cause ATS failures. Standardized layout guaranteed to pass Taleo, Workday, and Greenhouse scanners.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaBullseye />
              </div>
              <h3>Quantified Accomplishments</h3>
              <p>We convert passive job duties into impactful action verbs with measurable metrics (e.g. ROI%, cost savings, team size, budget managed).</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaLink />
              </div>
              <h3>LinkedIn Recruiter SEO</h3>
              <p>Keyword-rich headline, compelling 'About' narrative, and skill endorsements that rank your profile high in recruiter search results.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaEnvelope />
              </div>
              <h3>Custom Cover Letters</h3>
              <p>Compelling cover letters tailored for targeted job roles that capture hiring manager attention within 6 seconds.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="sp-section" style={{ backgroundColor: "#ffffff" }}>
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>Who Needs ATS Resume & Career Services?</h2>
            <p>Proven results across mid-career and senior executive roles.</p>
          </div>

          <div className="sp-audience-box">
            <ul className="sp-audience-list">
              <li><span>1</span> PMP® / Certified Project Managers seeking promotion</li>
              <li><span>2</span> Cloud & DevOps Engineers targeting international offers</li>
              <li><span>3</span> SAP Consultants & ERP Specialists</li>
              <li><span>4</span> Mid-Level & Senior Tech Leads</li>
              <li><span>5</span> Professionals transitioning into new industries</li>
              <li><span>6</span> Freshers & Returning Career Professionals</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <ServiceFAQAccordion title="Resume & Career Services Frequently Asked Questions" faqs={resumeFaqs} />
    </div>
  );
}
