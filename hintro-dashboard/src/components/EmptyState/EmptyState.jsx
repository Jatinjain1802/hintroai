/* ============================================================
   EmptyState.jsx — Shown when the user (u1) has no call data
   ============================================================ */

import styles from './EmptyState.module.css';

function EmptyState() {
  return (
    <section className={styles.section}>
      {/* Centered empty state illustration + message */}
      <div className={styles.body}>
        <div className={styles.illustration}>
          <PhoneIcon />
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

/* SVG illustration for empty state - Phone Icon */
function PhoneIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default EmptyState;
