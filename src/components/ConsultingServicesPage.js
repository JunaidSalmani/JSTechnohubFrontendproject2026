import React, { useState, useEffect, useRef } from "react";
import "./ConsultingServices.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { submitConsultingEnquiry } from "../services/api"; 


const SERVICES = [
  {
    icon: "👥",
    tag: "High Volume",
    title: "General Staffing",
    short: "Scale your workforce without scaling your overhead.",
    description:
      "Rapidly deploy vetted, job-ready talent across blue-collar, semi-skilled, and entry-level roles. We manage sourcing, screening, onboarding, and compliance — so your operations never miss a beat.",
  },
  {
    icon: "🎓",
    tag: "Specialist",
    title: "Professional Staffing",
    short: "The right specialist. The right moment. Zero compromise.",
    description:
      "Access a curated network of mid-to-senior professionals across finance, IT, engineering, legal, and operations. Every candidate is assessed for role-fit, cultural alignment, and long-term performance potential.",
  },
  {
    icon: "🔗",
    tag: "Strategic",
    title: "Permanent Recruitment",
    short: "Hire once. Hire right. Build lasting organizational value.",
    description:
      "Our permanent placement practice combines executive search rigour with high-volume efficiency. We identify, attract, and place candidates who don't just fill roles — they elevate them.",
  },
  {
    icon: "⚡",
    tag: "Flexible",
    title: "RPO Lite Services",
    short: "Recruitment process power, without full-scale commitment.",
    description:
      "Plug our recruitment engine directly into your existing HR function. RPO Lite gives growing organizations access to structured hiring processes, ATS management, and sourcing expertise — modular, scalable, and cost-efficient.",
  },
  {
    icon: "📣",
    tag: "Revenue",
    title: "Field Sales & Marketing Outsourcing",
    short: "Extend your market reach without extending your headcount.",
    description:
      "We deploy trained, performance-driven field sales and marketing teams that represent your brand with precision. From territory coverage to BTL activations, we manage execution so you can focus on strategy.",
  },
  {
    icon: "📋",
    tag: "Compliance",
    title: "Payroll Outsourcing",
    short: "Accurate payroll. Full compliance. Zero administrative burden.",
    description:
      "Offload the complexity of payroll processing, statutory compliance, TDS, PF, ESI, and labour law obligations to our specialist team. We ensure your workforce is paid correctly and on time — every cycle, without exception.",
  },
  {
    icon: "🌐",
    tag: "Enterprise",
    title: "Diversified Services",
    short: "One partner. Every workforce requirement.",
    description:
      "From facility management staffing and security personnel to specialized project-based teams, our Diversified Services arm handles workforce requirements that don't fit standard categories — with the same rigour as every engagement.",
  },
  {
    icon: "🏛️",
    tag: "Capability",
    title: "Skills Academy",
    short: "Transform talent potential into measurable workforce capability.",
    description:
      "Our Skills Academy designs and delivers role-specific training programmes aligned to your business objectives. From induction to advanced upskilling, we build the workforce capability your organization requires for sustained performance.",
  },
  {
    icon: "🖥️",
    tag: "Outsourcing",
    title: "BPO Services",
    short: "Operational excellence delivered through people and process.",
    description:
      "We manage back-office and customer-facing business processes with trained teams, defined SLAs, and continuous quality controls. Our BPO delivery model reduces your operational costs while maintaining service standards your clients expect.",
  },
  {
    icon: "📈",
    tag: "Development",
    title: "Training & Skilling Solutions",
    short: "Close the skills gap before it closes your competitive edge.",
    description:
      "Structured, outcome-oriented training programmes for frontline workers, mid-management, and leadership teams. We partner with organizations to design learning journeys that produce measurable improvements in productivity, compliance, and retention.",
  },
];

const WHY_ITEMS = [
  {
    icon: "✅",
    title: "100% Statutory Compliance",
    desc: "Every engagement is structured to meet current labour laws, PF, ESI, TDS, and contractual obligations — protecting your organization at every level.",
  },
  {
    icon: "🌍",
    title: "Pan-India Deployment",
    desc: "Operational presence across 20+ states with local sourcing networks, regional compliance expertise, and the ability to mobilize at scale within defined timelines.",
  },
  {
    icon: "⚙️",
    title: "Structured Delivery Process",
    desc: "Every mandate follows a defined SLA framework — from intake to deployment. No ambiguity, no gaps, and no surprises mid-engagement.",
  },
  {
    icon: "📊",
    title: "Data-Driven Talent Intelligence",
    desc: "We use market mapping, compensation benchmarking, and demand analytics to inform hiring decisions and give your organization a strategic advantage.",
  },
  {
    icon: "🤝",
    title: "Long-Term Partnership Model",
    desc: "We don't close mandates and move on. We function as an extension of your HR and operations team — invested in your workforce outcomes quarter after quarter.",
  },
  {
    icon: "🏆",
    title: "Domain Depth Across Industries",
    desc: "Dedicated practice heads for BFSI, manufacturing, FMCG, IT/ITeS, retail, and infrastructure ensure you receive counsel from genuine sector specialists.",
  },
];

