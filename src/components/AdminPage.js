import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  getAllCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getAllEnquiries,
  toggleEnquiryClarified,
  getAllReviews,
  toggleReviewApproval,
  getAllBatches,
  createBatch,
  updateBatch,
  deleteBatch,
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
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
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

const EMPTY_BATCH = {
  dates: "",
  monthName: "",
  timing: "",
  timingType: "Morning Batch",
  dayType: "Weekend Batch | 8 Sessions",
  trainer: "JSTechnoHub Senior PMP® Trainer",
  venue: "Live Virtual Class",
  price: 9999,
  mrp: 19999,
  discount: "50% OFF",
};

const TABS = [
  { id: "dashboard", label: "Overview", icon: "dashboard" },
  { id: "enquiries", label: "Enquiries", icon: "enquiries" },
  { id: "batches", label: "Training Batches", icon: "calendar" },
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
          <input
            className="cf-input"
            type="text"
            name="title"
            value={course.title || ""}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <label className="cf-label">
            Course Title <span className="cf-req">*</span>
          </label>
        </div>
        <div className="cf-group">
          <textarea
            className="cf-input cf-textarea"
            name="description"
            value={course.description || ""}
            onChange={handleChange}
            placeholder=" "
            rows={4}
            required
          />
          <label className="cf-label">
            Description <span className="cf-req">*</span>
          </label>
        </div>
        <div className="cf-row">
          <div className="cf-group">
            <input
              className="cf-input"
              type="number"
              name="price"
              value={course.price || ""}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="cf-label">
              Price (INR ₹) <span className="cf-req">*</span>
            </label>
          </div>
          <div className="cf-group">
            <input
              className="cf-input"
              type="text"
              name="duration"
              value={course.duration || ""}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="cf-label">Duration</label>
          </div>
        </div>
        <div className="cf-row">
          <div className="cf-group">
            <input
              className="cf-input"
              type="date"
              name="startDate"
              value={course.startDate || ""}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="cf-label">Start Date</label>
          </div>
          <div className="cf-group">
            <input
              className="cf-input"
              type="text"
              name="timings"
              value={course.timings || ""}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="cf-label">Timings</label>
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

/* ─── Batch form ────────────────────────────────────────────── */
const BatchForm = ({ initialBatch, isEditing, onSave, onCancel }) => {
  const [batch, setBatch] = useState({ ...EMPTY_BATCH, ...initialBatch });

  useEffect(
    () => setBatch({ ...EMPTY_BATCH, ...initialBatch }),
    [initialBatch]
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatch((p) => ({ ...p, [name]: value }));
  };

  return (
    <div className="panel animate-in">
      <div className="panel-head">
        <div className="panel-head-left">
          <div className="panel-icon" style={{ "--accent": "#10b981" }}>
            <Icon name={isEditing ? "edit" : "add"} size={18} />
          </div>
          <div>
            <h2 className="panel-title">
              {isEditing ? "Edit Training Batch" : "Create New Training Batch"}
            </h2>
            <p className="panel-sub">
              {isEditing
                ? "Update batch dates, timings and schedule"
                : "Fill in schedule details to publish a new training batch"}
            </p>
          </div>
        </div>
      </div>

      <form
        className="course-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSave(batch);
        }}
      >
        <div className="cf-row">
          <div className="cf-group">
            <input
              className="cf-input"
              type="text"
              name="dates"
              value={batch.dates || ""}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="cf-label">
              Batch Dates (e.g. Oct 10 - Nov 01) <span className="cf-req">*</span>
            </label>
          </div>

          <div className="cf-group">
            <input
              className="cf-input"
              type="text"
              name="monthName"
              value={batch.monthName || ""}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="cf-label">
              Month & Year (e.g. Oct 2026) <span className="cf-req">*</span>
            </label>
          </div>
        </div>

        <div className="cf-row">
          <div className="cf-group">
            <input
              className="cf-input"
              type="text"
              name="timing"
              value={batch.timing || ""}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="cf-label">
              Class Timing (e.g. 07:00 PM - 11:30 PM IST) <span className="cf-req">*</span>
            </label>
          </div>

          <div className="cf-group">
            <select
              className="cf-input"
              name="timingType"
              value={batch.timingType || "Morning Batch"}
              onChange={handleChange}
              required
            >
              <option value="Morning Batch">Morning Batch</option>
              <option value="Evening Batch">Evening Batch</option>
            </select>
            <label className="cf-label">Batch Slot Type</label>
          </div>
        </div>

        <div className="cf-row">
          <div className="cf-group">
            <input
              className="cf-input"
              type="text"
              name="dayType"
              value={batch.dayType || ""}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="cf-label">Schedule Type (e.g. Weekend Batch | 8 Sessions)</label>
          </div>

          <div className="cf-group">
            <input
              className="cf-input"
              type="text"
              name="trainer"
              value={batch.trainer || ""}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="cf-label">Trainer / Instructor Name</label>
          </div>
        </div>

        <div className="cf-row">
          <div className="cf-group">
            <input
              className="cf-input"
              type="number"
              name="price"
              value={batch.price || ""}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="cf-label">Offer Price (₹)</label>
          </div>

          <div className="cf-group">
            <input
              className="cf-input"
              type="number"
              name="mrp"
              value={batch.mrp || ""}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <label className="cf-label">Original MRP (₹)</label>
          </div>

          <div className="cf-group">
            <input
              className="cf-input"
              type="text"
              name="discount"
              value={batch.discount || ""}
              onChange={handleChange}
              placeholder=" "
            />
            <label className="cf-label">Discount Badge (e.g. 50% OFF)</label>
          </div>
        </div>

        <div className="cf-actions">
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <Icon name={isEditing ? "check" : "plus"} size={15} />
            {isEditing ? "Update Batch" : "Publish Batch"}
          </button>
        </div>
      </form>
    </div>
  );
};

