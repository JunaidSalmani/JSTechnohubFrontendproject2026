import React, { useState } from 'react';
import './ResumeSamples.css'; 


const resumeSamplesData = [
    {
        id: 1,
        title: 'Modern Chronological',
        description: 'A clean, professional design perfect for corporate roles. Highlights a clear career progression.',
        image: '/samples/resume-sample-1.png',
    },
    {
        id: 2,
        title: 'Creative Infographic',
        description: 'Ideal for designers, marketers, and roles where creativity is key. Visually engaging and unique.',
        image: '/samples/resume-sample-2.png',
    },
    {
        id: 3,
        title: 'Executive Minimalist',
        description: 'A sophisticated, concise layout for senior-level executives. Focuses on impact and achievements.',
        image: '/samples/resume-sample-3.png',
    }
];

function ResumeSamples() {
    // --- NEW: State to manage the fullscreen image view ---
    const [fullscreenImage, setFullscreenImage] = useState(null);

    // Function to open the modal
    const handleViewSample = (imageUrl) => {
        setFullscreenImage(imageUrl);
    };

    // Function to close the modal
    const handleCloseFullscreen = () => {
        setFullscreenImage(null);
    };

    return (
        <>
            <section className="samples-container">
                <div className="section-title-samples">
                    <h2>Our Work Speaks for Itself</h2>
                    <p>Take a look at some of the high-impact resumes we've crafted for our clients.</p>
                </div>
                <div className="samples-grid">
                    {resumeSamplesData.map(sample => (
                        <div className="sample-card" key={sample.id}>
                            <div className="sample-image-wrapper">
                                <img 
                                    src={sample.image} 
                                    alt={sample.title} 
                                    className="sample-image"
                                />
                                <div className="sample-overlay">
                                    {/* This is now a button that triggers the modal */}
                                    <button onClick={() => handleViewSample(sample.image)} className="btn-view-sample">
                                        View Sample
                                    </button>
                                </div>
                            </div>
                            <div className="sample-info">
                                <h3>{sample.title}</h3>
                                <p>{sample.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- NEW: Fullscreen Modal --- */}
            {/* This section will only render when fullscreenImage has a value */}
            {fullscreenImage && (
                <div className="fullscreen-modal" onClick={handleCloseFullscreen}>
                    <button className="btn-close-fullscreen">&times;</button>
                    <div className="fullscreen-content">
                        <img 
                            src={fullscreenImage} 
                            alt="Fullscreen resume sample" 
                            className="fullscreen-image"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default ResumeSamples;