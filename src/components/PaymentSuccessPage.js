import React from 'react';
import { Link } from 'react-router-dom';
import './PaymentSuccessPage.css';

function PaymentSuccessPage() {
    return (
        <div className="success-page-container">
            <div className="success-card">
                <div className="success-icon-wrapper">
                    <svg className="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                        <circle className="success-icon-circle" cx="26" cy="26" r="25" fill="none"/>
                        <path className="success-icon-checkmark" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                </div>
                <h2>Payment Successful!</h2>
                <p className="success-message">
                    Thank you for your purchase. Your order has been confirmed.
                    <br/>
                    We will be in touch with you shortly to begin the process.
                </p>
                <Link to="/" className="home-button">Back to Home</Link>
            </div>
        </div>
    );
}

export default PaymentSuccessPage;