import React from 'react';
import './CancellationPolicyPage.css'; 

function CancellationPolicyPage() {
    return (
        <div className="cancellation-container">
            <div className="cancellation-content">
                <h2>Cancellations & Refund Policy</h2>
                <em>Last Updated: September 7, 2025</em>

                <h3>Our Commitment</h3>
                <p>
                    At <strong>JSTechnoHub</strong>, we are committed to providing our clients with exceptional coaching services. We understand that sometimes, schedule adjustments are necessary. This policy outlines our procedures for cancellations and refunds to ensure clarity and fairness for both our clients and our coaches.
                </p>

                <h3>1. One-on-One Coaching Sessions</h3>
                <p>
                    Your appointment time is reserved exclusively for you. We require a minimum of <strong>48 hours' notice</strong> for any rescheduling or cancellation of a one-on-one coaching session.
                </p>
                <ul>
                    <li>
                        <strong>Cancellations with More Than 48 Hours' Notice:</strong> If you cancel or reschedule with more than 48 hours' notice, your session fee can be applied to a future appointment at no additional cost.
                    </li>
                    <li>
                        <strong>Cancellations with Less Than 48 Hours' Notice:</strong> If you cancel your session with less than 48 hours' notice, or if you miss your appointment, the session will be considered forfeited. You will be charged the full fee for the session, and no refund will be provided.
                    </li>
                </ul>

                <h3>2. Coaching Packages & Programs</h3>
                <p>
                    Coaching packages are offered at a discounted rate and are non-refundable once the service has commenced.
                </p>
                <ul>
                    <li>The 48-hour notice period for rescheduling individual sessions (as outlined in Section 1) also applies to all sessions included in a package.</li>
                    <li>No refunds will be issued for any sessions within a package that have already been completed.</li>
                    <li>Refunds for any remaining, unused sessions in a package are at the sole discretion of JSTechnoHub and will be assessed on a case-by-case basis. Approved refunds may be subject to an administrative fee.</li>
                </ul>

                <h3>3. Digital Products & Online Courses</h3>
                <p>
                    Due to the immediate and digital nature of these products, all sales of digital downloads, online courses, and other pre-recorded materials are <strong>final and non-refundable</strong>. Please review the product description carefully before making a purchase.
                </p>

                <h3>4. How to Cancel or Reschedule</h3>
                <p>
                    All cancellation and rescheduling requests must be submitted in writing via email to <strong>[your-email@jstechnohub.com]</strong>. Requests sent via social media or other channels will not be considered valid.
                </p>

                <h3>5. Refund Process</h3>
                <p>
                    Please note that as a general policy, all services are non-refundable. In the rare event that a refund is approved by JSTechnoHub, it will be processed through the original method of payment (Razorpay) within 7-10 business days.
                </p>
                
                <h3>6. Questions</h3>
                <p>
                    If you have any questions about our Cancellation and Refund Policy, please contact us before making a purchase.
                    <br />
                    <strong>[your-email@jstechnohub.com]</strong>
                </p>
            </div>
        </div>
    );
}

export default CancellationPolicyPage;