import React from "react";
import { Link } from "react-router-dom";
import {
  FaCloud,
  FaClock,
  FaStar,
  FaTools,
  FaLock,
  FaBolt,
  FaRocket,
  FaDollarSign,
} from "react-icons/fa";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import "./ServicePageCommon.css";

export default function AwsTrainingPage() {
  const awsFaqs = [
    {
      q: "What is AWS Solutions Architect certification?",
      a: "The AWS Certified Solutions Architect – Associate validates technical expertise in designing scalable, high-performing, cost-efficient, and secure cloud infrastructures using Amazon Web Services (AWS).",
    },
    {
      q: "What are the eligibility requirements for AWS training?",
      a: "There are no mandatory prerequisites. Basic understanding of computer networks, operating systems, and internet fundamentals is helpful. Prior cloud experience is not required.",
    },
    {
      q: "Who is AWS cloud training suitable for?",
      a: "AWS training is suitable for System Administrators, Network Engineers, Software Developers, DevOps aspirants, Fresh Graduates, and IT Professionals seeking to transition into cloud architect and cloud engineering roles.",
    },
    {
      q: "Do I need coding/programming skills for AWS?",
      a: "For Solutions Architect Associate, extensive programming is not required. You will learn cloud architecture, networking (VPC), identity management (IAM), storage (S3), databases (RDS/DynamoDB), and infrastructure automation.",
    },
    {
      q: "How do hands-on AWS console labs work?",
      a: "Every session includes live instructor-led practice in real AWS Free Tier / Sandbox accounts where you configure VPC subnets, launch EC2 instances, setup auto-scaling groups, and configure IAM policies.",
    },
  ];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "AWS Certified Solutions Architect & Cloud Engineering Training",
    "description": "Comprehensive AWS Cloud Architect course featuring live AWS management console labs, VPC setup, IAM security, S3 storage, and architectural design patterns.",
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
              <FaCloud style={{ color: "#059669" }} /> AWS Authorized Curriculum & Live Console Labs
            </span>
            <h1 className="sp-hero-title">AWS Certified Solutions Architect Training</h1>
            <p className="sp-hero-desc">
              Design resilient, high-performing, secure, and cost-optimized cloud architectures. Master AWS VPC, EC2, IAM, S3, RDS, CloudFront, Lambda, and Well-Architected Framework design patterns.
            </p>
            <div className="sp-hero-meta">
              <div className="sp-meta-item">
                <FaClock style={{ color: "#059669" }} /> <span>6 Weeks (40 Hrs)</span>
              </div>
              <div className="sp-meta-item">
                <FaStar style={{ color: "#f59e0b" }} /> <span>4.9 / 5 Rating</span>
              </div>
              <div className="sp-meta-item">
                <FaTools style={{ color: "#059669" }} /> <span>100% Hands-On Labs</span>
              </div>
            </div>
          </div>

          <div className="sp-hero-card">
            <h3>AWS Cloud Engineer Track</h3>
            <div className="sp-card-price">
              <s>₹16,999</s> ₹8,499
            </div>
            <ul className="sp-card-features">
              <li>Real AWS Management Console Practice</li>
              <li>25+ Cloud Architecture Real-world Labs</li>
              <li>Official AWS SAA-C03 Exam Practice Tests</li>
              <li>Cloud Architecture Project Portfolio</li>
              <li>1-on-1 Exam Voucher & Application Guidance</li>
            </ul>
            <Link to="/courses" className="sp-btn-primary">
              Enroll in AWS Cloud Track →
            </Link>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="sp-section">
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>Core AWS Domains & Architectural Pillars</h2>
            <p>Master AWS cloud design across all four exam domains.</p>
          </div>

          <div className="sp-grid">
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaLock />
              </div>
              <h3>Domain 1: Secure Architectures</h3>
              <p>IAM roles, KMS encryption, Security Groups, NACLs, AWS Shield, and Multi-factor Authentication (MFA).</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaBolt />
              </div>
              <h3>Domain 2: Resilient Architectures</h3>
              <p>Multi-AZ deployments, Auto Scaling Groups, Elastic Load Balancers (ALB/NLB), Route 53 DNS routing.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaRocket />
              </div>
              <h3>Domain 3: High-Performing Architectures</h3>
              <p>Amazon S3 storage classes, ElastiCache, CloudFront CDN, Aurora DB, and serverless AWS Lambda.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaDollarSign />
              </div>
              <h3>Domain 4: Cost-Optimized Architectures</h3>
              <p>Savings Plans, Reserved Instances, S3 Lifecycle policies, AWS Cost Explorer, and Resource Tagging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="sp-section" style={{ backgroundColor: "#ffffff" }}>
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>Who Should Attend AWS Training?</h2>
            <p>Designed for tech professionals and ambitious cloud engineers.</p>
          </div>

          <div className="sp-audience-box">
            <ul className="sp-audience-list">
              <li><span>1</span> Systems Administrators & Infrastructure Engineers</li>
              <li><span>2</span> Software Engineers & Backend Developers</li>
              <li><span>3</span> Network Engineers & Security Specialists</li>
              <li><span>4</span> DevOps Aspirants & Cloud Engineers</li>
              <li><span>5</span> IT Project Managers & Technical Leads</li>
              <li><span>6</span> Fresh Graduates wanting a career in Cloud Computing</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <ServiceFAQAccordion title="AWS Cloud Training Frequently Asked Questions" faqs={awsFaqs} />
    </div>
  );
}
