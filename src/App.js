import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./components/HomePage";
import CourseDetail from "./components/CourseDetailPage";
import CoursesPage from "./components/CoursesPage";
import ResumePage from "./components/ResumePage";
import ServicesPage from "./components/ServicesPage";
import AboutUsPage from "./components/AboutUsPage";
import CertificationsListPage from "./components/CertificationsListPage";
import CertificationsPage from "./components/CertificationsPage";
import AdminAuth from "./components/AdminAuth";
import AdminPage from "./components/AdminPage";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import TermsPage from "./components/TermsPage";
import CancellationPolicyPage from "./components/CancellationPolicyPage";
import PaymentSuccessPage from "./components/PaymentSuccessPage";
import InterviewQuestionsPage from "./components/InterveiwQuestionPage";
import ConsultingServicesPage from "./components/ConsultingServicesPage";
import "./App.css";

// ── Cert link data ──────────────────────────────────────────────
const CERT_LINKS = [
  { to: "/certifications/sales-force", label: "Sales Force" },
  { to: "/certifications/ccna", label: "CCNA" },
  { to: "/certifications/palo-alto", label: "Palo Alto" },
  { to: "/certifications/vmware", label: "VMware" },
  { to: "/certifications/cbap", label: "CBAP" },
  {
    to: "/certifications/cams-training",
    label: "CAMS Training & Certification",
  },
  {
    to: "/certifications/cia-training",
    label: "Certified Internal Auditor (CIA)",
  },
  { to: "/certifications/capm-training", label: "CAPM" },
  { to: "/certifications/pmp", label: "PMP" },
];

// ── Wordmark ────────────────────────────────────────────────────
function Wordmark({ size }) {
  return (
    <span className={`wm${size === "sm" ? " wm-sm" : ""}`}>
      <span className="wm-blue">JS</span>
      <span className="wm-gold">T</span>
      <span className="wm-white">echno</span>
      <span className="wm-red">H</span>
      <span className="wm-white">ub</span>
    </span>
  );
}

