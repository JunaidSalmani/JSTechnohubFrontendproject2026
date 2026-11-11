import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AppLoaders.css";

/**
 * 1. AppPreloader
 * Luxury initial starting preloader screen.
 * Displays on app initialization with logo, pulsating aura,
 * smooth laser progress bar (0% -> 100%), and dissolves smoothly.
 */
export function AppPreloader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setFadeOut(true), 240);
          setTimeout(() => setVisible(false), 750);
          return 100;
        }
        // Smooth readable increments totaling ~1.2 seconds
        const step = prev < 50 ? 7 : prev < 85 ? 5 : 3;
        return Math.min(100, prev + step);
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`app-preloader-root ${fadeOut ? "app-preloader-out" : ""}`}
      aria-label="Loading JSTechnoHub"
      role="status"
    >
      {/* Top glowing laser line */}
      <div
        className="app-preloader-top-laser"
        style={{ width: `${progress}%` }}
      />

      <div className="app-preloader-card">
        {/* Ambient radial glow */}
        <div className="app-preloader-aura" />

        {/* Logo container */}
        <div className="app-preloader-logo-ring">
          <img
            src="/JSlogo.png"
            alt="JSTechnoHub"
            className="app-preloader-logo-img"
          />
          <div className="app-preloader-pulse-ring" />
        </div>

        {/* Wordmark */}
        <div className="app-preloader-brand">
          <span className="wm-blue">JS</span>
          <span className="wm-gold">T</span>
          <span className="wm-dark">echno</span>
          <span className="wm-red">H</span>
          <span className="wm-dark">ub</span>
        </div>

        <p className="app-preloader-tagline">
          Empowering Global Careers &bull; PMP&reg; &bull; SAP &bull; AWS Cloud
        </p>

        {/* Sleek Progress Track */}
        <div className="app-preloader-track">
          <div
            className="app-preloader-fill"
            style={{ width: `${progress}%` }}
          >
            <span className="app-preloader-beam" />
          </div>
        </div>

        {/* Meta status */}
        <div className="app-preloader-meta">
          <span className="app-preloader-status">
            <span className="app-preloader-indicator-dot" />
            Loading portal resources...
          </span>
          <span className="app-preloader-pct">{progress}%</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. TopRouteBar
 * Online-trending top laser progress line across the browser top edge
 * that animates seamlessly on route navigation (GitHub/YouTube/Vercel style).
 */
export function TopRouteBar() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(20);

    const t1 = setTimeout(() => setProgress(62), 120);
    const t2 = setTimeout(() => setProgress(90), 320);
    const t3 = setTimeout(() => setProgress(100), 550);
    const t4 = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [location.pathname]);

  if (!loading && progress === 0) return null;

  return (
    <div
      className={`app-top-route-bar ${loading ? "bar-active" : "bar-done"}`}
      style={{
        width: `${progress}%`,
        opacity: loading || progress < 100 ? 1 : 0,
      }}
      aria-hidden="true"
    >
      <span className="app-top-route-glow" />
    </div>
  );
}

/**
 * 3. TopStartingBanner
 * Elegant top announcement / admissions ticker at the starting of the page.
 * Dismissible, with a live pulsating badge and quick link.
 */
export function TopStartingBanner() {
  const [dismissed, setDismissed] = useState(() => {
    return sessionStorage.getItem("hide_admissions_banner") === "true";
  });

  if (dismissed) return null;

  return (
    <div className="app-starting-banner" role="region" aria-label="Announcement">
      <div className="app-starting-banner-inner">
        <span className="asb-pill">
          <span className="asb-pulse" /> LIVE COHORTS
        </span>

        <p className="asb-message">
          <strong>2026 Admissions Open:</strong> Upcoming Weekend PMP&reg;, SAP S/4HANA &amp; AWS Batches &bull; 100% Exam Pass Guarantee
        </p>

        <Link to="/courses" className="asb-cta">
          <span>Explore Schedules</span>
          <span className="asb-arrow">&rarr;</span>
        </Link>

        <button
          className="asb-close"
          onClick={() => {
            setDismissed(true);
            sessionStorage.setItem("hide_admissions_banner", "true");
          }}
          aria-label="Dismiss banner"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
