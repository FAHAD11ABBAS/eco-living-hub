import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Caught render error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      const { t } = this.props;
      const title = t?.errorBoundaryTitle || 'Hups, jotain meni pieleen';
      const desc = t?.errorBoundaryDesc || 'Sovelluksessa tapahtui odottamaton virhe. Tietosi ovat tallessa selaimessa.';
      const retryText = t?.errorBoundaryRetry || 'Lataa sivu uudelleen';

      return (
        <div className="error-boundary-wrapper">
          <div className="error-boundary-card card-box">
            <span className="error-boundary-icon" aria-hidden="true">🌱⚠️</span>
            <h2 className="error-boundary-title">{title}</h2>
            <p className="error-boundary-desc">{desc}</p>
            <button
              type="button"
              className="action-btn primary-btn error-boundary-btn"
              onClick={this.handleReload}
            >
              🔄 {retryText}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
