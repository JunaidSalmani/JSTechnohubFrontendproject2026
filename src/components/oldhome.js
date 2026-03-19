import React, { useEffect } from "react"; // Import useEffect
import { Link } from "react-router-dom";
import './HomePage.css'; // Your new CSS file

function HomePage() {
  // useEffect to handle scroll animations
  useEffect(() => {
    const sections = document.querySelectorAll('.homepage section');

    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.15 // Trigger when 15% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // Stop observing once animated
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    // Cleanup function for useEffect
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="homepage"> 
      {/* Hero Section */}
      <section className="mb-12"> 
        <h1 className="text-4xl font-bold mb-4"> 
          Unlock Your Career Potential with Expert Coaching & Certifications
        </h1>
        <p>
          Welcome to our professional training and career development platform. 
          Whether you are a fresher just starting your journey, a working 
          professional looking to upskill, or a leader preparing for senior 
          management roles, we are here to support you every step of the way.
        </p>
        <p className="mt-4">
          Our institute combines industry-recognized certifications, modern 
          technology training, and career-focused services like Resume Writing, 
          Cover Letter Drafting, and LinkedIn Profile Optimization. We ensure 
          you stand out in competitive job markets with globally accepted 
          credentials and a powerful professional brand.
        </p>
      </section>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
        <p>
          We are a team of certified trainers, industry professionals, and 
          career consultants with years of experience across IT, Management, 
          Finance, and Business domains. Our mission is simple: empower 
          individuals with the right skills, the right certifications, and 
          the right presentation of their achievements.
        </p>
        <p className="mt-3">
          From technical training in <strong>SQL, Java, VMware, CCNA</strong> 
          to business-focused certifications like <strong>CBAP, CAPM, and CIA</strong>, 
          we offer a wide variety of programs tailored to different career paths.
        </p>
        <p className="mt-3">
          Additionally, our career-building services such as professional 
          resumes, ATS-friendly cover letters, and search-engine-optimized 
          LinkedIn profiles have helped thousands secure global opportunities.
        </p>
      </section>

      {/* Services Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Our Core Services</h2>
        <ul className="list-disc ml-6 space-y-2"> {/* Custom list styling in CSS */}
          <li>
            <strong>Professional Resume Writing:</strong> Industry-tailored 
            resumes designed for ATS and international acceptance.{" "}
            <Link to="/resume">
              Explore Resume Services
            </Link>
          </li>
          <li>
            <strong>Cover Letters:</strong> Role-specific, compelling cover 
            letters to strengthen your applications.
          </li>
          <li>
            <strong>LinkedIn Profile Optimization:</strong> SEO-focused LinkedIn 
            profiles that attract recruiters worldwide.
          </li>
          <li>
            <strong>Certification Training:</strong> Globally recognized programs 
            including Salesforce, Palo Alto, CCNA, VMware, CAMS, CIA, and more.{" "}
            <Link to="/certifications">
              View All Certifications
            </Link>
          </li>
          <li>
            <strong>Programming Courses:</strong> SQL, Java, and emerging 
            technologies designed for practical, hands-on learning.
          </li>
          <li>
            <strong>Career Guidance:</strong> One-on-one mentorship, job market 
            insights, and interview preparation support.
          </li>
        </ul>
      </section>

      {/* Why Choose Us */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Why Choose Us?</h2>
        <p>
          Choosing the right training partner can define your career trajectory. 
          Here’s why learners around the world trust us:
        </p>
        <ol className="list-decimal ml-6 space-y-2 mt-3"> {/* Custom ordered list styling in CSS */}
          <li>Experienced trainers with global certifications.</li>
          <li>Courses designed around real-world applications.</li>
          <li>Flexible learning paths for freshers, mid-level, and senior professionals.</li>
          <li>Affordable pricing with international acceptance.</li>
          <li>Personalized career services beyond training.</li>
        </ol>
      </section>

      {/* Certification Highlight */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-3">Popular Certifications</h2>
        <p>
          Our certification portfolio spans IT, Business, Finance, and Security 
          domains. Here are some of the most in-demand certifications we provide:
        </p>
        <ul className="list-disc ml-6 space-y-1 mt-3">
          <li>Salesforce Administrator & Developer Certification</li>
          <li>Cisco Certified Network Associate (CCNA)</li>
          <li>Palo Alto Networks Security Certification</li>
          <li>VMware Professional Certification</li>
          <li>Certified Business Analysis Professional (CBAP)</li>
          <li>Certified Anti-Money Laundering Specialist (CAMS)</li>
          <li>Certified Internal Auditor (CIA)</li>
          <li>Certified Associate Project Management (CAPM)</li>
        </ul>
        <p className="mt-4">
          <Link to="/certifications">
            See Full Certification List
          </Link>
        </p>
      </section>

      {/* Programming Courses */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Programming Training</h2>
        <p>
          In addition to certifications, we provide hands-on programming courses 
          that prepare you for technical interviews and industry projects:
        </p>
        <ul className="list-disc ml-6 space-y-1 mt-3">
          <li><strong>SQL Training:</strong> From basics to advanced queries, optimization, and database design.</li>
          <li><strong>Java Development:</strong> Core Java, OOP principles, JDBC, and frameworks for real-world use.</li>
        </ul>
      </section>

      {/* Career Services */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">Career Services</h2>
        <p>
          Training alone is not enough. That’s why we go beyond certifications 
          with a complete set of career services to boost your professional brand:
        </p>
        <ul className="list-disc ml-6 space-y-1 mt-3">
          <li>Resume Writing – ATS Compatible, Globally Accepted</li>
          <li>Cover Letters – Job-Specific & Professionally Drafted</li>
          <li>LinkedIn Profile Optimization – SEO Friendly & Recruiter Ready</li>
          <li>Interview Preparation – Mock Interviews & Feedback</li>
          <li>Career Mentorship – Personalized Roadmaps & Guidance</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-3">What Our Learners Say</h2>
        <p>
          Thousands of professionals have trusted us to shape their careers. 
          Here’s what they have to say:
        </p>
        <blockquote className="border-l-4 pl-4 italic mt-3">
          <p>“The resume and LinkedIn services gave me confidence in my job 
          applications. Within weeks, I was getting more interview calls than ever.”</p>
        </blockquote>
        <blockquote className="border-l-4 pl-4 italic mt-3">
          <p>“The SQL and Java training helped me clear my technical interview. 
          The trainers focus on practical learning, which made a huge difference.”</p>
        </blockquote>
      </section>

      {/* Call to Action */}
      <section className="mb-12 text-center">
        <h2 className="text-2xl font-semibold mb-3">Ready to Transform Your Career?</h2>
        <p>
          Explore our certifications, training programs, and career services 
          today. Take the first step toward building a career that matches 
          your aspirations.
        </p>
        <div className="mt-4 cta-buttons"> {/* Use new cta-buttons class */}
          <Link to="/certifications" className="btn btn-primary"> {/* Apply new button classes */}
            Explore Certifications
          </Link>
          <Link to="/resume" className="btn btn-secondary"> {/* Apply new button classes */}
            Explore Resume Services
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;