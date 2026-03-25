import React from "react";
import "./TermsPage.css";

function TermsPage() {
  return (
    <div className="terms-container">
      <div className="terms-content">
        <h2>Terms and Conditions</h2>
        <em>Last Updated: September 7, 2025</em>

        <div className="legal-disclaimer">
          <strong>
            Please read these Terms and Conditions ("Terms") carefully before
            using our services.
          </strong>{" "}
          Your access to and use of the service is conditioned on your
          acceptance of and compliance with these Terms.
        </div>

        <h3>1. Introduction</h3>
        <p>
          Welcome to <strong>JSTechnoHub</strong> ("we", "our", "us"). These
          Terms govern your use of our website and the coaching services we
          provide (collectively, the "Services"). By purchasing or using our
          Services, you agree to be bound by these Terms.
        </p>

        <h3>2. Services</h3>
        <p>
          JSTechnoHub provides personal and professional development coaching,
          including but not limited to, one-on-one sessions, group programs, and
          digital materials. The specifics of your coaching package will be
          outlined in your service agreement or on the product page at the time
          of purchase.
        </p>

        <h3>3. Payments and Fees</h3>
        <p>
          All payments for Services are processed through our third-party
          payment gateway, Razorpay. All fees are quoted in Indian Rupees (INR)
          and are due in full before the commencement of any coaching service.
          You agree to provide current, complete, and accurate purchase and
          account information for all purchases made.
        </p>

        <h3>4. Cancellation and Refund Policy</h3>
        <p>This policy is a key requirement for payment gateways.</p>
        <ul>
          <li>
            <strong>Client Cancellation:</strong> To reschedule a one-on-one
            coaching session, you must provide at least{" "}
            <strong>48 hours' notice</strong>. Sessions cancelled with less than
            48 hours' notice will be forfeited without a refund.
          </li>
          <li>
            <strong>Coach Cancellation:</strong> If we need to cancel a session,
            we will notify you as soon as possible and reschedule the session at
            a mutually convenient time.
          </li>
          <li>
            <strong>Refunds:</strong> All fees for services rendered are
            strictly <strong>non-refundable</strong>. For coaching packages, no
            refunds will be provided for sessions already completed. Refunds for
            remaining, unused sessions in a package are at the sole discretion
            of JSTechnoHub and may be subject to an administrative fee. Digital
            products are non-refundable once purchased.
          </li>
        </ul>

        <h3>5. Intellectual Property</h3>
        <p>
          All materials provided to you as part of the Services, including
          worksheets, guides, and presentations, are the intellectual property
          of JSTechnoHub. They are for your personal, non-commercial use only.
          You may not share, reproduce, or resell our materials without our
          express written consent.
        </p>

        <h3>6. Disclaimer of Guarantees</h3>
        <p>
          You acknowledge that coaching is a subjective service and that your
          success depends on your own effort, motivation, and commitment.
          JSTechnoHub does not guarantee any specific outcomes or results from
          our coaching. We are here to guide and support you, but the
          responsibility for your progress lies with you.
        </p>

        <h3>7. Confidentiality</h3>
        <p>
          We are committed to maintaining the confidentiality of all client
          communications. Information you share with us will be kept private,
          except where disclosure is required by law.
        </p>

        <h3>8. Limitation of Liability</h3>
        <p>
          JSTechnoHub shall not be liable for any indirect, incidental, or
          consequential damages resulting from your use of our Services. Our
          total liability to you for any cause of action whatsoever is limited
          to the total amount paid by you for the Services.
        </p>

        <h3>9. Governing Law</h3>
        <p>
          These Terms shall be governed by and construed in accordance with the
          laws of [Your State, India], without regard to its conflict of law
          provisions.
        </p>

        <h3>10. Changes to Terms</h3>
        <p>
          We reserve the right to modify these Terms at any time. We will notify
          you of any changes by posting the new Terms on this page. You are
          advised to review these Terms periodically for any changes.
        </p>

        <h3>11. Contact Us</h3>
        <p>
          If you have any questions about these Terms, please contact us at:
          <br />
          <strong>support@jstechnohub.com</strong>
        </p>
      </div>
    </div>
  );
}

export default TermsPage;
