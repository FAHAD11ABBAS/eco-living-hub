import React from 'react';

export default function ProgressBar({ completedCount, totalCount, t }) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const getMotivationalMessage = () => {
    if (percentage === 0) return t.msgZero;
    if (percentage < 35) return t.msgLow;
    if (percentage < 70) return t.msgMid;
    if (percentage < 100) return t.msgHigh;
    return t.msgAll;
  };

  return (
    <div className="progress-section card-box">
      <div className="progress-header">
        <div className="progress-title-wrap">
          <h2 className="section-title">{t.progressTitle}</h2>
          <span className="progress-badge">
            {completedCount} / {totalCount} {t.progressCompleted}
          </span>
        </div>
        <div className="progress-percentage-pill">{percentage}%</div>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <p className="progress-feedback-text">
        <span className="feedback-sparkle">✨</span> {getMotivationalMessage()}
      </p>
    </div>
  );
}
