import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; 
import './ResumePage.css';
import ResumeSamples from './ResumeSamples';
import PaymentFormModal from './PaymentFormModal';
import { useNavigate } from 'react-router-dom'; 
import { createUser, createOrder, verifyPayment } from '../services/api';

// ── SVG ICONS ────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const LockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', verticalAlign: '-1px', marginRight: 5 }}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const ShieldCheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#eb001b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

const ClockFastIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#eb001b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const RefreshIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#eb001b" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
  </svg>
);

const pricingData = {
  '0-3': {
    plans: [
      { title: 'Resume', price: '1499' },
      { title: 'Cover Letter', price: '599' },
      { title: 'LinkedIn', price: '1399' },
    ],
    combos: [
      { title: 'Starter Pack', subtitle: 'Resume + Cover Letter', price: '1899', originalPrice: '2098' },
      { title: 'Ultimate Career Kit', subtitle: 'Resume + Cover Letter + LinkedIn', price: '2999', originalPrice: '3497', isFeatured: true },
      { title: 'Pro Online Presence', subtitle: 'Resume + LinkedIn', price: '2599', originalPrice: '2898' },
    ],
  },
  '3-7': {
    plans: [
      { title: 'Resume', price: '2499' },
      { title: 'Cover Letter', price: '699' },
      { title: 'LinkedIn', price: '1999' },
    ],
    combos: [
      { title: 'Starter Pack', subtitle: 'Resume + Cover Letter', price: '2999', originalPrice: '3198' },
      { title: 'Ultimate Career Kit', subtitle: 'Resume + Cover Letter + LinkedIn', price: '4499', originalPrice: '5197', isFeatured: true },
      { title: 'Pro Online Presence', subtitle: 'Resume + LinkedIn', price: '3999', originalPrice: '4498' },
    ],
  },
  '7-14': {
    plans: [
      { title: 'Resume', price: '3499' },
      { title: 'Cover Letter', price: '799' },
      { title: 'LinkedIn', price: '2999' },
    ],
    combos: [
      { title: 'Starter Pack', subtitle: 'Resume + Cover Letter', price: '3999', originalPrice: '4298' },
      { title: 'Ultimate Career Kit', subtitle: 'Resume + Cover Letter + LinkedIn', price: '6499', originalPrice: '7297', isFeatured: true },
      { title: 'Pro Online Presence', subtitle: 'Resume + LinkedIn', price: '5999', originalPrice: '6498' },
    ],
  },
  '14-20': {
    plans: [
      { title: 'Resume', price: '4499' },
      { title: 'Cover Letter', price: '899' },
      { title: 'LinkedIn', price: '3999' },
    ],
    combos: [
      { title: 'Starter Pack', subtitle: 'Resume + Cover Letter', price: '4999', originalPrice: '5398' },
      { title: 'Ultimate Career Kit', subtitle: 'Resume + Cover Letter + LinkedIn', price: '8499', originalPrice: '9397', isFeatured: true },
      { title: 'Pro Online Presence', subtitle: 'Resume + LinkedIn', price: '7999', originalPrice: '8498' },
    ],
  },
  '20+': {
    plans: [
      { title: 'Resume', price: '5999' },
      { title: 'Cover Letter', price: '999' },
      { title: 'LinkedIn', price: '4999' },
    ],
    combos: [
      { title: 'Starter Pack', subtitle: 'Resume + Cover Letter', price: '6499', originalPrice: '6998' },
      { title: 'Ultimate Career Kit', subtitle: 'Resume + Cover Letter + LinkedIn', price: '10499', originalPrice: '11997', isFeatured: true },
      { title: 'Pro Online Presence', subtitle: 'Resume + LinkedIn', price: '9999', originalPrice: '10998' },
    ],
  },
};

// Plan features
const planFeatures = {
  Resume: ['3-5 Days Delivery', 'International Acceptance', 'ATS-Compatible', 'Unlimited Revisions', '6 Month Support'],
  'Cover Letter': ['3-5 Days Delivery', 'Job & Role Specific Content', 'Global Standard Followed', 'ATS Compatible', '6 Months Support'],
  LinkedIn: ['3-5 Days Delivery', 'Search Engine Optimized', 'Global Standard Followed', 'Unlimited Revisions', '6 Month Support'],
};

const comboFeatures = {
  'Starter Pack': ['Everything in Resume Plan', 'Everything in Cover Letter Plan', 'Cohesive Personal Branding', 'Includes ~10% Discount', '6 Month Support'],
  'Ultimate Career Kit': ['Complete Professional Makeover', 'All Individual Plan Features Included', 'Fully Optimized Digital & Paper Presence', 'Includes ~15% Discount', 'Priority 6 Month Support'],
  'Pro Online Presence': ['Everything in Resume Plan', 'Everything in LinkedIn Plan', 'Synced & Optimized Profiles', 'Includes ~10% Discount', '6 Month Support'],
};

