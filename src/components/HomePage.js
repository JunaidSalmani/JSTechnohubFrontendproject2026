import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import { addReview, getPublicReviews } from "../services/api";

// SVG Icons
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const AwardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const ZapIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const StarRating = ({ rating }) => (
  <div className="hp-star-rating">
    {[...Array(5)].map((_, i) => (
      <span key={i} className={i < rating ? "filled" : "empty"}>
        ★
      </span>
    ))}
  </div>
);

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
        <button className="hp-modal-close" onClick={onClose}>
          &times;
        </button>
        <h3>Write a Review</h3>
        <p>Share your experience to guide fellow professionals on their learning journey.</p>
        {err && <div className="hp-err-alert">⚠️ {err}</div>}
        <form onSubmit={handleSubmit} className="hp-modal-form">
          <div className="fl-field">
            <input
              type="text"
              name="name"
              placeholder=" "
              value={newReview.name}
              onChange={handleChange}
              required
            />
            <label>Full Name *</label>
          </div>
          <div className="fl-field">
            <input
              type="email"
              name="email"
              placeholder=" "
              value={newReview.email}
              onChange={handleChange}
              required
            />
            <label>Work Email *</label>
          </div>
          <div className="fl-field">
            <textarea
              name="message"
              placeholder=" "
              value={newReview.message}
              rows="4"
              onChange={handleChange}
              required
            />
            <label>Your Review & Feedback *</label>
          </div>
          <div className="fl-field">
            <select
              name="rating"
              value={newReview.rating}
              onChange={handleChange}
            >
              <option value="5">5 / 5 - Excellent</option>
              <option value="4">4 / 5 - Very Good</option>
              <option value="3">3 / 5 - Good</option>
              <option value="2">2 / 5 - Average</option>
              <option value="1">1 / 5 - Poor</option>
            </select>
            <label>Rating Score</label>
          </div>
          <button type="submit" className="hp-btn-primary" style={{ width: "100%", justifyContent: "center" }}>
            Submit Review for Approval
          </button>
        </form>
      </div>
    </div>
  );
};

