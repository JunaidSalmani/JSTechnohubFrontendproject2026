import React, { useState, useEffect, useRef } from "react";
import "./ConsultingServices.css";
import PhoneInputField, { isValidPhoneNumber } from "./PhoneInputField";
import { submitConsultingEnquiry } from "../services/api";

// ── SVG ICONS ────────────────────────────────────────────────────────
const UsersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const TargetIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const ZapIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const FileTextIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const AwardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const LayersIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const HandshakeIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 17l-5-5a3 3 0 0 1 4.24-4.24L11 8.5l.76-.76a3 3 0 0 1 4.24 4.24L11 17z" />
    <path d="M14 14l3.5 3.5a2 2 0 0 0 2.83-2.83L17 11.5" />
    <path d="M7 7L3.5 10.5a2 2 0 0 0 2.83 2.83L10 9.5" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f79e1b" stroke="#f79e1b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const CheckIcon = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ── SERVICES DATA (100% AUTHENTIC) ───────────────────────────────────
const SERVICES = [
  {
    icon: <UsersIcon />,
    tag: "High Volume",
    title: "General Staffing",
    short: "Scale your workforce without scaling your overhead.",
    description:
      "Rapidly deploy vetted, job-ready talent across blue-collar, semi-skilled, and entry-level roles. We manage sourcing, screening, onboarding, and compliance — so your operations never miss a beat.",
  },
  {
    icon: <BriefcaseIcon />,
    tag: "Specialist",
    title: "Professional Staffing",
    short: "The right specialist. The right moment. Zero compromise.",
    description:
      "Access a curated network of mid-to-senior professionals across finance, IT, engineering, legal, and operations. Every candidate is assessed for role-fit, cultural alignment, and long-term performance potential.",
  },
  {
    icon: <TargetIcon />,
    tag: "Strategic",
    title: "Permanent Recruitment",
    short: "Hire once. Hire right. Build lasting organizational value.",
    description:
      "Our permanent placement practice combines executive search rigour with high-volume efficiency. We identify, attract, and place candidates who don't just fill roles — they elevate them.",
  },
  {
    icon: <ZapIcon />,
    tag: "Flexible",
    title: "RPO Lite Services",
    short: "Recruitment process power, without full-scale commitment.",
    description:
      "Plug our recruitment engine directly into your existing HR function. RPO Lite gives growing organizations access to structured hiring processes, ATS management, and sourcing expertise — modular, scalable, and cost-efficient.",
  },
  {
    icon: <TrendingUpIcon />,
    tag: "Revenue",
    title: "Field Sales & Marketing Outsourcing",
    short: "Extend your market reach without extending your headcount.",
    description:
      "We deploy trained, performance-driven field sales and marketing teams that represent your brand with precision. From territory coverage to BTL activations, we manage execution so you can focus on strategy.",
  },
  {
    icon: <FileTextIcon />,
    tag: "Compliance",
    title: "Payroll Outsourcing",
    short: "Accurate payroll. Full compliance. Zero administrative burden.",
    description:
      "Offload the complexity of payroll processing, statutory compliance, TDS, PF, ESI, and labour law obligations to our specialist team. We ensure your workforce is paid correctly and on time — every cycle, without exception.",
  },
  {
    icon: <GlobeIcon />,
    tag: "Enterprise",
    title: "Diversified Services",
    short: "One partner. Every workforce requirement.",
    description:
      "From facility management staffing and security personnel to specialized project-based teams, our Diversified Services arm handles workforce requirements that don't fit standard categories — with the same rigour as every engagement.",
  },
  {
    icon: <AwardIcon />,
    tag: "Capability",
    title: "Skills Academy",
    short: "Transform talent potential into measurable workforce capability.",
    description:
      "Our Skills Academy designs and delivers role-specific training programmes aligned to your business objectives. From induction to advanced upskilling, we build the workforce capability your organization requires for sustained performance.",
  },
  {
    icon: <HeadphonesIcon />,
    tag: "Outsourcing",
    title: "BPO Services",
    short: "Operational excellence delivered through people and process.",
    description:
      "We manage back-office and customer-facing business processes with trained teams, defined SLAs, and continuous quality controls. Our BPO delivery model reduces your operational costs while maintaining service standards your clients expect.",
  },
  {
    icon: <TrendingUpIcon />,
    tag: "Development",
    title: "Training & Skilling Solutions",
    short: "Close the skills gap before it closes your competitive edge.",
    description:
      "Structured, outcome-oriented training programmes for frontline workers, mid-management, and leadership teams. We partner with organizations to design learning journeys that produce measurable improvements in productivity, compliance, and retention.",
  },
];

