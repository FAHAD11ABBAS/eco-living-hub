import React from 'react';

export default function Header({ language, onToggleLanguage, theme, onToggleTheme, t }) {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="brand-group">
          <div className="logo-icon-wrapper" aria-hidden="true">
            <span className="logo-emoji">🌿</span>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">{t.brandTitle}</h1>
            <p className="brand-subtitle">{t.brandSubtitle}</p>
          </div>
        </div>

        <div className="header-controls">
          <button
            type="button"
            className="control-btn lang-toggle-btn"
            onClick={onToggleLanguage}
            title={language === 'fi' ? "Switch to English" : "Vaihda suomeksi"}
            aria-label="Toggle language"
          >
            <span className="control-icon" role="img" aria-label="globe">🌐</span>
            <span className="lang-name">{t.langSwitch}</span>
          </button>

          <button
            type="button"
            className="control-btn theme-toggle-btn"
            onClick={onToggleTheme}
            title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Toggle theme"
          >
            <span className="control-icon" role="img" aria-label="theme">
              {theme === 'light' ? '🌙' : '☀️'}
            </span>
            <span className="theme-name">
              {theme === 'light' ? t.themeDark : t.themeLight}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