function HomePage() {
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    getPublicReviews()
      .then((res) => setReviews(res.data || []))
      .catch((err) => console.error("Failed to fetch public reviews:", err));

    const sections = document.querySelectorAll(".hp-section, .hp-hero-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hp-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  const handleAddReview = (reviewData) => {
    addReview(reviewData)
      .then(() => {
        alert("Thank you! Your review has been submitted successfully for approval.");
        setIsReviewModalOpen(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Sorry, there was an error submitting your review.");
      });
  };

  const homeSchema = {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "name": "JSTechnoHub",
    "url": "https://www.jstechnohub.com",
    "description": "Global professional training institute and career accelerator specializing in PMP, SAP, AWS Cloud, DevOps, Certification Application Support, and ATS Resume Writing.",
    "telephone": "+91-9876543210",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "West High Court Road, Dharampeth",
      "addressLocality": "Nagpur",
      "addressRegion": "Maharashtra",
      "postalCode": "440010",
      "addressCountry": "IN"
    }
  };

  const SPECIALIZATIONS = [
    {
      id: "pmp",
      title: "PMP® Certification Training",
      tag: "PMI® Authorized 35 Hours",
      desc: "Comprehensive PMP® Exam prep aligned with PMI® ECO 2026, 1,500+ situational questions, and Gen AI prompt engineering.",
      link: "/services/pmp",
      badge: "35 Contact Hours"
    },
    {
      id: "sap",
      title: "SAP ERP Modules & S/4HANA",
      tag: "Enterprise ERP",
      desc: "Hands-on SAP FICO, MM, SD, and S/4HANA migration training with 24/7 remote SAP GUI server access.",
      link: "/services/sap",
      badge: "Live Server Access"
    },
    {
      id: "aws",
      title: "AWS Cloud Architecture",
      tag: "Cloud Engineering",
      desc: "Master AWS VPC subnets, IAM security, EC2, S3, RDS, and serverless Lambda in real AWS sandbox accounts.",
      link: "/services/aws",
      badge: "100% Console Labs"
    },
    {
      id: "devops",
      title: "DevOps & CI/CD Automation",
      tag: "Infrastructure as Code",
      desc: "Build automated deployment pipelines using Docker, Kubernetes, Jenkins, Terraform, and Prometheus.",
      link: "/services/devops",
      badge: "Real Production Pipelines"
    },
    {
      id: "support",
      title: "1-on-1 Certification Support",
      tag: "Audit Clearance Guarantee",
      desc: "Step-by-step guidance for experience mapping, application submission, audit package clearance, and voucher savings.",
      link: "/services/certification-support",
      badge: "48-Hr Audit Clearance"
    },
    {
      id: "resume",
      title: "ATS Resume & LinkedIn Optimization",
      tag: "Career Transformation",
      desc: "Transform your resume into a 100% ATS-compliant job asset and rank high in recruiter LinkedIn searches.",
      link: "/services/resume-career",
      badge: "3x Callbacks Guaranteed"
    }
  ];

  return (
    <div className="hp-wrapper">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      {/* ════════════════════ 1. HERO SECTION ════════════════════ */}
      <section className="hp-hero-section hp-visible">
        <div className="hp-container">
          <div className="hp-hero-content">
            <div className="hp-hero-badge">
              <ZapIcon /> PMI® Authorized Partner & Global Career Accelerator
            </div>

            <h1 className="hp-hero-title">
              Unlock Professional Success with <span className="hp-gradient-text">JSTechnoHub Certifications</span> & Hands-On Training
            </h1>

            <p className="hp-hero-sub">
              <strong>JSTechnoHub</strong> is a global professional training institute and career accelerator specializing in PMI® PMP®, SAP S/4HANA, AWS Cloud, DevOps CI/CD, 1-on-1 Certification Audit Support, and ATS Resume Optimization.
            </p>

            {/* Stat Counters Row */}
            <div className="hp-stats-row">
              <div className="hp-stat-chip">
                <UsersIcon /> <span>1,200+ Students Certified</span>
              </div>
              <div className="hp-stat-chip">
                <AwardIcon /> <span>98.4% Exam Pass Rate</span>
              </div>
              <div className="hp-stat-chip">
                <StarIcon /> <span>4.9/5 Average Rating</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="hp-hero-ctas">
              <Link to="/services" className="hp-btn-primary">
                Explore All 6 Specialized Services <ArrowRightIcon />
              </Link>
              <Link to="/courses" className="hp-btn-secondary">
                View Training Schedule
              </Link>
              <Link to="/services/resume-career" className="hp-btn-outline">
                ATS Resume Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 2. HIGHLIGHTS RIBBON ════════════════════ */}
      <div className="hp-ribbon-bar">
        <div className="hp-container hp-ribbon-grid">
          <div className="hp-ribbon-item"><CheckIcon /> 35 Contact Hours Certificate (PMI® Mandatory)</div>
          <div className="hp-ribbon-item"><CheckIcon /> 24/7 Dedicated SAP GUI & AWS Console Access</div>
          <div className="hp-ribbon-item"><CheckIcon /> 100% Guaranteed Application Audit Clearance</div>
          <div className="hp-ribbon-item"><CheckIcon /> 100% ATS Resume Parsing Guarantee</div>
        </div>
      </div>

      {/* ════════════════════ 3. CLEAR HOMEPAGE POSITIONING SECTION ════════════════════ */}
      <section className="hp-section hp-bg-light hp-visible">
        <div className="hp-container">
          <div className="hp-sec-head">
            <span className="hp-pill-tag">What is JSTechnoHub?</span>
            <h2>Our Core Specialized Services</h2>
            <p>
              JSTechnoHub is your trusted partner for career advancement. We specialize in 6 core service areas designed to take you from foundational knowledge to international certification and job offer clearance.
            </p>
          </div>

          <div className="hp-programs-grid">
            {SPECIALIZATIONS.map((item) => (
              <div key={item.id} className="hp-program-card">
                <div className="hp-card-top">
                  <span className="hp-tag-chip">{item.tag}</span>
                  <span className="hp-badge-chip">{item.badge}</span>
                </div>

                <h3 className="hp-card-title">{item.title}</h3>
                <p className="hp-card-desc">{item.desc}</p>

                <div className="hp-card-footer" style={{ marginTop: "16px" }}>
                  <Link to={item.link} className="hp-btn-primary" style={{ width: "100%", justifyContent: "center", fontSize: "0.92rem", padding: "10px 16px" }}>
                    Explore Dedicated Service Page <ArrowRightIcon />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ 4. WHY CHOOSE US ════════════════════ */}
      <section className="hp-section hp-visible">
        <div className="hp-container">
          <div className="hp-sec-head">
            <h2>Why Professionals Choose JSTechnoHub</h2>
            <p>We combine official exam curriculum, practical labs, and career support under one roof.</p>
          </div>

          <div className="hp-features-grid">
            <div className="hp-feat-card">
              <div className="hp-feat-icon"><AwardIcon /></div>
              <h3>Authorized Exam ECO Alignment</h3>
              <p>100% aligned with official Examination Content Outlines for PMP®, AWS, SAP, and Salesforce.</p>
            </div>

            <div className="hp-feat-card">
              <div className="hp-feat-icon"><ZapIcon /></div>
              <h3>Gen AI Modules Included</h3>
              <p>Learn ChatGPT and Claude prompt engineering for automated documentation, WBS, and risk planning.</p>
            </div>

            <div className="hp-feat-card">
              <div className="hp-feat-icon"><UsersIcon /></div>
              <h3>1-on-1 Mentor Guidance</h3>
              <p>Personalized assistance with exam application submission, audit clearance, and mock feedback.</p>
            </div>

            <div className="hp-feat-card">
              <div className="hp-feat-icon"><CheckIcon /></div>
              <h3>ATS Resume & LinkedIn SEO</h3>
              <p>Transform your resume into an ATS-compliant document that attracts global recruiters.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 5. RESUME & CAREER SERVICES BANNER ════════════════════ */}
      <section className="hp-section hp-visible">
        <div className="hp-container">
          <div className="hp-career-banner">
            <div className="hp-cb-content">
              <span className="hp-cb-tag">Career Acceleration Services</span>
              <h2>Stand Out to Global Recruiters with ATS Resume Services</h2>
              <p>
                A great certification deserves a powerful resume. Get professionally written ATS-friendly resumes, job-specific cover letters, and optimized LinkedIn profiles tailored for international job markets.
              </p>

              <div className="hp-cb-list">
                <div><CheckIcon /> 100% ATS Compatibility Guarantee</div>
                <div><CheckIcon /> Industry-Specific Keyword Optimization</div>
                <div><CheckIcon /> LinkedIn Recruiter Profile Audit</div>
              </div>

              <Link to="/services/resume-career" className="hp-btn-primary" style={{ display: "inline-flex", marginTop: "16px" }}>
                Explore Resume & LinkedIn Packages <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 6. REVIEWS & TESTIMONIALS ════════════════════ */}
      <section className="hp-section hp-bg-light hp-visible">
        <div className="hp-container">
          <div className="hp-sec-head">
            <h2>What Our Learners Say</h2>
            <p>Read real experiences from candidates who accelerated their careers with JSTechnoHub.</p>
          </div>

          <div className="hp-reviews-grid">
            {reviews.length > 0 ? (
              reviews
                .filter((r) => r.approved && r.message?.trim() !== "")
                .map((rev) => (
                  <div key={rev.id} className="hp-rev-card">
                    <StarRating rating={rev.rating || 5} />
                    <p className="hp-rev-msg">&quot;{rev.message}&quot;</p>
                    <div className="hp-rev-author">
                      <strong>— {rev.name}</strong>
                      <span>Verified Learner</span>
                    </div>
                  </div>
                ))
            ) : (
              [
                {
                  msg: "The PMP 35 Contact Hours training and situational question prep were amazing. Passed on my first attempt with Above Target!",
                  author: "Rahul Sharma",
                  role: "Senior Project Lead",
                },
                {
                  msg: "The Gen AI modules for project documentation saved me hours at work. Highly recommend JSTechnoHub!",
                  author: "Priya Nair",
                  role: "Scrum Master",
                },
                {
                  msg: "The ATS resume service completely transformed my job hunt. Got 3 interview callbacks within two weeks!",
                  author: "Vikram Malhotra",
                  role: "Cloud Specialist",
                },
              ].map((rev, i) => (
                <div key={i} className="hp-rev-card">
                  <StarRating rating={5} />
                  <p className="hp-rev-msg">&quot;{rev.msg}&quot;</p>
                  <div className="hp-rev-author">
                    <strong>— {rev.author}</strong>
                    <span>{rev.role}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="hp-btn-secondary"
              style={{ padding: "12px 24px" }}
            >
              + Share Your Review & Feedback
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════ 7. FINAL CTA ════════════════════ */}
      <section className="hp-section hp-cta-section hp-visible">
        <div className="hp-container hp-cta-box">
          <h2>Ready to Transform Your Professional Career?</h2>
          <p>
            Join thousands of successful candidates who earned global certifications and landed their dream roles.
          </p>
          <div className="hp-cta-btns">
            <Link to="/courses" className="hp-btn-primary">
              View Upcoming Batches
            </Link>
            <Link to="/services" className="hp-btn-secondary">
              Browse All 6 Service Pages
            </Link>
          </div>
        </div>
      </section>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <ReviewFormModal
          onSubmit={handleAddReview}
          onClose={() => setIsReviewModalOpen(false)}
        />
      )}
    </div>
  );
}

export default HomePage;
