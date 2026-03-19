import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseById, submitEnquiry } from '../services/api';
import './CourseDetailPage.css';


function CourseDetailPage() {
    const { id } = useParams(); 
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form states
    const [formData, setFormData] = useState({ name: '', email: '', phoneNumber: '', message: '' });
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(null);
    const [submitting, setSubmitting] = useState(false); // NEW

    useEffect(() => {
        const fetchCourse = async () => {
            if (!id) return;
            try {
                const response = await getCourseById(id);
                setCourse(response.data);
            } catch (err) {
                setError("Could not find the requested course.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

   
    setFormSubmitted(true);

    const enquiryData = {
        ...formData,
        courseId: course.id,
        courseTitle: course.title
    };

    try {
        await submitEnquiry(enquiryData);
     
    } catch (err) {
        setFormError("Failed to submit enquiry. Please check your details and try again.");
        console.error(err);
        // rollback if API failed
        setFormSubmitted(false);
    }
};


    if (loading) return <p className="loading-message">Loading course details...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!course) return <p>Course not found.</p>;

    return (
        <div className="course-detail-page">
            <header className="course-detail-hero">
                <h1>{course.title}</h1>
            </header>

            <div className="course-detail-main-content">
                <div className="course-detail-info">
                    <h2>Course Overview</h2>
                    <p>{course.description}</p>
                    <ul>
                        <li><strong>Start Date:</strong> {new Date(course.startDate).toLocaleDateString()}</li>
                        <li><strong>Duration:</strong> {course.duration}</li>
                        <li><strong>Timings:</strong> {course.timings}</li>
                        <li><strong>Price:</strong> ₹{course.price}</li>
                    </ul>
                </div>
                
                <aside className="course-detail-sidebar">
                    <div className="enquiry-form-container">
                        {formSubmitted ? (
                            <div className="form-success-message">
                                <h3>Thank You!</h3>
                                <p>Your enquiry for "{course.title}" has been received. We will get back to you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleFormSubmit}>
                                <h3>Enquire About This Course</h3>
                                <div className="form-group">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        placeholder="Your Name*" 
                                        value={formData.name} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        placeholder="Your Email*" 
                                        value={formData.email} 
                                        onChange={handleInputChange} 
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <input 
                                        type="tel" 
                                        name="phoneNumber" 
                                        placeholder="Phone Number" 
                                        value={formData.phoneNumber} 
                                        onChange={handleInputChange} 
                                    />
                                </div>
                                <div className="form-group">
                                    <textarea 
                                        name="message" 
                                        placeholder="Your Message" 
                                        rows="4" 
                                        value={formData.message} 
                                        onChange={handleInputChange}
                                    ></textarea>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn-submit-enquiry" 
                                    disabled={submitting}
                                >
                                    {submitting ? "Submitting..." : "Submit Enquiry"}
                                </button>
                                {submitting && <p className="submitting-message">Please wait while we submit your enquiry...</p>}
                                {formError && <p className="error-message-form">{formError}</p>}
                            </form>
                        )}
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default CourseDetailPage;
