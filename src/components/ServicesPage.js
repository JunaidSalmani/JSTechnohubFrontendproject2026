import React, { useState } from "react";
import { Link } from "react-router-dom";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import "./ServicesPage.css";

// ── SVG ICONS ────────────────────────────────────────────────────────
const AwardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const DatabaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </svg>
);

const CloudIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
  </svg>
);

const TerminalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" y1="19" x2="20" y2="19" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const CheckIcon = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ── SERVICES CATALOG (AUTHENTIC PLATFORM SERVICES) ───────────────────
const SERVICES_CATALOG = [
  {
    id: "pmp",
    category: "Project & Agile",
    badge: "PMI® Authorized",
    icon: <AwardIcon />,
    title: "PMP® Certification Training & Exam Prep",
    desc: "Master Predictive, Agile, and Gen AI project management workflows to pass your PMP® exam on the 1st attempt. Includes official 35 Contact Hours Certificate.",
    link: "/pmp",
    outcomes: [
      "Official 35 Contact Hours Certificate (PMI® Mandatory)",
      "PMI® Examination Content Outline (ECO 2026) coverage",
      "1,500+ Situational Practice Questions Bank",
      "100% PMP® Application & Audit Clearance Support",
    ],
  },
  {
    id: "sap",
    category: "ERP & Enterprise",
    badge: "S/4HANA Enterprise",
    icon: <DatabaseIcon />,
    title: "SAP Training & Certification (FICO, MM, SD, S/4HANA)",
    desc: "Master SAP enterprise resource planning modules with dedicated 24/7 remote SAP GUI server access and real company master data configuration.",
    link: "/services/sap",
    outcomes: [
      "SAP FICO, MM, SD & S/4HANA implementation tracks",
      "Dedicated 24/7 live SAP GUI server access",
      "Procure-to-Pay (P2P) & Order-to-Cash (O2C) real scenarios",
      "Official SAP Certification exam preparation kit",
    ],
  },
  {
    id: "aws",
    category: "Cloud & DevOps",
    badge: "Cloud Computing",
    icon: <CloudIcon />,
    title: "AWS Certified Solutions Architect Training",
    desc: "Design scalable, resilient cloud architectures using Amazon Web Services with live hands-on AWS console labs, VPC subnets, and IAM security.",
    link: "/services/aws",
    outcomes: [
      "AWS Solutions Architect SAA-C03 exam blueprint",
      "Hands-on AWS Management Console practice labs",
      "VPC, EC2, IAM, S3, RDS & serverless Lambda architecture",
      "Production-grade cloud architecture portfolio",
    ],
  },
  {
    id: "devops",
    category: "Cloud & DevOps",
    badge: "CI/CD Automation",
    icon: <TerminalIcon />,
    title: "DevOps Engineering & CI/CD Pipeline Training",
    desc: "Master Linux, Docker containerization, Kubernetes cluster orchestration, Jenkins pipeline as code, and Terraform Infrastructure as Code.",
    link: "/services/devops",
    outcomes: [
      "Docker containerization & multi-stage image builds",
      "Kubernetes (CKA) cluster orchestration & deployment",
      "Automated Jenkins CI/CD pipelines as code",
      "Terraform Infrastructure as Code (IaC) automation",
    ],
  },
  {
    id: "certification-support",
    category: "Career & Audits",
    badge: "1-on-1 Mentorship",
    icon: <ShieldCheckIcon />,
    title: "1-on-1 Certification Support & Audit Clearance",
    desc: "Ensure 100% smooth eligibility verification, application draft writing, audit clearance, and exam voucher assistance across PMI, AWS, SAP, and Salesforce.",
    link: "/services/certification-support",
    outcomes: [
      "Experience domain drafting & project description mapping",
      "48-Hour vendor audit verification package support",
      "Manager sign-off documentation guidance",
      "Exam voucher booking & retake guarantee guidance",
    ],
  },
  {
    id: "resume-career",
    category: "Career & Audits",
    badge: "Career Growth",
    icon: <FileTextIcon />,
    title: "ATS Resume Writing & LinkedIn Profile Optimization",
    desc: "Transform your resume into an ATS-compliant job magnet. Land 3x more recruiter interview calls with high-volume industry keyword optimization.",
    link: "/services/resume-career",
    outcomes: [
      "100% ATS Parsing Guarantee (clean Word + PDF formats)",
      "Quantified achievements & executive ROI impact metrics",
      "LinkedIn Recruiter Search SEO keyword optimization",
      "Tailored cover letters for senior & leadership roles",
    ],
  },
];

