import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { getAllCourses, getAllBatches } from "../services/api";
import "./CoursesPage.css";

// ── SVG ICONS ────────────────────────────────────────────────────────
const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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

const FrameworkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const UsersIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f79e1b" stroke="#f79e1b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ── CORE PLATFORM COURSES (EXISTING SERVICES & CURRICULUM) ───────────
const CORE_COURSES = [
  {
    id: "pmp",
    title: "PMI® PMP® Certification Prep Masterclass",
    category: "Management",
    tag: "35 Contact Hours Included",
    description: "Comprehensive PMP® Exam preparation aligned with PMI® ECO 2026. Includes 1,500+ situational practice questions, 100% audit clearance guarantee, and Gen AI prompt workflows.",
    duration: "8 Weeks (Live Virtual)",
    timings: "07:00 AM - 11:30 AM IST (Weekend)",
    price: 9999,
    originalPrice: 19999,
    rating: 4.95,
    link: "/pmp",
    popular: true,
  },
  {
    id: "sap",
    title: "SAP S/4HANA ERP (FICO, MM & SD) Specialist",
    category: "ERP & Cloud",
    tag: "Live 24/7 SAP GUI Server",
    description: "Hands-on SAP ERP implementation covering Financial Accounting (FICO), Materials Management (MM), and Sales Distribution (SD) with 24/7 remote SAP GUI server access.",
    duration: "10 Weeks (Hands-On)",
    timings: "Weekend & Evening Batches",
    price: 18499,
    originalPrice: 28000,
    rating: 4.9,
    link: "/services/sap",
    popular: true,
  },
  {
    id: "aws",
    title: "AWS Certified Solutions Architect & SysOps",
    category: "ERP & Cloud",
    tag: "100% Console Labs",
    description: "Master AWS VPC architecture, IAM security, EC2 clusters, S3 storage, RDS databases, and serverless Lambda in real AWS sandbox accounts.",
    duration: "8 Weeks (60+ Hours)",
    timings: "Sat & Sun (Flexible Timings)",
    price: 12999,
    originalPrice: 22000,
    rating: 4.88,
    link: "/services/aws",
    popular: false,
  },
  {
    id: "devops",
    title: "DevOps & CI/CD Pipeline Automation",
    category: "ERP & Cloud",
    tag: "Production Pipelines",
    description: "Build automated deployment pipelines using Docker, Kubernetes pod orchestration, Jenkins CI/CD, Terraform Infrastructure as Code (IaC), and Prometheus.",
    duration: "9 Weeks (Virtual Labs)",
    timings: "Sat & Sun 10:00 AM IST",
    price: 14999,
    originalPrice: 25000,
    rating: 4.92,
    link: "/services/devops",
    popular: false,
  },
  {
    id: "salesforce",
    title: "Salesforce Administrator & Developer (ADM 201)",
    category: "ERP & Cloud",
    tag: "Trailhead Aligned",
    description: "Learn custom object design, Flow automation, security profiles, Apex coding, and Lightning Web Components (LWC) for enterprise CRM deployment.",
    duration: "8 Weeks (Interactive)",
    timings: "Morning & Evening Options",
    price: 11999,
    originalPrice: 20000,
    rating: 4.85,
    link: "/certifications/sales-force",
    popular: false,
  },
  {
    id: "ccna",
    title: "Cisco CCNA 200-301 & Network Engineering",
    category: "Networking & Security",
    tag: "Packet Tracer Labs",
    description: "Master enterprise networking fundamentals, IP routing protocols (OSPF, BGP), VLAN switching, wireless architectures, and network automation.",
    duration: "6 Weeks (Live Interactive)",
    timings: "Weekend Batches",
    price: 8999,
    originalPrice: 16000,
    rating: 4.89,
    link: "/certifications/ccna",
    popular: false,
  },
  {
    id: "cbap",
    title: "CBAP® / CCBA® Business Analysis Masterclass",
    category: "Management",
    tag: "IIBA® BABOK® Guide v3",
    description: "Advanced business analysis framework covering requirements engineering, agile user stories, stakeholder management, and BABOK v3 exam clearance.",
    duration: "7 Weeks (Live Online)",
    timings: "Weekend Sessions",
    price: 12499,
    originalPrice: 21000,
    rating: 4.87,
    link: "/certifications/cbap",
    popular: false,
  },
  {
    id: "sql",
    title: "SQL Training: Database Design & Query Optimization",
    category: "Networking & Security",
    tag: "Database & Analytics",
    description: "From relational database design and complex joins to stored procedures, indexing, window functions, and enterprise query optimization.",
    duration: "4 Weeks (Hands-On)",
    timings: "Weekday / Weekend Batches",
    price: 5999,
    originalPrice: 10000,
    rating: 4.86,
    link: "/contact",
    popular: false,
  },
  {
    id: "java",
    title: "Java Development: Core Java, OOP & Spring Boot",
    category: "Networking & Security",
    tag: "Backend Engineering",
    description: "Master object-oriented programming, data structures, multithreading, REST APIs, and microservices architecture using Spring Boot.",
    duration: "8 Weeks (Project-Based)",
    timings: "Evening Live Batches",
    price: 9999,
    originalPrice: 18000,
    rating: 4.9,
    link: "/contact",
    popular: false,
  },
];

