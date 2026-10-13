export function evaluateWeatherRecommendation(weather, lang = 'fi') {
  if (!weather || typeof weather.temperature !== 'number') {
    return null;
  }

  const { temperature, windSpeed = 0, rain = 0 } = weather;

  // 1) Rain >= 0.2 mm OR Wind >= 8 m/s -> Indoor eco action
  if (rain >= 0.2 || windSpeed >= 8) {
    return {
      type: 'indoor',
      title: lang === 'fi' ? 'Lajittele jätteet sisätiloissa' : 'Sort waste indoors',
      description: lang === 'fi'
        ? 'Sateinen tai tuulinen sää suosii sisäekotekoja. Lajittele kodin jätteet, sammuta turhat sähkölaitteet tai valmista hävikkiateria.'
        : 'Rainy or windy conditions favor indoor eco-actions. Sort household waste, power down unused electronics, or cook a zero-waste meal.',
      icon: '🏠',
      badge: lang === 'fi' ? 'Sisätoimi' : 'Indoor action'
    };
  }

  // 2) Else if Temp >= 5 °C -> Walking or cycling
  if (temperature >= 5) {
    return {
      type: 'active_commute',
      title: lang === 'fi' ? 'Kävely tai pyöräily' : 'Walking or cycling',
      description: lang === 'fi'
        ? 'Mieto ja suotuisa ulkosää! Valitse lihasvoimalla liikkuminen kävellen tai pyörällä ja säästä polttoainetta sekä päästöjä.'
        : 'Mild and favorable outdoor weather! Choose walking or cycling for your commute to cut emissions and save fuel.',
      icon: '🚲',
      badge: lang === 'fi' ? 'Aktiivinen liikkuminen' : 'Active commute'
    };
  }

  // 3) Else -> Public transport
  return {
    type: 'transit',
    title: lang === 'fi' ? 'Käytä joukkoliikennettä autoilun sijaan' : 'Use public transport instead of driving',
    description: lang === 'fi'
      ? 'Viileä sää: hyppää bussiin, junaan tai raitiovaunuun oman auton sijaan. Yhteiskuljetukset leikkaavat merkittävästi ruuhkia ja päästöjä.'
      : 'Chilly conditions: take the bus, train, or tram instead of driving solo. Transit significantly cuts traffic and emissions.',
    icon: '🚌',
    badge: lang === 'fi' ? 'Joukkoliikenne' : 'Public transit'
  };
}
