import React from 'react';

export default function HeroStats({ completedCount, totalCount, co2SavedToday, streak = 0, t }) {
  const getEcoLevel = () => {
    if (completedCount >= 6) return t.levelMaster;
    if (completedCount >= 3) return t.levelPractitioner;
    return t.levelNovice;
  };

  return (
    <section className="hero-section">
      <div className="hero-banner card-box">
        <div className="hero-content">
          <h2 className="hero-heading">{t.heroGreeting}</h2>
          <p className="hero-subtext">{t.heroSubtitle}</p>
        </div>
        <div className="hero-leaf-graphic" aria-hidden="true">🌱</div>
      </div>

      <div className="stats-grid">
        <div className="stat-card card-box">
          <div className="stat-icon-wrapper">✅</div>
          <div className="stat-details">
            <span className="stat-number">{completedCount} <small className="stat-unit">/ {totalCount}</small></span>
            <span className="stat-label">{t.statHabitsDone}</span>
          </div>
        </div>

        <div className="stat-card card-box">
          <div className="stat-icon-wrapper">🍃</div>
          <div className="stat-details">
            <span className="stat-number">{co2SavedToday.toFixed(1)} <small className="stat-unit">{t.kgUnit}</small></span>
            <span className="stat-label">{t.statCo2Saved}</span>
          </div>
        </div>

        <div className="stat-card card-box">
          <div className="stat-icon-wrapper">🔥</div>
          <div className="stat-details">
            <span className="stat-number">{streak} <small className="stat-unit">{t.daysUnit}</small></span>
            <span className="stat-label">{t.statCurrentStreak}</span>
          </div>
        </div>

        <div className="stat-card card-box">
          <div className="stat-icon-wrapper">🏅</div>
          <div className="stat-details">
            <span className="stat-level-tag">{getEcoLevel()}</span>
            <span className="stat-label">{t.statLevel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