const TESTIMONIALS = [
  {
    stars: 5,
    quote:
      "They mobilized 340 contractual staff across four states within 18 days of mandate confirmation. The compliance documentation was flawless. We've extended the contract for a third consecutive year.",
    name: "Rajiv Menon",
    role: "VP — Human Resources",
    company: "Fortune 500 FMCG",
    avatar: "👨🏽‍💼",
    bg: "linear-gradient(135deg, #0B2545, #1C3A5E)",
  },
  {
    stars: 5,
    quote:
      "Our payroll outsourcing transition was seamless. Zero errors in the first three cycles, full statutory compliance, and the team proactively flagged a regulatory change before it could have impacted us.",
    name: "Sunita Krishnan",
    role: "CFO",
    company: "Mid-Market Logistics Group",
    avatar: "👩🏽‍💼",
    bg: "linear-gradient(135deg, #0B1628, #1A3A6B)",
  },
  {
    stars: 5,
    quote:
      "The permanent recruitment team understood our culture within the first briefing. Every shortlist they sent was relevant. We filled three senior roles in under 40 days — roles we'd been struggling with for months.",
    name: "Arjun Sharma",
    role: "Head of Talent Acquisition",
    company: "Series B Technology Company",
    avatar: "👨🏻‍💼",
    bg: "linear-gradient(135deg, #0B2D2A, #0F4C43)",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Mandate Briefing",
    desc: "A structured intake session with your HR or operations lead to define scope, timelines, compliance requirements, and success criteria.",
  },
  {
    n: "02",
    title: "Solution Design",
    desc: "We map the right service model, sourcing strategy, and SLA framework to your specific requirement — no off-the-shelf solutions.",
  },
  {
    n: "03",
    title: "Execution & Deployment",
    desc: "Screened, verified, and compliant candidates or managed teams are deployed within agreed timelines with full documentation.",
  },
  {
    n: "04",
    title: "Ongoing Account Management",
    desc: "Dedicated account managers, periodic performance reviews, and compliance audits ensure the engagement delivers continuously.",
  },
];

const INDUSTRY_CHIPS = [
  "BFSI",
  "Manufacturing",
  "FMCG",
  "IT / ITeS",
  "Retail",
  "Logistics",
  "Infrastructure",
  "Healthcare",
  "Telecom",
  "E-Commerce",
  "Pharma",
  "Auto & EV",
];

// ─── 2-STEP ENQUIRY MODAL ─────────────────────────────────────────────────────