const CATEGORIES = [
  "All Services",
  "Project & Agile",
  "ERP & Enterprise",
  "Cloud & DevOps",
  "Career & Audits",
];

const HUB_FAQS = [
  {
    q: "What services does JSTechnoHub specialize in?",
    a: "JSTechnoHub specializes in 6 core areas: (1) PMI® PMP® Certification Prep, (2) SAP ERP Modules (FICO, MM, SD, S/4HANA), (3) AWS Cloud Architecture, (4) DevOps CI/CD Automation, (5) 1-on-1 Certification Application & Audit Support, and (6) ATS Resume & LinkedIn Optimization.",
  },
  {
    q: "Are classes live virtual or self-paced recorded?",
    a: "We offer live interactive virtual weekend and weekday batches led by certified industry practitioners. All live sessions are recorded in HD and made available to learners for lifetime review.",
  },
  {
    q: "How do I choose the right service or course for my background?",
    a: "You can request a free 30-minute career counseling discovery call with our senior advisors. We evaluate your educational background, work experience, and career goals to recommend the optimal path.",
  },
  {
    q: "Do you offer corporate or enterprise team training?",
    a: "Yes! We design customized corporate upskilling programs for enterprise engineering, project management, and ERP teams, complete with custom schedules, dedicated lab servers, and progress reporting.",
  },
];

