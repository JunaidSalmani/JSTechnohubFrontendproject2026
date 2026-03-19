import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../services/api'; 
import './CoursesPage.css';

function CoursesPage() {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

   
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                
                const response = await getAllCourses();
                setCourses(response.data);
                setError(null);
            } catch (err) {
                setError("Failed to load courses. Please try again later.");
                console.error("API Error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []); 

    return (
        <div className="courses-page-container">
            <header className="courses-hero">
                <div className="hero-content">
                    <h1>Invest in Your Growth</h1>
                    <p className="subtitle">Browse our expert-led courses and take the next step in your personal and professional development journey.</p>
                </div>
            </header>

            <section className="courses-section">
                {/* --- Conditional rendering for loading and error states --- */}
                {loading && <p className="loading-message">Loading available courses...</p>}
                {error && <p className="error-message">{error}</p>}

                {!loading && !error && (
                    <div className="courses-grid">
                        {courses.length > 0 ? (
                            courses.map(course => (
                                <div className="course-card" key={course.id}>
                                    <div className="card-header">
                                        <h3>{course.title}</h3>
                                    </div>
                                    <div className="card-content">
                                      
                                     
                                        <p>{course.description.substring(0, 100)}...</p>
                                    </div>
                                    <div className="course-meta">
                                        <span><strong>Duration:</strong> {course.duration || 'N/A'}</span>
                                        <span><strong>Timings:</strong> {course.timings || 'N/A'}</span>
                                    </div>
                                    <div className="card-footer">
                                        <span className="course-price">₹{course.price}</span>
                                        <Link to={`/course/${course.id}`} className="btn-details">View Details</Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No courses are available at the moment. Please check back later.</p>
                        )}
                    </div>
                )}
            </section>
            
            <section className="value-prop-section">
                <div className="section-title"><h2>Why Learn With ProCoach?</h2></div>
                <div className="value-prop-grid">
                    <div className="value-prop-item"><div className="icon-wrapper">✓</div><h3>Expert Instructors</h3><p>Learn from certified coaches and industry veterans with real-world experience.</p></div>
                    <div className="value-prop-item"><div className="icon-wrapper">✓</div><h3>Practical Frameworks</h3><p>We focus on actionable strategies and tools you can apply immediately.</p></div>
                    <div className="value-prop-item"><div className="icon-wrapper">✓</div><h3>Community Support</h3><p>Join a vibrant community of like-minded peers for networking and support.</p></div>
                </div>
            </section>

            <section className="courses-cta">
                <h2>Looking for Corporate Training?</h2>
                <p>We offer customized training programs and workshops for teams and organizations. Let's discuss your needs.</p>
                <Link to="/contact" className="cta-button">Contact Us</Link>
            </section>
        </div>
    );
}

export default CoursesPage;