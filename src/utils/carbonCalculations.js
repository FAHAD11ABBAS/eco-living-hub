export function calculateCarbonMetrics(commuteKm = 0, plantMeals = 0, reusableItems = 0, ecoActions = 0) {
  const km = Math.max(0, Number(commuteKm) || 0);
  const meals = Math.max(0, Number(plantMeals) || 0);
  const reusables = Math.max(0, Number(reusableItems) || 0);
  const actions = Math.max(0, Number(ecoActions) || 0);

  const weeklyCo2 = (km * 0.17) + (meals * 1.5) + (reusables * 0.08) + (actions * 0.6);
  const yearlyCo2 = weeklyCo2 * 52;

  const weeklyMoney = (km * 0.15) + (meals * 1.2) + (reusables * 0.3) + (actions * 0.5);
  const yearlyMoney = Math.round(weeklyMoney * 52);

  // Strictly return 0 when emissions saved is 0 or less
  const treesPlanted = yearlyCo2 <= 0 ? 0 : Math.round(yearlyCo2 / 22);
  const phoneCharges = weeklyCo2 <= 0 ? 0 : Math.round(weeklyCo2 / 0.008);
  const carKmSaved = yearlyCo2 <= 0 ? 0 : Math.round(yearlyCo2 / 0.17);

  return {
    weeklyCo2,
    yearlyCo2,
    yearlyMoney,
    treesPlanted,
    phoneCharges,
    carKmSaved
  };
}
