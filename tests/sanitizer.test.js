import { describe, it, expect } from 'vitest';
import { sanitizeText, validateHabitData } from '../src/utils/sanitizer';

describe('Input Sanitization & Validation (Syötteiden sanitointi ja validointi)', () => {
  it('estää tyhjät tai pelkkiä välilyöntejä sisältävät otsikot', () => {
    const emptyResult = validateHabitData({ title: '', co2Saved: 1.0 }, 'fi');
    expect(emptyResult.isValid).toBe(false);
    expect(emptyResult.errors.title).toBeDefined();

    const spaceResult = validateHabitData({ title: '   ', co2Saved: 1.0 }, 'fi');
    expect(spaceResult.isValid).toBe(false);
    expect(spaceResult.errors.title).toBeDefined();
  });

  it('hylkää liian pitkät otsikot yli 60 merkkiä', () => {
    const longTitle = 'a'.repeat(61);
    const result = validateHabitData({ title: longTitle, co2Saved: 1.0 }, 'fi');

    expect(result.isValid).toBe(false);
    expect(result.errors.title).toContain('60 merkkiä');
  });

  it('hylkää liian pitkät kuvaukset yli 160 merkkiä', () => {
    const longDesc = 'x'.repeat(161);
    const result = validateHabitData({
      title: 'Kävely töihin',
      desc: longDesc,
      co2Saved: 1.0
    }, 'fi');

    expect(result.isValid).toBe(false);
    expect(result.errors.desc).toContain('160 merkkiä');
  });

  it('poistaa vaaralliset HTML-tagit ja XSS-yritykset syötteistä', () => {
    const dirtyInput = '<script>alert("hacked")</script>Pyöräily <b>kouluun</b>';
    const cleaned = sanitizeText(dirtyInput);

    expect(cleaned).not.toContain('<script>');
    expect(cleaned).not.toContain('</script>');
    expect(cleaned).not.toContain('<b>');
    expect(cleaned).toBe('alert("hacked")Pyöräily kouluun');
  });

  it('hylkää virheelliset tai negatiiviset CO2-arvot', () => {
    const zeroResult = validateHabitData({ title: 'Pyöräily', co2Saved: 0 }, 'fi');
    expect(zeroResult.isValid).toBe(false);
    expect(zeroResult.errors.co2Saved).toBeDefined();

    const negativeResult = validateHabitData({ title: 'Pyöräily', co2Saved: -2 }, 'fi');
    expect(negativeResult.isValid).toBe(false);
  });

  it('hyväksyy kelvolliset tiedot ja palauttaa sanitoidun olion', () => {
    const result = validateHabitData({
      title: '  Kävele lähikauppaan  ',
      desc: '  Vältä autoa lyhyillä matkoilla  ',
      category: 'transport',
      co2Saved: 1.8,
      icon: '🚲'
    }, 'fi');

    expect(result.isValid).toBe(true);
    expect(result.sanitized.title).toBe('Kävele lähikauppaan');
    expect(result.sanitized.desc).toBe('Vältä autoa lyhyillä matkoilla');
    expect(result.sanitized.co2Saved).toBe(1.8);
  });
});
