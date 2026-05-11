/* ============================================================
   Dashboard.jsx — The main page component
   
   This is the "orchestrator" — it:
   1. Holds all state (userId, modal open, mobile sidebar)
   2. Fetches data via the useDashboard hook
   3. Renders Sidebar + main content area
   4. Passes data DOWN to child components as props
   ============================================================ */

import { useState } from 'react';
import { useDashboard } from '../../hooks/useDashboard';
import { formatAvgDuration, getLastSession } from '../../utils/formatters';
import { useUser } from '../../context/UserContext';

import Sidebar from '../../components/Sidebar/Sidebar';
import StatsCard from '../../components/StatsCard/StatsCard';
import RecentCalls from '../../components/RecentCalls/RecentCalls';
import EmptyState from '../../components/EmptyState/EmptyState';
import LogoutModal from '../../components/LogoutModal/LogoutModal';

import styles from './Dashboard.module.css';

function Dashboard() {
  /* ----------------------------------------------------------
     Local State
  ---------------------------------------------------------- */
  const { userId } = useUser();
  const [logoutOpen, setLogoutOpen]   = useState(false);      // Modal visibility
  const [sidebarOpen, setSidebarOpen] = useState(false);      // Mobile drawer

  /* ----------------------------------------------------------
     Data Fetching via Custom Hook
     useDashboard returns all the API data + loading/error states.
     CONCEPT: Destructuring — pulling specific keys from an object
  ---------------------------------------------------------- */
  const { profile, stats, calls, loading, error } = useDashboard(userId);

  /* ----------------------------------------------------------
     Event Handlers — Functions that respond to user actions.
     Named functions are easier to debug than inline arrows.
  ---------------------------------------------------------- */
  function handleLogoutClick() {
    setSidebarOpen(false);  // Close mobile sidebar first
    setLogoutOpen(true);    // Open confirmation modal
  }

  function handleLogoutCancel() {
    setLogoutOpen(false);
  }

  function handleLogoutConfirm() {
    // In a real app, you'd call an auth logout API here,
    // then redirect to the login page.
    setLogoutOpen(false);
    alert('You have been logged out! (In a real app, this would redirect to /login)');
  }

  /* ----------------------------------------------------------
     Derived Values — computed from raw data
     CONCEPT: Optional chaining (?.) safely accesses nested properties.
     If `stats` is null, stats?.totalSessions returns undefined
     instead of throwing "Cannot read property of null".
     The nullish coalescing operator (??) returns the right side
     if the left is null or undefined.
  ---------------------------------------------------------- */
  const totalSessions    = stats?.totalSessions     ?? 0;
  const avgDuration      = formatAvgDuration(stats?.averageDuration);
  const aiInteractions   = stats?.totalAIInteractions ?? 0;
  const lastSession      = getLastSession(stats?.lastSession ?? []);
  const userName         = profile?.firstName ?? 'there';

  /* ----------------------------------------------------------
     Error State
  ---------------------------------------------------------- */
  if (error) {
    return (
      <div className={styles.errorPage}>
        <div className={styles.errorBox}>
          <span className={styles.errorIcon}>⚠️</span>
          <h2>Failed to load dashboard</h2>
          <p>{error}</p>
          <button
            className={styles.retryBtn}
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      {/* ---- Sidebar ---- */}
      <Sidebar
        onLogout={handleLogoutClick}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* ---- Main Content ---- */}
      {/* CONCEPT: Template literal to conditionally add sidebar-open class
          for push animation on desktop */}
      <main className={styles.main}>

        {/* ---- Top Bar (mobile only) ---- */}
        <div className={styles.topBar}>
          {/* Hamburger button — only visible on mobile */}
          <button
            className={styles.hamburger}
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            id="hamburger-button"
          >
            <HamburgerIcon />
          </button>
          <span className={styles.topBarTitle}>Dashboard</span>
        </div>

        {/* ---- Page Content ---- */}
        <div className={styles.content}>

          {/* --- Header: Greeting + CTA --- */}
          <header className={styles.pageHeader}>
            <div>
              {/* CONCEPT: Template literals for dynamic strings */}
              <h1 className={styles.greeting}>
                Hi, {userName} 👋
              </h1>
              <p className={styles.greetingSub}>
                Welcome to Hintro. Here's what's happening today.
              </p>
            </div>
            <button className={styles.startCallBtn} id="start-call-button">
              <PhoneIcon />
              Start New Call
            </button>
          </header>

          {/* --- Stats Cards Grid --- */}
          {/* CONCEPT: CSS Grid — the 4-column layout is defined in CSS.
              The children just need to be direct children of the grid container. */}
          <section className={styles.statsGrid} aria-label="Statistics overview">
            <StatsCard
              title="Total Sessions"
              value={totalSessions}
              subtitle="Across all time"
              icon={<SessionsIcon />}
              color="var(--color-primary-light)"
              loading={loading}
            />
            <StatsCard
              title="Avg Duration"
              value={avgDuration}
              subtitle="Per call session"
              icon={<ClockIcon />}
              color="#FFF7ED"
              loading={loading}
            />
            <StatsCard
              title="AI Interactions"
              value={aiInteractions}
              subtitle="Smart suggestions used"
              icon={<AiIcon />}
              color="#F0FDF4"
              loading={loading}
            />
            <StatsCard
              title="Last Session"
              value={lastSession}
              subtitle="Most recent call"
              icon={<CalendarIcon />}
              color="#FDF4FF"
              loading={loading}
            />
          </section>

          {/* --- Recent Calls or Empty State --- */}
          {/* CONCEPT: Ternary conditional rendering
              If calls is empty AND not loading → show EmptyState
              Otherwise → show RecentCalls (with loading skeleton) */}
          {!loading && calls.length === 0
            ? <EmptyState />
            : <RecentCalls calls={calls} loading={loading} />
          }

        </div>
      </main>

      {/* ---- Logout Modal ---- */}
      {/* Rendered at the root level (not inside main) so it overlays everything */}
      <LogoutModal
        isOpen={logoutOpen}
        onCancel={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
}


/* ---- Small inline icons used in this file ---- */
function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/>
      <line x1="3" y1="12" x2="21" y2="12"/>
      <line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.18z"/>
    </svg>
  );
}
function SessionsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.18z"/>
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F79009" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
}
function AiIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#12B76A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  );
}

export default Dashboard;