const WHY_ITEMS = [
  {
    icon: <ShieldCheckIcon />,
    title: "100% Statutory Compliance",
    desc: "Every engagement is structured to meet current labour laws, PF, ESI, TDS, and contractual obligations — protecting your organization at every level.",
  },
  {
    icon: <MapPinIcon />,
    title: "Pan-India Deployment",
    desc: "Operational presence across 20+ states with local sourcing networks, regional compliance expertise, and the ability to mobilize at scale within defined timelines.",
  },
  {
    icon: <LayersIcon />,
    title: "Structured Delivery Process",
    desc: "Every mandate follows a defined SLA framework — from intake to deployment. No ambiguity, no gaps, and no surprises mid-engagement.",
  },
  {
    icon: <TrendingUpIcon />,
    title: "Data-Driven Talent Intelligence",
    desc: "We use market mapping, compensation benchmarking, and demand analytics to inform hiring decisions and give your organization a strategic advantage.",
  },
  {
    icon: <HandshakeIcon />,
    title: "Long-Term Partnership Model",
    desc: "We don't close mandates and move on. We function as an extension of your HR and operations team — invested in your workforce outcomes quarter after quarter.",
  },
  {
    icon: <AwardIcon />,
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
    initials: "RM",
  },
  {
    stars: 5,
    quote:
      "Our payroll outsourcing transition was seamless. Zero errors in the first three cycles, full statutory compliance, and the team proactively flagged a regulatory change before it could have impacted us.",
    name: "Sunita Krishnan",
    role: "CFO",
    company: "Mid-Market Logistics Group",
    initials: "SK",
  },
  {
    stars: 5,
    quote:
      "The permanent recruitment team understood our culture within the first briefing. Every shortlist they sent was relevant. We filled three senior roles in under 40 days — roles we'd been struggling with for months.",
    name: "Arjun Sharma",
    role: "Head of Talent Acquisition",
    company: "Series B Technology Company",
    initials: "AS",
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

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const step1Valid =
    firstName.trim().length >= 2 &&
    lastName.trim().length >= 2 &&
    emailRegex.test(email.trim()) &&
    company.trim().length >= 2;
  const step2Valid = isValidPhoneNumber(phone) && service && agreed;

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
      phone,
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

  if (submitted) {
    return (
      <div className="cs-modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
        <div className="cs-modal" role="dialog" aria-modal="true">
          <div className="cs-modal-success">
            <div className="cs-success-icon-wrap">
              <CheckIcon className="cs-success-icon" />
            </div>
            <h3>Enquiry Received Successfully</h3>
            {referenceNumber && (
              <p className="cs-ref-badge">
                Reference ID: <strong>{referenceNumber}</strong>
              </p>
            )}
            <p className="cs-success-text">
              A member of our enterprise consulting team will review your requirement and connect with you
              within one business day to schedule a detailed briefing call.
            </p>
            <button className="cs-btn-primary" onClick={onClose} style={{ marginTop: 12 }}>
              Close Window
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cs-modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="cs-modal" role="dialog" aria-modal="true" aria-label="Business Enquiry">
        <div className="cs-modal-header">
          <div className="cs-modal-header-text">
            <h3>Enterprise Workforce Enquiry</h3>
            <p>Our consulting leads respond within one business day.</p>
            <div className="cs-modal-steps">
              <div className={`cs-modal-step-pill ${formStep === 1 ? "active" : "done"}`}>
                <span className="cs-modal-step-dot" />
                {formStep > 1 ? "✓ " : ""}1. Organisation Details
              </div>
              <div className="cs-modal-step-divider" />
              <div className={`cs-modal-step-pill ${formStep === 2 ? "active" : ""}`}>
                <span className="cs-modal-step-dot" />
                2. Requirement &amp; Contact
              </div>
            </div>
          </div>
          <button className="cs-modal-close" onClick={onClose} aria-label="Close">
            <CloseIcon />
          </button>
        </div>

        {/* Step 1 */}
        {formStep === 1 && (
          <>
            <div className="cs-modal-body">
              <div className="cs-form-row">
                <div className="cs-form-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <label>First Name *</label>
                </div>
                <div className="cs-form-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                  <label>Last Name *</label>
                </div>
              </div>

              <div className="cs-form-group">
                <input
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label>Work Email *</label>
              </div>

              <div className="cs-form-row">
                <div className="cs-form-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    required
                  />
                  <label>Organisation Name *</label>
                </div>
                <div className="cs-form-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                  <label>Your Designation</label>
                </div>
              </div>
            </div>

            <div className="cs-modal-nav">
              <div className="cs-modal-nav-info">
                <strong>Step 1 of 2</strong> · Handled with strict enterprise confidentiality.
              </div>
              <button
                type="button"
                className="cs-btn-primary"
                onClick={() => setFormStep(2)}
                disabled={!step1Valid}
              >
                Continue to Step 2 →
              </button>
            </div>
          </>
        )}

        {/* Step 2 */}
        {formStep === 2 && (
          <form onSubmit={handleSubmit}>
            <div className="cs-modal-body">
              <PhoneInputField
                name="phone"
                label="Direct Contact Number *"
                value={phone}
                onChange={(val) => setPhone(val)}
                required
              />

              <div className="cs-form-row">
                <div className="cs-form-group">
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                  >
                    <option value="" disabled>Select a service</option>
                    {SERVICES.map((s) => (
                      <option key={s.title}>{s.title}</option>
                    ))}
                  </select>
                  <label>Service Required *</label>
                </div>
                <div className="cs-form-group">
                  <select
                    value={positions}
                    onChange={(e) => setPositions(e.target.value)}
                  >
                    <option value="" disabled>Select positions range</option>
                    <option>1 – 10</option>
                    <option>10 – 50</option>
                    <option>50 – 200</option>
                    <option>200 – 500</option>
                    <option>500+</option>
                  </select>
                  <label>Estimated Positions</label>
                </div>
              </div>

              <div className="cs-form-row">
                <div className="cs-form-group">
                  <input
                    type="text"
                    placeholder=" "
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <label>Location / City of Deployment</label>
                </div>
                <div className="cs-form-group">
                  <select
                    value={heardFrom}
                    onChange={(e) => setHeardFrom(e.target.value)}
                  >
                    <option value="" disabled>Select referral source</option>
                    <option>Google Search</option>
                    <option>LinkedIn</option>
                    <option>Industry Referral</option>
                    <option>Conference / Event</option>
                    <option>Existing Relationship</option>
                    <option>Other</option>
                  </select>
                  <label>How Did You Find Us?</label>
                </div>
              </div>

              <div className="cs-form-group">
                <textarea
                  placeholder=" "
                  maxLength={1000}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    setMsgLen(e.target.value.length);
                  }}
                />
                <label>Requirement Brief / Role Specifications</label>
              </div>
              <p className="cs-char-counter">{msgLen}/1000</p>

              <div className="cs-form-check">
                <input
                  type="checkbox"
                  id="cs-agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  required
                />
                <label htmlFor="cs-agree">
                  I agree to the <a href="/terms">Terms of Service</a> and{" "}
                  <a href="/privacy">Privacy Policy</a>. *
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
                  Keep me informed with quarterly workforce intelligence &amp; compliance reports.
                </label>
              </div>

              {apiError && (
                <div className="cs-form-error">
                  ✕ {apiError}
                </div>
              )}
            </div>

            <div className="cs-modal-nav">
              <button
                type="button"
                className="cs-btn-back"
                onClick={() => {
                  setFormStep(1);
                  setApiError("");
                }}
              >
                ← Back
              </button>
              <button
                type="submit"
                className="cs-btn-primary"
                disabled={loading || !step2Valid}
              >
                {loading ? "Submitting Mandate…" : "Submit Enterprise Enquiry →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

// ─── MAIN CONSULTING SERVICES PAGE ──────────────────────────────────────────
const ConsultingServicesPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [defaultService, setDefault] = useState("");

  const openModal = (service = "") => {
    setDefault(service);
    setShowModal(true);
  };

  return (
    <div className="cs-page">
      {/* ── 1. HERO SECTION ── */}
      <section className="cs-hero-section">
        <div className="app-container">
          <div className="cs-hero-grid">
            <div className="cs-hero-copy">
              <div className="cs-hero-badge">
                <span className="cs-badge-dot" />
                Enterprise Workforce Solutions · Pan-India Deployment
              </div>

              <h1 className="cs-hero-title">
                Delivering the Right Talent, <br />
                <span className="cs-text-gradient">at Scale, on Time.</span>
              </h1>

              <p className="cs-hero-desc">
                End-to-end staffing, recruitment, payroll, and outsourcing solutions engineered for
                enterprises that demand statutory compliance, proven capability, and rapid mobilization.
              </p>

              <div className="cs-hero-actions">
                <button className="cs-btn-primary" onClick={() => openModal()}>
                  Submit Business Enquiry →
                </button>
                <button
                  className="cs-btn-ghost"
                  onClick={() =>
                    document.getElementById("cs-solutions")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Solutions ↓
                </button>
              </div>

              <div className="cs-hero-trust-tag">
                <AwardIcon />
                <span>Trusted by 500+ enterprises across BFSI, FMCG, Manufacturing &amp; IT/ITeS</span>
              </div>
            </div>

            <div className="cs-hero-stats-panel">
              <div className="cs-stat-card">
                <div className="cs-stat-num">50K<sup>+</sup></div>
                <div className="cs-stat-label">Professionals Deployed Annually</div>
              </div>
              <div className="cs-stat-card">
                <div className="cs-stat-num">98<sup>%</sup></div>
                <div className="cs-stat-label">Statutory Compliance SLA Rate</div>
              </div>
              <div className="cs-stat-card">
                <div className="cs-stat-num">20<sup>+</sup></div>
                <div className="cs-stat-label">States with Active Operations</div>
              </div>
              <div className="cs-stat-card">
                <div className="cs-stat-num">72<sup>hr</sup></div>
                <div className="cs-stat-label">Average Mobilization Turnaround</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INDUSTRIES SERVED RIBBON ── */}
      <section className="cs-industries-ribbon">
        <div className="app-container">
          <div className="cs-ribbon-inner">
            <span className="cs-ribbon-title">Industries Served:</span>
            <div className="cs-industry-chips">
              {INDUSTRY_CHIPS.map((chip) => (
                <span key={chip} className="cs-ind-chip">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SOLUTIONS GRID ── */}
      <section className="cs-section" id="cs-solutions">
        <div className="app-container">
          <div className="cs-section-head">
            <span className="cs-kicker">Core Capabilities</span>
            <h2>Comprehensive Workforce Solutions</h2>
            <p>
              From high-volume contract staffing to specialist executive search, payroll compliance,
              and skills development — engineered to handle the full spectrum of your human capital requirements.
            </p>
          </div>

          <div className="cs-services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className="cs-service-card">
                <div className="cs-card-topbar">
                  <div className="cs-card-icon-wrap">{s.icon}</div>
                  <span className="cs-card-tag">{s.tag}</span>
                </div>
                <h3>{s.title}</h3>
                <p className="cs-card-short">{s.short}</p>
                <p className="cs-card-desc">{s.description}</p>
                <button
                  className="cs-card-link-btn"
                  onClick={() => openModal(s.title)}
                >
                  Enquire for this service →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. WHY CHOOSE US (6 PILLARS) ── */}
      <section className="cs-section cs-bg-alt">
        <div className="app-container">
          <div className="cs-section-head">
            <span className="cs-kicker">Enterprise Standards</span>
            <h2>Why Organizations Partner With Us</h2>
            <p>
              We do not operate as a transactional vendor. Every engagement is structured as an executive
              partnership — with defined accountability, statutory compliance, and measurable outcomes.
            </p>
          </div>

          <div className="cs-why-grid">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="cs-why-card">
                <div className="cs-why-num">0{i + 1}</div>
                <div className="cs-why-icon-wrap">{item.icon}</div>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CLIENT OUTCOMES / TESTIMONIALS ── */}
      <section className="cs-section">
        <div className="app-container">
          <div className="cs-section-head">
            <span className="cs-kicker">Proven Track Record</span>
            <h2>Verified Client Outcomes</h2>
            <p>
              Results validated by HR heads, CFOs, and operations leaders who rely on JSTechnoHub for
              mission-critical workforce mandates.
            </p>
          </div>

          <div className="cs-testimonials-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="cs-testimonial-card">
                <div className="cs-testi-stars">
                  {[...Array(t.stars)].map((_, sIdx) => (
                    <StarIcon key={sIdx} />
                  ))}
                </div>
                <blockquote className="cs-testi-quote">"{t.quote}"</blockquote>
                <div className="cs-testi-author">
                  <div className="cs-author-avatar">{t.initials}</div>
                  <div className="cs-author-meta">
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                    <span className="cs-author-company">{t.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. ENGAGEMENT MODEL (4 STEPS) ── */}
      <section className="cs-section cs-bg-alt">
        <div className="app-container">
          <div className="cs-section-head">
            <span className="cs-kicker">Delivery Framework</span>
            <h2>Our Structured Engagement Model</h2>
            <p>
              Every mandate follows a disciplined framework — ensuring transparency, predictable delivery,
              and seamless SLA governance regardless of scale.
            </p>
          </div>

          <div className="cs-steps-grid">
            {STEPS.map((s, i) => (
              <div key={i} className="cs-step-card">
                <div className="cs-step-badge">{s.n}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA BANNER ── */}
      <section className="cs-cta-section">
        <div className="app-container">
          <div className="cs-cta-card">
            <div className="cs-cta-copy">
              <h2>Ready to Build a High-Performing Workforce?</h2>
              <p>
                Submit an enquiry and a senior consulting advisor will connect with you within one business day
                to discuss your mandate specifications in detail.
              </p>
            </div>
            <div className="cs-cta-action">
              <button className="cs-btn-primary" onClick={() => openModal()}>
                Submit Business Enquiry →
              </button>
              <span className="cs-cta-guarantee">
                <CheckIcon /> Dedicated Account Director assigned to each enterprise client
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. MODAL ── */}
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
