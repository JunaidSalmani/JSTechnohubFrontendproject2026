import React, { useState, useEffect, useMemo } from 'react';
import { getAllInterviewQuestions } from '../services/api';
import './InterviewQuestionPage.css'; 

const QUESTIONS_PER_PAGE = 5;

// Resilient curated questions displayed when backend is offline/unreachable
const FALLBACK_QUESTIONS = [
  {
    id: "fb-1",
    question: "What is the key difference between Predictive (Waterfall), Agile, and Hybrid project management methodologies?",
    answer: "Predictive (Waterfall) projects follow a plan-driven, sequential lifecycle where scope, time, and budget are determined early. Agile is iterative and value-driven, delivering working increments through short timeboxed sprints with continuous stakeholder feedback. Hybrid combines both approaches—for example, utilizing predictive governance for phase-gate budgeting while development teams build features iteratively via Scrum or Kanban.",
    category: "PMP & Project Management",
    createdAt: "2026-03-01T10:00:00Z"
  },
  {
    id: "fb-2",
    question: "How do you calculate and interpret SPI and CPI in Earned Value Management (EVM)?",
    answer: "Schedule Performance Index (SPI) = EV / PV (Earned Value divided by Planned Value). Cost Performance Index (CPI) = EV / AC (Earned Value divided by Actual Cost). An index greater than 1.0 indicates project work is ahead of schedule or under budget. An index below 1.0 flags schedule delays or cost overruns. Exactly 1.0 reflects baseline conformance.",
    category: "PMP & Project Management",
    createdAt: "2026-03-02T10:00:00Z"
  },
  {
    id: "fb-3",
    question: "What are the core architectural differences between SAP ECC and SAP S/4HANA?",
    answer: "SAP S/4HANA runs natively and exclusively on the SAP HANA in-memory column-store database. It introduces the Universal Journal (ACDOCA table), eliminating redundant aggregate and index tables (like BSIS, BSIK, GLT0). It provides real-time financial reporting, simplified data models, and an intuitive role-based SAP Fiori user interface.",
    category: "SAP S/4HANA",
    createdAt: "2026-03-03T10:00:00Z"
  },
  {
    id: "fb-4",
    question: "How does SAP MM integrate with SAP FICO during the Goods Receipt (MIGO) transaction?",
    answer: "During Goods Receipt for a Purchase Order (MIGO), SAP triggers automated account determination via transaction OBYC. It debits the Inventory Account (BSX key) and credits the GR/IR Clearing Account (WRX key) based on chart of accounts, valuation grouping code, and valuation class assigned in the material master.",
    category: "SAP S/4HANA",
    createdAt: "2026-03-04T10:00:00Z"
  },
  {
    id: "fb-5",
    question: "What is the difference between AWS IAM Roles and IAM Users?",
    answer: "An IAM User is a persistent identity with long-term credentials (password, secret access keys) intended for an individual person. An IAM Role provides temporary credentials via the AWS Security Token Service (STS) without hardcoded keys, ideal for services (like EC2 instance profiles, AWS Lambda) and cross-account access delegation.",
    category: "AWS Cloud",
    createdAt: "2026-03-05T10:00:00Z"
  },
  {
    id: "fb-6",
    question: "How do you design a highly available, fault-tolerant 3-tier architecture on AWS?",
    answer: "Distribute public subnets across at least two Availability Zones with an Application Load Balancer (ALB). Place application web/backend instances in private subnets across multiple AZs managed by Auto Scaling Groups. Utilize Amazon RDS Multi-AZ standby replica for zero-data-loss automated database failover, with Amazon S3 and CloudFront for cached static assets.",
    category: "AWS Cloud",
    createdAt: "2026-03-06T10:00:00Z"
  },
  {
    id: "fb-7",
    question: "What is the operational difference between Blue-Green and Canary deployment strategies?",
    answer: "Blue-Green deployment runs two identical production environments; the router/load balancer switches 100% of traffic from the old version (Blue) to the verified new version (Green). Canary deployment gradually routes a small percentage of real user traffic (e.g., 5-10%) to the new release, monitoring error rates, latency, and logs before systematically upgrading the entire cluster.",
    category: "DevOps & CI/CD",
    createdAt: "2026-03-07T10:00:00Z"
  },
  {
    id: "fb-8",
    question: "How does the Node.js event loop coordinate asynchronous, non-blocking I/O?",
    answer: "Node.js utilizes libuv to provide an event loop and worker thread pool. The loop processes distinct phases: Timers (setTimeout/setInterval), Pending I/O callbacks, Idle/Prepare, Poll (retrieves new I/O events), Check (setImmediate), and Close callbacks. High-priority microtasks (process.nextTick, Promise callbacks) run immediately between phases.",
    category: "Full Stack & Programming",
    createdAt: "2026-03-08T10:00:00Z"
  }
];

