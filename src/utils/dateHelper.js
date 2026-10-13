export function getTodayDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateLabel(dateStr, locale = 'fi') {
  const [year, month, day] = dateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);

  if (locale === 'fi') {
    const weekdayNames = ['Su', 'Ma', 'Ti', 'Ke', 'To', 'Pe', 'La'];
    return `${weekdayNames[date.getDay()]} ${day}.${month}.`;
  }

  const weekdayNamesEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return `${weekdayNamesEn[date.getDay()]} ${month}/${day}`;
}

export function getPastDays(numDays = 7, referenceDate = new Date()) {
  const days = [];
  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(referenceDate);
    d.setDate(d.getDate() - i);
    days.push(getTodayDateString(d));
  }
  return days;
}
