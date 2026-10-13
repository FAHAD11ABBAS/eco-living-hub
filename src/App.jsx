import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Header from './components/Header';
import HeroStats from './components/HeroStats';
import ProgressBar from './components/ProgressBar';
import WeatherWidget from './components/WeatherWidget';
import EcoHabits from './components/EcoHabits';
import HabitModal from './components/HabitModal';
import HistoryChart from './components/HistoryChart';
import EcoCalculator from './components/EcoCalculator';
import EcoTips from './components/EcoTips';
import DailyPledge from './components/DailyPledge';
import NotificationToast from './components/NotificationToast';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';

import { translations } from './i18n/translations';
import { getTodayDateString } from './utils/dateHelper';
import { calculateStreak } from './utils/streakCalculator';
import {
  STORAGE_KEYS,
  safeGetStorage,
  safeSetStorage,
  getCustomHabits,
  saveCustomHabit,
  updateCustomHabit,
  deleteCustomHabit,
  getDailyCompletions,
  toggleHabitCompletion,
  markAllHabitsForDate,
  resetHabitsForDate
} from './services/storageService';
import './App.css';

export default function App() {
  // Theme state: defaults to light
  const [theme, setTheme] = useState(() => {
    return safeGetStorage(STORAGE_KEYS.THEME, 'light');
  });

  // Language state: Finnish ('fi') is strictly the primary and default language
  const [language, setLanguage] = useState(() => {
    return safeGetStorage(STORAGE_KEYS.LANG, 'fi');
  });

  // Custom habits created by user
  const [customHabits, setCustomHabits] = useState(() => {
    return getCustomHabits();
  });

  // Real calendar completions map: { "YYYY-MM-DD": [habitId, ...] }
  // New users start with 0 pre-checked habits for today
  const [dailyCompletions, setDailyCompletions] = useState(() => {
    return getDailyCompletions();
  });

  // Toast feedback state
  const [toast, setToast] = useState(null);

  // Modal state for adding and editing habits
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);

  // Today's date in local calendar YYYY-MM-DD
  const todayStr = useMemo(() => getTodayDateString(), []);

  // Translation dictionary for active language
  const t = useMemo(() => translations[language] || translations.fi, [language]);

  // Sync theme attribute to HTML document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    safeSetStorage(STORAGE_KEYS.THEME, theme);
  }, [theme]);

  // Sync language selection
  useEffect(() => {
    safeSetStorage(STORAGE_KEYS.LANG, language);
  }, [language]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const dismissToast = useCallback(() => {
    setToast(null);
  }, []);

  // Combined habits: user-defined custom habits first, then standard defaults
  const allHabits = useMemo(() => {
    return [...customHabits, ...t.defaultHabits];
  }, [customHabits, t.defaultHabits]);

  // Today's checked habit IDs (strictly empty for new users)
  const todayCompletedIds = useMemo(() => {
    return Array.isArray(dailyCompletions[todayStr]) ? dailyCompletions[todayStr] : [];
  }, [dailyCompletions, todayStr]);

  // Dynamic streak calculation based on real consecutive calendar dates
  const dynamicStreak = useMemo(() => {
    return calculateStreak(dailyCompletions, todayStr);
  }, [dailyCompletions, todayStr]);

  // Calculate CO2 avoided today from completed habits
  const co2SavedToday = useMemo(() => {
    const habitsMap = new Map();
    allHabits.forEach(h => habitsMap.set(h.id, h));

    return todayCompletedIds.reduce((sum, id) => {
      const habit = habitsMap.get(id);
      return sum + (habit ? Number(habit.co2Saved || 0) : 0);
    }, 0);
  }, [allHabits, todayCompletedIds]);

  // Habit toggling on the current calendar date
  const handleToggleHabit = (habitId) => {
    try {
      const { daily } = toggleHabitCompletion(todayStr, habitId);
      setDailyCompletions({ ...daily });
    } catch (err) {
      showToast(err.message || t.toastGenericError, 'error');
    }
  };

  const handleMarkAllHabits = () => {
    try {
      const allIds = allHabits.map(h => h.id);
      const updated = markAllHabitsForDate(todayStr, allIds);
      setDailyCompletions({ ...updated });
      showToast(t.toastAllMarked, 'success');
    } catch (err) {
      showToast(err.message || t.toastGenericError, 'error');
    }
  };

  const handleResetHabits = () => {
    try {
      const updated = resetHabitsForDate(todayStr);
      setDailyCompletions({ ...updated });
      showToast(t.toastHabitsReset, 'info');
    } catch (err) {
      showToast(err.message || t.toastGenericError, 'error');
    }
  };

  // Custom habit modal controls
  const handleOpenAddModal = () => {
    setEditingHabit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (habit) => {
    setEditingHabit(habit);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingHabit(null);
  };

  const handleSaveHabit = (habitData) => {
    try {
      if (editingHabit) {
        updateCustomHabit(editingHabit.id, habitData);
        setCustomHabits(getCustomHabits());
        showToast(t.toastHabitUpdated, 'success');
      } else {
        saveCustomHabit(habitData);
        setCustomHabits(getCustomHabits());
        showToast(t.toastHabitAdded, 'success');
      }
      handleCloseModal();
    } catch (err) {
      showToast(err.message || t.toastGenericError, 'error');
    }
  };

  const handleDeleteHabit = (habitId) => {
    try {
      deleteCustomHabit(habitId);
      setCustomHabits(getCustomHabits());
      setDailyCompletions(getDailyCompletions());
      showToast(t.toastHabitDeleted, 'info');
    } catch (err) {
      showToast(err.message || t.toastGenericError, 'error');
    }
  };

  const handleToggleLanguage = () => {
    setLanguage(prev => (prev === 'fi' ? 'en' : 'fi'));
  };

  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ErrorBoundary t={t}>
      <div className="app-layout">
        {/* Subtle ambient floating leaves background */}
        <div className="ambient-leaf-bg" aria-hidden="true">
          <span className="floating-leaf leaf-1">🍃</span>
          <span className="floating-leaf leaf-2">🌱</span>
          <span className="floating-leaf leaf-3">🌿</span>
          <span className="floating-leaf leaf-4">🍃</span>
          <span className="floating-leaf leaf-5">🌱</span>
        </div>

        <Header
          language={language}
          onToggleLanguage={handleToggleLanguage}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          t={t}
        />

        <main className="main-content-container">
          <HeroStats
            completedCount={todayCompletedIds.length}
            totalCount={allHabits.length}
            co2SavedToday={co2SavedToday}
            streak={dynamicStreak}
            t={t}
          />

          <ProgressBar
            completedCount={todayCompletedIds.length}
            totalCount={allHabits.length}
            t={t}
          />

          {/* Feature 1: Weather recommendation feature */}
          <WeatherWidget
            language={language}
            t={t}
          />

          {/* Feature 2 & 3: Daily habits checklist and custom habit CRUD */}
          <EcoHabits
            habits={allHabits}
            completedHabitIds={todayCompletedIds}
            onToggleHabit={handleToggleHabit}
            onMarkAll={handleMarkAllHabits}
            onResetAll={handleResetHabits}
            onOpenAddModal={handleOpenAddModal}
            onEditHabit={handleOpenEditModal}
            onDeleteHabit={handleDeleteHabit}
            t={t}
          />

          {/* Feature 4: 7-day completion chart with accessible table */}
          <HistoryChart
            dailyCompletions={dailyCompletions}
            allHabits={allHabits}
            language={language}
            t={t}
          />

          {/* Feature 5: Carbon calculator with zero-offset bug fix */}
          <EcoCalculator t={t} />

          <EcoTips tips={t.tips} t={t} />

          <DailyPledge t={t} />
        </main>

        <Footer
          language={language}
          onToggleLanguage={handleToggleLanguage}
          t={t}
        />

        <HabitModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveHabit}
          initialHabit={editingHabit}
          language={language}
          t={t}
        />

        <NotificationToast
          toast={toast}
          onDismiss={dismissToast}
        />
      </div>
    </ErrorBoundary>
  );
}
