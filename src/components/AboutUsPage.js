import React from "react";
import { Link } from "react-router-dom";
import {
  FaLandmark,
  FaCloud,
  FaChartBar,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
  FaAward,
  FaShieldAlt,
  FaArrowRight,
  FaExternalLinkAlt,
  FaClock,
  FaUsers,
  FaGlobeAmericas,
} from "react-icons/fa";
import "./AboutUsPage.css";

export default function AboutUsPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "name": "JSTechnoHub",
    "legalName": "JSTechnoHub Training & Career Consulting",
    "url": "https://www.jstechnohub.com",
    "logo": "https://www.jstechnohub.com/JSlogo.png",
    "description":
      "Global professional training institute and career accelerator specializing in PMP, SAP S/4HANA, AWS Cloud, DevOps, Certification Application Support, and ATS Resume Writing.",
    "telephone": "+91 87430 39914",
    "email": "support@jstechnohub.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "West High Court Road, Dharampeth",
      "addressLocality": "Nagpur",
      "addressRegion": "Maharashtra",
      "postalCode": "440010",
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 21.1458,
      "longitude": 79.0882,
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      "opens": "09:00",
      "closes": "20:00",
    },
    "sameAs": [
      "https://www.linkedin.com/company/jstechnohub/",
      "https://www.instagram.com/jstechno_hub",
      "https://www.pmi.org/",
      "https://aws.amazon.com/certification/",
      "https://www.sap.com/training-certification.html",
    ],
  };

  return (
    <div className="about-page">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* ── Executive Hero ── */}
      <header className="ab-hero">
        <div className="ab-container">
          <div className="ab-breadcrumb">
            <Link to="/">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">About JSTechnoHub</span>
          </div>

          <div className="ab-badge">
            <FaAward className="ab-badge-icon" />
            <span>GLOBAL CAREER ACCELERATION & CREDENTIAL MASTERY</span>
          </div>

          <h1 className="ab-hero-title">
            Empowering Careers Through <span className="title-red">Precision Training</span> &amp; Industry Excellence
          </h1>

          <p className="ab-hero-subtitle">
            Founded in 2018, JSTechnoHub bridges the divide between theoretical exam blueprints
            and real-world enterprise infrastructure. We equip working professionals across 20+
            countries with practitioner-led training, 100% audit-cleared certification support,
            and executive career velocity.
          </p>

          {/* 4 Core Quantitative Benchmarks */}
          <div className="ab-metrics-grid">
            <div className="ab-metric-card">
              <span className="metric-num">8+ Years</span>
              <span className="metric-label">Proven Track Record (Est. 2018)</span>
            </div>
            <div className="ab-metric-card">
              <span className="metric-num">1,200+</span>
              <span className="metric-label">Certified Alumni Worldwide</span>
            </div>
            <div className="ab-metric-card">
              <span className="metric-num">50,000+</span>
              <span className="metric-label">Workshop &amp; Webinar Participants</span>
            </div>
            <div className="ab-metric-card">
              <span className="metric-num">100%</span>
              <span className="metric-label">Guaranteed Audit Clearance</span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Corporate Story & Guiding Principles ── */}
      <section className="ab-story-section">
        <div className="ab-container ab-story-grid">
          <div className="story-left">
            <span className="sec-tag">OUR MISSION &amp; ORIGIN</span>
            <h2>Bridging Certification Rigor and Enterprise Reality</h2>
            <p className="lead-p">
              Too many technical training programs focus solely on memorizing question banks to pass
              exams, leaving candidates underprepared when tasked with managing complex multi-million
              dollar projects, configuring production cloud clusters, or defending architectural choices.
            </p>
            <p>
              <strong>JSTechnoHub</strong> was founded to dismantle that compromise. We believe
              every candidate deserves to possess both the globally accredited credential on their
              resume and the practical technical confidence to deliver on day one.
            </p>
            <p>
              Our mentors hold active leadership roles at top Fortune 500 multinational companies
              and average 12+ years of hands-on delivery experience across PMI®, SAP, AWS, and
              enterprise DevOps ecosystems. We don&apos;t just teach the syllabus; we teach the trade.
            </p>

            <div className="story-stats-inline">
              <div className="stat-pill">
                <FaGlobeAmericas className="pill-icon" />
                <span>Alumni in 20+ Countries</span>
              </div>
              <div className="stat-pill">
                <FaUsers className="pill-icon" />
                <span>1-on-1 Practitioner Mentoring</span>
              </div>
            </div>
          </div>

          <div className="story-right">
            <div className="principles-card">
              <h3>Our Guiding Principles</h3>
              <ul className="principles-list">
                <li>
                  <div className="principle-num">01</div>
                  <div>
                    <strong>Practitioner-Led Instruction</strong>
                    <p>Every instructor is an active corporate lead who implements these frameworks daily in live enterprise environments.</p>
                  </div>
                </li>
                <li>
                  <div className="principle-num">02</div>
                  <div>
                    <strong>Uncompromising Audit Integrity</strong>
                    <p>We guide candidates through transparent, honest experience mapping that stands up to strict PMI and vendor audit vetting.</p>
                  </div>
                </li>
                <li>
                  <div className="principle-num">03</div>
                  <div>
                    <strong>Real Enterprise Sandboxes</strong>
                    <p>No simulated toys. Students work inside live AWS consoles, genuine SAP S/4HANA GUI servers, and real CI/CD pipelines.</p>
                  </div>
                </li>
                <li>
                  <div className="principle-num">04</div>
                  <div>
                    <strong>Lifetime Alumni Support</strong>
                    <p>Our commitment doesn&apos;t end at exam completion. We offer interview prep, career transitions, and ongoing advisory.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Official Authority & External References ── */}
      <section className="ab-authority-section">
        <div className="ab-container">
          <div className="ab-section-header">
            <span className="sec-tag">EXTERNAL AUTHORITY &amp; ALIGNMENT</span>
            <h2>Official Vendor Blueprints &amp; Partner Verification</h2>
            <p>
              JSTechnoHub adheres strictly to official examination blueprints, accredited curriculum
              standards, and verified global industry bodies.
            </p>
          </div>

          <div className="authority-grid">
            <div className="authority-card">
              <div className="authority-icon-box tone-gold">
                <FaLandmark />
              </div>
              <h3>PMI® Authorized Alignment</h3>
              <p>
                Authorized 35 Contact Hours Certificate compliant with the latest PMI® Examination
                Content Outline (ECO) standards for PMP® and CAPM®.
              </p>
              <a
                href="https://www.pmi.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="authority-link"
              >
                <span>Verify PMI.org Standards</span>
                <FaExternalLinkAlt className="ext-icon" />
              </a>
            </div>

            <div className="authority-card">
              <div className="authority-icon-box tone-navy">
                <FaCloud />
              </div>
              <h3>AWS Partner &amp; Cloud Sandbox</h3>
              <p>
                Live AWS Management Console sandboxes aligned to Solutions Architect Associate
                (SAA-C03) and SysOps Administrator blueprints.
              </p>
              <a
                href="https://aws.amazon.com/certification/"
                target="_blank"
                rel="noopener noreferrer"
                className="authority-link"
              >
                <span>Verify AWS Credentials</span>
                <FaExternalLinkAlt className="ext-icon" />
              </a>
            </div>

            <div className="authority-card">
              <div className="authority-icon-box tone-red">
                <FaChartBar />
              </div>
              <h3>SAP Global Ecosystem</h3>
              <p>
                24/7 dedicated remote SAP S/4HANA GUI server access for financial accounting
                (FICO), materials management (MM), and sales distribution (SD).
              </p>
              <a
                href="https://www.sap.com/training-certification.html"
                target="_blank"
                rel="noopener noreferrer"
                className="authority-link"
              >
                <span>Verify SAP Guidelines</span>
                <FaExternalLinkAlt className="ext-icon" />
              </a>
            </div>

            <div className="authority-card">
              <div className="authority-icon-box tone-navy">
                <FaLinkedin />
              </div>
              <h3>Verified Corporate Profile</h3>
              <p>
                Official registered LinkedIn organization profile featuring verified student
                recommendations, alumni milestones, and corporate updates.
              </p>
              <a
                href="https://www.linkedin.com/company/jstechnohub/"
                target="_blank"
                rel="noopener noreferrer"
                className="authority-link"
              >
                <span>Visit LinkedIn Profile</span>
                <FaExternalLinkAlt className="ext-icon" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Service Offerings ── */}
      <section className="ab-services-section">
        <div className="ab-container">
          <div className="ab-section-header">
            <span className="sec-tag">COMPREHENSIVE CAPABILITIES</span>
            <h2>Core Professional Programs by JSTechnoHub</h2>
            <p>
              Each program is structured around practical competence, official certification
              clearance, and measurable career advancement.
            </p>
          </div>

          <div className="ab-programs-grid">
            <div className="program-card">
              <div className="prog-num">01</div>
              <h3>PMP® Certification Prep</h3>
              <p>
                Authorized 35 Contact Hours Certificate, PMI® ECO curriculum, Generative AI
                workflows for Project Managers, and 100% application audit support.
              </p>
              <Link to="/pmp" className="prog-link">
                View PMP Batches <FaArrowRight />
              </Link>
            </div>

            <div className="program-card">
              <div className="prog-num">02</div>
              <h3>SAP S/4HANA ERP Training</h3>
              <p>
                Hands-on configuration inside live SAP S/4HANA GUI servers for FICO, MM, and SD
                modules, complete with end-to-end integration workflows.
              </p>
              <Link to="/courses" className="prog-link">
                Explore SAP Courses <FaArrowRight />
              </Link>
            </div>

            <div className="program-card">
              <div className="prog-num">03</div>
              <h3>AWS Cloud Engineering</h3>
              <p>
                Solutions Architect Associate (SAA-C03) practical console labs covering VPCs, IAM,
                S3 storage classes, EC2 autoscaling, RDS databases, and serverless Lambda.
              </p>
              <Link to="/courses" className="prog-link">
                Explore AWS Program <FaArrowRight />
              </Link>
            </div>

            <div className="program-card">
              <div className="prog-num">04</div>
              <h3>DevOps &amp; Cloud Automation</h3>
              <p>
                Continuous integration and continuous deployment pipelines utilizing Linux, Docker,
                Kubernetes clusters, Jenkins CI/CD, Terraform IaC, and Prometheus.
              </p>
              <Link to="/courses" className="prog-link">
                Explore DevOps Track <FaArrowRight />
              </Link>
            </div>

            <div className="program-card">
              <div className="prog-num">05</div>
              <h3>1-on-1 Certification &amp; Audit Support</h3>
              <p>
                End-to-end guidance for PMI, AWS, SAP, and Salesforce candidates. We draft
                defensible experience descriptions and assemble audit-clearing packages.
              </p>
              <Link to="/services" className="prog-link">
                Explore Audit Support <FaArrowRight />
              </Link>
            </div>

            <div className="program-card">
              <div className="prog-num">06</div>
              <h3>Executive ATS Resume &amp; LinkedIn</h3>
              <p>
                100% ATS-compliant executive resume writing, persuasive cover letters, and
                recruiter-optimized LinkedIn SEO transformations that generate interview calls.
              </p>
              <Link to="/resume" className="prog-link">
                Explore Resume Services <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Corporate Hubs & Contact Information ── */}
      <section className="ab-offices-section">
        <div className="ab-container">
          <div className="ab-section-header">
            <span className="sec-tag">CORPORATE PRESENCE</span>
            <h2>Registered Offices &amp; Global Support Hubs</h2>
            <p>
              Headquartered in Maharashtra with strategic consulting presences in Bengaluru,
              servicing candidates globally across multiple timezones.
            </p>
          </div>

          <div className="offices-grid">
            <div className="office-card">
              <div className="office-head">
                <div className="office-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span className="office-tag">PRIMARY CORPORATE HUB</span>
                  <h3>Nagpur Corporate Headquarters</h3>
                </div>
              </div>

              <div className="office-body">
                <p className="office-company">JSTechnoHub Training &amp; Career Consulting</p>
                <p className="office-addr">West High Court Road, Dharampeth</p>
                <p className="office-addr">Nagpur, Maharashtra 440010, India</p>

                <div className="office-contact-rows">
                  <div className="contact-row">
                    <FaPhoneAlt className="c-icon" />
                    <span>Phone: +91 87430 39914</span>
                  </div>
                  <div className="contact-row">
                    <FaEnvelope className="c-icon" />
                    <span>Email: support@jstechnohub.com</span>
                  </div>
                  <div className="contact-row">
                    <FaClock className="c-icon" />
                    <span>Operating Hours: Mon - Sat: 9:00 AM - 8:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="office-card">
              <div className="office-head">
                <div className="office-icon">
                  <FaBuilding />
                </div>
                <div>
                  <span className="office-tag">STRATEGIC DELIVERY HUB</span>
                  <h3>Bengaluru Delivery &amp; Consulting</h3>
                </div>
              </div>

              <div className="office-body">
                <p className="office-company">JSTechnoHub Training &amp; Career Consulting</p>
                <p className="office-addr">MG Road, Bengaluru</p>
                <p className="office-addr">Karnataka 560001, India</p>

                <div className="office-contact-rows">
                  <div className="contact-row">
                    <FaPhoneAlt className="c-icon" />
                    <span>Phone: +91 87430 39914</span>
                  </div>
                  <div className="contact-row">
                    <FaEnvelope className="c-icon" />
                    <span>Email: support@jstechnohub.com</span>
                  </div>
                  <div className="contact-row">
                    <FaClock className="c-icon" />
                    <span>Operating Hours: Mon - Sat: 9:00 AM - 8:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Executive Discovery Call Banner ── */}
      <section className="ab-cta-section">
        <div className="ab-container">
          <div className="ab-cta-card">
            <div className="cta-left">
              <span className="cta-tag">
                <FaShieldAlt /> 100% CONFIDENTIAL CAREER CONSULTATION
              </span>
              <h2>Ready to Accelerate Your Professional Trajectory?</h2>
              <p>
                Connect directly with a Senior Technical Advisor to evaluate your eligibility,
                target certification timeline, and enterprise career goals.
              </p>
            </div>
            <div className="cta-right">
              <Link to="/contact" className="btn-cta-primary">
                Book Discovery Call <FaArrowRight />
              </Link>
              <Link to="/services" className="btn-cta-secondary">
                Explore All Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
