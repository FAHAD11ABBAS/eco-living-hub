import { describe, it, expect } from 'vitest';
import { calculateStreak } from '../src/utils/streakCalculator';

describe('Dynamic Streak Calculator (Dynaaminen putkilaskenta)', () => {
  const TODAY = '2026-10-14';

  it('palauttaa 0 jos suoritushistoria on tyhjä', () => {
    expect(calculateStreak({}, TODAY)).toBe(0);
    expect(calculateStreak(null, TODAY)).toBe(0);
  });

  it('palauttaa 1 kun käyttäjällä on suoritus vain tänään', () => {
    const completions = {
      '2026-10-14': [1]
    };
    expect(calculateStreak(completions, TODAY)).toBe(1);
  });

  it('palauttaa 2 kun suorituksia on eilen ja tänään', () => {
    const completions = {
      '2026-10-13': [1, 2],
      '2026-10-14': [3]
    };
    expect(calculateStreak(completions, TODAY)).toBe(2);
  });

  it('ei katkaise eilistä putkea jos tämän päivän suoritukset ovat vielä kesken (0 tekoa tänään)', () => {
    // Eilen ja toissapäivänä tehty, tänään ei vielä tehty mitään
    const completions = {
      '2026-10-12': [1],
      '2026-10-13': [2]
    };
    expect(calculateStreak(completions, TODAY)).toBe(2);
  });

  it('katkaisee putken jos eilen on ollut välipäivä eikä tänäänkään ole tehty tekoja', () => {
    // 2026-10-12 oli teko, mutta 13 ja 14 ei tekoja
    const completions = {
      '2026-10-12': [1]
    };
    expect(calculateStreak(completions, TODAY)).toBe(0);
  });

  it('aloittaa uuden 1 päivän putken jos eilinen oli välipäivä mutta tänään tehtiin teko', () => {
    const completions = {
      '2026-10-12': [1],
      // 2026-10-13 oli välipäivä
      '2026-10-14': [2]
    };
    expect(calculateStreak(completions, TODAY)).toBe(1);
  });

  it('laskee 5 peräkkäisen päivän putken oikein', () => {
    const completions = {
      '2026-10-10': [1],
      '2026-10-11': [2],
      '2026-10-12': [3],
      '2026-10-13': [4],
      '2026-10-14': [5]
    };
    expect(calculateStreak(completions, TODAY)).toBe(5);
  });

  it('käsittelee useat suoritukset samana päivänä yhtenä aktiivisena päivänä', () => {
    const completions = {
      '2026-10-13': [1, 2, 3, 4, 5],
      '2026-10-14': [1, 2]
    };
    expect(calculateStreak(completions, TODAY)).toBe(2);
  });
});
