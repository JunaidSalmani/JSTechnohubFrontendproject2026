import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaAward,
  FaShieldAlt,
  FaCheckCircle,
  FaArrowRight,
  FaCloud,
  FaChartBar,
  FaStar,
  FaTimes,
  FaCheck,
  FaLandmark,
  FaLock,
  FaNetworkWired,
  FaWhatsapp,
} from "react-icons/fa";
import "./HomePage.css";
import { addReview, getPublicReviews } from "../services/api";

const homeSchema = {
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "LocalBusiness"],
  "name": "JSTechnoHub",
  "url": "https://www.jstechnohub.com",
  "description":
    "Global professional training institute and career accelerator specializing in PMP, SAP S/4HANA, AWS Cloud, DevOps, Certification Application Support, and ATS Resume Writing.",
  "telephone": "+91 87430 39914",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "West High Court Road, Dharampeth",
    "addressLocality": "Nagpur",
    "addressRegion": "Maharashtra",
    "postalCode": "440010",
    "addressCountry": "IN",
  },
};

const PROGRAMS = [
  {
    id: "pmp",
    title: "Project Management Professional (PMP®)",
    category: "project",
    badge: "Flagship Credential",
    vendor: "PMI® Authorized Alignment",
    desc: "Authorized 35 Contact Hours Certificate, PMI® ECO curriculum, Generative AI for Project Managers, and 100% application audit support.",
    metrics: ["35 PDUs Included", "98.4% Pass Rate", "Weekend Cohort"],
    link: "/pmp",
    cta: "Explore PMP Program",
  },
  {
    id: "salesforce",
    title: "Salesforce Certified Administrator & Developer",
    category: "cloud",
    badge: "High Growth CRM",
    vendor: "Salesforce® Ecosystem",
    desc: "Hands-on org configuration, custom objects, advanced Flow Builder automation, security hierarchies, and real-time analytical reports.",
    metrics: ["ADM-201 Aligned", "Developer Sandboxes", "6 Weeks Cohort"],
    link: "/certifications/sales-force",
    cta: "Explore Salesforce Track",
  },
  {
    id: "aws",
    title: "AWS Cloud Solutions Architect (SAA-C03)",
    category: "cloud",
    badge: "Cloud Engineering",
    vendor: "AWS Partner Network",
    desc: "Deep-dive into VPC architectures, IAM security, EC2 autoscaling, S3 storage tiers, RDS databases, and serverless Lambda in real AWS sandbox accounts.",
    metrics: ["100% Console Labs", "SAA-C03 Blueprint", "Live Production Labs"],
    link: "/courses",
    cta: "Explore AWS Program",
  },
  {
    id: "sap",
    title: "SAP S/4HANA ERP Enterprise Modules",
    category: "erp",
    badge: "Enterprise ERP",
    vendor: "SAP Global Ecosystem",
    desc: "Dedicated 24/7 remote SAP GUI server access for SAP FICO, MM, SD, and S/4HANA business process integration.",
    metrics: ["24/7 Server Access", "FICO / MM / SD", "Enterprise Case Studies"],
    link: "/courses",
    cta: "Explore SAP Training",
  },
  {
    id: "networking",
    title: "Cisco CCNA & Palo Alto Network Security",
    category: "cloud",
    badge: "Core Networking & Sec",
    vendor: "Cisco® & Palo Alto Networks®",
    desc: "Enterprise routing, switching (OSPFv2, VLANs, STP), and Next-Generation Firewalls (PAN-OS 11.x) with packet tracer and virtual appliance labs.",
    metrics: ["200-301 CCNA", "PCNSE Next-Gen NGFW", "Packet Tracer Racks"],
    link: "/certifications/ccna",
    cta: "Explore CCNA Program",
  },
  {
    id: "career",
    title: "1-on-1 Certification & ATS Resume Suite",
    category: "career",
    badge: "Career Velocity",
    vendor: "JSTechnoHub Enterprise Advisory",
    desc: "Guaranteed application audit clearance for PMI/AWS/SAP, plus 100% ATS-compliant executive resume writing and recruiter-optimized LinkedIn SEO.",
    metrics: ["48-Hr Audit Clearance", "100% ATS Compliant", "3x Callbacks"],
    link: "/services",
    cta: "Explore Career Services",
  },
];

