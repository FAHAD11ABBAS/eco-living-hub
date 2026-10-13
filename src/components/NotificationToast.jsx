import React, { useEffect } from 'react';

export default function NotificationToast({ toast, onDismiss }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3500);
    return () => clearTimeout(timer);
  }, [toast, onDismiss]);

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div
      className={`notification-toast ${isError ? 'toast-error' : 'toast-success'}`}
      role="status"
      aria-live="polite"
    >
      <span className="toast-icon" aria-hidden="true">
        {isError ? '⚠️' : '✅'}
      </span>
      <p className="toast-message">{toast.message}</p>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onDismiss}
        aria-label="Sulje ilmoitus"
      >
        ✕
      </button>
    </div>
  );
}
