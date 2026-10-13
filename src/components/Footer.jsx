import React from 'react';

export default function Footer({ language, onToggleLanguage, t }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <p className="footer-quote">{t.footerQuote}</p>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom">
          <p className="footer-credit">
            © {new Date().getFullYear()} {t.brandTitle}. {t.footerBuiltWith}
          </p>

          <div className="footer-links">
            <button
              type="button"
              className="footer-link-btn"
              onClick={onToggleLanguage}
            >
              Kieli / Language: <strong>{language === 'fi' ? 'Suomi' : 'English'}</strong>
            </button>
            <a
              href="https://github.com/FAHAD11ABBAS/eco-living-hub"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-github-link"
            >
              <span role="img" aria-label="code">💻</span> {t.footerSourceCode}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