const PLAN_META = {
  Resume: {
    badge: 'Executive Resume',
    delivery: '3–5 Days Turnaround',
    popular: true,
  },
  'Cover Letter': {
    badge: 'Role Targeted',
    delivery: 'HR & ATS Aligned',
    popular: false,
  },
  LinkedIn: {
    badge: 'Recruiter SEO',
    delivery: 'Profile Optimization',
    popular: false,
  },
  'Starter Pack': {
    badge: 'Resume + Cover Letter',
    delivery: '10% Bundle Savings',
    popular: false,
  },
  'Ultimate Career Kit': {
    badge: 'Complete Career Suite',
    delivery: 'Best Value (15% Off)',
    popular: true,
  },
  'Pro Online Presence': {
    badge: 'Resume + LinkedIn Sync',
    delivery: '10% Bundle Savings',
    popular: false,
  },
};

// Pricing Card Component (Executive Modern Design)
const PricingCard = ({ plan, isCombo, handlePayment }) => {
  const meta = PLAN_META[plan.title] || {
    badge: 'Career Plan',
    delivery: 'Fast Delivery',
    popular: false,
  };

  const isPopular = plan.isFeatured || meta.popular;

  return (
    <div className={`plan-card ${isCombo ? 'combo' : ''} ${isPopular ? 'featured' : ''}`}>
      {isPopular && (
        <div className="featured-banner">
          {plan.isFeatured ? 'BEST VALUE' : 'MOST POPULAR'}
        </div>
      )}
      
      <div className="plan-card-header">
        <div className="plan-header-top">
          <span className="plan-category-badge">{meta.badge}</span>
          <span className="plan-delivery-pill">{meta.delivery}</span>
        </div>
        <h3 className="plan-title">{plan.title}</h3>
        {plan.subtitle && <span className="plan-subtitle">{plan.subtitle}</span>}
      </div>

      <div className="plan-price-wrap">
        {plan.originalPrice && (
          <div className="plan-mrp-row">
            <span className="plan-mrp-strike">
              ₹{Number(plan.originalPrice).toLocaleString('en-IN')}
            </span>
            <span className="plan-discount-badge">Save ₹{(Number(plan.originalPrice) - Number(plan.price)).toLocaleString('en-IN')}</span>
          </div>
        )}
        <div className="plan-active-price">
          <span className="plan-curr">₹</span>
          <span className="plan-amt">{Number(plan.price).toLocaleString('en-IN')}</span>
          <span className="plan-period">/ one-time</span>
        </div>
        <span className="plan-fee-note">Inclusive of all revisions &amp; 6M support</span>
      </div>

      <div className="plan-card-body">
        <div className="plan-features-label">WHAT&apos;S INCLUDED:</div>
        <ul className="plan-features-list">
          {(isCombo ? comboFeatures[plan.title] : planFeatures[plan.title] || []).map((feature, index) => (
            <li key={index}>
              <span className="feature-check-wrap"><CheckIcon /></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        
        <div className="plan-action-zone">
          <button className="buy-button" onClick={() => handlePayment(plan)}>
            <span>Get Started Now</span>
            <span className="btn-arrow">→</span>
          </button>
          <div className="plan-guarantee-note">
            <LockIcon />
            <span>256-Bit SSL Encrypted • 100% Confidential</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main ResumePage Component ---
function ResumePage() {
  const [activeTab, setActiveTab] = useState('plans');
  const [activeExperience, setActiveExperience] = useState('0-3');
  const [upiQRCode, setUpiQRCode] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentState, setPaymentState] = useState('idle');
  const [, setFormData] = useState({ name: '', email: '', mobile: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const experienceLevels = ['0-3', '3-7', '7-14', '14-20', '20+'];

  const handleRazorpayPayment = (plan, userId, name, email, mobile) => {
    return new Promise(async (resolve, reject) => {
      try {
        const numericAmount = parseFloat(String(plan.price).replace(/,/g, "")) || 0;
        const orderRes = await createOrder({ userId, amount: numericAmount });
        const order = orderRes.data;

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY_ID || "rzp_test_REaS1BheNXdkjC",
          amount: order.amount,
          currency: order.currency || "INR",
          name: "JSTechnoHub Resume Services",
          description: plan.title,
          order_id: order.id,
          handler: async function (response) {
            try {
              await verifyPayment({
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });
              navigate('/payment-success');
              resolve(response);
            } catch (err) {
              alert("Payment verification failed. Please contact support.");
              reject(err);
            }
          },
          modal: {
            ondismiss: function () {
              reject(new Error("Payment modal dismissed by user."));
            },
          },
          prefill: { name, email, contact: mobile },
          theme: { color: "#0a0f1d" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (err) {
        console.error("Failed to create Razorpay order", err);
        reject(err);
      }
    });
  };

  const handleBuyNowClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
    setPaymentState('collectingData');
    setErrorMessage('');
  };

  const handleFormSubmit = async (userData) => {
    try {
      setErrorMessage('');
      setPaymentState('processingPayment');
      setFormData(userData);

      let userId = null;
      try {
        const userRes = await createUser(userData);
        userId = userRes.data.id;
      } catch (err) {
        console.warn("Ignoring duplicate email or creation error", err);
        userId = Date.now();
      }

      await handleRazorpayPayment(selectedPlan, userId, userData.name, userData.email, userData.mobile);
      setIsModalOpen(false);
      setPaymentState('idle');
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Something went wrong. Please try again.');
      setPaymentState('collectingData');
    }
  };

  const currentPricing = pricingData[activeExperience] || { plans: [], combos: [] };
  const plansToDisplay = activeTab === 'plans' ? currentPricing.plans : currentPricing.combos;

  return (
    <div className="resume-page-wrapper">
      {/* ── 1. HERO SECTION ── */}
      <section className="rp-hero-section">
        <div className="app-container">
          <div className="rp-hero-content">
            <div className="rp-hero-badge">
              <span className="rp-badge-dot" />
              Executive ATS Resume Writing &amp; LinkedIn Optimization
            </div>

            <h1 className="rp-hero-title">
              Land 3x More Executive Interviews <br />
              <span className="rp-text-gradient">with ATS-Compliant Career Assets</span>
            </h1>

            <p className="rp-hero-desc">
              Handcrafted by certified career strategists and senior HR leaders.
              100% ATS parsing guaranteed, keyword-optimized for recruiter search algorithms, and backed by a 6-month revision guarantee.
            </p>

            <div className="rp-hero-proof-row">
              <div className="rp-proof-chip">
                <strong>100%</strong>
                <span>ATS Parsing Score</span>
              </div>
              <div className="rp-proof-divider" />
              <div className="rp-proof-chip">
                <strong>3–5 Days</strong>
                <span>Fast Turnaround</span>
              </div>
              <div className="rp-proof-divider" />
              <div className="rp-proof-chip">
                <strong>Unlimited</strong>
                <span>Revisions Included</span>
              </div>
              <div className="rp-proof-divider" />
              <div className="rp-proof-chip">
                <strong>6 Months</strong>
                <span>Direct Support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PRICING & EXPERIENCE SELECTOR ── */}
      <section className="rp-pricing-section">
        <div className="app-container">
          <div className="experience-selector-container">
            <span className="rp-kicker">Transparent Career Pricing</span>
            <h2 className="experience-title">Choose Your Experience Level</h2>
            <p className="rp-exp-sub">
              Pricing is calibrated based on career seniority, keyword complexity, and executive narrative depth.
            </p>

            <div className="experience-buttons">
              {experienceLevels.map((level) => (
                <button
                  key={level}
                  className={`exp-button ${activeExperience === level ? 'active' : ''}`}
                  onClick={() => setActiveExperience(level)}
                >
                  {level === '20+' ? '20+ Years Exp' : `${level} Years Exp`}
                </button>
              ))}
            </div>
          </div>

          {/* Individual vs Combo Tabs */}
          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tab-button ${activeTab === 'plans' ? 'active' : ''}`}
                onClick={() => setActiveTab('plans')}
              >
                Individual Services
              </button>
              <button
                className={`tab-button ${activeTab === 'combos' ? 'active' : ''}`}
                onClick={() => setActiveTab('combos')}
              >
                Value Combos (Save up to 15%)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="plans-wrapper">
            {plansToDisplay.map((plan) => (
              <PricingCard 
                key={`${activeExperience}-${plan.title}`} 
                plan={plan} 
                isCombo={activeTab === 'combos'} 
                handlePayment={handleBuyNowClick}
              />
            ))}
          </div>

          {/* Trust Guarantees Strip */}
          <div className="rp-trust-grid">
            <div className="rp-trust-card">
              <div className="rp-tc-icon">
                <ShieldCheckIcon />
              </div>
              <div className="rp-tc-content">
                <h4>100% ATS Pass Guarantee</h4>
                <p>Scored against Workday, Taleo, Greenhouse &amp; iCIMS with 95%+ parse accuracy.</p>
              </div>
            </div>
            <div className="rp-trust-card">
              <div className="rp-tc-icon">
                <ClockFastIcon />
              </div>
              <div className="rp-tc-content">
                <h4>72-Hour Express Delivery</h4>
                <p>First executive draft delivered in 3 to 5 business days with rapid iteration turnaround.</p>
              </div>
            </div>
            <div className="rp-trust-card">
              <div className="rp-tc-icon">
                <RefreshIcon />
              </div>
              <div className="rp-tc-content">
                <h4>Unlimited Revisions &amp; 6M Support</h4>
                <p>Direct collaborative reviews with senior career strategists until 100% interview-ready.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. PAYMENT MODAL ── */}
      {isModalOpen && (
        <PaymentFormModal
          plan={selectedPlan}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          paymentState={paymentState}
          errorMessage={errorMessage}
        />
      )}

      {/* ── 4. OPTIONAL QR CODE MODAL ── */}
      {upiQRCode && (
        <div className="qr-modal">
          <h3>Scan QR Code to Pay via UPI</h3>
          <QRCodeCanvas value={upiQRCode} size={200} />
          <button onClick={() => setUpiQRCode(null)}>Close</button>
        </div>
      )}

      {/* ── 5. RESUME SAMPLES SHOWCASE ── */}
      <ResumeSamples />
    </div>
  );
}

export default ResumePage;
