/* ============================================================
   LogoutModal.jsx — Confirmation dialog for logging out
   ============================================================ */

import { useEffect } from 'react';
import styles from './LogoutModal.module.css';

function LogoutModal({ isOpen, onCancel, onConfirm }) {
  useEffect(() => {
    if (!isOpen) return;
    function handleKeyDown(e) {
      if (e.key === 'Escape') onCancel();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onCancel} aria-hidden="true">
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <h2 className={styles.heading} id="logout-modal-title">
          Leaving already?
        </h2>
        
        {/* LEARNING POINT: A simple divider line 
            This provides a clean visual break between the title and content. */}
        <div className={styles.divider} />

        {/* Content Section */}
        <p className={styles.desc}>
          You can log back in anytime to continue your meetings with Hintro.
        </p>

        {/* Action buttons */}
        <div className={styles.actions}>
          <button
            className={styles.cancelBtn}
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className={styles.confirmBtn}
            onClick={onConfirm}
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutModal;