const QuestionItem = ({ item, isOpen, onClick }) => (
    <div className="question-item">
        <button className="question-header" onClick={onClick} aria-expanded={isOpen}>
            <h4>{item.question}</h4>
            <span className={`accordion-icon ${isOpen ? 'open' : ''}`}>&#9660;</span>
        </button>
        {isOpen && (
            <div className="question-answer">
                <div className="answer-content">{item.answer}</div>
                <div className="question-meta">
                    <span>Category: <strong>{item.category}</strong></span>
                    <span>Posted: {new Date(item.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        )}
    </div>
);

function InterviewQuestionsPage() {
    // --- STATE MANAGEMENT ---
    const [allQuestions, setAllQuestions] = useState(FALLBACK_QUESTIONS);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); 
    const [currentPage, setCurrentPage] = useState(1);
    const [openQuestionId, setOpenQuestionId] = useState(null);

    // --- DATA FETCHING WITH LUXURY SKELETON TRANSITION ---
    useEffect(() => {
        let isMounted = true;
        const startTime = Date.now();
        const fetchQuestions = async () => {
            try {
                const response = await getAllInterviewQuestions();
                if (isMounted && response?.data && Array.isArray(response.data) && response.data.length > 0) {
                    setAllQuestions(response.data);
                }
            } catch (err) {
                console.info('Backend interview-questions API offline. Displaying curated industry questions.');
            } finally {
                // Keep the premium skeleton shimmer visible for 1.4s so the user comfortably sees the loading transition
                const elapsed = Date.now() - startTime;
                const minDelay = Math.max(0, 1400 - elapsed);
                setTimeout(() => {
                    if (isMounted) setIsLoading(false);
                }, minDelay);
            }
        };
        fetchQuestions();
        return () => { isMounted = false; };
    }, []);

    const categories = useMemo(() => ['All', ...new Set(allQuestions.map(q => q.category))], [allQuestions]);

    const filteredQuestions = useMemo(() => {
        let result = allQuestions;

        if (selectedCategory !== 'All') {
            result = result.filter(q => q.category === selectedCategory);
        }

        if (searchTerm) {
            result = result.filter(q => 
                q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                q.answer.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        return result;
    }, [searchTerm, selectedCategory, allQuestions]);

    // --- PAGINATION LOGIC ---
    const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
    const currentQuestions = filteredQuestions.slice((currentPage - 1) * QUESTIONS_PER_PAGE, currentPage * QUESTIONS_PER_PAGE);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1); 
    };

    return (
        <div className="iq-container">
            <header className="iq-header">
                <h1>Daily Interview Questions</h1>
                <p>Sharpen your skills with our curated list of questions, updated daily.</p>
            </header>

            <div className="iq-main-layout">
                {/* --- SIDEBAR FOR FILTERS --- */}
                <aside className="iq-sidebar">
                    <div className="sidebar-widget">
                        <div className="fl-field">
                            <input 
                                type="text" 
                                placeholder=" " 
                                className="iq-search"
                                value={searchTerm}
                                onChange={e => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                            <label>Search questions...</label>
                        </div>
                    </div>
                    <div className="sidebar-widget">
                        <h3 className="sidebar-title">Categories</h3>

                        {/* Desktop category list */}
                        <div className="category-buttons desktop-only">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                                    onClick={() => handleCategoryChange(cat)}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Mobile category select dropdown */}
                        <div className="category-select-wrapper mobile-only">
                            <select
                                className="category-select"
                                value={selectedCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                aria-label="Filter by category"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat === 'All' ? 'All Categories' : cat}
                                    </option>
                                ))}
                            </select>
                            <span className="select-chevron">&#9660;</span>
                        </div>
                    </div>
                </aside>

                {/* --- MAIN CONTENT AREA --- */}
                <main className="iq-content-area">
                    {isLoading ? (
                        <div className="iq-loading-wrapper">
                            <div className="iq-loader-pill">
                                <div className="iq-spinner-orb">
                                    <span className="iq-orb-dot" />
                                </div>
                                <span className="iq-loader-text">Loading verified interview questions...</span>
                            </div>
                            <div className="iq-skeleton-list">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <div key={n} className="iq-skeleton-card">
                                        <div className="iq-sk-header">
                                            <div className="iq-sk-line iq-sk-title" />
                                            <div className="iq-sk-chevron" />
                                        </div>
                                        <div className="iq-sk-footer">
                                            <div className="iq-sk-line iq-sk-badge" />
                                            <div className="iq-sk-line iq-sk-date" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="iq-list">
                                {currentQuestions.length > 0 ? (
                                    currentQuestions.map(item => (
                                        <QuestionItem
                                            key={item.id}
                                            item={item}
                                            isOpen={openQuestionId === item.id}
                                            onClick={() => setOpenQuestionId(openQuestionId === item.id ? null : item.id)}
                                        />
                                    ))
                                ) : (
                                    <p className="iq-feedback-message">No questions found matching your criteria.</p>
                                )}
                            </div>

                            {totalPages > 1 && (
                                <nav className="pagination-controls">
                                    <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                                        &laquo; Prev
                                    </button>

                                    <span>Page {currentPage} of {totalPages}</span>
                                    <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                                        Next &raquo;
                                    </button>
                                </nav>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default InterviewQuestionsPage;
