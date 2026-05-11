/* ============================================================
   LogoutModal.jsx — Confirmation dialog for logging out
   
   PROPS:
   - isOpen: boolean  → whether to show the modal
   - onCancel: fn     → called when user clicks Cancel
   - onConfirm: fn    → called when user clicks "Log out"
   
   CONCEPT: Accessibility (a11y)
   - role="dialog" tells screen readers this is a dialog
   - aria-modal="true" traps focus inside for keyboard users
   - aria-labelledby links to the heading for screen reader title
   ============================================================ */

import { useEffect } from 'react';
import styles from './LogoutModal.module.css';

function LogoutModal({ isOpen, onCancel, onConfirm }) {

  /* Close modal on Escape key press
     CONCEPT: useEffect with cleanup
     When the effect returns a function, React runs that
     function when the component unmounts OR before re-running
     the effect. Here we remove the event listener on cleanup
     to prevent memory leaks. */
  useEffect(() => {
    if (!isOpen) return; // Only listen when modal is open

    function handleKeyDown(e) {
      if (e.key === 'Escape') onCancel();
    }

    // Add the listener
    document.addEventListener('keydown', handleKeyDown);

    // Return cleanup function — removes listener when modal closes
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  /* If modal is not open, render nothing.
     CONCEPT: Early return pattern — return null from a component
     to render nothing at all. */
  if (!isOpen) return null;

  return (
    /* Backdrop — clicking it closes the modal */
    <div
      className={styles.backdrop}
      onClick={onCancel}
      aria-hidden="true"
    >
      {/* Modal panel — stopPropagation prevents backdrop click
          from firing when you click INSIDE the modal */}
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Warning icon */}
        <div className={styles.iconWrap}>
          <WarningIcon />
        </div>

        {/* Content */}
        <h2 className={styles.heading} id="logout-modal-title">
          Leaving already?
        </h2>
        <p className={styles.desc}>
          Are you sure you want to log out of your Hintro account?
        </p>

        {/* Action buttons */}
        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={onCancel}
            id="logout-cancel-button"
          >
            Cancel
          </button>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
            id="logout-confirm-button"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

function WarningIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  );
}

export default LogoutModal;
