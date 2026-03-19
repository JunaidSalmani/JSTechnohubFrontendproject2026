import React, { useState, useEffect, useCallback } from "react";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllEnquiries,
  toggleEnquiryClarified,
  getAllReviews,
  toggleReviewApproval,
} from "../services/api";
import "./AdminPage.css";
import InterviewQuestionForm from "./InterviewQuestionForm";

/* ─── Icons (inline SVG — no extra dependency) ───────────────── */
const Icon = ({ name, size = 16 }) => {
  const icons = {
    enquiries: (
      <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
    ),
    courses: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </>
    ),
    add: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v8M8 12h8" />
      </>
    ),
    questions: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" />
      </>
    ),
    reviews: (
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
    ),
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </>
    ),
    edit: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z" />
      </>
    ),
    trash: (
      <>
        <polyline points="3,6 5,6 21,6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      </>
    ),
    check: <polyline points="20,6 9,17 4,12" />,
    refresh: (
      <>
        <polyline points="23,4 23,10 17,10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </>
    ),
    mail: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
    phone: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.09 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
    star: (
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    ),
    menu: (
      <>
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    ),
    close: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    plus: (
      <>
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </>
    ),
    tag: (
      <>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {icons[name]}
    </svg>
  );
};

/* ─── Constants ──────────────────────────────────────────────── */
const EMPTY_COURSE = {
  title: "",
  description: "",
  price: "",
  startDate: "",
  duration: "",
  timings: "",
};

const TABS = [
  { id: "dashboard", label: "Overview", icon: "dashboard" },
  { id: "enquiries", label: "Enquiries", icon: "enquiries" },
  { id: "existing", label: "Courses", icon: "courses" },
  { id: "manage", label: "Add / Edit", icon: "add" },
  { id: "interviewQuestions", label: "IQ Bank", icon: "questions" },
  { id: "reviews", label: "Reviews", icon: "reviews" },
];

/* ─── Stat card ──────────────────────────────────────────────── */
const StatCard = ({ label, value, icon, accent, sub }) => (
  <div className="stat-card" style={{ "--accent": accent }}>
    <div className="stat-icon">
      <Icon name={icon} size={20} />
    </div>
    <div className="stat-body">
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
      {sub && <p className="stat-sub">{sub}</p>}
    </div>
    <div className="stat-glow" aria-hidden="true" />
  </div>
);

