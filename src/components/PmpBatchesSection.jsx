import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, verifyPayment, submitEnquiry, getAllBatches } from "../services/api";
import PhoneInputField, { getPhoneValidationError } from "./PhoneInputField";
import "./PmpBatchesSection.css";

// ── SVG ICONS ────────────────────────────────────────────────────────
const CalendarIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

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

// ── BATCH DATA (AUTHENTIC FALLBACK) ──────────────────────────────────
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
    topics: [
      "PMI® Alignment & PMP® Exam ECO Framework",
      "Compliance, Organizational Culture & Project Charters",
      "Evaluating Business Value, Benefits & Feasibility",
    ],
  },
  {
    number: "02",
    title: "People Management & Team Leadership",
    topics: [
      "Building High-Performing Virtual & Hybrid Teams",
      "Leadership Styles, Emotional Intelligence & Empowerment",
      "Conflict Resolution, Stakeholder Engagement & Mentoring",
    ],
  },
  {
    number: "03",
    title: "Process Execution & Scope Management",
    topics: [
      "Defining Scope, WBS & Requirements Traceability Matrix",
      "Managing Changes, Issues & Knowledge Transfer",
      "Quality Standards & Artifact Maintenance",
    ],
  },
  {
    number: "04",
    title: "Schedule, Cost & Earned Value Management (EVM)",
    topics: [
      "Critical Path Method (CPM), Fast-Tracking & Crashing",
      "Cost Estimation, Budgeting & EVM Formulas (CPI, SPI, EAC)",
      "Financial Forecasting & Variance Analysis",
    ],
  },
  {
    number: "05",
    title: "Quality, Risk & Procurement Management",
    topics: [
      "Qualitative & Quantitative Risk Assessment",
      "Risk Mitigation, Response Planning & Contingency",
      "Vendor Selection, Contract Types (FFP, T&M) & Procurements",
    ],
  },
  {
    number: "06",
    title: "Agile, Scrum & Hybrid Frameworks",
    topics: [
      "Agile Manifesto, Values & Servant Leadership",
      "Scrum Ceremonies: Sprints, Daily Standups, Reviews & Retros",
      "Kanban Boards, User Stories, Velocity & Burndown Charts",
    ],
  },
  {
    number: "07",
    title: "Gen AI Modules for Modern Project Managers",
    topics: [
      "ChatGPT & Claude Prompt Engineering for Project Management",
      "Automating Project Charters, Risk Registers & WBS Breakdown",
      "AI-Assisted Stakeholder Communication & Status Reporting",
    ],
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

  // Filter States
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedTiming, setSelectedTiming] = useState("All");

  // Accordion States
  const [openCurriculumIndex, setOpenCurriculumIndex] = useState(0);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Full-Width Checkout View State
  const [isCheckoutView, setIsCheckoutView] = useState(false);
  const [activeBatch, setActiveBatch] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(PLANS[1]);
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Quick Enquiry Form Beside Batches
  const [enquiryForm, setEnquiryForm] = useState({ name: "", email: "", phone: "", goal: "PMP Training" });
  const [enquiryStatus, setEnquiryStatus] = useState(null);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Dynamic Batches from DB or curated fallback
  const [batches, setBatches] = useState(DEFAULT_BATCHES);

  useEffect(() => {
    getAllBatches()
      .then((res) => {
        if (res.data && Array.isArray(res.data) && res.data.length > 0) {
          setBatches(res.data);
        }
      })
      .catch(() => { });
  }, []);

  const availableMonths = ["All", ...Array.from(new Set(batches.map((b) => b.monthName)))];

  const filteredBatches = batches.filter((b) => {
    const monthMatch = selectedMonth === "All" || b.monthName === selectedMonth;
    const timingMatch = selectedTiming === "All" || b.timingType === selectedTiming;
    return monthMatch && timingMatch;
  });

  const handleEnroll = (batch) => {
    setActiveBatch(batch);
    setIsCheckoutView(true);
    setErrorMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    if (!activeBatch && batches.length > 0) {
      setActiveBatch(batches[0]);
    }
    setIsCheckoutView(true);
    setErrorMsg("");
    window.scrollTo({ top: 0, behavior: "smooth" });
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

  const handleEnquiryPhoneChange = (val) => {
    setEnquiryForm((prev) => ({ ...prev, phone: val }));
    if (phoneError) setPhoneError("");
    if (enquiryStatus) setEnquiryStatus(null);
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    if (!enquiryForm.name.trim() || enquiryForm.name.trim().length < 2) {
      setEnquiryStatus("Please enter your name.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enquiryForm.email.trim())) {
      setEnquiryStatus("Please enter a valid email address.");
      return;
    }
    const pErr = getPhoneValidationError(enquiryForm.phone);
    if (pErr) {
      setPhoneError(pErr);
      return;
    }

    setEnquiryLoading(true);
    setEnquiryStatus(null);
    try {
      await submitEnquiry({
        name: enquiryForm.name,
        email: enquiryForm.email,
        phoneNumber: enquiryForm.phone,
        message: `Goal: ${enquiryForm.goal}. Interested in PMP Batch details and discount.`,
        courseTitle: "PMP Certification Training",
      });
      setEnquiryStatus("success");
      setEnquiryForm({ name: "", email: "", phone: "", goal: "PMP Training" });
      setPhoneError("");
    } catch {
      setEnquiryStatus("error");
    } finally {
      setEnquiryLoading(false);
    }
  };

  const scrollToBatches = () => {
    const el = document.getElementById("pmp-batches-schedule-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
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
              <span className="pmp-co-step-badge">Step 2 of 2: Confirm Batch &amp; Checkout</span>
            </div>

            <div className="pmp-co-header">
              <h2>PMP® Certification Course Checkout</h2>
              <p>Review your batch schedule, select your plan, and complete secure registration.</p>
            </div>

            <div className="pmp-co-grid">
              {/* Left Column: Batch & Plan Cards */}
              <div className="pmp-co-col-left">
                {/* Batch Information Card */}
                <div className="pmp-co-card">
                  <div className="pmp-co-card-head">
                    <div className="pmp-co-head-icon">
                      <CalendarIcon />
                    </div>
                    <div>
                      <span className="pmp-co-card-sub">Selected Batch Schedule</span>
                      <h3>{activeBatch?.dates || "Upcoming Live Batch"} ({activeBatch?.monthName || "PMP Prep"})</h3>
                    </div>
                    {activeBatch?.discount && <span className="pmp-co-discount-pill">{activeBatch.discount}</span>}
                  </div>

                  <div className="pmp-co-details-grid">
                    <div className="pmp-co-detail-item">
                      <span className="pmp-co-d-label">Class Timing</span>
                      <span className="pmp-co-d-val"><ClockIcon /> {activeBatch?.timing || "07:00 AM - 11:30 AM IST"}</span>
                    </div>
                    <div className="pmp-co-detail-item">
                      <span className="pmp-co-d-label">Slot Format</span>
                      <span className="pmp-co-d-val">{activeBatch?.dayType || "Weekend Batch | 8 Sessions"}</span>
                    </div>
                    <div className="pmp-co-detail-item">
                      <span className="pmp-co-d-label">Lead Instructor</span>
                      <span className="pmp-co-d-val"><UserIcon /> {activeBatch?.trainer || "JSTechnoHub Senior PMP® Trainer"}</span>
                    </div>
                    <div className="pmp-co-detail-item">
                      <span className="pmp-co-d-label">Venue</span>
                      <span className="pmp-co-d-val">Live Virtual Class</span>
                    </div>
                  </div>
                </div>

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
                  <h3>Candidate Details &amp; Payment</h3>
                  <p className="pmp-co-form-sub">Enter your details to generate your invoice and proceed to payment.</p>

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
                  <button className="pmp-btn-primary" onClick={scrollToBatches}>
                    <span>Explore Upcoming Batches &amp; Enroll&nbsp;→</span>
                  </button>
                  <button className="pmp-btn-secondary" onClick={scrollToBatches}>
                    Request Batch Timetable &amp; Syllabus
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

          {/* ── 3. UPCOMING BATCHES WITH ENQUIRY BESIDE ── */}
          <section id="pmp-batches-schedule-section" className="pmp-content-section">
            <div className="app-container">
              <div className="pmp-section-head">
                <span className="pmp-kicker">Interactive Live Training</span>
                <h2>Upcoming Training Batches</h2>
                <p>Choose your weekend cohort schedule and secure your seat with instant checkout, or request details below.</p>

                {/* Filter Controls */}
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

              {/* 2-Column Batches Layout */}
              <div className="pmp-schedule-grid">
                {/* Left: Batches List */}
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

                {/* Right: Quick Enquiry Form Beside Batches */}
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

          {/* ── 4. CHOOSE YOUR TRAINING PLAN ── */}
          <section className="pmp-content-section pmp-section-alt">
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
                      {selectedPlan.id === plan.id ? "Selected Plan (Checkout) →" : "Select Plan"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── 5. DETAILED CURRICULUM (ACCORDION) ── */}
          <section className="pmp-content-section">
            <div className="app-container">
              <div className="pmp-section-head">
                <span className="pmp-kicker">PMI® ECO 2026 Aligned</span>
                <h2>Detailed Course Curriculum</h2>
                <p>Comprehensive 7-module syllabus covering Predictive, Agile, Hybrid, and Gen AI project workflows.</p>
              </div>

              <div className="pmp-curriculum-accordion">
                {CURRICULUM.map((module, idx) => {
                  const isOpen = openCurriculumIndex === idx;
                  return (
                    <div key={idx} className={`pmp-curr-card ${isOpen ? "pmp-curr-card--open" : ""}`}>
                      <button
                        className="pmp-curr-toggle"
                        onClick={() => setOpenCurriculumIndex(isOpen ? null : idx)}
                      >
                        <div className="pmp-curr-title-wrap">
                          <span className="pmp-curr-num">{module.number}</span>
                          <span className="pmp-curr-title">{module.title}</span>
                        </div>
                        <ChevronDownIcon open={isOpen} />
                      </button>

                      {isOpen && (
                        <div className="pmp-curr-content">
                          <ul>
                            {module.topics.map((t, tIdx) => (
                              <li key={tIdx}>
                                <CheckIcon className="pmp-curr-check" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })}
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
        </>
      )}
    </div>
  );
};

export default PmpBatchesSection;
