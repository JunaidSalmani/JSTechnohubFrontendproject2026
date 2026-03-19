import React, { useState, useEffect, useMemo } from 'react';
import { getAllInterviewQuestions } from '../services/api';
import './InterviewQuestionPage.css'; 

const QUESTIONS_PER_PAGE = 5;


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
    const [allQuestions, setAllQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All'); 
    const [currentPage, setCurrentPage] = useState(1);
    const [openQuestionId, setOpenQuestionId] = useState(null);

    // --- DATA FETCHING ---
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await getAllInterviewQuestions();
                setAllQuestions(response.data);
            } catch (err) {
                setError('Failed to load questions. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchQuestions();
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
    
  
    if (isLoading) return <div className="iq-feedback-message">Loading Questions...</div>;
    if (error) return <div className="iq-feedback-message error">{error}</div>;

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
                        <h3 className="sidebar-title">Search</h3>
                        <input 
                            type="text" 
                            placeholder="Search questions..." 
                            className="iq-search"
                            value={searchTerm}
                            onChange={e => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1); // Reset page on new search
                            }}
                        />
                    </div>
                    <div className="sidebar-widget">
                        <h3 className="sidebar-title">Categories</h3>
                        <div className="category-buttons">
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
                    </div>
                </aside>

                {/* --- MAIN CONTENT AREA --- */}
                <main className="iq-content-area">
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
                </main>
            </div>
        </div>
    );
}

export default InterviewQuestionsPage;