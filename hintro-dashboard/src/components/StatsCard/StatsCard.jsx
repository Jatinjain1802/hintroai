/* ============================================================
   StatsCard.jsx — A single statistics metric card
   ============================================================ */

import styles from './StatsCard.module.css';

function StatsCard({ title, value, icon, color = 'var(--color-primary-light)', loading = false }) {

  if (loading) {
    return (
      <div className={styles.card} aria-busy="true" aria-label="Loading...">
        <div className={styles.skeletonIcon} />
        <div className={styles.skeletonText}>
          <div className={styles.skeletonTitle} />
          <div className={styles.skeletonValue} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.card}>
      <div className={styles.iconWrap} style={{ backgroundColor: color }}>
        {icon}
      </div>

      <div className={styles.textWrap}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value ?? '—'}</div>
      </div>
    </div>
  );
}

export default StatsCard;
