import React from 'react';
import { Link } from 'react-router-dom';
import ServiceFAQAccordion from './ServiceFAQAccordion';
import './ServicesPage.css';

const SERVICES_CATALOG = [
  {
    id: "pmp",
    badge: "PMI® Authorized",
    title: "PMP® Certification Training & Exam Prep",
    desc: "Master Predictive, Agile, and Gen AI project management workflows to pass your PMP® exam on the 1st attempt. Includes official 35 Contact Hours Certificate.",
    link: "/services/pmp",
    outcomes: [
      "Official 35 Contact Hours Certificate",
      "PMI® Examination Content Outline (ECO) coverage",
      "1,500+ Situational Practice Questions",
      "100% PMP® Application & Audit Clearance Support"
    ]
  },
  {
    id: "sap",
    badge: "S/4HANA Enterprise",
    title: "SAP Training & Certification (FICO, MM, SD, S/4HANA)",
    desc: "Master SAP enterprise resource planning modules with dedicated 24/7 remote SAP GUI server access and real company master data configuration.",
    link: "/services/sap",
    outcomes: [
      "SAP FICO, MM, SD & S/4HANA tracks",
      "Dedicated 24/7 SAP GUI server access",
      "Procure-to-Pay (P2P) & Order-to-Cash (O2C) flows",
      "Official SAP Certification exam prep"
    ]
  },
  {
    id: "aws",
    badge: "Cloud Computing",
    title: "AWS Certified Solutions Architect Training",
    desc: "Design scalable, resilient cloud architectures using Amazon Web Services with live hands-on AWS console labs, VPC subnets, and IAM security.",
    link: "/services/aws",
    outcomes: [
      "AWS Solutions Architect SAA-C03 Blueprint",
      "Real AWS Management Console practice labs",
      "VPC, EC2, IAM, S3, RDS, & Lambda serverless",
      "Cloud architecture project portfolio"
    ]
  },
  {
    id: "devops",
    badge: "CI/CD Automation",
    title: "DevOps Engineering & CI/CD Pipeline Training",
    desc: "Master Linux, Docker containerization, Kubernetes cluster orchestration, Jenkins pipeline as code, and Terraform Infrastructure as Code.",
    link: "/services/devops",
    outcomes: [
      "Docker containerization & multi-stage builds",
      "Kubernetes (CKA) cluster management",
      "Automated Jenkins CI/CD pipelines",
      "Terraform Infrastructure as Code (IaC)"
    ]
  },
  {
    id: "certification-support",
    badge: "1-on-1 Guidance",
    title: "1-on-1 Certification Support & Audit Clearance",
    desc: "Ensure 100% smooth eligibility verification, application draft writing, audit clearance, and exam voucher assistance across PMI, AWS, SAP, and Salesforce.",
    link: "/services/certification-support",
    outcomes: [
      "Experience domain drafting & mapping",
      "48-Hour vendor audit package clearance",
      "Manager sign-off documentation assistance",
      "Exam scheduling & retake coaching"
    ]
  },
  {
    id: "resume-career",
    badge: "Career Growth",
    title: "ATS Resume Writing & LinkedIn Profile Optimization",
    desc: "Transform your resume into an ATS-compliant job magnet. Land 3x more recruiter interview calls with high-volume industry keyword optimization.",
    link: "/services/resume-career",
    outcomes: [
      "100% ATS Parsing Guarantee (Word + PDF)",
      "Quantified achievements & ROI metrics",
      "LinkedIn Recruiter Search SEO optimization",
      "Targeted cover letters for executive roles"
    ]
  }
];

const HUB_FAQS = [
  {
    q: "What services does JSTechnoHub specialize in?",
    a: "JSTechnoHub specializes in 6 core areas: (1) PMI® PMP® Certification Prep, (2) SAP ERP Modules (FICO, MM, SD, S/4HANA), (3) AWS Cloud Architecture, (4) DevOps CI/CD Automation, (5) 1-on-1 Certification Application & Audit Support, and (6) ATS Resume & LinkedIn Optimization."
  },
  {
    q: "Are classes live virtual or self-paced recorded?",
    a: "We offer live interactive virtual weekend and weekday batches led by certified industry practitioners. All live sessions are recorded and made available to learners for lifetime review."
  },
  {
    q: "How do I choose the right service or course for my background?",
    a: "You can request a free 30-minute career counseling discovery call with our senior advisors. We evaluate your educational background, work experience, and career goals to recommend the optimal path."
  }
];

function ServicesPage() {
  return (
    <div className="services-page-container">
      {/* Hero */}
      <header className="services-hero">
        <div className="hero-content">
          <span className="hp-pill-tag" style={{ background: "#ecfdf5", color: "#059669" }}>
            Comprehensive Training Catalog
          </span>
          <h1>Services & Certification Programs Designed for Your Success</h1>
          <p className="subtitle">
            Empowering professionals worldwide with official certification prep, hands-on enterprise labs, 1-on-1 application support, and ATS resume services.
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <section className="services-section">
        <div className="section-title">
          <h2>Our Specialized Training & Career Services</h2>
          <p style={{ textAlign: "center", color: "#475569", marginTop: "8px" }}>
            Click on any service below to view detailed curriculum, eligibility requirements, and FAQs.
          </p>
        </div>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "28px", marginTop: "32px" }}>
          {SERVICES_CATALOG.map((service) => (
            <div className="service-card" key={service.id} style={{ display: "flex", flexDirection: "column", background: "#ffffff", border: "1.5px solid #e2e8f0", borderRadius: "16px", padding: "28px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                <span style={{ background: "#ecfdf5", color: "#059669", fontWeight: "700", fontSize: "0.8rem", padding: "4px 10px", borderRadius: "6px" }}>
                  {service.badge}
                </span>
              </div>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>{service.title}</h3>
              <p className="service-description" style={{ fontSize: "0.95rem", color: "#475569", marginBottom: "16px", flexGrow: 1 }}>{service.desc}</p>
              <h4 style={{ fontSize: "0.9rem", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>Key Outcomes:</h4>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0" }}>
                {service.outcomes.map((item, i) => (
                  <li key={i} style={{ fontSize: "0.88rem", color: "#334155", padding: "4px 0", display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ color: "#059669", fontWeight: "800" }}>✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link to={service.link} className="service-button" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#059669", color: "#ffffff", fontWeight: "700", padding: "12px", borderRadius: "8px", textDecoration: "none", marginTop: "auto" }}>
                View Dedicated Page & FAQs →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 3 Step Process */}
      <section className="how-it-works-section">
        <div className="section-title">
          <h2>Our Simple 3-Step Success Methodology</h2>
        </div>
        <div className="process-steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>1-on-1 Discovery Call</h3>
            <p>Free 30-minute assessment to map your experience and select the right certification track.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Live Hands-On Training</h3>
            <p>Interactive virtual classes with live instructor labs, official study kits, and AI tools.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Certification & Placement</h3>
            <p>100% audit clearance support, exam voucher assistance, and ATS resume transformation.</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <ServiceFAQAccordion title="General Services Frequently Asked Questions" faqs={HUB_FAQS} />
    </div>
  );
}

export default ServicesPage;