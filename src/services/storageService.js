export const STORAGE_KEYS = {
  THEME: 'eco_hub_theme',
  LANG: 'eco_hub_lang',
  CUSTOM_HABITS: 'eco_hub_custom_habits',
  DAILY_COMPLETIONS: 'eco_hub_daily_completions',
  PLEDGES: 'eco_hub_pledges'
};

export function safeGetStorage(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return fallback;
    return JSON.parse(item);
  } catch (error) {
    console.warn(`[storageService] Failed to parse item for key "${key}", returning fallback.`, error);
    return fallback;
  }
}

export function safeSetStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`[storageService] Failed to set item for key "${key}".`, error);
    return false;
  }
}

export function getCustomHabits() {
  const habits = safeGetStorage(STORAGE_KEYS.CUSTOM_HABITS, []);
  return Array.isArray(habits) ? habits : [];
}

export function saveCustomHabit(habitData) {
  const habits = getCustomHabits();
  const newHabit = {
    ...habitData,
    id: `custom_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    isCustom: true,
    createdAt: new Date().toISOString()
  };

  const updated = [newHabit, ...habits];
  const ok = safeSetStorage(STORAGE_KEYS.CUSTOM_HABITS, updated);
  if (!ok) {
    throw new Error('Tallennus epäonnistui selaimen muistissa.');
  }
  return newHabit;
}

export function updateCustomHabit(id, updateData) {
  const habits = getCustomHabits();
  const index = habits.findIndex(h => h.id === id);
  if (index === -1) {
    throw new Error('Päivitettävää tapaa ei löytynyt.');
  }

  const updatedHabit = {
    ...habits[index],
    ...updateData,
    updatedAt: new Date().toISOString()
  };

  habits[index] = updatedHabit;
  const ok = safeSetStorage(STORAGE_KEYS.CUSTOM_HABITS, habits);
  if (!ok) {
    throw new Error('Päivityksen tallennus epäonnistui.');
  }
  return updatedHabit;
}

export function deleteCustomHabit(id) {
  const habits = getCustomHabits();
  const filtered = habits.filter(h => h.id !== id);
  const ok = safeSetStorage(STORAGE_KEYS.CUSTOM_HABITS, filtered);
  if (!ok) {
    throw new Error('Tavan poisto epäonnistui.');
  }

  // Also clean habit id from completion logs
  const daily = getDailyCompletions();
  let modified = false;
  for (const date in daily) {
    if (Array.isArray(daily[date]) && daily[date].includes(id)) {
      daily[date] = daily[date].filter(item => item !== id);
      modified = true;
    }
  }
  if (modified) {
    safeSetStorage(STORAGE_KEYS.DAILY_COMPLETIONS, daily);
  }

  return true;
}

export function getDailyCompletions() {
  const data = safeGetStorage(STORAGE_KEYS.DAILY_COMPLETIONS, {});
  return data && typeof data === 'object' && !Array.isArray(data) ? data : {};
}

export function toggleHabitCompletion(dateStr, habitId) {
  const daily = getDailyCompletions();
  const currentForDate = Array.isArray(daily[dateStr]) ? [...daily[dateStr]] : [];

  let isCompleted = false;
  let nextList = [];

  if (currentForDate.includes(habitId)) {
    nextList = currentForDate.filter(id => id !== habitId);
    isCompleted = false;
  } else {
    // Prevent duplicate entries
    nextList = [...new Set([...currentForDate, habitId])];
    isCompleted = true;
  }

  daily[dateStr] = nextList;
  const ok = safeSetStorage(STORAGE_KEYS.DAILY_COMPLETIONS, daily);
  if (!ok) {
    throw new Error('Edistyksen tallennus epäonnistui.');
  }

  return { daily, nextList, isCompleted };
}

export function markAllHabitsForDate(dateStr, habitIds) {
  const daily = getDailyCompletions();
  daily[dateStr] = Array.from(new Set(habitIds));
  safeSetStorage(STORAGE_KEYS.DAILY_COMPLETIONS, daily);
  return daily;
}

export function resetHabitsForDate(dateStr) {
  const daily = getDailyCompletions();
  daily[dateStr] = [];
  safeSetStorage(STORAGE_KEYS.DAILY_COMPLETIONS, daily);
  return daily;
}