/* ─── Course form ────────────────────────────────────────────── */
const CourseForm = ({ initialCourse, isEditing, onSave, onCancel }) => {
  const [course, setCourse] = useState({ ...EMPTY_COURSE, ...initialCourse });

  useEffect(
    () => setCourse({ ...EMPTY_COURSE, ...initialCourse }),
    [initialCourse],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((p) => ({ ...p, [name]: value }));
  };

  return (
    <div className="panel animate-in">
      <div className="panel-head">
        <div className="panel-head-left">
          <div className="panel-icon" style={{ "--accent": "#00C2FF" }}>
            <Icon name={isEditing ? "edit" : "add"} size={18} />
          </div>
          <div>
            <h2 className="panel-title">
              {isEditing ? "Edit Course" : "New Course"}
            </h2>
            <p className="panel-sub">
              {isEditing
                ? "Update course details below"
                : "Fill in the details to publish a new course"}
            </p>
          </div>
        </div>
      </div>

      <form
        className="course-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(course);
        }}
      >
        <div className="cf-group">
          <label className="cf-label">
            Course Title <span className="cf-req">*</span>
          </label>
          <input
            className="cf-input"
            type="text"
            name="title"
            value={course.title || ""}
            onChange={handleChange}
            placeholder="e.g. Advanced Salesforce CRM"
            required
          />
        </div>
        <div className="cf-group">
          <label className="cf-label">
            Description <span className="cf-req">*</span>
          </label>
          <textarea
            className="cf-input cf-textarea"
            name="description"
            value={course.description || ""}
            onChange={handleChange}
            placeholder="What will students learn?"
            rows={4}
            required
          />
        </div>
        <div className="cf-row">
          <div className="cf-group">
            <label className="cf-label">
              Price (INR) <span className="cf-req">*</span>
            </label>
            <div className="cf-prefix-wrap">
              <span className="cf-prefix">₹</span>
              <input
                className="cf-input cf-prefix-input"
                type="number"
                name="price"
                value={course.price || ""}
                onChange={handleChange}
                placeholder="4999"
                required
              />
            </div>
          </div>
          <div className="cf-group">
            <label className="cf-label">Duration</label>
            <input
              className="cf-input"
              type="text"
              name="duration"
              value={course.duration || ""}
              onChange={handleChange}
              placeholder="e.g. 8 Weeks"
            />
          </div>
        </div>
        <div className="cf-row">
          <div className="cf-group">
            <label className="cf-label">Start Date</label>
            <input
              className="cf-input"
              type="date"
              name="startDate"
              value={course.startDate || ""}
              onChange={handleChange}
            />
          </div>
          <div className="cf-group">
            <label className="cf-label">Timings</label>
            <input
              className="cf-input"
              type="text"
              name="timings"
              value={course.timings || ""}
              onChange={handleChange}
              placeholder="e.g. 7–9 PM IST"
            />
          </div>
        </div>
        <div className="cf-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <Icon name={isEditing ? "check" : "plus"} size={15} />
            {isEditing ? "Update Course" : "Publish Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

/* ─── Main AdminPage ─────────────────────────────────────────── */
function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCourse, setCurrentCourse] = useState(EMPTY_COURSE);
  const [isEditing, setIsEditing] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [c, e, r] = await Promise.allSettled([
        getAllCourses(),
        getAllEnquiries(),
        getAllReviews(),
      ]);
      if (c.status === "fulfilled") setCourses(c.value.data || []);
      if (e.status === "fulfilled") {
        const sorted = [...(e.value.data || [])].sort((a, b) => {
          if (a.clarified !== b.clarified) return a.clarified ? 1 : -1;
          return b.id - a.id;
        });
        setEnquiries(sorted);
      }
      if (r.status === "fulfilled") setReviews(r.value.data || []);
    } catch (err) {
      console.error("fetchAllData error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleToggleReview = async (id) => {
    try {
      await toggleReviewApproval(id);
      fetchAllData();
    } catch {
      alert("Could not update review status.");
    }
  };

  const handleToggleClarified = async (type, id) => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === id && e.type === type ? { ...e, clarified: !e.clarified } : e,
      ),
    );
    try {
      await toggleEnquiryClarified(type, id);

      fetchAllData();
    } catch (err) {
      console.error("Failed to update enquiry:", err);

      fetchAllData();
    }
  };

  const handleSaveCourse = async (courseData) => {
    const finalData = {
      ...courseData,
      price: parseFloat(courseData.price) || 0,
    };
    try {
      if (isEditing) await updateCourse(finalData.id, finalData);
      else await createCourse(finalData);
      fetchAllData();
      setActiveTab("existing");
    } catch {
      alert("Error: Could not save course.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Permanently delete this course?")) {
      try {
        await deleteCourse(id);
        setCourses((p) => p.filter((c) => c.id !== id));
      } catch {
        alert("Error: Could not delete course.");
      }
    }
  };

  const navigate = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  /* Derived stats */
  const newLeads = enquiries.filter((e) => !e.clarified).length;
  const pendingRevs = reviews.filter((r) => !r.approved).length;
  const filteredEnq =
    filterStatus === "all"
      ? enquiries
      : enquiries.filter((e) =>
          filterStatus === "pending" ? !e.clarified : e.clarified,
        );

  /* Status badge */
  const StatusBadge = ({ enquiry }) => {
    const text = enquiry.status || (enquiry.clarified ? "RESOLVED" : "PENDING");
    const map = {
      RESOLVED: "badge-resolved",
      PENDING: "badge-pending",
      CONTACTED: "badge-contacted",
      CONVERTED: "badge-converted",
    };
    return (
      <span className={`badge ${map[text] || "badge-pending"}`}>{text}</span>
    );
  };

  return (
    <div className={`adm ${sidebarOpen ? "adm--sidebar-open" : ""}`}>
      {/* ── Sidebar ── */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-logo">
          <span className="adm-logo-js">JS</span>
          <span className="adm-logo-t">T</span>
          <span className="adm-logo-rest">echno</span>
          <span className="adm-logo-h">H</span>
          <span className="adm-logo-rest">ub</span>
        </div>

        <div className="adm-sidebar-section">
          <p className="adm-sidebar-section-label">Main Menu</p>
          <nav className="adm-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`adm-nav-btn ${activeTab === tab.id ? "adm-nav-btn--active" : ""}`}
                onClick={() => navigate(tab.id)}
              >
                <span className="adm-nav-icon">
                  <Icon name={tab.icon} size={17} />
                </span>
                <span className="adm-nav-label">{tab.label}</span>
                {tab.id === "enquiries" && newLeads > 0 && (
                  <span className="adm-nav-badge">{newLeads}</span>
                )}
                {tab.id === "reviews" && pendingRevs > 0 && (
                  <span className="adm-nav-badge adm-nav-badge--gold">
                    {pendingRevs}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="adm-sidebar-footer">
          <button className="adm-refresh-btn" onClick={fetchAllData}>
            <Icon name="refresh" size={14} /> Refresh Data
          </button>
        </div>
      </aside>

      {/* ── Overlay for mobile ── */}
      {sidebarOpen && (
        <div className="adm-overlay" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Main area ── */}
      <div className="adm-main">
        {/* Topbar */}
        <header className="adm-topbar">
          <button
            className="adm-hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle menu"
          >
            <Icon name={sidebarOpen ? "close" : "menu"} size={20} />
          </button>
          <div className="adm-topbar-title">
            <h1>
              {TABS.find((t) => t.id === activeTab)?.label || "Dashboard"}
            </h1>
          </div>
          <div className="adm-topbar-right">
            {newLeads > 0 && (
              <button
                className="adm-alert-pill"
                onClick={() => navigate("enquiries")}
              >
                <span className="adm-alert-dot" />
                {newLeads} new lead{newLeads !== 1 ? "s" : ""}
              </button>
            )}
            <div className="adm-avatar">A</div>
          </div>
        </header>

        {/* Content */}
        <main className="adm-content">
          {isLoading ? (
            <div className="adm-loading">
              <div className="adm-spinner" />
              <p>Loading dashboard data…</p>
            </div>
          ) : (
            <>
              {/* ── DASHBOARD overview ── */}
              {activeTab === "dashboard" && (
                <div className="animate-in">
                  <div className="stats-grid">
                    <StatCard
                      label="Total Courses"
                      value={courses.length}
                      icon="courses"
                      accent="#00C2FF"
                      sub="Published & live"
                    />
                    <StatCard
                      label="New Leads"
                      value={newLeads}
                      icon="enquiries"
                      accent="#F0A500"
                      sub="Awaiting response"
                    />
                    <StatCard
                      label="Total Enquiries"
                      value={enquiries.length}
                      icon="mail"
                      accent="#34D399"
                      sub="All time"
                    />
                    <StatCard
                      label="Pending Reviews"
                      value={pendingRevs}
                      icon="reviews"
                      accent="#FF6B8A"
                      sub="Awaiting approval"
                    />
                  </div>

                  <div className="dash-grid">
                    {/* Recent enquiries */}
                    <div className="panel">
                      <div className="panel-head">
                        <div className="panel-head-left">
                          <div
                            className="panel-icon"
                            style={{ "--accent": "#F0A500" }}
                          >
                            <Icon name="enquiries" size={16} />
                          </div>
                          <h3 className="panel-title">Recent Enquiries</h3>
                        </div>
                        <button
                          className="btn-text"
                          onClick={() => navigate("enquiries")}
                        >
                          View all →
                        </button>
                      </div>
                      <div className="recent-list">
                        {enquiries.slice(0, 5).map((e) => (
                          <div
                            key={e.id}
                            className={`recent-row ${!e.clarified ? "recent-row--new" : ""}`}
                          >
                            <div className="recent-avatar">
                              {(e.name || "?")[0].toUpperCase()}
                            </div>
                            <div className="recent-info">
                              <p className="recent-name">{e.name}</p>
                              <p className="recent-meta">
                                {e.title || "General Inquiry"}
                              </p>
                            </div>
                            <span
                              className={`badge ${!e.clarified ? "badge-pending" : "badge-resolved"}`}
                            >
                              {e.clarified ? "Done" : "New"}
                            </span>
                          </div>
                        ))}
                        {enquiries.length === 0 && (
                          <p className="empty-msg">No enquiries yet.</p>
                        )}
                      </div>
                    </div>

                    {/* Course overview */}
                    <div className="panel">
                      <div className="panel-head">
                        <div className="panel-head-left">
                          <div
                            className="panel-icon"
                            style={{ "--accent": "#00C2FF" }}
                          >
                            <Icon name="courses" size={16} />
                          </div>
                          <h3 className="panel-title">Live Courses</h3>
                        </div>
                        <button
                          className="btn-text"
                          onClick={() => navigate("existing")}
                        >
                          Manage →
                        </button>
                      </div>
                      <div className="recent-list">
                        {courses.slice(0, 5).map((c) => (
                          <div key={c.id} className="recent-row">
                            <div className="recent-avatar recent-avatar--cyan">
                              {(c.title || "C")[0]}
                            </div>
                            <div className="recent-info">
                              <p className="recent-name">{c.title}</p>
                              <p className="recent-meta">
                                ₹{c.price?.toLocaleString()}
                              </p>
                            </div>
                            <button
                              className="btn-icon-sm"
                              onClick={() => {
                                setIsEditing(true);
                                setCurrentCourse(c);
                                navigate("manage");
                              }}
                            >
                              <Icon name="edit" size={13} />
                            </button>
                          </div>
                        ))}
                        {courses.length === 0 && (
                          <p className="empty-msg">No courses yet.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── ENQUIRIES ── */}
              {activeTab === "enquiries" && (
                <div className="panel animate-in">
                  <div className="panel-head">
                    <div className="panel-head-left">
                      <div
                        className="panel-icon"
                        style={{ "--accent": "#F0A500" }}
                      >
                        <Icon name="enquiries" size={18} />
                      </div>
                      <div>
                        <h2 className="panel-title">All Enquiries</h2>
                        <p className="panel-sub">
                          {newLeads} unresolved · {enquiries.length} total
                        </p>
                      </div>
                    </div>
                    <div className="filter-tabs">
                      {["all", "pending", "resolved"].map((f) => (
                        <button
                          key={f}
                          className={`filter-btn ${filterStatus === f ? "filter-btn--active" : ""}`}
                          onClick={() => setFilterStatus(f)}
                        >
                          {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="table-wrap">
                    <table className="adm-table">
                      <thead>
                        <tr>
                          <th>Status</th>
                          <th>Source</th>
                          <th>Interested In</th>
                          <th>Contact</th>
                          <th>Message</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredEnq.length > 0 ? (
                          filteredEnq.map((enq) => (
                            <tr
                              key={`${enq.type}-${enq.id}`}
                              className={enq.clarified ? "" : "tr--highlight"}
                            >
                              <td data-label="Status">
                                <StatusBadge enquiry={enq} />
                              </td>
                              <td data-label="Source">
                                <span
                                  className={`type-chip type-chip--${enq.type}`}
                                >
                                  {enq.type}
                                </span>
                              </td>
                              <td data-label="Interested In">
                                <span className="td-strong">
                                  {enq.title || "Consulting Inquiry"}
                                </span>
                              </td>
                              <td data-label="Contact">
                                <div className="contact-cell">
                                  <span className="contact-name">
                                    {enq.name}
                                  </span>
                                  <a
                                    href={`mailto:${enq.email}`}
                                    className="contact-link"
                                  >
                                    <Icon name="mail" size={12} />
                                    {enq.email}
                                  </a>
                                  {enq.phone && (
                                    <span className="contact-phone">
                                      <Icon name="phone" size={12} />
                                      {enq.phone}
                                    </span>
                                  )}
                                </div>
                              </td>
                              <td data-label="Message">
                                <p className="msg-cell">{enq.message}</p>
                              </td>
                              <td data-label="Action">
                                <button
                                  className={`btn-toggle ${enq.clarified ? "btn-toggle--reopen" : "btn-toggle--resolve"}`}
                                  onClick={() =>
                                    handleToggleClarified(enq.type, enq.id)
                                  }
                                >
                                  {enq.clarified ? (
                                    <>
                                      <Icon name="refresh" size={13} /> Re-open
                                    </>
                                  ) : (
                                    <>
                                      <Icon name="check" size={13} /> Resolve
                                    </>
                                  )}
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" className="empty-cell">
                              No enquiries match this filter.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ── COURSES list ── */}
              {activeTab === "existing" && (
                <div className="panel animate-in">
                  <div className="panel-head">
                    <div className="panel-head-left">
                      <div
                        className="panel-icon"
                        style={{ "--accent": "#00C2FF" }}
                      >
                        <Icon name="courses" size={18} />
                      </div>
                      <div>
                        <h2 className="panel-title">Live Courses</h2>
                        <p className="panel-sub">{courses.length} published</p>
                      </div>
                    </div>
                    <button
                      className="btn-primary btn-sm"
                      onClick={() => {
                        setIsEditing(false);
                        setCurrentCourse(EMPTY_COURSE);
                        setActiveTab("manage");
                      }}
                    >
                      <Icon name="plus" size={14} /> New Course
                    </button>
                  </div>

                  {courses.length === 0 ? (
                    <p className="empty-msg">
                      No courses yet.{" "}
                      <button
                        className="btn-text"
                        onClick={() => setActiveTab("manage")}
                      >
                        Add one →
                      </button>
                    </p>
                  ) : (
                    <div className="course-grid">
                      {courses.map((c) => (
                        <div key={c.id} className="course-card">
                          <div className="cc-top">
                            <div className="cc-avatar">
                              {(c.title || "C")[0]}
                            </div>
                            <div className="cc-meta">
                              <p className="cc-title">{c.title}</p>
                              <p className="cc-price">
                                ₹{c.price?.toLocaleString()}
                              </p>
                            </div>
                          </div>
                          {c.duration && (
                            <p className="cc-detail">
                              <Icon name="tag" size={12} /> {c.duration}
                            </p>
                          )}
                          {c.timings && (
                            <p className="cc-detail">
                              <Icon name="eye" size={12} /> {c.timings}
                            </p>
                          )}
                          <div className="cc-actions">
                            <button
                              className="btn-edit"
                              onClick={() => {
                                setIsEditing(true);
                                setCurrentCourse(c);
                                setActiveTab("manage");
                              }}
                            >
                              <Icon name="edit" size={13} /> Edit
                            </button>
                            <button
                              className="btn-delete"
                              onClick={() => handleDelete(c.id)}
                            >
                              <Icon name="trash" size={13} /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── ADD / EDIT COURSE ── */}
              {activeTab === "manage" && (
                <CourseForm
                  initialCourse={currentCourse}
                  isEditing={isEditing}
                  onSave={handleSaveCourse}
                  onCancel={() => setActiveTab("existing")}
                />
              )}

              {/* ── INTERVIEW QUESTIONS ── */}
              {activeTab === "interviewQuestions" && (
                <div className="panel animate-in">
                  <div className="panel-head">
                    <div className="panel-head-left">
                      <div
                        className="panel-icon"
                        style={{ "--accent": "#34D399" }}
                      >
                        <Icon name="questions" size={18} />
                      </div>
                      <div>
                        <h2 className="panel-title">Interview Question Bank</h2>
                        <p className="panel-sub">
                          Manage questions shown to candidates
                        </p>
                      </div>
                    </div>
                  </div>
                  <InterviewQuestionForm />
                </div>
              )}

              {/* ── REVIEWS ── */}
              {activeTab === "reviews" && (
                <div className="panel animate-in">
                  <div className="panel-head">
                    <div className="panel-head-left">
                      <div
                        className="panel-icon"
                        style={{ "--accent": "#FF6B8A" }}
                      >
                        <Icon name="reviews" size={18} />
                      </div>
                      <div>
                        <h2 className="panel-title">Review Management</h2>
                        <p className="panel-sub">
                          {pendingRevs} pending approval ·{" "}
                          {reviews.filter((r) => r.approved).length} live
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="review-grid">
                    {reviews.length > 0 ? (
                      reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className={`review-card ${rev.approved ? "review-card--live" : ""}`}
                        >
                          <div className="rev-head">
                            <div className="rev-avatar">
                              {(rev.name || "?")[0].toUpperCase()}
                            </div>
                            <div className="rev-meta">
                              <p className="rev-name">{rev.name}</p>
                              <p className="rev-email">{rev.email}</p>
                            </div>
                            <span
                              className={`badge ${rev.approved ? "badge-resolved" : "badge-pending"}`}
                            >
                              {rev.approved ? "Live" : "Pending"}
                            </span>
                          </div>
                          <div className="rev-stars">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={
                                  i < rev.rating ? "star-filled" : "star-empty"
                                }
                              >
                                ★
                              </span>
                            ))}
                          </div>
                          <p className="rev-msg">"{rev.message}"</p>
                          <button
                            className={`btn-toggle ${rev.approved ? "btn-toggle--reopen" : "btn-toggle--resolve"}`}
                            style={{ width: "100%", justifyContent: "center" }}
                            onClick={() => handleToggleReview(rev.id)}
                          >
                            {rev.approved ? (
                              <>
                                <Icon name="close" size={13} /> Unpublish
                              </>
                            ) : (
                              <>
                                <Icon name="check" size={13} /> Approve &
                                Publish
                              </>
                            )}
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="empty-msg">No reviews yet.</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AdminPage;
