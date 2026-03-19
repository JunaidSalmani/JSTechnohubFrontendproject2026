import React, { useState } from 'react';
import './ServicesPage.css';

// Data for our services
const servicesData = [
    {
        title: "Master Oracle SQL & PL/SQL – Unlock High-Demand Tech Skills",
description: "Ready to elevate your career with in-demand database skills? Join our on-demand Oracle SQL & PL/SQL webinar to gain practical, interview-focused expertise and advance your tech career.",
outcomes: [
  "Build core SQL and advanced PL/SQL skills",
  "Apply real-time projects to reinforce learning",
  "Learn performance tuning and optimization techniques",
  "Prepare for technical interviews with confidence"
]
    },
    {title: "Master Java Programming – From Basics to Advanced",
description: "Accelerate your career with our comprehensive Java course. Learn core Java, object-oriented programming, and advanced concepts with hands-on, project-focused training designed for job readiness.",
outcomes: [
  "Build strong foundations in core Java and OOP concepts",
  "Develop real-time projects and practical coding skills",
  "Master advanced topics like multithreading, collections, and Java streams",
  "Prepare for Java technical interviews and coding assessments"
]
}
];

// Reusable FAQ Item Component
const FaqItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="faq-item">
            <button className="faq-question" onClick={() => setIsOpen(!isOpen)}>
                <span>{question}</span>
                <span className={`faq-icon ${isOpen ? 'open' : ''}`}>+</span>
            </button>
            <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                <p>{answer}</p>
            </div>
        </div>
    );
};

function ServicesPage() {
    return (
        <div className="services-page-container">
            {/* Section 1: Hero */}
            <header className="services-hero">
                <div className="hero-content">
                    <h1>Services Designed for Your Success</h1>
                    <p className="subtitle">Discover our tailored coaching programs designed to help you achieve your professional and personal goals.</p>
                </div>
            </header>

            {/* Section 2: Service Offerings */}
            <section className="services-section">
                <div className="section-title">
                    <h2>Our Coaching Programs</h2>
                </div>
                <div className="services-grid">
                    {servicesData.map((service, index) => (
                        <div className="service-card" key={index}>
                            <h3>{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                            <h4>Key Outcomes:</h4>
                            <ul>
                                {service.outcomes.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                            <a href="/courses" className="service-button">Learn More</a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 3: How It Works */}
            <section className="how-it-works-section">
                <div className="section-title">
                    <h2>Our Simple 3-Step Process</h2>
                </div>
                <div className="process-steps">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Discovery Call</h3>
                        <p>A complimentary 30-minute call to discuss your goals and see if we're a good fit.</p>
                    </div>
                    <div className="step-connector"></div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Strategy Session</h3>
                        <p>A deep-dive 90-minute session to create a personalized roadmap for your success.</p>
                    </div>
                    <div className="step-connector"></div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Ongoing Support</h3>
                        <p>Regular coaching sessions with continuous support to keep you accountable and on track.</p>
                    </div>
                </div>
            </section>

            {/* Section 4: Testimonial */}
            <section className="testimonial-section">
                 <div className="testimonial-content">
                    
                    <blockquote>
                        "Working with JSTechnoHub was a game-changer. I not only found a new career path but also gained a level of confidence I never thought possible. The investment paid for itself tenfold."
                    </blockquote>
                    <cite>- Priya Sharma, Former Client</cite>
                 </div>
            </section>

            {/* Section 5: FAQ */}
            <section className="faq-section">
                <div className="section-title">
                    <h2>Frequently Asked Questions</h2>
                </div>
                <div className="faq-list">
                    <FaqItem
                        question="Who is coaching for?"
                        answer="Coaching is for anyone who is committed to growth and ready to make a positive change in their life. Whether you're feeling stuck, facing a major transition, or wanting to level up, coaching provides the structure and support to get you there faster."
                    />
                    <FaqItem
                        question="What is the difference between coaching and therapy?"
                        answer="Therapy often focuses on healing past traumas and managing mental health conditions, while coaching is forward-focused. We work on where you are now, where you want to be, and create an actionable plan to bridge that gap."
                    />
                    <FaqItem
                        question="How long does a typical coaching engagement last?"
                        answer="Most clients see significant results within 3 to 6 months. We offer various packages to suit different needs, starting from a 3-month commitment to ensure we have enough time to create lasting change."
                    />
                </div>
            </section>
            
            {/* Section 6: Final CTA */}
            <section className="services-cta">
                <h2>Ready to Take the First Step?</h2>
                <p>Your journey to a more fulfilling life and career starts with a single conversation. Let's talk.</p>
                <a href="/contact" className="cta-button">Book Your Free Discovery Call</a>
            </section>
        </div>
    );
}

export default ServicesPage;