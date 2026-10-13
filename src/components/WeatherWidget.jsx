import React, { useState, useEffect, useCallback } from 'react';
import { fetchWeather, DEFAULT_CITY } from '../services/weatherService';
import { evaluateWeatherRecommendation } from '../utils/weatherRules';

export default function WeatherWidget({ language = 'fi', t }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchWeather(DEFAULT_CITY);
      setWeather(data);
    } catch (err) {
      setError(err.message || t.weatherError);
    } finally {
      setLoading(false);
    }
  }, [t.weatherError]);

  useEffect(() => {
    loadWeatherData();
  }, [loadWeatherData]);

  const recommendation = weather
    ? evaluateWeatherRecommendation(weather, language)
    : null;

  return (
    <section className="weather-section card-box" aria-labelledby="weather-heading">
      <div className="section-header-row">
        <div>
          <h2 id="weather-heading" className="section-title">
            ⛅ {t.weatherTitle}
          </h2>
          <p className="section-subtitle">{t.weatherSubtitle}</p>
        </div>

        {!loading && !error && (
          <button
            type="button"
            className="action-btn text-btn"
            onClick={loadWeatherData}
            title={language === 'fi' ? 'Päivitä säätiedot' : 'Refresh weather'}
          >
            🔄 {t.weatherRetry || 'Päivitä'}
          </button>
        )}
      </div>

      {loading && (
        <div className="weather-loading-box" role="status" aria-live="polite">
          <div className="weather-spinner" aria-hidden="true" />
          <p className="loading-text">{t.weatherLoading}</p>
        </div>
      )}

      {error && !loading && (
        <div className="weather-error-box" role="alert">
          <span className="error-icon" aria-hidden="true">⚠️</span>
          <div className="error-content">
            <p className="error-message">{t.weatherError}</p>
            <button
              type="button"
              className="action-btn secondary-btn retry-btn"
              onClick={loadWeatherData}
            >
              {t.weatherRetry}
            </button>
          </div>
        </div>
      )}

      {!loading && !error && weather && recommendation && (
        <div className="weather-content-wrapper">
          <div className="weather-metrics-grid">
            <div className="weather-metric-pill">
              <span className="metric-icon">📍</span>
              <div className="metric-text">
                <span className="metric-label">{t.weatherLocation}</span>
                <span className="metric-val">{weather.cityName}</span>
              </div>
            </div>

            <div className="weather-metric-pill">
              <span className="metric-icon">🌡️</span>
              <div className="metric-text">
                <span className="metric-label">{t.weatherTemp}</span>
                <span className="metric-val">{weather.temperature} °C</span>
              </div>
            </div>

            <div className="weather-metric-pill">
              <span className="metric-icon">💨</span>
              <div className="metric-text">
                <span className="metric-label">{t.weatherWind}</span>
                <span className="metric-val">{weather.windSpeed} m/s</span>
              </div>
            </div>

            <div className="weather-metric-pill">
              <span className="metric-icon">🌧️</span>
              <div className="metric-text">
                <span className="metric-label">{t.weatherRain}</span>
                <span className="metric-val">{weather.rain} mm</span>
              </div>
            </div>
          </div>

          <div className={`weather-recommendation-card rec-type-${recommendation.type}`}>
            <div className="rec-header">
              <span className="rec-badge">{t.weatherRecommendationBadge}</span>
              <span className="rec-category-tag">{recommendation.badge}</span>
            </div>
            <div className="rec-body">
              <span className="rec-icon" aria-hidden="true">{recommendation.icon}</span>
              <div className="rec-info">
                <h3 className="rec-action-title">{recommendation.title}</h3>
                <p className="rec-action-desc">{recommendation.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