const EnquiryModal = ({ onClose, defaultService = "" }) => {
  const [formStep, setFormStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [msgLen, setMsgLen] = useState(0);
  const overlayRef = useRef(null);

  // Step 1
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  // Step 2
  const [phone, setPhone] = useState("");
  const [positions, setPositions] = useState("");
  const [service, setService] = useState(defaultService);
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const [heardFrom, setHeardFrom] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const step1Valid =
    firstName.trim() && lastName.trim() && email.trim() && company.trim();
  const step2Valid = phone.trim() && service && agreed;

  // ─── CHANGED: real API call ───────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setApiError("");


    const payload = {
      firstName,
      lastName,
      email,
      company,
      jobTitle: jobTitle || undefined,
      phone, // react-phone-input-2: "919876543210" (no +)
      serviceRequired: service,
      positionsRange: positions || undefined,
      requirementLocation: location || undefined,
      message: message || undefined,
      heardFrom: heardFrom || undefined,
      termsAccepted: agreed,
      
    };

    try {
      const response = await submitConsultingEnquiry(payload);
      
      const data = response.data;
      setReferenceNumber(data?.referenceNumber || "");
      setSubmitted(true);
    } catch (err) {

      const serverMsg =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again or call us directly.";
      setApiError(serverMsg);
    } finally {
      setLoading(false);
    }
  };
  // ─────────────────────────────────────────────────────────

  const stepLabel = (n, label) => (
    <div
      className={`cs-modal-step-pill ${formStep === n ? "active" : formStep > n ? "done" : ""}`}
    >
      <span className="cs-modal-step-dot" />
      {formStep > n ? "✓ " : ""}
      {label}
    </div>
  );

  // ── Success screen ────────────────────────────────────────
  if (submitted) {
    return (
      <div
        className="cs-modal-overlay"
        ref={overlayRef}
        onClick={handleOverlayClick}
      >
        <div className="cs-modal" role="dialog" aria-modal="true">
          <div className="cs-modal-success">
            <div className="cs-success-icon">✅</div>
            <h3>Enquiry Received</h3>
            {referenceNumber && (
              <p
                style={{
                  fontSize: 13,
                  color: "#c9a84c",
                  fontWeight: 600,
                  margin: "4px 0 12px",
                }}
              >
                Reference Number: {referenceNumber}
              </p>
            )}
            <p>
              A member of our team will review your requirement and contact you
              within one business day to schedule a detailed briefing call.
            </p>
            <button
              className="btn-primary"
              onClick={onClose}
              style={{ marginTop: 8 }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="cs-modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className="cs-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Business Enquiry"
      >
        {/* Header — unchanged */}
        <div className="cs-modal-header">
          <div className="cs-modal-header-text">
            <h3>Business Enquiry</h3>
            <p>Our team responds within one business day.</p>
            <div className="cs-modal-steps">
              {stepLabel(1, "Organisation Details")}
              <div className="cs-modal-step-divider" />
              {stepLabel(2, "Requirement & Contact")}
            </div>
          </div>
          <button
            className="cs-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Step 1 — unchanged */}
        {formStep === 1 && (
          <>
            <div className="cs-modal-body">
              <div className="cs-form-row">
                <div className="cs-form-group">
                  <label>
                    First Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="Rajiv"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="cs-form-group">
                  <label>
                    Last Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="Menon"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="cs-form-group">
                <label>
                  Business Email <sup>*</sup>
                </label>
                <input
                  type="email"
                  placeholder="rajiv@organisation.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="cs-form-row">
                <div className="cs-form-group">
                  <label>
                    Organisation Name <sup>*</sup>
                  </label>
                  <input
                    type="text"
                    placeholder="Company / Group Name"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                </div>
                <div className="cs-form-group">
                  <label>Your Designation</label>
                  <input
                    type="text"
                    placeholder="VP – HR, CHRO, COO…"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="cs-modal-form-nav">
              <div className="cs-modal-form-nav-left">
                <strong>Step 1 of 2 — Organisation Details</strong>
                All information is handled with strict confidentiality.
              </div>
              <div className="cs-modal-form-nav-right">
                <button
                  className="btn-next"
                  onClick={() => setFormStep(2)}
                  disabled={!step1Valid}
                >
                  Continue →
                </button>
              </div>
            </div>
          </>
        )}

        {/* Step 2 — only handleSubmit changed */}
        {formStep === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="cs-modal-body">
              <div className="cs-form-group">
                <label>
                  Contact Number <sup>*</sup>
                </label>
                <div className="cs-phone-input-container">
                  <PhoneInput
                    country="in"
                    value={phone}
                    onChange={(value) => setPhone(value)}
                    enableSearch
                    searchPlaceholder="Search country…"
                    searchNotFound="No country found"
                    placeholder="98765 43210"
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoComplete: "tel",
                    }}
                  />
                </div>
              </div>

              <div className="cs-form-row">
                <div className="cs-form-group">
                  <label>
                    Service Required <sup>*</sup>
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div className="cs-form-group">
                  <label>Number of Positions</label>
                  <select
                    value={positions}
                    onChange={(e) => setPositions(e.target.value)}
                  >
                    <option value="" disabled>
                      Select range
                    </option>
                    <option>1 – 10</option>
                    <option>10 – 50</option>
                    <option>50 – 200</option>
                    <option>200 – 500</option>
                    <option>500+</option>
                  </select>
                </div>
              </div>

              <div className="cs-form-row">
                <div className="cs-form-group">
                  <label>Location of Requirement</label>
                  <input
                    type="text"
                    placeholder="City / State / Pan-India"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="cs-form-group">
                  <label>How did you find us?</label>
                  <select
                    value={heardFrom}
                    onChange={(e) => setHeardFrom(e.target.value)}
                  >
                    <option value="" disabled>
                      Select option
                    </option>
                    <option>Google Search</option>
                    <option>LinkedIn</option>
                    <option>Industry Referral</option>
                    <option>Conference / Event</option>
                    <option>Existing Relationship</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="cs-form-group">
                <label>Requirement Brief</label>
                <textarea
                  placeholder="Describe your workforce requirement — roles, timelines, industry context, any specific compliance or location considerations…"
                  maxLength={1000}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setMsgLen(e.target.value.length);
                  }}
                />
              </div>
              <p className="cs-char-count">{msgLen}/1000</p>

              <div className="cs-form-check">
                <input
                  type="checkbox"
                  id="cs-agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <label htmlFor="cs-agree">
                  I have read and accepted the <a href="/terms">Terms of Use</a>
                  , <a href="/privacy">Privacy Policy</a> and{" "}
                  <a href="/policy">Cookie Policy</a>.{" "}
                  <sup style={{ color: "#e84545" }}>*</sup>
                </label>
              </div>
              <div className="cs-form-check">
                <input
                  type="checkbox"
                  id="cs-updates"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                />
                <label htmlFor="cs-updates">
                  Keep me informed about workforce insights, regulatory updates,
                  and industry reports.
                </label>
              </div>

              {/* ── API error — shown below checkboxes ── */}
              {apiError && (
                <div
                  style={{
                    marginTop: 12,
                    padding: "10px 14px",
                    background: "rgba(232,69,69,.09)",
                    border: "1px solid rgba(232,69,69,.28)",
                    borderRadius: 8,
                    color: "#e84545",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  ✗ {apiError}
                </div>
              )}
            </div>

            <div className="cs-modal-form-nav">
              <div className="cs-modal-form-nav-left">
                <strong>🔒 Strictly Confidential</strong>
                Your requirement details are never shared with third parties.
              </div>
              <div className="cs-modal-form-nav-right">
                <button
                  type="button"
                  className="btn-back"
                  onClick={() => {
                    setFormStep(1);
                    setApiError("");
                  }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                  disabled={loading || !step2Valid}
                >
                  {loading ? "Submitting…" : "Submit Enquiry →"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ─── MAIN PAGE — completely unchanged ────────────────────────────────────────

const ConsultingServicesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [defaultService, setDefault] = useState("");

  const openModal = (service = "") => {
    setDefault(service);
    setShowModal(true);
  };

  return (
    <div className="cs-page">
      <section className="cs-hero">
        <div className="cs-hero-inner">
          <div className="cs-hero-content">
            <div className="cs-hero-eyebrow">Workforce Solutions Partner</div>
            <h1>
              Delivering the right
              <br />
              talent, <em>at scale,</em>
              <br />
              on time.
            </h1>
            <p className="cs-hero-desc">
              End-to-end staffing, recruitment, payroll, and outsourcing
              solutions built for organizations that demand compliance,
              capability, and speed — without compromise.
            </p>
            <div className="cs-hero-actions">
              <button className="btn-primary" onClick={() => openModal()}>
                Business Enquiry
              </button>
              <button
                className="btn-ghost"
                onClick={() =>
                  document
                    .getElementById("cs-services")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Our Solutions ↓
              </button>
            </div>
            <div className="cs-hero-trust">
              <div className="cs-hero-trust-avatars">
                <span>👩🏽</span>
                <span>👨🏻</span>
                <span>🧑🏾</span>
              </div>
              <div className="cs-hero-trust-text">
                <strong>Trusted by 500+ enterprises</strong> across BFSI, FMCG,
                Manufacturing & IT sectors
              </div>
            </div>
          </div>
          <div className="cs-hero-visual">
            <div className="cs-stat-row">
              <div className="cs-stat-card">
                <div className="cs-stat-num">
                  50K<sup>+</sup>
                </div>
                <div className="cs-stat-label">
                  Professionals deployed annually
                </div>
              </div>
              <div className="cs-stat-card">
                <div className="cs-stat-num">
                  98<sup>%</sup>
                </div>
                <div className="cs-stat-label">Statutory compliance rate</div>
              </div>
            </div>
            <div className="cs-stat-row">
              <div className="cs-stat-card">
                <div className="cs-stat-num">
                  20<sup>+</sup>
                </div>
                <div className="cs-stat-label">
                  States with active operations
                </div>
              </div>
              <div className="cs-stat-card">
                <div className="cs-stat-num">
                  72<sup>hr</sup>
                </div>
                <div className="cs-stat-label">
                  Average mobilization turnaround
                </div>
              </div>
            </div>
            <div className="cs-stat-row">
              <div className="cs-stat-card wide">
                <div className="cs-stat-icon">🏆</div>
                <div>
                  <div className="cs-stat-num">Fortune 500</div>
                  <div className="cs-stat-label">
                    clients across 12 industries in our portfolio
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="cs-trust-strip">
        <span className="cs-trust-strip-label">Industries Served</span>
        <div className="cs-trust-chips">
          {INDUSTRY_CHIPS.map((t) => (
            <span key={t} className="cs-trust-chip">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="cs-services-outer" id="cs-services">
        <section className="cs-section">
          <div className="cs-section-header">
            <div className="cs-section-label">Our Solutions</div>
            <h2>
              Comprehensive workforce solutions for every stage of your business
            </h2>
            <p className="cs-section-sub">
              From high-volume contract staffing to specialist permanent
              recruitment, payroll outsourcing, and skills development — we are
              structured to handle the full spectrum of your workforce
              requirements.
            </p>
          </div>
          <div className="cs-services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="cs-service-card">
                <div className="cs-service-card-accent-bar" />
                <div className="cs-service-card-top">
                  <div className="cs-service-icon-wrap">{s.icon}</div>
                  <span className="cs-service-tag">{s.tag}</span>
                </div>
                <h3>{s.title}</h3>
                <p className="cs-service-short">{s.short}</p>
                <p>{s.description}</p>
                <button
                  className="cs-service-link"
                  onClick={() => openModal(s.title)}
                >
                  Enquire now →
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="cs-why-outer">
        <div className="cs-why-inner">
          <div className="cs-section-header">
            <div className="cs-section-label">Why Choose Us</div>
            <h2>
              Built for enterprise demands. Structured for long-term
              partnership.
            </h2>
            <p className="cs-section-sub">
              We do not operate as a transactional vendor. Every client
              relationship is structured as a strategic partnership — with
              defined accountability, documented processes, and measurable
              outcomes.
            </p>
          </div>
          <div className="cs-why-grid">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="cs-why-item">
                <div className="cs-why-item-num">0{i + 1}</div>
                <span className="cs-why-icon">{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="cs-testimonials-outer">
        <section className="cs-section">
          <div className="cs-section-header">
            <div className="cs-section-label">Client Outcomes</div>
            <h2>What our clients say.</h2>
            <p className="cs-section-sub">
              Results verified by HR heads, CFOs, and operations leaders from
              organizations that have relied on us for workforce-critical
              mandates.
            </p>
          </div>
          <div className="cs-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="cs-testimonial-card">
                <div className="cs-testimonial-stars">
                  {"★".repeat(t.stars)}
                </div>
                <blockquote>"{t.quote}"</blockquote>
                <div className="cs-testimonial-author">
                  <div
                    className="cs-testimonial-avatar"
                    style={{ background: t.bg }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div className="cs-testimonial-name">{t.name}</div>
                    <div className="cs-testimonial-role">{t.role}</div>
                    <span className="cs-testimonial-company">{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="cs-process-outer">
        <section className="cs-section">
          <div className="cs-section-header">
            <div className="cs-section-label">Our Engagement Model</div>
            <h2>A structured process from mandate to measurable outcome</h2>
            <p className="cs-section-sub">
              Every client engagement follows the same rigorous framework —
              ensuring consistency, transparency, and predictable delivery
              regardless of scale.
            </p>
          </div>
          <div className="cs-process-steps">
            <div className="cs-process-line" />
            {STEPS.map((s, i) => (
              <div key={i} className="cs-step">
                <div className="cs-step-num">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="cs-cta-outer">
        <div className="cs-cta-banner">
          <div className="cs-cta-glow" />
          <div className="cs-cta-glow-2" />
          <div className="cs-cta-banner-content">
            <h2>
              Ready to build a workforce that
              <br />
              <span>performs at every level?</span>
            </h2>
            <p>
              Submit an enquiry and a senior account manager will contact you
              within one business day to discuss your requirement in detail. No
              obligation, no generic proposals.
            </p>
          </div>
          <div className="cs-cta-banner-actions">
            <button className="btn-primary" onClick={() => openModal()}>
              Submit Business Enquiry
            </button>
            <p className="cs-cta-slots">
              <strong>Dedicated account managers</strong> assigned to every
              client
            </p>
          </div>
        </div>
      </div>

      {showModal && (
        <EnquiryModal
          onClose={() => setShowModal(false)}
          defaultService={defaultService}
        />
      )}
    </div>
  );
};

export default ConsultingServicesPage;
