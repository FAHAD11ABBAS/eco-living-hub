export function sanitizeText(input, maxLength = 100) {
  if (typeof input !== 'string') {
    return '';
  }
  // Strip dangerous html tags and angle brackets
  const stripped = input
    .replace(/<[^>]*>?/gm, '')
    .trim();
  return stripped.slice(0, maxLength);
}

export function validateHabitData(data = {}, lang = 'fi') {
  const errors = {};

  const rawTitle = typeof data.title === 'string' ? data.title.trim() : '';
  const rawDesc = typeof data.desc === 'string' ? data.desc.trim() : '';
  const rawCategory = typeof data.category === 'string' ? data.category.trim() : 'lifestyle';
  const rawCo2 = Number(data.co2Saved);

  if (!rawTitle) {
    errors.title = lang === 'fi' ? 'Otsikko on pakollinen.' : 'Title is required.';
  } else if (rawTitle.length > 60) {
    errors.title = lang === 'fi'
      ? 'Otsikko saa olla enintään 60 merkkiä.'
      : 'Title must not exceed 60 characters.';
  }

  if (rawDesc.length > 160) {
    errors.desc = lang === 'fi'
      ? 'Kuvaus saa olla enintään 160 merkkiä.'
      : 'Description must not exceed 160 characters.';
  }

  if (isNaN(rawCo2) || rawCo2 <= 0) {
    errors.co2Saved = lang === 'fi'
      ? 'Anna kelvollinen CO₂-säästö (vähintään 0.1 kg).'
      : 'Provide a valid CO₂ reduction (at least 0.1 kg).';
  } else if (rawCo2 > 25) {
    errors.co2Saved = lang === 'fi'
      ? 'CO₂-säästö saa olla enintään 25 kg per teko.'
      : 'CO₂ reduction cannot exceed 25 kg per action.';
  }

  const validCategories = ['transport', 'food', 'home', 'lifestyle'];
  const category = validCategories.includes(rawCategory) ? rawCategory : 'lifestyle';

  const sanitized = {
    title: sanitizeText(rawTitle, 60),
    desc: sanitizeText(rawDesc, 160),
    category,
    co2Saved: Number(Math.max(0.1, Math.min(25, rawCo2 || 1.0)).toFixed(1)),
    icon: typeof data.icon === 'string' && data.icon.trim() ? sanitizeText(data.icon, 8) : '🌱'
  };

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    sanitized
  };
}
