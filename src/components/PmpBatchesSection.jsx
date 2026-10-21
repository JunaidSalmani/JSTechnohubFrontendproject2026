import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, verifyPayment, submitEnquiry, getAllCourses, getAllBatches } from "../services/api";
import PhoneInputField, { isValidPhoneNumber, getPhoneValidationError } from "./PhoneInputField";
import "./PmpBatchesSection.css";

// ── SVG ICONS (NO EMOJIS) ──────────────────────────────────────────
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
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ChevronDownIcon = ({ open }) => (
  <svg className={`pmp-chev ${open ? "pmp-chev-open" : ""}`} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const AwardIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// ── BATCH DATA ──────────────────────────────────────────────────────
const BATCHES = [
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
    trainer: "JSTechnoHub Certified Lead Coach",
    venue: "Live Virtual Class",
    mrp: 19999,
    price: 9999,
    discount: "50% OFF",
  },
  {
    id: 88485,
    dates: "Nov 21 - Dec 13",
    monthName: "Nov 2026",
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
    id: 88486,
    dates: "Dec 05 - Dec 27",
    monthName: "Dec 2026",
    timing: "07:00 PM - 11:30 PM IST",
    timingType: "Evening Batch",
    dayType: "Weekend Batch | 8 Sessions",
    trainer: "JSTechnoHub Certified Lead Coach",
    venue: "Live Virtual Class",
    mrp: 19999,
    price: 9999,
    discount: "50% OFF",
  },
];

