import React, { useState, useEffect } from 'react';
import { validateHabitData } from '../utils/sanitizer';

const CATEGORY_OPTIONS = [
  { value: 'transport', labelFi: 'Liikkuminen', labelEn: 'Transport', icon: '🚲' },
  { value: 'food', labelFi: 'Ruoka ja ravinto', labelEn: 'Food & Diet', icon: '🥗' },
  { value: 'home', labelFi: 'Koti ja energia', labelEn: 'Home & Energy', icon: '⚡' },
  { value: 'lifestyle', labelFi: 'Elämäntapa', labelEn: 'Lifestyle', icon: '🌱' }
];

const PRESET_ICONS = ['🚲', '🥗', '⚡', '🌱', '🚿', '🛍️', '🧺', '🍲', '💡', '💧', '🚌', '♻️'];

export default function HabitModal({ isOpen, onClose, onSave, initialHabit = null, language = 'fi', t }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('lifestyle');
  const [co2Saved, setCo2Saved] = useState('1.0');
  const [icon, setIcon] = useState('🌱');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialHabit) {
      setTitle(initialHabit.title || '');
      setDesc(initialHabit.desc || '');
      setCategory(initialHabit.category || 'lifestyle');
      setCo2Saved(String(initialHabit.co2Saved || '1.0'));
      setIcon(initialHabit.icon || '🌱');
    } else {
      setTitle('');
      setDesc('');
      setCategory('lifestyle');
      setCo2Saved('1.0');
      setIcon('🌱');
    }
    setErrors({});
  }, [initialHabit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = validateHabitData({
      title,
      desc,
      category,
      co2Saved,
      icon
    }, language);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    onSave(result.sanitized);
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-card card-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="modal-title" className="modal-title">
            {initialHabit ? t.modalEditTitle : t.modalAddTitle}
          </h2>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Sulje"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form" noValidate>
          <div className="form-group">
            <label htmlFor="habit-title" className="form-label">
              {t.modalLabelTitle}
            </label>
            <input
              id="habit-title"
              type="text"
              className={`form-input ${errors.title ? 'input-error' : ''}`}
              placeholder={t.modalPlaceholderTitle}
              value={title}
              maxLength={60}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: null }));
              }}
              required
            />
            {errors.title && <span className="field-error-text">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="habit-desc" className="form-label">
              {t.modalLabelDesc}
            </label>
            <textarea
              id="habit-desc"
              className={`form-textarea ${errors.desc ? 'input-error' : ''}`}
              placeholder={t.modalPlaceholderDesc}
              value={desc}
              maxLength={160}
              rows={3}
              onChange={(e) => {
                setDesc(e.target.value);
                if (errors.desc) setErrors(prev => ({ ...prev, desc: null }));
              }}
            />
            {errors.desc && <span className="field-error-text">{errors.desc}</span>}
          </div>

          <div className="form-row-dual">
            <div className="form-group">
              <label htmlFor="habit-category" className="form-label">
                {t.modalLabelCategory}
              </label>
              <select
                id="habit-category"
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORY_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>
                    {opt.icon} {language === 'fi' ? opt.labelFi : opt.labelEn}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="habit-co2" className="form-label">
                {t.modalLabelCo2}
              </label>
              <input
                id="habit-co2"
                type="number"
                step="0.1"
                min="0.1"
                max="25"
                className={`form-input ${errors.co2Saved ? 'input-error' : ''}`}
                value={co2Saved}
                onChange={(e) => {
                  setCo2Saved(e.target.value);
                  if (errors.co2Saved) setErrors(prev => ({ ...prev, co2Saved: null }));
                }}
                required
              />
              {errors.co2Saved && <span className="field-error-text">{errors.co2Saved}</span>}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">{t.modalLabelIcon}</label>
            <div className="icon-picker-row">
              {PRESET_ICONS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  className={`icon-picker-btn ${icon === emoji ? 'selected' : ''}`}
                  onClick={() => setIcon(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions-row">
            <button
              type="button"
              className="action-btn text-btn"
              onClick={onClose}
            >
              {t.modalBtnCancel}
            </button>
            <button
              type="submit"
              className="action-btn primary-btn"
            >
              {t.modalBtnSave}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
