import React, { useState, useMemo } from 'react';

export default function EcoTips({ tips = [], t }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [helpfulSet, setHelpfulSet] = useState(new Set());

  const toggleHelpful = (tipId) => {
    setHelpfulSet(prev => {
      const next = new Set(prev);
      if (next.has(tipId)) {
        next.delete(tipId);
      } else {
        next.add(tipId);
      }
      return next;
    });
  };

  const filteredTips = useMemo(() => {
    return tips.filter(tip => {
      const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
      const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tip.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [tips, selectedCategory, searchQuery]);

  return (
    <section className="tips-section card-box" aria-labelledby="tips-heading">
      <div className="section-header">
        <h2 id="tips-heading" className="section-title">{t.tipsTitle}</h2>
        <p className="section-subtitle">{t.tipsSubtitle}</p>
      </div>

      <div className="tips-controls-row">
        <div className="category-pills-wrap" role="group" aria-label="Suodata kategorioittain">
          <button
            type="button"
            className={`cat-pill ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            {t.categoryAll}
          </button>
          <button
            type="button"
            className={`cat-pill ${selectedCategory === 'home' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('home')}
          >
            🏡 {t.categoryHome}
          </button>
          <button
            type="button"
            className={`cat-pill ${selectedCategory === 'transport' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('transport')}
          >
            🚲 {t.categoryTransport}
          </button>
          <button
            type="button"
            className={`cat-pill ${selectedCategory === 'food' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('food')}
          >
            🥑 {t.categoryFood}
          </button>
        </div>

        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder={t.searchTipsPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label={t.searchTipsPlaceholder}
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchQuery('')}
              title="Tyhjennä haku"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      <div className="tips-grid">
        {filteredTips.length > 0 ? (
          filteredTips.map(tip => {
            const isHelpful = helpfulSet.has(tip.id);
            return (
              <article key={tip.id} className="tip-card">
                <div className="tip-header-row">
                  <span className={`category-tag tag-${tip.category}`}>
                    {tip.category}
                  </span>
                  <span className="tip-difficulty-badge">
                    {tip.difficulty}
                  </span>
                </div>

                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-desc">{tip.desc}</p>

                <div className="tip-card-footer">
                  <span className="tip-rating">{tip.rating}</span>
                  <button
                    type="button"
                    className={`helpful-btn ${isHelpful ? 'is-helpful' : ''}`}
                    onClick={() => toggleHelpful(tip.id)}
                  >
                    <span>{isHelpful ? '💚' : '🤍'}</span>
                    <span>{isHelpful ? t.helpfulThanks : t.helpfulBtn}</span>
                  </button>
                </div>
              </article>
            );
          })
        ) : (
          <div className="empty-state-card">
            <p>{t.noTipsMatch}</p>
          </div>
        )}
      </div>
    </section>
  );
}
