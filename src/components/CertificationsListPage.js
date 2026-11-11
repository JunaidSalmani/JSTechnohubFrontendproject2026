import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  FaAward,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaSearch,
  FaUserTie,
  FaLaptopCode,
  FaRegCheckCircle,
  FaStar,
} from "react-icons/fa";
import "./CertificationsListPage.css";

const CERTIFICATIONS = [
  {
    id: "pmp",
    name: "Project Management Professional (PMP®)",
    shortName: "PMP®",
    vendor: "Project Management Institute (PMI®)",
    examCode: "PMI-PMP",
    category: "project-ba",
    badge: "Flagship Credential",
    badgeTone: "gold",
    path: "/certifications/pmp",
    summary:
      "The undisputed gold standard for project leadership. Master Agile, Predictive, and Hybrid frameworks under PMI Authorized Training Partners.",
    duration: "6 Weeks Cohort / 1-on-1",
    mode: "Live Interactive + Mock Engine",
    highlights: [
      "35 Contact Hours / PDUs Certificate",
      "Guaranteed Application Audit Clearance",
      "2,000+ Real-Pattern Mock Simulator",
      "People, Process & Business ECO",
    ],
  },
  {
    id: "sales-force",
    name: "Salesforce Certified Administrator & Developer",
    shortName: "Salesforce",
    vendor: "Salesforce® Ecosystem",
    examCode: "ADM-201 / CRT-101",
    category: "cloud-infra",
    badge: "High Growth CRM",
    badgeTone: "red",
    path: "/certifications/sales-force",
    summary:
      "Enterprise Salesforce configuration, custom objects, advanced Flow Builder automation, security architecture, and Lightning App deployment.",
    duration: "6 Weeks Intensive",
    mode: "Live Labs + Org Builds",
    highlights: [
      "Hands-on Developer Sandbox Orgs",
      "Automated Flow & Process Logic",
      "Official ADM-201 Blueprint Prep",
      "1-on-1 Resume & Profile Mapping",
    ],
  },
  {
    id: "ccna",
    name: "Cisco Certified Network Associate (CCNA)",
    shortName: "CCNA®",
    vendor: "Cisco® Systems",
    examCode: "200-301 CCNA",
    category: "network-sec",
    badge: "Networking Core",
    badgeTone: "navy",
    path: "/certifications/ccna",
    summary:
      "Solidify enterprise routing, switching, IPv4/IPv6 subnetting, OSPFv2, wireless architecture, and modern network automation with Python.",
    duration: "8 Weeks Hands-on",
    mode: "Packet Tracer + Physical Racks",
    highlights: [
      "Deep-dive Routing & Switching Labs",
      "Enterprise IP Services & Security",
      "RESTCONF & Network Automation",
      "Official Cisco Exam Simulators",
    ],
  },
  {
    id: "palo-alto",
    name: "Palo Alto Networks Network Security (PCNSE)",
    shortName: "Palo Alto",
    vendor: "Palo Alto Networks®",
    examCode: "PCNSE / PCCET",
    category: "network-sec",
    badge: "Next-Gen Firewall",
    badgeTone: "red",
    path: "/certifications/palo-alto",
    summary:
      "Master Next-Generation Firewalls (NGFW) powered by PAN-OS. Implement App-ID, Content-ID, User-ID, GlobalProtect VPN, and Zero Trust.",
    duration: "6 Weeks Weekend",
    mode: "Virtual Appliance Labs",
    highlights: [
      "PAN-OS 11.x Enterprise Lab Environment",
      "Decryption & Threat Prevention Policies",
      "High Availability & Panorama Centralized Mgmt",
      "PCNSE Scenario Question Bank",
    ],
  },
  {
    id: "vmware",
    name: "VMware Data Center Virtualization (VCP-DCV)",
    shortName: "VMware VCP",
    vendor: "Broadcom / VMware®",
    examCode: "2V0-21.23 (vSphere 8)",
    category: "cloud-infra",
    badge: "Enterprise DC",
    badgeTone: "navy",
    path: "/certifications/vmware",
    summary:
      "Install, configure, and manage VMware vSphere 8.x environments. Scale enterprise clusters with vSphere HA, DRS, and vSAN software-defined storage.",
    duration: "6 Weeks",
    mode: "Cloud Datacenter Lab",
    highlights: [
      "ESXi & vCenter Server Deployment",
      "vSphere HA, DRS & Distributed Switches",
      "vSAN Enterprise Storage Config",
      "Disaster Recovery & Cluster Optimization",
    ],
  },
  {
    id: "cbap",
    name: "Certified Business Analysis Professional (CBAP®)",
    shortName: "CBAP®",
    vendor: "IIBA® International",
    examCode: "IIBA-CBAP (BABOK® v3)",
    category: "project-ba",
    badge: "Elite BA Standard",
    badgeTone: "gold",
    path: "/certifications/cbap",
    summary:
      "Validate extensive business analysis acumen. Comprehensive alignment with BABOK® Guide v3 across all 6 knowledge areas and complex case analysis.",
    duration: "7 Weeks Masterclass",
    mode: "Case Study + 35 PD Hours",
    highlights: [
      "35 Pre-Approved IIBA PD Hours",
      "BABOK® Guide v3 Comprehensive Mastery",
      "Scenario & Case Study Simulators",
      "IIBA Work History & Application Review",
    ],
  },
  {
    id: "cams-training",
    name: "Certified Anti-Money Laundering Specialist (CAMS®)",
    shortName: "CAMS®",
    vendor: "ACAMS® Worldwide",
    examCode: "ACAMS-CAMS (6th Edition)",
    category: "gov-audit",
    badge: "Global AML Standard",
    badgeTone: "red",
    path: "/certifications/cams-training",
    summary:
      "The premier global credential in financial crime defense. Master FATF guidelines, customer due diligence (CDD/EDD), sanctions, and investigations.",
    duration: "6 Weeks Cohort",
    mode: "Compliance Regulatory Labs",
    highlights: [
      "FATF 40 Recommendations & USA PATRIOT Act",
      "Risk Assessment & Transaction Monitoring",
      "Red Flags & SAR/STR Filing Workflows",
      "Official ACAMS Practice Exam Drills",
    ],
  },
  {
    id: "cia-training",
    name: "Certified Internal Auditor (CIA®)",
    shortName: "CIA®",
    vendor: "The Institute of Internal Auditors (IIA®)",
    examCode: "IIA-CIA (Parts 1, 2, 3)",
    category: "gov-audit",
    badge: "Internal Audit Benchmark",
    badgeTone: "navy",
    path: "/certifications/cia-training",
    summary:
      "Globally recognized certification for internal auditors. Master IPPF standards, engagement management, enterprise risk governance, and IT controls.",
    duration: "Part-wise Modular Mentorship",
    mode: "Structured Interactive Cohort",
    highlights: [
      "IPPF Mandatory & Recommended Guidance",
      "Internal Control Frameworks (COSO/ISO)",
      "Part 1, 2 & 3 Focused Question Banks",
      "IIA Experience & Exam Application Support",
    ],
  },
  {
    id: "capm-training",
    name: "Certified Associate in Project Management (CAPM®)",
    shortName: "CAPM®",
    vendor: "Project Management Institute (PMI®)",
    examCode: "PMI-CAPM",
    category: "project-ba",
    badge: "Early Career Launch",
    badgeTone: "gold",
    path: "/certifications/capm-training",
    summary:
      "Accelerate your entry into project management. Master PMBOK® 7th Edition concepts, Agile frameworks, predictive methods, and business analysis fundamentals.",
    duration: "4 Weeks Fast-Track",
    mode: "Live Weekend Cohort",
    highlights: [
      "23 Pre-Approved Contact Hours",
      "PMBOK® 7 & Agile Practice Guide Aligned",
      "Early-Stage Career Resume Polishing",
      "Full Mock Exam Simulators Included",
    ],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Certifications" },
  { id: "project-ba", label: "Project & Business Analysis" },
  { id: "cloud-infra", label: "Cloud & Virtualization" },
  { id: "network-sec", label: "Networking & Security" },
  { id: "gov-audit", label: "Governance, AML & Audit" },
];

export default function CertificationsListPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCerts = useMemo(() => {
    return CERTIFICATIONS.filter((cert) => {
      const matchesCategory =
        selectedCategory === "all" || cert.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cert.name.toLowerCase().includes(q) ||
        cert.vendor.toLowerCase().includes(q) ||
        cert.examCode.toLowerCase().includes(q) ||
        cert.summary.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="cert-catalog-page">
      {/* ── Top Header Hero ── */}
      <section className="cert-hero">
        <div className="cert-hero-inner">
          <div className="cert-breadcrumb">
            <Link to="/">Home</Link>
            <span className="crumb-sep">/</span>
            <span className="crumb-current">Certifications Catalog</span>
          </div>

          <div className="cert-hero-badge">
            <FaAward className="cert-hero-badge-icon" />
            <span>GLOBAL PROFESSIONAL CREDENTIALS</span>
          </div>

          <h1 className="cert-hero-title">
            Industry-Recognized <span className="title-highlight">Certification</span> Programs
          </h1>

          <p className="cert-hero-desc">
            Fast-track your executive trajectory with authorized curriculum, 1-on-1 audit
            clearance, authentic mock exam simulators, and certified industry mentors across
            leading cloud, cybersecurity, governance, and project management credentials.
          </p>

          {/* Metric Bar */}
          <div className="cert-trust-bar">
            <div className="trust-item">
              <span className="trust-number">98.4%</span>
              <span className="trust-label">First-Attempt Pass Rate</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-number">5,000+</span>
              <span className="trust-label">Certified Alumni</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-number">100%</span>
              <span className="trust-label">Audit Clearance Support</span>
            </div>
            <div className="trust-divider" />
            <div className="trust-item">
              <span className="trust-number">1-on-1</span>
              <span className="trust-label">Enterprise Mentoring</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Catalog Section ── */}
      <section className="cert-main-section">
        <div className="cert-container">
          {/* Controls Bar: Category Filter + Search */}
          <div className="cert-controls-bar">
            <div className="cert-category-pills" role="tablist">
              {CATEGORIES.map((cat) => {
                const count =
                  cat.id === "all"
                    ? CERTIFICATIONS.length
                    : CERTIFICATIONS.filter((c) => c.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    className={`cat-pill${selectedCategory === cat.id ? " cat-pill-active" : ""}`}
                    onClick={() => setSelectedCategory(cat.id)}
                    role="tab"
                    aria-selected={selectedCategory === cat.id}
                  >
                    <span>{cat.label}</span>
                    <span className="cat-count">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="cert-search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search certifications (e.g. PMP, CCNA, ADM-201)..."
                aria-label="Search certifications"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Grid of Certification Cards */}
          {filteredCerts.length > 0 ? (
            <div className="cert-grid">
              {filteredCerts.map((cert) => (
                <article key={cert.id} className="cert-card">
                  <div className="cert-card-header">
                    <div className="cert-vendor-row">
                      <span className="cert-vendor-tag">{cert.vendor}</span>
                      <span className={`cert-badge-pill tone-${cert.badgeTone}`}>
                        {cert.badge}
                      </span>
                    </div>
                    <h2 className="cert-card-title">
                      <Link to={cert.path}>{cert.name}</Link>
                    </h2>
                    <div className="cert-code-tag">
                      <strong>Exam Code:</strong> {cert.examCode}
                    </div>
                  </div>

                  <p className="cert-card-summary">{cert.summary}</p>

                  <div className="cert-meta-row">
                    <div className="meta-col">
                      <FaClock className="meta-icon" />
                      <span>{cert.duration}</span>
                    </div>
                    <div className="meta-col">
                      <FaLaptopCode className="meta-icon" />
                      <span>{cert.mode}</span>
                    </div>
                  </div>

                  <div className="cert-highlights-box">
                    <div className="highlights-title">What&apos;s Included:</div>
                    <ul className="highlights-list">
                      {cert.highlights.map((h, i) => (
                        <li key={i}>
                          <FaCheckCircle className="check-icon" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="cert-card-actions">
                    <Link to={cert.path} className="btn-cert-primary">
                      <span>Explore Syllabus & Exam Details</span>
                      <FaArrowRight className="btn-arrow" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="cert-empty-state">
              <h3>No Certifications Found</h3>
              <p>
                We could not find any certifications matching &ldquo;{searchQuery}&rdquo;. Try another
                keyword or clear your filter.
              </p>
              <button
                className="btn-cert-reset"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── Why Certify With JSTechnoHub ── */}
      <section className="cert-value-section">
        <div className="cert-container">
          <div className="value-header">
            <span className="value-badge">EXECUTIVE ADVANTAGE</span>
            <h2>Why Professionals Choose JSTechnoHub for Global Certifications</h2>
            <p>
              We don&apos;t just teach theory. We equip you with the practical skills, vendor
              exam simulations, and documentation required to pass on your very first try.
            </p>
          </div>

          <div className="value-grid">
            <div className="value-card">
              <div className="value-icon-box">
                <FaShieldAlt />
              </div>
              <h3>100% Audit Clearance Assistance</h3>
              <p>
                Selected for random application audit? Our senior advisors review your project
                descriptions, align them with vendor ECOs, and assemble complete verification
                packages within 48 hours.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <FaAward />
              </div>
              <h3>Authentic Exam Simulators</h3>
              <p>
                Train inside a testing environment that accurately mirrors the real proctored exam,
                complete with detailed scenario justifications and situational decision trees.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <FaUserTie />
              </div>
              <h3>Fortune 500 Practitioner Mentors</h3>
              <p>
                Learn directly from verified practitioners holding active certifications and 12+
                years of hands-on delivery experience across Fortune 500 enterprises.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-box">
                <FaRegCheckCircle />
              </div>
              <h3>Flexible Batch Formats</h3>
              <p>
                Choose between weekend interactive cohorts, weekday evening fast-tracks, or
                bespoke 1-on-1 executive mentorship tailored to your working calendar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Direct Advisory CTA ── */}
      <section className="cert-cta-section">
        <div className="cert-container">
          <div className="cert-cta-card">
            <div className="cta-content">
              <span className="cta-badge">
                <FaStar /> FREE CAREER ROADMAP & ADVICE
              </span>
              <h2>Unsure Which Certification Accelerates Your Growth?</h2>
              <p>
                Speak 1-on-1 with a Senior Technical Certification Advisor. We evaluate your
                current experience, career targets, and suggest the exact credential path.
              </p>
            </div>
            <div className="cta-action">
              <Link to="/contact" className="btn-cta-gold">
                Schedule Advisory Call
                <FaArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
