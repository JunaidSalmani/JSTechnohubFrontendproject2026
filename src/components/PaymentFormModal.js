// src/components/PaymentFormModal.js

import React, { useState } from 'react';
import './PaymentFormModal.css'; 

function PaymentFormModal({ plan, onSubmit, onClose, paymentState, onOtpSubmit, errorMessage }) {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
    const [otp, setOtp] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleOtpFormSubmit = (e) => {
        e.preventDefault();
        onOtpSubmit(otp);
    };

    const isLoading = ['sendingOtp', 'verifyingOtp', 'processingPayment'].includes(paymentState);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close-btn" onClick={onClose}>&times;</button>
                
                <h3>Complete Your Purchase</h3>
                <div className="plan-summary">
                    You are purchasing the <strong>"{plan.title}"</strong> plan for <strong>₹{plan.price}</strong>.
                </div>

                {isLoading && (
                    <div className="loading-overlay">
                        <div className="spinner"></div>
                        <p>
                            {paymentState === 'sendingOtp' && 'Sending OTP to your email...'}
                            {paymentState === 'verifyingOtp' && 'Verifying OTP...'}
                            {paymentState === 'processingPayment' && 'Preparing your secure payment...'}
                        </p>
                    </div>
                )}

                {paymentState === 'collectingData' && (
                    <form onSubmit={handleFormSubmit}>
                        <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
                        <input type="tel" name="mobile" placeholder="Mobile Number" value={formData.mobile} onChange={handleChange} required />
                        <button type="submit" className="submit-btn">Proceed to Verify</button>
                    </form>
                )}

                {paymentState === 'collectingOtp' && (
                    <form onSubmit={handleOtpFormSubmit} className="otp-form">
                        <p>An OTP has been sent to <strong>{formData.email}</strong>. Please enter it below.</p>
                        <input type="text" name="otp" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                        <button type="submit" className="submit-btn">Verify & Pay</button>
                    </form>
                )}
                
                {errorMessage && <p className="error-message">{errorMessage}</p>}

            </div>
        </div>
    );
}

export default PaymentFormModal;