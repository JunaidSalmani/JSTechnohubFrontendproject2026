import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaLandmark,
  FaCloud,
  FaChartBar,
  FaLink,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
  FaCheckCircle,
} from 'react-icons/fa';
import './AboutUsPage.css';

function AboutUsPage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "name": "JSTechnoHub",
    "legalName": "JSTechnoHub Training & Career Consulting",
    "url": "https://www.jstechnohub.com",
    "logo": "https://www.jstechnohub.com/JSlogo.png",
    "description": "Global professional training institute and career accelerator specializing in PMP, SAP, AWS Cloud, DevOps, Certification Application Support, and ATS Resume Writing.",
    "telephone": "+91-9876543210",
    "email": "support@jstechnohub.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot No. 42, Techno Hub Towers, HITECH City",
      "addressLocality": "Hyderabad",
      "addressRegion": "Telangana",
      "postalCode": "500081",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 17.4483,
      "longitude": 78.3808
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.linkedin.com/company/jstechnohub/",
      "https://www.instagram.com/jstechno_hub",
      "https://www.pmi.org/",
      "https://aws.amazon.com/certification/",
      "https://www.sap.com/training-certification.html"
    ]
  };

  return (
    <div className="about-us-container">
      {/* Inject Organization & LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* Hero */}
      <header className="about-hero">
        <div className="hero-content">
          <span className="hp-pill-tag" style={{ background: "#ecfdf5", color: "#059669" }}>
            Global Career Acceleration Institute
          </span>
          <h1>About JSTechnoHub</h1>
          <p className="subtitle">
            Bridging international certification standards, practical enterprise labs, and career advancement for professionals across 20+ countries.
          </p>
        </div>
      </header>

      {/* Corporate Overview & Story */}
      <section className="about-section story-section">
        <div className="story-content">
          <h2>Our Story & Mission</h2>
          <p>
            Founded in 2018, <strong>JSTechnoHub</strong> was established to eliminate the gap between theoretical certification exams and real-world enterprise execution. Over the past 8+ years, we have empowered more than <strong>1,200+ certified candidates</strong> and <strong>50,000+ workshop attendees</strong> to master PMP®, SAP S/4HANA, AWS Cloud, DevOps pipelines, and ATS career strategies.
          </p>
          <p>
            We operate as a premier global training institute and career accelerator. Our instructors hold active industry credentials (PMP®, AWS Certified Solutions Architect Professional, SAP S/4HANA Certified Lead) and possess over 12+ years of corporate leadership experience at top Fortune 500 enterprises.
          </p>
        </div>
      </section>

      {/* Corporate Badges & External Credentials */}
      <section className="about-section" style={{ backgroundColor: "#f8fafc", padding: "48px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <h2>Authorized Partner & External Authority References</h2>
          <p style={{ color: "#475569", marginBottom: "32px" }}>
            JSTechnoHub strictly adheres to official vendor examination blueprints and curriculum standards.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "14px", border: "1.5px solid #e2e8f0" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "8px", color: "#059669" }}>
                <FaLandmark />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>PMI® Authorized Alignment</h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b" }}>35 Contact Hours Certificate compliant with PMI® ECO 2026 standards.</p>
              <a href="https://www.pmi.org/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#059669", fontWeight: "700" }}>Verify PMI.org Reference →</a>
            </div>

            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "14px", border: "1.5px solid #e2e8f0" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "8px", color: "#2563eb" }}>
                <FaCloud />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>AWS Partner Network</h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b" }}>Live AWS Management Console Sandbox & SAA-C03 exam alignment.</p>
              <a href="https://aws.amazon.com/certification/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#059669", fontWeight: "700" }}>Verify AWS Certification →</a>
            </div>

            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "14px", border: "1.5px solid #e2e8f0" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "8px", color: "#059669" }}>
                <FaChartBar />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>SAP Global Ecosystem</h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b" }}>SAP S/4HANA GUI server access for FICO, MM, and SD modules.</p>
              <a href="https://www.sap.com/training-certification.html" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#059669", fontWeight: "700" }}>Verify SAP Training →</a>
            </div>

            <div style={{ background: "#ffffff", padding: "24px", borderRadius: "14px", border: "1.5px solid #e2e8f0" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: "8px", color: "#2563eb" }}>
                <FaLink />
              </div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>Verified Business Profile</h3>
              <p style={{ fontSize: "0.88rem", color: "#64748b" }}>Official LinkedIn Organization Page and verified student reviews.</p>
              <a href="https://www.linkedin.com/company/jstechnohub/" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.85rem", color: "#059669", fontWeight: "700" }}>Visit LinkedIn Profile →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Breakdown */}
      <section className="about-section philosophy-section">
        <h2>Core Services Offered by JSTechnoHub</h2>
        <div className="philosophy-cards">
          <div className="philosophy-card">
            <h3>1. PMP® Certification Prep</h3>
            <p>35 Contact Hours Certificate, PMI® ECO 2026 curriculum, Gen AI prompting for PMs, and 100% application support.</p>
          </div>
          <div className="philosophy-card">
            <h3>2. SAP ERP Training</h3>
            <p>Dedicated 24/7 SAP S/4HANA GUI server access for SAP FICO, MM, SD, and migration strategies.</p>
          </div>
          <div className="philosophy-card">
            <h3>3. AWS Cloud Engineering</h3>
            <p>Solutions Architect Associate hands-on console labs covering VPC, IAM, S3, EC2, RDS, and serverless Lambda.</p>
          </div>
          <div className="philosophy-card">
            <h3>4. DevOps Automation</h3>
            <p>End-to-end continuous integration pipelines: Linux, Docker, Kubernetes, Jenkins, Terraform, and Prometheus.</p>
          </div>
          <div className="philosophy-card">
            <h3>5. 1-on-1 Certification Support</h3>
            <p>PMI / AWS / SAP audit package clearance, application drafting, experience mapping, and voucher assistance.</p>
          </div>
          <div className="philosophy-card">
            <h3>6. ATS Resume & LinkedIn Services</h3>
            <p>100% ATS-compliant resume writing, cover letters, and recruiter-optimized LinkedIn SEO transformations.</p>
          </div>
        </div>
      </section>

      {/* Business & Location Info */}
      <section className="about-section" style={{ backgroundColor: "#ffffff", padding: "48px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", marginBottom: "32px" }}>Company Headquarters & Contact Details</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
            <div style={{ border: "1.5px solid #e2e8f0", padding: "28px", borderRadius: "16px", background: "#f8fafc" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <FaMapMarkerAlt style={{ color: "#059669" }} /> Global Headquarters
              </h3>
              <p style={{ margin: "4px 0", color: "#334155" }}><strong>JSTechnoHub Training & Career Consulting</strong></p>
              <p style={{ margin: "4px 0", color: "#475569" }}>Plot No. 42, Techno Hub Towers, HITECH City</p>
              <p style={{ margin: "4px 0", color: "#475569" }}>Hyderabad, Telangana 500081, India</p>
              <p style={{ margin: "12px 0 4px", color: "#059669", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                <FaPhoneAlt /> Phone: +91 98765 43210 / +91 87430 39914
              </p>
              <p style={{ margin: "4px 0", color: "#059669", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                <FaEnvelope /> Email: support@jstechnohub.com
              </p>
            </div>

            <div style={{ border: "1.5px solid #e2e8f0", padding: "28px", borderRadius: "16px", background: "#f8fafc" }}>
              <h3 style={{ fontSize: "1.2rem", color: "#0f172a", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <FaBuilding style={{ color: "#2563eb" }} /> Regional Offices
              </h3>
              <p style={{ margin: "8px 0 4px", color: "#334155" }}><strong>Nagpur Regional Office:</strong></p>
              <p style={{ margin: "2px 0", color: "#475569" }}>West High Court Road, Dharampeth, Nagpur, MS 440010</p>
              <p style={{ margin: "12px 0 4px", color: "#334155" }}><strong>Bangalore Regional Center:</strong></p>
              <p style={{ margin: "2px 0", color: "#475569" }}>MG Road, Bengaluru, Karnataka 560001</p>
              <p style={{ margin: "12px 0 4px", color: "#64748b", fontSize: "0.9rem" }}><strong>Hours:</strong> Mon - Sat: 9:00 AM - 8:00 PM IST</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta">
        <h2>Ready to Transform Your Professional Career?</h2>
        <p>Explore our dedicated service pages or book a free discovery call with our certified lead advisors.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap", marginTop: "20px" }}>
          <Link to="/services" className="cta-button">Explore All Services</Link>
          <Link to="/contact" className="cta-button" style={{ background: "#ffffff", color: "#0f172a" }}>Book Discovery Call</Link>
        </div>
      </section>
    </div>
  );
}

export default AboutUsPage;