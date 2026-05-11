/* ============================================================
   RecentCalls.jsx — Table of recent call sessions
   
   PROPS:
   - calls: array of call session objects from the API
   - loading: boolean
   ============================================================ */

import styles from './RecentCalls.module.css';
import { formatDuration, formatDate } from '../../utils/formatters';

/* Status badge colors */
const STATUS_COLORS = {
  ended:        { bg: '#ECFDF3', text: '#027A48', dot: '#12B76A' },
  force_ended:  { bg: '#FEF3F2', text: '#B42318', dot: '#F04438' },
  active:       { bg: '#EFF8FF', text: '#175CD3', dot: '#2E90FA' },
  pending:      { bg: '#FFFAEB', text: '#B54708', dot: '#F79009' },
};

function RecentCalls({ calls = [], loading = false }) {
  return (
    <section className={styles.section}>
      {/* Section header */}
      <div className={styles.header}>
        <h2 className={styles.title}>Recent Calls</h2>
        <button className={styles.viewAllBtn}>View all</button>
      </div>

      {/* Table wrapper — allows horizontal scroll on small screens */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Client</th>
              <th>Description</th>
              <th>Date</th>
              <th>Duration</th>
              <th>AI Used</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* CONCEPT: Conditional rendering — show skeleton rows while
                loading, otherwise show actual data rows */}
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  /* Array.from({length: N}) creates an array of N empty slots
                     so we can .map() over it to render N skeleton rows */
                  <SkeletonRow key={i} />
                ))
              : calls.map((call) => (
                  <CallRow key={call._id} call={call} />
                ))
            }
          </tbody>
        </table>
      </div>
    </section>
  );
}

/* ---- Individual Call Row ---- */
function CallRow({ call }) {
  const statusStyle = STATUS_COLORS[call.status] || STATUS_COLORS.ended;

  return (
    <tr className={styles.row}>
      {/* Client name */}
      <td>
        <div className={styles.clientCell}>
          {/* Avatar initials */}
          <div className={styles.avatar}>
            {call.client?.charAt(0) || '?'}
          </div>
          <span className={styles.clientName}>{call.client || '—'}</span>
        </div>
      </td>

      {/* Description */}
      <td className={styles.descCell}>
        {call.description || '—'}
      </td>

      {/* Formatted date */}
      <td className={styles.dateCell}>
        {formatDate(call.started_at)}
      </td>

      {/* Duration in human-readable form */}
      <td className={styles.durationCell}>
        {formatDuration(call.total_duration_seconds)}
      </td>

      {/* AI interactions count */}
      <td>
        <span className={styles.aiChip}>
          🤖 {call.ai_interactions ?? 0}
        </span>
      </td>

      {/* Status badge */}
      <td>
        <span
          className={styles.statusBadge}
          style={{ backgroundColor: statusStyle.bg, color: statusStyle.text }}
        >
          <span
            className={styles.statusDot}
            style={{ backgroundColor: statusStyle.dot }}
          />
          {call.status}
        </span>
      </td>
    </tr>
  );
}

/* ---- Skeleton Row (shown while loading) ---- */
function SkeletonRow() {
  return (
    <tr className={styles.row}>
      {[120, 160, 70, 60, 50, 80].map((w, i) => (
        <td key={i}>
          <div className={styles.skeleton} style={{ width: w }} />
        </td>
      ))}
    </tr>
  );
}

export default RecentCalls;
