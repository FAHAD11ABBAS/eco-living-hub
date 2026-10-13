import { describe, it, expect } from 'vitest';
import { calculateCarbonMetrics } from '../src/utils/carbonCalculations';

describe('Carbon Calculations & Zero-Offset Bug Fix (Hiililaskenta ja nollakorjaus)', () => {
  it('palauttaa tasan 0 puuta kun kaikki syötteet ovat nollia (korjaa aiemman Math.max(1, ...) bugin)', () => {
    const result = calculateCarbonMetrics(0, 0, 0, 0);

    expect(result.weeklyCo2).toBe(0);
    expect(result.yearlyCo2).toBe(0);
    expect(result.treesPlanted).toBe(0); // STRICTLY 0, not 1
    expect(result.yearlyMoney).toBe(0);
    expect(result.phoneCharges).toBe(0);
    expect(result.carKmSaved).toBe(0);
  });

  it('laskee oikeat päästö- ja puuarvot positiivisilla arvoilla', () => {
    // 25 km pyöräilyä (25 * 0.17 = 4.25)
    // 7 kasvisateriaa (7 * 1.5 = 10.5)
    // 5 kestotuotetta (5 * 0.08 = 0.4)
    // 6 ekopesua (6 * 0.6 = 3.6)
    // viikko CO2 = 4.25 + 10.5 + 0.4 + 3.6 = 18.75 kg
    // vuosi CO2 = 18.75 * 52 = 975 kg
    // puut = round(975 / 22) = 44 puuta
    const result = calculateCarbonMetrics(25, 7, 5, 6);

    expect(result.weeklyCo2).toBeCloseTo(18.75, 2);
    expect(result.yearlyCo2).toBeCloseTo(975, 1);
    expect(result.treesPlanted).toBe(44);
    expect(result.yearlyMoney).toBeGreaterThan(0);
  });

  it('käsittelee negatiiviset ja virheelliset syötteet turvallisesti nollina', () => {
    const result = calculateCarbonMetrics(-10, null, undefined, 'virhe');

    expect(result.weeklyCo2).toBe(0);
    expect(result.yearlyCo2).toBe(0);
    expect(result.treesPlanted).toBe(0);
    expect(result.yearlyMoney).toBe(0);
  });
});
