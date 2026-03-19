import React from 'react';
import './AboutUsPage.css';



function AboutUsPage() {
    return (
        <div className="about-us-container">
            {/* Section 1: Hero */}
            <header className="about-hero">
                <div className="hero-content">
                    <h1>Your Transformation is Our Passion</h1>
                    <p className="subtitle">We're not just coaches; we're partners in your journey to unlock your fullest potential.</p>
                </div>
            </header>

            {/* Section 2: Our Story */}
            <section className="about-section story-section">
                <div className="story-content">
                    <h2>Our Story: From Challenge to Calling</h2>
                    <p>
                        <strong>JSTechnoHub</strong> was born not from a business plan, but from a personal breakthrough. Our founder, Alex Dawson, spent years navigating the high-pressure corporate world, feeling stuck and unfulfilled. It was through a journey of self-discovery and mentorship that Alex realized true success isn't about climbing a ladder, but about building a life aligned with one's authentic purpose.
                    </p>
                    <p>
                        This transformation sparked a calling: to provide others with the tools, support, and accountability needed to make their own pivotal shifts. We don't just teach theory; we coach from a place of deep, personal experience.
                    </p>
                </div>
               
            </section>

            {/* Section 3: Our Philosophy */}
            <section className="about-section philosophy-section">
                <h2>Our Coaching Philosophy</h2>
                <div className="philosophy-cards">
                    <div className="philosophy-card">
                        <h3>1. You Are the Expert</h3>
                        <p>We believe you hold the answers. Our role is not to dictate, but to ask powerful questions that unlock your inner wisdom and empower you to find your own path.</p>
                    </div>
                    <div className="philosophy-card">
                        <h3>2. Action Creates Clarity</h3>
                        <p>Clarity doesn't come from just thinking; it comes from doing. We focus on creating small, consistent, and courageous action steps that build momentum and lead to profound insights.</p>
                    </div>
                    <div className="philosophy-card">
                        <h3>3. Authenticity is Your Superpower</h3>
                        <p>Your unique story, strengths, and even your vulnerabilities are your greatest assets. We create a safe, non-judgmental space for you to embrace your authentic self and lead from it.</p>
                    </div>
                </div>
            </section>
            
            {/* Section 4: Call to Action */}
            <section className="about-cta">
                <h2>Ready to Start Your Transformation?</h2>
                <p>If our story resonates with you, you're in the right place. Let's explore how we can achieve your goals, together.</p>
                <a href="/services" className="cta-button">Explore Our Services</a>
            </section>
        </div>
    );
}

export default AboutUsPage;