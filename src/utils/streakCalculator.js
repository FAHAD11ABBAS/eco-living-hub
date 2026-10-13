import { getTodayDateString } from './dateHelper.js';

export function calculateStreak(dailyCompletions = {}, todayStr = getTodayDateString()) {
  if (!dailyCompletions || typeof dailyCompletions !== 'object') {
    return 0;
  }

  const hasActivity = (dateStr) => {
    const list = dailyCompletions[dateStr];
    return Array.isArray(list) && list.length > 0;
  };

  const [year, month, day] = todayStr.split('-').map(Number);
  const baseDate = new Date(year, month - 1, day);

  const getDayStr = (offsetDays) => {
    const target = new Date(baseDate);
    target.setDate(target.getDate() - offsetDays);
    const yr = target.getFullYear();
    const mo = String(target.getMonth() + 1).padStart(2, '0');
    const da = String(target.getDate()).padStart(2, '0');
    return `${yr}-${mo}-${da}`;
  };

  const todayActive = hasActivity(todayStr);
  const yesterdayStr = getDayStr(1);
  const yesterdayActive = hasActivity(yesterdayStr);

  // If neither today nor yesterday has any completed action, the streak is broken
  if (!todayActive && !yesterdayActive) {
    return 0;
  }

  let streak = 0;
  let offset = todayActive ? 0 : 1;

  while (true) {
    const dateToCheck = getDayStr(offset);
    if (hasActivity(dateToCheck)) {
      streak += 1;
      offset += 1;
    } else {
      break;
    }
  }

  return streak;
}