// ── PRICING PLANS ───────────────────────────────────────────────────
const PLANS = [
  {
    id: "basic",
    name: "Basic Plan",
    badge: "Self-Paced",
    price: 4999,
    mrp: 9999,
    popular: false,
    features: [
      "Recorded HD Video Lectures",
      "1,000+ Practice Exam Questions",
      "Digital Study Notes & Cheat Sheets",
      "Course Completion Certificate",
      "Email Support",
    ],
  },
  {
    id: "standard",
    name: "Pro Pass (Live Training)",
    badge: "35 Contact Hours Included",
    price: 9999,
    mrp: 19999,
    popular: true,
    features: [
      "35 Contact Hours Certificate (PMI® Mandatory)",
      "Live Interactive Instructor-Led Classes",
      "Gen AI Modules for Modern PMs",
      "1,500+ Practice Exam Question Bank",
      "PMP® Application Guidance & Audit Support",
      "Live Session Recordings Access",
    ],
  },
  {
    id: "master",
    name: "Career Master Kit",
    badge: "All-Inclusive + PMI Fee",
    price: 35400,
    mrp: 79999,
    popular: false,
    features: [
      "Everything in Pro Live Training Plan",
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
    title: "01. Business Environment & Project Initiation",
    topics: [
      "PMI® Alignment & PMP® Exam ECO Framework",
      "Compliance, Organizational Culture & Project Charters",
      "Evaluating Business Value, Benefits & Feasibility",
    ],
  },
  {
    title: "02. People Management & Team Leadership",
    topics: [
      "Building High-Performing Virtual & Hybrid Teams",
      "Leadership Styles, Emotional Intelligence & Empowerment",
      "Conflict Resolution, Stakeholder Engagement & Mentoring",
    ],
  },
  {
    title: "03. Process Execution & Scope Management",
    topics: [
      "Defining Scope, WBS & Requirements Traceability Matrix",
      "Managing Changes, Issues & Knowledge Transfer",
      "Quality Standards & Artifact Maintenance",
    ],
  },
  {
    title: "04. Schedule, Cost & Earned Value Management (EVM)",
    topics: [
      "Critical Path Method (CPM), Fast-Tracking & Crashing",
      "Cost Estimation, Budgeting & EVM Formulas (CPI, SPI, EAC)",
      "Financial Forecasting & Variance Analysis",
    ],
  },
  {
    title: "05. Quality, Risk & Procurement Management",
    topics: [
      "Qualitative & Quantitative Risk Assessment",
      "Risk Mitigation, Response Planning & Contingency",
      "Vendor Selection, Contract Types (FFP, T&M) & Procurements",
    ],
  },
  {
    title: "06. Agile, Scrum & Hybrid Frameworks",
    topics: [
      "Agile Manifesto, Values & Servant Leadership",
      "Scrum Ceremonies: Sprints, Daily Standups, Reviews & Retros",
      "Kanban Boards, User Stories, Velocity & Burndown Charts",
    ],
  },
  {
    title: "07. Gen AI Modules for Modern Project Managers",
    topics: [
      "ChatGPT & Claude Prompts for Project Documentation",
      "Automating Risk Registers & Status Reports using AI",
      "AI-Driven Predictive Scheduling & Resource Planning",
    ],
  },
  {
    title: "08. PMP® Exam Strategy, Mocks & Application Support",
    topics: [
      "Deciphering Situational Exam Questions (Above Target Tips)",
      "Time Management Strategy for 180 Exam Questions",
      "Step-by-Step PMP® Application Writing & Submission Support",
    ],
  },
];

// ── FAQ DATA ────────────────────────────────────────────────────────
const FAQS = [
  {
    q: "Is this course suitable for beginners or transitioners into project management?",
    a: "Yes! The course covers foundational concepts through advanced predictive and agile methodologies, making it ideal for both beginners and experienced professionals.",
  },
  {
    q: "Does this training provide the mandatory 35 Contact Hours / PDUs?",
    a: "Absolutely. Upon completing the live virtual training, JSTechnoHub issues the official 35 Contact Hours Certificate required by PMI® for PMP® exam eligibility.",
  },
  {
    q: "What happens if I miss a live virtual class?",
    a: "All live classes are recorded in HD and updated in your student portal within 2 hours. You can review recordings anytime or attend the missed topic in an upcoming batch.",
  },
  {
    q: "Are the Gen AI modules included in the course?",
    a: "Yes! We integrate hands-on Gen AI workflows (ChatGPT, Claude, AI prompt engineering for project managers) to help you automate reports, WBS, and risk logs.",
  },
  {
    q: "Does JSTechnoHub assist with the PMP® exam application?",
    a: "Yes, our certified mentors review your project experience descriptions and provide step-by-step guidance to ensure 100% audit clearance.",
  },
  {
    q: "How does enrollment and payment work?",
    a: "You can select your preferred batch and enroll directly via Razorpay checkout using UPI, Credit/Debit cards, NetBanking, or EMI options.",
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

  // Full-Width Enrollment Checkout View State
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

  // Dynamic Batches from Backend DB (Admin Panel)
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    const fetchDynamicBatches = async () => {
      try {
        const res = await getAllBatches();
        if (res.data && Array.isArray(res.data)) {
          setBatches(res.data);
        }
      } catch (err) {
        console.error("Error fetching dynamic batches from DB:", err);
      }
    };

    fetchDynamicBatches();
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
        key: "rzp_test_REaS1BheNXdkjC",
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
          color: "#0f172a",
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
      setErrorMsg("Could not initiate payment. Please check your connection.");
      setIsProcessing(false);
    }
  };

  const handleEnquiryPhoneChange = (val) => {
    setEnquiryForm((prev) => ({ ...prev, phone: val }));
    // If an error is already showing from a prior submit click, re-evaluate dynamically
    if (phoneError) {
      const err = getPhoneValidationError(val);
      setPhoneError(err);
    }
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();

    if (!enquiryForm.name.trim() || enquiryForm.name.trim().length < 2) {
      setEnquiryStatus("Please enter your full name (at least 2 characters).");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(enquiryForm.email.trim())) {
      setEnquiryStatus("Please enter a valid email address.");
      return;
    }
    const phoneErr = getPhoneValidationError(enquiryForm.phone);
    if (phoneErr) {
      setPhoneError(phoneErr);
      return;
    }

    setPhoneError("");
    setEnquiryLoading(true);
    setEnquiryStatus(null);

    try {
      await submitEnquiry({
        name: enquiryForm.name,
        email: enquiryForm.email,
        phoneNumber: enquiryForm.phone,
        message: `Goal: ${enquiryForm.goal} - Batch Enquiry`,
        courseTitle: "PMP® Certification Training",
      });
      setEnquiryStatus("success");
      setEnquiryForm({ name: "", email: "", phone: "", goal: "PMP Training" });
      setPhoneError("");
    } catch (err) {
      console.error(err);
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
    <div className="pmp-full-page-wrapper">
      {isCheckoutView ? (
        /* ════════════════════ FULL-WIDTH NEXT SCREEN CHECKOUT VIEW ════════════════════ */
        <section className="pmp-section pmp-checkout-fullwidth-section">
          <div className="pmp-container">
            {/* Top Navigation & Back Button */}
            <div className="pmp-co-topbar">
              <button className="pmp-co-back-btn" onClick={() => setIsCheckoutView(false)}>
                <ArrowLeftIcon /> Back to All Batches & Courses
              </button>
              <span className="pmp-co-step-badge">Step 2 of 2: Confirm Batch & Complete Enrollment</span>
            </div>

            <div className="pmp-co-header">
              <h2>PMP® Certification Course Checkout</h2>
              <p>Review your training batch details, customize your plan, and complete secure enrollment.</p>
            </div>

            {/* 2-Column Full Width Grid */}
            <div className="pmp-co-grid">
              {/* Left Column: Batch Information & Plan Details */}
              <div className="pmp-co-col-left">
                {/* 1. BATCH INFORMATION CARD */}
                <div className="pmp-co-card pmp-co-batch-card">
                  <div className="pmp-co-card-head">
                    <div className="pmp-co-head-icon">
                      <CalendarIcon />
                    </div>
                    <div>
                      <span className="pmp-co-card-sub">Selected Training Schedule</span>
                      <h3>{activeBatch?.dates || "Upcoming Live Batch"} ({activeBatch?.monthName || "PMP Certification"})</h3>
                    </div>
                    {activeBatch?.discount && (
                      <span className="pmp-co-discount-pill">{activeBatch.discount}</span>
                    )}
                  </div>

                  <div className="pmp-co-batch-details-grid">
                    <div className="pmp-co-bd-item">
                      <span className="pmp-co-bd-label">Class Timing</span>
                      <span className="pmp-co-bd-val"><ClockIcon /> {activeBatch?.timing || "07:00 PM - 11:30 PM IST"}</span>
                    </div>
                    <div className="pmp-co-bd-item">
                      <span className="pmp-co-bd-label">Batch Slot</span>
                      <span className="pmp-co-bd-val">{activeBatch?.timingType || "Evening Batch"}</span>
                    </div>
                    <div className="pmp-co-bd-item">
                      <span className="pmp-co-bd-label">Schedule Format</span>
                      <span className="pmp-co-bd-val">{activeBatch?.dayType || "Weekend Batch | 8 Sessions"}</span>
                    </div>
                    <div className="pmp-co-bd-item">
                      <span className="pmp-co-bd-label">Lead Instructor</span>
                      <span className="pmp-co-bd-val"><UserIcon /> {activeBatch?.trainer || "JSTechnoHub Senior PMP® Trainer"}</span>
                    </div>
                    <div className="pmp-co-bd-item">
                      <span className="pmp-co-bd-label">Training Venue</span>
                      <span className="pmp-co-bd-val">{activeBatch?.venue || "Live Virtual Class"}</span>
                    </div>
                  </div>
                </div>

                {/* 2. PLAN SELECTION & SWITCHER CARD */}
                <div className="pmp-co-card pmp-co-plan-card">
                  <div className="pmp-co-card-head">
                    <div className="pmp-co-head-icon" style={{ background: "#eff6ff", color: "#2563eb" }}>
                      <AwardIcon />
                    </div>
                    <div>
                      <span className="pmp-co-card-sub">Training Plan Selected</span>
                      <h3>{selectedPlan.name}</h3>
                    </div>
                    <span className="pmp-co-plan-price-tag">₹{selectedPlan.price.toLocaleString()}</span>
                  </div>

                  <div className="pmp-co-plan-switcher">
                    <p className="pmp-co-switcher-label">Switch or customize your plan:</p>
                    <div className="pmp-co-plan-options">
                      {PLANS.map((plan) => (
                        <div
                          key={plan.id}
                          className={`pmp-co-plan-opt ${selectedPlan.id === plan.id ? "pmp-co-plan-opt--active" : ""}`}
                          onClick={() => setSelectedPlan(plan)}
                        >
                          <div className="pmp-co-opt-radio">
                            <div className="pmp-co-radio-dot" />
                          </div>
                          <div className="pmp-co-opt-info">
                            <span className="pmp-co-opt-name">{plan.name}</span>
                            <span className="pmp-co-opt-price">₹{plan.price.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pmp-co-plan-features">
                    <p className="pmp-co-feat-head">Plan Features Included:</p>
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

              {/* Right Column: Student Details Form & Razorpay Payment */}
              <div className="pmp-co-col-right">
                <div className="pmp-co-card pmp-co-checkout-form-card">
                  <h3>Student Information & Payment</h3>
                  <p className="pmp-co-form-sub">Enter your details to generate your Razorpay invoice and complete registration.</p>

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
                      error={errorMsg && (errorMsg.toLowerCase().includes("whatsapp") || errorMsg.toLowerCase().includes("phone") || errorMsg.toLowerCase().includes("mobile") || errorMsg.toLowerCase().includes("digit")) ? errorMsg : ""}
                      required
                    />

                    {/* Price Breakdown */}
                    <div className="pmp-co-summary-box">
                      <div className="pmp-co-sum-row">
                        <span>{selectedPlan.name} Base Fee</span>
                        <span>₹{selectedPlan.mrp.toLocaleString()}</span>
                      </div>
                      <div className="pmp-co-sum-row pmp-co-discount-row">
                        <span>Special Batch Discount</span>
                        <span>-₹{(selectedPlan.mrp - selectedPlan.price).toLocaleString()}</span>
                      </div>
                      <div className="pmp-co-sum-row pmp-co-total-row">
                        <span>Total Payable Amount</span>
                        <span className="pmp-co-total-amt">₹{selectedPlan.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <button type="submit" className="pmp-btn-co-pay" disabled={isProcessing}>
                      <LockIcon /> {isProcessing ? "Connecting Razorpay..." : `Pay ₹${selectedPlan.price.toLocaleString()} via Razorpay`}
                    </button>

                    <div className="pmp-co-trust-row">
                      <span><LockIcon /> 256-Bit SSL Encryption</span>
                      <span>Razorpay Verified</span>
                      <span>Instant Access</span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        /* ════════════════════ STANDARD COURSES / PMP CATALOG PAGE ════════════════════ */
        <>
          {/* ════════════════════ 1. COURSE HERO SECTION ════════════════════ */}
          <section className="pmp-hero-section">
        <div className="pmp-hero-container">
          <div className="pmp-hero-badge">
            <StarIcon /> PMI® Authorized Training Partner
          </div>

          <h1 className="pmp-hero-title">
            PMP® Certification with Gen AI Modules & Exam Prep
          </h1>

          <p className="pmp-hero-subtitle">
            Become a job-ready certified Project Management Professional through live interactive classes,
            real-world case studies, 35 Contact Hours, and cutting-edge Gen AI workflows.
          </p>

          <div className="pmp-hero-rating-row">
            <div className="pmp-stars">
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <span className="pmp-rating-num">4.8/5 Rating</span>
            </div>
            <span className="pmp-rating-divider">|</span>
            <span className="pmp-students-count">1,200+ Students Certified</span>
          </div>

          <div className="pmp-hero-meta-row">
            <div className="pmp-meta-chip">
              <ClockIcon /> <span>Duration: 4 Weeks (35 Hrs)</span>
            </div>
            <div className="pmp-meta-chip">
              <CalendarIcon /> <span>Mode: Live Online Virtual</span>
            </div>
            <div className="pmp-meta-chip">
              <UserIcon /> <span>Level: Beginner to Advanced</span>
            </div>
          </div>

          <div className="pmp-hero-actions">
            <button className="pmp-btn-primary" onClick={scrollToBatches}>
              Enroll Now
            </button>
            <button className="pmp-btn-secondary" onClick={scrollToBatches}>
              <DownloadIcon /> Download Brochure
            </button>
          </div>
        </div>
      </section>

      {/* ════════════════════ 2. COURSE HIGHLIGHTS ════════════════════ */}
      <section className="pmp-highlights-bar">
        <div className="pmp-container pmp-hl-grid">
          <div className="pmp-hl-item"><CheckIcon className="pmp-hl-check" /> Live Virtual Classes</div>
          <div className="pmp-hl-item"><CheckIcon className="pmp-hl-check" /> Real-World Projects</div>
          <div className="pmp-hl-item"><CheckIcon className="pmp-hl-check" /> HD Recorded Sessions</div>
          <div className="pmp-hl-item"><CheckIcon className="pmp-hl-check" /> Assignments & Mocks</div>
          <div className="pmp-hl-item"><CheckIcon className="pmp-hl-check" /> Doubt Support</div>
          <div className="pmp-hl-item"><CheckIcon className="pmp-hl-check" /> 35 PDUs Certificate</div>
        </div>
      </section>

      {/* ════════════════════ 3. WHAT YOU WILL LEARN ════════════════════ */}
      <section className="pmp-section pmp-bg-light">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>What You&apos;ll Learn</h2>
            <p>Master the fundamental and advanced skills required to pass the PMP® exam on your 1st attempt.</p>
          </div>

          <div className="pmp-skills-grid">
            {[
              "Predictive & Waterfall Management",
              "Agile & Scrum Practices",
              "Gen AI Prompting for Project Managers",
              "Earned Value Management (EVM)",
              "Risk, Quality & Procurement Planning",
              "Stakeholder Engagement & Team Leadership",
              "PMI® Code of Ethics & Professional Conduct",
              "PMP® Situational Exam Strategy & Application Audit",
            ].map((skill, i) => (
              <div key={i} className="pmp-skill-card">
                <div className="pmp-sk-icon"><CheckIcon /></div>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ 4. DETAILED CURRICULUM (ACCORDION) ════════════════════ */}
      <section className="pmp-section">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>Detailed Course Curriculum</h2>
            <p>Structured syllabus covering Predictive, Agile, Hybrid, and Gen AI project management.</p>
          </div>

          <div className="pmp-accordion-list">
            {CURRICULUM.map((module, idx) => {
              const isOpen = openCurriculumIndex === idx;
              return (
                <div key={idx} className={`pmp-acc-item ${isOpen ? "pmp-acc-item--open" : ""}`}>
                  <button
                    className="pmp-acc-header"
                    onClick={() => setOpenCurriculumIndex(isOpen ? null : idx)}
                  >
                    <span>{module.title}</span>
                    <ChevronDownIcon open={isOpen} />
                  </button>
                  {isOpen && (
                    <div className="pmp-acc-body">
                      <ul>
                        {module.topics.map((t, tIdx) => (
                          <li key={tIdx}>
                            <CheckIcon className="pmp-li-check" /> {t}
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

      {/* ════════════════════ 5. REAL-WORLD PROJECTS ════════════════════ */}
      <section className="pmp-section pmp-bg-light">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>Build Real-World Projects</h2>
            <p>Apply your skills on industry-standard case studies during live sessions.</p>
          </div>

          <div className="pmp-projects-grid">
            <div className="pmp-proj-card">
              <div className="pmp-proj-tag">Agile + Jira + Gen AI</div>
              <h3>E-Commerce Platform Agile Migration</h3>
              <p>
                Lead a cross-functional squad migrating a legacy monolithic application to microservices using Scrum, Sprint planning, and ChatGPT user story generation.
              </p>
            </div>

            <div className="pmp-proj-card">
              <div className="pmp-proj-tag">Waterfall + EVM</div>
              <h3>Healthcare System Deployment</h3>
              <p>
                Create WBS, cost baseline, and Earned Value Management (EVM) tracking sheets for a multi-hospital digital records rollout.
              </p>
            </div>

            <div className="pmp-proj-card">
              <div className="pmp-proj-tag">Hybrid Model + Risk</div>
              <h3>Global Supply Chain Portal</h3>
              <p>
                Perform qualitative & quantitative risk assessment and construct stakeholder communication plans for a global logistics network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 6. LEARNING OUTCOMES ════════════════════ */}
      <section className="pmp-section">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>Learning Outcomes</h2>
            <p>After completing this course, you will be able to:</p>
          </div>

          <div className="pmp-outcomes-grid">
            {[
              "Master all 3 PMP Domains: People, Process, and Business Environment",
              "Pass the PMP® Exam on your 1st attempt with 35 Contact Hours",
              "Apply Gen AI tools (ChatGPT, Claude) for instant project documentation",
              "Construct comprehensive project budgets, WBS, and risk response plans",
              "Manage predictive, agile, and hybrid projects with enterprise frameworks",
              "Earn 35 PDUs required by PMI® for exam eligibility",
              "Build a professional project portfolio on GitHub and LinkedIn",
              "Lead multi-disciplinary teams with technical and strategic clarity",
            ].map((outcome, idx) => (
              <div key={idx} className="pmp-outcome-item">
                <div className="pmp-outcome-icon"><CheckIcon /></div>
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ 7. COURSE BENEFITS ════════════════════ */}
      <section className="pmp-section pmp-bg-light">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>Why Take This Course?</h2>
            <p>Designed specifically to ensure high exam success rates and accelerated career growth.</p>
          </div>

          <div className="pmp-benefits-grid">
            <div className="pmp-benefit-card">
              <div className="pmp-b-icon"><AwardIcon /></div>
              <h3>Industry-Oriented Curriculum</h3>
              <p>Aligned 100% with the latest PMI® PMP® Examination Content Outline (ECO).</p>
            </div>
            <div className="pmp-benefit-card">
              <div className="pmp-b-icon"><UserIcon /></div>
              <h3>1-on-1 Application Support</h3>
              <p>Personalized review of your PMP® application to ensure 100% audit clearance.</p>
            </div>
            <div className="pmp-benefit-card">
              <div className="pmp-b-icon"><ClockIcon /></div>
              <h3>Flexible Live Batches</h3>
              <p>Weekend morning and evening options designed for working professionals.</p>
            </div>
            <div className="pmp-benefit-card">
              <div className="pmp-b-icon"><CheckIcon /></div>
              <h3>1,500+ Practice Question Bank</h3>
              <p>Realistic situational questions with detailed rationale explanations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 8. UPCOMING BATCHES WITH ENQUIRY FORM BESIDE ════════════════════ */}
      <section id="pmp-batches-schedule-section" className="pmp-section">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <span className="pmp-pill-tag">PMI® Authorized Training Schedule</span>
            <h2>Upcoming Training Batches</h2>
            <p>Select your preferred batch and enroll with instant Razorpay checkout, or request details via enquiry.</p>

            {/* Filter Buttons */}
            <div className="pmp-batch-filters">
              <div className="pmp-bf-group">
                <span className="pmp-bf-label">Month:</span>
                {availableMonths.map((m) => (
                  <button
                    key={m}
                    className={`pmp-bf-btn ${selectedMonth === m ? "pmp-bf-btn--active" : ""}`}
                    onClick={() => setSelectedMonth(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>

              <div className="pmp-bf-group">
                <span className="pmp-bf-label">Timing:</span>
                {["All", "Morning Batch", "Evening Batch"].map((t) => (
                  <button
                    key={t}
                    className={`pmp-bf-btn ${selectedTiming === t ? "pmp-bf-btn--active" : ""}`}
                    onClick={() => setSelectedTiming(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 2-COLUMN LAYOUT: BATCHES ON LEFT, ENQUIRY FORM ON RIGHT */}
          <div className="pmp-batches-layout">
            {/* Left Column: Batches List */}
            <div className="pmp-batches-col-left">
              <div className="pmp-schedule-list">
                {filteredBatches.map((b) => (
                  <div key={b.id} className="pmp-schedule-card">
                    <div className="pmp-sc-col pmp-sc-info">
                      <div className="pmp-sc-venue-badge">
                        <span className="pmp-live-dot" />
                        {b.venue}
                      </div>
                      <div className="pmp-sc-dates">{b.dates}</div>
                      <div className="pmp-sc-timing">
                        <ClockIcon /> {b.timing}
                      </div>
                      <div className="pmp-sc-meta">
                        <span><CalendarIcon /> {b.dayType}</span>
                        <span><UserIcon /> {b.trainer}</span>
                      </div>
                    </div>

                    <div className="pmp-sc-col pmp-sc-slot">
                      <div className="pmp-timing-badge">{b.timingType}</div>
                    </div>

                    <div className="pmp-sc-col pmp-sc-pricing">
                      <div className="pmp-price-row">
                        <span className="pmp-discount-tag">{b.discount}</span>
                        <span className="pmp-mrp-strike">₹{b.mrp.toLocaleString()}</span>
                      </div>
                      <div className="pmp-final-price">
                        <span className="pmp-currency">₹</span>
                        <span className="pmp-amount">{b.price.toLocaleString()}</span>
                      </div>
                      <button
                        className="pmp-btn-enroll"
                        onClick={() => handleEnroll(b)}
                      >
                        Enroll Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Quick Enquiry Form Beside Batches */}
            <div className="pmp-batches-col-right">
              <div className="pmp-enquiry-card">
                <h3>Enquire About Batches</h3>
                <p className="pmp-eq-sub">Need assistance choosing a batch or want to receive the detailed syllabus?</p>

                {enquiryStatus === "success" ? (
                  <div className="pmp-eq-success">
                    <CheckIcon className="pmp-eq-check" />
                    <h4>Enquiry Received!</h4>
                    <p>Our Technical Program Advisor will call you within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleEnquirySubmit} className="pmp-eq-form">
                    {enquiryStatus && enquiryStatus !== "success" && (
                      <div className="pmp-eq-error">
                        {enquiryStatus === "error"
                          ? "Error submitting enquiry. Please check your details and try again."
                          : enquiryStatus}
                      </div>
                    )}

                    <div className="pmp-eq-group">
                      <input
                        type="text"
                        required
                        placeholder=" "
                        value={enquiryForm.name}
                        onChange={(e) => {
                          setEnquiryForm({ ...enquiryForm, name: e.target.value });
                          if (enquiryStatus && enquiryStatus.toLowerCase().includes("name")) {
                            setEnquiryStatus(null);
                          }
                        }}
                      />
                      <label>Full Name *</label>
                    </div>

                    <div className="pmp-eq-group">
                      <input
                        type="email"
                        required
                        placeholder=" "
                        value={enquiryForm.email}
                        onChange={(e) => {
                          setEnquiryForm({ ...enquiryForm, email: e.target.value });
                          if (enquiryStatus && enquiryStatus.toLowerCase().includes("email")) {
                            setEnquiryStatus(null);
                          }
                        }}
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

                    <div className="pmp-eq-group">
                      <select
                        value={enquiryForm.goal}
                        onChange={(e) => setEnquiryForm({ ...enquiryForm, goal: e.target.value })}
                      >
                        <option value="PMP Training">PMP® Live Certification Training</option>
                        <option value="Corporate Training">Corporate Team Training</option>
                        <option value="Custom Schedule">Custom Schedule / Weekend Batch</option>
                      </select>
                      <label>Preferred Learning Goal</label>
                    </div>

                    <button type="submit" className="pmp-btn-eq-submit" disabled={enquiryLoading}>
                      {enquiryLoading ? "Submitting..." : "Get Syllabus & Callback"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 9. PRICING / PLANS ════════════════════ */}
      <section className="pmp-section pmp-bg-light">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>Training Plans & Pricing</h2>
            <p>Transparent pricing with no hidden costs. Select the plan that fits your career goals.</p>
          </div>

          <div className="pmp-plans-grid">
            {PLANS.map((plan) => (
              <div key={plan.id} className={`pmp-pricing-card ${plan.popular ? "pmp-pc--popular" : ""}`}>
                {plan.popular && <span className="pmp-pop-badge">MOST POPULAR</span>}
                <div className="pmp-pc-header">
                  <h3>{plan.name}</h3>
                  <span className="pmp-pc-subbadge">{plan.badge}</span>
                </div>

                <div className="pmp-pc-price-box">
                  <span className="pmp-pc-mrp">₹{plan.mrp.toLocaleString()}</span>
                  <div className="pmp-pc-amount">
                    <span className="pmp-pc-curr">₹</span>
                    <span>{plan.price.toLocaleString()}</span>
                  </div>
                </div>

                <ul className="pmp-pc-features">
                  {plan.features.map((f, fIdx) => (
                    <li key={fIdx}>
                      <CheckIcon className="pmp-pc-check" /> {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`pmp-btn-plan-select ${selectedPlan.id === plan.id ? "pmp-btn-plan-select--active" : ""}`}
                  onClick={() => handleSelectPlan(plan)}
                >
                  {selectedPlan.id === plan.id ? "Selected Plan (Proceed)" : "Select Plan"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ 10. INSTRUCTOR ════════════════════ */}
      <section className="pmp-section">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>Meet Your Instructor</h2>
            <p>Train under certified enterprise leads with extensive real-world experience.</p>
          </div>

          <div className="pmp-instructor-card">
            <div className="pmp-inst-avatar">
              <UserIcon />
            </div>
            <div className="pmp-inst-info">
              <h3>Dr. Rajesh Kumar, PMP®</h3>
              <p className="pmp-inst-role">Senior PMP® Lead Coach & Enterprise Consultant</p>
              <div className="pmp-inst-exp">Experience: 15+ Years in Project Delivery</div>
              <p className="pmp-inst-bio">
                Has trained over 12,000+ professionals globally across Fortune 500 companies. Specializes in Predictive Waterfall, Agile Transformations, and Gen AI integration into modern PMOs.
              </p>

              <div className="pmp-inst-tags">
                <span>PMP® Certified</span>
                <span>PMI-ACP®</span>
                <span>Scrum Master</span>
                <span>Gen AI Strategist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 11. STUDENT REVIEWS ════════════════════ */}
      <section className="pmp-section pmp-bg-light">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>What Students Say</h2>
            <p>Read genuine feedback from candidates who passed their PMP® exam with JSTechnoHub.</p>
          </div>

          <div className="pmp-reviews-grid">
            {[
              {
                quote: "The situational question analysis and 35 Contact Hours were outstanding. Passed with Above Target in all 3 domains!",
                name: "Rahul Sharma",
                role: "Senior Project Engineer",
              },
              {
                quote: "The Gen AI modules for ChatGPT project documentation saved me hours at work. The weekend batch schedule was super convenient.",
                name: "Priya Nair",
                role: "Agile Scrum Lead",
              },
              {
                quote: "JSTechnoHub team guided me step-by-step through the PMI application. Passed on my 1st attempt smoothly!",
                name: "Vikram Malhotra",
                role: "IT Delivery Manager",
              },
            ].map((rev, i) => (
              <div key={i} className="pmp-review-card">
                <div className="pmp-rev-stars">
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                  <StarIcon />
                </div>
                <p className="pmp-rev-text">&quot;{rev.quote}&quot;</p>
                <div className="pmp-rev-user">
                  <strong>— {rev.name}</strong>
                  <span>{rev.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ 12. CAREER OPPORTUNITIES & ROADMAP ════════════════════ */}
      <section className="pmp-section">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>Career Opportunities & Roadmap</h2>
            <p>Target high-paying management roles with global credibility.</p>
          </div>

          <div className="pmp-roles-pills">
            {["Senior Project Manager", "Agile Project Lead", "Program Manager", "Scrum Master", "PMO Director", "Delivery Manager"].map((role, idx) => (
              <span key={idx} className="pmp-role-pill">{role}</span>
            ))}
          </div>

          <div className="pmp-roadmap-flow">
            <div className="pmp-rm-step">1. Learn Live</div>
            <div className="pmp-rm-arrow">→</div>
            <div className="pmp-rm-step">2. Practice Mocks</div>
            <div className="pmp-rm-arrow">→</div>
            <div className="pmp-rm-step">3. Application Audit</div>
            <div className="pmp-rm-arrow">→</div>
            <div className="pmp-rm-step">4. Clear PMP® Exam</div>
            <div className="pmp-rm-arrow">→</div>
            <div className="pmp-rm-step">5. Career Growth</div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 13. ELIGIBILITY / PREREQUISITES ════════════════════ */}
      <section className="pmp-section pmp-bg-light">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>Who Can Join & Prerequisites</h2>
            <p>Ensure you meet the basic eligibility criteria for PMP® certification.</p>
          </div>

          <div className="pmp-elig-grid">
            <div className="pmp-elig-card">
              <h3>Who Can Join?</h3>
              <ul>
                <li><CheckIcon /> Project Managers & Team Leads</li>
                <li><CheckIcon /> Software Engineers & System Architects</li>
                <li><CheckIcon /> Consultants & Business Analysts</li>
                <li><CheckIcon /> Aspirants targeting management roles</li>
              </ul>
            </div>

            <div className="pmp-elig-card">
              <h3>PMI® Prerequisites:</h3>
              <ul>
                <li><CheckIcon /> Bachelor&apos;s degree + 3 years project experience, OR</li>
                <li><CheckIcon /> High school diploma + 5 years project experience</li>
                <li><CheckIcon /> 35 Contact Hours Certificate (Provided by JSTechnoHub)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 14. CERTIFICATE SECTION ════════════════════ */}
      <section className="pmp-section">
        <div className="pmp-container">
          <div className="pmp-cert-card">
            <div className="pmp-cert-icon">
              <AwardIcon />
            </div>
            <div className="pmp-cert-content">
              <h2>PMI® Authorized 35 Contact Hours Certificate</h2>
              <p>
                Receive an official, verifiable digital certificate upon completing live classes and course requirements, enabling you to apply directly for the PMP® exam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ 15. FAQ (EXPANDABLE ACCORDION) ════════════════════ */}
      <section className="pmp-section pmp-bg-light">
        <div className="pmp-container">
          <div className="pmp-sec-head">
            <h2>Frequently Asked Questions</h2>
            <p>Got questions? We have answers to help you make an informed decision.</p>
          </div>

          <div className="pmp-faq-list">
            {FAQS.map((faq, i) => {
              const isOpen = openFaqIndex === i;
              return (
                <div key={i} className={`pmp-faq-item ${isOpen ? "pmp-faq-item--open" : ""}`}>
                  <button
                    className="pmp-faq-header"
                    onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDownIcon open={isOpen} />
                  </button>
                  {isOpen && <div className="pmp-faq-body">{faq.a}</div>}
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
