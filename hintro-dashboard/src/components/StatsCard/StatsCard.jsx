/* ============================================================
   StatsCard.jsx — A single statistics metric card
   
   RECEIVES THESE PROPS:
   - title: string     → "Total Sessions"
   - value: string|num → "126" or "—"
   - subtitle: string  → "In last 60 days"
   - icon: JSX         → An SVG icon element
   - color: string     → CSS color for the icon bg (optional)
   - loading: boolean  → show skeleton while fetching
   ============================================================ */

import styles from './StatsCard.module.css';

function StatsCard({ title, value, subtitle, icon, color = 'var(--color-primary-light)', loading = false }) {

  /* CONCEPT: Conditional rendering with ternary operator
     condition ? "if true render this" : "if false render this"
     Here we show a skeleton loader while data is fetching */
  if (loading) {
    return (
      <div className={styles.card} aria-busy="true" aria-label="Loading...">
        <div className={styles.skeletonIcon} />
        <div className={styles.skeletonValue} />
        <div className={styles.skeletonTitle} />
      </div>
    );
  }

  return (
    <div className={styles.card}>
      {/* Icon container with dynamic background color */}
      {/* CONCEPT: Inline styles — used here because the color
          is dynamic (comes from a prop). For static styles,
          always use CSS modules instead of inline styles. */}
      <div className={styles.iconWrap} style={{ backgroundColor: color }}>
        {icon}
      </div>

      {/* Main value — the big number */}
      <div className={styles.value}>{value ?? '—'}</div>

      {/* Card title */}
      <div className={styles.title}>{title}</div>

      {/* Optional subtitle */}
      {subtitle && (
        <div className={styles.subtitle}>{subtitle}</div>
      )}
    </div>
  );
}

export default StatsCard;
