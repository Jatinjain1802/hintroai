/* ============================================================
   FeedbackPage.jsx — Enhanced User feedback history and submission
   ============================================================ */

import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import LogoutModal from '../../components/LogoutModal/LogoutModal';
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import styles from './Feedback.module.css';

const MOCK_FEEDBACK = [
  { id: 1, date: 'May 10, 2026', customer: 'Jane Smith', email: 'jane@acme.com', rating: 5, status: 'Resolved' },
  { id: 2, date: 'May 08, 2026', customer: 'John Doe', email: 'john@techstart.io', rating: 4, status: 'Pending' },
  { id: 3, date: 'May 05, 2026', customer: 'Alice Wong', email: 'alice@startup.xyz', rating: 5, status: 'Resolved' },
  { id: 4, date: 'Apr 28, 2026', customer: 'Bob Vance', email: 'bob@enterprise.inc', rating: 3, status: 'Resolved' },
];

function FeedbackPage() {
  const { userId, toggleUser } = useUser();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);

  const hasFeedback = userId === 'u2';
  const displayFeedback = hasFeedback ? MOCK_FEEDBACK : [];

  const filteredFeedback = displayFeedback.filter(item => 
    item.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitFeedback = () => {
    setFeedbackModalOpen(false);
    setShowAcknowledgement(true);
    setTimeout(() => setShowAcknowledgement(false), 3000);
  };

  return (
    <div className={styles.layout}>
      <Sidebar 
        onLogout={() => setLogoutOpen(true)} 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
      />

      <main className={styles.main}>
        {/* Top Bar for Mobile & User Switcher */}
        <div className={styles.topBar}>
          <button className={styles.hamburger} onClick={() => setSidebarOpen(true)}>
            <HamburgerIcon />
          </button>
          <span className={styles.topBarTitle}>Feedback History</span>
          <div className={styles.userSwitcher}>
            <button 
              className={`${styles.switchBtn} ${userId === 'u1' ? styles.switchActive : ''}`}
              onClick={() => toggleUser('u1')}
            >u1</button>
            <button 
              className={`${styles.switchBtn} ${userId === 'u2' ? styles.switchActive : ''}`}
              onClick={() => toggleUser('u2')}
            >u2</button>
          </div>
        </div>

        <div className={styles.content}>
          <header className={styles.header}>
            <div>
              <h1 className={styles.title}>Feedback History</h1>
              <p className={styles.subtitle}>Track and manage your customer feedback.</p>
            </div>
            <button className={styles.giveFeedbackBtn} onClick={() => setFeedbackModalOpen(true)}>
              Give Feedback
            </button>
          </header>

          <div className={styles.searchSection}>
            <div className={styles.searchWrapper}>
              <SearchIcon className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search by name, email or session ID" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {filteredFeedback.length > 0 ? (
            <div className={styles.tableCard}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Rating</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedback.map(item => (
                    <tr key={item.id}>
                      <td>{item.date}</td>
                      <td>{item.customer}</td>
                      <td>{item.email}</td>
                      <td><StarRating rating={item.rating} /></td>
                      <td>
                        <span className={`${styles.statusBadge} ${styles[item.status.toLowerCase()]}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>💬</div>
              <h3>You haven't given any feedback yet</h3>
              <p>Share your experience to help us improve.</p>
              <button className={styles.giveFeedbackBtn} onClick={() => setFeedbackModalOpen(true)}>
                Submit Feedback
              </button>
            </div>
          )}
        </div>
      </main>

      <LogoutModal 
        isOpen={logoutOpen} 
        onCancel={() => setLogoutOpen(false)} 
        onConfirm={() => {
          setLogoutOpen(false);
          navigate('/login');
        }} 
      />

      {feedbackModalOpen && (
        <FeedbackModal 
          onClose={() => setFeedbackModalOpen(false)} 
          onSubmit={handleSubmitFeedback}
        />
      )}

      {showAcknowledgement && (
        <div className={styles.ackToast}>
          <div className={styles.ackContent}>
            <CheckIcon />
            <span>Thank you for your feedback!</span>
          </div>
        </div>
      )}
    </div>
  );
}

function StarRating({ rating }) {
  return (
    <div className={styles.stars}>
      {[1, 2, 3, 4, 5].map(star => (
        <span key={star} className={star <= rating ? styles.starFilled : styles.starEmpty}>
          ★
        </span>
      ))}
    </div>
  );
}

function FeedbackModal({ onClose, onSubmit }) {
  const [rating, setRating] = useState(0);
  const isNegative = rating > 0 && rating <= 3;
  const isPositive = rating >= 4;

  const negativeChips = ["Poor quality", "Slow response", "Hard to use", "Missing features"];
  const positiveChips = ["Fast response", "Easy to use", "Great AI", "Clean UI"];

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>
        <h2>Give us your feedback</h2>
        <p>Your feedback helps us improve the experience for everyone.</p>
        
        <div className={styles.ratingSelect}>
          {[1, 2, 3, 4, 5].map(star => (
            <button 
              key={star} 
              onClick={() => setRating(star)}
              className={star <= rating ? styles.starActive : ''}
            >
              ★
            </button>
          ))}
        </div>

        {rating > 0 && (
          <div className={styles.detailSection}>
            <p className={styles.detailTitle}>
              {isNegative ? "What went wrong?" : "What did you like?"}
            </p>
            <div className={styles.chips}>
              {(isNegative ? negativeChips : positiveChips).map(chip => (
                <button key={chip} className={styles.chip}>{chip}</button>
              ))}
            </div>
            <textarea placeholder="Tell us more..." className={styles.textarea} />
          </div>
        )}

        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
          <button 
            className={styles.submitBtn} 
            disabled={rating === 0}
            onClick={onSubmit}
          >Submit</button>
        </div>
      </div>
    </div>
  );
}

/* ---- Icons ---- */
function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SearchIcon({ className }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  );
}

export default FeedbackPage;
