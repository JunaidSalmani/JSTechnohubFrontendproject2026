import React, { useState } from "react";
import "./ServiceFAQAccordion.css";

export default function ServiceFAQAccordion({ title = "Frequently Asked Questions", faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate JSON-LD schema for FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <section className="faq-acc-section">
      {/* Inject FAQ JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="faq-acc-container">
        <div className="faq-acc-header">
          <span className="faq-acc-pill">Got Questions?</span>
          <h2 className="faq-acc-title">{title}</h2>
          <p className="faq-acc-sub">
            Find answers to commonly asked questions about course structure, exam eligibility, certification process, and enrollment.
          </p>
        </div>

        <div className="faq-acc-list">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`faq-acc-item ${isOpen ? "faq-acc-open" : ""}`}
              >
                <button
                  className="faq-acc-btn"
                  onClick={() => toggleFAQ(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-acc-question">{faq.q}</span>
                  <span className="faq-acc-icon">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="faq-acc-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