/**
 * Formats phone numbers for admin enquiries display with '+' and a space between country code and number.
 * Example: 917780286812 -> +91 7780286812
 */
export const formatDisplayPhone = (rawPhone) => {
  if (!rawPhone || typeof rawPhone !== "string") return "";
  const cleaned = rawPhone.trim();
  if (!cleaned) return "";

  // If already formatted like "+91 7780286812"
  if (/^\+\d{1,4}\s.+/.test(cleaned)) {
    return cleaned;
  }

  // Extract digits only
  const digits = cleaned.replace(/\D/g, "");
  if (!digits) return cleaned;

  // 10-digit Indian number without country code
  if (digits.length === 10 && /^[6-9]/.test(digits)) {
    return `+91 ${digits}`;
  }

  // India: starts with 91 and has 10 subsequent digits
  if (digits.startsWith("91") && digits.length >= 12) {
    return `+91 ${digits.slice(2)}`;
  }

  // Common 3-digit country codes
  const threeDigitCodes = ["971", "966", "974", "965", "968", "973", "880", "977", "353", "351", "358", "380", "420", "421", "852", "886"];
  for (const cc of threeDigitCodes) {
    if (digits.startsWith(cc) && digits.length > cc.length + 5) {
      return `+${cc} ${digits.slice(cc.length)}`;
    }
  }

  // Common 2-digit country codes
  const twoDigitCodes = ["44", "61", "65", "60", "92", "94", "49", "33", "81", "82", "86", "20", "27", "31", "34", "39", "55", "62", "63", "64", "66", "90"];
  for (const cc of twoDigitCodes) {
    if (digits.startsWith(cc) && digits.length > cc.length + 5) {
      return `+${cc} ${digits.slice(cc.length)}`;
    }
  }

  // 1-digit country codes (1 for US/CA, 7 for RU/KZ)
  if (digits.startsWith("1") && digits.length === 11) {
    return `+1 ${digits.slice(1)}`;
  }
  if (digits.startsWith("7") && digits.length === 11) {
    return `+7 ${digits.slice(1)}`;
  }

  // General fallback: if 11-15 digits, split after 2 digits
  if (digits.length >= 11) {
    return `+${digits.slice(0, 2)} ${digits.slice(2)}`;
  }

  return `+${digits}`;
};

