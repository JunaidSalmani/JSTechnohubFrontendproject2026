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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        message: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

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

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || formData.name.trim().length < 2) {
            setFormError("Please enter your name (at least 2 characters).");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email.trim())) {
            setFormError("Please enter a valid email address.");
            return;
        }
        if (formData.phoneNumber) {
            const phoneCleaned = formData.phoneNumber.replace(/[^0-9]/g, "");
            if (phoneCleaned.length > 0 && (phoneCleaned.length < 10 || phoneCleaned.length > 15)) {
                setFormError("Please enter a valid 10-digit phone number.");
                return;
            }
        }

        setFormError(null);
        setSubmitting(true);

        const enquiryData = {
            ...formData,
            courseId: course.id,
            courseTitle: course.title
        };

        try {
            await submitEnquiry(enquiryData);


            // =====================================================
            // ===== OPENAI ADS CONVERSION CODE - START =====
            // =====================================================

            if (typeof window.oaiq === "function") {
                window.oaiq("measure", "lead_created", {
                    type: "customer_action"
                });
            }

            // ===================================================
            // ===== OPENAI ADS CONVERSION CODE - END =====
            // ===================================================


            // Show success message after successful submission
            setFormSubmitted(true);

        } catch (err) {
            setFormError(
                "Failed to submit enquiry. Please check your details and try again."
            );

            console.error(err);

            // Keep form open if submission fails
            setFormSubmitted(false);

        } finally {
            setSubmitting(false);
        }
    };


    if (loading) {
        return (
            <p className="loading-message">
                Loading course details...
            </p>
        );
    }

    if (error) {
        return (
            <p className="error-message">
                {error}
            </p>
        );
    }

    if (!course) {
        return <p>Course not found.</p>;
    }

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
                        <li>
                            <strong>Start Date:</strong>{" "}
                            {new Date(course.startDate).toLocaleDateString()}
                        </li>

                        <li>
                            <strong>Duration:</strong> {course.duration}
                        </li>

                        <li>
                            <strong>Timings:</strong> {course.timings}
                        </li>

                        <li>
                            <strong>Price:</strong> ₹{course.price}
                        </li>
                    </ul>
                </div>

                <aside className="course-detail-sidebar">

                    <div className="enquiry-form-container">

                        {formSubmitted ? (

                            <div className="form-success-message">
                                <h3>Thank You!</h3>

                                <p>
                                    Your enquiry for "{course.title}" has been
                                    received. We will get back to you shortly.
                                </p>
                            </div>

                        ) : (

                            <form onSubmit={handleFormSubmit}>

                                <h3>Enquire About This Course</h3>

                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder=" "
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label>Your Name *</label>
                                </div>

                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder=" "
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <label>Your Email *</label>
                                </div>

                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        placeholder=" "
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                    <label>Phone Number</label>
                                </div>

                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        placeholder=" "
                                        rows="4"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                    ></textarea>
                                    <label>Your Message</label>
                                </div>

                                <button
                                    type="submit"
                                    className="btn-submit-enquiry"
                                    disabled={submitting}
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Submit Enquiry"}
                                </button>

                                {submitting && (
                                    <p className="submitting-message">
                                        Please wait while we submit your enquiry...
                                    </p>
                                )}

                                {formError && (
                                    <p className="error-message-form">
                                        {formError}
                                    </p>
                                )}

                            </form>
                        )}

                    </div>

                </aside>
            </div>
        </div>
    );
}

export default CourseDetailPage;