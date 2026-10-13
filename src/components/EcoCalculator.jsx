import React, { useState, useMemo } from 'react';
import { calculateCarbonMetrics } from '../utils/carbonCalculations';

export default function EcoCalculator({ t }) {
  const [commuteKm, setCommuteKm] = useState(25);
  const [plantMeals, setPlantMeals] = useState(7);
  const [reusableItems, setReusableItems] = useState(5);
  const [ecoActions, setEcoActions] = useState(6);

  const metrics = useMemo(() => {
    return calculateCarbonMetrics(commuteKm, plantMeals, reusableItems, ecoActions);
  }, [commuteKm, plantMeals, reusableItems, ecoActions]);

  const {
    weeklyCo2,
    yearlyCo2,
    yearlyMoney,
    treesPlanted,
    phoneCharges,
    carKmSaved
  } = metrics;

  return (
    <section className="calculator-section card-box" aria-labelledby="calc-heading">
      <div className="section-header">
        <h2 id="calc-heading" className="section-title">{t.calcTitle}</h2>
        <p className="section-subtitle">{t.calcSubtitle}</p>
      </div>

      <div className="calculator-layout-grid">
        <div className="calc-inputs-column">
          <div className="calc-input-group">
            <div className="calc-label-row">
              <label htmlFor="commute-range" className="calc-label">
                🚲 {t.inputBikeKm}
              </label>
              <span className="calc-value-badge">{commuteKm} km</span>
            </div>
            <input
              id="commute-range"
              type="range"
              min="0"
              max="150"
              step="5"
              value={commuteKm}
              onChange={(e) => setCommuteKm(Number(e.target.value))}
              className="custom-range-slider"
            />
            <div className="range-bounds">
              <span>0 km</span>
              <span>150 km</span>
            </div>
          </div>

          <div className="calc-input-group">
            <div className="calc-label-row">
              <label htmlFor="plant-meals-range" className="calc-label">
                🥗 {t.inputPlantMeals}
              </label>
              <span className="calc-value-badge">{plantMeals} {t.daysUnit || 'kpl'}</span>
            </div>
            <input
              id="plant-meals-range"
              type="range"
              min="0"
              max="21"
              step="1"
              value={plantMeals}
              onChange={(e) => setPlantMeals(Number(e.target.value))}
              className="custom-range-slider"
            />
            <div className="range-bounds">
              <span>0</span>
              <span>21 / vko</span>
            </div>
          </div>

          <div className="calc-input-group">
            <div className="calc-label-row">
              <label htmlFor="reusable-range" className="calc-label">
                🛍️ {t.inputReusableItems}
              </label>
              <span className="calc-value-badge">{reusableItems} kpl</span>
            </div>
            <input
              id="reusable-range"
              type="range"
              min="0"
              max="30"
              step="1"
              value={reusableItems}
              onChange={(e) => setReusableItems(Number(e.target.value))}
              className="custom-range-slider"
            />
            <div className="range-bounds">
              <span>0</span>
              <span>30 / vko</span>
            </div>
          </div>

          <div className="calc-input-group">
            <div className="calc-label-row">
              <label htmlFor="eco-actions-range" className="calc-label">
                💡 {t.inputEcoWashHours}
              </label>
              <span className="calc-value-badge">{ecoActions} kpl</span>
            </div>
            <input
              id="eco-actions-range"
              type="range"
              min="0"
              max="20"
              step="1"
              value={ecoActions}
              onChange={(e) => setEcoActions(Number(e.target.value))}
              className="custom-range-slider"
            />
            <div className="range-bounds">
              <span>0</span>
              <span>20 / vko</span>
            </div>
          </div>
        </div>

        <div className="calc-results-column">
          <div className="results-card">
            <h3 className="results-card-title">{t.calcResultsTitle}</h3>

            <div className="result-metric-highlight">
              <span className="metric-large-number">{weeklyCo2.toFixed(1)} <small>kg CO₂</small></span>
              <span className="metric-sublabel">{t.weeklyCo2Savings}</span>
            </div>

            <div className="results-dual-row">
              <div className="metric-mini-box">
                <span className="metric-mini-value">
                  {yearlyCo2 >= 1000 ? (yearlyCo2 / 1000).toFixed(2) + ' t' : yearlyCo2.toFixed(0) + ' kg'}
                </span>
                <span className="metric-mini-label">{t.yearlyCo2Savings}</span>
              </div>
              <div className="metric-mini-box highlight-money">
                <span className="metric-mini-value">~{yearlyMoney} €</span>
                <span className="metric-mini-label">{t.yearlyMoneySavings}</span>
              </div>
            </div>

            <div className="equivalency-list">
              <div className="equiv-item">
                <span className="equiv-icon">🌲</span>
                <div className="equiv-text">
                  <strong>{treesPlanted} {t.treesEquivalent}</strong>
                  <small>{t.yearlyCo2Savings}</small>
                </div>
              </div>

              <div className="equiv-item">
                <span className="equiv-icon">🔋</span>
                <div className="equiv-text">
                  <strong>{phoneCharges.toLocaleString()} {t.phoneChargesEquivalent}</strong>
                  <small>{t.weeklyCo2Savings}</small>
                </div>
              </div>

              <div className="equiv-item">
                <span className="equiv-icon">🚗</span>
                <div className="equiv-text">
                  <strong>{carKmSaved.toLocaleString()} km {t.carKmEquivalent}</strong>
                  <small>{t.yearlyCo2Savings}</small>
                </div>
              </div>
            </div>

            <p className="calculator-disclaimer-text">{t.calcDisclaimer}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
