import { useState } from 'react';
import { LuPlay, LuChevronDown, LuLogOut, LuUser, LuCheck } from 'react-icons/lu';
import { useUser } from '../../context/UserContext';
import styles from './Header.module.css';

/**
 * Header Component
 * 
 * LEARNING POINT: We now use "useUser" to access global state.
 * This allows us to switch users in the Header, and because 
 * the state is GLOBAL (Context), the Dashboard will 
 * immediately detect the change and fetch new data!
 */
function Header({ title, onLogout }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { userId, setUserId } = useUser();

  const handleLogoutClick = () => {
    setShowDropdown(false);
    onLogout();
  };

  const handleSwitchUser = (id) => {
    setUserId(id);
    // We don't close the dropdown immediately so user sees the change
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      
      <div className={styles.actions}>
        {/* Tutorial Button */}
        <button className={styles.tutorialBtn}>
          <LuPlay size={16} fill="currentColor" />
          <span>Watch Tutorial</span>
        </button>

        {/* Profile & Dropdown Section */}
        <div className={styles.profileWrapper}>
          <div 
            className={styles.profile} 
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <img 
              src={userId === 'u1' 
                ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" 
                : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop"
              } 
              alt="Profile" 
              className={styles.avatar} 
            />
            <span className={styles.chevron}>
              <LuChevronDown size={16} />
            </span>
          </div>

          {showDropdown && (
            <div className={styles.dropdown}>
              {/* User Switcher Section */}
              <div className={styles.dropdownHeader}>Switch User</div>
              
              <button 
                className={`${styles.dropdownItem} ${userId === 'u1' ? styles.activeUser : ''}`}
                onClick={() => handleSwitchUser('u1')}
              >
                <div className={styles.userItemContent}>
                  <LuUser size={16} />
                  <span>User 1 </span>
                </div>
                {userId === 'u1' && <LuCheck size={14} className={styles.checkIcon} />}
              </button>

              <button 
                className={`${styles.dropdownItem} ${userId === 'u2' ? styles.activeUser : ''}`}
                onClick={() => handleSwitchUser('u2')}
              >
                <div className={styles.userItemContent}>
                  <LuUser size={16} />
                  <span>User 2</span>
                </div>
                {userId === 'u2' && <LuCheck size={14} className={styles.checkIcon} />}
              </button>

              <div className={styles.dropdownDivider} />

              {/* Logout Action */}
              <button className={styles.dropdownItem} onClick={handleLogoutClick}>
                <LuLogOut size={16} />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