function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Services");

  const filteredServices = SERVICES_CATALOG.filter((s) => {
    if (selectedCategory === "All Services") return true;
    return s.category === selectedCategory;
  });

  return (
    <div className="sv-page-wrap">
      {/* ── 1. HERO SECTION ── */}
      <section className="sv-hero-section">
        <div className="app-container">
          <div className="sv-hero-content">
            <div className="sv-hero-badge">
              <span className="sv-badge-dot" />
              Accredited Certification &amp; Enterprise Services
            </div>

            <h1 className="sv-hero-title">
              Empowering Careers &amp; Enterprises <br />
              <span className="sv-text-gradient">with Industry-Leading Capabilities</span>
            </h1>

            <p className="sv-hero-desc">
              Official certification prep, hands-on enterprise cloud &amp; SAP GUI servers,
              100% application audit protection, and executive ATS career acceleration.
            </p>

            <div className="sv-hero-stats-row">
              <div className="sv-stat-chip">
                <strong>1,200+</strong>
                <span>Certified Professionals</span>
              </div>
              <div className="sv-stat-divider" />
              <div className="sv-stat-chip">
                <strong>98.4%</strong>
                <span>1st Attempt Pass Rate</span>
              </div>
              <div className="sv-stat-divider" />
              <div className="sv-stat-chip">
                <strong>100%</strong>
                <span>Audit Clearance Guarantee</span>
              </div>
              <div className="sv-stat-divider" />
              <div className="sv-stat-chip">
                <strong>24/7</strong>
                <span>Cloud &amp; SAP Server Access</span>
              </div>
            </div>

            <div className="sv-hero-actions">
              <button
                className="sv-btn-primary"
                onClick={() =>
                  document.getElementById("sv-catalog")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Service Catalog ↓
              </button>
              <Link to="/contact" className="sv-btn-secondary">
                Book 1-on-1 Discovery Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. SERVICES CATALOG GRID WITH FILTERS ── */}
      <section className="sv-section" id="sv-catalog">
        <div className="app-container">
          <div className="sv-section-head">
            <span className="sv-kicker">Core Catalog</span>
            <h2>Our Specialized Training &amp; Career Services</h2>
            <p>
              Select any program below to view detailed curriculum, batch schedules, server access, and enrollment details.
            </p>

            {/* Category Filter Pills */}
            <div className="sv-category-filters">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`sv-filter-pill ${selectedCategory === cat ? "sv-filter-pill--active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="sv-services-grid">
            {filteredServices.map((service) => (
              <div className="sv-service-card" key={service.id}>
                <div className="sv-card-head">
                  <div className="sv-card-icon-wrap">{service.icon}</div>
                  <span className="sv-card-badge">{service.badge}</span>
                </div>

                <h3 className="sv-card-title">{service.title}</h3>
                <p className="sv-card-desc">{service.desc}</p>

                <div className="sv-card-outcomes">
                  <h4>Key Program Outcomes:</h4>
                  <ul>
                    {service.outcomes.map((item, i) => (
                      <li key={i}>
                        <CheckIcon className="sv-check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="sv-card-footer">
                  <Link to={service.link} className="sv-btn-card-primary">
                    Explore Program &amp; Batches <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. 3-STEP SUCCESS METHODOLOGY ── */}
      <section className="sv-section sv-bg-alt">
        <div className="app-container">
          <div className="sv-section-head">
            <span className="sv-kicker">Proven Methodology</span>
            <h2>Our 3-Step Success Framework</h2>
            <p>A structured, end-to-end learning lifecycle designed to take you from discovery to global certification.</p>
          </div>

          <div className="sv-methodology-grid">
            <div className="sv-step-card">
              <div className="sv-step-num">01</div>
              <h3>1-on-1 Discovery Call</h3>
              <p>Free 30-minute academic consultation to map your work background and determine the highest-ROI certification path.</p>
            </div>

            <div className="sv-step-card">
              <div className="sv-step-num">02</div>
              <h3>Live Hands-On Training</h3>
              <p>Interactive virtual classes featuring dedicated 24/7 cloud servers, official vendor kits, and modern Gen AI automation tools.</p>
            </div>

            <div className="sv-step-card">
              <div className="sv-step-num">03</div>
              <h3>Certification &amp; Placement</h3>
              <p>100% audit clearance protection, voucher booking assistance, and professional ATS resume &amp; LinkedIn profile optimization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE JSTECHNOHUB ── */}
      <section className="sv-section">
        <div className="app-container">
          <div className="sv-section-head">
            <span className="sv-kicker">The JSTechnoHub Advantage</span>
            <h2>Built for Working Professionals &amp; Enterprises</h2>
            <p>We blend accredited curriculum, dedicated enterprise infrastructure, and personalized career mentorship.</p>
          </div>

          <div className="sv-pillars-grid">
            <div className="sv-pillar-card">
              <div className="sv-pillar-icon-wrap">
                <AwardIcon />
              </div>
              <h4>Official ECO 2026 Curriculum</h4>
              <p>Rigorous, continuously updated curriculum aligned with official PMI®, SAP®, and AWS® examination content outlines.</p>
            </div>

            <div className="sv-pillar-card">
              <div className="sv-pillar-icon-wrap">
                <ShieldCheckIcon />
              </div>
              <h4>100% Audit Clearance Guarantee</h4>
              <p>Our mentors personally draft and review your experience narratives to ensure rapid, stress-free audit clearance.</p>
            </div>

            <div className="sv-pillar-card">
              <div className="sv-pillar-icon-wrap">
                <DatabaseIcon />
              </div>
              <h4>24/7 Dedicated Remote Servers</h4>
              <p>Direct remote access to live SAP S/4HANA GUI and AWS cloud consoles for real-world production practice.</p>
            </div>

            <div className="sv-pillar-card">
              <div className="sv-pillar-icon-wrap">
                <FileTextIcon />
              </div>
              <h4>Executive Career Acceleration</h4>
              <p>Transform your professional narrative with ATS-parseable resumes and recruiter-optimized LinkedIn profiles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. CORPORATE & ENTERPRISE TRAINING BANNER ── */}
      <section className="sv-cta-section">
        <div className="app-container">
          <div className="sv-cta-card">
            <div className="sv-cta-copy">
              <h2>Need Custom Corporate Training for Your Team?</h2>
              <p>
                We train enterprise teams across Fortune 500 companies with tailored modules, dedicated practice environments,
                and custom batch timing.
              </p>
            </div>
            <div className="sv-cta-actions">
              <Link to="/contact" className="sv-btn-cta-primary">
                Request Corporate Quote →
              </Link>
              <span className="sv-cta-tag">
                <CheckIcon /> Group discounts &amp; custom enterprise syllabi available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. FREQUENTLY ASKED QUESTIONS ── */}
      <ServiceFAQAccordion
        title="Frequently Asked Questions"
        faqs={HUB_FAQS}
      />
    </div>
  );
}

export default ServicesPage;
