export const DEFAULT_CITY = {
  name: 'Helsinki',
  latitude: 60.1699,
  longitude: 24.9384
};

export async function fetchWeather(city = DEFAULT_CITY) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,rain,wind_speed_10m&hourly=temperature_2m,rain,wind_speed_10m&wind_speed_unit=ms&timezone=Europe%2FHelsinki`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Sääpalvelu palautti virheen: ${response.status}`);
  }

  const data = await response.json();

  const currentTime = data.current?.time;
  let upcomingTemp = data.current?.temperature_2m ?? 0;
  let upcomingWind = data.current?.wind_speed_10m ?? 0;
  let upcomingRain = data.current?.rain ?? 0;

  // Find the forecast for the upcoming hour from hourly array
  if (data.hourly && Array.isArray(data.hourly.time)) {
    const currentIndex = data.hourly.time.findIndex(t => t >= currentTime);
    const targetIndex = currentIndex >= 0 && currentIndex + 1 < data.hourly.time.length
      ? currentIndex + 1
      : (currentIndex >= 0 ? currentIndex : 0);

    if (data.hourly.temperature_2m?.[targetIndex] !== undefined) {
      upcomingTemp = data.hourly.temperature_2m[targetIndex];
    }
    if (data.hourly.wind_speed_10m?.[targetIndex] !== undefined) {
      upcomingWind = data.hourly.wind_speed_10m[targetIndex];
    }
    if (data.hourly.rain?.[targetIndex] !== undefined) {
      upcomingRain = data.hourly.rain[targetIndex];
    }
  }

  return {
    cityName: city.name,
    temperature: Math.round(upcomingTemp * 10) / 10,
    windSpeed: Math.round(upcomingWind * 10) / 10,
    rain: Math.round(upcomingRain * 10) / 10,
    fetchedAt: new Date().toISOString()
  };
}
