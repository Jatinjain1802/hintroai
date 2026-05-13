import { MdCall } from 'react-icons/md';
import styles from './RecentCalls.module.css';

function RecentCalls({ calls = [], loading = false }) {
  if (loading) {
    return (
      <div className={styles.container}>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className={styles.skeletonDateGroup}>
            <div className={styles.skeletonDate} />
            <div className={styles.skeletonItem} />
            <div className={styles.skeletonItem} />
          </div>
        ))}
      </div>
    );
  }

  // Group calls by date
  const grouped = calls.reduce((acc, call) => {
    const date = new Date(call.started_at).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
    });
    // Add ordinal suffix (th, st, nd, rd)
    const day = new Date(call.started_at).getDate();
    const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 || Math.floor(day % 100 / 10) === 1) ? 0 : day % 10];
    const formattedDate = date + suffix;

    if (!acc[formattedDate]) acc[formattedDate] = [];
    acc[formattedDate].push(call);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      {Object.entries(grouped).map(([date, items]) => (
        <div key={date} className={styles.dateGroup}>
          <h4 className={styles.dateHeader}>{date}</h4>
          <div className={styles.callList}>
            {items.map((call) => (
              <CallItem key={call._id} call={call} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CallItem({ call }) {
  const time = new Date(call.started_at).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).toLowerCase();

  return (
    <div className={styles.callItem}>
      <div className={styles.left}>
        <div className={styles.iconBox}>K</div>
        <div className={styles.details}>
          <span className={styles.callName}>{call.description || 'Design Call'}</span>
          <div className={styles.participants}>
            <img src="https://i.pravatar.cc/30?u=1" alt="p1" className={styles.participantAvatar} />
            <img src="https://i.pravatar.cc/30?u=2" alt="p2" className={styles.participantAvatar} />
            <img src="https://i.pravatar.cc/30?u=3" alt="p3" className={styles.participantAvatar} />
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <span className={styles.time}>{time}</span>
        <button className={styles.moreBtn}>
          <MdCall size={20} />
        </button>
      </div>
    </div>
  );
}

export default RecentCalls;
