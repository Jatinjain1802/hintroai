/* ============================================================
   Sidebar.jsx — Left navigation panel
   ============================================================ */

import styles from './Sidebar.module.css';

/* ----------------------------------------------------------
   SVG Icons — Defined FIRST so they can be used in navItems array below.
   In JavaScript, regular function declarations are "hoisted" (moved to top
   by the engine), but since we're using them as JSX at module level,
   we define them early to be safe and clear.
---------------------------------------------------------- */
function DashboardIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
  );
}
function InsightsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    </svg>
  );
}
function BookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
    </svg>
  );
}
function PromptsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  );
}
function ContactsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  );
}
function FeedbackIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z"/>
      <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
    </svg>
  );
}
function SettingsIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </svg>
  );
}
function LogoutIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}
function HintroLogoIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
}

/* ----------------------------------------------------------
   Navigation data — arrays defined after icons are declared.
   Each item has: id, label, icon (JSX element), active flag.
   
   CONCEPT: Storing JSX as a value in a plain object is fine!
   JSX is just JavaScript — React.createElement() calls under the hood.
---------------------------------------------------------- */
const mainNavItems = [
  { id: 'dashboard',      label: 'Dashboard',       icon: <DashboardIcon />, active: true  },
  { id: 'call-insights',  label: 'Call Insights',   icon: <InsightsIcon />,  active: false },
  { id: 'knowledge-base', label: 'Knowledge Base',  icon: <BookIcon />,      active: false },
  { id: 'prompts',        label: 'Prompts',         icon: <PromptsIcon />,   active: false },
  { id: 'busy-contacts',  label: 'Busy Contacts',   icon: <ContactsIcon />,  active: false },
];

const bottomNavItems = [
  { id: 'feedback',       label: 'Feedback History', icon: <FeedbackIcon />, active: false },
  { id: 'settings',       label: 'Settings',         icon: <SettingsIcon />, active: false },
];

/* ----------------------------------------------------------
   Sidebar Component
   
   PROPS:
   - onLogout: function — called when user clicks "Log out"
   - isOpen: boolean   — for mobile, controls if sidebar shows
   - onClose: function — for mobile, called when overlay clicked
   
   CONCEPT: Props flow DOWN from parent to child.
   The Dashboard component controls these values and passes them here.
---------------------------------------------------------- */
function Sidebar({ onLogout, isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay — dark background behind the sidebar.
          CONCEPT: && (logical AND) for conditional rendering.
          React renders nothing for false/null/undefined. */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel.
          CONCEPT: Template literal + ternary for dynamic className.
          `${styles.sidebar} ${isOpen ? styles.open : ''}`
          → adds "open" class on mobile to slide the panel in. */}
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>

        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <HintroLogoIcon />
          </div>
          <span className={styles.logoText}>Hintro</span>
        </div>

        {/* Main nav links */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {/* CONCEPT: .map() transforms each array item into JSX.
                key={item.id} is required — helps React identify which
                list items changed when the array updates. */}
            {mainNavItems.map((item) => (
              <li key={item.id}>
                <NavItem item={item} />
              </li>
            ))}
          </ul>
        </nav>

        {/* Spacer — pushes upgrade card + bottom nav to the bottom */}
        <div className={styles.spacer} />

        {/* Upgrade card */}
        <UpgradeCard />

        {/* Bottom nav: Feedback, Settings, Log out */}
        <nav className={styles.bottomNav} aria-label="Secondary navigation">
          <ul className={styles.navList}>
            {bottomNavItems.map((item) => (
              <li key={item.id}>
                <NavItem item={item} />
              </li>
            ))}

            {/* Log out — separate because it has its own click handler */}
            <li>
              <button
                className={styles.logoutBtn}
                onClick={onLogout}
                id="logout-button"
              >
                <LogoutIcon />
                <span>Log out</span>
              </button>
            </li>
          </ul>
        </nav>

      </aside>
    </>
  );
}

/* ----------------------------------------------------------
   NavItem — renders one navigation button.
   CONCEPT: Small, single-purpose components are easier to
   understand, test, and reuse than one giant component.
---------------------------------------------------------- */
function NavItem({ item }) {
  return (
    <button
      className={`${styles.navItem} ${item.active ? styles.navItemActive : ''}`}
      aria-current={item.active ? 'page' : undefined}
    >
      <span className={styles.navIcon}>{item.icon}</span>
      <span className={styles.navLabel}>{item.label}</span>
    </button>
  );
}

/* ----------------------------------------------------------
   UpgradeCard — purple promo card at the bottom of sidebar
---------------------------------------------------------- */
function UpgradeCard() {
  return (
    <div className={styles.upgradeCard}>
      <div className={styles.upgradeIcon}>⚡</div>
      <p className={styles.upgradeTitle}>Upgrade to Pro</p>
      <p className={styles.upgradeDesc}>
        Unlock unlimited sessions and advanced AI features.
      </p>
      <button className={styles.upgradeBtn}>Upgrade Plan</button>
    </div>
  );
}

export default Sidebar;
