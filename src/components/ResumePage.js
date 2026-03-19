

import React, { useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react'; 
import './ResumePage.css';
import ResumeSamples from './ResumeSamples';
import PaymentFormModal from './PaymentFormModal';
import { useNavigate } from 'react-router-dom'; 
import { sendOtp, verifyOtpApi, createUser, createOrder, verifyPayment } from '../services/api';

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

// Pricing Card Component (Keep this component as is)
const PricingCard = ({ plan, isCombo, handlePayment }) => (
    <div className={`plan ${isCombo ? 'combo' : ''} ${plan.isFeatured ? 'featured' : ''}`}>
        {plan.isFeatured && <div className="featured-banner">Best Value</div>}
        <div className="plan-top">
            <div className="plan-header">
                {plan.title}
                {plan.subtitle && <span className="subtitle">{plan.subtitle}</span>}
            </div>
        </div>
        <div className="price-circle">
            ₹{plan.price}
            {plan.originalPrice && <span className="original-price"><s>₹{plan.originalPrice}</s></span>}
        </div>
        <div className="plan-body">
            <ul className="plan-features">
                {(isCombo ? comboFeatures[plan.title] : planFeatures[plan.title] || []).map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
            {/* <button className="buy-button" onClick={() => handlePayment(plan)}>BUY NOW</button> */}
                <button className="buy-button" onClick={() => window.location.href = 'tel:+918743039914'}>BUY NOW</button>

        </div>
    </div>
);

// --- Main ResumePage Component ---// --- Main ResumePage Component ---
function ResumePage() {
    // Existing States
    const [activeTab, setActiveTab] = useState('plans');
    const [activeExperience, setActiveExperience] = useState('14-20');
    const [upiQRCode, setUpiQRCode] = useState(null);
    
    // States for Modal and Payment Flow
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState(null);
    const [paymentState, setPaymentState] = useState('idle'); // collectingData | processingPayment
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const experienceLevels = ['0-3', '3-7', '7-14', '14-20', '20+'];

    // Razorpay Payment Logic (unchanged)
    const handleRazorpayPayment = (plan, userId, name, email, mobile) => {
        return new Promise(async (resolve, reject) => {
            try {
                const orderRes = await createOrder({ userId, amount: plan.price });
                const order = orderRes.data;

                const options = {
                    key: "rzp_test_REaS1BheNXdkjC",
                    amount: order.amount,
                    currency: order.currency,
                    name: "JSTechnoHub Service",
                    description: plan.title,
                    order_id: order.id,
                    handler: async function (response) {
                        try {
                            await verifyPayment({
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature
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
                        }
                    },
                    prefill: { name, email, contact: mobile },
                    theme: { color: "#3399cc" },
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } catch (err) {
                console.error("Failed to create Razorpay order", err);
                reject(err);
            }
        });
    };

    // --- MAIN FLOW ---

    // User clicks "BUY NOW"
    const handleBuyNowClick = (plan) => {
        setSelectedPlan(plan);
        setIsModalOpen(true);
        setPaymentState('collectingData');
        setErrorMessage('');
    };

    // User submits their details (directly continue to payment now)
    const handleFormSubmit = async (userData) => {
        try {
            setErrorMessage('');
            setPaymentState('processingPayment');
            setFormData(userData);

            // Save User
            let userId = null;
            try {
              const userRes = await createUser(userData);
              userId = userRes.data.id;
            } catch (err) {
              console.warn("Ignoring duplicate email or creation error", err);
              userId = Date.now();
            }

            // Start Razorpay Payment
            await handleRazorpayPayment(selectedPlan, userId, userData.name, userData.email, userData.mobile);

            // Close modal after success
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
        <div className={`pricing-container ${activeTab}-active`}>
            {/* --- Experience Selector and Tabs --- */}
            <div className="experience-selector-container">
                <h2 className="experience-title">Choose Your Experience Level</h2>
                <div className="experience-buttons">
                    {experienceLevels.map((level) => (
                        <button
                            key={level}
                            className={`exp-button ${activeExperience === level ? 'active' : ''}`}
                            onClick={() => setActiveExperience(level)}
                        >
                            {level === '20+' ? '20+ years' : `${level} years`}
                        </button>
                    ))}
                </div>
            </div>
            <div className="tabs">
                <button className={`tab-button ${activeTab === 'plans' ? 'active' : ''}`} onClick={() => setActiveTab('plans')}>
                    Plans
                </button>
                <button className={`tab-button ${activeTab === 'combos' ? 'active' : ''}`} onClick={() => setActiveTab('combos')}>
                    Combo
                </button>
            </div>

            {/* --- Pricing Cards --- */}
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

            {/* --- Payment Modal (only details form now) --- */}
            {isModalOpen && (
                <PaymentFormModal
                    plan={selectedPlan}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit} // Only form submit, no OTP now
                    paymentState={paymentState}
                    errorMessage={errorMessage}
                />
            )}

            {/* --- Optional QR --- */}
            {upiQRCode && (
                <div className="qr-modal">
                    <h3>Scan QR Code to Pay via UPI</h3>
                    <QRCodeCanvas value={upiQRCode} size={200} />
                    <button onClick={() => setUpiQRCode(null)}>Close</button>
                </div>
            )}
            <ResumeSamples />
        </div>
    );
}
export default ResumePage;