// ── Chevron SVG ─────────────────────────────────────────────────
function Chevron({ open }) {
  return (
    <svg
      className={`chev${open ? " chev-open" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// ── AppLogic ────────────────────────────────────────────────────
function AppLogic() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminDashboard =
    location.pathname === "/admin" &&
    sessionStorage.getItem("isAdminAuthenticated") === "true";

  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem("isAdminAuthenticated") === "true",
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [certOpen, setCertOpen] = useState(false); // desktop dropdown
  const [mobileAccOpen, setMobileAccOpen] = useState(false); 
  const [scrolled, setScrolled] = useState(false);

  const certRef = useRef(null);

  // scroll detection
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // close everything on route change
  useEffect(() => {
    setDrawerOpen(false);
    setCertOpen(false);
    setMobileAccOpen(false);
  }, [location.pathname]);

  // close desktop dropdown on outside click
  useEffect(() => {
    const fn = (e) => {
      if (certRef.current && !certRef.current.contains(e.target))
        setCertOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // auth storage sync
  useEffect(() => {
    const fn = () =>
      setIsAuthenticated(
        sessionStorage.getItem("isAdminAuthenticated") === "true",
      );
    window.addEventListener("storage", fn);
    return () => window.removeEventListener("storage", fn);
  }, []);

  const handleLogin = (password) => {
    if (password === "coaching") {
      sessionStorage.setItem("isAdminAuthenticated", "true");
      setIsAuthenticated(true);
      navigate("/admin");
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isAdminAuthenticated");
    setIsAuthenticated(false);
    navigate("/");
  };

  const closeAll = () => {
    setDrawerOpen(false);
    setCertOpen(false);
    setMobileAccOpen(false);
  };

  const isDesktop = () => window.innerWidth > 1024;

  // NavLink className helper — adds "nl-active" when route matches
  const nlClass = ({ isActive }) => `nl${isActive ? " nl-active" : ""}`;

  return (
    <>
      {/* ── Header, overlay, drawer — hidden on /admin ── */}
      {!isAdminDashboard && (
        <>
          {/* ═══════════════════ HEADER ═══════════════════ */}
          <header className={`hdr${scrolled ? " hdr-scrolled" : ""}`}>
            <div className="hdr-inner">
              {/* Logo */}
              <Link
                to="/"
                className="hdr-logo"
                onClick={closeAll}
                aria-label="JSTechnoHub home"
              >
                <img src="/JSlogo.png" alt="" className="hdr-logo-img" />
                <Wordmark />
              </Link>

              {/* Desktop nav */}
              <nav className="hdr-nav" aria-label="Main navigation">
                <NavLink to="/" className={nlClass} end>
                  Home
                </NavLink>
                <NavLink to="/courses" className={nlClass}>
                  Courses
                </NavLink>
                <NavLink to="/consulting" className={nlClass}>
                  Consulting
                </NavLink>

                {/* Certifications dropdown */}
                <div
                  ref={certRef}
                  className={`hdr-dd${certOpen ? " hdr-dd-open" : ""}`}
                  onMouseEnter={() => isDesktop() && setCertOpen(true)}
                  onMouseLeave={() => isDesktop() && setCertOpen(false)}
                >
                  <button
                    className="nl hdr-dd-btn"
                    onClick={() => setCertOpen((p) => !p)}
                    aria-expanded={certOpen}
                    aria-haspopup="listbox"
                  >
                    Certifications <Chevron open={certOpen} />
                  </button>

                  <div className="hdr-dd-panel" role="listbox">
                    <div className="hdr-dd-panel-head">
                      Certifications
                      <span className="hdr-dd-badge">{CERT_LINKS.length}</span>
                    </div>
                    <div className="hdr-dd-grid">
                      {CERT_LINKS.map((c) => (
                        <NavLink
                          key={c.to}
                          to={c.to}
                          className={({ isActive }) =>
                            `hdr-dd-item${isActive ? " hdr-dd-item-active" : ""}`
                          }
                          onClick={closeAll}
                          role="option"
                        >
                          <span className="hdr-dd-dot" />
                          {c.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>

                <NavLink to="/services" className={nlClass}>
                  Services
                </NavLink>
                <NavLink to="/resume" className={nlClass}>
                  Resume
                </NavLink>
                <NavLink to="/interview-questions" className={nlClass}>
                  Interview Q&apos;s
                </NavLink>
                <NavLink to="/about" className={nlClass}>
                  About
                </NavLink>

                {isAuthenticated && (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      `nl nl-admin${isActive ? " nl-active" : ""}`
                    }
                  >
                    Admin
                  </NavLink>
                )}
              </nav>

              {/* Desktop CTA */}
              <NavLink to="/contact" className="hdr-cta" onClick={closeAll}>
                Contact Us
              </NavLink>

              {/* Hamburger */}
              <button
                className={`hdr-ham${drawerOpen ? " hdr-ham-open" : ""}`}
                onClick={() => setDrawerOpen((p) => !p)}
                aria-label={drawerOpen ? "Close menu" : "Open menu"}
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </header>

          {/* ═══════════════════ OVERLAY ═══════════════════ */}
          <div
            className={`drw-overlay${drawerOpen ? " drw-overlay-on" : ""}`}
            onClick={closeAll}
            aria-hidden="true"
          />

          {/* ═══════════════════ MOBILE DRAWER ═══════════════════ */}
          <nav
            id="mobile-drawer"
            className={`drw${drawerOpen ? " drw-open" : ""}`}
            aria-label="Mobile navigation"
            aria-hidden={!drawerOpen}
          >
            {/* Drawer top bar */}
            <div className="drw-head">
              <div className="drw-head-logo">
                <img src="/JSlogo.png" alt="" className="drw-logo-img" />
                <Wordmark size="sm" />
              </div>
              <button
                className="drw-close"
                onClick={closeAll}
                aria-label="Close menu"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="drw-body">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `dl${isActive ? " dl-active" : ""}`
                }
                end
                onClick={closeAll}
              >
                Home
              </NavLink>
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  `dl${isActive ? " dl-active" : ""}`
                }
                onClick={closeAll}
              >
                Courses
              </NavLink>
              <NavLink
                to="/consulting"
                className={({ isActive }) =>
                  `dl${isActive ? " dl-active" : ""}`
                }
                onClick={closeAll}
              >
                Consulting Services
              </NavLink>

              {/* Certifications accordion */}
              <div className={`drw-acc${mobileAccOpen ? " drw-acc-open" : ""}`}>
                <button
                  className="dl drw-acc-btn"
                  onClick={() => setMobileAccOpen((p) => !p)}
                  aria-expanded={mobileAccOpen}
                >
                  <span>Certifications</span>
                  <Chevron open={mobileAccOpen} />
                </button>
                <div className="drw-acc-body">
                  {CERT_LINKS.map((c) => (
                    <NavLink
                      key={c.to}
                      to={c.to}
                      className={({ isActive }) =>
                        `drw-cert-link${isActive ? " drw-cert-active" : ""}`
                      }
                      onClick={closeAll}
                    >
                      <span className="drw-cert-dot" />
                      {c.label}
                    </NavLink>
                  ))}
                </div>
              </div>

              <NavLink
                to="/services"
                className={({ isActive }) =>
                  `dl${isActive ? " dl-active" : ""}`
                }
                onClick={closeAll}
              >
                Services
              </NavLink>
              <NavLink
                to="/resume"
                className={({ isActive }) =>
                  `dl${isActive ? " dl-active" : ""}`
                }
                onClick={closeAll}
              >
                Resume
              </NavLink>
              <NavLink
                to="/interview-questions"
                className={({ isActive }) =>
                  `dl${isActive ? " dl-active" : ""}`
                }
                onClick={closeAll}
              >
                Interview Q&apos;s
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `dl${isActive ? " dl-active" : ""}`
                }
                onClick={closeAll}
              >
                About Us
              </NavLink>

              {isAuthenticated && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `dl dl-admin${isActive ? " dl-active" : ""}`
                  }
                  onClick={closeAll}
                >
                  Admin Panel
                </NavLink>
              )}
            </div>

            {/* Drawer footer */}
            <div className="drw-foot">
              <NavLink to="/contact" className="drw-cta" onClick={closeAll}>
                Contact Us →
              </NavLink>
              <p className="drw-tagline">JSTechnoHub · Empowering Careers</p>
            </div>
          </nav>
        </>
      )}

      {/* ═══════════════════ PAGE CONTENT ═══════════════════ */}
      <main className={isAdminDashboard ? "" : "page-main"}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/consulting" element={<ConsultingServicesPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/certifications" element={<CertificationsListPage />} />
          <Route
            path="/certifications/:certId"
            element={<CertificationsPage />}
          />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-of-service" element={<TermsPage />} />
          <Route
            path="/cancellation-policy"
            element={<CancellationPolicyPage />}
          />
          <Route path="/payment-success" element={<PaymentSuccessPage />} />
          <Route
            path="/interview-questions"
            element={<InterviewQuestionsPage />}
          />
          <Route
            path="/admin"
            element={
              isAuthenticated ? (
                <AdminPage onLogout={handleLogout} />
              ) : (
                <AdminAuth onLogin={handleLogin} />
              )
            }
          />
        </Routes>
      </main>

      {/* Footer — hidden on /admin */}
      {!isAdminDashboard && <Footer />}
    </>
  );
}

// ── Root ────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppLogic />
    </Router>
  );
}

export default App;