const CATEGORIES = ["All Courses", "Management", "ERP & Cloud", "Networking & Security"];

export default function CoursesPage() {
  const [courses, setCourses] = useState(CORE_COURSES);
  const [nextBatch, setNextBatch] = useState({
    dates: "Upcoming Weekend Batch",
    timing: "07:00 AM - 11:30 AM IST",
    timingType: "Live Virtual Class",
    price: 9999,
    discount: "50% OFF",
  });
  const [selectedCat, setSelectedCat] = useState("All Courses");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch Dynamic Courses from Admin DB
    getAllCourses()
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          const apiItems = res.data.map((c) => ({
            id: c.id,
            title: c.title,
            category: c.category || "ERP & Cloud",
            tag: c.tag || "Live Training",
            description: c.description,
            duration: c.duration || "8 Weeks",
            timings: c.timings || "Weekend Batches",
            price: c.price || 9999,
            originalPrice: c.originalPrice || Math.round((c.price || 9999) * 1.8),
            rating: 4.9,
            link: `/course/${c.id}`,
            popular: false,
          }));

          // Merge without duplicate titles
          const existing = new Set(apiItems.map((item) => item.title.toLowerCase()));
          const rest = CORE_COURSES.filter((c) => !existing.has(c.title.toLowerCase()));
          setCourses([...apiItems, ...rest]);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    // 2. Fetch Latest Batch for Live Schedule Banner
    getAllBatches()
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setNextBatch(res.data[0]);
        }
      })
      .catch(() => {});
  }, []);

  // Filtered List
  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchCat = selectedCat === "All Courses" || c.category === selectedCat;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.title.toLowerCase().includes(q) ||
        (c.description && c.description.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [courses, selectedCat, search]);

  return (
    <div className="cp-page-wrap">
      {/* ── 1. CLEAN EXECUTIVE HERO ── */}
      <section className="cp-header-hero">
        <div className="app-container">
          <div className="cp-hero-center">
            <span className="cp-badge-pill">
              <span className="cp-dot" /> ACCREDITED PROFESSIONAL CERTIFICATIONS
            </span>
            <h1 className="cp-main-title">
              Explore Our Training Courses <br />
              <span className="cp-highlight">&amp; Global Certifications</span>
            </h1>
            <p className="cp-main-desc">
              Hands-on, project-based courses and globally recognized credentials designed for the modern job market.
              Learn with certified instructors and live enterprise servers.
            </p>

            {/* Trust Chips */}
            <div className="cp-trust-row">
              <span className="cp-trust-chip">🎓 1,200+ Alumni Certified</span>
              <span className="cp-trust-chip">⭐ 4.9/5 Average Cohort Rating</span>
              <span className="cp-trust-chip">🛡️ 100% Audit Clearance Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. COMPACT UPCOMING BATCH SPOTLIGHT (NO BLOAT) ── */}
      <section className="cp-batch-bar-section">
        <div className="app-container">
          <div className="cp-batch-banner">
            <div className="cp-batch-left">
              <div className="cp-flag-tag">FLAGSHIP COHORT SCHEDULE</div>
              <h3>PMP® Certification Training — 2026 Batch</h3>
              <div className="cp-batch-details">
                <span><CalendarIcon /> {nextBatch.dates || "Upcoming Live Batch"}</span>
                <span><ClockIcon /> {nextBatch.timing || "07:00 AM - 11:30 AM IST"}</span>
                <span>📍 Live Virtual Class • 35 Contact Hours Included</span>
              </div>
            </div>

            <div className="cp-batch-right">
              <div className="cp-batch-price">
                <span className="cp-b-price">₹{nextBatch.price || 9999}</span>
                <span className="cp-b-discount">{nextBatch.discount || "50% OFF"}</span>
              </div>
              <Link to="/pmp" className="cp-btn-enroll">
                View Batch Schedule &amp; Enroll <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FILTERING & SEARCH CONTROLS ── */}
      <section className="cp-filter-bar">
        <div className="app-container cp-filter-inner">
          <div className="cp-cats">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`cp-cat-btn ${selectedCat === cat ? "cp-cat-active" : ""}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="cp-search-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search courses (e.g. PMP, SAP, AWS, SQL)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="cp-clear" onClick={() => setSearch("")}>
                &times;
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ── 4. COURSES CATALOG GRID ── */}
      <section className="cp-catalog-section">
        <div className="app-container">
          <div className="cp-catalog-header">
            <h2>Available Professional Courses</h2>
            <span className="cp-count">Showing <strong>{filtered.length}</strong> Course{filtered.length === 1 ? "" : "s"}</span>
          </div>

          {loading ? (
            <div className="cp-loading">
              <div className="cp-spin" />
              <p>Loading course catalog...</p>
            </div>
          ) : (
            <div className="cp-cards-grid">
              {filtered.map((c) => (
                <div key={c.id} className={`cp-c-card ${c.popular ? "cp-featured" : ""}`}>
                  {c.popular && <div className="cp-ribbon">Most Popular</div>}

                  <div className="cp-card-top">
                    <span className="cp-tag">{c.tag || c.category}</span>
                    <div className="cp-rating">
                      <StarIcon /> <span>{c.rating || 4.9}</span>
                    </div>
                  </div>

                  <h3 className="cp-c-title">{c.title}</h3>
                  <p className="cp-c-desc">{c.description}</p>

                  <div className="cp-c-meta">
                    <div className="cp-meta-row">
                      <ClockIcon /> <span>{c.duration}</span>
                    </div>
                    <div className="cp-meta-row">
                      <CalendarIcon /> <span>{c.timings}</span>
                    </div>
                  </div>

                  <div className="cp-c-foot">
                    <div className="cp-c-price">
                      <span className="cp-fee-label">Tuition Fee</span>
                      <div className="cp-p-row">
                        <span className="cp-curr">₹</span>
                        <span className="cp-amt">{Number(c.price).toLocaleString("en-IN")}</span>
                        {c.originalPrice && (
                          <span className="cp-strike"><s>₹{Number(c.originalPrice).toLocaleString("en-IN")}</s></span>
                        )}
                      </div>
                    </div>

                    <Link to={c.link || `/course/${c.id}`} className="cp-c-btn">
                      View Details <ArrowRightIcon />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 5. WHY LEARN WITH JSTECHNOHUB (EXISTING VALUE PROPS) ── */}
      <section className="cp-values-section">
        <div className="app-container">
          <div className="cp-sec-title">
            <span className="cp-eyebrow-text">THE JSTECHNOHUB STANDARD</span>
            <h2>Why Learn With JSTechnoHub?</h2>
          </div>

          <div className="cp-values-grid">
            <div className="cp-val-card">
              <div className="cp-val-icon">
                <AwardIcon />
              </div>
              <h3>Expert Instructors</h3>
              <p>Learn from certified coaches and industry veterans with real-world experience.</p>
            </div>

            <div className="cp-val-card">
              <div className="cp-val-icon">
                <FrameworkIcon />
              </div>
              <h3>Practical Frameworks</h3>
              <p>We focus on actionable strategies and tools you can apply immediately.</p>
            </div>

            <div className="cp-val-card">
              <div className="cp-val-icon">
                <UsersIcon />
              </div>
              <h3>Community Support</h3>
              <p>Join a vibrant community of like-minded peers for networking and support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CORPORATE TRAINING CTA (EXISTING SECTION) ── */}
      <section className="cp-corporate-cta">
        <div className="app-container">
          <div className="cp-corp-card">
            <div className="cp-corp-left">
              <span className="cp-corp-tag">FOR ENTERPRISES &amp; TEAMS</span>
              <h2>Looking for Corporate Training?</h2>
              <p>
                We offer customized training programs and workshops for teams and organizations.
                Let&apos;s discuss your needs.
              </p>
            </div>
            <Link to="/contact" className="cp-corp-btn">
              Contact Us <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