const AdminPage = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("adminActiveTab") || "dashboard";
  });

  useEffect(() => {
    localStorage.setItem("adminActiveTab", activeTab);
  }, [activeTab]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentCourse, setCurrentCourse] = useState(EMPTY_COURSE);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBatch, setCurrentBatch] = useState(EMPTY_BATCH);
  const [isEditingBatch, setIsEditingBatch] = useState(false);
  const [isAddingBatch, setIsAddingBatch] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [c, e, r, b] = await Promise.allSettled([
        getAllCourses(),
        getAllEnquiries(),
        getAllReviews(),
        getAllBatches(),
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
      if (b.status === "fulfilled") setBatches(b.value.data || []);
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
    if (!courseData.title || courseData.title.trim().length < 3) {
      alert("Validation Error: Please enter a course title (at least 3 characters).");
      return;
    }
    if (!courseData.description || courseData.description.trim().length < 10) {
      alert("Validation Error: Please enter a course description (at least 10 characters).");
      return;
    }
    const numPrice = parseFloat(courseData.price);
    if (isNaN(numPrice) || numPrice <= 0) {
      alert("Validation Error: Please enter a valid positive course price.");
      return;
    }

    const finalData = {
      ...courseData,
      price: numPrice,
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

  const handleSaveBatch = async (batchData) => {
    if (!batchData.dates || batchData.dates.trim().length < 2) {
      alert("Validation Error: Please enter batch dates.");
      return;
    }
    if (!batchData.monthName || batchData.monthName.trim().length < 2) {
      alert("Validation Error: Please enter month & year.");
      return;
    }
    if (!batchData.timing || batchData.timing.trim().length < 2) {
      alert("Validation Error: Please enter class timing.");
      return;
    }

    try {
      if (isEditingBatch) {
        await updateBatch(batchData.id, batchData);
      } else {
        await createBatch(batchData);
      }
      setIsEditingBatch(false);
      setIsAddingBatch(false);
      setCurrentBatch(EMPTY_BATCH);
      fetchAllData();
    } catch (err) {
      console.error("Error saving batch:", err);
      alert("Error: Could not save training batch.");
    }
  };

  const handleDeleteBatch = async (id) => {
    if (window.confirm("Permanently delete this training batch schedule?")) {
      try {
        await deleteBatch(id);
        setBatches((prev) => prev.filter((b) => b.id !== id));
      } catch (err) {
        console.error("Error deleting batch:", err);
        alert("Error: Could not delete training batch.");
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
        <Link to="/" className="adm-sidebar-logo" title="Return to JSTechnoHub Homepage">
          <img src="/JSlogo.png" alt="JSTechnoHub" className="adm-sidebar-logo-img" />
          <span className="adm-logo-text">
            <span className="adm-logo-js">JS</span>
            <span className="adm-logo-t">T</span>
            <span className="adm-logo-rest">echno</span>
            <span className="adm-logo-h">H</span>
            <span className="adm-logo-rest">ub</span>
          </span>
        </Link>

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
                                      {formatDisplayPhone(enq.phone)}
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
                        <div key={c.id} className="adm-course-card">
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

              {/* ── TRAINING BATCHES MANAGEMENT ── */}
              {activeTab === "batches" && (
                <div>
                  {isAddingBatch || isEditingBatch ? (
                    <BatchForm
                      initialBatch={currentBatch}
                      isEditing={isEditingBatch}
                      onSave={handleSaveBatch}
                      onCancel={() => {
                        setIsAddingBatch(false);
                        setIsEditingBatch(false);
                        setCurrentBatch(EMPTY_BATCH);
                      }}
                    />
                  ) : (
                    <div className="panel animate-in">
                      <div className="panel-head" style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <div className="panel-head-left">
                          <div className="panel-icon" style={{ "--accent": "#10b981" }}>
                            <Icon name="calendar" size={18} />
                          </div>
                          <div>
                            <h2 className="panel-title">Training Batches Management</h2>
                            <p className="panel-sub">
                              {batches.length} total scheduled batches live in the database
                            </p>
                          </div>
                        </div>
                        <button
                          className="btn-primary"
                          style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
                          onClick={() => {
                            setCurrentBatch(EMPTY_BATCH);
                            setIsEditingBatch(false);
                            setIsAddingBatch(true);
                          }}
                        >
                          <Icon name="plus" size={15} /> Add New Batch
                        </button>
                      </div>

                      {batches.length === 0 ? (
                        <p className="empty-msg">No training batches found. Click "Add New Batch" to create one.</p>
                      ) : (
                        <div className="courses-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "1.25rem", marginTop: "1rem" }}>
                          {batches.map((b) => (
                            <div key={b.id} className="course-card" style={{ borderTop: "4px solid #10b981" }}>
                              <div className="cc-header">
                                <div>
                                  <span className="badge badge-resolved" style={{ marginBottom: "0.4rem", display: "inline-block" }}>
                                    {b.monthName || "Upcoming Batch"}
                                  </span>
                                  <h3 className="cc-title" style={{ fontSize: "1.1rem", fontWeight: "700" }}>
                                    {b.dates}
                                  </h3>
                                </div>
                                {b.discount && (
                                  <span className="badge badge-converted" style={{ backgroundColor: "#ecfdf5", color: "#059669" }}>
                                    {b.discount}
                                  </span>
                                )}
                              </div>
                              <div style={{ fontSize: "0.85rem", color: "#4b5563", margin: "0.75rem 0", display: "flex", flexDirection: "column", gap: "4px" }}>
                                <p><strong>Timing:</strong> {b.timing}</p>
                                <p><strong>Slot:</strong> {b.timingType} ({b.dayType})</p>
                                <p><strong>Trainer:</strong> {b.trainer}</p>
                                <p><strong>Venue:</strong> {b.venue}</p>
                                <p style={{ marginTop: "4px" }}>
                                  <strong>Price:</strong> <span style={{ color: "#059669", fontWeight: "700" }}>₹{b.price?.toLocaleString()}</span>{" "}
                                  {b.mrp && <span style={{ textDecoration: "line-through", color: "#9ca3af", fontSize: "0.8rem" }}>₹{b.mrp?.toLocaleString()}</span>}
                                </p>
                              </div>
                              <div className="cc-actions">
                                <button
                                  className="btn-edit"
                                  onClick={() => {
                                    setCurrentBatch(b);
                                    setIsEditingBatch(true);
                                    setIsAddingBatch(false);
                                  }}
                                >
                                  <Icon name="edit" size={13} /> Edit
                                </button>
                                <button
                                  className="btn-delete"
                                  onClick={() => handleDeleteBatch(b.id)}
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
              {activeTab === "interviewQuestions" && <InterviewQuestionForm />}

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
