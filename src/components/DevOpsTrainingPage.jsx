import React from "react";
import { Link } from "react-router-dom";
import {
  FaRocket,
  FaClock,
  FaStar,
  FaBoxOpen,
  FaDocker,
  FaTerminal,
  FaServer,
  FaSyncAlt,
} from "react-icons/fa";
import ServiceFAQAccordion from "./ServiceFAQAccordion";
import "./ServicePageCommon.css";

export default function DevOpsTrainingPage() {
  const devopsFaqs = [
    {
      q: "What is DevOps training and certification?",
      a: "DevOps training teaches the methodologies, automation tools, and continuous delivery pipelines used by top tech companies to unify software development (Dev) and IT operations (Ops). You learn containerization (Docker), orchestration (Kubernetes), infrastructure as code (Terraform), and CI/CD automation (Jenkins/GitLab CI).",
    },
    {
      q: "What are the eligibility requirements for DevOps training?",
      a: "Basic familiarity with Linux command-line commands and fundamental IT concepts is helpful. No prior expert-level coding is required—we teach Linux, Shell Scripting, and Git from scratch.",
    },
    {
      q: "Who is DevOps training suitable for?",
      a: "DevOps training is suitable for Software Developers, System Administrators, QA/Test Automation Engineers, Build & Release Engineers, Cloud Support Engineers, and IT Professionals seeking high-growth automation careers.",
    },
    {
      q: "What real-world projects are included in the curriculum?",
      a: "You build an end-to-end automated deployment pipeline: containerizing a multi-tier web application using Docker, provisioning AWS cloud infrastructure using Terraform, automating build/test/deploy workflows via Jenkins CI/CD, and orchestrating containers on a live Kubernetes cluster.",
    },
    {
      q: "Which certifications are supported after completing this course?",
      a: "Our curriculum prepares candidates for Certified Kubernetes Administrator (CKA), Docker Certified Associate (DCA), AWS Certified DevOps Engineer Professional, and HashiCorp Certified Terraform Associate.",
    },
  ];

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "DevOps Engineering & Cloud Automation Masterclass",
    "description": "Hands-on DevOps training featuring Docker containerization, Kubernetes orchestration, Jenkins CI/CD pipelines, and Terraform Infrastructure as Code (IaC).",
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
              <FaRocket style={{ color: "#059669" }} /> Continuous Integration & Automation Masterclass
            </span>
            <h1 className="sp-hero-title">DevOps Engineering & CI/CD Pipeline Training</h1>
            <p className="sp-hero-desc">
              Master industrial automation tools: Linux, Docker, Kubernetes, Jenkins, Terraform, Ansible, and Prometheus. Build production-grade deployment pipelines with zero-downtime releases.
            </p>
            <div className="sp-hero-meta">
              <div className="sp-meta-item">
                <FaClock style={{ color: "#059669" }} /> <span>8 Weeks (50 Hrs)</span>
              </div>
              <div className="sp-meta-item">
                <FaStar style={{ color: "#f59e0b" }} /> <span>4.9 / 5 Rating</span>
              </div>
              <div className="sp-meta-item">
                <FaBoxOpen style={{ color: "#059669" }} /> <span>Real CI/CD Projects</span>
              </div>
            </div>
          </div>

          <div className="sp-hero-card">
            <h3>DevOps Engineer Master Track</h3>
            <div className="sp-card-price">
              <s>₹22,999</s> ₹11,499
            </div>
            <ul className="sp-card-features">
              <li>Docker Containerization & Multi-stage Builds</li>
              <li>Kubernetes Architecture, Ingress & Helm</li>
              <li>Jenkins Pipeline as Code (Groovy Scripting)</li>
              <li>Terraform Infrastructure as Code (IaC)</li>
              <li>Prometheus & Grafana Cluster Monitoring</li>
            </ul>
            <Link to="/courses" className="sp-btn-primary">
              Enroll in DevOps Master Track →
            </Link>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="sp-section">
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>DevOps Toolstack Covered in Hands-On Labs</h2>
            <p>Master the industry-standard toolchain used by Fortune 500 tech teams.</p>
          </div>

          <div className="sp-grid">
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaDocker />
              </div>
              <h3>Docker Containerization</h3>
              <p>Image creation, volume persistence, multi-container networking with Docker Compose, and registry management.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaServer />
              </div>
              <h3>Kubernetes (K8s) Orchestration</h3>
              <p>Pods, Deployments, Services, ConfigMaps, Secrets, StatefulSets, Auto-scaling (HPA), and CKA exam practice.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaTerminal />
              </div>
              <h3>Infrastructure as Code (Terraform)</h3>
              <p>Declarative cloud provisioning on AWS, HCL syntax, Terraform state management, modules, and drift detection.</p>
            </div>
            <div className="sp-card">
              <div className="sp-card-icon">
                <FaSyncAlt />
              </div>
              <h3>Jenkins CI/CD Pipeline Automation</h3>
              <p>Automated build triggers, GitHub webhooks, multi-branch pipelines, sonar scanner integration, and automated rollbacks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience */}
      <section className="sp-section" style={{ backgroundColor: "#ffffff" }}>
        <div className="sp-container">
          <div className="sp-sec-head">
            <h2>Who Should Attend DevOps Training?</h2>
            <p>Ideal profiles for building a high-paying DevOps career.</p>
          </div>

          <div className="sp-audience-box">
            <ul className="sp-audience-list">
              <li><span>1</span> Software Engineers & Full-Stack Developers</li>
              <li><span>2</span> Linux & Windows Systems Administrators</li>
              <li><span>3</span> QA Engineers & Test Automation Leads</li>
              <li><span>4</span> Build & Release Engineers</li>
              <li><span>5</span> IT Support & Infrastructure Specialists</li>
              <li><span>6</span> Cloud Engineers & Solutions Architects</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <ServiceFAQAccordion title="DevOps Training Frequently Asked Questions" faqs={devopsFaqs} />
    </div>
  );
}
