import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  addInterviewQuestion,
  getAllInterviewQuestions,
  deleteInterviewQuestion,
} from "../services/api";

const PRESET_CATEGORIES = [
  "JavaScript",
  "React",
  "Java",
  "Spring Boot",
  "Salesforce",
  "SQL",
  "DevOps",
  "Python",
];

const InterviewQuestionForm = () => {
  const [mode, setMode] = useState("bank"); // 'bank' | 'add'
  const [allQuestions, setAllQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expandedId, setExpandedId] = useState(null);

  // Form states
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete Question Handler
  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!id) return;
    if (window.confirm("Permanently delete this interview question from IQ Bank?")) {
      try {
        await deleteInterviewQuestion(id);
        setMessage({ type: "success", text: "Question deleted successfully!" });
        setAllQuestions((prev) => prev.filter((q) => q.id !== id));
        setTimeout(() => setMessage(null), 3000);
      } catch (err) {
        console.error("Failed to delete question:", err);
        alert("Could not delete question. Please try again.");
      }
    }
  };

  // Fetch Questions
  const fetchQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getAllInterviewQuestions();
      setAllQuestions(res.data || []);
    } catch (err) {
      console.error("Failed to load interview questions:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Derived categories
  const categoriesList = useMemo(() => {
    const set = new Set(allQuestions.map((q) => q.category).filter(Boolean));
    return ["All", ...Array.from(set)];
  }, [allQuestions]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter((q) => {
      const matchesCat =
        selectedCategory === "All" || q.category === selectedCategory;
      const matchesSearch =
        !searchTerm ||
        (q.question && q.question.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (q.answer && q.answer.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (q.category && q.category.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [allQuestions, selectedCategory, searchTerm]);

  // Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category.trim() || category.trim().length < 2) {
      setMessage({ type: "error", text: "Please specify a valid category (at least 2 characters)." });
      return;
    }
    if (!question.trim() || question.trim().length < 5) {
      setMessage({ type: "error", text: "Please enter a valid interview question (at least 5 characters)." });
      return;
    }
    if (!answer.trim() || answer.trim().length < 10) {
      setMessage({ type: "error", text: "Please provide a detailed answer (at least 10 characters)." });
      return;
    }
    setIsSubmitting(true);
    setMessage(null);
    try {
      await addInterviewQuestion({
        question: question.trim(),
        answer: answer.trim(),
        category: category.trim(),
      });
      setMessage({ type: "success", text: "Interview question published successfully!" });
      setQuestion("");
      setAnswer("");
      setCategory("");
      fetchQuestions();
      setTimeout(() => {
        setMode("bank");
        setMessage(null);
      }, 1200);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to publish question. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="panel animate-in">
      {/* ── Panel Header ── */}
      <div className="panel-head">
        <div className="panel-head-left">
          <div className="panel-icon" style={{ "--accent": "#a855f7" }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
            </svg>
          </div>
          <div>
            <h2 className="panel-title">Interview Question Bank</h2>
            <p className="panel-sub">
              {allQuestions.length} technical questions published
            </p>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            className={`btn-ghost ${mode === "bank" ? "iq-tab-active" : ""}`}
            onClick={() => setMode("bank")}
          >
            📋 Question Bank ({allQuestions.length})
          </button>
          <button
            className={`btn-primary btn-sm ${mode === "add" ? "iq-tab-active" : ""}`}
            onClick={() => setMode("add")}
          >
            + New Question
          </button>
        </div>
      </div>

      {/* ── MODE 1: BANK LIST ── */}
      {mode === "bank" && (
        <div className="iq-container">
          {/* Controls Bar */}
          <div className="iq-controls">
            <div className="iq-search-wrap">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="iq-search-icon"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="cf-input iq-search-input"
                placeholder="Search questions or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter Pills */}
            <div className="filter-tabs" style={{ flexWrap: "wrap" }}>
              {categoriesList.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? "filter-btn--active" : ""}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Question List */}
          {isLoading ? (
            <p className="empty-msg">Loading question bank...</p>
          ) : filteredQuestions.length === 0 ? (
            <div className="empty-msg">
              <p>No questions found matching your search.</p>
              <button
                className="btn-text"
                style={{ marginTop: "8px" }}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="iq-list">
              {filteredQuestions.map((q, idx) => {
                const isOpen = expandedId === (q.id || idx);
                return (
                  <div key={q.id || idx} className="iq-card">
                    <div
                      className="iq-card-header"
                      onClick={() =>
                        setExpandedId(isOpen ? null : q.id || idx)
                      }
                    >
                      <div className="iq-question-title-wrap">
                        <span className="iq-badge">{q.category || "General"}</span>
                        <h4 className="iq-question-text">{q.question}</h4>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {q.id && (
                          <button
                            type="button"
                            className="btn-delete"
                            style={{
                              padding: "5px 12px",
                              fontSize: "12px",
                              borderRadius: "6px",
                              flex: "none",
                            }}
                            onClick={(e) => handleDelete(q.id, e)}
                            title="Delete question from IQ bank"
                          >
                            Delete
                          </button>
                        )}
                        <span
                          className={`iq-arrow ${isOpen ? "iq-arrow--open" : ""}`}
                        >
                          ▼
                        </span>
                      </div>
                    </div>

                    {isOpen && (
                      <div className="iq-answer-box animate-in">
                        <p className="iq-answer-label">ANSWER & EXPLANATION</p>
                        <p className="iq-answer-text">{q.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── MODE 2: ADD QUESTION FORM ── */}
      {mode === "add" && (
        <form className="course-form" onSubmit={handleSubmit}>
          {message && (
            <div
              className={`iq-alert ${
                message.type === "success" ? "iq-alert--success" : "iq-alert--error"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className="cf-group">
            <input
              type="text"
              className="cf-input"
              placeholder=" "
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <label className="cf-label">
              Category <span className="cf-req">*</span>
            </label>
            {/* Quick Presets */}
            <div className="iq-presets">
              <span className="iq-preset-label">Quick select:</span>
              {PRESET_CATEGORIES.map((p) => (
                <button
                  type="button"
                  key={p}
                  className={`iq-preset-chip ${category === p ? "iq-preset-chip--selected" : ""}`}
                  onClick={() => setCategory(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="cf-group">
            <textarea
              className="cf-input cf-textarea"
              rows={3}
              placeholder=" "
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
            <label className="cf-label">
              Interview Question <span className="cf-req">*</span>
            </label>
          </div>

          <div className="cf-group">
            <textarea
              className="cf-input cf-textarea"
              rows={6}
              placeholder=" "
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
            <label className="cf-label">
              Detailed Answer <span className="cf-req">*</span>
            </label>
          </div>

          <div className="cf-actions">
            <button
              type="button"
              className="btn-ghost"
              onClick={() => setMode("bank")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Publishing..." : "Publish Question"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default InterviewQuestionForm;
