// src/components/PaymentFormModal.js

import React, { useState } from 'react';
import './PaymentFormModal.css'; 

function PaymentFormModal({ plan, onSubmit, onClose, paymentState, onOtpSubmit, errorMessage }) {
    const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });
    const [otp, setOtp] = useState('');
    const [localErr, setLocalErr] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setLocalErr('');
        if (!formData.name.trim() || formData.name.trim().length < 2) {
            setLocalErr('Please enter a valid full name (at least 2 characters).');
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setLocalErr('Please enter a valid email address.');
            return;
        }
        const phoneCleaned = formData.mobile.replace(/[^0-9]/g, '');
        if (phoneCleaned.length < 10 || phoneCleaned.length > 15) {
            setLocalErr('Please enter a valid 10-digit mobile number.');
            return;
        }
        onSubmit(formData);
    };

    const handleOtpFormSubmit = (e) => {
        e.preventDefault();
        setLocalErr('');
        if (!otp.trim() || otp.trim().length < 4) {
            setLocalErr('Please enter a valid OTP code.');
            return;
        }
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
                        <div className="fl-field">
                            <input type="text" name="name" placeholder=" " value={formData.name} onChange={handleChange} required />
                            <label>Full Name *</label>
                        </div>
                        <div className="fl-field">
                            <input type="email" name="email" placeholder=" " value={formData.email} onChange={handleChange} required />
                            <label>Email Address *</label>
                        </div>
                        <div className="fl-field">
                            <input type="tel" name="mobile" placeholder=" " value={formData.mobile} onChange={handleChange} required />
                            <label>Mobile Number *</label>
                        </div>
                        <button type="submit" className="submit-btn">Proceed to Verify</button>
                    </form>
                )}

                {paymentState === 'collectingOtp' && (
                    <form onSubmit={handleOtpFormSubmit} className="otp-form">
                        <p>An OTP has been sent to <strong>{formData.email}</strong>. Please enter it below.</p>
                        <div className="fl-field">
                            <input type="text" name="otp" placeholder=" " value={otp} onChange={(e) => setOtp(e.target.value)} required />
                            <label>Enter 6-Digit OTP *</label>
                        </div>
                        <button type="submit" className="submit-btn">Verify & Pay</button>
                    </form>
                )}
                
                {localErr && <p className="error-message">⚠️ {localErr}</p>}
                {errorMessage && <p className="error-message">{errorMessage}</p>}

            </div>
        </div>
    );
}

export default PaymentFormModal;