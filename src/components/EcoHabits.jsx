import React, { useState, useMemo } from 'react';

export default function EcoHabits({
  habits,
  completedHabitIds,
  onToggleHabit,
  onMarkAll,
  onResetAll,
  onOpenAddModal,
  onEditHabit,
  onDeleteHabit,
  t
}) {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredHabits = useMemo(() => {
    return habits.filter(habit => {
      const isDone = completedHabitIds.includes(habit.id);
      if (activeFilter === 'completed') return isDone;
      if (activeFilter === 'pending') return !isDone;
      return true;
    });
  }, [habits, completedHabitIds, activeFilter]);

  return (
    <section className="habits-section card-box" aria-labelledby="habits-heading">
      <div className="section-header-row">
        <div>
          <h2 id="habits-heading" className="section-title">{t.habitsTitle}</h2>
          <p className="section-subtitle">{t.habitsSubtitle}</p>
        </div>

        <div className="habits-action-buttons">
          <button
            type="button"
            className="action-btn primary-btn add-habit-btn"
            onClick={onOpenAddModal}
          >
            {t.btnAddHabit}
          </button>
          <button
            type="button"
            className="action-btn secondary-btn"
            onClick={onMarkAll}
          >
            {t.btnMarkAll}
          </button>
          <button
            type="button"
            className="action-btn text-btn"
            onClick={onResetAll}
          >
            {t.btnResetAll}
          </button>
        </div>
      </div>

      <div className="filter-tabs-row" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'all'}
          className={`filter-tab-pill ${activeFilter === 'all' ? 'active' : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          {t.filterAll} ({habits.length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'pending'}
          className={`filter-tab-pill ${activeFilter === 'pending' ? 'active' : ''}`}
          onClick={() => setActiveFilter('pending')}
        >
          {t.filterPending} ({habits.filter(h => !completedHabitIds.includes(h.id)).length})
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeFilter === 'completed'}
          className={`filter-tab-pill ${activeFilter === 'completed' ? 'active' : ''}`}
          onClick={() => setActiveFilter('completed')}
        >
          {t.filterCompleted} ({completedHabitIds.length})
        </button>
      </div>

      <div className="habits-grid">
        {filteredHabits.length > 0 ? (
          filteredHabits.map(habit => {
            const isCompleted = completedHabitIds.includes(habit.id);
            return (
              <div
                key={habit.id}
                className={`habit-card ${isCompleted ? 'habit-completed' : ''}`}
                onClick={() => onToggleHabit(habit.id)}
                role="checkbox"
                aria-checked={isCompleted}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onToggleHabit(habit.id);
                  }
                }}
              >
                <div className="habit-checkbox-col">
                  <div className={`custom-checkbox ${isCompleted ? 'checked' : ''}`}>
                    {isCompleted ? '✓' : ''}
                  </div>
                </div>

                <div className="habit-info-col">
                  <div className="habit-top-line">
                    <span className="habit-icon">{habit.icon}</span>
                    <h3 className="habit-title">{habit.title}</h3>
                    {habit.isCustom && (
                      <span className="custom-habit-badge">{t.customBadge}</span>
                    )}
                  </div>
                  <p className="habit-description">{habit.desc}</p>

                  <div className="habit-footer-tags">
                    <span className={`category-tag tag-${habit.category}`}>
                      {habit.category}
                    </span>
                    <span className="co2-tag">
                      +{habit.co2Saved} kg CO₂
                    </span>
                    <span className={`status-tag ${isCompleted ? 'status-done' : 'status-wait'}`}>
                      {isCompleted ? t.habitDoneBadge : t.habitPendingBadge}
                    </span>

                    {habit.isCustom && (
                      <div className="habit-crud-actions" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className="crud-icon-btn edit-btn"
                          title={t.btnEditHabit}
                          onClick={() => onEditHabit(habit)}
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          className="crud-icon-btn delete-btn"
                          title={t.btnDeleteHabit}
                          onClick={() => onDeleteHabit(habit.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-state-card">
            <p>{t.noHabitsMatch}</p>
          </div>
        )}
      </div>
    </section>
  );
}
