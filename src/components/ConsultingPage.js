// src/components/ConsultingPage.js

import React from 'react';
import './ConsultingPage.css';

const ConsultingPage = () => {
  return (
    <section className="consulting-section">
      <div className="consulting-container">
        {/* Title and Introduction */}
        <div className="consulting-hero">
          <h2>Consulting Services for Your Workforce Needs</h2>
          <p>
            Our team provides expert advice and strategies to enhance your talent
            acquisition process, workforce planning, and employee engagement. 
          </p>
          <a href="#contact" className="cta-btn">Get Started</a>
        </div>

        {/* Feature List */}
        <div className="consulting-features">
          <div className="consulting-box">
            <img src="icons/strategy.svg" alt="Workforce Strategy" />
            <h3>Workforce Strategy</h3>
            <p>Tailored solutions to build a workforce aligned with your business goals.</p>
          </div>
          <div className="consulting-box">
            <img src="icons/recruitment.svg" alt="Recruitment Solutions" />
            <h3>Recruitment Solutions</h3>
            <p>Expert recruitment strategies to find the best talent for your organization.</p>
          </div>
          <div className="consulting-box">
            <img src="icons/employee-engagement.svg" alt="Employee Engagement" />
            <h3>Employee Engagement</h3>
            <p>Boost employee satisfaction and retention through personalized strategies.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ConsultingPage;
