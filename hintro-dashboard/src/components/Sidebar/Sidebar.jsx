/* ============================================================
   Sidebar.jsx — Left navigation panel
   ============================================================ */

import { NavLink } from 'react-router-dom';
import {
  LuLayoutDashboard,
  LuPhone,
  LuFileText,
  LuMessageSquare,
  LuSettings2,
  LuInbox,
  LuGift,
  LuInfo
} from 'react-icons/lu';
import styles from './Sidebar.module.css';

/* ----------------------------------------------------------
   Navigation data
   LEARNING POINT: By putting navigation items in an array, 
   we can "map" over them to generate the UI. This makes 
   the code cleaner and easier to maintain.
---------------------------------------------------------- */
const mainNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LuLayoutDashboard size={20} />, path: '/dashboard' },
  { id: 'call-insights', label: 'Call Insights', icon: <LuPhone size={20} />, path: '#insights' },
  { id: 'knowledge-base', label: 'Knowledge Base', icon: <LuFileText size={20} />, path: '#kb', hasInfo: true },
  { id: 'prompts', label: 'Prompts', icon: <LuMessageSquare size={20} />, path: '#prompts', hasInfo: true },
  { id: 'boxy-controls', label: 'Boxy Controls', icon: <LuSettings2 size={20} />, path: '#boxy', hasInfo: true },
];

const bottomNavItems = [
  { id: 'feedback-history', label: 'Feedback History', icon: <LuInbox size={20} />, path: '#history' },
  { id: 'feedback', label: 'Feedback', icon: <LuGift size={20} />, path: '/feedback' },
];

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <span className={styles.logoText}>Hintro</span>
        </div>

        {/* Main nav links */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {mainNavItems.map((item) => (
              <li key={item.id} className={styles.navListItem}>
                <NavItem item={item} />
              </li>
            ))}
          </ul>
        </nav>

        {/* This spacer pushes the bottom section to the bottom of the sidebar */}
        <div className={styles.spacer} />

        {/* Bottom nav */}
        <nav className={styles.bottomNav} aria-label="Secondary navigation">
          <div className={styles.divider} />
          <ul className={styles.navList}>
            {bottomNavItems.map((item) => (
              <li key={item.id} className={styles.navListItem}>
                <NavItem item={item} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Upgrade Button */}
        <div className={styles.upgradeSection}>
          <button className={styles.upgradeBtn}>Upgrade</button>
        </div>
      </aside>
    </>
  );
}

/**
 * NavItem Component
 * @param {Object} item - The navigation item data
 * 
 * LEARNING POINT: We use React-Router's <NavLink> because it 
 * automatically knows if the current URL matches its "to" path, 
 * allowing us to apply "active" styles easily.
 */
function NavItem({ item }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
      }
    >
      <span className={styles.navIcon}>{item.icon}</span>
      <span className={styles.navLabel}>{item.label}</span>
      {item.hasInfo && (
        <span className={styles.infoIcon}>
          {/* <LuAlertCircle size={18} /> */}
          <LuInfo size={18} />
        </span>
      )}
    </NavLink>
  );
}

export default Sidebar;
