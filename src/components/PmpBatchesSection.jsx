import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, verifyPayment, submitCertificationEnquiry } from "../services/api";
import PhoneInputField, { getPhoneValidationError } from "./PhoneInputField";
import "./PmpBatchesSection.css";

// ── SVG ICONS ────────────────────────────────────────────────────────
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/*
const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
*/

const CheckIcon = ({ className = "" }) => (
  <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="#f79e1b" stroke="#f79e1b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ChevronDownIcon = ({ open }) => (
  <svg className={`pmp-chev ${open ? "pmp-chev-open" : ""}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const AwardIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const LockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ── BATCH DATA (Commented out per client request) ──────────────────────────────────
/*
const DEFAULT_BATCHES = [
  {
    id: 86483,
    dates: "Sep 26 - Oct 18",
    monthName: "Sep 2026",
    timing: "07:00 AM - 11:30 AM IST",
    timingType: "Morning Batch",
    dayType: "Weekend Batch | 8 Sessions",
    trainer: "JSTechnoHub Senior PMP® Trainer",
    venue: "Live Virtual Class",
    mrp: 19999,
    price: 9999,
    discount: "50% OFF",
  },
  {
    id: 86940,
    dates: "Oct 10 - Nov 01",
    monthName: "Oct 2026",
    timing: "07:00 PM - 11:30 PM IST",
    timingType: "Evening Batch",
    dayType: "Weekend Batch | 8 Sessions",
    trainer: "JSTechnoHub Certified Lead Coach",
    venue: "Live Virtual Class",
    mrp: 19999,
    price: 9999,
    discount: "50% OFF",
  },
  {
    id: 86484,
    dates: "Oct 24 - Nov 15",
    monthName: "Oct 2026",
    timing: "07:00 AM - 11:30 AM IST",
    timingType: "Morning Batch",
    dayType: "Weekend Batch | 8 Sessions",
    trainer: "JSTechnoHub Senior PMP® Trainer",
    venue: "Live Virtual Class",
    mrp: 19999,
    price: 9999,
    discount: "50% OFF",
  },
  {
    id: 86485,
    dates: "Nov 07 - Nov 29",
    monthName: "Nov 2026",
    timing: "07:00 PM - 11:30 PM IST",
    timingType: "Evening Batch",
    dayType: "Weekend Batch | 8 Sessions",
    trainer: "JSTechnoHub Senior PMP® Trainer",
    venue: "Live Virtual Class",
    mrp: 19999,
    price: 9999,
    discount: "50% OFF",
  },
];
*/

// ── PRICING PLANS ────────────────────────────────────────────────────
const PLANS = [
  {
    id: "basic",
    name: "Self-Paced Course",
    badge: "Recorded Video Learning",
    price: 4999,
    mrp: 9999,
    popular: false,
    features: [
      "Recorded HD Video Lectures",
      "1,000+ Practice Exam Questions",
      "Digital Study Notes & Cheat Sheets",
      "Course Completion Certificate",
      "Email Query Support",
    ],
  },
  {
    id: "standard",
    name: "Pro Pass (Live Cohort)",
    badge: "35 Contact Hours Included",
    price: 9999,
    mrp: 19999,
    popular: true,
    features: [
      "35 Contact Hours Certificate (PMI® Mandatory)",
      "Live Interactive Instructor-Led Classes",
      "Gen AI Modules for Modern Project Managers",
      "1,500+ Practice Exam Question Bank",
      "PMP® Application Guidance & Audit Support",
      "HD Class Recordings Access",
    ],
  },
  {
    id: "master",
    name: "Career Master Kit",
    badge: "All-Inclusive + PMI Exam Fee",
    price: 35400,
    mrp: 79999,
    popular: false,
    features: [
      "Everything in Pro Live Cohort Plan",
      "Official PMI® Membership Included",
      "Official PMP® Exam Fee Voucher Covered",
      "1-on-1 Dedicated PMP® Mentor Coaching",
      "Guaranteed Exam Retake Support",
      "100% Application Clearance Guarantee",
    ],
  },
];

// ── CURRICULUM DATA ─────────────────────────────────────────────────
const CURRICULUM = [
  {
    number: "01",
    title: "Business Environment & Project Initiation",
    domain: "Business Environment",
    weight: "8% Exam Weight",
    hours: "4 Hours",
    description: "Align enterprise initiatives with corporate governance, regulatory standards, and strategic business value realization.",
    topics: [
      "PMI® Alignment & PMP® Examination Content Outline (ECO) 2026",
      "Organizational Culture, Strategic Value & Project Charters",
      "Evaluating Business Case, Cost-Benefit Analysis & Feasibility",
      "Enterprise Environmental Factors (EEFs) & Organizational Process Assets (OPAs)",
      "Regulatory Compliance & Project Governance Models",
    ],
    deliverable: "Official Project Charter & Business Case Matrix",
    tools: "Business Case Matrix, Governance Audit Checklist",
  },
  {
    number: "02",
    title: "People Management & High-Performing Teams",
    domain: "People Domain",
    weight: "42% Exam Weight",
    hours: "10 Hours",
    description: "Master leadership dynamics, emotional intelligence, team agreements, and remote/hybrid collaboration protocols.",
    topics: [
      "Building and Organizing High-Performing Project Teams",
      "Servant Leadership, Emotional Intelligence (EQ) & Mentorship",
      "Conflict Resolution Strategies & Negotiating Project Agreements",
      "Empowering Team Members & Active Stakeholder Engagement",
      "Managing Virtual/Hybrid Communication Channels",
    ],
    deliverable: "Team Working Agreement & Stakeholder RACI Matrix",
    tools: "RACI Framework, Conflict Management Protocol",
  },
  {
    number: "03",
    title: "Process Execution & Scope Management",
    domain: "Process Domain",
    weight: "50% Exam Weight",
    hours: "6 Hours",
    description: "Structure requirements gathering, Work Breakdown Structures (WBS), and deliverable sign-offs without scope creep.",
    topics: [
      "Scope Planning, Requirements Gathering & Backlog Grooming",
      "Work Breakdown Structure (WBS) & WBS Dictionary Creation",
      "Managing Scope Creep, Scope Baseline & Change Control Boards (CCB)",
      "Deliverable Verification & Formal Acceptance Criteria",
      "Continuous Improvement & Phase-Gate Review Milestones",
    ],
    deliverable: "Full WBS Decomposition & Requirements Traceability Matrix",
    tools: "WBS Schedule Pro, Confluence Requirements Board",
  },
  {
    number: "04",
    title: "Schedule, Cost & Earned Value Management",
    domain: "Process Domain",
    weight: "50% Exam Weight",
    hours: "6 Hours",
    description: "Master Critical Path Method (CPM), schedule compression, budget forecasting, and all essential EVM calculations.",
    topics: [
      "Critical Path Method (CPM), Float Analysis & Precedence Diagramming",
      "Schedule Compression Techniques: Fast-Tracking & Crashing",
      "Cost Estimation, Contingency Reserves & Cost Baseline",
      "Earned Value Management (EVM): CPI, SPI, CV, SV, EAC, ETC",
      "Financial Variance Reporting & Project Completion Forecasting",
    ],
    deliverable: "CPM Network Diagram & Complete EVM Financial Calculator",
    tools: "MS Project, EVM Simulation Model, Float Calculators",
  },
  {
    number: "05",
    title: "Quality, Risk & Procurement Management",
    domain: "Process Domain",
    weight: "50% Exam Weight",
    hours: "5 Hours",
    description: "Implement qualitative and quantitative risk analysis, quality assurance audits, and vendor contract negotiations.",
    topics: [
      "Qualitative & Quantitative Risk Assessment (Probability & Impact)",
      "Risk Mitigation Planning, Residual Risks & Contingency Reserves",
      "Quality Assurance Standards, Audits & Continuous Quality Control",
      "Procurement Planning, RFP Generation & Vendor Scorecards",
      "Contract Types: Firm Fixed Price (FFP), Time & Material (T&M), Cost-Plus",
    ],
    deliverable: "Enterprise Risk Register & Procurement SOW Document",
    tools: "Probability-Impact Matrix, Vendor Evaluation Scorecard",
  },
  {
    number: "06",
    title: "Agile, Scrum & Hybrid Frameworks",
    domain: "Agile & Hybrid",
    weight: "50% Exam Weight",
    hours: "6 Hours",
    description: "Gain hands-on command over Scrum ceremonies, Kanban workflows, user story estimation, and Hybrid lifecycle models.",
    topics: [
      "Agile Manifesto, 12 Core Principles & Mindset Transformation",
      "Scrum Ceremonies: Sprint Planning, Daily Standups, Reviews & Retros",
      "Kanban Boards, WIP Limits, Cycle Time & Lead Time Optimization",
      "User Story Writing, Story Points & Fibonacci Estimation",
      "Hybrid Project Management: Blending Waterfall with Agile Sprints",
    ],
    deliverable: "Sprint Backlog, Burndown Charts & Hybrid Release Roadmap",
    tools: "Jira Agile, Trello Kanban Boards, Miro Sprint Canvas",
  },
  {
    number: "07",
    title: "Gen AI Modules for Modern Project Managers",
    domain: "2026 Executive Special",
    weight: "Executive Masterclass",
    hours: "4 Hours",
    description: "Leverage Generative AI, prompt engineering, and automated reporting to accelerate project workflows tenfold.",
    topics: [
      "ChatGPT & Claude Prompt Engineering for Project Managers",
      "Automated WBS Generation, Risk Registers & Charters with AI",
      "AI-Powered Stakeholder Communication & Executive Status Reports",
      "Predictive Trend Analysis & Variance Reporting using LLMs",
      "Ethical AI Governance, IP Security & Data Privacy in Enterprise PM",
    ],
    deliverable: "JSTechnoHub Gen AI PM Prompt Library & Automation Vault",
    tools: "ChatGPT Plus, Claude 3.7, PMI Infinity AI Assistant",
  },
];

// ── FAQS DATA ────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "What is PMP® certification and why is it valuable?",
    a: "The Project Management Professional (PMP)® is the world's leading project management certification issued by PMI®. It validates your ability to lead projects using Predictive (Waterfall), Agile, and Hybrid methodologies.",
  },
  {
    q: "What are the 35 Contact Hours and how are they provided?",
    a: "PMI® mandates 35 contact hours of formal project management education before applying for the exam. JSTechnoHub provides an official, verifiable 35 Contact Hours Certificate upon completing our live training.",
  },
  {
    q: "What are the eligibility requirements for the PMP® exam?",
    a: "Option 1: A 4-year degree + 36 months of project leading experience + 35 contact hours. Option 2: High school diploma / associate degree + 60 months of project leading experience + 35 contact hours.",
  },
  {
    q: "Are the Gen AI modules included in the course?",
    a: "Yes! We integrate hands-on Gen AI workflows (ChatGPT, Claude, AI prompt engineering for project managers) to help you automate status reports, WBS, and risk logs.",
  },
  {
    q: "Does JSTechnoHub assist with the PMP® exam application and audit?",
    a: "Yes, our certified mentors review your project experience descriptions and provide step-by-step guidance to ensure 100% audit clearance.",
  },
  {
    q: "How does enrollment and payment work?",
    a: "You can select your preferred batch and enroll directly via Razorpay checkout using UPI, Credit/Debit cards, NetBanking, or EMI options.",
  },
  {
    q: "What if I miss a live session?",
    a: "All live classes are recorded in HD and uploaded to your student portal within 24 hours with revision access.",
  },
  {
    q: "Can I switch batches if my work schedule changes?",
    a: "Yes, JSTechnoHub provides free batch flexibility. You can transfer to another morning or evening weekend batch at zero additional charge.",
  },
];

const PmpBatchesSection = () => {
  const navigate = useNavigate();

  // Interactive Curriculum Explorer State
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  // Accordion FAQ State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Full-Width Registration / Checkout View State
  const [isCheckoutView, setIsCheckoutView] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]);
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Integrated Contact & Counseling Form State
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "Ready to Certify (3-5 Years Project Experience)",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);
  const [contactPhoneError, setContactPhoneError] = useState("");

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    setIsCheckoutView(true);
    setErrorMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!contactForm.name.trim() || contactForm.name.trim().length < 2) {
      setContactStatus("Please enter your full name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactForm.email.trim())) {
      setContactStatus("Please enter a valid work email address.");
      return;
    }
    const pErr = getPhoneValidationError(contactForm.phone);
    if (pErr) {
      setContactPhoneError(pErr);
      return;
    }

    setContactLoading(true);
    setContactStatus(null);
    try {
      await submitCertificationEnquiry({
        name: contactForm.name,
        email: contactForm.email,
        phone: contactForm.phone,
        certificationName: "Project Management Professional (PMP)® Certification",
        message: `Candidate Experience Level: ${contactForm.experience}. Message/Goal: ${contactForm.message || "Requesting PMP syllabus, fee breakdown, and schedule counseling."}`,
      });
      setContactStatus("success");
      setContactForm({
        name: "",
        email: "",
        phone: "",
        experience: "Ready to Certify (3-5 Years Project Experience)",
        message: "",
      });
      setContactPhoneError("");
    } catch {
      setContactStatus("Failed to submit enquiry. Please call us directly at +91 87430 39914 or chat on WhatsApp.");
    } finally {
      setContactLoading(false);
    }
  };

  const scrollToPlans = () => {
    const el = document.getElementById("pmp-pricing-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    const el = document.getElementById("pmp-contact-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!userData.name.trim() || userData.name.trim().length < 2) {
      setErrorMsg("Please enter a valid full name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    const phoneErr = getPhoneValidationError(userData.phone);
    if (phoneErr) {
      setErrorMsg(phoneErr);
      return;
    }

    setIsProcessing(true);
    setErrorMsg("");

    try {
      const orderRes = await createOrder({
        amount: selectedPlan.price,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      });

      const orderData = orderRes.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_REaS1BheNXdkjC",
        amount: orderData.amount,
        currency: orderData.currency || "INR",
        name: "JSTechnoHub",
        description: `PMP® Training - ${selectedPlan.name}`,
        order_id: orderData.id,
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.phone,
        },
        theme: {
          color: "#0a0f1d",
        },
        handler: async function (response) {
          try {
            await verifyPayment({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });
            setIsCheckoutView(false);
            setIsProcessing(false);
            navigate("/payment-success");
          } catch (err) {
            console.error(err);
            setErrorMsg("Payment verification failed. Please contact support.");
            setIsProcessing(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      setErrorMsg("Failed to initiate checkout. Please try again or call support.");
      setIsProcessing(false);
    }
  };



  return (
    <div className="pmp-page-wrap">
      {isCheckoutView ? (
        /* ════════════════════ 1. FULL-WIDTH CHECKOUT SCREEN ════════════════════ */
        <section className="pmp-checkout-section">
          <div className="app-container">
            <div className="pmp-co-topbar">
              <button className="pmp-co-back-btn" onClick={() => setIsCheckoutView(false)}>
                <ArrowLeftIcon /> Back to Program Overview
              </button>
              <span className="pmp-co-step-badge">Candidate Registration Form</span>
            </div>

            <div className="pmp-co-header">
              <h2>PMP® Course Registration &amp; Enrollment</h2>
              <p>Complete your candidate registration details below to enroll in your selected training plan.</p>
            </div>

            <div className="pmp-co-grid">
              {/* Left Column: Plan Card */}
              <div className="pmp-co-col-left">
                {/* Batch Information Card (Commented out per request)
                <div className="pmp-co-card">
                  <div className="pmp-co-card-head">
                    <div className="pmp-co-head-icon">
                      <CalendarIcon />
                    </div>
                    <div>
                      <span className="pmp-co-card-sub">Selected Batch Schedule</span>
                      <h3>Upcoming Live Batch (PMP Prep)</h3>
                    </div>
                  </div>

                  <div className="pmp-co-details-grid">
                    <div className="pmp-co-detail-item">
                      <span className="pmp-co-d-label">Class Timing</span>
                      <span className="pmp-co-d-val"><ClockIcon /> 07:00 AM - 11:30 AM IST</span>
                    </div>
                    <div className="pmp-co-detail-item">
                      <span className="pmp-co-d-label">Slot Format</span>
                      <span className="pmp-co-d-val">Weekend Batch | 8 Sessions</span>
                    </div>
                    <div className="pmp-co-detail-item">
                      <span className="pmp-co-d-label">Lead Instructor</span>
                      <span className="pmp-co-d-val"><UserIcon /> JSTechnoHub Senior PMP® Trainer</span>
                    </div>
                    <div className="pmp-co-detail-item">
                      <span className="pmp-co-d-label">Venue</span>
                      <span className="pmp-co-d-val">Live Virtual Class</span>
                    </div>
                  </div>
                </div>
                ── */}

                {/* Plan Customizer */}
                <div className="pmp-co-card">
                  <div className="pmp-co-card-head">
                    <div className="pmp-co-head-icon" style={{ background: "var(--brand-red-light)", color: "var(--brand-red)" }}>
                      <AwardIcon />
                    </div>
                    <div>
                      <span className="pmp-co-card-sub">Selected Training Plan</span>
                      <h3>{selectedPlan.name}</h3>
                    </div>
                    <span className="pmp-co-plan-price-tag">₹{selectedPlan.price.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="pmp-co-plan-options">
                    {PLANS.map((plan) => (
                      <div
                        key={plan.id}
                        className={`pmp-co-plan-opt ${selectedPlan.id === plan.id ? "pmp-co-plan-opt--active" : ""}`}
                        onClick={() => setSelectedPlan(plan)}
                      >
                        <div className="pmp-co-radio-dot" />
                        <div className="pmp-co-opt-info">
                          <span className="pmp-co-opt-name">{plan.name}</span>
                          <span className="pmp-co-opt-price">₹{plan.price.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pmp-co-plan-features">
                    <p className="pmp-co-feat-head">Plan Inclusions:</p>
                    <ul>
                      {selectedPlan.features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <CheckIcon className="pmp-pc-check" /> {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Student Form & Payment */}
              <div className="pmp-co-col-right">
                <div className="pmp-co-card pmp-co-checkout-form-card">
                  <h3>Candidate Registration Form</h3>
                  <p className="pmp-co-form-sub">Enter your details to generate your enrollment invoice and proceed to payment.</p>

                  <form onSubmit={handlePaymentSubmit} className="pmp-co-form">
                    {errorMsg && <div className="pmp-m-error">{errorMsg}</div>}

                    <div className="fl-field">
                      <input
                        type="text"
                        required
                        placeholder=" "
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                      />
                      <label>Full Name *</label>
                    </div>

                    <div className="fl-field">
                      <input
                        type="email"
                        required
                        placeholder=" "
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      />
                      <label>Work Email *</label>
                    </div>

                    <PhoneInputField
                      name="phone"
                      label="WhatsApp Number *"
                      value={userData.phone}
                      onChange={(val) => {
                        setUserData({ ...userData, phone: val });
                        if (errorMsg) setErrorMsg("");
                      }}
                      error={errorMsg && errorMsg.toLowerCase().includes("whatsapp") ? errorMsg : ""}
                      required
                    />

                    {/* Price Breakdown */}
                    <div className="pmp-co-summary-box">
                      <div className="pmp-co-sum-row">
                        <span>{selectedPlan.name} Standard Tuition</span>
                        <span>₹{selectedPlan.mrp.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="pmp-co-sum-row pmp-co-discount-row">
                        <span>Limited Cohort Discount</span>
                        <span>-₹{(selectedPlan.mrp - selectedPlan.price).toLocaleString("en-IN")}</span>
                      </div>
                      <div className="pmp-co-sum-row pmp-co-total-row">
                        <span>Total Payable Amount</span>
                        <span className="pmp-co-total-amt">₹{selectedPlan.price.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <button type="submit" className="pmp-btn-co-pay" disabled={isProcessing}>
                      <LockIcon /> {isProcessing ? "Connecting to Razorpay..." : `Pay ₹${selectedPlan.price.toLocaleString("en-IN")} via Razorpay`}
                    </button>

                    <div className="pmp-co-trust-row">
                      <span><LockIcon /> 256-Bit SSL Secured</span>
                      <span>Razorpay Verified</span>
                      <span>Instant LMS Access</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ════════════════════ 2. STANDARD PMP EXECUTIVE LANDING PAGE ════════════════════ */
        <>
          {/* ── 1. HERO SECTION ── */}
          <section className="pmp-hero">
            <div className="app-container">
              <div className="pmp-hero-content">
                <div className="pmp-hero-pill">
                  <span className="pmp-pill-dot" />
                  PMI® Authorized Training Partner · 35 Contact Hours Included
                </div>

                <h1 className="pmp-hero-headline">
                  PMP® Certification Training <br />
                  <span className="pmp-text-gradient">with Gen AI Modules &amp; Exam Prep</span>
                </h1>

                <p className="pmp-hero-description">
                  Master Predictive, Agile, and Hybrid project management aligned with official PMI® ECO 2026.
                  Includes 35 formal Contact Hours, 1,500+ practice questions, and 100% audit support.
                </p>

                <div className="pmp-hero-proof-row">
                  <div className="pmp-proof-chip">
                    <div className="pmp-stars">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} />
                      ))}
                    </div>
                    <strong>4.9 / 5</strong>
                    <span>(1,200+ Certified)</span>
                  </div>
                  <div className="pmp-proof-divider" />
                  <div className="pmp-proof-chip">
                    <ClockIcon />
                    <span>35 Mandatory Contact Hours</span>
                  </div>
                  <div className="pmp-proof-divider" />
                  <div className="pmp-proof-chip">
                    <AwardIcon />
                    <span>100% Audit Clearance Guarantee</span>
                  </div>
                </div>

                <div className="pmp-hero-buttons">
                  <button className="pmp-btn-primary" onClick={scrollToPlans}>
                    <span>Choose Plan &amp; Register Now&nbsp;→</span>
                  </button>
                  <button className="pmp-btn-secondary" onClick={scrollToContact}>
                    Speak to Advisor &amp; Get Syllabus ↓
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ── 2. TRUST HIGHLIGHTS BAR ── */}
          <section className="pmp-trust-bar">
            <div className="app-container pmp-tb-grid">
              <div className="pmp-tb-item">
                <CheckIcon className="pmp-tb-check" />
                <span><strong>35 Contact Hours</strong> Verifiable Certificate</span>
              </div>
              <div className="pmp-tb-item">
                <CheckIcon className="pmp-tb-check" />
                <span><strong>1,500+ Situational</strong> Mock Questions</span>
              </div>
              <div className="pmp-tb-item">
                <CheckIcon className="pmp-tb-check" />
                <span><strong>Gen AI Prompting</strong> for Modern PMs</span>
              </div>
              <div className="pmp-tb-item">
                <CheckIcon className="pmp-tb-check" />
                <span><strong>100% Application</strong> &amp; Audit Support</span>
              </div>
            </div>
          </section>

          {/* ── 3. UPCOMING BATCHES (Commented out per request) ──
          <section id="pmp-batches-schedule-section" className="pmp-content-section">
            <div className="app-container">
              <div className="pmp-section-head">
                <span className="pmp-kicker">Interactive Live Training</span>
                <h2>Upcoming Training Batches</h2>
                <p>Choose your weekend cohort schedule and secure your seat with instant checkout, or request details below.</p>

                <div className="pmp-filter-bar">
                  <div className="pmp-fb-group">
                    <span className="pmp-fb-label">Month:</span>
                    {availableMonths.map((m) => (
                      <button
                        key={m}
                        className={`pmp-filter-pill ${selectedMonth === m ? "pmp-filter-pill--active" : ""}`}
                        onClick={() => setSelectedMonth(m)}
                      >
                        {m}
                      </button>
                    ))}
                  </div>

                  <div className="pmp-fb-group">
                    <span className="pmp-fb-label">Slot:</span>
                    {["All", "Morning Batch", "Evening Batch"].map((t) => (
                      <button
                        key={t}
                        className={`pmp-filter-pill ${selectedTiming === t ? "pmp-filter-pill--active" : ""}`}
                        onClick={() => setSelectedTiming(t)}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pmp-schedule-grid">
                <div className="pmp-schedule-col">
                  {filteredBatches.map((b) => (
                    <div key={b.id} className="pmp-batch-card">
                      <div className="pmp-bc-main">
                        <div className="pmp-bc-topline">
                          <span className="pmp-venue-pill">
                            <span className="pmp-pulse-dot" />
                            {b.venue}
                          </span>
                          <span className="pmp-slot-pill">{b.timingType}</span>
                        </div>

                        <div className="pmp-bc-dates">{b.dates}</div>

                        <div className="pmp-bc-meta-row">
                          <span className="pmp-bc-meta-item"><ClockIcon /> {b.timing}</span>
                          <span className="pmp-bc-meta-item"><CalendarIcon /> {b.dayType}</span>
                          <span className="pmp-bc-meta-item"><UserIcon /> {b.trainer}</span>
                        </div>
                      </div>

                      <div className="pmp-bc-action">
                        <div className="pmp-price-stack">
                          <div className="pmp-discount-wrap">
                            <span className="pmp-save-tag">{b.discount}</span>
                            <span className="pmp-mrp-val">₹{b.mrp.toLocaleString("en-IN")}</span>
                          </div>
                          <div className="pmp-active-price">
                            <span className="pmp-curr">₹</span>
                            <span className="pmp-amt">{b.price.toLocaleString("en-IN")}</span>
                          </div>
                        </div>

                        <button className="pmp-btn-enroll-card" onClick={() => handleEnroll(b)}>
                          Enroll Now →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pmp-enquiry-col">
                  <div className="pmp-enquiry-box">
                    <div className="pmp-eq-header">
                      <h3>Need Batch Guidance?</h3>
                      <p>Connect with a Senior Academic Advisor for schedule flexibility and fee details.</p>
                    </div>

                    {enquiryStatus === "success" ? (
                      <div className="pmp-eq-success">
                        <CheckIcon className="pmp-eq-check-icon" />
                        <h4>Enquiry Submitted!</h4>
                        <p>Our program advisor will reach out on WhatsApp/Email within 2 business hours.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleEnquirySubmit} className="pmp-eq-form">
                        {enquiryStatus && enquiryStatus !== "success" && (
                          <div className="pmp-eq-error">
                            {enquiryStatus === "error"
                              ? "Error submitting enquiry. Please check your details."
                              : enquiryStatus}
                          </div>
                        )}

                        <div className="pmp-input-group">
                          <input
                            type="text"
                            required
                            placeholder=" "
                            value={enquiryForm.name}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                          />
                          <label>Full Name *</label>
                        </div>

                        <div className="pmp-input-group">
                          <input
                            type="email"
                            required
                            placeholder=" "
                            value={enquiryForm.email}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                          />
                          <label>Work Email *</label>
                        </div>

                        <PhoneInputField
                          name="phone"
                          label="WhatsApp Number *"
                          value={enquiryForm.phone}
                          onChange={handleEnquiryPhoneChange}
                          error={phoneError}
                          required
                        />

                        <div className="pmp-input-group">
                          <select
                            value={enquiryForm.goal}
                            onChange={(e) => setEnquiryForm({ ...enquiryForm, goal: e.target.value })}
                          >
                            <option value="PMP Training">PMP® Live Certification Training</option>
                            <option value="Corporate Training">Corporate Team Training</option>
                            <option value="Custom Schedule">Custom Schedule / 1-on-1 Mentorship</option>
                          </select>
                          <label>Program Interest</label>
                        </div>

                        <button type="submit" className="pmp-btn-enquiry-submit" disabled={enquiryLoading}>
                          {enquiryLoading ? "Submitting..." : "Get Syllabus & Fee Quote →"}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
          ── */}

          {/* ── 4. CHOOSE YOUR TRAINING PLAN ── */}
          <section id="pmp-pricing-section" className="pmp-content-section pmp-section-alt">
            <div className="app-container">
              <div className="pmp-section-head">
                <span className="pmp-kicker">Transparent Tuition</span>
                <h2>Choose Your Training Plan</h2>
                <p>Select the learning tier that matches your career objectives and examination timeline.</p>
              </div>

              <div className="pmp-pricing-grid">
                {PLANS.map((plan) => (
                  <div key={plan.id} className={`pmp-plan-tier ${plan.popular ? "pmp-plan-tier--popular" : ""}`}>
                    {plan.popular && <span className="pmp-popular-ribbon">MOST POPULAR</span>}

                    <div className="pmp-tier-head">
                      <h3>{plan.name}</h3>
                      <span className="pmp-tier-sub">{plan.badge}</span>
                    </div>

                    <div className="pmp-tier-pricing">
                      <span className="pmp-tier-mrp">₹{plan.mrp.toLocaleString("en-IN")}</span>
                      <div className="pmp-tier-price">
                        <span className="pmp-tier-curr">₹</span>
                        <span className="pmp-tier-amount">{plan.price.toLocaleString("en-IN")}</span>
                      </div>
                    </div>

                    <ul className="pmp-tier-features">
                      {plan.features.map((f, fIdx) => (
                        <li key={fIdx}>
                          <CheckIcon className="pmp-tier-check" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      className={`pmp-btn-tier-select ${selectedPlan.id === plan.id ? "pmp-btn-tier-select--active" : ""}`}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      Register Now →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 5. OFFICIAL COURSE CURRICULUM (INTERACTIVE EXPLORER) ── */}
          <section id="pmp-curriculum-section" className="pmp-content-section">
            <div className="app-container">
              <div className="pmp-section-head">
                <span className="pmp-kicker">PMI® ECO 2026 Aligned</span>
                <h2>Official Course Curriculum &amp; Learning Roadmap</h2>
                <p>Interactive 7-module syllabus covering Predictive, Agile, Hybrid, and Gen AI project workflows.</p>
              </div>

              <div className="pmp-curriculum-explorer">
                {/* Left Column: Module Navigation Tabs */}
                <div className="pmp-curr-nav">
                  <div className="pmp-curr-nav-title">7 In-Depth Modules</div>
                  {CURRICULUM.map((mod, idx) => {
                    const isActive = activeModuleIndex === idx;
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`pmp-curr-tab ${isActive ? "pmp-curr-tab--active" : ""}`}
                        onClick={() => setActiveModuleIndex(idx)}
                      >
                        <span className="pmp-curr-tab-num">{mod.number}</span>
                        <div className="pmp-curr-tab-meta">
                          <span className="pmp-curr-tab-domain">{mod.domain}</span>
                          <span className="pmp-curr-tab-title">{mod.title}</span>
                        </div>
                        <span className="pmp-curr-tab-arrow">{isActive ? "●" : "→"}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Column: Active Module Showcase Panel */}
                <div className="pmp-curr-showcase">
                  <div className="pmp-curr-sc-header">
                    <div className="pmp-curr-sc-badges">
                      <span className="pmp-curr-sc-num">Module {CURRICULUM[activeModuleIndex].number}</span>
                      <span className="pmp-curr-sc-domain">{CURRICULUM[activeModuleIndex].domain}</span>
                      <span className="pmp-curr-sc-weight">{CURRICULUM[activeModuleIndex].weight}</span>
                    </div>
                    <h3 className="pmp-curr-sc-title">{CURRICULUM[activeModuleIndex].title}</h3>
                    <p className="pmp-curr-sc-desc">{CURRICULUM[activeModuleIndex].description}</p>
                  </div>

                  <div className="pmp-curr-sc-body">
                    <h4 className="pmp-curr-sc-subhead">Key Competencies &amp; Syllabus Covered:</h4>
                    <ul className="pmp-curr-topics-grid">
                      {CURRICULUM[activeModuleIndex].topics.map((t, tIdx) => (
                        <li key={tIdx} className="pmp-curr-topic-item">
                          <CheckIcon className="pmp-curr-topic-check" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pmp-curr-sc-highlights">
                      <div className="pmp-curr-hl-item">
                        <span className="pmp-curr-hl-label">Practical Deliverable:</span>
                        <span className="pmp-curr-hl-val">{CURRICULUM[activeModuleIndex].deliverable}</span>
                      </div>
                      <div className="pmp-curr-hl-item">
                        <span className="pmp-curr-hl-label">Tools &amp; Frameworks:</span>
                        <span className="pmp-curr-hl-val">{CURRICULUM[activeModuleIndex].tools}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pmp-curr-sc-footer">
                    <div className="pmp-curr-sc-duration">
                      <ClockIcon />
                      <span>{CURRICULUM[activeModuleIndex].hours} of Live Training Included</span>
                    </div>
                    <button type="button" className="pmp-btn-curr-enquire" onClick={scrollToContact}>
                      Enquire About This Module →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 6. ELIGIBILITY & 35 CONTACT HOURS CERTIFICATE ── */}
          <section className="pmp-content-section pmp-section-alt">
            <div className="app-container">
              <div className="pmp-cert-wrapper">
                <div className="pmp-cert-banner">
                  <div className="pmp-cert-badge-icon">
                    <AwardIcon />
                  </div>
                  <div className="pmp-cert-copy">
                    <h3>PMI® Authorized 35 Contact Hours Certificate</h3>
                    <p>
                      Receive an official, verifiable digital certificate upon completing live classes and assignments,
                      enabling you to apply directly on PMI.org with 100% application audit protection.
                    </p>
                  </div>
                </div>

                <div className="pmp-eligibility-grid">
                  <div className="pmp-elig-box">
                    <span className="pmp-elig-track">Eligibility Path A</span>
                    <h4>Four-Year Degree Holders</h4>
                    <ul>
                      <li><CheckIcon className="pmp-elig-check" /> 36 months of project leading experience</li>
                      <li><CheckIcon className="pmp-elig-check" /> 35 Contact Hours of Project Management training (Included)</li>
                    </ul>
                  </div>

                  <div className="pmp-elig-box">
                    <span className="pmp-elig-track">Eligibility Path B</span>
                    <h4>High School / Diploma Holders</h4>
                    <ul>
                      <li><CheckIcon className="pmp-elig-check" /> 60 months of project leading experience</li>
                      <li><CheckIcon className="pmp-elig-check" /> 35 Contact Hours of Project Management training (Included)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── 7. FREQUENTLY ASKED QUESTIONS ── */}
          <section className="pmp-content-section">
            <div className="app-container">
              <div className="pmp-section-head">
                <span className="pmp-kicker">Clear Answers</span>
                <h2>Frequently Asked Questions</h2>
                <p>Everything you need to know about PMP® exam prep, contact hours, and enrollment.</p>
              </div>

              <div className="pmp-faq-accordion">
                {FAQS.map((faq, i) => {
                  const isOpen = openFaqIndex === i;
                  return (
                    <div key={i} className={`pmp-faq-card ${isOpen ? "pmp-faq-card--open" : ""}`}>
                      <button
                        className="pmp-faq-toggle"
                        onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                      >
                        <span>{faq.q}</span>
                        <ChevronDownIcon open={isOpen} />
                      </button>
                      {isOpen && <div className="pmp-faq-answer">{faq.a}</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── 8. INTEGRATED CONTACT & ADVISORY SECTION ── */}
          <section id="pmp-contact-section" className="pmp-content-section pmp-contact-section">
            <div className="app-container">
              <div className="pmp-section-head">
                <span className="pmp-kicker">Personalized Mentorship</span>
                <h2>Speak with a Senior PMP® Advisor</h2>
                <p>Have questions about your exam eligibility, 36-month project experience, or course details? Connect with us directly.</p>
              </div>

              <div className="pmp-contact-grid">
                {/* Left Column: Direct Reach & Advisory Promise */}
                <div className="pmp-contact-info-col">
                  <div className="pmp-contact-advisor-card">
                    <div className="pmp-advisor-badge">
                      <AwardIcon />
                      <span>Certified PMP® Advisory Cell</span>
                    </div>
                    <h3>Direct Guidance from Certified Mentors</h3>
                    <p>
                      Avoid costly exam application rejections. Our PMI-certified counseling team evaluates your resume, verifies your project management hours, and helps you pass on your first attempt.
                    </p>

                    <div className="pmp-contact-methods">
                      <a href="tel:+918743039914" className="pmp-cm-item">
                        <div className="pmp-cm-icon pmp-cm-icon--phone">
                          <PhoneIcon />
                        </div>
                        <div className="pmp-cm-meta">
                          <span className="pmp-cm-label">Call Our Senior Advisor</span>
                          <span className="pmp-cm-val">+91 87430 39914</span>
                        </div>
                      </a>

                      <a
                        href="https://wa.me/918743039914?text=Hi%20JSTechnoHub%2C%20I%20am%20interested%20in%20the%20PMP%20Certification%20Training%20program."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pmp-cm-item"
                      >
                        <div className="pmp-cm-icon pmp-cm-icon--wa">
                          <WhatsAppIcon />
                        </div>
                        <div className="pmp-cm-meta">
                          <span className="pmp-cm-label">Instant WhatsApp Chat</span>
                          <span className="pmp-cm-val">+91 87430 39914 (24/7 Response)</span>
                        </div>
                      </a>

                      <a href="mailto:info@jstechnohub.com" className="pmp-cm-item">
                        <div className="pmp-cm-icon pmp-cm-icon--mail">
                          <MailIcon />
                        </div>
                        <div className="pmp-cm-meta">
                          <span className="pmp-cm-label">Official Support Desk</span>
                          <span className="pmp-cm-val">info@jstechnohub.com</span>
                        </div>
                      </a>
                    </div>

                    <div className="pmp-contact-guarantees">
                      <div className="pmp-cg-pill">
                        <CheckIcon />
                        <span>100% Free Eligibility Check</span>
                      </div>
                      <div className="pmp-cg-pill">
                        <CheckIcon />
                        <span>Audit Clearance Support</span>
                      </div>
                      <div className="pmp-cg-pill">
                        <CheckIcon />
                        <span>35 Verified Contact Hours</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Contact & Enquiry Form */}
                <div className="pmp-contact-form-col">
                  <div className="pmp-contact-form-card">
                    <div className="pmp-cf-header">
                      <h3>Request Free Counseling &amp; Syllabus</h3>
                      <p>Fill in your details below and an executive advisor will call you within 15 minutes.</p>
                    </div>

                    {contactStatus === "success" ? (
                      <div className="pmp-cf-success">
                        <div className="pmp-cf-success-icon">
                          <CheckIcon />
                        </div>
                        <h4>Thank You! Your Request is Received.</h4>
                        <p>Our senior PMP advisor will connect with you shortly via phone/WhatsApp to evaluate your eligibility and share the syllabus.</p>
                        <a
                          href="https://wa.me/918743039914?text=Hi%20JSTechnoHub%2C%20I%20just%20submitted%20the%20PMP%20counseling%20form."
                          target="_blank"
                          rel="noopener noreferrer"
                          className="pmp-btn-cf-wa"
                        >
                          <WhatsAppIcon /> Message Us on WhatsApp Right Now
                        </a>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="pmp-cf-form">
                        {contactStatus && contactStatus !== "success" && (
                          <div className="pmp-cf-error">{contactStatus}</div>
                        )}

                        <div className="fl-field">
                          <input
                            type="text"
                            required
                            placeholder=" "
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          />
                          <label>Full Name *</label>
                        </div>

                        <div className="fl-field">
                          <input
                            type="email"
                            required
                            placeholder=" "
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          />
                          <label>Work Email *</label>
                        </div>

                        <PhoneInputField
                          name="contactPhone"
                          label="WhatsApp Number *"
                          value={contactForm.phone}
                          onChange={(val) => {
                            setContactForm({ ...contactForm, phone: val });
                            if (contactPhoneError) setContactPhoneError("");
                          }}
                          error={contactPhoneError}
                          required
                        />

                        <div className="fl-field fl-select-field">
                          <select
                            value={contactForm.experience}
                            onChange={(e) => setContactForm({ ...contactForm, experience: e.target.value })}
                          >
                            <option value="Ready to Certify (3-5 Years Project Experience)">
                              Ready to Certify (3-5 Years Project Experience)
                            </option>
                            <option value="Senior PM / Lead (5+ Years Experience)">
                              Senior PM / Lead (5+ Years Experience)
                            </option>
                            <option value="Assessing Eligibility (0-3 Years Experience)">
                              Assessing Eligibility (0-3 Years Experience)
                            </option>
                            <option value="Corporate / Team Training Inquiry">
                              Corporate / Team Training Inquiry
                            </option>
                          </select>
                          <label>Project Experience Level</label>
                        </div>

                        <div className="fl-field fl-textarea-field">
                          <textarea
                            rows="3"
                            placeholder=" "
                            value={contactForm.message}
                            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          />
                          <label>Questions or Specific Goals (Optional)</label>
                        </div>

                        <button type="submit" className="pmp-btn-cf-submit" disabled={contactLoading}>
                          {contactLoading ? "Submitting Request..." : "Request Free Counseling & Syllabus →"}
                        </button>

                        <div className="pmp-cf-trust-note">
                          <LockIcon />
                          <span>100% Confidential · Zero Spam Guarantee · Instant Callback</span>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default PmpBatchesSection;
