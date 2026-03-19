import React, { useState } from 'react';
import { addInterviewQuestion } from '../services/api';

const InterviewQuestionForm = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question || !answer || !category) {
            setMessage({ type: 'error', text: 'All fields are required.' });
            return;
        }
        setIsSubmitting(true);
        setMessage('');
        try {
            await addInterviewQuestion({ question, answer, category });
            setMessage({ type: 'success', text: 'New question added successfully!' });
            // Clear form
            setQuestion('');
            setAnswer('');
            setCategory('');
        } catch (error) {
            setMessage({ type: 'error', text: 'Failed to add question. Please try again.' });
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="form-container card">
            <h3>Add New Interview Question</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Category</label>
                    <input
                        type="text"
                        placeholder="Enter category (e.g., JavaScript, React, etc.)"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Question</label>
                    <textarea
                        rows="3"
                        placeholder="Enter the interview question"
                        value={question}
                        onChange={e => setQuestion(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Answer</label>
                    <textarea
                        rows="5"
                        placeholder="Provide a detailed answer"
                        value={answer}
                        onChange={e => setAnswer(e.target.value)}
                        required
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Add Question'}
                    </button>
                </div>
            </form>
            {message && <p className={`form-message ${message.type}`}>{message.text}</p>}
        </div>
    );
};

export default InterviewQuestionForm;