const ReviewFormModal = ({ onSubmit, onClose }) => {
  const [newReview, setNewReview] = useState({
    name: "",
    email: "",
    message: "",
    rating: 5,
  });
  const [err, setErr] = useState("");

  const handleChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErr("");
    if (!newReview.name.trim() || newReview.name.trim().length < 2) {
      setErr("Please enter your full name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newReview.email.trim())) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (!newReview.message.trim() || newReview.message.trim().length < 5) {
      setErr("Please write a brief feedback message (at least 5 characters).");
      return;
    }
    onSubmit(newReview);
  };

  return (
    <div className="hp-modal-overlay" onClick={onClose}>
      <div className="hp-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="hp-modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>
        <span className="modal-badge">STUDENT TESTIMONIAL</span>
        <h3>Write a Review</h3>
        <p>Share your learning experience to guide fellow professionals on their certification journey.</p>
        {err && <div className="hp-err-alert">⚠️ {err}</div>}
        <form onSubmit={handleSubmit} className="hp-modal-form">
          <div className="hp-form-field">
            <label htmlFor="modal-name">Full Name *</label>
            <input
              id="modal-name"
              type="text"
              name="name"
              placeholder="e.g. Rahul Sharma"
              value={newReview.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="hp-form-field">
            <label htmlFor="modal-email">Work Email *</label>
            <input
              id="modal-email"
              type="email"
              name="email"
              placeholder="name@company.com"
              value={newReview.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="hp-form-field">
            <label htmlFor="modal-message">Your Review & Feedback *</label>
            <textarea
              id="modal-message"
              name="message"
              placeholder="Tell us about the batch, mentor support, or exam success..."
              value={newReview.message}
              rows="4"
              onChange={handleChange}
              required
            />
          </div>
          <div className="hp-form-field">
            <label htmlFor="modal-rating">Rating Score</label>
            <select
              id="modal-rating"
              name="rating"
              value={newReview.rating}
              onChange={handleChange}
            >
              <option value="5">★★★★★ 5 / 5 - Exceptional Experience</option>
              <option value="4">★★★★☆ 4 / 5 - Very Good</option>
              <option value="3">★★★☆☆ 3 / 5 - Good</option>
              <option value="2">★★☆☆☆ 2 / 5 - Average</option>
              <option value="1">★☆☆☆☆ 1 / 5 - Poor</option>
            </select>
          </div>
          <button type="submit" className="hp-btn-submit-review">
            Submit Review for Verification →
          </button>
        </form>
      </div>
    </div>
  );
};

export default function HomePage() {
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    getPublicReviews()
      .then((res) => setReviews(res.data || []))
      .catch((err) => console.error("Failed to fetch public reviews:", err));
  }, []);

  const handleAddReview = (reviewData) => {
    addReview(reviewData)
      .then(() => {
        alert("Thank you! Your review has been submitted successfully for moderation.");
        setIsReviewModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Sorry, there was an error submitting your review. Please try again.");
      });
  };

  const filteredPrograms = useMemo(() => {
    if (selectedTab === "all") return PROGRAMS;
    return PROGRAMS.filter((p) => p.category === selectedTab);
  }, [selectedTab]);

  return (
    <div className="hp-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      {/* ════════════════════ 1. CLEAN EXECUTIVE HERO (BRIGHT LIGHT CANVAS) ════════════════════ */}
      <section className="hp-hero">
        <div className="hp-container">
          <div className="hp-hero-grid">
            {/* Left Column: Command & Value Proposition */}
            <div className="hp-hero-content">
              {/* Announcement Pill Badge */}
              <div className="hp-hero-badge">
                <span className="hp-badge-dot" />
                <span className="hp-badge-text">2026 GLOBAL CERTIFICATION COHORTS OPEN</span>
                <span className="hp-badge-sep">·</span>
                <span className="hp-badge-highlight">98.4% PASS RATE</span>
              </div>

              {/* High-Impact Heading */}
              <h1 className="hp-hero-title">
                Master Global Tech &amp; Management <span className="title-flame">Certifications</span>
              </h1>

              {/* Subtitle */}
              <p className="hp-hero-subtitle">
                Accelerate your career with 1-on-1 expert mentorship in PMP®, SAP ERP, AWS Cloud, and DevOps.
                Authorized 35 PDUs, 24/7 dedicated server sandboxes, and guaranteed 100% application audit clearance.
              </p>

              {/* Primary CTAs */}
              <div className="hp-hero-actions">
                <Link to="/courses" className="hp-btn-flame">
                  <span>Explore Upcoming Batches</span>
                  <FaArrowRight className="hp-btn-icon" />
                </Link>
                <a
                  href="https://wa.me/918743039914?text=Hello%20JSTechnoHub%20I%20am%20interested%20in%20Certification%20Training"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hp-btn-advisor"
                >
                  <FaWhatsapp className="hp-wa-icon" />
                  <span>Chat with Senior Advisor</span>
                </a>
              </div>

              {/* Social Proof & Metrics */}
              <div className="hp-hero-proof">
                <div className="hp-proof-rating">
                  <div className="hp-stars">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <div className="hp-rating-info">
                    <span className="hp-score">4.9 / 5.0</span>
                    <span className="hp-score-sub">Google &amp; Trustpilot Reviews</span>
                  </div>
                </div>

                <div className="hp-proof-sep" />

                <div className="hp-proof-metrics">
                  <div className="hp-metric-item">
                    <strong>98.4%</strong>
                    <span>First-Attempt Pass</span>
                  </div>
                  <div className="hp-metric-item">
                    <strong>1,200+</strong>
                    <span>Certified Alumni</span>
                  </div>
                  <div className="hp-metric-item">
                    <strong>100%</strong>
                    <span>Audit Clearance</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean Executive Cohorts Card */}
            <div className="hp-hero-schedule-card">
              <div className="schedule-card-header">
                <div className="schedule-head-title-wrap">
                  <span className="schedule-pulse-dot" />
                  <span className="schedule-card-title">Next Live Batches</span>
                </div>
                <span className="schedule-card-tag">Enrolling Now</span>
              </div>

              <div className="schedule-card-body">
                {/* Cohort 1: PMP */}
                <Link to="/pmp" className="schedule-cohort-item">
                  <div className="cohort-top-row">
                    <span className="cohort-vendor">PMI® ECO 2026 Aligned</span>
                    <span className="cohort-status-pill status-urgency">3 Seats Remaining</span>
                  </div>
                  <h3 className="cohort-course-name">Project Management Professional (PMP®)</h3>
                  <div className="cohort-details-row">
                    <span className="cohort-detail">📅 Starts Saturday · 10:00 AM IST</span>
                    <span className="cohort-detail">🎓 35 Contact Hours Included</span>
                  </div>
                  <div className="cohort-bottom-row">
                    <span className="cohort-enroll-cta">View Syllabus &amp; Enroll →</span>
                  </div>
                </Link>

                {/* Cohort 2: SAP */}
                <Link to="/courses" className="schedule-cohort-item">
                  <div className="cohort-top-row">
                    <span className="cohort-vendor">SAP Global Ecosystem</span>
                    <span className="cohort-status-pill">Filling Fast</span>
                  </div>
                  <h3 className="cohort-course-name">SAP S/4HANA ERP (FICO / MM)</h3>
                  <div className="cohort-details-row">
                    <span className="cohort-detail">📅 Weekend Live Cohort</span>
                    <span className="cohort-detail">🖥️ 24/7 Remote GUI Server Access</span>
                  </div>
                  <div className="cohort-bottom-row">
                    <span className="cohort-enroll-cta">View Syllabus &amp; Enroll →</span>
                  </div>
                </Link>

                {/* Cohort 3: AWS */}
                <Link to="/certifications" className="schedule-cohort-item">
                  <div className="cohort-top-row">
                    <span className="cohort-vendor">AWS Partner Network</span>
                    <span className="cohort-status-pill">Weekend Batch</span>
                  </div>
                  <h3 className="cohort-course-name">AWS Solutions Architect Associate</h3>
                  <div className="cohort-details-row">
                    <span className="cohort-detail">📅 Starts Sunday · 11:30 AM IST</span>
                    <span className="cohort-detail">☁️ 100% Live AWS Console Labs</span>
                  </div>
                  <div className="cohort-bottom-row">
                    <span className="cohort-enroll-cta">View Syllabus &amp; Enroll →</span>
                  </div>
                </Link>
              </div>

              <div className="schedule-card-footer">
                <div className="schedule-guarantee">
                  <FaShieldAlt className="guarantee-shield" />
                  <span>100% Application Audit Clearance Guarantee</span>
                </div>
                <Link to="/courses" className="schedule-all-link">
                  All Batches →
                </Link>
              </div>
            </div>
          </div>

          {/* Clean Light Accreditation Marquee */}
          <div className="hp-accreditation-marquee">
            <span className="marquee-label">OFFICIALLY ALIGNED FRAMEWORKS &amp; PLATFORMS:</span>
            <div className="marquee-pills">
              <div className="m-pill"><FaLandmark /> PMI® Authorized Alignment</div>
              <div className="m-pill"><FaCloud /> AWS Partner Network</div>
              <div className="m-pill"><FaChartBar /> SAP Global S/4HANA</div>
              <div className="m-pill"><FaAward /> Salesforce Certified</div>
              <div className="m-pill"><FaNetworkWired /> Cisco Systems CCNA</div>
              <div className="m-pill"><FaShieldAlt /> 100% Audit Protection</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 3. CURATED SPECIALIZATION PROGRAMS ════════════════════ */}
      <section className="hp-programs-section">
        <div className="hp-container">
          <div className="hp-section-head">
            <span className="sec-tag">CURATED LEARNING PATHS</span>
            <h2>
              <span style={{ whiteSpace: "nowrap" }}>Industry-Demanded</span>{" "}
              <span style={{ whiteSpace: "nowrap" }}>Professional Programs</span>
            </h2>
            <p>
              Move from foundational concepts to international credential clearance and production-ready
              execution with structured practitioner masterclasses.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="hp-filter-tabs" role="tablist">
            <button
              className={`filter-tab${selectedTab === "all" ? " active" : ""}`}
              onClick={() => setSelectedTab("all")}
            >
              All Programs ({PROGRAMS.length})
            </button>
            <button
              className={`filter-tab${selectedTab === "project" ? " active" : ""}`}
              onClick={() => setSelectedTab("project")}
            >
              Project &amp; Leadership
            </button>
            <button
              className={`filter-tab${selectedTab === "cloud" ? " active" : ""}`}
              onClick={() => setSelectedTab("cloud")}
            >
              Cloud &amp; Security
            </button>
            <button
              className={`filter-tab${selectedTab === "erp" ? " active" : ""}`}
              onClick={() => setSelectedTab("erp")}
            >
              Enterprise ERP
            </button>
            <button
              className={`filter-tab${selectedTab === "career" ? " active" : ""}`}
              onClick={() => setSelectedTab("career")}
            >
              Career &amp; Audit Suite
            </button>
          </div>

          {/* Program Cards Grid */}
          <div className="hp-programs-grid">
            {filteredPrograms.map((p) => (
              <article key={p.id} className="hp-program-card">
                <div className="prog-header">
                  <div className="prog-vendor-row">
                    <span className="prog-vendor">{p.vendor}</span>
                    <span className="prog-badge">{p.badge}</span>
                  </div>
                  <h3 className="prog-title">
                    <Link to={p.link}>{p.title}</Link>
                  </h3>
                </div>

                <p className="prog-desc">{p.desc}</p>

                <div className="prog-metrics-row">
                  {p.metrics.map((m, idx) => (
                    <span key={idx} className="metric-chip">
                      <FaCheckCircle className="chip-icon" /> {m}
                    </span>
                  ))}
                </div>

                <div className="prog-action">
                  <Link to={p.link} className="btn-prog-card">
                    <span>{p.cta}</span>
                    <FaArrowRight className="prog-arrow" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ 4. THE 4-STAGE METHODOLOGY ════════════════════ */}
      <section className="hp-methodology-section">
        <div className="hp-container">
          <div className="hp-section-head">
            <span className="sec-tag">OUR METHODOLOGY</span>
            <h2>The JSTechnoHub 4-Stage Mastery Framework</h2>
            <p>
              How we ensure a 98.4% first-attempt pass rate and real-world delivery competence for
              every candidate.
            </p>
          </div>

          <div className="hp-stages-grid">
            <div className="stage-card">
              <div className="stage-number">01</div>
              <h3>Eligibility Diagnostic</h3>
              <p>
                We assess your professional work history, education credits, and career targets to
                ensure you meet official vendor requirements before enrollment.
              </p>
            </div>

            <div className="stage-card">
              <div className="stage-number">02</div>
              <h3>Live Practitioner Cohorts</h3>
              <p>
                Learn directly from Fortune 500 leads who manage enterprise architectures daily. No
                outdated pre-recordings; 100% interactive masterclasses.
              </p>
            </div>

            <div className="stage-card">
              <div className="stage-number">03</div>
              <h3>Live Sandboxes &amp; Simulators</h3>
              <p>
                Get hands-on with live AWS consoles, dedicated 24/7 SAP GUI servers, and timed
                testing engines that mirror Pearson VUE and Webassessor.
              </p>
            </div>

            <div className="stage-card">
              <div className="stage-number">04</div>
              <h3>Audit Clearance &amp; Career Launch</h3>
              <p>
                Complete signature-ready audit documentation packages within 48 hours, plus an
                ATS-optimized resume rewrite to land senior interviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 5. COMPARISON MATRIX ════════════════════ */}
      <section className="hp-comparison-section">
        <div className="hp-container">
          <div className="hp-section-head">
            <span className="sec-tag">WHY PROFESSIONALS CHOOSE US</span>
            <h2>Why JSTechnoHub Outperforms Generic Courses</h2>
            <p>
              See how our executive practitioner mentorship model compares to pre-recorded video sites
              and typical local institutes.
            </p>
          </div>

          <div className="hp-table-card">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Capability &amp; Deliverables</th>
                  <th className="th-competitor">Pre-Recorded Platforms</th>
                  <th className="th-competitor">Local Institutes</th>
                  <th className="th-highlight">JSTechnoHub Executive</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="feature-name">Live Active Industry Practitioners</td>
                  <td className="status-cross"><FaTimes /> Recorded Only</td>
                  <td className="status-cross"><FaTimes /> Career Academics</td>
                  <td className="status-check"><FaCheck /> 100% Fortune 500 Leads</td>
                </tr>
                <tr>
                  <td className="feature-name">24/7 Live Enterprise Sandboxes (AWS / SAP)</td>
                  <td className="status-cross"><FaTimes /> Simulated Only</td>
                  <td className="status-cross"><FaTimes /> Limited / Shared</td>
                  <td className="status-check"><FaCheck /> Dedicated Cloud Consoles</td>
                </tr>
                <tr>
                  <td className="feature-name">Guaranteed Application Audit Clearance</td>
                  <td className="status-cross"><FaTimes /> None</td>
                  <td className="status-cross"><FaTimes /> Extra Charge</td>
                  <td className="status-check"><FaCheck /> 100% Full Audit Guarantee</td>
                </tr>
                <tr>
                  <td className="feature-name">Official Examination Simulator Engines</td>
                  <td className="status-cross"><FaTimes /> Basic Quizzes</td>
                  <td className="status-cross"><FaTimes /> Outdated PDF Dumps</td>
                  <td className="status-check"><FaCheck /> Timed Proctored Engines</td>
                </tr>
                <tr>
                  <td className="feature-name">ATS Resume &amp; LinkedIn Profile Overhaul</td>
                  <td className="status-cross"><FaTimes /> Not Included</td>
                  <td className="status-cross"><FaTimes /> Generic Templates</td>
                  <td className="status-check"><FaCheck /> Included Recruiter SEO</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ════════════════════ 6. REVIEWS & STUDENT SUCCESS ════════════════════ */}
      <section className="hp-reviews-section">
        <div className="hp-container">
          <div className="hp-section-head">
            <span className="sec-tag">ALUMNI SUCCESS STORIES</span>
            <h2>Verified Alumni Experiences</h2>
            <p>
              Read genuine feedback from candidates who transformed their careers and cleared global
              certifications with JSTechnoHub.
            </p>
          </div>

          <div className="hp-reviews-grid">
            {reviews.length > 0 ? (
              reviews
                .filter((r) => r.approved && r.message?.trim() !== "")
                .map((rev) => (
                  <div key={rev.id} className="hp-rev-card">
                    <div className="rev-stars">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                    <p className="rev-quote">&ldquo;{rev.message}&rdquo;</p>
                    <div className="rev-author">
                      <strong>{rev.name}</strong>
                      <span>Verified Alumnus</span>
                    </div>
                  </div>
                ))
            ) : (
              [
                {
                  quote:
                    "The PMP 35 Contact Hours masterclass and situational question drills were phenomenal. Cleared on my first attempt with Above Target across all domains! The audit support gave me complete peace of mind.",
                  name: "Rahul Sharma",
                  role: "Senior Project Delivery Lead · PMP® Certified",
                },
                {
                  quote:
                    "The live SAP S/4HANA GUI server access made all the difference. Learning real enterprise FICO configuration under an active corporate practitioner helped me switch into an ERP consulting role.",
                  name: "Priya Nair",
                  role: "SAP FICO Consultant",
                },
                {
                  quote:
                    "The ATS resume overhaul and AWS Solutions Architect hands-on labs were game changers. I received 3 executive interview calls within two weeks of updating my LinkedIn and resume.",
                  name: "Vikram Malhotra",
                  role: "Cloud Solutions Architect · AWS SAA-C03",
                },
              ].map((item, idx) => (
                <div key={idx} className="hp-rev-card">
                  <div className="rev-stars">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                  </div>
                  <p className="rev-quote">&ldquo;{item.quote}&rdquo;</p>
                  <div className="rev-author">
                    <strong>{item.name}</strong>
                    <span>{item.role}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="hp-reviews-action">
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="btn-add-review"
            >
              + Share Your Review &amp; Feedback
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════ 7. FINAL EXECUTIVE CTA BANNER ════════════════════ */}
      <section className="hp-cta-banner-section">
        <div className="hp-container">
          <div className="hp-cta-banner-card">
            <div className="banner-content">
              <span className="banner-tag">
                <FaLock /> 100% CONFIDENTIAL CAREER CONSULTATION
              </span>
              <h2>Unsure Which Certification Aligns With Your Goals?</h2>
              <p>
                Connect directly with a Senior Technical Certification Advisor. We analyze your
                current experience, career aspirations, and recommend the exact certification
                roadmap.
              </p>
            </div>
            <div className="banner-actions">
              <Link to="/contact" className="btn-banner-red">
                <span>Book 1-on-1 Discovery Call</span>
                <FaArrowRight />
              </Link>
              <Link to="/courses" className="btn-banner-ghost">
                <span>View All Course Schedules</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Review Modal Form */}
      {isReviewModalOpen && (
        <ReviewFormModal
          onSubmit={handleAddReview}
          onClose={() => setIsReviewModalOpen(false)}
        />
      )}
    </div>
  );
}
