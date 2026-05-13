/* ============================================================
   EmptyState.jsx — Shown when the user (u1) has no call data
   ============================================================ */

import styles from './EmptyState.module.css';

function EmptyState() {
  return (
    <section className={styles.section}>
      {/* Section header matches RecentCalls header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Recent calls</h2>
      </div>

      {/* Centered empty state illustration + message */}
      <div className={styles.body}>
        <div className={styles.illustration}>
          <PhoneOffIcon />
        </div>
        <h3 className={styles.heading}>No Recent Calls</h3>
        <p className={styles.desc}>
          Analyze and track your performance with Hintro.<br />
          Start your first call to see insights here.
        </p>
        <button className={styles.ctaBtn} id="empty-state-start-call">
          Start a Call
        </button>
      </div>
    </section>
  );
}

/* SVG illustration for empty state */
function PhoneOffIcon() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.42 19.42 0 0 1 4.26 9.11 19.79 19.79 0 0 1 1.18 .5a2 2 0 0 1 2-2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.16 6.27a16 16 0 0 0 3.52 4.04z"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

export default EmptyState;
