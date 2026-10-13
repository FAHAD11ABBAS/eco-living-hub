import { describe, it, expect } from 'vitest';
import { evaluateWeatherRecommendation } from '../src/utils/weatherRules';

describe('Weather Decision Rules (Sääsuositussäännöt)', () => {
  it('suosittelee sisäekotekoja kun sade >= 0.2 mm', () => {
    const result = evaluateWeatherRecommendation({
      temperature: 15,
      windSpeed: 3,
      rain: 0.2
    }, 'fi');

    expect(result).toBeDefined();
    expect(result.type).toBe('indoor');
    expect(result.title).toBe('Lajittele jätteet sisätiloissa');
  });

  it('suosittelee sisäekotekoja kun tuuli >= 8 m/s vaikka ei sada', () => {
    const result = evaluateWeatherRecommendation({
      temperature: 18,
      windSpeed: 8.0,
      rain: 0.0
    }, 'fi');

    expect(result.type).toBe('indoor');
    expect(result.title).toBe('Lajittele jätteet sisätiloissa');
  });

  it('suosittelee sisäekotekoja kun sekä sade että tuuli ylittävät raja-arvot', () => {
    const result = evaluateWeatherRecommendation({
      temperature: 10,
      windSpeed: 10.5,
      rain: 2.4
    }, 'fi');

    expect(result.type).toBe('indoor');
  });

  it('suosittelee kävelyä tai pyöräilyä kun sää on poutainen ja lämpötila >= 5 °C', () => {
    const result = evaluateWeatherRecommendation({
      temperature: 5.0,
      windSpeed: 4.0,
      rain: 0.0
    }, 'fi');

    expect(result.type).toBe('active_commute');
    expect(result.title).toBe('Kävely tai pyöräily');
  });

  it('suosittelee kävelyä tai pyöräilyä lämpimällä säällä (esim. 21 °C)', () => {
    const result = evaluateWeatherRecommendation({
      temperature: 21.0,
      windSpeed: 2.5,
      rain: 0.1
    }, 'fi');

    expect(result.type).toBe('active_commute');
    expect(result.title).toBe('Kävely tai pyöräily');
  });

  it('suosittelee joukkoliikennettä autoilun sijaan kun lämpötila on alle 5 °C poutaisessa säässä', () => {
    const result = evaluateWeatherRecommendation({
      temperature: 4.9,
      windSpeed: 3.0,
      rain: 0.0
    }, 'fi');

    expect(result.type).toBe('transit');
    expect(result.title).toBe('Käytä joukkoliikennettä autoilun sijaan');
  });

  it('suosittelee joukkoliikennettä pakkasella (esim. -6 °C)', () => {
    const result = evaluateWeatherRecommendation({
      temperature: -6.0,
      windSpeed: 2.0,
      rain: 0.0
    }, 'fi');

    expect(result.type).toBe('transit');
    expect(result.title).toBe('Käytä joukkoliikennettä autoilun sijaan');
  });

  it('palauttaa englanninkieliset suositukset kun kieleksi valitaan "en"', () => {
    const indoorEn = evaluateWeatherRecommendation({
      temperature: 12,
      windSpeed: 9.0,
      rain: 0.0
    }, 'en');
    expect(indoorEn.title).toBe('Sort waste indoors');

    const walkEn = evaluateWeatherRecommendation({
      temperature: 16,
      windSpeed: 3.0,
      rain: 0.0
    }, 'en');
    expect(walkEn.title).toBe('Walking or cycling');

    const transitEn = evaluateWeatherRecommendation({
      temperature: 1,
      windSpeed: 2.0,
      rain: 0.0
    }, 'en');
    expect(transitEn.title).toBe('Use public transport instead of driving');
  });

  it('palauttaa null jos säätiedot puuttuvat tai ovat virheellisiä', () => {
    expect(evaluateWeatherRecommendation(null)).toBeNull();
    expect(evaluateWeatherRecommendation({})).toBeNull();
  });
});
